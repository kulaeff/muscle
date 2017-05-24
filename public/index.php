<?php
require '../vendor/autoload.php';

// Set the path to views
Flight::set('flight.views.path', '../views');

Flight::register('db', 'PDO', array('mysql:host=localhost;', 'root', ''), function($db) {
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
});

// API routes
// Credentials
// This endpoint should be called prior to others
Flight::route('GET /api/v1/credentials', function() {
    $request = Flight::request();
    $user = $request->query['user'];
    $password = $request->query['password'];

    Flight::json([
        'status' => 'ok'
    ]);
});

// List of databases
Flight::route('GET /api/v1/databases', function() {
    $request = Flight::request();
    $token = $request->query['token'];
    $json = [];

    $db = Flight::db();

    foreach ($db->query("SHOW DATABASES LIKE '%$token%'") as $row) {
        $json[] = $row[0];
    }

    Flight::json($json);
});

// Database details
Flight::route('GET /api/v1/databases/@name', function() {});

// Database tables
Flight::route('GET /api/v1/databases/@name/tables', function($name) {
    $request = Flight::request();
    $token = $request->query['token'];
    $json = [];
    $sql = "SELECT TABLE_NAME, ENGINE, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH, TABLE_COLLATION, TABLE_COMMENT 
            FROM information_schema.tables WHERE table_schema = '$name'";

    $db = Flight::db();

    foreach ($db->query($sql) as $row) {
        $json[] = [
            $row['TABLE_NAME'],
            //$row['TABLE_COMMENT'],
            $row['TABLE_ROWS'],
            $row['ENGINE'],
            $row['TABLE_COLLATION'],
            $row['DATA_LENGTH'] + $row['INDEX_LENGTH'],
            0
        ];
    }

    Flight::json($json);
});

// Database delete
Flight::route('DELETE /api/v1/databases/@name', function($name) {
    $db = Flight::db();

    if ($db->query("DROP DATABASE $name")) {
        Flight::json([
            'status' => 'ok'
        ]);
    } else {
        Flight::json([
            'status' => 'error',
            'statusMessage' => 'Error while deleting database'
        ]);
    }
});

// Summary
Flight::route('GET /api/v1/status/summary', function() {
    $json = [];
    $sql = "SELECT
            VARIABLE_NAME as name,
            VARIABLE_VALUE as value
        FROM
            performance_schema.global_status
        WHERE
            VARIABLE_NAME LIKE 'Connections' OR
            VARIABLE_NAME LIKE 'Queries' OR
            VARIABLE_NAME LIKE 'Bytes_received' OR
            VARIABLE_NAME LIKE 'Bytes_sent' OR
            VARIABLE_NAME LIKE 'Uptime'";
    $traffic = 0;

    $db = Flight::db();

    foreach ($db->query($sql) as $row) {
        switch ($row['name']) {
            case 'Bytes_received':
                $traffic += $row['value'];
                $json['usage'] = $traffic;
                break;
            case 'Bytes_sent':
                $traffic += $row['value'];
                $json['usage'] = $traffic;
                break;
            case 'Connections':
                $json['connections'] = +$row['value'];
                break;
            case 'Queries':
                $json['queries'] = +$row['value'];
                break;
            case 'Uptime':
                $json['uptime'] = +$row['value'];
                break;
        }
    }

    Flight::json($json);
});

// React route
Flight::route('/*', function(){
    Flight::render('index.php');
});

Flight::start();