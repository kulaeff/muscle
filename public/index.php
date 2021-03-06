<?php
require '../vendor/autoload.php';

class DB {
    private $user;
    private $password;

    private $pdo;

    public function connect($user, $password) {
        $this->user = $user;
        $this->password = $password;

        $this->pdo = new PDO('mysql:host=localhost;', $user, $password);
    }

    public static function checkCredentials($user, $password) {
        try {
            new PDO('mysql:host=localhost', $user, $password);

            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function query($query) {
        return $this->pdo->query($query);
    }
}

// Set the path to views
Flight::set('flight.views.path', '../views');
Flight::set('pdo.connection', 'mysql:host=localhost;');

Flight::register('db', 'DB');

// API routes
// Credentials
// This endpoint should be called prior to others
Flight::route('POST /api/v1/credentials', function() {
    $request = Flight::request();

    $user = $request->data['user'];
    $password = $request->data['password'];

    try {
        $pdo = new PDO(Flight::get('pdo.connection'), $user, $password);
        $pdo = null;

        Flight::json([
            'status' => 'ok'
        ]);
    } catch (PDOException $e) {
        Flight::json([
            'error' => [
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ]
        ]);
    }
});

// List of collations
Flight::route('GET /api/v1/collations', function() {
    $json = [];
    $sql = "SELECT COLLATION_NAME FROM information_schema.COLLATIONS";

    try {
        $pdo = new PDO(Flight::get('pdo.connection'), $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

        foreach ($pdo->query($sql) as $row) {
            $json[] = $row['COLLATION_NAME'];
        }

        sort($json);

        Flight::json($json);
    } catch (PDOException $exception) {
        Flight::json([
            'status' => 'error',
            'statusCode' => $exception->getCode(),
            'statusMessage' => $exception->getMessage(),
        ]);
    }
});

// List of engines
Flight::route('GET /api/v1/engines', function() {
    $json = [];
    $sql = "SELECT ENGINE FROM information_schema.ENGINES WHERE SUPPORT != 'NO'";

    try {
        $pdo = new PDO(Flight::get('pdo.connection'), $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

        foreach ($pdo->query($sql) as $row) {
            $json[] = $row['ENGINE'];
        }

        Flight::json($json);
    } catch (PDOException $exception) {
        Flight::json([
            'status' => 'error',
            'statusCode' => $exception->getCode(),
            'statusMessage' => $exception->getMessage(),
        ]);
    }
});

// List of databases
Flight::route('GET /api/v1/databases', function() {
    $request = Flight::request();

    $token = $request->query['token'];
    $json = [];

    try {
        $pdo = new PDO(Flight::get('pdo.connection'), $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

        foreach ($pdo->query("SELECT table_schema, SUM(table_type = 'base table') tables, SUM(table_type = 'view') views, SUM(table_type = 'system view') system_views from information_schema.tables GROUP BY table_schema") as $row) {
            $json[] = [
                'database' => $row['table_schema'],
                'tableCount' => $row['tables'] + $row['views'] + $row['system_views']
            ];
        }

        sort($json);

        Flight::json($json);
    } catch (PDOException $e) {
        Flight::json($json);
    }
});

// Create new database
Flight::route('POST /api/v1/databases', function() {
    $request = Flight::request();
    $name = $request->data['name'];

    $pdo = new PDO(Flight::get('pdo.connection'), $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

    if ($pdo->query("CREATE DATABASE $name")) {
        Flight::json([
            'status' => 'ok'
        ]);
    } else {
        Flight::json([
            'status' => 'error',
            'statusCode' => $pdo->errorCode(),
            'statusMessage' => $pdo->errorInfo()[2],
        ]);
    }
});

// Create a new table
Flight::route('POST /api/v1/tables', function() {
    $request = Flight::request();
    $name = $request->data['name'];
    $collation = $request->data['collation'];
    $comment = $request->data['comment'];
    $database = $request->data['database'];
    $engine = $request->data['engine'];

    try {
        $pdo = new PDO(Flight::get('pdo.connection'), $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

        if ($result = $pdo->query("CREATE TABLE $database.$name" )) {
            var_dump($result);
            exit();
            Flight::json([
                'status' => 'ok',
                'data' => ''
            ]);
        } else {
            Flight::json([
                'status' => 'error',
                'code' => $pdo->errorCode(),
                'message' => $pdo->errorInfo()[2],
            ]);
        }
    } catch (PDOException $e) {
        Flight::json([
            'status' => 'error',
            'code' => $e->getCode(),
            'message' => $e->getMessage(),
        ]);
    }
});

// Database details
Flight::route('GET /api/v1/databases/@name', function($name) {
    $json = [];
    $sql = "SELECT SCHEMA_NAME, DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME 
            FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '$name'";

    $db = Flight::db();
    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

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

    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

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
    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

    foreach ($db->query($sql) as $row) {
        $json[] = [
            'table' => $row['TABLE_NAME'],
            //$row['TABLE_COMMENT'],
            'rowCount' => +$row['TABLE_ROWS'],
            'engine' => $row['ENGINE'],
            'collation' => $row['TABLE_COLLATION'],
            'size' => $row['DATA_LENGTH'] + $row['INDEX_LENGTH'],
            'overhead' => 0
        ];
    }

    Flight::json($json);
});

// Database delete
Flight::route('DELETE /api/v1/databases/@name', function($name) {
    $db = Flight::db();
    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

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
            VARIABLE_NAME = 'Connections' OR
            VARIABLE_NAME = 'Queries' OR
            VARIABLE_NAME = 'Bytes_received' OR
            VARIABLE_NAME = 'Bytes_sent' OR
            VARIABLE_NAME = 'Uptime'
        UNION SELECT
            VARIABLE_NAME as name,
            VARIABLE_VALUE as value
        FROM
            performance_schema.global_variables
        WHERE
            VARIABLE_NAME = 'bind_address' OR
            VARIABLE_NAME = 'hostname' OR
            VARIABLE_NAME = 'port' OR
            VARIABLE_NAME = 'version' OR
            VARIABLE_NAME = 'version_comment' OR
            VARIABLE_NAME = 'version_compile_os'";
    $traffic = 0;

    try {
        $pdo = new PDO('mysql:host=localhost;', $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

        foreach ($pdo->query($sql) as $row) {
            switch ($row['name']) {
                case 'bind_address':
                    $json['ip'] = $row['value'];
                    break;
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
                case 'hostname':
                    $json['host'] = $row['value'];
                    break;
                case 'port':
                    $json['port'] = $row['value'];
                    break;
                case 'Queries':
                    $json['queries'] = +$row['value'];
                    break;
                case 'Uptime':
                    $json['uptime'] = +$row['value'];
                    break;
                case 'version':
                    $json['version'] = $row['value'];
                    break;
                case 'version_comment':
                    $json['versionComment'] = $row['value'];
                    break;
            }
        }

        Flight::json($json);
    } catch (PDOException $e) {
        Flight::json($json);
    }
});

// Table columns
Flight::route('GET /api/v1/databases/@database/tables/@table/columns', function($database, $table) {
    $sql = "SHOW FULL COLUMNS FROM $database.$table";
    $json = [];

    $db = Flight::db();
    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

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

// Table rows
Flight::route('GET /api/v1/databases/@database/tables/@table/rows', function($database, $table) {
    $db = Flight::db();
    $db->connect($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);

    $sql = "SELECT * FROM $database.$table";
    $json = [
        'columns' => [],
        'rows' => []
    ];

    if ($query = $db->query($sql, PDO::FETCH_ASSOC)) {
        $rows = $query->fetchAll(PDO::FETCH_ASSOC);

        if (count($rows)) {
            $columns = array_keys($rows[0]);

            $json['columns'] = array_map(function ($value) {
                return [
                    'name' => $value,
                    'label' => $value
                ];
            }, $columns);

            foreach ($rows as $row) {
                $json['rows'][] = $row;
            }
        }
    }

    Flight::json($json, 200, true, 'utf-8', JSON_NUMERIC_CHECK);
});

// React route
Flight::route('/*', function(){
    Flight::render('index.php');
});

Flight::start();