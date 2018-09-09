(function () {

    var app = angular.module('app', ['ngCookies', 'ui.router', 'ngSanitize', 'ui.bootstrap', 'mgcrea.ngStrap']);

    app.directive('grecaptcha', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
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
            restrict: 'A',
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




    app.directive('maxDuration', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, ngModel) {
 
                $attrs.$observe('maxDuration', function (value) {
                    ngModel.$validate();
                });

                ngModel.$validators.maxDuration = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) return true;                    
                    var maxDuration = $attrs.maxDuration;
                    if(!maxDuration) return true;
                    var duration = modelValue;
                    maxDuration = moment.duration(maxDuration);
                    duration = moment.duration(modelValue);
                    if (duration.clone().subtract(maxDuration).asMilliseconds() >= 0) {
                        return false;
                    }
                    return true; 
                };
            }
        };
    });

    app.directive('minDuration', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, ngModel) {
 
                $attrs.$observe('minDuration', function (value) {
                    ngModel.$validate();
                });

                ngModel.$validators.minDuration = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) return true;            
                    var minDuration = $attrs.minDuration;
                    if(!minDuration) return true;
                    var duration = modelValue;
                    minDuration = moment.duration(minDuration);
                    duration = moment.duration(modelValue);
                    if (duration.clone().subtract(minDuration).asMilliseconds() <= 0) {
                        return false;
                    }
                    return true; 
                };
            }
        };
    });
     

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/main');
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'homepage.html',
                controller: function ($scope, $state) {

                    $scope.dada = Date.UTC(1970,0,0,0,0,1);
                    $scope.formData = {
                        start: '00:00:00',
                        end: '00:00:00'
                    }
                    $scope.convert = function(str){    

                        console.log('da', moment.utc(moment.duration(str).asMilliseconds()).format('HH:mm:ss'));
                        console.log(moment.utc(moment.duration(str).asMilliseconds()).valueOf());
                        return 2000;
                    }




                    // var start = moment.duration('00:01:15'); 
                    // var end = moment.duration('00:02:09');
                    // var duration = end.subtract(start); 
                    // console.log(moment.utc(duration.as('milliseconds')).format('HH:mm:ss'));



                    return;

                    var groupBy = function (array, compareWith) {
                        compareWith = compareWith || function (a, b) {
                            return a === b;
                        }
                        var datas = array.slice();
                        var results = [];
                        while (datas.length > 0) {
                            var result = [];
                            var aData = datas.pop();
                            result.unshift(aData);
                            for (let i = datas.length - 1; i >= 0; i--) {
                                var bData = datas[i];
                                var match = compareWith(aData, bData);
                                if (match) {
                                    result.unshift(bData);
                                    datas.splice(i, 1);
                                }
                            }
                            results.unshift(result);
                        }
                        return results;
                    }

                    var typeOf = function (value) {
                        // 取代 default 的 typyoF    
                        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
                    }

                    var isDate = function (value) {
                        return typeOf(value) === 'date';
                    }

                    var isSameValue = function (a, b) {
                        if (a === b) return true;
                        if (isDate(a) && isDate(b)) {
                            return +a === +b || (isNaN(+a) && isNaN(+b));
                        }
                    }

                    var sortCompare = function (a, b, desc) {
                        if (desc === undefined) desc = false;
                        var asc = !desc;
                        if (isSameValue(a, b)) return 0;
                        if (asc) {
                            if (a == null || b == null) {
                                return (b == null) ? -1 : 1;
                            }
                            if (typeof (a) === 'boolean') {
                                return (a === true && b === false) ? -1 : 1;
                            }
                            else if (typeof (a) === 'number') {
                                return (a < b) ? -1 : 1;
                            }
                            else if (isDate(a)) {
                                return (+a < +b) ? -1 : 1;
                            }
                            else if (typeof (a) === 'string') {
                                var isChinese = a.charCodeAt(0) >= 10000;
                                var result = (isChinese) ? a.localeCompare(b, 'zh-CN') : a.localeCompare(b);
                                return result;
                            }
                            else {
                                return '';
                            }
                        }
                        else {
                            if (a == null || b == null) {
                                return (a == null) ? -1 : 1;
                            }
                            if (typeof (a) === 'boolean') {
                                return (b === true && a === false) ? -1 : 1;
                            }
                            else if (typeof (a) === 'number') {
                                return (b < a) ? -1 : 1;
                            }
                            else if (isDate(a)) {
                                return (+b < +a) ? -1 : 1;
                            }
                            else if (typeof (a) === 'string') {
                                var isChinese = a.charCodeAt(0) >= 10000;
                                var result = (isChinese) ? b.localeCompare(a, 'zh-CN') : b.localeCompare(a);
                                return result;
                            }
                            else {
                                return '';
                            }
                        }
                    }

                    var orderBy = function (array, commands, needClone = true) {
                        if (needClone === undefined) needClone = true;
                        // js 的 sort 是 void 来的, 但我们不要啦
                        if (needClone) array = array.slice();
                        return array.sort((o1, o2) => {
                            for (var i = 0; i < commands.length; i++) {
                                var command = commands[i];
                                var a = command.getValue(o1);
                                var b = command.getValue(o2);
                                var result = sortCompare(a, b, command.desc);
                                if (result == 0) {
                                    continue;
                                }
                                else {
                                    return result;
                                }

                            }
                            return '';
                        });
                    };


                    var list = [
                        { name: 'xinyao', salary: 100 },
                        { name: 'xinyao', salary: 100 },
                        { name: 'keatkeat', salary: 100 },
                    ]

                    var abc = groupBy(list, function (a, b) {
                        return a.name === b.name;
                    }).map(function (datas) {
                        return {
                            key: datas[0].name,
                            datas: datas,
                            sum: datas.reduce(function (result, value) {
                                return result + value.salary;
                            }, 0)
                        }
                    });
                    orderBy(abc, [{ getValue: function (obj) { return obj.key }, desc: false }], false);
                    console.log('keatkeat', abc);











                    var ggc = [{ name: 'keatkeat' }];
                    $scope.$watch(function () {
                        return ggc;
                    }, function (newValues, oldValues) {
                        console.log('done', newValues);
                    }, true);

                    $scope.kknd = ggc.map(function (v) { return v });


                    $scope.opened = false;
                    $scope.date = new Date();
                    $scope.date = null;
                    $scope.maxDate = new Date(2018, 8, 9);
                    $scope.initDate = new Date(1987, 11, 15);
                    $scope.initDate = null;
                    $scope.change = function () {
                        console.log('change');
                    }
                    $scope.array = [
                        // { name: 'keatkeat' }, 
                        { name: 'xinyao' }
                    ];

                    $scope.$watch('array', function (newValues, oldValues) {
                        console.log(newValues);
                        console.log(oldValues);
                    }, true);

                    $scope.data = {
                        firstName: 'keatkeat',
                        lastName: 'yam',
                        fullName: 'keatkeat yam'
                    }

                    $scope.update = function () {
                        console.log('done', $scope.data);
                        $scope.data.fullName = $scope.data.firstName + ' ' + $scope.data.lastName;
                    }
                }
            })
            .state('ajax', {
                url: '/ajax?uuid',
                templateUrl: 'ajax.html',
                controller: function ($scope, $http, $state, $stateParams) {
                    console.log($stateParams.uuid);
                    $scope.click = function () {
                        $http({
                            method: 'POST',
                            url: 'http://66.96.215.80:8888/ARR_API/PostSchoolRecord',
                            data: {
                                'RequestorName': 'yam heng keat',
                                'RequestorEmail': 'asdasd',
                                'RequestorContact': 'asdadw',
                                'S_NameOfSchool': 'dada',
                                'S_From_Year': '1986',
                                'S_To_Year': '1987',
                                'Remark': 'test only',
                                'Cookies_ID': '12323',
                                'grecaptchaToken': 'asdw'
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
                url: '/married',
                templateUrl: 'married.html',
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
                url: '/credit-card',
                templateUrl: 'credit-card.html',
                controller: function ($scope) {
                    $scope.creditCardType = 'Visa';
                    // var myCardNo = '4111 1111 1111 11113';
                    // var myCardType = 'Visa';
                    // if (checkCreditCard(myCardNo, myCardType)) {
                    //     alert('Credit card has a valid format')
                    // }
                    // else {
                    //     alert(ccErrors[ccErrorNo])
                    // };

                }
            });

    });

}());
