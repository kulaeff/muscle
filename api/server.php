<?php
    session_start();

    $json = [];

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    $token = mysqli_real_escape_string($mysqli, $_GET['token']);

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query("SHOW DATABASES LIKE '%$token%'")) {
            while ($object = $result->fetch_row()) {
                $json[] = $object[0];
            }

            echo json_encode($json);
        }

        $mysqli->close();
    }
?>