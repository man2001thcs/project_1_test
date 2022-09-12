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
		$link = 'user_author.json';
		$linkc = './log_session/'.$link;
		//file_put_contents($linkc, (json_encode (new stdClass)));
		unlink($linkc);
		header('Location: '. SERVER_URL . 'controller/author/list.php');
	}
	else {
		header('Location: ' . CLIENT_URL . 'author/list?success=0');
	}
	

}
?>

