// toggle navigation
;(function() {
    var $navDiv = document.getElementById('navDiv');
    var $navCross = document.getElementById('navCross');
    var $navBar = document.getElementById('navBar');
    
    $navBar.addEventListener('click', function() {
        $navDiv.style.width = '260px';    
    });
    
    $navCross.addEventListener('click', function() {
        $navDiv.style.width = '0%';    
    });
})();

// toggle search
;(function() {
    /*
    var $googleSearchDiv = document.getElementById('google-search');
    
    document.getElementById('toggle-search').addEventListener('click', function() {
        $googleSearchDiv.classList.toggle('hide');        
    });
    */

})();

function $httpAjax(args) {
    var xhr = new XMLHttpRequest;
    var myTimer = null;
    
    xhr.open(args.method, args.url, args.async);
    
	// if we are uploading files via ajax, we do no want to set this content type.
    if (args.type === undefined && args.method === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
    }
	
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (myTimer !== null) {
                clearTimeout(myTimer);
            }
            if (xhr.status === 200 || xhr.status === 304) {
                args.successCall(xhr);
            } else {
                if (args.errorCall != null) {
                    args.errorCall(xhr);
                }
            }
        }
    };
    
    if (args.timeout !== null) {
        myTimer = setTimeout(args.timeoutCall, args.timeout);
    }
    
    xhr.send(args.data);
}

// gives current date
function getTodayDate() {
        var tdate = new Date();
        var d = tdate.getDate(); //yields day
        var dd = d > 9 ? d : '0'+d ;
        var M = tdate.getMonth(); //yields month
        var MM = (M+1) > 9 ? (M+1) : '0'+ (M+1) ;
        var yyyy = tdate.getFullYear(); //yields year
        var currdate = yyyy+'-'+MM+'-'+dd;
        return currdate;
    }
    
// attach event listeners to helper box
(function() {
    var infoBox = document.querySelector('.helper .info');
    
    document.addEventListener('click', function(evt) {
        var clickedElement = evt.target;
        
        if(clickedElement.dataset.helperState === 'show') {
            infoBox.classList.remove('hide');
        } else if(clickedElement.dataset.helperState === 'hide') {
            infoBox.classList.add('hide');
        }
    });    
})();


// attach click event to notification box.
(function() {
    var $notificationsBox = document.getElementById('notifications-box');
    var $notificationIconLink = document.getElementById('notification-icon-link');
    
    $notificationIconLink.addEventListener('click', function() {
        $notificationsBox.classList.toggle('hide');
        $notificationIconLink.querySelector('span.ion-ios-bell').classList.remove('animated');
        $notificationIconLink.querySelector('sup').classList.add('gray-bg');
    });
    
    document.addEventListener('click', function(evt) {
        if(!evt.target.closest('#notifications-box') && !evt.target.closest('#notification-icon-link')) {
            $notificationsBox.classList.add('hide');
        }
    });
})();