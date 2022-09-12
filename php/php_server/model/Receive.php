<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");

class Receive extends AppModel {
	protected $table = 'wp_receive';
	protected $alias = 'WpReceive';
	private $session = null;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"user_id" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"total_price" => array(
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
		"transport" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"address" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"code" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		)		
	);
	
	public function __construct() {
		parent::__construct();
	}
	
	/*public function verifyCode() {
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
	*/
}