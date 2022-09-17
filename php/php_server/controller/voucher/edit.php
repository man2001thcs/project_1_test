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
$id = $_POST['id'] ?? 1;
$this_data = $voucher->findById($id);

if (isset($_POST)) {
	$dataSub = array(
		'WpVoucher' => array(
			'id' => intval($id),
			'name' => $_POST['name'] ?? $this_data['WpVoucher']['name'],
			'threshold' => intval($_POST['threshold'])  ?? $this_data['WpVoucher']['threshold'], 	
			'number_thres' => $_POST['number_thres']  ?? $this_data['WpVoucher']['number_thres'],
			'discount' => intval($_POST['discount'])  ?? $this_data['WpVoucher']['discount'],
			'discount_rate' => floatval($_POST['discount_rate'])  ?? $this_data['WpVoucher']['discount_rate'],
			'created' => $this_data['WpVoucher']['created'] ?? date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s')			
			)
	);
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($voucher->save($dataSub)) {

			$linku = './log_session/user_voucher.json';
			$resultS = $voucher->findAll();
			file_put_contents($linku, json_encode($resultS));	
			echo 1;
			//header('Location: ' . CLIENT_URL . 'voucher/list');

		} else {
			echo 0;
			//echo json_encode($dataSub);
			//header('Location: ' . CLIENT_URL . 'voucher/list?voucher_id=' . $id . '&success=0');
		}
	}	
}
?>