                
                    <form method="POST" action="<?=Link::build('match-columns/add/stay-here')?>">
                        <p style="text-align: center; border-bottom: 1px solid #ccc; margin-bottom: 3.5rem; text-transform: uppercase; color: #646464">MATCHING COLUMNS</p>
               
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
                                Instructions
                        </h4>
                        
                        <textarea name="question" class="full-width" placeholder="Please provide an instruction for matching columns" style="margin-bottom: 3rem" required></textarea>
                        
                        <h4 style="margin-bottom: 0">
                                <i class="ion-ios-download-outline" style="font-size: 4rem; color: green"></i>
                                Set Pairs
                        </h4>
                        
                        <div style="margin-bottom: 2rem">
                            <input name="column[1][key]" type="text" style="width: 49%" placeholder="Match question" style="margin-bottom: 2.5rem" required>
                            <input name="column[1][val]" type="text" style="width: 49%; float: right" placeholder="Match value" style="margin-bottom: 2.5rem" required>
                        </div>
                        
                        <div style="margin-bottom: 2rem">
                            <input name="column[2][key]" type="text" style="width: 49%" placeholder="Match question" style="margin-bottom: 2.5rem" required>
                            <input name="column[2][val]" type="text" style="width: 49%; float: right" placeholder="Match value" style="margin-bottom: 2.5rem" required>
                        </div>
                        
                        <div style="margin-bottom: 2rem">
                            <input name="column[3][key]" type="text" style="width: 49%" placeholder="Match question" style="margin-bottom: 2.5rem" required>
                            <input name="column[3][val]" type="text" style="width: 49%; float: right" placeholder="Match value" style="margin-bottom: 2.5rem" required>
                        </div>
                        
                        <div style="margin-bottom: 2rem">
                            <input name="column[4][key]" type="text" style="width: 49%" placeholder="Match question" style="margin-bottom: 2.5rem" required>
                            <input name="column[4][val]" type="text" style="width: 49%; float: right" placeholder="Match value" style="margin-bottom: 2.5rem" required>
                        </div>
                        
                        <!--<p style="text-align: center; margin-bottom: 3rem">
                            <button class="btn-circle btn-red">+</button>
                            Create A New Pair
                        </p>-->
                        
                        <button class="btn btn-blue btn-large full-width">Next</button><br><br>
                    </form>
                </div>
            </div>
