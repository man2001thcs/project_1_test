<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Author.php';
require_once '../../model/Buy_log.php';
require_once '../../model/Receive.php';

if (!isset($user)) {
	$user = new User();
}

if ($_POST) {
	$dataSub = array(
		  'User' => array(
			  'email' => $_POST['emailS'],
			  'password' => $_POST['passwordS'],
			  'codeLogin'=> $_POST['codeLogin']
			  )
		  );
	  
	  if ($user->login($dataSub)) {
		$link = $_POST['codeLogin'].'.json';
		$linka = './log_session/'.$link;
		$linkb = '../book/log_session/'.$link;

		$linku = '../book/log_session/user_book.json';
		$linku1 = '../author/log_session/user_author.json';

		$linkc = '../author/log_session/'.$link;
		$linkd = '../buy_log/log_session/'.$link;
		$linke = '../receive/log_session/'.$link;

		$user_info = $user->welcome( $_POST['emailS']);

		$book = new Book();
		//$result1 = $book->findAll();
		if (intval($user_info['is_admin']) == 1){
			$result1 = $book->findAll();
			file_put_contents($linkb, json_encode($result1));
		} else {
			$result1 = $book->findAll_limit_book();
			file_put_contents($linku, json_encode($result1));
		}

		$author = new Author();
		//$result2 = $author->findAll();	
		$result2 = $author->findAll();
		file_put_contents($linkc, json_encode($result2));
		//file_put_contents($linku1, json_encode($result2));


		$buy_log = new Buy_log();
		$receive = new Receive();
		if (intval($user_info['is_admin']) == 1){
			$result3 = $buy_log->findAll();
			$result4 = $receive->findAll();
		} else {
			$result3 = $buy_log->getDataWithCon($user_info['id']);
			$result4 = $receive->getDataWithCon($user_info['id']);
		}
		 
		//unlink($linka);
		file_put_contents($linka, json_encode($user->welcome( $_POST['emailS'])));	
		file_put_contents($linkd, json_encode($result3));
		file_put_contents($linke, json_encode($result4));
		header('Location:' . CLIENT_URL, true, 301);
   } else {
	header('Location: ' . CLIENT_URL . 'user/login?success=0', true, 301);
   }
} else {
	header('Location: '  . CLIENT_URL . 'user/login?success=0', true, 301);
}


?>
