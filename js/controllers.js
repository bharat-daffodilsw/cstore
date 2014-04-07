var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";

// Declare app level module which depends on filters, and services
var cstore = angular.module('cstore', ['ngRoute', '$appstrap.services']);
cstore.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/test', {
//            templateUrl:'../',
//            controller:'mainCtrl'
        }).otherwise(
//            {"redirectTo":"/login.html"}
        );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location) {
    $scope.currentUser = {"data":""};
    $scope.currentUser["data"]=$appService.getSession();
    if(!$scope.currentUser["data"]){
        alert();
        window.location.href("http://127.0.0.1:5400/login.html");
    }
    $scope.auth = function () {
        var currentSession = $scope.getSession();
        if (currentSession) {
//            window.location.href = "/#/home";
        }
    }


    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return "active"
        } else {
            return ""
        }
    }
});

