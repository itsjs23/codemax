<?php

class Manage_questions extends Controller {
    public function __construct() {
        parent::__construct(TRUE);
    }
    public function delete_question(){
        $questionID = json_decode($_POST['data'], true);
        $model = new Manage_questions_model;
        $model->deleteQuestion($questionID['id']);
    }
}
