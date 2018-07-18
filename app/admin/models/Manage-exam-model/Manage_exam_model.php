<?php

class Manage_exam_model {
    public function getExamDetails($quizId) {
        $sql = "
        SELECT QZ.`quiz_name` , DATE_FORMAT(QZ.`quiz_date`,'%d %b %Y') AS 'quiz_date' , QZ.`quiz_start_time` , QZ.`quiz_time_duration`
        ,(SELECT IFNULL(COUNT(EQ.question_id),0) FROM `quiz_question` EQ WHERE EQ.quiz_id =:quizId AND EQ.is_active = 1) AS 'total_question'
        FROM `quiz` QZ WHERE QZ.`quiz_id` =:quizId AND QZ.`is_active` =1 ";
        $params = array(':quizId' => $quizId);
        return DB::one($sql, $params);
    }

    public function getQuestions($quizId) {
        $sql = "
        SELECT DISTINCT EQ.question_id, EQ.question,EQ.question_img,EQ.ques_mark,EQ.question_type , EO.`opt_id` ,
         EO.`option_txt` ,  EO.`option_img`  , EO.`is_ans` , ED.quiz_date
        ,ED.quiz_date >= '".date('Y-m-d')."' AS 'date_flag'
        FROM quiz_question AS EQ
        INNER JOIN quiz AS ED ON ED.quiz_id=EQ.quiz_id
        LEFT JOIN quiz_question_opt AS EO ON EO.`question_id`=EQ.`question_id`
        WHERE EQ.quiz_id = {$quizId} AND EQ.is_active=1
        ";

        //return DB::all($sql);
        $questions = DB::all($sql);

        return $this->_prepareQuestionsForEasyTemplating($questions);
    }

    public function getQuestion($examID) {
        $sql = "
        SELECT EQ.question_id, EQ.question , EQ.question_img, EQ.ques_mark,EQ.question_type
        FROM sch_cls_exam_question AS EQ
        WHERE EQ.cls_exam_id = $examID AND EQ.is_active=1
        ";
        return DB::all($sql);
    }

    public function deleteQuestion($questionID) {

        $sql = "
        UPDATE sch_cls_exam_question
        SET is_active=0
        WHERE question_id= $questionID
        ";
        DB::executeDML($sql);
    }

    private function _prepareQuestionsForEasyTemplating($questions)
    {

        $arr = array(); // this contains list of formatted questions

        foreach($questions as $q) {
            $id = $q['question_id']; // current question ID

            if(isset($arr[$id])) {
                $arr[$id]['options'][] = $this->_prepareOptions($q);
            } else {
                $arr[$id] = $this->_prepareQuestion($q);
            }
        }

        shuffle($arr);
        return $arr; // return finally prepared questions
    }

    private function _prepareOptions($q)
    {
        return array(
            'is_ans'        => $q['is_ans'],
            'opt_id'        => $q['opt_id'],
            'option_txt'    => $q['option_txt'],
            'option_img'    => $q['option_img']
        );
    }

    private function _prepareQuestion($q)
    {
        return array(
            'id'            => $q['question_id'],
            'question'      => $q['question'],
            'ques_mark'     => $q['ques_mark'],
            'question_img'  => $q['question_img'],
            'question_type' => $q['question_type'],
            'quiz_date'     => $q['quiz_date'],
            'show_delete'   => (($q['date_flag'] == 1) ? 'yes' : 'no'), // show delete button if flag = 1
            'options' => array(
                array(
                    'is_ans'        => $q['is_ans'],
                    'opt_id'        => $q['opt_id'],
                    'option_txt'    => $q['option_txt'],
                    'option_img'    => $q['option_img']
                )
            )
        );
    }
}
