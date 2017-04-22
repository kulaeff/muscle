<?php
    session_start();

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        $json = [];
        $query = "SELECT
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

        if ($result = $mysqli->query($query)) {
            $traffic = 0;

            while ($object = $result->fetch_assoc()) {
                switch ($object['name']) {
                    case 'Bytes_received':
                        $traffic += $object['value'];
                        $json['usage'] = $traffic;
                        break;
                    case 'Bytes_sent':
                        $traffic += $object['value'];
                        $json['usage'] = $traffic;
                        break;
                    case 'Connections':
                        $json['connections'] = +$object['value'];
                        break;
                    case 'Queries':
                        $json['queries'] = +$object['value'];
                        break;
                    case 'Uptime':
                        $json['uptime'] = +$object['value'];
                        break;
                }
            }

            echo json_encode($json, JSON_NUMERIC_CHECK);
        } else {
            echo mysqli_error($mysqli);
        }

        $mysqli->close();
    }
?>