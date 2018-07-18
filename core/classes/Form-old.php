<?php

class Form {

    /**
     * @var array
     */
    protected $errors = [];

    /**
     * @var array
     */
    
    protected $validUrlPrefixes = array('http://', 'https://');

    /**================
     * @var string
     */
    protected $label = '';
    
    static public function is_posted($type="POST") {
        switch($type) {
            case 'POST':
                return (!empty($_POST)) ? TRUE : FALSE;
            break;
            case 'GET':
                return (!empty($_GET)) ? TRUE : FALSE;
            break;
            default:
                return FALSE;
            break;
        }
    }

    static public function input($item) {
        if(isset($_POST[$item])) {
            return Helpers::escape($_POST[$item]);
        } elseif(isset($_GET[$item])) {
            return Helpers::escape($_GET[$item]);
        }
        return ''; //if nothing exists, we still want to return empty string value
    }

    public function validate(array $rules = []) {
        foreach($rules as $field => $options) {
            foreach($options as $o) {
                if(is_array($o)) {
                    $method = key($o);
                    $param = $o[$method];
                    $is_valid = $this->$method($field, $param);
                } else
                    $is_valid = $this->$o($field);

                if($is_valid === FALSE) {
                    break;
                }
            }
        }

        return $this;
    }

    public function getErrors() {
        return $this->errors;
    }

    protected function label($field, $value) {
        $this->label = $value;
    }
    
    protected function isRequired($field) {
        if(empty(trim($_POST[$field]))) {
            $this->errors[$field] = "{$this->label} is required.";
            return FALSE;
        }
    }

    protected function isEmail($field) {
        if(!filter_var($_POST[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = "$this->label appears invalid";
            return FALSE;
        }
    }

    protected function isAlpha($field) {
        if(!preg_match('/^([a-z])+$/i', $_POST[$field])) {
            $this->errors[$field] = "$this->label is not alphabets all.";
            return FALSE;
        }
    }

    protected function isAlphaNum($field) {
        if(!preg_match('/^([a-z0-9])+$/i', $_POST[$field])) {
            $this->errors[$field] = "$this->label can contain only alphanumerics.";
            return FALSE;
        }
    }

    /**
     * Validate that a field is a valid URL by syntax
     *
     * @param  string $field
     * @return bool
     */
    protected function isUrl($field) {
        if(!filter_var($_POST[$field], FILTER_VALIDATE_URL)) {
            $this->errors[$field] = "$this->label appears invalid";
            return FALSE;
        }
    }

    /**
     * Validate that a field has a valid URL prefix by syntax
     *
     * @param  string $field
     * @return bool
     */
    protected function isUrlPrefix($field) {
        $prefixValid = FALSE;
        foreach($this->validUrlPrefixes as $prefix) {
            if(strpos($_POST[$field], $prefix) !== false) {
                $prefixValid = TRUE;
            }
        }
        if(!$prefixValid) {
            $this->errors[$field] = "Only http, https prefixes allowed.";
            return FALSE;
        }

    }

    /**
     * Validate that a field is an active URL by verifying DNS record
     *
     * @param  string $field
     * @return bool
     */
    protected function isUrlActive($field)
    {
        foreach ($this->validUrlPrefixes as $prefix) {
            if (strpos($_POST[$field], $prefix) !== false) {
                $host = parse_url(strtolower($_POST[$field]), PHP_URL_HOST);
                $isActive = checkdnsrr($host, 'A') || checkdnsrr($host, 'AAAA') || checkdnsrr($host, 'CNAME'); // either TRUE or FALSE
            }
        }

        if(isset($isActive) && $isActive === FALSE) {
            $this->errors[$field] = "Url appears dead.";
            return FALSE;
        }
    }

    protected function isMin($field, $value) {
        if($this->stringLength($_POST[$field]) < $value) {
            $this->errors[$field] = "$this->label is less than minimum $value characters.";
            return FALSE;
        }
    }

    protected function isMax($field, $value) {
        if($this->stringLength($_POST[$field]) > $value) {
            $this->errors[$field] = "$this->label is more than maximum $value characters.";
            return FALSE;
        }
    }

    protected function isMatch($field, $value) {
        if($_POST[$field] !== $_POST[$value]) {
            $this->errors[$field] = "$this->label did not match.";
            return FALSE;
        }
    }

    protected function isRegex($field, $value) {
        if(!preg_match($value, $_POST[$field])) {
            $this->errors[$field] = "$this->label appears invalid.";
            return FALSE;
        }
    }

    protected function inArray($field, array $list = []) {
        if(!in_array($_POST[$field], $list)) {
            $this->errors[$field] = "Invalid selection.";
            return FALSE;
        }
    }

    protected function isEmptyArray($field) {
        if(empty($_POST[$field])) {
            $this->errors[$field] = "$this->label cannot be empty";
            return FALSE;
        }
    }

    protected function isSubArray($field, $value) {
        foreach($_POST[$field] as $v) {
            if(!in_array($v, $value)) {
                $this->errors[$field] = "$this->label seems spoofed";
                return FALSE;
            }
        }
    }

    protected function minChecks($field, $value) {
        if(count($_POST[$field]) < $value) {
            $this->errors[$field] = "Please select atleast {$value} choices.";
            return FALSE;
        }
    }

    /**
     * Get the length of a string
     *
     * @param  string $value
     * @return int
     */
    protected function stringLength($value)
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen(trim($value));
        }

        return strlen(trim($value));
    }
}

