<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

$account = $_POST['emailS'];
$code = $_POST['codeS'];

$user_info = $user->welcome($account);

$user_pass = $user->get_pass($account);

$new_password = isset($_POST['new_password']) ? Helper::hash($_POST['new_password']) : $user_pass['password'];

if ($_POST){
	$dataS = array(
		'User' => array(
			'id' => intval($user_info['id']),		
			'email' => $_POST['emailS'],
			'password' => $new_password,
			'fullname' => $_POST['fullname'] ?? $user_info['fullname'],
			'address' => $_POST['address'] ?? $user_info['address'],			
            'phone_number' => $_POST['phone_number'] ?? $user_info['phone_number'],			
			'is_admin' => $user_info['is_admin'],
			'code_login' => $user_info['code_login'],
			'created' => $user_info['created'],
			'modified' => date('Y-m-d H:i:s')
		)
	);
		
	if ($user->save($dataS)) {
		$link = $code.'.json';			
		$linka = './log_session/'.$link;
		file_put_contents($linka, json_encode($user->welcome( $_POST['emailS'])));		

		if (isset($_POST['address']) || isset($_POST['phone_number']) || isset($_POST['name'])){
			echo 1;
			//header('Location:' . CLIENT_URL . 'user/info?success=1');
		}
		if (isset($_POST['new_password'])){
			echo 1;
			//header('Location:' . CLIENT_URL . 'user/password?success=1');
		}
	} else {
		if (isset($_POST['address']) || isset($_POST['phone_number']) || isset($_POST['name'])){
			echo 0;
			//header('Location:' . CLIENT_URL . 'user/info?success=0');
		}
		if (isset($_POST['new_password'])){
			echo 0;
		}
	}
}

?>