<?php
    session_start();

    $json = [];
    $query = "SELECT
      gs.VARIABLE_NAME as name,
      gs.VARIABLE_VALUE as value
    FROM
      `global_status` gs
    WHERE
      gs.VARIABLE_NAME LIKE 'Connections' OR
      gs.VARIABLE_NAME LIKE 'Queries' OR
      gs.VARIABLE_NAME LIKE 'Bytes_received' OR
      gs.VARIABLE_NAME LIKE 'Bytes_sent' OR
      gs.VARIABLE_NAME LIKE 'Uptime'";

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password'], 'performance_schema');

    if (!$mysqli->connect_errno) {
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

            echo json_encode($json);
        } else {
            echo mysqli_error($mysqli);
        }

        $mysqli->close();
    }
?>