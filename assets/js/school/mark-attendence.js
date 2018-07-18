
    
var MarkAttendence = function() {
    this.model = [];
    this.$table = document.getElementById('attendence-list-table');
    this.$modalDiv = document.getElementById('modal-div');
    this.$modalContent = document.getElementsByClassName('modal-content')[0];
    this.$loadingIndicator = document.getElementById('loading-indicator');
    this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
    this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
    this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
    this.bindModal();
    this.bindTable();
    this.bindAttendanceTracker();
    this.bindSearchByEnrollNumber();
};

MarkAttendence.prototype.bindModal = function() {
    var that = this;
    this.$modalDiv.addEventListener('click', function(evt) {
        var btnConfirm = evt.target.getAttribute('data-confirm');
        if (btnConfirm === 'no') {
            that.$modalDiv.setAttribute('class', 'hide');
        } else if (btnConfirm === 'yes') {
            that.submitAttendence();
        }
    });
};

MarkAttendence.prototype.bindTable = function() {
    var that = this;
    this.$table.addEventListener('click', function(evt) {
        var btnType = evt.target.getAttribute('data-type');
        if (btnType == 'mark-button') {
            that.toggle(evt.target);
        } else if (btnType == 'submit-button') {
            that.$modalDiv.setAttribute('class', 'show');
            that.$modalContent.innerHTML = that.confirmTemplate.render();
        }
    });
};

MarkAttendence.prototype.bindAttendanceTracker = function() {
    var that = this;
    
    document.addEventListener('click', function(evt) {
        if(evt.target.closest('#track-by-medium')) {
            that.showHighlightedStandards(evt.target.dataset.mdm);
        } else if(evt.target.closest('#track-by-standard')) {
            that.showRowsByStandard(evt.target.dataset.mdm, evt.target.dataset.std);
        }
    })
};

MarkAttendence.prototype.showHighlightedStandards = function(medium) {
    var $trackByStandard = document.getElementById('track-by-standard');
    var that = this;
    this.load('Loading..');
    
    $httpAjax({
        method: 'GET',
        async: true,
        url: 'mark-attendence/get-highlighted-standards/' + medium,
        successCall: function (xhr) {
            $trackByStandard.innerHTML = xhr.responseText;
            that.$loadingIndicator.setAttribute('class', 'hide');
        }
    });
};

MarkAttendence.prototype.showRowsByStandard = function(medium, standard) {
    var $attendenceListTable = document.getElementById('attendence-list-table');
    var that = this;
    this.load('Loading..');
    
    $httpAjax({
        method: 'GET',
        url: 'mark-attendence/get-absent-data-by-standard/' + medium + '/' + standard,
        async: true,
        successCall: function (xhr) {
            $attendenceListTable.innerHTML = xhr.responseText;
            that.$loadingIndicator.setAttribute('class', 'hide');
        }
    });
};

MarkAttendence.prototype.bindSearchByEnrollNumber = function() {
    document.getElementById('search_enroll_no_btn').addEventListener('click', function(evt) {
        var $enrollNo = document.getElementById('search_enroll_no_box').value;

        if($enrollNo) {
            var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
            var templateHolder = document.getElementById('attendence-list-table');
            var template = 'mark-attendence';

            templateHolder.innerHTML = 'loading...';

            $httpAjax({
                method: 'POST',
                url: 'select-class/section',
                data: data,
                async: true,
                successCall: function(xhr) {
                    var data = JSON.parse(xhr.responseText);
                    templateHolder.innerHTML = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
                }
            });        
        }
    });
};

MarkAttendence.prototype.toggle = function(elem) {
    var dataFlag = elem.getAttribute('data-flag') == 1 ? 0 : 1;

    if(elem.classList.contains('btn-green')) {
        elem.classList.remove('btn-green');
        elem.classList.add('btn-red');
    } else {
        elem.classList.remove('btn-red');
        elem.classList.add('btn-green');
    }

    elem.setAttribute('data-flag', dataFlag); // toggle data-flag
    elem.innerText = elem.innerText == 'P' ? 'A' : 'P'; // toggle inner text
};

MarkAttendence.prototype.setModel = function() {
    var btnElems = document.querySelectorAll("[data-flag='0']");
    var dataID = 0;

    for (var i = 0, len = btnElems.length; i < len; i++) {
        dataID = btnElems[i].getAttribute('data-id');
        this.model.push(dataID);
    }
};

MarkAttendence.prototype.unsetModel = function() {
    this.model = [];
};

MarkAttendence.prototype.submitAttendence = function() {
    this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Submitting Attendence'});
    this.setModel();
    this.xhr();
    this.unsetModel();
};

MarkAttendence.prototype.xhr = function() {
    var that = this;
    var data = {
        list: this.model,
        date: document.getElementById('attendance_date').value
    };

    $httpAjax({
        method: 'POST',
        url: 'mark-attendence/submit',
        data: "data=" + JSON.stringify(data),
        async: true,
        successCall: function(xhr) {
            that.$modalContent.innerHTML = that.successTemplate.render({message: 'Students Attendence Submitted'});
        }
    });    
};

MarkAttendence.prototype.load = function (message) {
    this.$loadingIndicator.setAttribute('class', 'show');
    this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
};

// instantiate the controller object
new MarkAttendence();