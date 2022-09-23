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

$book = new Book();
$receive = new Receive();
$buy_log = new Buy_log();
$id = $_POST['id'];
$this_data = $receive->findById($id);

$recall_cancel = 0;
$recall_accept = 0;
//echo json_encode($this_data);

if (isset($_POST)) {
	//echo $_POST['description'];

	//echo json_encode($dataSub);
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){

		$dataS = $this_data;

		if (intval($_POST['command']) == 1){
			if ($this_data['WpReceive']['state'] == 0){
				$recall_accept = 1;
				$dataS['WpReceive']['state'] = 1;
				$dataS['WpReceive']['description'] = ('Acepted: ' .$_POST['description'])  ?? 'Acepted!!';
			}
		}

		if (intval($_POST['command']) == 2){
			$dataS['WpReceive']['state'] = 2;
			$dataS['WpReceive']['description'] = ('Complete: ' .$_POST['description'])  ?? 'Complete!!';
		}

		if (intval($_POST['command']) == 3){
			if ($this_data['WpReceive']['state'] == 1){
				$recall_cancel = 1;
				$dataS['WpReceive']['state'] = 3;
				$dataS['WpReceive']['description'] = ('Cancel by admin: ' .$_POST['description'])  ?? 'Cancel by admin!!';
			} else if ($this_data['WpReceive']['state'] == 0) {
				$recall_cancel = 0;
				$dataS['WpReceive']['state'] = 3;
				$dataS['WpReceive']['description'] = ('Cancel by admin: ' .$_POST['description'])  ?? 'Cancel by admin!!';
			}
		}

		if (intval($_POST['command']) == 4){
			$dataS['WpReceive']['description'] = ('Message: ' .$_POST['description'])  ?? 'Complete!!';
		}

		if ($receive->save($dataS)) {
			
			$link = $user->login_code($_POST['emailS']).'.json';
			$linkc = './log_session/'.$link;
			$linkd = '../buy_log/log_session/'.$link;

			//save receive
			$user_info = $user->welcome($_POST['emailS']);
			if (intval($user->is_admin($_POST['emailS']) == 1)){
				$result4 = $receive->findAll();
			} else {
				$result4 = $receive->getDataWithCon($user_info['id']);
			}
			file_put_contents($linkc, json_encode($result4));
			
			//change book record
			if ($recall_accept == 1){

				$data_buy_log = $buy_log->findByReceiveId($id);

				foreach($data_buy_log as $item) {
	
					$item = $item['WpBuyLog'];	
					$data_book = $book->findById($item['book_id']);
	
					$data_book['WpBook']['remain_number'] = $data_book['WpBook']['remain_number'] - $item['number']; 
					$data_book['WpBook']['bought_number'] = $data_book['WpBook']['bought_number'] + $item['number']; 
					if ($book->save($data_book)){
	
						$linku = './log_session/user_book.json';
						$resultU = $book->findAll();
						file_put_contents($linku, json_encode($resultU));
						echo 1;
						//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
					}
				}
			}

			echo 1;

			if ($recall_cancel == 1){

				$data_buy_log = $buy_log->findByReceiveId($id);

				foreach($data_buy_log as $item) {
	
					$item = $item['WpBuyLog'];	
					$data_book = $book->findById($item['book_id']);
	
					$data_book['WpBook']['remain_number'] = $data_book['WpBook']['remain_number'] + $item['number']; 
					$data_book['WpBook']['bought_number'] = $data_book['WpBook']['bought_number'] - $item['number']; 

					if ($book->save($data_book)){
	
						$linku = './log_session/user_book.json';
						$resultU = $book->findAll();
						file_put_contents($linku, json_encode($resultU));
						echo 1;
						//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
					}
				}
			}
			//
			

			//file_put_contents($link, (json_encode (new stdClass)));
			echo 1;
			//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
			
		} else {
			echo 0;
			//header('Location:' . CLIENT_URL . 'buy_log/list?success=0');
		}
	}	
	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && (intval($user->is_admin($_POST['emailS'])) != 1 )){

		$dataS = $this_data;

		$date1 = date($this_data['WpReceive']['created'], strtotime("12 hours"));
		
		if (date('Y-m-d H:i:s') > $date1 && $this_data['WpReceive']['state'] != 2){

			
			if ($this_data['WpReceive']['state'] == 0) {
				$dataS['WpReceive']['state'] = 3;
				$dataS['WpReceive']['description'] = ('Cancel by user: ' .$_POST['description'])  ?? 'Cancel by user!!';
			}			

			if ($receive->save($dataS)) {
				$link = $user->login_code($_POST['emailS']).'.json';
				$linkc = './log_session/'.$link;
				$linkd = '../buy_log/log_session/'.$link;

				//save receive
				$user_info = $user->welcome($_POST['emailS']);
				if (intval($user->is_admin($_POST['emailS']) == 1)){
					$result4 = $receive->findAll();
				} else {
					$result4 = $receive->getDataWithCon($user_info['id']);
				}
				file_put_contents($linkc, json_encode($result4));
				//

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