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

if (isset($_POST)) {
	
	$dataSub = array(
		'WpVoucher' => array(
			'name' => $_POST['name'] ?? '',
			'threshold' => $_POST['threshold']  ?? '', 	
			'number_thres' => $_POST['number_thres']  ?? '', 
			'discount' => $_POST['discount']  ?? '',
			'discount_rate' => $_POST['discount_rate']  ?? '',
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s')			
			)
	);
	//echo json_encode($dataSub);
	//echo json_encode($_POST['emailS']);
	//echo json_encode($_POST['codeS']);

	//echo json_encode($code);

	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0 && $user->is_admin($_POST['emailS'])){
		if ($voucher->save($dataSub)) {
			if ($_POST['codeS']){
				$linku = './log_session/user_voucher.json';
				$resultS = $voucher->findAll();
				file_put_contents($linku, json_encode($resultS));	

				echo 1;
				//header('Location: ' . SERVER_URL . 'controller/voucher/list.php?email='.$_POST['emailS']);
			}
			
		} else {
			echo 0;
			//header('Location: ' . CLIENT_URL . 'voucher/input?success=0');
		}
	}	
}
else {
	echo 0;
	//header('Location: ' . CLIENT_URL . 'voucher/input?success=0');
}
?>