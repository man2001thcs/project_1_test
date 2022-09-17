<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Receive.php';
require_once '../../model/Voucher.php';
require_once '../../model/Buy_log.php';

date_default_timezone_set('Asia/Ho_Chi_Minh');

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$receive = new Receive();
$id = $_POST['id'];
$this_data = $receive->findById($id);
//echo json_encode($this_data);

if (isset($_POST)) {
	//echo $_POST['description'];

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
				'description' => $_POST['description'] ?? '',			
				'code' => $this_data['WpReceive']['code']
			)
		);
		if (intval($_POST['command']) == 0){
			$dataS['WpReceive']['state'] = 2;
			$dataS['WpReceive']['description'] = ('Cancel by admin: ' .$_POST['description'])  ?? 'Cancel by admin';
		}

		if ($receive->save($dataS)) {
			
			$link = $user->login_code($_POST['emailS']).'.json';
			$linkc = './log_session/'.$link;
			$linkd = '../buy_log/log_session/'.$link;

			$user_info = $user->welcome($_POST['emailS']);

			if (intval($user->is_admin($_POST['emailS']) == 1)){
				$result4 = $receive->findAll();
			} else {
				$result4 = $receive->getDataWithCon($user_info['id']);
			}
			file_put_contents($linkc, json_encode($result4));
			//file_put_contents($link, (json_encode (new stdClass)));
			echo 1;
			//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
			
		} else {
			echo 0;
			//header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
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
				'description' => ('Cancel by user: ' .$_POST['description'])  ?? 'Cancel by user',			
				'code' => $this_data['WpReceive']['code']
			)
		);
		$date1 = date($this_data['WpReceive']['created'], strtotime("12 hours"));
		
		if (date('Y-m-d H:i:s') > $date1){
			if ($receive->save($dataS)) {
				$link = $user->login_code($_POST['emailS']).'.json';
				$linkc = './log_session/'.$link;
				$linkd = '../buy_log/log_session/'.$link;

				$receive = new Receive();

				$user_info = $user->welcome($_POST['emailS']);

				if (intval($user->is_admin($_POST['emailS']) == 1)){
					$result4 = $receive->findAll();
				} else {
					$result4 = $receive->getDataWithCon($user_info['id']);
				}
				file_put_contents($linkc, json_encode($result4));

				echo 1;
				//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
				
			} else {
				echo 0;
				//header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
			}
		}
	 	else {
			echo 0;
			//header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
		}	
	}	
}
else {
	echo 0;
	//header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
}
?>