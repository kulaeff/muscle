<?
    $json = array('server' => array(
        'usage' => array(
            'received' => array(
                'unit' => '',
                'value' => 0
            ),
            'sent' => array(
                'unit' => '',
                'value' => 0
            ),
            'total' => array(
                'unit' => '',
                'value' => 0
            ),
        ),
        'connections' => array(
            'aborted' => 0,
            'failed' => 0,
            'total' => 0,
        ),
    ));

    $mysqli = new mysqli('localhost', 'root', '');

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query('SHOW GLOBAL STATUS')) {
            while ($object = $result->fetch_object()) {
                switch ($object->Variable_name) {
                    case 'Bytes_received':
                        $json['server']['usage']['received']['unit'] = 'Kb';
                        $json['server']['usage']['received']['value'] = round($object->Value / 1024, 2);
                        break;
                    case 'Bytes_sent':
                        $json['server']['usage']['sent']['unit'] = 'Kb';
                        $json['server']['usage']['sent']['value'] = round($object->Value / 1024, 2);
                        break;
                }
            }

            echo json_encode($json);
        }
    }
?>