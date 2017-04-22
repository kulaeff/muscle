<?php
    session_start();

    $json = [];

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password'], $_GET['name']);

    $database = mysqli_real_escape_string($mysqli, $_GET['name']);

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query('SHOW TABLE STATUS')) {
            while ($object = $result->fetch_object()) {
                $json[] = array(
                    $object->Name,
                    $object->Rows,
                    $object->Engine,
                    $object->Collation,
                    $object->Data_length + $object->Index_length,
                    0
                );
            }

            echo json_encode($json, JSON_NUMERIC_CHECK);
        }

        $mysqli->close();
    }
?>