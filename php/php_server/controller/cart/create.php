<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Buy_log.php';
require_once '../../model/Receive.php';

date_default_timezone_set('Asia/Ho_Chi_Minh');

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$book = new Book();
$buy_log = new Buy_log();
$receive = new Receive();

if (isset($_POST)) {
	$data = $_POST['cart'] ?? [];
	$data = json_decode($data, true);

	$dataS1 = array(
		'WpReceive' => array(
			'user_id' => intval($_POST['user_id']) ?? "",
			'created' => date('Y-m-d H:i:s'),
			'total_price' => intval($_POST['total_price_all']) ?? "",
			'transport' => $_POST['delivery-collection'] ?? "",		
			'address' => $_POST['address'] ?? "",		
			'state' => 0 ?? 0,				
			'code' => $_POST['code'] ?? ""
		)
	);
	echo json_encode($dataS1);
	//$receive->save($dataS1);

	if ($receive->save($dataS1)){

		foreach($data as $item) {				
			
			$dataS2 = array(
				'WpBuyLog' => array(
					'receive_id' => $receive->getNextId(),
					'user_id' => $_POST['user_id'],
					'book_id' => $item['book_id'],
					'price' => $item['price'],
					'number' => $item['number'],			
				)
			);
			echo json_encode($dataS2);
			
			if ($buy_log->save($dataS2)){

				$item = $dataS2['WpBuyLog'];

				$data_book = $book->findById($item['book_id']);
				$data_book['WpBook']['remain_number'] = $data_book['WpBook']['remain_number'] - $item['number']; 
				$data_book['WpBook']['bought_number'] = $data_book['WpBook']['bought_number'] + $item['number']; 
				if ($book->save($data_book)){
					header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
				} else {
					header('Location: ' . CLIENT_URL . 'user/cart?success=0', true, 301);										
    			}
			}
		}
	} else {
		header('Location: ' . CLIENT_URL . 'user/cart?success=0', true, 301);
	}	
}		
?>