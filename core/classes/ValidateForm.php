<?php

class ValidateForm {
    private $errors;
    private $missing;
    private $submitted;
    private $expected;
    private $required;

    public function __construct (array $expected, array $required) {
        $this->errors = [];
        $this->missing = [];
        $this->submitted = [];
        $this->expected = $expected;
        $this->required = $required;
    }

    public function validate () {
        foreach ( $_POST as $k => $v ) {
            $temp = is_array($v) ? $v : Helpers::filterInput($v);
            if(empty($temp) && in_array($k, $this->required)) {
                $this->missing[] = $k;
                $this->submitted[$k] = '';
            } elseif (in_array($k, $this->expected)) {
                $this->submitted[$k] = $temp;
            }
        }
    }

    public function isValidName ($field) {
        if (!preg_match("/^[a-zA-Z ]*$/",$this->submitted['name'])) {
            $this->errors[] = $field;
        }
    }
    public function isValidEmail ($field) {
        if (!filter_var($this->submitted['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors[] = $field;
        }
    }
    public function isValidUrl ($field) {
        // check if URL address syntax is valid (this regular expression also allows dashes in the URL)
       if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$this->submitted['website']))
           $this->errors[] = $field;
    }
    public function isValidPhone ($field) {
        if (strlen($this->submitted[$field]) != 10 || !is_numeric($this->submitted[$field]))
            $this->errors[] = $field;
    }
    public function getErrors () {
        return $this->errors;
    }
    public function getMissing () {
        return $this->missing;
    }
    public function getSubmitted () {
        return $this->submitted;
    }
}