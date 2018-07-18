<?php

class Single_choice {
    public function add($params) {
        if(Form::isPosted()) {
            $model = new Single_choice_model;
            $model->addNewQuestion();
        }
        Link::sendTo('manage-quiz/id/' . Session::get('quizId'));
    }
}
