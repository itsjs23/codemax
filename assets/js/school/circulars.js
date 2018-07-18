;(function () {

    var Circulars = function() {
        this.$form = document.querySelector("[data-id='new-exam-form']");
        this.$medium = document.querySelector("[data-id='Medium']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$subjectTxt = document.querySelector("[data-id='Subject']");
        this.$messageTxt = document.querySelector("[data-id='Message']");
        this.$submitButton = document.querySelector("[data-id='Submit']");
        this.$loadingIndicator = document.getElementById('loading-indicator');
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.medium = '';
        this.bindModal();
        this.bindClass();
        this.bindForm();
    };

    Circulars.prototype.bindClass = function() {
        var that = this;
        var targetTypes = ['Medium', 'Standard'];
        var currentTargetIndex = -1;
        var method = '';
        
        this.$form.addEventListener('change', function(evt) {
            currentTargetIndex = targetTypes.indexOf(evt.target.getAttribute('data-id'));
            
            if (currentTargetIndex !== -1) {
                method = 'select' + targetTypes[currentTargetIndex];
                that[method](evt.target);
            }
        });
    };
    
    Circulars.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.sendMessage();
            }
        });  
    };
    
    Circulars.prototype.bindForm = function() {
        var that = this;
        this.$submitButton.addEventListener('click', function(evt) {
            // show confirmation dialog
            that.$modalDiv.setAttribute('class', 'show');
            that.$modalContent.innerHTML = that.confirmTemplate.render();
        });
    };
    
    Circulars.prototype.sendMessage = function() {
        var subject = this.$subjectTxt.value;
        var message = this.$messageTxt.value;
        var medium = this.$medium.value;
        var standard = this.$standard.value;
        var section = this.$section.value;
        
        if (medium.trim() == '' || standard.trim() == '' || section.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, please set a class properly.'});
        } else if(subject.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, kindly provide circulars subject.'});
        } else if (message.trim() == '') {
            this.$modalContent.innerHTML = this.successTemplate.render({message: 'Sorry, kindly provide your message.'});
        } else {
            this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Sending Mail...'});
            this.xhrMessage(medium, standard, section, subject, message);
        }    
    };
    
    Circulars.prototype.selectMedium = function(elem) {
        var medium = elem.value;
        var requestData = "data=" + JSON.stringify({medium: medium});
        this.medium = medium;
        
        if (medium !== '') {
            this.load('Loading Standards...');
            this.xhr('standard', requestData, 'standards', this.$standard, this.$loadingIndicator);
        }
    };
    
    Circulars.prototype.selectStandard = function(elem) {
        var standard = elem.value;
        var requestData = "data=" + JSON.stringify({medium: this.medium, standard: standard});
        this.standard = standard;
        
        if (standard !== '') {
            this.load('Loading Sections...');
            this.xhr('medium', requestData, 'sections', this.$section, this.$loadingIndicator);
        }
    };
    
    Circulars.prototype.xhr = function(action, data, template, templateHolder, hideLoader) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'select-class/' + action,
            data: data,
            async: true,
            successCall: function(xhr) {
                var data = JSON.parse(xhr.responseText);
                templateHolder.innerHTML = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
                hideLoader.setAttribute('class', 'hide');
            }
        });
    };
    
    Circulars.prototype.xhrMessage = function(medium, standard, section, subject, message) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'circulars/send',
            data: 'data=' + JSON.stringify({medium: medium, standard: standard, section: section, subject: subject, message: message}),
            async: true,
            successCall: function(xhr) {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Circulars-model sent successfully.'});
                that.$messageTxt.value = '';
                //console.log(xhr.responseText);
            }
        });    
    };
    
    Circulars.prototype.load = function(message) {
        this.$loadingIndicator.setAttribute('class', 'show');
        this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
    };
    
    new Circulars;
    
})();