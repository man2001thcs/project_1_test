<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Author.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

$author = new Author();
//$new_m =  $medicine->findById_New();

if ($_GET['email']) {
	$linku = './log_session/user_author.json';
	//file_put_contents($linkc, (json_encode (new stdClass)));
	//echo json_encode($data);
	$resultS = $author->findAll();
	//$resultS= $result->data;
	unlink($linku);
	file_put_contents($linku, json_encode($resultS));	
	header('Location: ' . CLIENT_URL . 'author/list');
}
?>
