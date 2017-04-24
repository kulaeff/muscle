<?php
    session_start();

    $json = [];

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $mysqli->real_escape_string($_POST['name']);

            if ($result = $mysqli->query("CREATE DATABASE $name")) {
                $result = $mysqli->query("SHOW DATABASES");

                while ($object = $result->fetch_row()) {
                    $json[] = $object[0];
                }

                sort($json);

                echo json_encode($json);
            } else {
                echo json_encode(['status' => $mysqli->error]);
            }
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
        } else {
            http_response_code(405);
        }

        $mysqli->close();
    }
?>