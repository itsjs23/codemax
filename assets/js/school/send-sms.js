;(function() {
    
    var MessageObject = function() {
        this.$sendBtn = document.getElementById('send-btn');
        this.$messageTypes = document.getElementById('message-types');
        this.$messageTextbox = document.getElementById('msg-txt');
        this.$messageTitlesDatalist = document.getElementById('message-titles-list');
        this.$customMessageTitleBox = document.getElementById('custom-msg-title-box');
        this.$customMessageTitleDiv = document.getElementById('custom-msg-title-div');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.$msgIndicator = document.getElementById('msg-indicator');
		this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.isMessageNew = false; // this will be set to true when teacher creates a non-existent message
        this.bindModal();
        this.bindForm();
		this.bindTextarea();
        this.bindMessageTypes();
        this.bindMessageTitleBox();
        this.bindSearchByEnrollNumber();
    };
    
    MessageObject.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.sendSMS();
            }
        });    
    };
    
	MessageObject.prototype.bindTextarea = function() {
        var that = this;
        var usedCharactersLength = 0;
        var smsCount = 0;
        var html = '';
        var classRed = '';
        
        this.$messageTextbox.addEventListener('keyup', function() {
            usedCharactersLength = that.$messageTextbox.value.length;
            
            if(usedCharactersLength > 140) {
                smsCount = 2;
                classRed = 'class="red-label"';
            } else if(usedCharactersLength == 0) {
                smsCount = 0;
            } else {
                smsCount = 1;
            }
            
            html += '<small>Characters: ' + usedCharactersLength + '</small> | ';
            html += '<small ' + classRed + '>SMS Count: ' + smsCount + '</small>';
            that.$msgIndicator.innerHTML = html;
            html = '';
            classRed = '';
        });
    };
	
    MessageObject.prototype.bindForm = function() {
        var that = this;
        this.$sendBtn.addEventListener('click', function(evt) {
            // show confirmation dialog
            that.$modalDiv.setAttribute('class', 'show');
            that.$modalContent.innerHTML = that.confirmTemplate.render();
        });
    };
    
    MessageObject.prototype.bindSearchByEnrollNumber = function()
    {
        document.getElementById('search_enroll_no_btn').addEventListener('click', function(evt) {
            var $enrollNo = document.getElementById('search_enroll_no_box').value;
                
            if($enrollNo) {
                var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
                var templateHolder = document.getElementById('sms-list-body');
                var template = 'send-sms';
                
                $httpAjax({
                    method: 'POST',
                    url: 'select-class/mobile_numbers',
                    data: data,
                    async: true,
                    successCall: function(xhr) {
                        var data = JSON.parse(xhr.responseText);
                        var content = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
                        
                        if(templateHolder.innerHTML == '') {
                            templateHolder.innerHTML = content;    
                        } else {
                            templateHolder.innerHTML += ',' + content;    
                        }
                    }
                });        
            }
        });
    };
    
    MessageObject.prototype.bindMessageTypes = function() {
        var that = this;
        
        this.$messageTypes.addEventListener('change', function(evt) {
            var messageID = evt.target.value;
            
            if(messageID !== '') {
                that.$customMessageTitleDiv.classList.add('hide');
                that.autoFillMessageTextbox(messageID);
            } else {
                that.$messageTextbox.value = '';
                that.$customMessageTitleBox.value = '';
                that.$customMessageTitleDiv.classList.remove('hide');
            }
        });
    };
    
    MessageObject.prototype.bindMessageTitleBox = function() {
        var that = this;
        
        this.$customMessageTitleBox.addEventListener('blur', function(evt) {
            var inputValue = evt.target.value;
            
            if(inputValue !== '') {
                var datalistElement = document.querySelector('#message-titles-list option[value="' + inputValue + '"]');
                
                if(datalistElement !== null) { // this means a datalist element has been selected
                    var messageID = datalistElement.dataset.titleId;
                    that.autoFillMessageTextbox(messageID);
                    that.isMessageNew = false;
                } else {
                    that.isMessageNew = true;
                }
            }
        });
    };
    
    MessageObject.prototype.autoFillMessageTextbox = function(messageID) {
        var that = this;
        
        $httpAjax({
            method: 'GET',
            url: 'send-sms/get-message-template-text/' + messageID,
            async: true,
            successCall: function(xhr) {
                that.$messageTextbox.value = JSON.parse(xhr.responseText).tpl_txt;
            }
        });
    };
    
    MessageObject.prototype.sendSMS = function() {
        var numbers = document.getElementById('sms-list-body').value;
        var message = document.getElementById('msg-txt').value;
        
        if (numbers.trim() == '' || message.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, kindly provide mobile numbers and your message both.'});
        } else {
            this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Sending Message...'});
            this.insertMessageInDatabaseIfNew(); 
            this.xhr(numbers, message);
        }
    };
    
    MessageObject.prototype.insertMessageInDatabaseIfNew = function() {
        if(this.isMessageNew == true) {
            $httpAjax({
                method: 'POST',
                url: 'send-sms/insert-new-message-template',
                data: 'data=' + JSON.stringify({title: this.$customMessageTitleBox.value, message: this.$messageTextbox.value}),
                async: true,
                successCall: function() {
                    // nothing here
                }
            });    
        }
    };
    
    MessageObject.prototype.xhr = function(numbers, message) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'send-sms/send',
            data: 'data=' + JSON.stringify({numbers: numbers, message: message}),
            async: true,
            successCall: function(xhr) {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Message sent successfully'});
            }
        });
    };
    
    new MessageObject;

})();