<?php
require '../vendor/autoload.php';

// Set the path to views
Flight::set('flight.views.path', '../views');

Flight::register('db', 'PDO', array('mysql:host=localhost;', 'root', ''), function($db) {
    //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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

// List of collations
Flight::route('GET /api/v1/collations', function() {
    $json = [];
    $sql = "SELECT COLLATION_NAME FROM information_schema.COLLATIONS";

    $db = Flight::db();

    if ($db->query($sql)) {
        foreach ($db->query($sql) as $row) {
            $json[] = $row['COLLATION_NAME'];
        }

        sort($json);

        Flight::json($json);
    } else {
        Flight::json([
            'status' => 'error',
            'statusCode' => $db->errorCode(),
            'statusMessage' => $db->errorInfo()[2],
        ]);
    }
});

// List of engines
Flight::route('GET /api/v1/engines', function() {
    $json = [];
    $sql = "SELECT ENGINE FROM information_schema.ENGINES WHERE SUPPORT != 'NO'";

    $db = Flight::db();

    if ($db->query($sql)) {
        foreach ($db->query($sql) as $row) {
            $json[] = $row['ENGINE'];
        }

        Flight::json($json);
    } else {
        Flight::json([
            'status' => 'error',
            'statusCode' => $db->errorCode(),
            'statusMessage' => $db->errorInfo()[2],
        ]);
    }
});

// List of databases
Flight::route('GET /api/v1/databases', function() {
    $request = Flight::request();
    $token = $request->query['token'];
    $json = [];

    $db = Flight::db();

    foreach ($db->query("SHOW DATABASES LIKE '%$token%'") as $row) {
        $json[] = [
            $row[0]
        ];
    }

    sort($json);

    Flight::json($json);
});

// Create new database
Flight::route('POST /api/v1/databases', function() {
    $request = Flight::request();
    $name = $request->data['name'];

    $db = Flight::db();

    if ($db->query("CREATE DATABASE $name")) {
        Flight::json([
            'status' => 'ok'
        ]);
    } else {
        Flight::json([
            'status' => 'error',
            'statusCode' => $db->errorCode(),
            'statusMessage' => $db->errorInfo()[2],
        ]);
    }
});

// Database details
Flight::route('GET /api/v1/databases/@name', function($name) {
    $json = [];
    $sql = "SELECT SCHEMA_NAME, DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME 
            FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '$name'";

    $db = Flight::db();

    $rows = $db->query($sql);

    // Hack for affected row count. See http://php.net/manual/ru/pdostatement.rowcount.php
    if ($db->query('SELECT FOUND_ROWS()')->fetchColumn() > 0) {
        foreach ($rows as $row) {
            $json = [
                $row['SCHEMA_NAME'],
                $row['DEFAULT_CHARACTER_SET_NAME'],
                $row['DEFAULT_COLLATION_NAME']
            ];
        }
    } else {
        $json = [
            'status' => $rows->rowCount,
            'statusCode' => $db->errorCode(),
            'statusMessage' => $db->errorInfo()[2]
        ];
    }

    Flight::json($json);
});

// Update database details
Flight::route('PATCH /api/v1/databases/@oldName', function($oldName) {
    $db = Flight::db();
    $request = Flight::request();
    $newName = $request->data['name'];
    $json = [];
    $sql = "";

    if ($db->query("CREATE DATABASE $newName")) {
        $tables = $db->query("SHOW TABLES FROM $oldName");

        foreach ($tables as $table) {
            $tableName = $table['Tables_in_' . $oldName];

            $db->query("RENAME TABLE $oldName.$tableName TO $newName.$tableName");
        }

        if ($db->query("DROP DATABASE $oldName")) {
            $json = [
                'status' => 'ok'
            ];
        }
    }

    Flight::json($json);
});

// Database tables
Flight::route('GET /api/v1/databases/@name/tables', function($name) {
    $request = Flight::request();
    $token = $request->query['token'];
    $json = [];
    $sql = "SELECT TABLE_NAME, ENGINE, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH, TABLE_COLLATION, TABLE_COMMENT 
            FROM information_schema.TABLES WHERE TABLE_SCHEMA = '$name'";

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

// Table columns
Flight::route('GET /api/v1/databases/@database/tables/@table/columns', function($database, $table) {
    $sql = "SHOW FULL COLUMNS FROM $database.$table";
    $json = [];

    $db = Flight::db();

    foreach ($db->query($sql) as $row) {
        $type = explode(' ', $row['Type']);

        $json[] = [
            'column' => $row['Field'],
            'type' => $type[0],
            'attributes' => $type[1],
            'collation' => $row['Collation'],
            'null' => $row['Null'],
            'key' => $row['Key'],
            'default' => $row['Default'],
            'extra' => $row['Extra'],
            'privileges' => $row['Privileges'],
            'comment' => $row['Comment']
        ];
    }

    Flight::json($json);
});

// React route
Flight::route('/*', function(){
    Flight::render('index.php');
});

Flight::start();