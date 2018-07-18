;(function() {

    var ShowAttendence = function() {
        this.$tbody = document.getElementById('attendence-list-body');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.bindModal();
        this.bindTable();
        this.bindSearchByEnrollNumber();
    };
    
    ShowAttendence.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            if (btnType === 'close') {
                that.$modalDiv.setAttribute('class', 'hide');
            }
        });
    }
    
    ShowAttendence.prototype.bindTable = function() {
        var that = this;
        this.$tbody.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            
            if (btnType === 'view-button') {
                var student_name = evt.target.getAttribute('data-student-name');
                that.$modalDiv.setAttribute('class', 'show');
                that.$modalContent.innerHTML = that.loadingTemplate.render({message: 'Please wait....'});
                that.render(evt.target.getAttribute('data-enroll-no'), student_name);
            }
        });
    };
    
    ShowAttendence.prototype.bindSearchByEnrollNumber = function()
    {
        document.getElementById('search_enroll_no_btn').addEventListener('click', function(evt) {
            var $enrollNo = document.getElementById('search_enroll_no_box').value;
            
            if($enrollNo) {
                var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
                var templateHolder = document.getElementById('attendence-list-body');
                var template = 'show-attendence';
                
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
    
    ShowAttendence.prototype.render = function(enroll_no, name) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'show-attendence/view/',
            data: 'data=' + JSON.stringify({enroll_no: enroll_no}),
            async: true,
            successCall: function(xhr) {
                var data = JSON.parse(xhr.responseText);
                that.$modalContent.innerHTML = new EJS({url: 'assets/js/school/templates/attendence-view.ejs'}).render({data, name: name});
            }
        });
    };
    
    new ShowAttendence();
    
})();