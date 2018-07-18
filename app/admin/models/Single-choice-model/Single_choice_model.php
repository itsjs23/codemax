<?php

class Single_choice_model
{
    // this stores the uploaded image names to be set in _uploadImages method
    private $_imageFiles = array();

    public function addNewQuestion()
    {
        // upload images if any
        $this->_uploadImages();

        //---------------------------------------------------------

        $sql = " insert into `quiz_question` (`quiz_id`, `question`, `question_img`, `ques_mark`, `question_has`,
                `question_type`, `ans_opt_id`, `is_active`, `created_at` )
                 values (:quiz_id,:question, :questionImg , :marks ,:quest_has, :type , '-1','1', :created_at )  ";

        $params = array(
            ':quiz_id' => Session::get('quizId'),
            ':question' => $_POST['question'],
            ':questionImg' => isset($this->_imageFiles['question']) ? $this->_imageFiles['question'] : '',
            ':marks' => $_POST['marks'],
            ':type' => 'single_choice_mcqs',
            ':created_at' => date('Y-m-d H:i:s'),
            ':quest_has' => 'txt'
        );


        // 1. insert the new question
        DB::executeDML($sql, $params);

        // 2. get Last Quest Id
        $lastQuestionID = DB::lastID();

        //----------------------------------------------------------
        $values = array();

        foreach ($_POST['options'] as $k => $v) {
            $isAnswer = ($k === $_POST['input-choice']) ? 1 : 0;
            $imageName = isset($this->_imageFiles[$k]) ? $this->_imageFiles[$k] : '';
            $optValue = addslashes($v);
            $values[$k] = "('$lastQuestionID', '$optValue', '$imageName', '$isAnswer')";
        }

        $values = implode(',', $values);
        $sql = "
            INSERT INTO quiz_question_opt(question_id, option_txt, option_img, is_ans)
            VALUES $values
        ";

        // 3. Insert the option
        DB::executeDML($sql);

        //------------------------------------------------------------

        $sql = "
            UPDATE quiz AS QZ
            SET QZ.total_question = QZ.total_question + 1,
            QZ.total_mark = QZ.total_mark + :quest_mark
            WHERE QZ.quiz_id=:quiz_id
        ";

        $params = array(
            ':quest_mark' => $_POST['marks'],
            ':quiz_id' => Session::get('quizId')
        );

        // 4. Update total question count and total marks
        DB::executeDML($sql, $params);
    }

        private function _uploadImages()
    {
        if (count($_FILES['img']['name']) > 0) {
            // first get the current exam name
            $examName = DB::one('SELECT quiz_name FROM quiz WHERE quiz_id = ' . Session::get('quizId'));

            // now check if a directory exists by name format: examName-quizId
            $dirName = UPLOADS_DIR . '/' . $examName['quiz_name'] . '-' . Session::get('quizId');
            if (!is_dir($dirName)) {
                mkdir($dirName);
            }

            // upload files recursively
            foreach ($_FILES['img']['name'] as $imgKey => $imgValue) {
                if (!$imgValue == '') {
                    $explodedString = explode('.', $imgValue);
                    $imageExtension = $explodedString[count($explodedString) - 1];
                    $this->_imageFiles[$imgKey] = uniqid() . rand(). '.' . $imageExtension;
                    $fileName = $dirName . '/' . $this->_imageFiles[$imgKey];
                    $destination = $_FILES['img']['tmp_name'][$imgKey];

                    // update image filename path to store accordingly
                    $this->_imageFiles[$imgKey] = BASE_URL . 'assets/img/uploads/' . Session::get('user_path') . '/' . $examName['quiz_name'] . '-' . Session::get('quizId') . '/' . $this->_imageFiles[$imgKey];

                    move_uploaded_file($destination, $fileName);
                }
            }
        }
    }
}
