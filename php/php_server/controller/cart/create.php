<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';
require_once '../../model/Buy_log.php';
require_once '../../model/Receive.php';
require_once '../../model/Voucher.php';

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
$voucher = new Voucher();

$re_check_price = 0;
$re_check_item = 0;
$re_check_discount = 0;

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
			'voucher_id' =>	$_POST['voucher_id'] ?? "1",	
			'state' => 0,				
			'description' => 'Wait...',		
			'code' => $_POST['code'] ?? ""
		)
	);

	//echo json_encode($dataS1);
	//echo json_encode($data);

	//echo json_encode($_POST['voucher_id'] ?? 1);
	//$receive->save($dataS1);

	foreach($data as $item) {	

		//echo json_encode($item);

		$this_book = $book->findById($item['book_id']);	

		if (isset($item['item_discount_id']) && ($item['item_discount_id'] ?? '') !=''){

			if (isset($this_book['WpBook']['voucher_id']) && ($this_book['WpBook']['voucher_id'] ?? '') !=''){

				$voucher_array = explode(';', $this_book['WpBook']['voucher_id']);	
				if (in_array($item['item_discount_id'], $voucher_array, TRUE)){
	
					$this_voucher = $voucher->findById($item['item_discount_id']);	
					$re_check_price = $re_check_price + intval($item['number']) * intval($this_book['WpBook']['price']) * (1 - floatval($this_voucher['WpVoucher']['discount_rate']));
				
				} else {
					$re_check_item++;
				}
			}
			
			if (isset($_POST['voucher_id']) && ($_POST['voucher_id'] ?? '') != "0"){
				if (in_array($_POST['voucher_id'], $voucher_array, TRUE)){
					$re_check_discount++;
				}	
			} else $re_check_discount = 1;	
		} else {
			$re_check_price = $re_check_price + intval($item['number']) * intval($this_book['WpBook']['price']);
		}

	}

	if (isset($_POST['voucher_id']) && ($_POST['voucher_id'] ?? '') != "0"){
		//
	} else $re_check_discount = 1;	

	//echo "item:" . $re_check_item;
	//echo "item_Dis:" . $re_check_discount;

	if ($re_check_item == 0){

		if (isset($_POST['voucher_id']) && ($_POST['voucher_id'] ?? '') != "0"  && $re_check_discount > 0){
			$this_voucher_receive = $voucher->findById($_POST['voucher_id']);
			$re_check_price = $re_check_price - intval($this_voucher_receive['WpVoucher']['discount'])  ?? 0;
        	$dataS1['WpReceive']['total_price']  = $re_check_price;
		} else {
        	$dataS1['WpReceive']['total_price']  = $re_check_price;
		}

		

		if ($receive->save($dataS1)){

			foreach($data as $item) {				
			
				$dataS2 = array(
					'WpBuyLog' => array(
						'receive_id' => $receive->getNextId(),
						'user_id' => $_POST['user_id'],
						'book_id' => $item['book_id'],
						'price' => $item['price'],
						'number' => $item['number'],
						'item_voucher_id' => $item['item_discount_id'] ?? ''	
					)
				);

				//echo json_encode($dataS2);
			
				if ($buy_log->save($dataS2)){												
					echo 1;			
					//header('Location: ' . SERVER_URL . 'controller/receive/list.php?account=' . $_POST['emailS']);
				}
			}

			$user_info = $user->welcome($_POST['emailS']);

			$linkc = '../receive/log_session/' . $_POST['code'] . '.json';
			$linkd = '../buy_log/log_session/' . $_POST['code'] . '.json';

			if (intval($user->is_admin($_POST['emailS']) == 1)){
				$result4 = $receive->findAll();
				$resultS = $buy_log->findAll();
			} else {
				$resultS = $buy_log->getDataWithCon($user_info['id']);
				$result4 = $receive->getDataWithCon($user_info['id']);
			}

			file_put_contents($linkc, json_encode($result4));
			file_put_contents($linkd, json_encode($resultS));	

		} else {
			echo 0;
			//header('Location: ' . CLIENT_URL . 'user/cart?success=0', true, 301);
		}	
	} else {
		echo 0;
	}
}		
?>