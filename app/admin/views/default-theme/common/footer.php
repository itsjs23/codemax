            <!-- The overlay -->
            <div id="navDiv" class="overlay">
                <!-- Button to close the overlay navigation -->
                <a href="javascript:void(0)" id="navCross" class="closebtn">&times;</a>
                <!-- Overlay content -->
                <div class="overlay-content">
                    <a href="<?=Link::build('create-quiz')?>">
                        <i class="ion-android-create"></i>
                        Create Quiz
                    </a>

                </div>
            </div>

            <div id="loading-indicator" class="hide">
                <!--cornered loading goes here-->
            </div>

            <div id="modal-div" class="hide">
                <div class="modal-content">
                    <!--modal content goes here-->
                </div>
            </div>

            <!--Include Script Files-->
            <?php if(isset($js_files)) { foreach($js_files as $jf) { ?>
            <?php $prefix = (strpos($jf, 'third-party') !== false) ? '/' : '/school/'?>
            <script src="<?=Link::build('assets/js' . $prefix . $jf. '.js')?>"></script>
            <?php }} ?>

        </body>
    </html>
