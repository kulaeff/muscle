<?php
    session_start();

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        $database = mysqli_real_escape_string($mysqli, $_GET['name']);

        if (mysqli_select_db($mysqli, $database)) {
            $query = "SELECT
            TABLE_NAME,
            ENGINE,
            TABLE_ROWS,
            DATA_LENGTH,
            INDEX_LENGTH,
            TABLE_COLLATION,
            TABLE_COMMENT
        FROM
            information_schema.tables
        WHERE
            table_schema = '$database'";

            if ($result = $mysqli->query($query)) {
                $json = [];

                while ($row = $result->fetch_assoc()) {
                    $json[] = array(
                        $row['TABLE_NAME'],
                        //$row['TABLE_COMMENT'],
                        $row['TABLE_ROWS'],
                        $row['ENGINE'],
                        $row['TABLE_COLLATION'],
                        $row['DATA_LENGTH'] + $row['INDEX_LENGTH'],
                        0
                    );
                }

                echo json_encode($json, JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(['error' => $mysqli->error]);
            }
        }

        $mysqli->close();
    }
?>