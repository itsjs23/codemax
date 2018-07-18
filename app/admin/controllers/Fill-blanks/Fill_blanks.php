<?php

class Fill_blanks {
    public function add($params) {
        if(Form::isPosted()) {
            $model = new Fill_blanks_model;
            $model->addNewQuestion();
        }
        
        if(isset($params[0])) { // this means stay on fill-blanks page
            Link::sendTo('subjective-exam/type/fill-blanks');
        } else {
            Link::sendTo('manage-exam/id/' . Session::get('examID'));
        }
    }
}