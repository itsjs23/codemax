<?php

class Online_exams extends Controller {
    public function __construct() {
        parent::__construct(TRUE);
    }
    public function index() {
        $model = new Online_exams_model;
        $this->data['exams_summary'] = $model->getExamsSummaryByMediums();
        $this->data['css_files'] = array('mark-attendence');
        $this->data['js_files'] = array('third-party/ejs-min', 'init', 'select-class', 'online-results');
        $this->view = array('common/header', 'pages/online-exams', 'common/footer');
        $this->display();
    }
	public function getExamsSummaryByMediumStandard($params)
	{
		$data = (new Online_exams_model)->getExamsSummaryByMediumStandard($params[0], $params[1]);
		echo json_encode($data);
	}
	public function getExamsSummaryByMediumStandardSection($params)
	{
		$data = (new Online_exams_model)->getExamsSummaryByMediumStandardSection($params[0], $params[1], $params[2]);
		echo json_encode($data);
	}
}
