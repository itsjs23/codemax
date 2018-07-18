<?php

class Login extends Controller {
    private $_userData = array();

    public function index() {
        if(Form::isPosted() && Token::isMatched()) {
            if($this->_isValidForm()) {
                if($this->_isValidUser()) {
                    Session::put('login', TRUE);
                    Session::put('user_id', $this->_userData['user_id']);
                    Session::put('user_name', $this->_userData['user_name']);
                    Session::put('user_type', $this->_userData['user_type']);
                     Session::put('user_path', $this->_userData['user_type']);
                    Session::reload();
                    Session::agent();
                    Link::sendTo('welcome');
                }
            }
        }
        $this->view = array('login/index');
        $this->display();
    }

    private function _isValidForm() {
        foreach($_POST as $k => $v) {
            if(trim($v) === '') {
                $this->data['err'] = "Sorry, username and password din't match";
                return FALSE;
            }
        }
        return TRUE;
    }

    private function _isValidUser() {
        $model = new Login_model;
        $user_data = $model->fetchUser();

        if(!empty($user_data)) {
            $this->_userData = $user_data;
            return TRUE;
        } else {
            $this->data['err'] = 'Sorry, you are not authorized to login.';
            return FALSE;
        }
    }

}
