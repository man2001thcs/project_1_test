<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn()) {
//	Helper::redirect_err();
//}

$account = $_POST['emailS'];
echo($_POST['emailS'] ?? 1);
$code = $_POST['codeS'];
echo($code);
$user_info = $user->welcome($account);
echo(json_encode($user_info));
//echo(1);

//if (empty($id)) {
	//Helper::redirect('index.php');
//}


//$user_info = $user->findById($id);
//$user->findById($id);

    if ($_POST){
		$dataS = array(
			'User' => array(
				'id' => intval($user_info['id']),		
				'email' => $_POST['emailS'],
				'password' =>Helper::hash($_POST['new_password']) ?? $user_info['password'],
				'fullname' => $_POST['name'] ?? $user_info['fullname'],
				'address' => $_POST['address'] ?? $user_info['address'],			
                'phone_number' => $_POST['phone_number'] ?? $user_info['phone_number'],
				'is_admin' => $user_info['is_admin'],
				'created' => $user_info['created'],
				'modified' => date('Y-m-d H:i:s')
			)
		);
		
	    if ($user->save($dataS)) {
			$link = $code.'.json';			
			$linka = './log_session/'.$link;
			unlink($linka);
			file_put_contents($linka, json_encode($user->welcome( $_POST['emailS'])));		

			if (isset($_POST['address']) || isset($_POST['phone_number']) || isset($_POST['name'])){
				header('Location:' . CLIENT_URL . 'user/info?success=1');
			}
			if ($_POST['new_password']){
				header('Location:' . CLIENT_URL . 'user/password?success=1');
			}
	    } else {
			if (isset($_POST['address']) || isset($_POST['phone_number']) || isset($_POST['name'])){
				header('Location:' . CLIENT_URL . 'user/info?success=0');
			}
			if ($_POST['new_password']){
				header('Location:' . CLIENT_URL . 'user/password?success=0');
			}
		}
	}

?>