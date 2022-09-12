<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");

class Buy_log extends AppModel {
	protected $table = 'wp_buy_log';
	protected $alias = 'WpBuyLog';
	private $session = null;
	
	protected $rules = array(
		"number" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			),
			"isNumber" => array(
				"rule" => "isNumber",
				"message" => MSG_ERR_NUMER
			)
		),
	);
	
	public function __construct() {
		parent::__construct();
	}
	
	public function verifyCode() {
		$chars = 'abcdefghijklmnopqrstuv0123456789';
		
		$length = strlen($chars);
		
		$code = array();
		// Code has 5 chars
		for ($i = 0;$i < 5;$i++) {
			$idx = rand() % $length;
			
			$code[] = strtoupper($chars[$idx]);
		}
		
		return implode('', $code);
	}
	
	
}