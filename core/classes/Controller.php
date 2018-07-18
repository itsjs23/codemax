<?php

class Controller {

    protected $view = array();
    protected $data = array();
    
    # call this constructor from child only if login check is required
    public function __construct($check_login = FALSE) {
        if($check_login) {
            if(!Session::exists('login') || !Session::userAgent()) {
                Link::sendTo('login');
            }            
        }
    }
    
    # display the view
    protected function display() {
        extract($this->data);
        unset($this->data);
        ob_start();
        foreach($this->view as $page) {
            include_once SITE_THEME . $page . '.php';
        }
        $output = ob_get_contents();
        ob_end_clean();
        echo $output;
    }

}