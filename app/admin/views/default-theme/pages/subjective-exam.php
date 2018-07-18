
            <div class="row wrapper max-wrap960">
                <div class="col m12">
                    <h4 class="page-head">
                        <i class="ion-android-stopwatch" style="color: #09f"></i> Exam Name: <?=strtoupper($exam_details['exam_name'])?>
                        <span><a class="btn white" id="total-questions-anchor">
                            <?=$exam_details['total_question']?> Questions
                        </a></span>
                    </h4>
                    <div id="selection-box" class="hide">
                        <select id="select-question-box" class="full-width">
                            <option value="">&#9776; Change Question Type</option>
                            <option value="true-false">TRUE/FALSE TYPE</option>
                            <option value="fill-blanks">FILL THE BLANKS</option>
                            <option value="matching-columns">MATCHING COLUMNS</option>
                            <option value="single-choice">SINGLE CHOICE QUESTIONS</option>
                            <option value="multiple-choice">MULTIPLE CHOICE QUESTIONS</option>
                        </select>                        
                    </div>

                </div>
                <div id="page-container" class="col m12">
                    <p class="phead">Select a question type</p>
                    <div style="padding-left: 2rem;">
                        <p>
                            <a href="<?=Link::build('subjective-exam/type/true-false')?>" class="black">
                                <button class="btn-circle btn-blue" data-btn="true-false" data-event="new-question">+</button>
                                TRUE/FALSE TYPE                                
                            </a>
                        </p>
                        <p>
                            <a href="<?=Link::build('subjective-exam/type/fill-blanks')?>" class="black">
                                <button class="btn-circle btn-blue" data-btn="fill-blanks" data-event="new-question">+</button>
                                FILL THE BLANKS
                            </a>
                        </p>
                        <p>
                            <a href="<?=Link::build('subjective-exam/type/matching-columns')?>" class="black">
                                <button class="btn-circle btn-blue" data-btn="matching-columns" data-event="new-question">+</button>
                                MATCHING COLUMNS
                            </a>
                        </p>
                        <p>
                            <a href="<?=Link::build('subjective-exam/type/single-choice')?>" class="black">
                                <button class="btn-circle btn-blue" data-btn="single-choice" data-event="new-question">+</button>
                                SINGLE CHOICE QUESTIONS
                            </a>
                        </p>
                        <p>
                            <a href="<?=Link::build('subjective-exam/type/multiple-choice')?>" class="black">
                                <button class="btn-circle btn-blue" data-btn="multiple-choice" data-event="new-question">+</button>
                                MULTIPLE CHOICE QUESTIONS
                            </a>
                        </p>                        
                    </div>
                </div>
            </div>