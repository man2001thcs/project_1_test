<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

if ($_POST) {
	$dataSub = array(
		  'User' => array(
			  'email' => $_POST['email'],
			  'password' => $_POST['password']
			  )
		  );
	  
	  if ($user->login($dataSub)) {
		  if ($user->isAdmin()) {
			  header('Location: ../../../page/main_page/main/list.php');
		  } else {
			  header('Location: ../../../page/main_page/main/list.php');
		  }
	  } else {
		  $login = false;
	  }
  }


?>
