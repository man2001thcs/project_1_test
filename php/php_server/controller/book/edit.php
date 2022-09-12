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
$id = $_POST['id'];
$this_data = $book->findById($id);
//echo json_encode($this_data);

if (isset($_POST)) {
	$dataSub = array(
		'WpBook' => array(
			'id' => $_POST['id'] ?? $this_data['WpBook']['id'],
			'name' => $_POST['name'] ?? $this_data['WpBook']['name'],
			'price' => $_POST['price'] ?? $this_data['WpBook']['price'],	
			'page_number' => $_POST['page_number'] ?? $this_data['WpBook']['page_number'],
			'remain_number' => $_POST['remain_number'] ?? $this_data['WpBook']['remain_number'],
			'bought_number' => $_POST['bought_number'] ?? $this_data['WpBook']['bought_number'],
			'type' => 	$_POST['type'] ?? $this_data['WpBook']['type'],
			'description' => $_POST['description'] ?? $this_data['WpBook']['description'],
			'created' => $this_data['WpBook']['created'],	
			'modified' => date('Y-m-d H:i:s') ?? $this_data['WpBook']['modified'],
			'author_id' => $_POST['author_id'] ?? $this_data['WpBook']['author_id']
			)
	);
	//echo json_encode($dataSub);
	if (strcmp($user->login_code($_POST['emailS']) ?? "", $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($book->save($dataSub)) {
			$link = $_POST['codeS'].'.json';
			$linkb = './log_session/'.$link;
			//file_put_contents($link, (json_encode (new stdClass)));
			header('Location: '. SERVER_URL . 'controller/book/list.php?codeLogin=' . $_POST["codeS"]);
			
		} else {
			header('Location: ' . CLIENT_URL . 'book/edit?book_id=' . $_POST['id'] . '&success=0');
		}
	}	
	else {
		header('Location: ' . CLIENT_URL . 'book/edit?book_id=' . $_POST['id'] . '&success=0');
	}
	
}
?>