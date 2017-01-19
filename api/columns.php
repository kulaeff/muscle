<?
    session_start();

    $json = array('items' => array());

    $mysqli = new mysqli('localhost', $_SESSION['user'], $_SESSION['password'], $_GET['database']);

    if (!$mysqli->connect_errno) {
        if ($result = $mysqli->query('SHOW FULL COLUMNS FROM ' . $_GET['table'])) {
            while ($object = $result->fetch_object()) {
                // Split Type field to array of tokens where
                // [0] - full match
                // [1] - type
                // [2] - size
                // [3] - attribute
                preg_match('/(\w+)?(?:\((\d+)\))?\s?(\w+)?/', $object->Type, $typeTokens);

                $json['items'][] = array(
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
        }

        $mysqli->close();
    }
?>