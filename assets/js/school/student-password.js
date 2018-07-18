;(function() {

    var ShowPasswords = function() {
        this.$tbody = document.getElementById('attendence-list-body');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.bindSearchByEnrollNumber();
    };
    
    ShowPasswords.prototype.bindSearchByEnrollNumber = function()
    {
        document.getElementById('search_enroll_no_btn').addEventListener('click', function(evt) {
            var $enrollNo = document.getElementById('search_enroll_no_box').value;
            
            if($enrollNo) {
                var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
                var templateHolder = document.getElementById('student-password-list-body');
                var template = 'student-password';
                
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
    
    new ShowPasswords();
    
})();