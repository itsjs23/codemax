<?php

class Images extends Controller
{
	public function __construct()
	{
		parent::__construct(true);
	}
	
	public function index()
	{
		$this->data['current_page'] = 'images';
                $this->data['css_files'] = ['dxroom'];
		$this->data['js_files'] = ['init'];
		$this->view = ['common/header', 'pages/images', 'common/footer'];
		$this->display();
	}
}