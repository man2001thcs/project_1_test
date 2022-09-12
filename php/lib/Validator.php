<?php
/**
 * Basic validator class
 * @author TrungBQ
 *
 */
class Validator {
	private $errors = array();
	private $data = array();
	private $rules = array();
	
	public function __construct() {}
	
	/**
	 * Validate data with rules
	 **/
	public function validate($data, $rules) {
		$this->data = xss_clean($data);
		$this->rules = $rules;
		$isOK = true;
		
		// Loop all rules to validate data
		foreach ($this->data as $key => $value) {
			if (isset($this->rules[$key])) {
				foreach ($this->rules[$key] as $valKey => $valData) {
					if ($valKey == 'form') continue;
					
					$rule = '';
					$message = '';
					$param = '';
					//nếu là chuỗi
					if (is_array($valData['rule'])) {
						//xét từng kí tự 1 với rule
						$rule = $valData['rule'][0];
						$param = isset($valData['rule'][1]) ? $valData['rule'][1] : '';
					} else {
						$rule = $valData['rule'];
					}
					if (is_array($valData['message'])) {
						$message = sprintf($valData['message'][0], $valData['message'][1]);
					} else {
						$message = $valData['message'];
					}
					
					//lấy các phương thức trong lớp validator bên dưới để kiểm tra
					if (method_exists($this, $rule)) {
						if (!empty($param)) {
							if (!$this->{$rule}($value, $param)) {
								$this->errors[$key] = $message;
								$isOK = false;
							}
						} else {
							if (!$this->{$rule}($value)) {
								$this->errors[$key] = $message;
								$isOK = false;
							}
						}
					}
				}
			}
		}
		
		return $isOK;
	}

	function xss_clean($data)
    {
// Fix &entity\n;
        $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
        $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
        $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
        $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

// Remove any attribute starting with "on" or xmlns
        $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

// Remove javascript: and vbscript: protocols
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

// Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

// Remove namespaced elements (we do not need them)
        $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

    do
    {
    // Remove really unwanted tags
        $old_data = $data;
        $data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
    }
    while ($old_data !== $data);

    // we are done...
    return $data;
    }
	
	/**
	 * Check if param is katakana character
	 * @param value
	 * @return boolean
	 */
	function isKatakana($str) {
		if (empty($str)) return true;
		$str = str_replace(' ', '', $str);
		$str = str_replace('　', '', $str);
	    return preg_match('/[^ァ-ヴー]/u', $str) == 0;
	}
	
	/**
	 * Check if param is hiragana character
	 * @param value
	 * @return boolean
	 */
	function isHiragana($str) {
		if (empty($str)) return true;
	    return preg_match('/[^ぁ-んー]/u', $str) == 0;
	}
	
	/**
	 * Check if param is in range
	 * @param value
	 * @return boolean
	 */
	private function maxLength($value, $length) {
		return (mb_strlen($value) < $length);
	}
	
	/**
	 * Check if param is not empty
	 * @param value
	 * @return boolean
	 */
	private function notEmpty($value) {
		return !empty($value);
	}
	
	/**
	 * Check if param is not empty
	 * @param value
	 * @return boolean
	 */
	private function isNumber($value) {
		if (empty($value)) return true;
		
		return is_numeric($value);
	}
	
	private function isOfficeTel($value) {
		return preg_match("/^\d{3}(-*)\d{4}$/", $value);
	}
	
	/**
	 * Check if param is telephone number
	 * @param value
	 * @return boolean
	 */
	private function is_tel($value) {
		if (empty($value)) return true;
		if(preg_match("/^\d+(-*)\d+(-*)\d+$/", $value)) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Check if param is telephone number
	 * @param value
	 * @return boolean
	 */
	private function email($value) {
		if(preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $value)) {
			return true;
		}
		else {
			return false;
		}
	}
	/**
	 * Get errors
	 */
	public function getErrors() {
		return $this->errors;
	}
}