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

$id = isset($_POST['id']) ? intval($_POST['id']) : null;

if ($_POST){
	$medicine->deleteById($id);
	Helper::redirect('page/product/medicine');

}
?>

