/**
 * Object representing all the functionalities related to send-mail page.
 */
var SendMail = function () {

    // DOM references and variable
    this.baseUrl = document.URL.split('/send-mail')[0];
    this.$form = document.querySelector("[data-id='set-class-form']");
    this.$medium = document.querySelector("[data-id='Medium']");
    this.$standard = document.querySelector("[data-id='Standard']");
    this.$section = document.querySelector("[data-id='Section']");
    this.$messagePanel = document.getElementById('message-panel');
    this.$loadingIndicator = document.getElementById('loading-indicator');
    this.$chatEnrollInput = document.getElementById('chat-enroll-input');
    this.$chatEnrollBtn = document.getElementById('chat-enroll-btn');
    this.$listStudentsBtnDiv = document.getElementById('list-students-btn-div');
    this.$classChatDiv = document.getElementById('class-chat-div');
    this.$closeChatBoxDiv = document.getElementById('close-chat-box-div');
    this.$closeFilterChatBoxDiv = document.getElementById('close-filter-chat-box-div');
    this.$leftMessagePanel = document.getElementById('left-msg-panel');
    this.$rightMessagePanel = document.getElementById('right-msg-panel');
    this.$chatImageUploader = document.getElementById('chat-image-uploader');
    this.$modalDiv = document.getElementById('modal-div');
    this.$modalContent = document.getElementsByClassName('modal-content')[0];
    this.$chatFilterForm = document.getElementById('chat-filter-form');
    this.$dateFilterForm = document.getElementById('date-filter-form');
    //this.$dateFilterBtn = document.querySelector("[data-btn-type='date-filter']");
    this.medium = '';
    this.standard = '';
    this.section = '';
    this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});

    // DOM event bindings
    this.bindModal();
    this.bindClassFilterForm();
    this.bindStudentsList();
    this.bindNewMessagesCount();
	this.bindReadMessagesCount();
    this.bindFilterChatByEnroll();
    this.bindSendChatButtonToStudent();
    this.bindSendChatButtonToClass();
    this.bindShowStudentChatBoxBtn();
    this.bindCloseChatBoxBtn();
    this.bindCloseFilterChatBoxBtn();
    this.bindBackToStudentsList();
    this.bindChatImageUploaderBtn();
    this.bindChatImageUploaderInput();
    this.bindChatReportBtn();
    this.bindDateFilterBtn();
    this.bindChatRowsTypeFilter();
    this.bindChatImages();
};

/**
 * This method binds the modal close button.
 */
SendMail.prototype.bindModal = function() {
    var that = this;
    this.$modalDiv.addEventListener('click', function(evt) {
        if (evt.target.dataset.btnType == 'close-modal') {
            that.$modalDiv.setAttribute('class', 'hide');
        }
    });
};

/**
 * This method binds events with the medium, standard, and section filters.
 */
SendMail.prototype.bindClassFilterForm = function () {
    var that = this;
    var targetTypes = ['Medium', 'Standard', 'Section'];
    var currentTargetIndex = -1;
    var methodName = '';

    this.$form.addEventListener('change', function (evt) {
        currentTargetIndex = targetTypes.indexOf(evt.target.getAttribute('data-id'));

        if (currentTargetIndex !== -1) {
            methodName = 'select' + targetTypes[currentTargetIndex];
            that[methodName](evt.target);
        }
    });
};

/**
 * This method binds the 'change' event with the medium filter.
 */
SendMail.prototype.selectMedium = function (elem) {
    var medium = elem.value;
    var requestData = "data=" + JSON.stringify({medium: medium});
    this.medium = medium;

    if (medium !== '') {
        this.load('Loading Standards...');
        this.xhr('standard', requestData, 'standards', this.$standard, this.$loadingIndicator);
    }
};

/**
 * This method binds the 'change' event with the standard filter.
 */
SendMail.prototype.selectStandard = function (elem) {
    var standard = elem.value;
    var requestData = "data=" + JSON.stringify({medium: this.medium, standard: standard});
    this.standard = standard;

    if (standard !== '') {
        this.load('Loading Sections...');
        this.xhr('medium', requestData, 'sections', this.$section, this.$loadingIndicator);
    }
};

/**
 * This method binds the 'change' event with the section filter.
 */
SendMail.prototype.selectSection = function (elem) {
    if (elem.value) {
        var that = this;
        this.section = elem.value;

        $httpAjax({
            method: 'POST',
            url: this.baseUrl + '/select-class/section',
            data: 'data=' + JSON.stringify({medium: this.medium, standard: this.standard, section: this.section}),
            async: true,
            successCall: function (xhr) {
                that.loadChatBox(xhr.responseText);
                that.$listStudentsBtnDiv.classList.remove('hide');
                that.$messagePanel.classList.add('hide');
                that.$closeChatBoxDiv.classList.add('hide');
                that.$classChatDiv.classList.remove('hide');
            }
        });
    }
};

/**
 * This method binds the 'change' event with the section filter.
 */
SendMail.prototype.loadChatBox = function (students) {
    var that = this;
    this.load('Loading Chat Data...');

    $httpAjax({
        method: 'POST',
        url: this.baseUrl + '/send-mail/chat-box',
        data: 'data=' + students,
        successCall: function (xhr) {
            that.$messagePanel.innerHTML = xhr.responseText;
            that.$loadingIndicator.setAttribute('class', 'hide');
            that.loadDefaultChatData();
        }
    });
};

/**
 * This method loads all the recent messages when class is filtered.
 */
SendMail.prototype.loadDefaultChatData = function (students) {
    var that = this;
    var $chatDataBox = document.getElementById('chat-data-box');
    $chatDataBox.innerHTML = '&nbsp;&nbsp;<span class="loader"></span> Loading messages..';

    $httpAjax({
        method: 'POST',
        url: this.baseUrl + '/send-mail/get-default-chats',
        data: 'data=' + JSON.stringify({medium: that.medium, standard: that.standard, section: that.section}),
        successCall: function (xhr) {
            $chatDataBox.innerHTML = xhr.responseText;
        }
    });
};

SendMail.prototype.bindReadMessagesCount = function() {
    var that = this;
    document.addEventListener('click', function(evt) {
        var $closest = evt.target.closest('.student-data');

        if($closest) {
            $httpAjax({
                method: 'GET',
                url: that.baseUrl + '/send-mail/update-read-chats/' + $closest.dataset.enroll,
                async: true,
                successCall: function () {
                    // nothing
                }
            });
        }
    });
};

/**
 * This method binds the click event on the list of students.
 */
SendMail.prototype.bindStudentsList = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        var $closestElement = evt.target.closest('.student-data');

        if ($closestElement) {
            that.load('Loading...');
            that.highlightCurrentActiveStudent($closestElement);

            var $chatDataBox = document.getElementById('chat-data-box');
            var studentId = $closestElement.dataset.enroll;
            var url = that.baseUrl + '/send-mail/get-all-chats-by-gr-number/' + studentId;

            if ($closestElement.dataset.listType == '1-to-1') {
                url += '/all';
            } else if ($closestElement.dataset.listType == 'unread-messages') {
                url += '/unread';
            }

            $httpAjax({
                method: 'GET',
                url: that.baseUrl + '/send-mail/get-all-chats-by-gr-number/' + studentId + '/all',
                async: true,
                successCall: function (xhr) {
                    $chatDataBox.innerHTML = xhr.responseText;
                    var chatInputBox = document.getElementById('student-chat-input-box');
                    chatInputBox.dataset.chatStudentId = studentId;
                    chatInputBox.placeholder = 'Write your message here..';
                    chatInputBox.removeAttribute('readOnly');
                    document.getElementById('chat-btn-div').classList.remove('hide');
                    that.$loadingIndicator.setAttribute('class', 'hide');
                    that.renderLeftMessagePanel();
                    that.scrollToBottom();
                }
            });
        }
    });
};

/**
 * This method binds the click event on the list of students.
 */
SendMail.prototype.bindNewMessagesCount = function () {
    var that = this;
    var $newMessageCount = document.getElementById('new-msg-count');

    if ($newMessageCount) {
        $newMessageCount.addEventListener('click', function (evt) {
            that.load('Loading...');
            var $chatDataBox = document.getElementById('chat-data-box');
            console.log($chatDataBox)

            $httpAjax({
                method: 'GET',
                url: that.baseUrl + '/send-mail/get-new-messages',
                async: true,
                successCall: function (xhr) {
                    that.$messagePanel.innerHTML = xhr.responseText;
                    that.$classChatDiv.classList.add('hide');
                    that.$listStudentsBtnDiv.classList.add('hide');
                    that.$messagePanel.classList.remove('hide');
                    that.$closeChatBoxDiv.classList.add('hide');
                    that.$closeFilterChatBoxDiv.classList.remove('hide');
                    that.$loadingIndicator.setAttribute('class', 'hide');
                }
            });
        });
    }
};

/**
 * This method binds search chats by enroll number feature.
 */
SendMail.prototype.bindFilterChatByEnroll = function () {
    var that = this;

    this.$chatEnrollBtn.addEventListener('click', function () {
        var studentId = that.$chatEnrollInput.value.trim();

        if (studentId) {
            that.load('Loading...');

            $httpAjax({
                method: 'GET',
                url: that.baseUrl + '/send-mail/get-all-chats-by-enroll/' + studentId,
                async: true,
                successCall: function (xhr) {
                    that.$messagePanel.innerHTML = xhr.responseText;
                    that.$classChatDiv.classList.add('hide');
                    that.$messagePanel.classList.remove('hide');
                    that.$closeFilterChatBoxDiv.classList.remove('hide');
                    that.$listStudentsBtnDiv.classList.add('hide');
                    document.getElementById('student-chat-input-box').dataset.chatStudentId = studentId;
                    that.$loadingIndicator.setAttribute('class', 'hide');

                    if(window.screen.width <= 768) {
                        document.getElementById('left-msg-panel').style.display = 'block';
                        //$rightMessagePanel.style.display = 'none';
                    }
                }
            });
        }
    });
};

/**
 * This method binds send chat button.
 */
SendMail.prototype.bindSendChatButtonToStudent = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        if (evt.target.dataset.btnType == 'send-chat-btn-to-student') {
            var chatInputBox = document.getElementById('student-chat-input-box');
            var studentId = chatInputBox.dataset.chatStudentId;
            var chatText = chatInputBox.value.trim();

            if (chatText) {
                evt.target.innerHTML = "...";
                var data = {message: chatText, enroll_num: studentId}

                $httpAjax({
                    method: 'POST',
                    url: that.baseUrl + '/send-mail/send-student-chat',
                    data: 'data=' + JSON.stringify(data),
                    async: true,
                    successCall: function (xhr) {
                        chatInputBox.value = '';
                        var data = JSON.parse(xhr.responseText);

                        if(that.$chatImageUploader.files.length != 0) {
                            that.uploadChatImage(data.chatId);
                        }
                        
                        evt.target.innerHTML = "send";

                        // preview chat messages
                        that.previewIndividualChatMessages(studentId);
                    }
                });

                that.clearUploadedFileInfoIfAny();
            }
        }
    });
};

/**
 * This method binds send chat button.
 */
SendMail.prototype.bindSendChatButtonToClass = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        if (evt.target.dataset.btnType == 'send-chat-btn-to-class') {
            var chatInputBox = document.getElementById('class-chat-input-box');
            var chatText = chatInputBox.value.trim();

            if (chatText && that.medium && that.standard && that.section) {
                evt.target.innerHTML = "...";
                var data = {message: chatText, medium: that.medium, standard: that.standard, section: that.section};

                $httpAjax({
                    method: 'POST',
                    url: that.baseUrl + '/send-mail/send-class-chat',
                    data: 'data=' + JSON.stringify(data),
                    async: true,
                    successCall: function (xhr) {
                        chatInputBox.value = '';
                        var data = JSON.parse(xhr.responseText);

                        if(that.$chatImageUploader.files.length != 0) {
                            that.uploadChatImage(data.chatId);
                        }
                        
                        evt.target.innerHTML = "send";
                    }
                });

                that.clearUploadedFileInfoIfAny();
            }
        }
    });
};

/**
 * This method binds the button to show the student chat box.
 */
SendMail.prototype.bindShowStudentChatBoxBtn = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        if (evt.target.dataset.btnType == 'show-student-chat-box-btn') {
            that.$classChatDiv.classList.add('hide');
            that.$listStudentsBtnDiv.classList.add('hide');
            that.$messagePanel.classList.remove('hide');
            that.$closeChatBoxDiv.classList.remove('hide');
        }
    });
}

/**
 * This method binds the button which on click closes the chat box.
 */
SendMail.prototype.bindCloseChatBoxBtn = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        if (evt.target.dataset.btnType == 'close-chat-box-btn') {
            that.$messagePanel.classList.add('hide');
            that.$closeChatBoxDiv.classList.add('hide');
            that.$closeFilterChatBoxDiv.classList.add('hide');
            that.$classChatDiv.classList.remove('hide');
            that.$listStudentsBtnDiv.classList.remove('hide');
            that.$dateFilterForm.classList.add('hide');
            that.$chatFilterForm.classList.remove('hide');
            that.$listStudentsBtnDiv.classList.add('hide');
        }
    });
}

/**
 * This method binds the button which on click closes the chat box only
 * if filtered by enroll number.
 */
SendMail.prototype.bindCloseFilterChatBoxBtn = function () {
    var that = this;

    document.addEventListener('click', function (evt) {
        if (evt.target.dataset.btnType == 'close-filter-chat-box-btn') {
            that.$messagePanel.classList.add('hide');
            that.$closeChatBoxDiv.classList.add('hide');
            that.$closeFilterChatBoxDiv.classList.add('hide');
            that.$classChatDiv.classList.remove('hide');
            that.$dateFilterForm.classList.add('hide');
            that.$chatFilterForm.classList.remove('hide');
            that.$listStudentsBtnDiv.classList.add('hide');
        }
    });
}

/**
 * Binds the button to go back to students list on a mobile device.
 */
SendMail.prototype.bindBackToStudentsList = function() {
    var that = this;

    document.addEventListener('click', function(evt) {
        if(evt.target.dataset.btnType == 'back-to-students-list') {
            that.renderRightMessagePanel();
        }
    });
};

/**
 * This method binds the button for image upload
 */
SendMail.prototype.bindChatImageUploaderBtn = function() {
    var that = this;

    document.addEventListener('click', function(evt) {
        if(evt.target.dataset.btnType == 'upload-chat-image-btn') {
            that.$chatImageUploader.click();
        } else if(evt.target.dataset.btnType == 'send-chat-btn-to-class') {

        }
    });
}

/**
 * This methods binds image uploader input change event.
 */
SendMail.prototype.bindChatImageUploaderInput = function() {
    document.addEventListener('change', function(evt) {
        if(evt.target.id == 'chat-image-uploader') {
            var elems = document.getElementsByClassName('uploaded-file-info')

            for(var i = 0; i < elems.length; i++) {
                elems[i].innerHTML = evt.target.files[0].name;
            }
        }
    });
};

/**
 * This method always keeps the message panel scrollbar to bottom.
 */
SendMail.prototype.bindMessagePanelScrollToBottom = function(elem) {
//    elem.addEventListener('scroll', function() {
//        elem.scrollTop = elem.scrollHeight;
//    });

    //elem.scrollTop = elem.scrollHeight;
};

/**
 * This methods bind images in chat panel and shows them in modal on click.
 */
SendMail.prototype.bindChatImages = function() {
    var that = this;

    document.addEventListener('click', function(evt) {
        if(evt.target.dataset.imgType == 'chat-image') {
            that.$modalDiv.classList.remove('hide');
            that.$modalContent.innerHTML = '<div data-btn-type="close-modal" style="font-size: 3rem; text-align: center">&times</div>';
            that.$modalContent.innerHTML += '<img src="' + evt.target.src  + '">';
        }
    });
}

/**
 * This methods bind chat report link.
 */
SendMail.prototype.bindChatReportBtn = function() {
    var that = this;

    document.addEventListener('click', function(evt) {
        if(evt.target.closest('span[data-btn-type=chat-report]')) {
            that.renderChatReports();
        }
    });
};

/**
 * This method binds date based chat filter form.
 */
SendMail.prototype.bindDateFilterBtn = function() {
    var that = this;
    //document.querySelector("[data-btn-type='date-filter']");
    this.$dateFilterBtn.addEventListener('change', function(evt) {
        evt.preventDefault();
        var from = that.$dateFilterForm.from.value;
        var to = that.$dateFilterForm.to.value;

        if(from && to) {
            that.renderChatReports(from, to);
        }
    });
};

/**
 * This method binds date based chat filter form.
 */
SendMail.prototype.bindDateFilterBtn = function() {
    var that = this;

    document.addEventListener('change', function(evt) {
        if(evt.target.dataset.btnType == 'date-filter-dropdown') {
            var from = that.$dateFilterForm.from.value;
            var to = that.$dateFilterForm.to.value;
            var teacherId = that.$dateFilterForm.teacher.value;

            if(from && to && teacherId) {
                that.renderChatReports(from, to, teacherId);
            }
        }
    });

    document.addEventListener('click', function(evt) {
        if(evt.target.dataset.btnType == 'date-filter-click-btn') {
            evt.preventDefault();
            var from = that.$dateFilterForm.from.value;
            var to = that.$dateFilterForm.to.value;

            if(from && to) {
                that.renderChatReports(from, to);
            }
        }
    });
};

/**
 * This method display chat rows based on common and 1-to-1 type filter.
 */
SendMail.prototype.bindChatRowsTypeFilter = function() {
    document.addEventListener('click', function(evt) {
        var btnType = evt.target.dataset.btnType;

        if(btnType == 'common') {
            document.querySelectorAll('[data-chat-row-type="1-to-1"]').forEach(function(row) {
                row.classList.add('hide');
            });
            document.querySelectorAll('[data-chat-row-type="common"]').forEach(function(row) {
                row.classList.remove('hide');
            });
        } else if(btnType == '1-to-1') {
            document.querySelectorAll('[data-chat-row-type="1-to-1"]').forEach(function(row) {
                row.classList.remove('hide');
            });
            document.querySelectorAll('[data-chat-row-type="common"]').forEach(function(row) {
                row.classList.add('hide');
            });
        }
    });
}

/**
 * Highlights the currently selected element from the students list.
 */
SendMail.prototype.highlightCurrentActiveStudent = function ($currentStudent) {
    $currentActiveStudent = document.getElementsByClassName('active-student')[0];

    if ($currentActiveStudent) {
        $currentActiveStudent.classList.remove('active-student');
    }

    $currentStudent.classList.add('active-student');
};

/**
 * This method checks if the user is browsing in a mobile device and
 * displays the left message panel accordingly.
 */
SendMail.prototype.renderLeftMessagePanel = function() {
    var $leftMessagePanel = document.getElementById('left-msg-panel');
    var $rightMessagePanel = document.getElementById('right-msg-panel');

    if(window.screen.width <= 768) {
        $leftMessagePanel.style.display = 'block';
        $rightMessagePanel.style.display = 'none';
    }
};

/**
 * This method checks if the user is browsing in a mobile device and
 * displays the right message panel accordingly.
 */
SendMail.prototype.renderRightMessagePanel = function() {
    var $leftMessagePanel = document.getElementById('left-msg-panel');
    var $rightMessagePanel = document.getElementById('right-msg-panel');

    if(window.screen.width <= 768) {
        $leftMessagePanel.style.display = 'none';
        $rightMessagePanel.style.display = 'block';
    }
};

/**
 * Uploads the chat image.
 */
SendMail.prototype.uploadChatImage = function(chatId) {
    var that = this;
    var formData = new FormData();
    formData.append('image-details', that.$chatImageUploader.files[0]);
    formData.append('chatId', chatId);

    $httpAjax({
        method: 'POST',
        url: that.baseUrl + '/send-mail/upload-chat-image',
        data: formData,
        async: true,
        type: 'file',
        successCall: function (xhr) {
            that.$chatImageUploader.value = '';
            //console.log(xhr.responseText);
        }
    });
}

/**
 * This methods previews the latest sent chat message.
 */
SendMail.prototype.previewIndividualChatMessages = function(enroll) {
    var that = this;
    
    $httpAjax({
        method: 'GET',
        url: this.baseUrl + '/send-mail/get-all-chats-by-gr-number/' + enroll + '/' + 'all',
        async: true,
        successCall: function (xhr) {
            document.getElementById('chat-data-box').innerHTML = xhr.responseText;
            that.scrollToBottom();
        }
    });
}

/**
 * This method shows the chat report page.
 */
SendMail.prototype.renderChatReports = function(from, to, teacherId) {
    this.load('Loading...');
    var that = this;
    var url = that.baseUrl + '/send-mail/get-chat-reports/';

    if(from && to) {
        url += from + '/' + to;
    }

    if(teacherId) {
        url += '/' + teacherId;
    }

    $httpAjax({
        method: 'GET',
        url: url,
        async: true,
        successCall: function (xhr) {
            that.$messagePanel.innerHTML = xhr.responseText;
            that.$classChatDiv.classList.add('hide');
            that.$messagePanel.classList.remove('hide');
            that.$closeFilterChatBoxDiv.classList.remove('hide');
            that.$chatFilterForm.classList.add('hide');
            that.$dateFilterForm.classList.remove('hide');
            that.$loadingIndicator.setAttribute('class', 'hide');

            // we require this check to show the messages div
            if(window.screen.width <= 768) {
                document.getElementById('left-msg-panel').style.display = 'block';
            }
        }
    });
}

/**
 * This method is called when medium or standard filter is selected.
 */
SendMail.prototype.xhr = function (action, data, template, templateHolder, hideLoader) {
    var that = this;

    $httpAjax({
        method: 'POST',
        url: that.baseUrl + '/select-class/' + action,
        data: data,
        async: true,
        successCall: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            templateHolder.innerHTML = new EJS({url: 'assets/js/school/templates/' + template + '.ejs'}).render({data});
            hideLoader.setAttribute('class', 'hide');

            // Hide 'All' from select dropdown
            document.querySelectorAll('option[value=All]').forEach(function (elem) {
                elem.style.display = 'none';
            })
        }
    });
};

/**
 * This method visually indicates that something is in process.
 */
SendMail.prototype.load = function (message) {
    this.$loadingIndicator.setAttribute('class', 'show');
    this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
};

/**
 * When this method is called, it clears any displayed text within file uploder.
 */
SendMail.prototype.clearUploadedFileInfoIfAny = function() {
    var elems = document.getElementsByClassName('uploaded-file-info')
            
    for(var i = 0; i < elems.length; i++) {
        elems[i].innerHTML = '';
    }
}


/**
 * This method keeps scrollbar to the bottom of chat content.
 */
SendMail.prototype.scrollToBottom = function() {
    var chatContentDiv = document.getElementById('chat-content-div');
    chatContentDiv.scrollTop = chatContentDiv.scrollHeight + 1000;
};

/**
 * Trigger the object.
 */
new SendMail();