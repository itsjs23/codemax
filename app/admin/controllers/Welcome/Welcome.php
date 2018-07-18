<?php

class Welcome extends Controller {
    public function __construct() {
        parent::__construct(TRUE);
    }
    public function index() {
        $this->data['css_files'] = array('welcome');
        $this->data['js_files'] = array('init');
        $this->view = array('common/header', 'pages/welcome', 'common/footer');
        $this->display();
    }
}
