<?php

class Subjective_paper_model {
    public function addNewQuestion() {
        // ------- find if subjective paper have been created so far
        $sql = "
            SELECT DISTINCT EQ.question_id
            FROM sch_cls_exam_question AS EQ 
            INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=EQ.cls_exam_id
            WHERE ED.cls_exam_id= :examID AND ED.exam_type='Subjective'
        ";
        
        $data = DB::one($sql, array(':examID' => Session::get('examID')));
        
        if(isset($data['question_id'])) {
        //    Dump::v($data);
        //exit;
            $this->_updateSubjectivePaperQuestion($data['question_id']);
        } else {
            $this->_insertNewSubjectivePaperQuestion();
        }
    }
    
    private function _updateSubjectivePaperQuestion($questionID)
    {
        $sql = "
            UPDATE sch_cls_exam_question AS EQ
            SET EQ.question= :question
            WHERE EQ.question_id=:questID
        ";
        
        $params = array(
            ':questID'        => $questionID,
            ':question'      => $_POST['question'],
        );
        
        DB::executeDML($sql, $params);
    }
    
    private function _insertNewSubjectivePaperQuestion()
    {
        $sql = "
            INSERT INTO sch_cls_exam_question (cls_exam_id, question, question_img, ques_mark, question_has, question_type, ans_opt_id, is_active, created_at)
            VALUES (:examID, :question, :questionImg, :marks, :quest_has, :type, '-1' , '1', :created_at)
        ";
        
        $params = array(
            ':examID'        => Session::get('examID'),
            ':question'      => $_POST['question'],
            ':questionImg'   => '',
            ':marks'         => 0,
            ':type'          => 'others',
            ':created_at'    => date('Y-m-d H:i:s'),
            ':quest_has'     => 'txt'
        );
        
        DB::executeDML($sql, $params);
    }
}

