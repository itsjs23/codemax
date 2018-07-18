
            <div class="row wrapper max-wrap960">
                <div class="col m12">
                    <h4 class="page-head">
                        <i class="ion-android-stopwatch" style="color: #09f"></i> Quiz Name: <?=strtoupper($exam_details['quiz_name'])?>
                        <span><a class="btn white" id="total-questions-anchor">
                            <?=$exam_details['total_question']?> Questions
                        </a></span>
                    </h4>

                    <!-- Exam Summary -->
                    <div class="row" style="border-bottom: 1px solid; margin-bottom: 1.5rem">
                        <p class="col m12 t6"><b>Quiz Date:</b> <?=date('d-m-Y', strtotime($exam_details['quiz_date']))?></p>
                        <p class="col m12 t6"><b>Quiz Start Time:</b> <?=$exam_details['quiz_start_time']?></p>
                        <p class="col m12 t6"><b>Quiz Time Duration:</b> <?=$exam_details['quiz_time_duration']?> Min</p>
                    </div>
                    <!-- Exam Summary -->

                    <div id="selection-box" class="hide">
                        <select id="select-question-box" class="full-width">
                            <option value="">&#9776; Change Question Type</option>
                            <option value="single-choice">SINGLE CHOICE QUESTIONS</option>
                            <option value="multiple-choice">MULTIPLE CHOICE QUESTIONS</option>
                        </select>
                    </div>

                </div>
                <div id="page-container" class="col m12">
                    <p class="phead">Create a new question</p>
                    <div style="padding-left: 2rem;">
                        <p>
                            <button class="btn-circle btn-blue" data-btn="single-choice" data-event="new-question">+</button>
                            SINGLE CHOICE QUESTIONS
                        </p>
                        <p>
                            <button class="btn-circle btn-blue" data-btn="multiple-choice" data-event="new-question">+</button>
                            MULTIPLE CHOICE QUESTIONS
                        </p>
                    </div>
                </div>
            </div>
