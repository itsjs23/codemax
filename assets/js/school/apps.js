/**
 * Represents a app object.
 */
var App = function() {
    this.$modalDiv = document.getElementById('modal-div');
    this.$modalContent = document.getElementsByClassName('modal-content')[0];
    this.bindModal();
    this.bindLikeButton();
    this.bindRatingStars();
    this.bindSuggestButton();
    this.bindShareButton();
    this.bindSearchForm();
};

App.prototype.bindModal = function() {
    var that = this;
    this.$modalDiv.addEventListener('click', function(evt) {
        var btnType = evt.target.getAttribute('data-btn-type');
        if (btnType === 'close') {
            that.$modalDiv.setAttribute('class', 'hide');
        }
    });
};

App.prototype.bindLikeButton = function() {
    var $likeBtn = document.querySelectorAll('[data-btn-type="like"]');
    var baseUrl = document.URL.split('/apps')[0];
    
    if($likeBtn) {
        for(var i = 0; i < $likeBtn.length; i++) {
            console.log($likeBtn[i].dataset.appId)
            $likeBtn[i].addEventListener('click', function(evt) {
                var that = this;
                $httpAjax({
                    method: 'GET',
                    url: baseUrl + '/apps/likes/' + that.dataset.appId,
                    async: false,
                    successCall: function() {
                        that.innerHTML = '<i class="ion-android-happy"></i><span class="hide-on-mobile"> Thanks</span>';
                    }
                }); 
            });
        }
    }
};

App.prototype.bindRatingStars = function() {
    document.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('rate-star')) {
            var rateValue = evt.target.dataset.rateValue;
            var appId = evt.target.dataset.appId;
            var baseUrl = document.URL.split('/apps')[0];
            
            $httpAjax({
                method: 'GET',
                url: baseUrl + '/apps/ratings/' + evt.target.dataset.appId + '/' + evt.target.dataset.rateValue,
                async: false,
                successCall: function() {
                    document.getElementById('rate-id-' + evt.target.dataset.appId).innerHTML = '<span style="font-weight: 700; color: #cd5c5c"><i class="ion-android-happy"></i> Thanks</span>';
                }
            });
        }
    });
};

App.prototype.bindSuggestButton = function() {
    var $btn = document.getElementById('suggest-btn');
    var $submitForm = document.getElementById('submit-app-form-div');
    var $cancelForm = document.getElementById('cancel-suggest-form');
    
    if($btn) {
        $btn.addEventListener('click', function() {
            $submitForm.classList.toggle('hide');
        });
        $cancelForm.addEventListener('click', function() {
            $submitForm.classList.toggle('hide');
        });
    }
}

App.prototype.bindShareButton = function() {
    document.addEventListener('click', function(evt) {
        
        if(evt.target.dataset.type == 'share-btn') {
            var app_id = evt.target.dataset.appId;
//            var mdm = document.getElementById('share-mdm-' + app_id);
            var std = document.getElementById('share-std-' + app_id);
            var baseUrl = document.URL.split('/apps')[0];
            if(std.value) {
                $httpAjax({
                    method: 'GET',
                    url: baseUrl + '/apps/share/' + app_id + '/' + std.value,
                    async: false,
                    successCall: function() {
                        evt.target.innerHTML = '<i class="ion-android-done"></i><span class="hide-on-mobile"> Done</span>';
                    }
                });
            }
        }
      
    });
}

App.prototype.bindSearchForm = function() {
    var $searchInput = document.getElementById('search-input');
    var $searchResults = document.getElementById('search-results');
    
    $searchInput.addEventListener('keyup', function() {
        if($searchInput.value.trim() != '') {
            var baseUrl = document.URL.split('/apps')[0];
            $httpAjax({
                method: 'GET',
                url: baseUrl + '/apps/search/' + $searchInput.value,
                async: false,
                successCall: function(xhr) {
                    $searchResults.innerHTML = xhr.responseText;
                }
            });
        } else {
            $searchResults.innerHTML = '';
        }
    });
}

// activate the app object
new App();