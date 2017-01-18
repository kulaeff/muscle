<?
    session_start();

    $json = array('items' => array());

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password']);

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query('SHOW DATABASES')) {
            while ($object = $result->fetch_object()) {
                $json['items'][] = array('name' => $object->Database);
            }

            echo json_encode($json);
        }

        $mysqli->close();
    }
?>