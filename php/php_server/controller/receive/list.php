<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Receive.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

$receive = new Receive();
//$new_m =  $medicine->findById_New();

if ($_GET['account']) {
	$link = $user->login_code($_GET['account']).'.json';
	$linkc = './log_session/'.$link;
	$receive = new Receive();
	$user_info = $user->welcome($_GET['account']);
	if (intval($user->is_admin($_GET['account']) == 1)){
		$result4 = $receive->findAll();
	} else {
		$result4 = $receive->getDataWithCon($user_info['id']);
	}
	file_put_contents($linkc, json_encode($result4));
	header('Location: ' . SERVER_URL . 'controller/buy_log/list.php?account=' . $_GET['account']);
}
?>
