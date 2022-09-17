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
echo ($user->login_code('dochu4@gmail.com'));
?>
