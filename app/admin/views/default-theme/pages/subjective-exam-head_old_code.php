
            <div class="row wrapper max-wrap960" style="max-width: 1200px">
                <div class="col m12">
                    <h4 class="page-head">
                        <i class="ion-android-stopwatch" style="color: #09f"></i> Exam Name: <?=strtoupper($exam_details['exam_name'])?>
                        <span><a class="btn white" id="total-questions-anchor">
                            <?=$exam_details['total_question']?> Questions
                        </a></span>
                    </h4>
                    <!--<div id="selection-box">
                        <select id="select-question-box" class="full-width">
                            <option value="">&#9776; Change Question Type</option>
                            <option value="true-false">TRUE/FALSE TYPE</option>
                            <option value="fill-blanks">FILL THE BLANKS</option>
                            <option value="matching-columns">MATCHING COLUMNS</option>
                            <option value="single-choice">SINGLE CHOICE QUESTIONS</option>
                            <option value="multiple-choice">MULTIPLE CHOICE QUESTIONS</option>
                        </select>                        
                    </div>-->

                </div>
                <div id="page-container" class="col m12">