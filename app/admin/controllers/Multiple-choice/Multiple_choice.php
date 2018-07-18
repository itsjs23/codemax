<?php

class Multiple_choice {
    public function add($params) {
        if(Form::isPosted()) {
            $model = new Multiple_choice_model;
            $model->addNewQuestion();
        }
            Link::sendTo('manage-quiz/id/' . Session::get('quizId'));
    }
}
