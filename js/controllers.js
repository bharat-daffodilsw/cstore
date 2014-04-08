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
            when('/', {
            templateUrl:'../store-manager',
            controller:'homeCtrl'
        }).when('/login', {
                templateUrl:'../login',
                controller:'loginCtrl'
            }).when('/all-products', {
                templateUrl:'../all-products',
                controller:'allCategory'
            }).when('/product', {
                templateUrl:'../productdetail',
                controller:'productDetailCtrl'
            }).when('/product-category', {
                templateUrl:'../product-category',
                controller:'productCategoryDetailCtrl'
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
        window.location.href = "#!/login";
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
        window.location.href = "http://" + window.location.host + '/login.html';
    }

    $scope.getProductCategories = function () {
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.productCategories = productCategoryData.response.data;
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductCategories();


});
cstore.controller('homeCtrl', function ($scope, $appService, $location) {
    $scope.homeView = {};
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

            $scope.popularProducts = $appService.setUrls(productData.response.data);
        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getAllVendors = function () {
        var query = {"table":"vendors__cstore"};
        query.columns = ["address", {"expression":"city", "columns":["_id", "name"]}, {"expression":"state", "columns":["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode"];
        query.max_rows = 10;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.vendors = vendorData.response.data;
        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.setAdminView = function (viewName) {
        var c_name = "adminView"
        if (viewName) {

            document.cookie = c_name + "=" + escape(viewName);
        }
        else {
            document.cookie = c_name + "=" + escape("vendor");
        }

    }
    if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {

        $scope.getPopularProducts(8);

        $scope.homeView = {"storeManager":true, "admin":false};
    }
    else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
        $scope.homeView = {"storeManager":false, "admin":true};

        $scope.getAllVendors();
    }


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
            var rawData = productData.response.data;
            for (var i = 0; i < rawData.length; i++) {
                if (rawData[i] && rawData[i]["categoryWiseData"] && rawData[i]["categoryWiseData"].length) {

                    rawData[i]["categoryWiseData"] = $appService.setUrls(rawData[i]["categoryWiseData"]);
                }
                console.log("bbb" + rawData[i]["categoryWiseData"]);
            }
            $scope.products = rawData;

        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getProductList();
});

cstore.controller('productDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.getProductDetail = function () {
        var query = {"table":"products__cstore"};
        query.columns = ["cost", "description", "image", "name", "short_description", {"expression":"product_category", "columns":["_id", "name"]}, {"expression":"vendor", "columns":["firstname"]}, "quantity", "soldcount"];
        query.filter = {"_id":$routeParams.productid};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            $scope.product = $appService.setUrls(productDetailData.response.data);
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductDetail();
});
cstore.controller('productCategoryDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.categoryData = {"loadingData":false};
    $scope.products = [];
    $scope.getProductDetail = function (cursor, filter) {
        if ($scope.categoryData.loadingData) {
            return false;
        }
        $scope.categoryData.loadingData = true;
        var query = {"table":"products__cstore"};
        query.columns = ["cost", "image", "name", "short_description", {"expression":"product_category", "columns":["_id", "name"]}, {"expression":"vendor", "columns":["firstname"]} ];
        if (filter && filter != undefined && filter != "undefined") {

            query.filter = {"product_category._id":filter};
        }
        else {
            alert("Not Valid");
            return false;
        }
        query.maxrow = 8;
        query.cursor = cursor;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            var rawData = $appService.setUrls(productDetailData.response.data);

            if ($scope.products.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.products.push(rawData[i]);
                }
            }
            if (!$scope.products.length) {
                $scope.products = rawData;
            }

            console.log("data" + JSON.stringify($scope.products));
            $scope.categoryData.loadingData = false;
            $scope.cursor = productDetailData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getProductDetail($scope.cursor, $routeParams.q);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getProductDetail(cursor, $routeParams.q)
    }
});
cstore.controller('loginCtrl', function ($scope, $appService, $location) {
    if ($appService.getSession()) {
        window.location.href = "/";
    }
    $scope.login = function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (regEmail.test(username) == false) {
            alert("Please Enter A Valid Email");
            return false;
        }
        if (username == "" || username == undefined) {
            alert("Please enter vaild user name ");
            return false;
        }
        if (!password) {
            alert("enter your password");
            return false;
        }
        var params = {};
        params.username = username;
        params.password = password;
        params.ask = ASK;
        params.osk = OSK;
        $appService.getDataFromJQuery("/rest/login", params, "GET", "JSON", function (callBackData) {
            if (callBackData.code && callBackData.code == 8) {
                alert(callBackData.response);
                return false;
            }
            else if (callBackData.code && callBackData.code == 3) {
                alert(callBackData.response);
                return false;
            }
            else if (callBackData.code && callBackData.code == 200) {
                var usk = callBackData.response ? callBackData.response.usk : null;
                if (usk) {
                    var query = {"table":"user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid"];
                    query.filter = {"userid":"{_CurrentUserId}"};
                    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        $appService.deleteAllCookie();
                        var roleid = callBackData.response.data[0].roleid._id;
                        var firstname = callBackData.response.data[0].userid.firstname;
                        var userid = callBackData.response.data[0].userid._id;
                        if (callBackData.response.data[0] && callBackData.response.data[0]["storeid"]) {
                            var storeid = callBackData.response.data[0]["storeid"]._id;
                        }
                        var c_name = "usk";
                        document.cookie = c_name + "=" + escape(usk);
                        var c_name = "roleid";
                        document.cookie = c_name + "=" + escape(roleid);
                        var c_name = "userid";
                        document.cookie = c_name + "=" + escape(userid);
                        var c_name = "firstname";
                        document.cookie = c_name + "=" + escape(firstname);
                        if (storeid) {
                            var c_name = "storeid";
                            document.cookie = c_name + "=" + escape(storeid);
                        }
                        window.location.href = "/";

                    }, function (err) {

                        alert("error while making request");
                    });

                }

            }
            else {
                /*for messgae*/
            }

        }, function (jqxhr, error) {
            alert("error while making request");
        });

    }

});

