<?
    session_start();

    $json = array('server' => array(
        'usage' => array(
            'received' => 0,
            'sent' => 0,
            'total' => 0
        ),
        'connections' => array(
            'aborted' => 0,
            'failed' => 0,
            'total' => 0,
        ),
    ));

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query('SHOW GLOBAL STATUS')) {
            $total = 0;

            while ($object = $result->fetch_object()) {
                switch ($object->Variable_name) {
                    case 'Bytes_received':
                        $total += $object->Value;
                        $json['server']['usage']['received'] = $object->Value;
                        break;
                    case 'Bytes_sent':
                        $total += $object->Value;
                        $json['server']['usage']['sent'] = $object->Value;
                        break;
                    case 'Aborted_clients':
                        $json['server']['connections']['aborted'] = $object->Value;
                        break;
                    case 'Aborted_connects':
                        $json['server']['connections']['failed'] = $object->Value;
                        break;
                    case 'Connections':
                        $json['server']['connections']['total'] = $object->Value;
                        break;
                }
            }

            $json['server']['usage']['total'] = $total;
        }

        echo json_encode($json);
    }
?>