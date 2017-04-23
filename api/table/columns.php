<?php
    session_start();

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        $database = mysqli_real_escape_string($mysqli, $_GET['database']);
        $table = mysqli_real_escape_string($mysqli, $_GET['table']);

        if (mysqli_select_db($mysqli, $database)) {
            $json = [];

            if ($result = $mysqli->query("SHOW FULL COLUMNS FROM $table")) {
                while ($object = $result->fetch_object()) {
                    // Split Type field to array of tokens where
                    // [0] - full match
                    // [1] - type
                    // [2] - size
                    // [3] - attribute
                    preg_match('/(\w+)?(?:\((\d+)\))?\s?(\w+)?/', $object->Type, $typeTokens);

                    $json[] = array(
                        $object->Field,
                        $typeTokens[1],
                        $typeTokens[2],
                        $object->Collation,
                        $typeTokens[3],
                        strtolower($object->Null),
                        $object->Null == 'YES' && $object->Default == null ? 'null' : '',
                        $object->Extra
                    );
                }

                echo json_encode($json, JSON_NUMERIC_CHECK);
            } else {
                echo mysqli_error($mysqli);
            }
        }

        $mysqli->close();
    }
?>