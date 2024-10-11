<?php
$host = "localhost";
$username = "root";
$password = "root";
$dbName = "deathdata";

try {
    $pdo = new PDO(
        'mysql:host=' . $host . ';dbname=' . $dbName,
        $username,
        $password,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
    );

    echo "Connected to $dbName on $host with success !";
} catch (PDOException $e) {
    die("Can't connect to $dbName :" . $e->getMessage());
}
include 'html.php';