<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");
require_once(dirname(__FILE__).DS. "../model/Author.php");

class Book extends AppModel {
	protected $table = 'wp_book';
	protected $alias = 'WpBook';
	
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
		"price" => array(
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
		"page_number" => array(
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
		"remain_number" => array(
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
		"bought_number" => array(
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
		"description" => array(
			"form" => array(
				"type" => "textarea"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"type" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
		"author_id" => array(
			"form" => array(
				"type" => "select",
				"options" => array()
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		)		
	);
	
	public function __construct() {
		$type1 = new Author();
		$catList1 = $type1->findAll();
		
		$cats1 = array("--Select--");
		if (!empty($catList1)) {
			foreach ($catList1 as $cat1) {
				$cats1[$cat1['WpAuthor']['id'] ?? ""] = $cat1['WpAuthor']['name'];
			}
		}
		
		$this->rules['author_id']['form']['options'] = $cats1;
		
		parent::__construct();
		
		$this->session = new Session();
	}
	
}