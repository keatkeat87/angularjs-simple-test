(function () {

    var app = angular.module('app', ["ngCookies", "ui.router", "ngSanitize", "mgcrea.ngStrap"]);

    app.directive("grecaptcha", [function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, $elem, $attr, ngModel) {

                grecaptcha.ready(function () {
                    var grecaptchaId = grecaptcha.render($elem[0], {
                        sitekey: '6LcUHCoUAAAAADBV6HcCaV3vyTVijTs4bfMEMLtC',
                        callback: function (token) {
                            ngModel.$setViewValue(token);
                        },
                        theme: 'light',
                        'expired-callback': () => {
                            ngModel.$setViewValue('');
                        }
                    });
                    // grecaptcha.reset(grecaptchaId);
                });
            }
        }
    }]);
    app.directive('creditCard', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, ngModel) {

                ngModel.$parsers.push(function (v) {
                    console.log('$parsers', v);
                    return 'xx';
                });

                $attrs.$observe('creditCardType', function (value) {
                    ngModel.$validate();
                });

                ngModel.$validators.creditCard = function (modelValue, viewValue) {
                    // console.log('modelValue', modelValue);
                    // console.log('viewValue', viewValue);
                    // console.log($attrs);                 
                    console.log('check');
                    return true;

                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }

                    //   return checkCreditCard (myCardNo, myCardType)


                    //   if (INTEGER_REGEXP.test(viewValue)) {
                    //     // it is valid
                    //     return true;
                    //   }

                    //   // it is invalid
                    //   return false;
                };
            }
        };
    });

    app.config(function ($timepickerProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "homepage.html",
                controller: function ($scope, $state) {

                    $scope.log = function (v) {
                        console.log(v);
                    }

                    $scope.go = function () {
                        $state.go('ajax', {
                            uuid: 'adasd'
                        });
                    }

                    $scope.submit = function () {

                        console.log('submit');
                    }

                    setTimeout(() => {
                        console.log('done');
                        // $('#dLabel').dropdown();
                        // $('#dLabel').on('show.bs.dropdown', function () {
                        //     console.log('dada');
                        // });                        
                    }, 1000);

                }
            })
            .state('ajax', {
                url: "/ajax?uuid",
                templateUrl: "ajax.html",
                controller: function ($scope, $http, $state, $stateParams) {
                    console.log($stateParams.uuid);
                    $scope.click = function () {
                        $http({
                            method: 'POST',
                            url: 'http://66.96.215.80:8888/ARR_API/PostSchoolRecord',
                            data: {
                                "RequestorName": "yam heng keat",
                                "RequestorEmail": "asdasd",
                                "RequestorContact": "asdadw",
                                "S_NameOfSchool": "dada",
                                "S_From_Year": "1986",
                                "S_To_Year": "1987",
                                "Remark": "test only",
                                "Cookies_ID": "12323",
                                "grecaptchaToken": "asdw"
                            }
                        }).then(function (res) {
                            console.log(res);
                        }, function (error) {
                            if (error.status == 400) {
                                console.log(error.data);
                            }
                        });
                    }
                }
            })
            .state('married', {
                url: "/married",
                templateUrl: "married.html",
                controller: function ($scope, $state) {

                    $scope.minToDate = null;
                    $scope.maxToDate = null;

                    var validFromDateAndToDate = function () {
                        if ($scope.user.From_Date && $scope.user.To_Date) {
                            if ($scope.user.From_Date > $scope.user.To_Date || $scope.user.To_Date > $scope.maxToDate) {
                                $scope.myForm.From_Date.$setValidity('limitedOrReverse', false);
                                $scope.myForm.To_Date.$setValidity('limitedOrReverse', false);
                            }
                            else {
                                $scope.myForm.From_Date.$setValidity('limitedOrReverse', true);
                                $scope.myForm.To_Date.$setValidity('limitedOrReverse', true);
                            }
                        } else {
                            $scope.myForm.From_Date.$setValidity('limitedOrReverse', true);
                            $scope.myForm.To_Date.$setValidity('limitedOrReverse', true);
                        }
                    }

                    $scope.onFromDateChange = function () {
                        if ($scope.user.From_Date) {
                            $scope.minToDate = $scope.user.From_Date;
                            $scope.maxToDate = moment($scope.user.From_Date).add(3, 'y').toDate();
                            if ($scope.user.To_Date && ($scope.user.To_Date < $scope.minToDate || $scope.user.To_Date > $scope.maxToDate)) {
                                $scope.user.To_Date = null;
                            }
                        } else {
                            $scope.minToDate = null;
                            $scope.maxToDate = null;
                        }
                        validFromDateAndToDate();
                    }

                    $scope.onToDateChange = function () {
                        validFromDateAndToDate();
                    }

                }
            })
            .state('credit-card', {
                url: "/credit-card",
                templateUrl: "credit-card.html",
                controller: function ($scope) {
                    $scope.creditCardType = 'Visa';
                    // var myCardNo = '4111 1111 1111 11113';
                    // var myCardType = 'Visa';
                    // if (checkCreditCard(myCardNo, myCardType)) {
                    //     alert("Credit card has a valid format")
                    // }
                    // else {
                    //     alert(ccErrors[ccErrorNo])
                    // };

                }
            });

    });

}());
