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

if (isset($_POST)) {
	$dataSub = array(
		'WpBook' => array(
			'name' => $_POST['name'] ?? '',
			'price' => $_POST['price']  ?? '', 	
			'page_number' => $_POST['page_number']  ?? '',
			'bought_number' => $_POST['bought_number']  ?? '',
			'remain_number' => $_POST['remain_number']  ?? '',
			'description' => $_POST['description']  ?? '',
			'type' => $_POST['type']  ?? '',
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s'),			
			'author_id' => $_POST['author_id']  ?? ''
			)
	);

	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($book->save($dataSub)) {
			if ($_POST['codeS']){
				$link = $_POST['codeS'].'.json';
				$linkb = './log_session/'.$link;		
				//file_put_contents($linkb, (json_encode (new stdClass)));
				unlink($linkb);
				header('Location: ' . SERVER_URL . 'controller/book/list.php?codeLogin=' . $_POST["codeS"]);
			}
			
		} else {
			header('Location: ' . CLIENT_URL . '/book/input?success=0');}
	}
	else{
		header('Location: ' . CLIENT_URL . '/book/input?success=0');
	}
}
?>