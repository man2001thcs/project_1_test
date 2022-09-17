<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");

class Voucher extends AppModel {
	protected $table = 'wp_voucher';
	protected $alias = 'WpVoucher';
	
	private $session = null;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"name" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"threshold" => array(
			"form" => array(
				"type" => "text"
			)
		),
		"discount" => array(
			"form" => array(
				"type" => "text"
			)
		),
		"discount_rate" => array(
			"form" => array(
				"type" => "text"
			)
		)
	);
	
	public function __construct() {
		parent::__construct();
		
		$this->session = new Session();
	}
	
}