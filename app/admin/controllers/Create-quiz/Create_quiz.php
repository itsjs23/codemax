<?php

class Create_quiz extends Controller {

    public function index() {
        $model = new Create_exam_model;
        $this->data['quizs'] = $model->getCreatedExams();
        $this->data['css_files'] = array('mark-attendence');
        $this->data['js_files'] = array('third-party/ejs-min', 'init', 'create-exam-new');
        $this->view = array('common/header', 'pages/create-exam', 'common/footer');
        $this->display();
    }

    public function new_quiz() {
        if (Form::isPosted()) {
            $model = new Create_exam_model;
            $new_exam_id = $model->createNewExam();
            Session::put('quizId', $new_exam_id);
        }
        Link::sendTo('manage-quiz/id/' . $new_exam_id);
    }


    public function old_exam($params) {
        Session::put('quizId', $params[0]);
        Link::sendTo('manage-quiz/id/' . $params[0]);
    }

    public function delete_exam($params) {
        $model = new Create_exam_model;
        $model->deleteExam((int) $params[0]);
    }
}
