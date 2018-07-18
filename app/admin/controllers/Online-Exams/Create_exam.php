<?php

class Create_exam extends Controller {
    public function index() {
        $model = new Create_exam_model;
        $this->data['created_exams'] = $model->getCreatedExams();
		$this->data['exams_count'] = $model->getExamsCount($this->data['created_exams']);
        $this->data['css_files'] = array('mark-attendence');
        $this->data['js_files'] = array('third-party/ejs-min', 'init', 'new-exam');
        $this->view = array('common/header', 'pages/create-exam', 'common/footer');
        //Dump::p($this->data['created_exams']);
        $this->display();
    }
    public function new_exam() {
        if(Form::isPosted()) {
            $model = new Create_exam_model;
            $new_exam_id = $model->createNewExam();
            Session::put('examID', $new_exam_id);
        }
        Link::sendTo('manage-exam/id/' . $new_exam_id);
    }
    public function old_exam($params) {
        /*if(Form::isPosted()) {
            Session::put('examID', $_POST['exam']);
            Link::sendTo('manage-exam/id/' . $_POST['exam']);    
        }*/
		Session::put('examID', $params[0]);
        Link::sendTo('manage-exam/id/' . $params[0]);    
    }
	public function delete_exam($params) {
		$model = new Create_exam_model;
		$model->deleteExam((int) $params[0]);
	}
}
