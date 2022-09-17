<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';


if (!isset($user)) {
	$user = new User();
}


if ($_POST) {

	$dataS = array(
		'User' => array(
			'email' => $_POST['emailS'],
			'password' => $_POST['passwordS'],
			'fullname' => $_POST['fullname'],
			'address' => $_POST['address'],
			'phone_number' => $_POST['phone_number'],
			'is_admin' => "0",
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s')
		)
	);

	if ($user->checkUser($dataS)){
		//header('Location: ' . CLIENT_URL . 'signIn' . '?sign=2', true, 301);		
	} else{		
		if ($user->saveLogin($dataS)) {
			//header('Location: ' . CLIENT_URL . 'login' . '?sign=1', true, 301);
		} else {
			//header('Location:  ' . CLIENT_URL . 'signIn' . '?sign=3', true, 301);	
		}
				
	}	
}

?>


?>
