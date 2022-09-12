<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$book = new Book();

$id = isset($_POST['id']) ? intval($_POST['id']) : null;

if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
	if ($book->deleteById($id)){
		$link = $_POST['codeS'].'.json';
		$linkb = './log_session/'.$link;
		file_put_contents($linkb, (json_encode (new stdClass)));
		unlink($linkb);
		header('Location: ' . SERVER_URL . 'controller/book/list.php?codeLogin=' . $_POST["codeS"]);
	} else {
		header('Location: ' . CLIENT_URL . '/book/list?success=0');
	}
}
?>

