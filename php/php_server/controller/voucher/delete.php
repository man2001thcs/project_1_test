<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Voucher.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$voucher = new Voucher();

$id = isset($_POST['id']) ? intval($_POST['id']) : null;

if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
	if ($voucher->deleteById($id)){
		
		$linku = './log_session/user_voucher.json';
		$resultS = $voucher->findAll();
		file_put_contents($linku, json_encode($resultS));	
		echo 1;
		//file_put_contents($linkc, (json_encode (new stdClass)));
		//header('Location: '. SERVER_URL . 'controller/voucher/list.php');
	}
	else {
		echo 0;
		//header('Location: ' . CLIENT_URL . 'voucher/list?success=0');
	}
	

}
?>

