(function () {
    'use strict';

    var app = angular.module('app', ["ngCookies", "ui.router", "ngSanitize", "mgcrea.ngStrap"]);

    app.config(function ($timepickerProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "homepage.html",
                controller : ['$scope', function ($scope) {
                    $scope.isChecked = false;
                    $scope.log = function (event) {
                        console.log(event);
                    }
                }]
            })
            .state('mr_start', {
                url: "/mr_start",
                templateUrl: "marriage_q1.html"
            });
    });

}());
