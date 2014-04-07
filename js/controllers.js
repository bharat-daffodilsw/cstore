var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";

// Declare app level module which depends on filters, and services
var cstore = angular.module('cstore', ['ngRoute', '$appstrap.services']);
cstore.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/store-manager', {
            templateUrl:'../store-manager',
            controller:'storeManager'
        }).otherwise(
//            {"redirectTo":"/login.html"}
        );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location) {
    $scope.currentUser = {"data":""};
    $scope.currentUser["data"] = $appService.getSession();
    $scope.displayData = {};
    if (!$scope.currentUser["data"]) {
        alert();
        window.location.href("http://127.0.0.1:5400/login.html");
    }
    if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
        $scope.displayData["options"] = true;
        $scope.displayData["cart"] = true;
        $scope.displayData["menu"] = false;
        $scope.displayData["role"] = {"admin":false, "storeManager":true};
    }
    else {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = true;
        $scope.displayData["role"] = {"admin":true, "storeManager":false};
    }

    if ($scope.displayData["role"]["storeManager"]) {
        window.location.href="#!/store-manager";
    } else if ($scope.displayData["role"]["admin"]) {
        window.location.href="#!/admin";
    }
    $scope.auth = function () {
        var currentSession = $scope.getSession();
        if (currentSession) {
//            window.location.href = "/#/home";
        }
    }


});
cstore.controller('storeManager', function ($scope, $appService) {

    $scope.getPopularProducts = function (maxRow) {
        var query = {"table":"products__cstore"};
        query.columns = ["name", "image", "short_description", "cost", "soldcount"];
        query.orders = {"soldcount":"desc"};
        if (maxRow) {

            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 8;
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.popularProducts = productData.response.data;
        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getPopularProducts(8);
});

