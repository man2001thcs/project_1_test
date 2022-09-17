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
$id = $_POST['id'] ?? 1;
$this_data = $author->findById($id);

if (isset($_POST)) {
	$dataSub = array(
		'WpAuthor' => array(
			'id' => $_POST['id'] ?? $id,
			'name' => $_POST['name'] ?? $this_data['WpAuthor']['name'],
			'address' => $_POST['address'] ?? $this_data['WpAuthor']['address'],
			'phone' => $_POST['phone'] ?? $this_data['WpAuthor']['phone'],
			'specialization' => $_POST['specialization']  ?? $this_data['WpAuthor']['specialization'],
			'created' => $this_data['WpAuthor']['created'],
			'modified' => date('Y-m-d H:i:s') ?? $this_data['WpAuthor']['modified']			
			)
	);
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($author->save($dataSub)) {
			$linku = './log_session/user_author.json';
			$resultS = $author->findAll();
			file_put_contents($linku, json_encode($resultS));
			echo 1;	
			//header('Location: ' . CLIENT_URL . 'author/list');
		} else {
			echo 0;	
			//header('Location: ' . CLIENT_URL . 'author/list?author_id=' . $id . '&success=0');
		}
	}	
}
?>