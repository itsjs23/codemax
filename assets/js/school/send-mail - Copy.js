;(function () {

    var SendMail = function () {
        this.$form = document.querySelector("[data-id='set-class-form']");
        this.$medium = document.querySelector("[data-id='Medium']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$sendMailPage = document.getElementById('send-mail-page');
        this.$msgTxt = document.getElementById('msg-txt');
        this.$sendBtn = document.getElementById('send-btn');
        this.$modalDiv = document.getElementById('modal-div');
        this.$listAllStudentsBtn = document.getElementById('list-all-students-btn');
        this.$studentsListDiv = document.getElementById('list-of-students');
        this.$classLevelMsgTxtbox = document.getElementById('class-level-msg-textbox');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.$loadingIndicator = document.getElementById('loading-indicator');
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.medium = '';
        this.bindClassForm();
        this.bindModal();
        this.bindSendMessageForm();
        this.bindUnreadChats();
        this.bindOne2OneMessageForm();
        this.bindAllStudentsListBtn();
    };

    SendMail.prototype.bindClassForm = function () {
        var that = this;
        var targetTypes = ['Medium', 'Standard', 'Section'];
        var currentTargetIndex = -1;
        var method = '';

        this.$form.addEventListener('change', function (evt) {
            currentTargetIndex = targetTypes.indexOf(evt.target.getAttribute('data-id'));

            if (currentTargetIndex !== -1) {
                method = 'select' + targetTypes[currentTargetIndex];
                that[method](evt.target);
            }
        });
    };

    SendMail.prototype.bindModal = function () {
        var that = this;
        this.$modalDiv.addEventListener('click', function (evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.sendMessage();
            }
        });
    };

    SendMail.prototype.bindSendMessageForm = function () {
        var that = this;
        this.$sendBtn.addEventListener('click', function (evt) {
            // show confirmation dialog
            that.$modalDiv.setAttribute('class', 'show');
            that.$modalContent.innerHTML = that.confirmTemplate.render();
        });
    };

    SendMail.prototype.bindUnreadChats = function () {
        document.addEventListener('click', function (evt) {
            var parentElement = evt.target.parentNode;
            if (parentElement.classList.contains('unread-chat')) {
                // update chat status to read
                var chatID = parentElement.getAttribute('data-id');
                $httpAjax({
                    method: 'POST',
                    url: 'send-mail/update-chat-status',
                    data: 'data=' + JSON.stringify({id: chatID}),
                    successCall: function () {
                    }
                });
                parentElement.classList.remove('unread-chat');
            }
        });
    };

    SendMail.prototype.bindOne2OneMessageForm = function () {
        var that = this;
        this.$sendMailPage.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('send-reply-btn')) {
                var $textBox = document.getElementById(evt.target.getAttribute('data-id'));

                if ($textBox.value.trim() !== '') {
                    // show confirmation dialog
                    that.$modalDiv.setAttribute('class', 'show');
                    that.$modalContent.innerHTML = that.loadingTemplate.render({message: 'Sending Mail...'});

                    $httpAjax({
                        method: 'POST',
                        url: 'send-mail/send-mail-to-student',
                        data: 'data=' + JSON.stringify({
                            enroll_num: $textBox.getAttribute('id'),
                            message: $textBox.value
                        }),
                        async: true,
                        successCall: function (xhr) {
                            var chatMsg = $textBox.value;
                            var div = document.createElement('div');
                            
                            div.innerHTML = new EJS({url: 'assets/js/school/templates/new-teacher-chat.ejs'}).render({chatMsg});
                            document.getElementById('id' + $textBox.getAttribute('id')).appendChild(div); 
                            
                            that.$modalContent.innerHTML = that.successTemplate.render({message: 'Mail sent successfully'});
                            $textBox.value = '';
                        }
                    });
                }
            }
        });
    };

    SendMail.prototype.bindAllStudentsListBtn = function () {
        var that = this;
        this.$listAllStudentsBtn.addEventListener('click', function () {
            var medium = that.$medium.value;
            var standard = that.$standard.value;
            var section = that.$section.value;

            if (medium.trim() == '' || standard.trim() == '' || section.trim() == '') {
                that.$modalDiv.setAttribute('class', 'show');
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Sorry, please select a class properly.'});
            } else {
                //render all students
                that.load('Loading Students List...');

                var requestData = "data=" + JSON.stringify({medium: medium, standard: standard, section: section});
                var action = 'section';
                var template = 'send-mail';
                var templateHolder = that.$studentsListDiv;

                that.xhr(action, requestData, template, templateHolder, that.$loadingIndicator);
                that.$classLevelMsgTxtbox.style.display = 'none';
                that.$listAllStudentsBtn.style.display = 'none';
                that.$studentsListDiv.style.display = 'inherit';
            }
        });
    }

    SendMail.prototype.sendMessage = function () {
        var message = this.$msgTxt.value;
        var medium = this.$medium.value;
        var standard = this.$standard.value;
        var section = this.$section.value;

        if (medium.trim() == '' || standard.trim() == '' || section.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, please set a class properly.'});
        } else if (message.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, kindly provide your message.'});
        } else {
            this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Sending Mail...'});
            this.xhrMessage(medium, standard, section, message);
        }
    };

    SendMail.prototype.selectMedium = function (elem) {
        var medium = elem.value;
        var requestData = "data=" + JSON.stringify({medium: medium});
        this.medium = medium;

        if (medium !== '') {
            this.load('Loading Standards...');
            this.xhr('standard', requestData, 'standards', this.$standard, this.$loadingIndicator);
        }
    };

    SendMail.prototype.selectStandard = function (elem) {
        var standard = elem.value;
        var requestData = "data=" + JSON.stringify({medium: this.medium, standard: standard});
        this.standard = standard;

        if (standard !== '') {
            this.load('Loading Sections...');
            this.xhr('medium', requestData, 'sections', this.$section, this.$loadingIndicator);
        }
    };

    SendMail.prototype.selectSection = function (elem) {
        if (elem.value) {
            this.$listAllStudentsBtn.style.display = 'inherit';
            this.$classLevelMsgTxtbox.style.display = 'inherit';
            this.$studentsListDiv.style.display = 'none';
        } else {
            this.$listAllStudentsBtn.style.display = 'none';
        }
    };

    SendMail.prototype.xhr = function (action, data, template, templateHolder, hideLoader) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'select-class/' + action,
            data: data,
            async: true,
            successCall: function (xhr) {
                var data = JSON.parse(xhr.responseText);
                templateHolder.innerHTML = new EJS({url: 'assets/js/school/templates/' + template + '.ejs'}).render({data});
                hideLoader.setAttribute('class', 'hide');
                //console.log(xhr.responseText)
            }
        });
    };

    SendMail.prototype.xhrMessage = function (medium, standard, section, message) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'send-mail/send-mail-to-class',
            data: 'data=' + JSON.stringify({medium: medium, standard: standard, section: section, message: message}),
            async: true,
            successCall: function (xhr) {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Mail sent successfully'});
                that.$msgTxt.value = '';
                //console.log(xhr.responseText);
            }
        });
    };

    SendMail.prototype.load = function (message) {
        this.$loadingIndicator.setAttribute('class', 'show');
        this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
    };

    new SendMail;

})();


// Unread Messages Mail Box Feature
;(function () {

    var $msgCount = document.getElementById('msg-count');

    if (!$msgCount) { // go no further if there are no unread messages
        //console.log('ok');
        return;
    }

    var $mailBox = document.getElementById('mail-box'),
        $classLevelMsg = document.getElementById('class-level-msg'),
        $closeMailBoxBtn = document.getElementById('close-mail-box-btn');
    // $studentsListDiv = document.getElementById('list-of-students'),
    // $listAllStudentsBtn = document.getElementById('list-all-students-btn'),
    // $classLevelMsgTextbox = document.getElementById('class-level-msg-textbox');

    // toggle message box on message count icon click or close message button click
        $msgCount.addEventListener('click', toggleMailBox);
    $closeMailBoxBtn.addEventListener('click', toggleMailBox);

    // toggle messages or reply textbox
    $mailBox.addEventListener('click', function (evt) {
        var parent = evt.target.parentNode;

        if (parent.classList.contains('msg-head')) {
            parent.nextElementSibling.classList.toggle('hide');

            // manage opacity
            if (!parent.nextElementSibling.classList.contains('hide')) {
                parent.style.opacity = 1;
            } else {
                parent.style.opacity = 0.5;
            }
        }

        if (evt.target.classList.contains('reply-msg-btn')) {
            parent.nextElementSibling.classList.toggle('hide');
            parent.classList.toggle('hide');
        }

        if (evt.target.classList.contains('red')) {
            parent.previousElementSibling.classList.toggle('hide');
            parent.classList.toggle('hide');
        }
    });


    function toggleMailBox(evt) {
        $classLevelMsg.classList.toggle('hide');
        $mailBox.classList.toggle('hide');
        evt.stopPropagation();
    }

})();



// toggle Listed student message onclick

(function () {

    var $studentsListDiv = document.getElementById('list-of-students'),
        $listAllStudentsBtn = document.getElementById('list-all-students-btn'),
        $classLevelMsgTextbox = document.getElementById('class-level-msg-textbox');

    // toggle listed students
    $studentsListDiv.addEventListener('click', function (evt) {
        var parent = evt.target.parentNode;

        if (parent.classList.contains('msg-head')) {
            showChats(parent, parent.dataset.enroll);
            parent.nextElementSibling.classList.toggle('hide');

            // manage opacity
            if (!parent.nextElementSibling.classList.contains('hide')) {
                parent.style.opacity = 1;
            } else {
                parent.style.opacity = 0.5;
            }
        }

        if (evt.target.classList.contains('red')) {
            $listAllStudentsBtn.style.display = 'inherit';
            $classLevelMsgTextbox.style.display = 'inherit';
            $studentsListDiv.style.display = 'none';
        }
    });
})();

function showChats(parentNode, studentID) {
    $httpAjax({
        method: 'GET',
        url: 'send-mail/get_all_chats_by_gr_number/' + studentID,
        async: true,
        successCall: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            var chatsDiv = document.getElementById('id' + studentID);
            
            if(data.length > 0) {
                chatsDiv.innerHTML = new EJS({url: 'assets/js/school/templates/all-chats.ejs'}).render({data});
            } else {
                chatsDiv.innerHTML = '<span class="chats-absent">No chats found!!</span>';
            }
        }
    });
}