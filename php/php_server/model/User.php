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
			echo 1;
			$account =  "tk_" . $data[$this->alias]['email'];
			$code = $this->session->read(strval($account));
			if (isset($code)){
				$code = $this->session->read(strval($account)); 
				$this->session->delete(strval($account));
				unlink("../controller/user/log_session/" . $code . ".json");
			}
			$this->session->write(strval($account), $data[$this->alias]['codeLogin']);
			
			return true;
		}		
		return false;
	}

	//check if exist
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

	//check if exist
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
		
	public function logout($account) {
		$account = 'tk_' . $account;
		$this->session->delete($account);
		return true;
	}

	public function login_code($account) {
		$account = 'tk_' . $account;
		return $this->session->read($account);
	}

	public function is_admin($email) {		
		$exists = $this->find(array(
			'conditions' => array(
				'email' => $email			
			)
		), 'first');
				
		return $exists['User']['is_admin'];
	}

	public function welcome($email) {
		$exists = $this->find(array(
			'fields' => array($this->alias . '.id', $this->alias . '.fullname', $this->alias . '.address',
			 $this->alias . '.phone_number', $this->alias . '.is_admin'),	
			'conditions' => array(
				'email' => $email			
			)
		), 'first');			
		return $exists['User'];
	}
}