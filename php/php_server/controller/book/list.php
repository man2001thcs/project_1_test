<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

$book = new Book();
//$new_m =  $medicine->findById_New();
if ($_GET['codeLogin']){
	$link = $_GET['codeLogin'].'.json';
	$linkb = './log_session/'.$link;
	$linku = './log_session/user_book.json';
	//$page = 1;
	//$limit = 6;
	//echo json_encode($data);
	$resultS = $book->findAll();
	$resultU = $book->findAll_limit_book();
	//$resultS= $result->data;
	unlink($linku);
	file_put_contents($linkb, json_encode($resultS));	
	file_put_contents($linku, json_encode($resultU));	
	header('Location: ' . CLIENT_URL . 'book/list');	
	
}
?>