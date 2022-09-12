<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//require "../core.php";
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Receive.php';
date_default_timezone_set('Asia/Ho_Chi_Minh');



if (!isset($user)) {
	$user = new User();
}
$date = date('Y-m-d H:i:s');
echo $date;
echo "<br></br>";
$date1 = date('2022-09-12 14:07:59');
echo $date1;
echo "<br></br>";
$date2 = date("Y-m-d H:i:s", strtotime("1 hours"));
echo $date2;
if ($date1 > $date2)
    echo "$date1 is latest than $date2";
else
    echo "$date1 is older than $date2";
?>
