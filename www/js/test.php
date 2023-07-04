<?php
// error_reporting(E_ALL); // dev
date_default_timezone_set('Asia/Taipei');

/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
cors();
function cors() {
    
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    echo "You have CORS!";
}

// LOCALHOST
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "five_good";
$result = '';

try {
  $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";
  $conn->exec("set names utf8");
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
// $device_uuid = $_POST['device_uuid'];
// $device_type = $_POST['device_type'];
// $ip = $_POST['ip'];
// $device_hijacked_at = $_POST['device_hijacked_at'];
// $data = $_POST['data'];

$devices = $conn->query("SELECT * FROM devices");
while ($row = $devices->fetch()) {
    //echo $row['receive_money']."<br />\n";

    $device_uuid = $row['device_uuid'];
    // echo $device_uuid;
    echo json_encode($device_uuid);
}
// try{
//     $statement = $conn->prepare("INSERT INTO devices (device_uuid, device_type, ip, device_hijacked_at, data, created_at) VALUES (:device_uuid, :device_type, :ip, :device_hijacked_at, :data, :NOW() )");
//     $statement->bindParam(':device_uuid', $device_uuid);
//     $statement->bindParam(':device_type', $device_type);
//     $statement->bindParam(':ip', $ip);
//     $statement->bindParam(':device_hijacked_at', $device_hijacked_at);
//     $statement->bindParam(':data', $data);
//     $statement->execute();
// }
// catch(PDOException $e){
//     die("Connection to database failed: " . $e->getMessage());
// }   
?>