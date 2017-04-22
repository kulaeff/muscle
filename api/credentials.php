<?php
    session_start();

    $_SESSION['user'] = $_GET['user'];
    $_SESSION['password'] = $_GET['password'];

    $json = array(
        'user' => '',
        'password' => ''
    );

    $mysqli = new mysqli('localhost', $_GET['user'], $_GET['password']);

    if (!$mysqli->connect_errno) {
        $json['user'] = $_GET['user'];
        $json['password'] = $_GET['password'];

        echo json_encode($json);
    }
?>