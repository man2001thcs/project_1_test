<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Author.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$book = new Book();
$author = new Author();
$voucher_string = "";

if (isset($_POST)) {

	$voucher = json_decode($_POST['voucher_id'], true);
	usort($voucher, function($a, $b) {return strcmp($a['WpVoucher']['id'], $b['WpVoucher']['id']);});
	foreach ($voucher as $item){
		//echo json_encode($item);
		//echo $item['WpVoucher']['id'];
		$temp = $voucher_string;
		$voucher_string = $temp . strval($item['WpVoucher']['id']) . ';';
	}

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
			'author_id' => $_POST['author_id'] ?? "",
			'voucher_id' => $voucher_string ?? "",
			
			)
	);

	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($book->save($dataSub)) {
			if ($_POST['codeS']){
				//header('Location: ' . SERVER_URL . 'controller/book/list.php?codeLogin=' . $_POST["codeS"]);
				$linku = './log_session/user_book.json';
				$resultU = $book->findAll();
				file_put_contents($linku, json_encode($resultU));	
				//header('Location: ' . CLIENT_URL . 'book/list');	
				echo 1;
			}			
		} else {
			//header('Location: ' . CLIENT_URL . '/book/input?success=0');}
			echo 0;
		}	
	}
	else{
		//header('Location: ' . CLIENT_URL . '/book/input?success=0');
		echo 0;
	}
}
?>