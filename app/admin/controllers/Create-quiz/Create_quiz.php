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
        Link::sendTo('manage-exam/id/' . $new_exam_id);
    }


    public function old_exam($params) {
        Session::put('quizId', $params[0]);
        Link::sendTo('manage-exam/id/' . $params[0]);
    }

    public function delete_exam($params) {
        $model = new Create_exam_model;
        $model->deleteExam((int) $params[0]);
    }

    public function class_wise_exams_count() {
        $postData = json_decode($_POST['data'], true);
        $this->data['classes'] = (new Create_exam_model)->getClassWiseExamsCount($postData['medium'], $postData['exam_type']);
        $this->data['exam_type'] = $postData['exam_type'];
        $this->data['medium'] = $postData['medium'];
        $this->view = ['pages/ce-class-wise-exams-count-template'];
        $this->display();
    }

    public function class_wise_exams_list() {
        $postData = json_decode($_POST['data'], true);
        $this->data['sections'] = (new Create_exam_model)->getSectionWiseExamCount($postData['medium'], $postData['standard'], $postData['exam_type']);
        $this->data['exams'] = (new Create_exam_model)->getClassWiseExamsList($postData['medium'], $postData['standard'], $postData['exam_type']);
        $this->data['exam_type'] = $postData['exam_type'] === 'uploaded' ? 'Question Paper' : $postData['exam_type'];
        $this->data['medium'] = $postData['medium'];
        $this->data['standard'] = $postData['standard'];
        $this->view = ['pages/ce-class-wise-exams-list-template'];
        $this->display();
    }

}
