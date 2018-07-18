/**
 * Represents a video object.
 */
var Video = function() {
    this.$modalDiv = document.getElementById('modal-div');
    this.$modalContent = document.getElementsByClassName('modal-content')[0];
    this.bindModal();
    this.bindLikeButton();
    this.bindRatingStars();
    this.bindSuggestButton();
    this.bindShareButton();
    this.bindSearchForm();
};

Video.prototype.bindModal = function() {
    var that = this;
    this.$modalDiv.addEventListener('click', function(evt) {
        var btnType = evt.target.getAttribute('data-btn-type');
        if (btnType === 'close') {
            that.$modalDiv.setAttribute('class', 'hide');
        }
    });
};

Video.prototype.bindLikeButton = function() {
    var $likeBtn = document.querySelectorAll('[data-btn-type="like"]');
    var baseUrl = document.URL.split('/videos')[0];
    
    if($likeBtn) {
        for(var i = 0; i < $likeBtn.length; i++) {
            console.log($likeBtn[i].dataset.videoId)
            $likeBtn[i].addEventListener('click', function(evt) {
                var that = this;
                $httpAjax({
                    method: 'GET',
                    url: baseUrl + '/videos/likes/' + that.dataset.videoId,
                    async: false,
                    successCall: function() {
                        that.innerHTML = '<i class="ion-android-happy"></i><span class="hide-on-mobile"> Thanks</span>';
                    }
                }); 
            });
        }
    }
};

Video.prototype.bindRatingStars = function() {
    var baseUrl = document.URL.split('/videos')[0];
    document.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('rate-star')) {
            var rateValue = evt.target.dataset.rateValue;
            var videoId = evt.target.dataset.videoId;
            
            $httpAjax({
                method: 'GET',
                url: baseUrl + '/videos/ratings/' + evt.target.dataset.videoId + '/' + evt.target.dataset.rateValue,
                async: false,
                successCall: function() {
                    document.getElementById('rate-id-' + evt.target.dataset.videoId).innerHTML = '<span style="font-weight: 700; color: #cd5c5c"><i class="ion-android-happy"></i> Thanks</span>';
                }
            });
        }
    });
};

Video.prototype.bindSuggestButton = function() {
    var $btn = document.getElementById('suggest-btn');
    var $submitForm = document.getElementById('submit-video-form-div');
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

Video.prototype.bindShareButton = function() {
    document.addEventListener('click', function(evt) {
        
        if(evt.target.dataset.type == 'share-btn') {
            var video_id = evt.target.dataset.videoId;
            var mdm = document.getElementById('share-mdm-' + video_id);
            var std = document.getElementById('share-std-' + video_id);
            var baseUrl = document.URL.split('/videos')[0];

            if(mdm.value && std.value) {
                $httpAjax({
                    method: 'GET',
                    url: baseUrl + '/videos/share/' + video_id + '/' + mdm.value + '/' + std.value,
                    async: true,
                    successCall: function() {
                        evt.target.innerHTML = '<i class="ion-android-done"></i><span class="hide-on-mobile"> Done</span>';
                    }
                });
            }
        }

    });
}

Video.prototype.bindSearchForm = function() {
    var $searchInput = document.getElementById('search-input');
    var $searchResults = document.getElementById('search-results');
    
    $searchInput.addEventListener('keyup', function() {
        if($searchInput.value.trim() != '') {
            var baseUrl = document.URL.split('/videos')[0];
            $httpAjax({
                method: 'GET',
                url: baseUrl + '/videos/search/' + $searchInput.value,
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

// activate the video object
new Video();