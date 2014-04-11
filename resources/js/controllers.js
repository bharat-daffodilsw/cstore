var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";
var VENDOR = "vendors";

// Declare app level module which depends on filters, and services
var cstore = angular.module('cstore', ['ngRoute', '$appstrap.services']);
cstore.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/', {
            templateUrl:'../home',
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
            }).when('/vendors', {
                templateUrl:'../vendors',
                controller:'vendorCtrl'
            }).when('/add-new-vendor', {
                templateUrl:'../add-new-vendor',
                controller:'addNewVendorCtrl'
            }).when('/edit-vendor', {
                templateUrl:'../add-new-vendor',
                controller:'addNewVendorCtrl'
            }).when('/store-managers', {
                templateUrl:'../store-managers',
                controller:'storeManagerList'
            }).when('/products', {
                templateUrl:'../products',
                controller:'productList'
            }).when('/add-product', {
                templateUrl:'../add-product',
                controller:'addProductCtrl'
            }).when('/edit-product', {
                templateUrl:'../add-product',
                controller:'addProductCtrl'
            })
            .otherwise(
//            {"redirectTo":"/login.html"}
        );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location) {
    $scope.currentUser = {"data":""};
    $scope.data = {"cities":[], "states":[], "selectedCity":"", "selectedState":""};
    $scope.productdata = {"productCategories":[], "vendors":[], "selectedProductCategory":"", "selectedVendor":""};
    $scope.currentUser["data"] = $appService.getSession();
    $scope.displayData = {};
    if ($scope.currentUser["data"] == null || $scope.currentUser["data"] == "null") {
        window.location.href = "#!/login";
        return false;
    }
    if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
        $scope.displayData["options"] = true;
        $scope.displayData["cart"] = true;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin":false, "storeManager":true};
    }
    else {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = true;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin":true, "storeManager":false};
    }

    $scope.getCities = function (stateid, cityid) {
        var query = {"table":"cities__cstore"};
        query.columns = ["name"];
        $scope.defaultCity = cityid;
        if (stateid && stateid != null && stateid != "null") {
            query.filter = {"stateid._id":stateid};
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
            $scope.data.cities = cityData.response.data;
            if ($scope.defaultCity) {
                for (var i = 0; i < $scope.data.cities.length; i++) {
                    if ($scope.data.cities[i]._id == $scope.defaultCity) {
                        $scope.data.selectedCity = $scope.data.cities[i];
                        break;
                    }
                }
            } else {

                $scope.data.selectedCity = $scope.data.cities[0];
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getStates = function () {
        var states = {};
        var query = {"table":"states__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            $scope.data.states = stateData.response.data;
            $scope.data.selectedState = $scope.data.states[0];
            $scope.getCities($scope.data.states[0]._id, false);
        }, function (jqxhr, error) {
        })
    }
    $scope.clearContent = function () {
        $scope.data["firstname"] = "";
        $scope.data["lastname"] = "";
        $scope.data["contact"] = "";
        $scope.data["postalCode"] = "";
        $scope.data["address"] = "";
        $scope.data["email"] = "";
        $scope.data.selectedState = $scope.data.states[0];
        $scope.data.selectedCity = $scope.data.cities[0];

    }
    $scope.logOut = function () {
        $appService.deleteAllCookie();
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = false;
        $scope.displayData["role"] = {"admin":false, "storeManager":false};
        $scope.displayData["loggedIn"] = false;

        window.location.href = "#!/login";
    }

    $scope.getVendors = function () {
        var vendors = {};
        var query = {"table":"vendors__cstore"};
        query.columns = ["firstname"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.productdata.vendors = vendorData.response.data;
            $scope.productdata.selectedVendor = $scope.productdata.vendors[0];
        }, function (jqxhr, error) {
        })
    }

    $scope.getProductCategories = function () {
        var productCategories={};
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.productdata.productCategories = productCategoryData.response.data;
            $scope.productdata.selectedProductCategory =$scope.productdata.productCategories[0];
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

    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {

            $scope.getPopularProducts(8);

            $scope.homeView = {"storeManager":true, "admin":false};
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.homeView = {"storeManager":false, "admin":true};
            var pathToBeSet = $appService.getCookie("adminView");
            if (pathToBeSet) {
                $appService.setAdminView(pathToBeSet);
            }
            else {
                $appService.setAdminView(VENDOR);
            }

        }
    }
    else {
        window.location.href = "#!/login";
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

cstore.controller('vendorCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingVenderData = false;
    $scope.vendors = [];
    $appService.auth();
    $scope.getAllVendors = function (direction, limit) {
        if ($scope.loadingVenderData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingVenderData = true;
        var query = {"table":"vendors__cstore"};
        query.columns = ["address", {"expression":"city", "columns":["_id", "name"]}, {"expression":"state", "columns":["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode"];
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.loadingVenderData = false;
            $scope.show.currentCursor = vendorData.response.cursor;
            $scope.vendors = vendorData.response.data;
            for (var i = 0; i < $scope.vendors.length; i++) {
                $scope.vendors[i]["deleteStatus"] = false;
            }

        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getAllVendors(1, 5);
    $scope.getMore = function () {
        $scope.getAllVendors(1, 5);
    }
    $scope.getLess = function () {
        $scope.getAllVendors(0, 5);
    }
    $scope.getStates();
});
cstore.controller('addNewVendorCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var vendorId = $routeParams.q;
    if (vendorId && vendorId != undefined && vendorId != "undefined") {
        $scope.data["userid"] = vendorId
    }
    else {
        delete $scope.data["userid"];

    }

});

cstore.controller('productList', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingProductData = false;
    $scope.products = [];
    $appService.auth();
    $scope.getAllProducts = function (direction, limit) {
        if ($scope.loadingProductData) {
            return false;
        }
        if(direction == 1){
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingProductData = true;
        var query = {"table":"products__cstore"};
        query.columns = ["description","name","image","short_description",{"expression":"product_category", "columns":["_id", "name"]},"cost","soldcount",{"expression":"vendor", "columns":["_id", "firstname"]}];
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingProductData = false;
            $scope.show.currentCursor = productData.response.cursor;
            $scope.products = productData.response.data;
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getAllProducts(1, 10);
    $scope.getMore = function () {
        $scope.getAllProducts(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllProducts(0, 10);
    }
    $scope.getVendors();
});

cstore.controller('addProductCtrl', function ($scope, $appService,$routeParams) {
    $appService.auth();
    $scope.clearProductContent = function () {
        $scope.productdata["name"] = "";
        $scope.productdata["cost"] = "";
        $scope.productdata["description"] = "";
        $scope.productdata["short_description"] = "";
        $scope.productdata["soldcount"] = "";
        $scope.productdata["image"]="";
        $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
        $scope.productdata.selectedVendor = $scope.productdata.vendors[0];

    }
    var productId = $routeParams.q;
    if (productId && productId != undefined && productId != "undefined") {
        $scope.productdata["productid"] = productId;
    }
    else {
        delete $scope.productdata["productid"];

    }
});

cstore.controller('storeManagerList', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingStoreData = false;
    $scope.storeManagers = [];
    $appService.auth();
    $scope.getAllStoreManagers = function (direction, limit) {
        if ($scope.loadingStoreData) {
            return false;
        }
        if(direction == 1){
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingVenderData = true;
        var query = {"table":"storemanagers__cstore"};
        query.columns = ["storename","contact","email","brands","pos_type","shift","loyalty_status","pos_version","reward_point"];
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeManagerData) {
            $scope.loadingStoreData = false;
            $scope.show.currentCursor = storeManagerData.response.cursor;
            $scope.storeManagers = storeManagerData.response.data;
        }, function (jqxhr, error) {
            alert("error while making request");
        });
    }
    $scope.getAllStoreManagers(1, 10);
    $scope.getMore = function () {
        $scope.getAllStoreManagers(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllStoreManagers(0, 10);
    }
});



