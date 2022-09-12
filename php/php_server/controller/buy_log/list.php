<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Author.php';
require_once '../../model/User.php';
require_once '../../model/Buy_log.php';

if (!isset($user)) {
	$user = new User();
}

$buy_log = new Buy_log();
//$new_m =  $medicine->findById_New();

if ($_GET['account']) {
	$link = $user->login_code($_GET['account']).'.json';
	$linkc = './log_session/'.$link;
	$user_info = $user->welcome($_GET['account']);
	//file_put_contents($linkc, (json_encode (new stdClass)));
	//echo json_encode($data);
	if (intval($user->is_admin($_GET['account']) == 1)){
		$resultS = $buy_log->findAll();
	} else {
		$resultS = $buy_log->getDataWithCon($user_info['id']);
	}
	//$resultS= $result->data;
	file_put_contents($linkc, json_encode($resultS));	
	header('Location: ' . CLIENT_URL . 'buy_log/list');
}
?>
