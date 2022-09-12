<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Receive.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$receive = new Receive();
$id = $_POST['id'];
$this_data = $receive->findById($id);
echo json_encode($this_data);

if (isset($_POST)) {

	//echo json_encode($dataSub);
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		$dataS = array(
			'WpReceive' => array(
				'id' => $_POST['id'] ?? $this_data['WpReceive']['id'],
				'user_id' => $this_data['WpReceive']['user_id'],			
				'created' => $this_data['WpReceive']['created'],
				'total_price' => $this_data['WpReceive']['total_price'],
				'transport' => $this_data['WpReceive']['transport'],		
				'address' => $this_data['WpReceive']['address'],		
				'state' => 1,				
				'code' => $this_data['WpReceive']['code']
			)
		);
		if ($receive->save($dataS)) {
		
			$link = $_POST['codeS'].'.json';
			$linkb = './log_session/'.$link;
			//file_put_contents($link, (json_encode (new stdClass)));
			unlink($linkb);
			header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
			
		} else {
			header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
		}
	}	
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && (intval($user->is_admin($_POST['emailS'])) != 1 )){
		$dataS = array(
			'WpReceive' => array(
				'id' => $_POST['id'] ?? $this_data['WpReceive']['id'],
				'user_id' => $this_data['WpReceive']['user_id'],			
				'created' => $this_data['WpReceive']['created'],
				'total_price' => $this_data['WpReceive']['total_price'],
				'transport' => $this_data['WpReceive']['transport'],		
				'address' => $this_data['WpReceive']['address'],		
				'state' => 2,				
				'code' => $this_data['WpReceive']['code']
			)
		);
		$date1 = date($this_data['WpReceive']['created'], strtotime("12 hours"));
		
		if (date() > $date1){
			if ($receive->save($dataS)) {
				$link = $_POST['codeS'].'.json';
				$linkb = './log_session/'.$link;
				//file_put_contents($link, (json_encode (new stdClass)));
				unlink($linkb);
				header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
				
			} else {
				header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
			}
		}
	 	else {
			header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
		}	
	}	
}
else {
	header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
}
?>