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
        }).when('/all-products',{
                templateUrl:'../all-products',
                controller:'allCategory'
            }).when('/product',{
                templateUrl:'../productdetail',
                controller:'productDetailCtrl'
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
        window.location.href="http://127.0.0.1:5400/login.html";
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

    $scope.auth = function () {
        var currentSession = $scope.getSession();
        if (currentSession) {
//            window.location.href = "/#/home";
        }
    }


    $scope.logOut = function () {
        $appService.deleteAllCookie();
        window.location.href="http://127.0.0.1:5400/login.html";
    }

    $scope.getProductCategories = function(){
        var query={"table":"product_categories__cstore"};
        query.columns=["name"];
        var queryParams ={query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON",function(productCategoryData){
            $scope.productCategories = productCategoryData.data;
            //console.log(JSON.stringify(productCategoryData.data));
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductCategories();



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
cstore.controller('allCategory', function ($scope, $appService) {

    $scope.getProductList = function () {
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name"];
        query.childs = [
            {"alias":"categoryWiseData", "query":{"table":"products__cstore", "columns":["name", "image", "short_description", "cost"], "maxrow":4, "orders":{"__createdon":"desc"}}, "relatedcolumn":"product_category", "parentcolumn":"_id"}
        ];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        console.log(JSON.stringify(query));
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.products = productData.response.data;
            for(var i = 0; i<$scope.products.length; i ++){
                //$scope.products.categoryWiseData = $appService.setUrls(productData.response.data);
            }
        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getProductList();
});

cstore.controller('productDetailCtrl',function($scope,$appService,$routeParams){
    $scope.getProductDetail = function(){
        var query={"table":"products__cstore"};
        query.columns=["cost","description","image","name","short_description",{"expression":"product_category","columns":["_id","name"]},{"expression":"vendor","columns":["firstname"]},"quantity","soldcount"];
        query.filter = {"_id":$routeParams.productid};
        var queryParams ={query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON",function(productDetailData){
            $scope.product = productDetailData.data[0];
            //console.log(JSON.stringify(productDetailData));
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductDetail();
});
