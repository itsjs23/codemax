                
                <form method="POST" action="<?=Link::build('subjective-exam')?>">
                    <p style="text-align: center; border-bottom: 1px solid #ccc; margin-bottom: 3.5rem; text-transform: uppercase;">
                        SUBJECTIVE QUESTIONS
                    </p>
                    <textarea name="question" id="question-paper-editor" class="full-width" placeholder="Type your question here :)">
                        <?=$question_text?>
                    </textarea>
                    
                    <input type="submit" class="btn btn-blue btn-large full-width" id="next-btn" value="Save">
                    <br><br>
                </form>
            </div>
            <script src="<?=Link::build('assets/js/third-party/tinymce/tinymce.min.js')?>"></script>
            <script src="<?=Link::build('assets/js/third-party/tiny-config.js')?>"></script>
            