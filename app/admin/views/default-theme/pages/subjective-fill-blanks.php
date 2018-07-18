

            <form method="POST" action="<?=Link::build('fill-blanks/add/stay-here')?>">
                <div id="single-choice">
                    <p style="text-align: center; border-bottom: 1px solid #ccc; margin-bottom: 3.5rem; text-transform: uppercase; color: #646464">
                        FILL IN THE BLANKS
                    </p>
                 
                    <div class="max-wrap450">
                        <h4 style="margin-bottom: 0rem">
                                <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                                Set Marks
                        </h4>
                        <input name="marks"
                               type="number"
                               class="full-width"
                               placeholder="Enter the marks this question carries"
                                style="margin-bottom: 3rem;" required>
                        
                        <h4 style="margin-bottom: 0">
                                <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                                Your Question
                        </h4>
                        
                        <textarea name="question" class="full-width" style="margin-bottom: 2rem" placeholder="Type your question text here :)" required></textarea>
                        
                        <!--this is just a hack as because fill-blanks model needs choice and option text-->
                        <input type="hidden" name="input-choice" value="opt1" required>
                        <input type="hidden" name="options[opt1]" style="width: 94%; margin-bottom: 3rem" placeholder="Option text" required>
                                            
                        <button class="btn btn-blue btn-large full-width">Next</button><br><br>
                </div>
            </form>
     
