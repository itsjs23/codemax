                
                <form method="POST" action="<?=Link::build('subjective-exam')?>">
                    <p style="text-align: center; border-bottom: 1px solid #ccc; margin-bottom: 3.5rem; text-transform: uppercase;">
                        SUBJECTIVE QUESTIONS
                    </p>
                    
                    <h4 style="margin-bottom: 0rem">
                            <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                            Select Question Type
                    </h4>
                    <select name="question_type" class="full-width">
                        <?php function isSelected($value) { return (Form::get('question_type') == $value) ? 'selected' : ''; } ?>
                        <option value="">&#9776; Change Question Type</option>
                        <option value="true_false" <?=isSelected('true_false')?>>TRUE/FALSE TYPE</option>
                        <option value="fill_in_the_blanks" <?=isSelected('fill_in_the_blanks')?>>FILL THE BLANKS</option>
                        <option value="match_column" <?=isSelected('match_column')?>>MATCHING COLUMNS</option>
                        <option value="single_choice_mcqs" <?=isSelected('single_choice_mcqs')?>>SINGLE CHOICE QUESTIONS</option>
                        <option value="multiple_choice_mcqs" <?=isSelected('multiple_choice_mcqs')?>>MULTIPLE CHOICE QUESTIONS</option>
                    </select><br><br>
                    
                    <h4 style="margin-bottom: 0rem">
                            <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                            Set Marks
                    </h4>
                    <input name="marks"
                           type="number"
                           class="full-width"
                           placeholder="Enter the marks this question carries"
                           value="<?=Form::get('marks')?>"
                           style="margin-bottom: 2rem;" required>
                    
                    <h4 style="margin-bottom: 0">
                            <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                            Your Question
                    </h4>
                    <textarea name="question" id="question-paper-editor" class="full-width" placeholder="Type your question here :)" required></textarea>
                    
                    <button class="btn btn-blue btn-large full-width" id="next-btn">Next</button>
                    <br><br>
                </form>
            </div>
            