<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Author.php';
require_once '../../model/Buy_log.php';
require_once '../../model/Voucher.php';
require_once '../../model/Receive.php';

if (!isset($user)) {
	$user = new User();
}

if ($_POST) {
	$dataSub = array(
		  'User' => array(
			  'email' => $_POST['emailS'],
			  'password' => $_POST['passwordS'],
			  'code_login'=> $_POST['codeS']
			  )
		  );
	  
	  if ($user->login($dataSub)) {
		$link = $_POST['codeS'].'.json';
		$linka = './log_session/'.$link;

		$linku = '../book/log_session/user_book.json';
		$linku1 = '../author/log_session/user_author.json';
		$linku2 = '../voucher/log_session/user_voucher.json';

		$linkd = '../buy_log/log_session/'.$link;
		$linke = '../receive/log_session/'.$link;

		$user_info = $user->welcome( $_POST['emailS']);

		$book = new Book();
		//$result1 = $book->findAll();
		$result1 = $book->findAll();
		file_put_contents($linku, json_encode($result1));

		$author = new Author();
		//$result2 = $author->findAll();	
		//$result2 = $author->findAll();
		//file_put_contents($linkc, json_encode($result2));
		
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

		$voucher = new Voucher();
		$result5 = $voucher->findAll();
		file_put_contents($linku2, json_encode($result5));
		 
		//unlink($linka);
		file_put_contents($linka, json_encode($user->welcome( $_POST['emailS'])));	
		file_put_contents($linkd, json_encode($result3));
		file_put_contents($linke, json_encode($result4));
		echo 1;
		//header('Location:' . CLIENT_URL, true, 301);
   } else {
	echo 0;
	//header('Location: ' . CLIENT_URL . 'user/login?success=0', true, 301);
   }
} else {
	echo 0;
	//header('Location: '  . CLIENT_URL . 'user/login?success=0', true, 301);
}


?>
