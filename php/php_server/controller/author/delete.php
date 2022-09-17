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

$id = isset($_POST['id']) ? intval($_POST['id']) : null;

if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
	if ($author->deleteById($id)){
		$linku = './log_session/user_author.json';
		$resultS = $author->findAll();
		file_put_contents($linku, json_encode($resultS));	
		//header('Location: ' . CLIENT_URL . 'author/list');
		echo 1;	
	}
	else {
		//header('Location: ' . CLIENT_URL . 'author/list?success=0');
		echo 0;	
	}
	

}
?>

