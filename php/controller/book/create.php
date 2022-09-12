<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

if (!$user->isLoggedIn() || !$user->isAdmin()) {
	Helper::redirect_err();
}

$book = new Book();
//$new_m =  $medicine->findById_New();


if ($_POST) {

	$data = $_POST['data'];
	//echo json_encode($data);
	$data['WpBook']['created'] = date('Y-m-d H:i:s');
	$data['WpBook']['modified'] = date('Y-m-d H:i:s');


	$book->save($data);
}
?>
