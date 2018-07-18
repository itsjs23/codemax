
<div id="container" class="row wrapper max-wrap960">
    <div class="col m12">
        <h4 class="page-head">
            <i class="ion-android-checkmark-circle blue"></i> Create Quiz
        </h4>
    </div>





    <!-- CREATE NEW EXAM FORM -->
    <form method="POST" id="new_exam_form" action="<?=Link::build('create-quiz/new-quiz')?>"
        class="wrapper col m12 align" data-id="new-exam-form" enctype="multipart/form-data">

        <label class="col m6" > Quiz Name : </label> <label class="col m6" > Quiz Time Duration In Minute : </label> <br>
        <input name="quiz-name" type="text" class="col m6" placeholder="Quiz Name"
        pattern="[a-zA-Z0-9-]{1,}" title="Only alphabets, digits, and hyphens allowed." required>
        <input name="duration" type="number" class="col m6" placeholder="Quiz duration in minutes" required><br><br>

        <label class="col m6" > Quiz Date : </label> <label class="col m6" > Quiz Start Time : </label><br>
        <input name="date" type="date" class="col m6" title="quiz date" required>
        <input name="time" type="time" class="col m6"  required>
        <br><br><br>
        <button type="submit" id="new_exam_submit_btn" class="btn btn-blue btn-large full-width">Proceed</button>
    </form>


    <div class="row" id="created-exams-type-summary">
        <div class="col m12">
            <div class="exam-type-head"><b>List of Created Quiz</b></div>
        </div>
        <div class="col m12">
            <?php if($quizs){
                echo '<table class="table">';
                echo '<tbody>';
                echo '<tr>
                <td>Quiz Name</td>
                <td>Quiz Date</td>
                <td>Quiz Start Time</td>
                <td>Quiz Time Duration</td>
                <td>Quiz Question</td>
                <td>&nbsp</td>
                </tr>
                ';

                foreach ($quizs as $quiz) {
                    printf("<tr> <td>%s</td> <td>%s</td> <td>%s</td> <td>%s</td> <td>%s </td><td>%s </td>  </tr>" ,
                     $quiz['quiz_name'] , $quiz['quiz_date'] ,
                     $quiz['quiz_start_time'] , $quiz['quiz_time_duration'].' Minute',
                     $quiz['total_question'],
                     '<a href="manage-quiz/id/'.$quiz['quiz_id'].'". class="btn"> VIEW QUIZ </a>'
                 );
                }
                echo ' </tbody></table>';
            }else{
                printf("No Quiz Created Yet !!");
            }
            ?>
        </div>
    </div>
</div>
<br><br>
