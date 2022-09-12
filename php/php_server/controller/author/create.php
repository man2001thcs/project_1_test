<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Author.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$author = new Author();

if (isset($_POST)) {
	
	$dataSub = array(
		'WpAuthor' => array(
			'name' => $_POST['name'] ?? '',
			'address' => $_POST['address']  ?? '', 	
			'phone' => $_POST['phone']  ?? '',
			'specialization' => $_POST['specialization']  ?? '',
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s')			
			)
	);
	echo json_encode($dataSub);
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($author->save($dataSub)) {
			if ($_POST['codeS']){
				$link = 'user_author.json';
				$linkc = './log_session/'.$link;
				//file_put_contents($linkc, (json_encode (new stdClass)));
				unlink($linkc);
				header('Location: ' . SERVER_URL . 'controller/author/list.php?email='.$_POST['emailS']);
			}
			
		} else {
			header('Location: ' . CLIENT_URL . 'author/input?success=0');
		}
	}	
}
else {
	header('Location: ' . CLIENT_URL . 'author/input?success=0');
}
?>