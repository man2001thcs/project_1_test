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

$this_data = $book->findById($id);

if (isset($_POST)) {

	$data = $_POST['data'];
	$data['WpBook']['modified'] = date('Y-m-d H:i:s');

	if ($medicine->save($data)) {
		header('Location: index.php');
	}
}
?>