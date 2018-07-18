;(function() {
    
    var AttendenceReport = function()
    {
        this.$medium = document.querySelector("[data-id='Medium']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$fromDate = document.getElementById('from_date');
        this.$toDate = document.getElementById('to_date');
        this.$filterDateButton = document.getElementById('date_search_btn');
        this.$exportButton = document.getElementById('data_export_btn');
        this.bindSearchByEnrollNumber();
        this.bindFilterByDateButton();
        this.bindExportButton();
    };
    
    AttendenceReport.prototype.bindSearchByEnrollNumber = function()
    {
        var that = this;
        document.getElementById('search_enroll_no_btn').addEventListener('click', function() {
            var $enrollNo = document.getElementById('search_enroll_no_box').value;
            
            if($enrollNo) {
                var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
                that.fetchAndRenderAttendenceList(data);        
            }
        });
    };
    
    AttendenceReport.prototype.bindFilterByDateButton = function()
    {
        var that = this;
        
        this.$filterDateButton.addEventListener('click', function(evt) {
            evt.preventDefault();
            
            if(that.$medium.value && that.$standard.value && that.$section.value && that.$fromDate.value && that.$toDate.value) {
                var data = "data=" + JSON.stringify({medium: that.$medium.value, standard: that.$standard.value, section: that.$section.value, from: that.$fromDate.value, to: that.$toDate.value});
                that.fetchAndRenderAttendenceList(data);
            }
        });
    };
    
    AttendenceReport.prototype.bindExportButton = function()
    {
        var that = this;
        
        this.$exportButton.addEventListener('click', function(evt) {
            evt.preventDefault();
            
            if(that.$medium.value && that.$standard.value && that.$section.value) {
                var query = that.$medium.value + '/' + that.$standard.value + '/' + that.$section.value;
                window.location = 'attendence-report/export-attendence-data/' + query;
            }
        });
    };
    
    AttendenceReport.prototype.fetchAndRenderAttendenceList = function (data)
    {
        var templateHolder = document.getElementById('attendence-list-body');
        var template = 'attendence-report';
        
        templateHolder.innerHTML = 'loading...';
        
        $httpAjax({
            method: 'POST',
            url: 'select-class/fetch_attendence',
            data: data,
            async: true,
            successCall: function(xhr) {
                var data = JSON.parse(xhr.responseText);          
                templateHolder.innerHTML = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
            }
        });        
    };
    
    
    // bring it live
    new AttendenceReport();

})();
    