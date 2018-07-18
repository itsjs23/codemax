<?php

class Manage_quiz extends Controller {
    public function __construct() {
        parent::__construct(TRUE);
    }
    // manage exam details for the given id
    public function id($params) {
        if(!isset($params[0])) {
            Link::sendTo('404');
        }


        $model = new Manage_exam_model;
        Session::put('quizId',(int)$params[0]);
        $this->data['exam_details'] = $model->getExamDetails((int)$params[0]);
        $page =   'manage-exam';
        $js_file = 'create-exam';

        $this->data['css_files'] = array('create-exam');
        $this->data['js_files'] = array('third-party/ejs-min', 'init', $js_file);
        $this->view = array('common/header', 'pages/' . $page, 'common/footer');
        $this->display();
    }
    // handle image uploads
    public function upload() {
        if(isset($_FILES['image-details'])) {
            $fileName = UPLOADS_DIR . '/' . $_FILES['image-details']['name'];
            $destination = $_FILES['image-details']['tmp_name'];

            try {
                move_uploaded_file($destination, $fileName);
            } catch(Exception $e) {
                trigger_error('Problem saving uploaded file:<br>' . $e->getMessage());
            }
        }
    }
    // get questions
    public function get_questions() {
        $model = new Manage_exam_model;
        $data = $model->getQuestions(Session::get('quizId'));


        echo json_encode($data);
    }
    // get question by ID
    public function get_question($params) {
        $model = new Manage_exam_model;
        $data = $model->getQuestion($params[0]);
        echo json_encode($data);
    }
}
