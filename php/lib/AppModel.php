<?php
if (!class_exists("MysqlDriver")) require_once(dirname(__FILE__) . DS . "MysqlDriver.php");
if (!class_exists("Form")) require_once(dirname(__FILE__) . DS . "Form.php");

/**
 * Base class for all model
 * @author TrungBQ
 *
 */
class AppModel
{
	/**
	 * Database connection
	 */
	protected $db = null;

	/**
	 * Alias to return the data
	 */
	protected $alias = null;

	/**
	 * Name of the table in database
	 */
	protected $table = '';

	//for get data, pagination
	private $_limit;
	private $_page;
	private $_total;

	/**
	 * Current data this record is holding
	 */
	protected $data = null;

	/**
	 * Validation errors
	 */
	protected $errors = null;

	/**
	 * Form helper
	 */
	public $form = null;

	/**
	 * Rules to validate
	 */
	protected $rules = null;

	public function __construct()
	{
		// Create db instance
		$this->db = MysqlDriver::getInstance();

		// Set log query file path
		$this->db->setLogFile(dirname(__FILE__) . '/../logs/queries.log');

		// Form object
		$this->form = new Form();
		$this->form->setModel($this->alias);
		$this->form->setRules($this->rules);
	}

	//save data
	public function save($data)
	{
		$this->data = $data;
		$this->form->data = $data;

		if (!$this->form->validate($this->data[$this->alias])) {
			return false;
		}

		if (isset($this->data[$this->alias]['id']) && !empty($this->data[$this->alias]['id'])) {
			$id = $this->data[$this->alias]['id'];
			return $this->db->update($this->table, $this->data[$this->alias], array('id' => $id));
		} else {
			unset($this->data[$this->alias]['id']);
			$saved = $this->db->insert($this->table, $this->data[$this->alias]);
			if ($saved) {
				$this->data[$this->alias]['id'] = $this->db->lastInsertId();
				return $saved;
			}
		}
	}

	public function find($conditions, $first = 'all')
	{
		$results = $this->db->select($this->table, $conditions);
		//echo json_encode($conditions);

		if (!empty($results) && $first == 'first') {
			return $results[0];
		}
		//echo json_encode($results);

		return $results;
	}


	//find thing by id
	public function findById($id)
	{
		$data = $this->find(array(
			'conditions' => array($this->alias . '.id' => $id)
		), 'first');
		$this->form->data = $data;
		return $data;
	}

	//new id for next item
	public function findById_New()
	{
		$data = $this->find(array(
			'fields' => array($this->alias . '.id'),
			'orders' => $this->alias . '.id' . ' DESC',
		), 'first');
		return intval($data[$this->alias]['id']) + 1;
	}

	//find by name part
	public function findByNamePart($name)
	{
		$temp = "LIKE '%";
		$temp .= $name . "%'";
		$data = $this->find(array(
			'conditions' => array($this->alias . '.name' => $temp)
		), 'all');
		$this->form->data = $data;
		return $data;
	}

	//find user by name
	public function findUserByName($name) {
		$temp = "LIKE '%";
		$temp .= $name."%'";
		$data = $this->find(array(
			'coditions' => array($this->alias.'.name' => $temp)
		), 'all');
		$this->form->data = $data;
		return $data;
	}

	//find user by id
	public function findById_User($id)
	{
		$data = $this->find(array(
			'fields' => array($this->alias . '.email', $this->alias . '.fullname'),
			'conditions' => array($this->alias . '.id' => $id)
		), 'first');

		$this->form->data = $data;
		return $data;
	}
	//get number of row
	public function number_all()
	{
		$data = $this->find(array(
			'fields' => array($this->alias . '.id')
		), 'all');

		$size = sizeof($data);
		$this->_total = $size;
		return $size;
	}
	//delete by id
	public function deleteById($id)
	{
		$this->db->delete($this->table, array(
			$this->table . '.id' => $id
		));
		return true;
	}

	//delete by condition
	public function delete($conditions)
	{
		$this->db->delete($this->table, $conditions);
	}
	//get all for test
	public function findAll()
	{
		return $this->db->select($this->table);
	}

	//get data with limit
	public function getData($limit = 6, $page = 1)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			$results = $this->db->select($this->table, array(
				'offset' => ($this->_limit * ($this->_page - 1)),
				'limit' => $this->_limit
			));
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}
    //get data with rank
	public function getDataRank($limit = 6, $page = 1)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			$results = $this->db->select($this->table, array(
				'orders' => $this->alias . '.bought_number' . ' DESC',
				'offset' => ($this->_limit * ($this->_page - 1)),
				'limit' => $this->_limit
			));
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;
        
		return $result;
	}

   //get data with same type (product)
	public function getDataSameType($types, $limit = 6, $page = 1)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			$results = $this->db->select($this->table, array(
				'conditions' => array($this->alias . '.type' => $types)
		    ));
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}

	//getdata but with condition for bill
	public function getDataWithConM($limit = 6, $page = 1, $user_id = 0)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			if ($user_id != 0) {
				$results = $this->db->select($this->table, array(
					'offset' => ($this->_limit * ($this->_page - 1)),
					'limit' => $this->_limit,
					'conditions' => array($this->alias . '.user_id' => $user_id, $this->alias . '.tool_id' => 0)
				));
			} else {
				$results = $this->db->select($this->table, array(
					'offset' => ($this->_limit * ($this->_page - 1)),
					'limit' => $this->_limit,
					'conditions' => array($this->alias . '.tool_id' => 0)
				));
			}
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}

	public function getDataWithConT($limit = 6, $page = 1, $user_id = 0)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			if ($user_id != 0) {
				$results = $this->db->select($this->table, array(
					'offset' => ($this->_limit * ($this->_page - 1)),
					'limit' => $this->_limit,
					'conditions' => array($this->alias . '.user_id' => $user_id, $this->alias . '.medicine_id' => 0)
				));
			} else {
				$results = $this->db->select($this->table, array(
					'offset' => ($this->_limit * ($this->_page - 1)),
					'limit' => $this->_limit,
					'conditions' => array($this->alias . '.medicine_id' => 0)
				));
			}
		}

		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}


	public function number_all_billM($user_id = 0)
	{
		if ($user_id == 0) {
			$data = $this->find(array(
				'fields' => array($this->alias . '.id'),
				'conditions' => array($this->alias . '.tool_id' => 0)
			), 'all');
		} else {
			$data = $this->find(array(
				'fields' => array($this->alias . '.id'),
				'conditions' => array($this->alias . '.user_id' => $user_id, $this->alias . '.tool_id' => 0)
			), 'all');
		}
		$size = sizeof($data);
		//echo $size;
		$this->_total = $size;
		return $size;
	}

	public function number_all_billT($user_id = 0)
	{
		if ($user_id == 0) {
			$data = $this->find(array(
				'fields' => array($this->alias . '.id'),
				'conditions' => array($this->alias . '.medicine_id' => 0)
			), 'all');
		} else {
			$data = $this->find(array(
				'fields' => array($this->alias . '.id'),
				'conditions' => array($this->alias . '.user_id' => $user_id, $this->alias . '.medicine_id' => 0)
			), 'all');
		}

		$size = sizeof($data);
		$this->_total = $size;
		//echo $size;
		return $size;
	}

	//pagination for page
	public function createLinks($links, $list_class = 'pagination')
	{

		if ($this->_limit == 'all') {
			return '';
		}

		$last       = ceil($this->_total / $this->_limit);

		$start      = (($this->_page - $links) > 0) ? $this->_page - $links : 1;
		$end        = (($this->_page + $links) < $last) ? $this->_page + $links : $last;

		$html       = '<nav class="' . $list_class . '">';
		$html       = '<ul class="' . $list_class . '">';

		$class      = ($this->_page == 1) ? "disabled" : "";
		if ($this->_page == 1) {
			$html       .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . ($this->_page) . '">&laquo;</a></li>';
		} else {
			$html       .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . ($this->_page - 1) . '">&laquo;</a></li>';
		}

		if ($start > 1) {
			$html   .= '<li><a href="?limit=' . $this->_limit . '&page=1">1</a></li>';
			$html   .= '<li class="disabled"><span>...</span></li>';
		}

		for ($i = $start; $i <= $end; $i++) {
			$class  = ($this->_page == $i) ? "active" : "";
			$html   .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . $i . '">' . $i . '</a></li>';
		}

		if ($end < $last) {
			$html   .= '<li class="disabled"><span>...</span></li>';
			$html   .= '<li><a href="?limit=' . $this->_limit . '&page=' . $last . '">' . $last . '</a></li>';
		}

		$class      = ($this->_page == $last) ? "disabled" : "";
		if ($this->_page == $last) {
			$html       .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . ($this->_page) . '">&raquo;</a></li>';
		} else {
			$html       .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . ($this->_page + 1) . '">&raquo;</a></li>';
		}
		$html       .= '</ul>';

		return $html;
	}

	//delete by condition
	public function delete2($conditions)
	{
		$this->db->delete($this->table, $conditions);
	}
	//get all for test
	public function findAll2()
	{
		return $this->db->select($this->table);
	}

	//get data with limit
	public function getData2($limit = 6, $page = 1)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			$results = $this->db->select($this->table, array(
				'offset' => ($this->_limit * ($this->_page - 1)),
				'limit' => $this->_limit
			));
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}

	public function getDataRank2($limit = 6, $page = 1)
	{

		$this->_limit  = $limit;
		$this->_page  = $page;

		if ($this->_limit == 'all') {
			$results = $this->db->select($this->_table);
		} else {
			$results = $this->db->select($this->table, array(
				'orders' => $this->alias . '.bought_number' . ' DESC',
				'offset' => ($this->_limit * ($this->_page - 1)),
				'limit' => $this->_limit
			));
		}


		$result         = new stdClass();
		$result->page   = $this->_page;
		$result->limit  = $this->_limit;
		$result->total  = $this->_total;
		$result->data   = $results;

		return $result;
	}
}