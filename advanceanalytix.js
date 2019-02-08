var homeScope;
angular.module('smeApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {templateUrl: "index_home.html"})
             .when("/logout", {templateUrl: "index_home.html"})
            .otherwise({ template: "<h1>None</h1><p>Nothing has been selected</p>"});
    })
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) { return $sce.trustAsHtml(text); };
    }])
    .directive("psPerfectScroll", function () {
        return {
            scope: { psUpdateElement: "@" },
            link: function ($scope, element, attr) {
                if ($scope.psUpdateElement != undefined) {
                    $scope.$parent.$watchCollection($scope.psUpdateElement, function (newVal, oldVal) {
                        setTimeout(function () {
                            $(element).perfectScrollbar('update');
                        }, 200);
                    });
                }
                if (attr.psPerfectScroll != undefined && attr.psPerfectScroll != "")
                    $(element).perfectScrollbar(JSON.parse(attr.psPerfectScroll.replace(/'/g, "\"")));
                else
                    $(element).perfectScrollbar();
            }
        }
    })
    .directive("popover", function () {
        return {
            scope: {
                "popoverData": "=",
                "popoverTrigger": "=",
                "popoverTitle": "=",
                "popoverPlacement": "&",
                "onShow": "&"
            },
            link: function ($scope, $element, $attr, ngModel) {
                $scope.initPopover = function () {
                    $element.popover({
                        html: true,
                        title: function () {
                            return $scope.popoverTitle;
                        },
                        trigger: $scope.popoverTrigger,
                        content: function () {
                            return $scope.popoverData;
                        },
                        placement: 'auto ',
                        appendToBody: true,
                        width: '100%'
                        //  overflow:'visible'
                        // container: '.side-study-box'
                    });
                    if ($scope.onShow != undefined) {
                        $element.on('show.bs.popover', function () {
                            $scope.onShow($element);
                        });
                    }
                }
                $scope.initPopover();
            }
        }
    })

    .directive('fileSelect', function ($http, SmeConstants) {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                element.bind('change', function (event) {
                    var file = event.target.files[0];
                    var fd = new FormData();
                    fd.append("file", file);
                    fd.append("UUID", $scope.uuid);
                    fd.append("DOMAIN", "SME");
                    $http.post(SmeConstants.HOST_SERVER + "/advanalytix/UploadFileSME", fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (response) {
                        var label = response.data.filename.replace(/\\/g, '/').replace(/.*\//, '');

                        ngModel.$setViewValue(response.data.filename);
                    }, function (error) {
                        console.log("Error while uploading file");
                        ngModel.$setViewValue("");
                    });
                });
            }
        };
    })

    .directive('fileSelectSmeBots', function ($http, SmeConstants) {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                element.bind('change', function (event) {
                    var file = event.target.files[0];
                    var fd = new FormData();
                    fd.append("file", file);
                    fd.append("UUID", $scope.smeBotsID);
                    fd.append("DOMAIN", "SME");
                    $http.post(SmeConstants.HOST_SERVER + "/advanalytix/UploadFileSME", fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (response) {
                        var label = response.data.filename.replace(/\\/g, '/').replace(/.*\//, '');

                        ngModel.$setViewValue(response.data.filename);
                    }, function (error) {
                        console.log("Error while uploading file");
                        ngModel.$setViewValue("");
                    });
                });
            }
        };
    })
    .directive('fileSelectCcas', function ($http, SmeConstants) {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                element.bind('change', function (event) {
                    var file = event.target.files[0];
                    var fd = new FormData();
                    fd.append("file", file);
                    fd.append("UUID", $scope.uuid);
                    fd.append("HOST", SmeConstants.HOST_SERVER);
                    $http.post(SmeConstants.HOST_SERVER + "/advanalytix/UploadFileCCAS", fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (response) {
                        var label = response.data.filename.replace(/\\/g, '/').replace(/.*\//, '');

                        ngModel.$setViewValue(response.data.filename);
                    }, function (error) {
                        console.log("Error while uploading file");
                        ngModel.$setViewValue("");
                    });
                });
            }
        };
    })
    .service("CommonValidations", function () {
        this.findDuplicatesValues = function (array) {
            var uniq = array.map(function (x) {
                return {
                    count: 1,
                    name: x
                }
            }).reduce(function (prev, cur) {
                prev[cur.name] = (prev[cur.name] || 0) + 1;
                return prev;
            }, {});
            return Object.keys(uniq).filter(function (a) {
                console.log(a, uniq[a]);
                return uniq[a] > 1;
            });
        }
        this.containsScriptTag = function (data) {
            if (/<script[\s\S]*?>[\s\S]*?<\/script>/.test(data)) {
                return true;
            }
            return false;
        }
        this.onlyNumber = function (number) {
            if (/^-?\d*\.?\d*$/.test(number))
                return false;
            return true;
        }
        this.nameSpecialCharacter = function (TCode) {
            if (/^[ A-Za-z0-9_@./%#&-]*$/.test(TCode))
                return false;
            return true;
        }

        this.whitelistCharacter = function (TCode) {
            if (/^[ A-Za-z0-9_.-]*$/.test(TCode))
                return false;
            return true;
        }
        this.isValidDate = function (TCode) {
            if (/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(TCode))
                return false;
            return true;
        }

    })
    .directive('showHideConfig', function () {
        return {
            scope: {
                title: '@',
                value: '@',
                showdata: '@'
            },
            template: '<span>{{title}}</span>' +
            '<span class="pull-right">{{value}}</span>'

        };
    })
    .controller("MessageYesNoController", function ($scope, $sce, $rootScope, $element) {
        var windowCntlNo, windowCntlYes = $rootScope.$on("window.control.yes", function (e, $event) {
            $scope.messageYesNo(true);
        });
        windowCntlNo = $rootScope.$on("window.control.no", function (e, $event) {
            $scope.messageYesNo(false);
        });
        $scope.initMessageYesNo = function () {
            $scope.modalMessageHeader = $scope.$parent.messageInfo.title;
            $scope.modalBodyMessage = $scope.$parent.messageInfo.body;
            $element.modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            }).on('hidden.bs.modal', function () {
                $scope.closeModal();
                $scope.$apply();
            });
        }
        $scope.messageYesNo = function (condition) {
            if ($scope.$parent.messageInfo.callbackFn != undefined) {
                $scope.$parent.messageInfo.callbackFn(condition);
            }
            $scope.closeModal();
        }
        $scope.closeModal = function () {
            windowCntlYes();
            windowCntlNo();
            $scope.$parent.parentCloseModal();
        }
        $scope.initMessageYesNo();
    })
    .controller("MessageOkController", function ($scope, $element) {
        $scope.initMessageOk = function () {
            if ($scope.messageInfo) {
                $scope.modalBodyMessage = $scope.messageInfo.body;
                $element.modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                }).on('hidden.bs.modal', function () {
                    $scope.closeModal();
                    $scope.$apply();
                });
            }
        }
        $scope.messageOk = function () {
            if ($scope.messageInfo.callbackFn != undefined) {
                $scope.messageInfo.callbackFn();
            }
            $scope.closeModal();
        }
        $scope.closeModal = function () {
            $scope.$parent.parentCloseModal();
        }
        $scope.initMessageOk();
    })
    .controller('indexCtrl', function ($scope, $http, SmeConstants, $rootScope) {
        $scope.modalTitle = "";
        $scope.viewForm = "";
        $scope.isIndexPage = "true";
        var templateContextPath = "/AdvanceAnalytixUI/static/html/advanceAnalytix/newUI/";
        $scope.setView = function (name) {
            console.log("setview");
            $scope.isIndexPage = "false";
            $scope.dForm = name + ".html";
            console.log($scope.viewForm);
        }

        $scope.IsVisible = false;
        $scope.ShowMenu = function () {
            $scope.IsVisible = true;
        }
        $scope.ShowHide = function () {
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
        $rootScope.setHeadText = function (context) {
            var headerElement = setHeaderText(context);
            $scope.headerText = headerElement[0];
            $scope.headerImage = headerElement[1];
        }
        $scope.showHideChatWindow = function () {
            $scope.showIframe = $scope.showIframe ? false : true;
        }
        $rootScope.overLay1 = "";
        $rootScope.overLay2 = "";

        $rootScope.displayUserName = "";

        $scope.login = true;
        $scope.loginFn = function (displayRow) {
            if ($scope.userName === "deepika" && $scope.password === "Pragmatix@123") {
                $rootScope.role = "RI";
                $scope.login = false;
                $rootScope.displayUserName = $scope.userName
            }
            if ($scope.userName === "zubin" && $scope.password === "Pragmatix@123") {
                $rootScope.role = "RA";
                $scope.login = false;
                $rootScope.displayUserName = $scope.userName
            } else {
                $scope.userName = "Invalid";
                $scope.password = "Invalid";
            }
        }

    })
    .controller('MenuCtrl', function ($scope, $http, SmeConstants) {
        $scope.viewForm = "";
        $scope.isIndexPage = "true";
        var templateContextPath = "/AdvanceAnalytixUI/static/html/advanceAnalytix/newUI/";
        $scope.setView = function (name) {
            console.log("setview");
            $scope.isIndexPage = "false";
            $scope.dForm = name + ".html";
            console.log($scope.viewForm);
        }

    })
    .controller("overRideModelCtrl", function ($scope, $http) {
        $scope.showModalNew();
        $scope.closeModal = function () {
            $scope.includeModal = undefined;
            $(".templateDialog").modal('hide');
            $(".bootstrap-backdrop").removeClass("in").hide();
            $('.modal-backdrop').remove();
        }
    })
    .controller("groupOverLayModelCtrl", function ($scope, $http, $rootScope) {
        $scope.showModalNew();
        $scope.closeModal = function () {
            $scope.includeModal = undefined;
            $(".templateDialog").modal('hide');
            $(".bootstrap-backdrop").removeClass("in").hide();
            $('.modal-backdrop').remove();
        }
    })
    .controller("LinkedinURLCtrl", function ($scope, $http) {
        $scope.showModal();

    })
    .controller("iframeModalController", function ($scope, $sce) {
        $scope.init = function () {
            $scope.iframeSource = "https://www.linkedin.com/uas/login";
        }
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        $scope.showModal();
        $scope.init();
    })
    .directive('onlyNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('onlyLetters', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^a-zA-Z\s]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('alphanumeric', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^a-zA-Z0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })

    .directive("bDatePicker", function () {
        return {
            scope: {
                bDatePickerOptions: "="
            },
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                var datePickerOptions = {};
                datePickerOptions.format = 'dd-mmm-yyyy';
                if (scope.bDatePickerOptions != "" && scope.bDatePickerOptions != undefined) {
                    datePickerOptions = scope.bDatePickerOptions;
                }
                element.datepicker(datePickerOptions).on('changeDate', function (ev) {
                    ctrl.$setViewValue(ev.currentTarget.value);
                    scope.$apply();
                });
            }
        }
    }).directive('fileSelectTally', function ($http, SmeConstants) {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                element.bind('change', function (event) {
                    // upload file and set image source
                    var file = event.target.files[0];
                    var fd = new FormData();
                    // Take the first selected file
                    var name = event.target.attributes[1].nodeValue
                    fd.append(name, file);
                    // fd.append("name", name);
                    fd.append("UUID", $scope.uuid);
                    $http.post(SmeConstants.HOST_SERVER + '/advanalytix/TallyUploadFile', fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (response) {
                        ngModel.$setViewValue(response.data.filename);

                    }, function (error) {
                        console.log("Error while uploading file");
                    });
                });
            }
        };
    }).directive('fileSelectEws', function ($http, SmeConstants) {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                element.bind('change', function (event) {
                    // upload file and set image source
                    var file = event.target.files[0];
                    var fd = new FormData();
                    console.log(event.target.attributes[1].nodeValue)
                    // Take the first selected file
                    var name = event.target.attributes[1].nodeValue
                    fd.append(name, file);
                    // fd.append("name", name);
                    $http.post(SmeConstants.HOST_SERVER + '/advanalytix/EWSUploadFile', fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (response) {
                        console.log("sss" + response.data.filename)
                        ngModel.$setViewValue(response.data.filename);
                        $scope.showModal();
                    }, function (error) {
                        console.log("Error while uploading file");
                    });
                });
            }
        };
    })

    .directive('showMore', [function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                text: '=',
                limit: '='
            },

            template: '<div><p ng-show="largeText"> {{ text | subString :0 :end }}.... <a href="javascript:;" ng-click="showMore()" ng-show="isShowMore">Show More</a><a href="javascript:;" ng-click="showLess()" ng-hide="isShowMore">Show Less </a></p><p ng-hide="largeText">{{ text }}</p></div> ',

            link: function (scope, iElement, iAttrs) {


                scope.end = scope.limit;
                scope.isShowMore = true;
                scope.largeText = true;

                if (scope.text.length <= scope.limit) {
                    scope.largeText = false;
                };

                scope.showMore = function () {

                    scope.end = scope.text.length;
                    scope.isShowMore = false;
                };

                scope.showLess = function () {

                    scope.end = scope.limit;
                    scope.isShowMore = true;
                };
            }
        };
    }]);


angular.module('smeApp').filter('subString', function () {
    return function (str, start, end) {
        if (str != undefined) {
            return str.substr(start, end);
        }
    }
})

function formatNumber(args) {
    args = args.split(",").join("");
    var val = args + "";
    if (val != null && typeof val != "undefined" && val != "") {
        val = parseFloat(val).toFixed(2);
        var str = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        val = str;
    }

    return val;
}

function toCamelCase(str) {
    var retVal = '';
    if (str.constructor.name === "String") {
        // remove \u00C0-\u00ff if you do not want the extended letters like
        // é
        retVal = str.replace(/[^A-Za-z\u00C0-\u00ff]/g, ' ')
            .toLowerCase().split(' ').map(function (word) {
                return $.trim(word[0]).toUpperCase() + word.substr(1);
            }).join(' ').replace(/ /g, '');
    } else {
        retVal = '[Not a String]'
    }
    return retVal.replace(/([A-Z])/g, ' $1').trim();

}

angular.module('smeApp').filter('orderObjectBy', function () {
    return function (input, attribute) {
        if (!angular.isObject(input)) return input;

        var array = [];
        for (var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function (a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return a - b;
        });
        return array;
    }
}).filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
        if (val != undefined)
            return $sce.trustAsHtml(val);
    };
}]);

angular.module('smeApp').filter('customorder', function () {
    return function (items) {
        items.sort(function (a, b) {
            // Make sure we are comparing integers
            var aPos = parseInt(a.value.uiorder);
            var bPos = parseInt(b.order.uiorder);

            // Do our custom test
            if (aPos > bPos) return 1;
            if (aPos < bPos) return -1;
            return 0;
        })
    }
});

function confirmDialogNew(title, body, callbackFn) { // yes no dialog
    homeScope.confirmDialogYesNo(title, body, callbackFn);
    if (!homeScope.$$phase) {
        homeScope.$apply();
    }
    return "";
}

function showDialogNew(body, callbackFn, showBackdrop) { // ok dialog
    homeScope.confirmDialogOk(body, callbackFn, showBackdrop);
    if (!homeScope.$$phase) {
        homeScope.$apply();
    }
}
angular.module('smeApp').filter('key', function () {
    return function (input) {
        if (!angular.isObject(input)) {
            throw Error("Usage of non-objects with keylength filter!!")
        }
        return Object.keys(input)[0];
    }
});
angular.module('smeApp').filter('value', function () {
    return function (input) {
        if (!angular.isObject(input)) {
            throw Error("Usage of non-objects with keylength filter!!")
        }
        return angular.equals(input, {}) ? "NA" : Object.values(input)[0][0] + "%";

    }
});
angular.module('smeApp').filter('dirvalue', function () {
    return function (input) {
        if (!angular.isObject(input)) {
            throw Error("Usage of non-objects with keylength filter!!")
        }
        return angular.equals(input, {}) ? "NA" : Object.values(input)[0];

    }
});
angular.module('smeApp').filter('strReplace', function () {
    return function (input, from, to) {
        input = input || '';
        from = from || '';
        to = to || '';
        return input.replace(new RegExp(from, 'g'), to);
    };
});
angular.module('smeApp').filter('filename', function () {
    return function (input) {
        if (input == undefined)
            return ""
        else
            return input.replace(/\\/g, '/').replace(/.*\//, '');
    }

});
angular.module('smeApp').filter('getType', function () {
    return function (obj) {
        if(typeof obj == 'string')
        {
            if (isNaN(obj)) return 'string'
            else return 'number'
        }else{
            return typeof obj
        }
    };
});
angular.module('smeApp').filter('titleCase', function () {
    return function (input) {
        var result = input.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
});
angular.module('smeApp').filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
});
angular.module('smeApp').filter('numberToWords', function () {
    return function (input) {
        if (input != undefined) {
            var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
            var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            var finalInput = input.split(',').join('');
            var number = parseFloat(finalInput).toFixed(2).split(".");
            var num = parseInt(number[0]);
            var digit = parseInt(number[1]);
            if ((num.toString()).length > 9) return '';
            var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            var d = ('00' + digit).substr(-2).match(/^(\d{2})$/);;
            if (!n) return; var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
            str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupee ' : '';
            str += (d[1] != 0) ? ((str != '') ? "and " : '') + (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]) + 'Paise ' : 'Only';
            return str;
        } else {
            return "";
        }
    };
});
angular.module('smeApp').filter('removeUnderScr', function () {
    return function (input) {
        return input.replace(/_/g, ' ');
    };
});
function formatNumberND(args) {
    args = args.split(",").join("");
    var val = args + "";
    if (val != null && typeof val != "undefined" && val != "") {
        val = parseFloat(val).toFixed(0);
        var str = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        val = str;
    }

    return val;
}
function setHeaderText(context) {
    var text, img
    switch (context) {
        default:
            text = "";
            img = "";
            break;
        case "portal":
            text = "PORTAL";
            img = "./assets/images/icons/menu_sme_portal.png";
            break;
        case "workflow":
            text = "WORKFLOW";
            img = "./assets/images/icons/menu_sme_dashboard.png";
            break;
        case "rule":
            text = "RULE CONFIGURATOR";
            img = "./assets/images/icons/menu_rule_configurator.png";
            break;
        case "credit":
            text = "CREDIT RATINGS";
            img = "./assets/images/icons/menu_credit_rating.png";
        case "chatBot":
            text = "LOBOT";
            img = "./assets/images/icons/chatbot.png";
    }

    return [text, img];
}
function getChartColor(scoreRange) {
    return {
        'Low': '#cc6900',
        'Below Average': '#e28d03',
        'Average': '#989101',
        'Good': '#7aa013'
    }[scoreRange];
}
function getScoreRange(score) {// value passed in percentage

    if (score >= 0.0 && score <= 10.99) {
        return 'Low';
    }
    if (score >= 11.0 && score <= 49.99) {
        return 'Below Average';
    }
    if (score >= 50.0 && score <= 74.99) {
        return 'Average';
    }
    if (score >= 75.0 && score <= 100) {
        return 'Good';
    } else {
        return 'Average';
    }

}

var onDomIsRendered = function (domString) {
    return new Promise(function (resolve, reject) {
        function waitUntil() {
            setTimeout(function () {
                if ($(domString).length > 0) {
                    resolve($(domString));
                } else {
                    waitUntil();
                }
            }, 100);
        }
        waitUntil();
    });

};

angular.module('smeApp').service('CommonPortalServices', function() {
    this.getRandomID = function (noOfChars) {
         var text = "";
         var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         for (var i = 0; i < noOfChars; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
    }
    this.extractFileName = function(fileName){
        if (fileName != undefined) return fileName.replace(/\\/g, '/').replace(/.*\//, '');
        else return "Error Occurred";
    }
});

angular.module('smeApp').directive('fileSelectCommon', function ($http, SmeConstants) {
     return {
         require: "ngModel",
         restrict: 'A',
         link: function ($scope, element, attrs, ngModel) {
             element.bind('change', function (event) {
                 // upload file and set image source
                 var file = event.target.files[0];
                 var fd = new FormData();
                 fd.append("UUID", $scope.uuid);
                 console.log(event.target.attributes[1].nodeValue)
                 // Take the first selected file
                 var name = event.target.attributes[1].nodeValue
                 fd.append(name, file);
                 // fd.append("name", name);
                 $http.post(SmeConstants.HOST_SERVER + '/advanalytix/UploadFileCommon', fd, {
                     headers: {
                         'Content-Type': undefined
                     },
                     transformRequest: angular.identity
                 }).then(function (response) {
                     console.log("sss" + response.data.filename)
                     ngModel.$setViewValue(response.data.filename);
                     $scope.showModal();
                 }, function (error) {
                     console.log("Error while uploading file");
                 });
             });
         }
     };
});
