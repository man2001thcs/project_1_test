<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");

class User extends AppModel {
	protected $table = 'user';
	protected $alias = 'User';
	
	private $session = null;

	//private $cart = array();
	//private $cartNum = 0;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"email" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			),
			"isEmail" => array(
				"rule" => "email",
				"message" => MSG_ERR_EMAIL
			)
		),
		"password" => array(
			"form" => array(
				"type" => "password"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"passwordNew" => array(
			"form" => array(
				"type" => "password"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"re_passwordNew" => array(
			"form" => array(
				"type" => "password"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"fullname" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"phone_number" => array(
			"form" => array(
				"type" => "textarea"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"address" => array(
			"form" => array(
				"type" => "textarea"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		)
	);
	
	public function __construct() {
		parent::__construct();
		
		$this->session = new Session();
	}

	
	public function saveLogin($data) {
		$data[$this->alias]['password'] = Helper::hash($data[$this->alias]['password']);
		
		return parent::save($data);
	}
	
	public function login($data) {
		$exists = $this->find(array(
			'conditions' => array(
				'email' => $data[$this->alias]['email'],
				'password' => Helper::hash($data[$this->alias]['password'])
			)
		), 'first');

		if (!empty($exists)) {
			// Login user
			$this->session->write(USER_INFO, $exists);
			$this->session->write(LOGGED_IN, true);
			
			return true;
		}
		
		return false;
	}

	public function check($data) {
		$exists = $this->find(array(
			'conditions' => array(
				'email' => $data[$this->alias]['email'],
				'password' => Helper::hash($data[$this->alias]['password'])
			)
		), 'first');

		if (!empty($exists)) {		
			return true;
		}
		
		return false;
	}

	public function checkUser($data) {
		$exists = $this->find(array(
			'conditions' => array(
				'email' => $data[$this->alias]['email']		
			)
		), 'first');

		if (!empty($exists)) {		
			return true;
		}
		
		return false;
	}
	
	public function isLoggedIn() {
		return $this->session->read(LOGGED_IN);
	}
	
	public function logout() {
		$this->session->destroy();
	}


	public function welcome() {
		$data = $this->session->read(USER_INFO);
		return $data[$this->alias]['fullname'];
	}

	public function welcome_address() {
		$data = $this->session->read(USER_INFO);
		return $data[$this->alias]['address'];
	}

	public function welcomeID() {
		$data = $this->session->read(USER_INFO);
		return $data[$this->alias]['id'];
	}
	
	public function isAdmin() {
		$data = $this->session->read(USER_INFO);
		
		return $data[$this->alias]['is_admin'];
	}

	
	//cart thing

	public function addCart($data){
		if (empty($this->session->read(CART))){
			$data['stt'] = 1;
			$data = array( 1 => $data);
			$this->session->write(CART, $data);
			return;
		}
		$dataS = $this->session->read(CART);
		$data['stt'] = sizeof($dataS) + 1;
		$dataS[$data['stt']] = $data;
		//echo json_encode($dataS);
		//echo "<br>";
		//$dataS = array_push($dataS, $data);
		$this->session->write(CART, $dataS);
	}

	public function getCart(){
		return $this->session->read(CART);
	}

	public function deleteCart($index){
		if (empty($this->session->read(CART))){
			return;
		}
		//$this->session->delete(CART);
		$dataS = $this->session->read(CART);
		$this->session->delete(CART);
		//echo $index;
		unset($dataS[$index]);
		$data_mon = $this->session->read(CART_TOTAL);
		$bill_money = $dataS[$index]['WpBuyLog']['total_price'];
		$this->session->write(CART_TOTAL, $data_mon - $bill_money);
		/*while ($dataS[$index + 1] != null){
			$dataS[$index] = $dataS[$index + 1];
			$index = $index + 1;
		}
		$dataS[$index] = null;
		*/
		$this->session->write(CART, $dataS);
	}

	public function destroyCart(){
		$this->session->delete(CART);
	}

	//cart total money thing

	public function Cart_total_money(){
		if (empty($this->session->read(CART))){
			return 0;
		}

		$data = $this->session->read(CART);
		$total_money = 0;
		foreach ($data as $item){
			$total_money += $item['WpBuyLog']['total_price'];
		}
		return $total_money;
	}
}