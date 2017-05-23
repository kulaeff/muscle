<?php
    session_start();

    $json = [];

    //$mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);
    $mysqli = new mysqli('localhost', 'root', '');

    if (!$mysqli->connect_errno) {
        switch ($_SERVER['REQUEST_METHOD']) {

            case 'GET':
                $token = $mysqli->real_escape_string($_GET['token']);

                if ($result = $mysqli->query("SHOW DATABASES LIKE '%$token%'")) {
                    while ($object = $result->fetch_row()) {
                        $json[] = $object[0];
                    }

                    sort($json);

                    echo json_encode($json);
                } else {
                    echo json_encode(['status' => $mysqli->error]);
                }

                break;
            case 'POST':
                $name = $mysqli->real_escape_string($_POST['name']);

                if ($result = $mysqli->query("CREATE DATABASE $name")) {
                    echo json_encode([
                        'status' => 'ok'
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'statusMessage' => $mysqli->error
                    ]);
                }

                break;
            case 'DELETE':
                $name = $mysqli->real_escape_string($_GET['name']);

                if ($result = $mysqli->query("DROP DATABASE $name")) {
                    echo json_encode([
                        'status' => 'ok'
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'statusMessage' => $mysqli->error . "-DROP DATABASE $name"
                    ]);
                }

                break;
        }

        $mysqli->close();
    }