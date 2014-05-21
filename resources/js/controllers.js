var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";
var VENDOR = "vendors";
var DEFAULTCOUNTRY = "531d3e9b8826fc304706a460"; //united states

// Declare app level module which depends on filters, and services
//changed by anuradha 2804
var cstore = angular.module('cstore', ['ngRoute', '$appstrap.services']);
cstore.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/', {
                templateUrl: '../home',
                controller: 'homeCtrl'
            }).when('/login', {
                templateUrl: '../login',
                controller: 'loginCtrl'
            }).when('/all-pops', {
                templateUrl: '../all-pops',
                controller: 'allCategory'
            }).when('/pop', {
                templateUrl: '../popdetail',
                controller: 'productDetailCtrl'
            }).when('/pop-category', {
                templateUrl: '../pop-category',
                controller: 'productCategoryDetailCtrl'
            }).when('/vendors', {
                templateUrl: '../vendors',
                controller: 'vendorCtrl'
            }).when('/add-new-vendor', {
                templateUrl: '../add-new-vendor',
                controller: 'addNewVendorCtrl'
            }).when('/edit-vendor', {
                templateUrl: '../add-new-vendor',
                controller: 'addNewVendorCtrl'
            }).when('/site-info', {
                templateUrl: '../site-info',
                controller: 'storeManagerList'
            }).when('/pops', {
                templateUrl: '../pops',
                controller: 'productList'
            }).when('/add-pop', {
                templateUrl: '../add-pop',
                controller: 'addProductCtrl'
            }).when('/edit-pop', {
                templateUrl: '../add-pop',
                controller: 'addProductCtrl'
            }).when('/add-site-info', {
                templateUrl: '../add-site-info',
                controller: 'addStoreManagerCtrl'
            }).when('/edit-site-info', {
                templateUrl: '../add-site-info',
                controller: 'addStoreManagerCtrl'
            }).when('/countries', {
                templateUrl: '../countries',
                controller: 'countryCtrl'
            }).when('/pop-categories', {
                templateUrl: '../pop-categories',
                controller: 'productCategoryCtrl'
            }).when('/training-categories', {
                templateUrl: '../training-categories',
                controller: 'trainingCategoryCtrl'
            }).when('/states', {
                templateUrl: '../states',
                controller: 'stateCtrl'
            }).when('/cities', {
                templateUrl: '../cities',
                controller: 'cityCtrl'
            }).when('/profile', {
                templateUrl: '../profile',
                controller: 'profileCtrl'
            }).when('/profile', {
                templateUrl: '../profile',
                controller: 'profileCtrl'
            }).when('/resetpassword', {
                templateUrl: '../resetpassword',
                controller: 'resetpasswordCtrl'
            }).when('/manage-users', {
                templateUrl: '../manage-users',
                controller: 'userCtrl'
            }).when('/add-new-user', {
                templateUrl: '../add-new-user',
                controller: 'addUserCtrl'
            }).when('/promotions', {
                templateUrl: '../promotions',
                controller: 'promotionCtrl'
            }).when('/add-promotion', {
                templateUrl: '../add-promotion',
                controller: 'addPromotionCtrl'
            }).when('/edit-promotion', {
                templateUrl: '../add-promotion',
                controller: 'addPromotionCtrl'
            })
            .when('/training-sessions', {
                templateUrl: '../training-sessions',
                controller: 'trainingSessionCtrl'
            }).when('/add-training-session', {
                templateUrl: '../add-training-session',
                controller: 'addTrainingSessionCtrl'
            }).when('/edit-training-session', {
                templateUrl: '../add-training-session',
                controller: 'addTrainingSessionCtrl'
            }).when('/assign-store', {
                templateUrl: '../assign-store',
                controller: 'assignTrainingCtrl'
            }).when('/surveys', {
                templateUrl: '../surveys',
                controller: 'surveyCtrl'
            }).when('/all-promos', {
                templateUrl: '../all-promos',
                controller: 'allPromotionsCtrl'
            }).when('/promo', {
                templateUrl: '../promodetail',
                controller: 'promoDetailCtrl'
            }).when('/assigned-survey-store', {
                templateUrl: '../assigned-survey-store',
                controller: 'assignedSurveyCtrl'
            }).when('/add-survey', {
                templateUrl: '../add-survey',
                controller: 'addSurveyCtrl'
            }).when('/edit-survey', {
                templateUrl: '../add-survey',
                controller: 'addSurveyCtrl'
            }).when('/assign-survey-store', {
                templateUrl: '/assign-survey-store',
                controller: 'assignSurveyCtrl'
            }).when('/answered-survey-store', {
                templateUrl: '/answered-survey-store',
                controller: 'answeredStoreCtrl'
            }).when('/assigned-survey-response', {
                templateUrl: '/assigned-survey-response',
                controller: ''
            }).when('/assigned-session-store', {
                templateUrl: '/assigned-session-store',
                controller: 'assignedSessionCtrl'
            }).when('/training-session', {
                templateUrl: '../sessiondetail',
                controller: 'sessionDetailCtrl'
            }).when('/all-training-sessions', {
                templateUrl: '../all-training-sessions',
                controller: 'allTrainingSessionsCtrl'
            }).when('/session-category', {
                templateUrl: '../session-category',
                controller: 'trainingCategoryDetailCtrl'
            }).when('/product-codes', {
                templateUrl: '../product-codes',
                controller: 'productCodesCtrl'
            }).when('/shopping-cart', {
                templateUrl: '../shopping-cart',
                controller: 'shoppingCartCtrl'
            }).when('/billing-address', {
                templateUrl: '../billing-address',
                controller: 'billingAddressCtrl'
            }).when('/order-review', {
                templateUrl: '../order-review',
                controller: 'orderReviewCtrl'
            }).when('/all-surveys', {
                templateUrl: '../all-surveys',
                controller: 'allAssignedSurveysCtrl'
            }).when('/survey', {
                templateUrl: '../surveydetail',
                controller: 'surveyDetailCtrl'
            }).when('/payment', {
                templateUrl: '../payment',
                controller: 'paymentCtrl'
            }).when('/programs', {
                templateUrl: '../programs',
                controller: 'programList'
            }).when('/add-program', {
                templateUrl: '../add-program',
                controller: 'addProgramCtrl'
            }).when('/edit-program', {
                templateUrl: '../add-program',
                controller: 'addProgramCtrl'
            }).when('/orders', {
                templateUrl: '../orders',
                controller: 'orderListCtrl'
            }).when('/order-detail', {
                templateUrl: '../order-detail',
                controller: 'orderDetailCtrl'
            })
            .otherwise(
//            {"redirectTo":"/login.html"}
            );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location, $http) {
    $scope.currentUser = {"data": ""};
    $scope.search = {"searchContent": ""};
    $scope.cartProducts = {"length": ""};
    //$scope.selectedLoc = $scope.asyncSelected ? $scope.asyncSelected : "United States";
    $scope.currentLoc = {"data": ""};
    $scope.currentLoc["data"] = $appService.getLocation();
    $scope.file = {};
    $scope.oFile = {};
    $scope.oFile.fileExist = false;
    $scope.readonlyrow = {};
    $scope.row = {};
    $scope.colmetadata = {"expression": "postfile", "type": "file"};
    var FILE_KEY = 'key';
    //changes made by anuradha
    $scope.loadingstatus = false;
    $scope.docfile = {};
    $scope.docOFile = {};
    $scope.readonlydocrow = {};
    $scope.docrow = {};
    $scope.colmetadocdata = {"expression": "postfile", "type": "file"};
    /*********************/
    $scope.data = {"countries": [], "cities": [], "states": [], "selectedCity": "", "selectedState": "", "selectedVendorCategory": "", "selectedCountry": "", "vendorCategories": []};
    $scope.data.vendorCategories = [
        {"name": "Beverage"},
        {"name": "Candy"},
        {"name": "Energy"},
        {"name": "Food Service"},
        {"name": "Fuel"},
        {"name": "Propane"},
        {"name": "Salty Snacks"},
        {"name": "Others"}
    ];
    $scope.data.selectedVendorCategory = $scope.data.vendorCategories[0];
    //$scope.storedata = {"cities":[], "states":[],"countries":[] , "selectedCity":"", "selectedState":"","selectedCountry":"","manager":{"selectedCity":"","selectedState":"","selectedCountry":"","cities":[], "states":[],"countries":[]}};
    //changes made 0205
    $scope.storedata = {"cities": [], "states": [], "countries": [], "selectedCity": "", "selectedState": "", "selectedCountry": "", "posTypes": [], "selectedPosType": "", "rewardTypes": [], "selectedRewardType": "", "shifts": [], "selectedShift": "", "manager": {}, "brands": [], "selectedBrand": "", "brandName": "", "otherPosType": "", "otherRewardType": "", "otherBrand": "", "loyalty_status": [], "selectedLoyaltyStatus": ""};
    $scope.storedata.posTypes = [
        {"name": "FisCal"},
        {"name": "Gilbarco Passport"},
        {"name": "Pinnacle Palm"},
        {"name": "Radiant"},
        {"name": "Retalix"},
        {"name": "VeriFone Ruby Only"},
        {"name": "VeriFone Ruby Sapphire"},
        {"name": "VeriFone Sapphire w/Topaz"},
        {"name": "Wayne Nucleus"},
        {"name": "Others"}
    ];
    $scope.storedata.selectedPosType = $scope.storedata.posTypes[0];
    $scope.storedata.rewardTypes = [
        {"name": "Cents Per Gallon"},
        {"name": "Clubs Only"},
        {"name": "Mobile Only"},
        {"name": "Points/Clubs"},
        {"name": "Others"}
    ];
    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
    //changes made 02/05
    $scope.storedata.brands = [
        {"name": "BP"},
        {"name": "CITGO"},
        {"name": "Chevron"},
        {"name": "Conoco"},
        {"name": "Exxon"},
        {"name": "Marathon"},
        {"name": "Mobil"},
        {"name": "Phillips 66"},
        {"name": "Shell"},
        {"name": "Valero"},
        {"name": "Others"}
    ];
    $scope.storedata.selectedBrand = $scope.storedata.brands[0];
    $scope.storedata.shifts = [
        {"name": "Day"},
        {"name": "Night"}
    ];
    //$scope.storedata.selectedShift = $scope.storedata.shifts[0];
    $scope.storedata.loyalty_status = [
        {"name": "Active"},
        {"name": "Inactive"},
        {"name": "Implementation"},
        {"name": "Off program"}
    ];
    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
    //changes Made 14/05
    $scope.productdata = {"productCategories": [], "vendors": [], "selectedProductCategory": "", "selectedVendor": "", "programs": [], "selectedProgram": ""};
    $scope.userdata = {"roles": [], "selectedRole": "", "stores": [], "selectedStore": ""};
    $scope.promotiondata = {"offerTypes": [], "selectedOfferType": "", "itemSignage": [], "selectedItemSignage": "", "upc": [], "selectedUpc": "", "hours": [], "minutes": [], "selectedStartHour": "", "selectedStartMinute": "", "selectedEndHour": "", "selectedEndMinute": ""};
    $scope.promotiondata.offerTypes = [
        {"name": "NPROD"}
    ];
    $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
    $scope.promotiondata.itemSignage = [
        {"name": "Aisle"},
        {"name": "Cooler"}
    ];
    $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
    // change made
    $scope.promotiondata.upc = [
        {"name": "GROUP"},
        {"name": "PLU"},
        {"name": "UPC"}
    ];
    $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[0];
    for (var i = 0; i < 24; i++) {
        var hr = i >= 10 ? i + "" : "0" + i;
        $scope.promotiondata.hours.push(hr);
    }
    $scope.promotiondata.selectedStartHour = $scope.promotiondata.hours[0];
    $scope.promotiondata.selectedEndHour = $scope.promotiondata.hours[0];
    for (var j = 0; j < 60; j++) {
        var min = j >= 10 ? j + "" : "0" + j;
        $scope.promotiondata.minutes.push(min);
    }
    $scope.promotiondata.selectedStartMinute = $scope.promotiondata.minutes[0];
    $scope.promotiondata.selectedEndMinute = $scope.promotiondata.minutes[0];
    $scope.trainingdata = {"trainingCategories": [], "selectedTrainingCategory": "", "stores": [], "assignedStore": "", "uploadedimages": []};
    $scope.surveydata = {};
    $scope.codedata = {"codeTypes": [], "selectedCodeType": ""};
    $scope.codedata.codeTypes = [
        {"name": "UPC"},
        {"name": "PLU"},
        {"name": "GROUP"}
    ];
    $scope.codedata.selectedCodeType = $scope.codedata.codeTypes[0];
    $scope.listType = [
        {"name": "Multiple Selected", "value": "checkbox"},
        {"name": "Single Selected", "value": "radio"},
        {"name": "Subjective Type", "value": "subjective"}
    ]
    $scope.questions = [
        {"optionArr": [], "type": $scope.listType[0], "addOption": true}
    ];
    $scope.cartData = {"quantity": []};
    $scope.billingdata = {"bill_address": {}, "shipping_address": {}, "setData": ""};
    //$scope.billingdata.setData=
    /***end***/
    $scope.currentUser["data"] = $appService.getSession();
    $scope.displayData = {};
    $scope.shoppingCartData = {"quantity": []};
    $scope.answeredSurveys = [];
    for (var i = 1; i <= 10; i++) {
        $scope.shoppingCartData.quantity.push(i);
    }
    $scope.programdata = {};
    /*bharat change for location*/
    $scope.location = '';

    $scope.getURLParam = function (strParamName) {
        var strReturn = "";
        var strHref = window.location.href;
        if (strHref.indexOf("?") > -1) {
            var strQueryString = strHref.substr(strHref.indexOf("?"));
            var aQueryString = strQueryString.split("&");
            for (var iParam = 0; iParam < aQueryString.length; iParam++) {
                if (
                    aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    break;
                }
            }
        }
        return unescape(strReturn);
    }
    $scope.doSearch = function () {
        if ($scope.location === '') {
            alert('Directive did not update the location property in parent controller.');
        } else {
            $appService.delete_cookie("selectedLoc");
            var c_name = "selectedLoc";
            document.cookie = c_name + "=" + escape($scope.location);
            $scope.currentLoc["data"] = $appService.getLocation();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    };
    /*change end*/

    $scope.getAllVendorsList = function () {
        var query = {"table": "vendors__cstore"};
        query.columns = ["firstname"];
        query.orders = {"firstname": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.promotiondata.vendors = vendorData.response.data;
            $scope.promotiondata.vendorsList = $scope.promotiondata.vendors[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllVendorsList();
    if ($scope.currentUser["data"] && $scope.currentUser["data"]["roleid"] == STOREMANAGER) {
        $scope.displayData["options"] = true;
        $scope.displayData["cart"] = true;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin": false, "storeManager": true};
        if ($scope.currentUser["data"]["companyLogoUrl"]) {
            $scope.displayData["companyLogo"] = true;
        }
        else {
            $scope.displayData["companyLogo"] = false;
        }

    }
    else if ($scope.currentUser["data"] && $scope.currentUser["data"]["roleid"] == ADMIN) {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = true;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin": true, "storeManager": false};
    }

    else {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = false;
        $scope.displayData["role"] = {"admin": false, "storeManager": false};
        $scope.displayData["companyLogo"] = false;

    }

    var hash = window.location.hash;
    if (($scope.currentUser["data"] == null || $scope.currentUser["data"] == "null") && hash.indexOf("resetpassword") == -1) {
        window.location.href = "#!/login";
        return false;
    } else if (hash.indexOf("resetpassword") >= 0) {
        delete $scope.displayData;
    }
    /***********************Show Tags*********************************/
    $scope.showTags = function (tags) {
        var arr = []
        for (var i in tags)
            arr.push(tags[i].value);
        return arr;
    }
    /********************** Location**************************/
    /*$scope.getLocation = function(val) {
     return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
     params: {
     address: val,
     sensor: true
     }
     }).then(function(res){
     var addresses = [];
     angular.forEach(res.data.results, function(item){
     addresses.push(item.formatted_address);
     });
     return addresses;
     });
     };

     $scope.selectedLocation=function(){
     $appService.delete_cookie("selectedLoc");
     //$scope.selectedLoc=$scope.asyncSelected;
     $scope.currentLoc.data.selectedLoc=$scope.asyncSelected;
     var c_name = "selectedLoc";
     if($scope.currentLoc.data.selectedLoc && $scope.currentLoc.data.selectedLoc!=null && $scope.currentLoc.data.selectedLoc!="null"){
     document.cookie = c_name + "=" + escape($scope.currentLoc.data.selectedLoc);
     }
     else {
     var defaultLocation ="United States";
     document.cookie = c_name + "=" + escape(defaultLocation);
     }
     //$(".location_popup").hide();
     } */
    /******************   Revised Country States Cities****************************/

    $scope.getEditCountries = function (countryid, stateid, cityid, setCountryData) {

        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        setCountryData.selectedCountry = {"_id": countryid};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            setCountryData.countries = countryData.response.data;
            if (setCountryData.selectedCountry._id) {
                for (var i = 0; i < setCountryData.countries.length; i++) {
                    if (setCountryData.countries[i]._id == setCountryData.selectedCountry._id) {
                        setCountryData.selectedCountry = setCountryData.countries[i];
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < setCountryData.countries.length; i++) {
                    if (setCountryData.countries[i]._id == "531d3e9b8826fc304706a460") {
                        setCountryData.selectedCountry = setCountryData.countries[i];
                        break;
                    }
                }
            }
            $scope.getEditStates(setCountryData, stateid, cityid);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getEditStates = function (countryid, stateid, cityid) {
        if (countryid.selectedCountry) {

            var query = {"table": "states__cstore"};

            query.columns = ["name"];
            query.orders = {"name": "asc"};
            countryid.selectedState = {"_id": stateid};
            query.filter = {"countryid._id": countryid.selectedCountry._id};
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
                countryid.states = stateData.response.data;
                if (countryid.selectedState._id) {
                    for (var i = 0; i < countryid.states.length; i++) {
                        if (countryid.states[i]._id == countryid.selectedState._id) {
                            countryid.selectedState = countryid.states[i];
                            break;
                        }
                    }
                }
                else {
                    countryid.selectedState = countryid.states[0];
                }
                // $scope.storedata.states = countryid.states;
                //  $scope.storedata.selectedState = countryid.selectedState;
                $scope.getEditCities(countryid, cityid);
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            })
        }
    }
    $scope.getEditCities = function (stateid, cityid) {
        if (stateid.selectedState) {
            var query = {"table": "cities__cstore"};
            query.columns = ["name"];
            query.orders = {"name": "asc"};
            $scope.defaultCity = cityid;
            query.filter = {"stateid._id": stateid.selectedState._id};
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
                stateid.cities = cityData.response.data;
                if ($scope.defaultCity) {
                    for (var i = 0; i < stateid.cities.length; i++) {
                        if (stateid.cities[i]._id == $scope.defaultCity) {
                            stateid.selectedCity = stateid.cities[i];
                            break;
                        }
                    }
                } else {
                    stateid.selectedCity = stateid.cities[0];
                }

                //$scope.storedata.cities = stateid.cities;
                //$scope.storedata.selectedCity = stateid.selectedCity;
            }, function (jqxhr, error) {
            })
        } else {
            stateid.cities = [];
        }
    }

    /*************************************************/
    $scope.getCountries = function () {
        var countries = {};
        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            if ($scope.storedata.countries && $scope.storedata.countries.length > 0) {
                $scope.storedata.countries = countryData.response.data;
                $scope.storedata.selectedCountry = $scope.storedata.countries[0];
                $scope.storedata.manager.selectedCountry = $scope.storedata.countries[0];
                $scope.getStatesNew($scope.storedata, false);
            }
            else {
                $scope.data.countries = countryData.response.data;
                for (var i = 0; i < $scope.data.countries.length; i++) {
                    if ($scope.data.countries[i]._id == "531d3e9b8826fc304706a460") {
                        $scope.data.selectedCountry = $scope.data.countries[i];
                        break;
                    }
                }
                $scope.getStatesNew($scope.data, false);
            }

        }, function (jqxhr, error) {
        })
    }
    /*********************************************************/
    $scope.getCountriesNew = function (countryid) {
        //if(countryid.selectedCountry){

        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        $scope.data.selectedCountry = {"_id": countryid};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            $scope.data.countries = countryData.response.data;

            if ($scope.data.selectedCountry._id) {
                for (var i = 0; i < $scope.data.countries.length; i++) {
                    if ($scope.data.countries[i]._id == $scope.data.selectedCountry._id) {
                        $scope.data.selectedCountry = $scope.data.countries[i];
                        break;
                    }
                }
            } else {

                for (var i = 0; i < $scope.data.countries.length; i++) {
                    if ($scope.data.countries[i]._id == "531d3e9b8826fc304706a460") {
                        $scope.data.selectedCountry = $scope.data.countries[i];
                        break;
                    }
                }

            }
            if ($scope.data.countries.length && !countryid) {
                $scope.getStatesNew($scope.data, false);
            }
            else {
                states = [];
            }
            $scope.storedata = $scope.data;

        }, function (jqxhr, error) {
        })
        //}else{
        //  countryid.states = [];
        //}
    }

    $scope.getStatesNew = function (countryid, stateid) {
        if (countryid.selectedCountry) {
            var query = {"table": "states__cstore"};
            query.columns = ["name"];
            query.orders = {"name": "asc"};
            countryid.selectedState = {"_id": stateid};
            query.filter = {"countryid._id": countryid.selectedCountry._id};
            //else {
            //  query.filter ={"countryid._id":DEFAULTCOUNTRY};
            // }
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
                countryid.states = stateData.response.data;

                if (countryid.selectedState._id) {
                    for (var i = 0; i < countryid.states.length; i++) {
                        if (countryid.states[i]._id == countryid.selectedState._id) {
                            countryid.selectedState = countryid.states[i];
                            break;
                        }
                    }
                } else {
                    countryid.selectedState = countryid.states[0];

                }
                if (countryid.states.length && !stateid) {
                    $scope.getCitiesNew(countryid, false);
                }
                else {
                    countryid.cities = [];
                }

            }, function (jqxhr, error) {
            })
        } else {
            countryid.states = [];
        }
    }
    $scope.getCitiesNew = function (stateid, cityid) {
        if (stateid.selectedState) {
            var query = {"table": "cities__cstore"};
            query.columns = ["name"];
            query.orders = {"name": "asc"};
            $scope.defaultCity = cityid;
            query.filter = {"stateid._id": stateid.selectedState._id};
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
                stateid.cities = cityData.response.data;
                if ($scope.defaultCity) {
                    for (var i = 0; i < stateid.cities.length; i++) {
                        if (stateid.cities[i]._id == $scope.defaultCity) {
                            stateid.selectedCity = stateid.cities[i];

                            break;
                        }
                    }
                } else {

                    stateid.selectedCity = stateid.cities[0];
                }
            }, function (jqxhr, error) {
            })
        } else {
            stateid.cities = [];
        }
    }
    /****************************************************************/

    $scope.getCities = function (stateid, cityid) {
        var query = {"table": "cities__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        $scope.defaultCity = cityid;
        if (stateid && stateid != null && stateid != "null") {
            query.filter = {"stateid._id": stateid};
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
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
        var query = {"table": "states__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
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
        $scope.data["address2"] = "";
        $scope.data["email"] = "";
        $scope.data["otherCategory"] = "";
        $scope.data["selectedVendorCategory"] = $scope.data.vendorCategories[0];
        for (var i = 0; i < $scope.data.countries.length; i++) {
            if ($scope.data.countries[i]._id == "531d3e9b8826fc304706a460") {
                $scope.data.selectedCountry = $scope.data.countries[i];
                break;
            }
        }
        $scope.getStatesNew($scope.data, false);
        $scope.getCitiesNew($scope.data, false);
    }
    $scope.logOut = function () {
        $appService.deleteAllCookie();
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = false;
        $scope.displayData["role"] = {"admin": false, "storeManager": false};
        $scope.displayData["loggedIn"] = false;

        window.location.href = "#!/login";
    }

    $scope.getVendors = function () {
        var vendors = {};
        var query = {"table": "vendors__cstore"};
        query.columns = ["firstname"];
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.productdata.vendors = vendorData.response.data;
            $scope.productdata.selectedVendor = $scope.productdata.vendors[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }

    $scope.getProductCategories = function () {
        var productCategories = {};
        var query = {"table": "product_categories__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.productdata.productCategories = productCategoryData.response.data;
            $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProductCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
    $scope.showFile = function (file, updateScope) {
        if (updateScope) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(file[0].name)) {
                $scope.readonlyrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
                $scope.readonlyrow.fileType = "imagefile";
                $scope.readonlyrow.filenotexist = false;
                $scope.readonlyrow.imgWidth = 75;
                $scope.readonlyrow.imgHeight = 75;
            }
            else {
                $scope.readonlyrow.filenotexist = true;
                $scope.popuptext = "Please Upload Image File only";
                $('#pop_forgt').toggle("slide");
            }
            $scope.row[$scope.colmetadata.expression] = file;
        }
        else if (file && file.length > 0) {
            $scope.readonlyrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
            $scope.readonlyrow.fileType = "imagefile";
            $scope.readonlyrow.filenotexist = false;
            $scope.readonlyrow.imgWidth = 75;
            $scope.readonlyrow.imgHeight = 75;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.showDownloadableFile = function (file, updateScope) {
        if (file) {
            $scope.readonlyrow.fileurl = BAAS_SERVER + "/file/download?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
            $scope.readonlyrow.fileType = 'download';
            $scope.readonlyrow.filename = file[0].name;
            $scope.readonlyrow.filenotexist = false;
        }
        if (updateScope) {
            $scope.row[$scope.colmetadata.expression] = file;
        }
    }
    $scope.showImgFile = function (file) {
        var index = $scope.uploadedimages.length;
        $scope.uploadedimages[index] = {};
        $scope.uploadedimages[index].fileurl = BAAS_SERVER + "/file/download?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
        $scope.uploadedimages[index].filename = file[0][FILE_NAME];
        $scope.uploadedimages[index].image = file;
        $scope.uploadedimages[index].default = true;
        $scope.albumArr.uploadedimg[index] = file[0];
        $scope.imgFilenotexist = false;
        $scope.uploadingimage = false;
        //  $scope.row[$scope.colmetadata.expression] = file;
        if (index == 10)
            $scope.imgFileLimitExceed = true;
    };

    $scope.getRoles = function () {
        //change
        var query = {"table": "roles__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (roleData) {
            $scope.userdata.roles = roleData.response.data;
            $scope.userdata.selectedRole = $scope.userdata.roles[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getStores = function () {
        //change
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["storename"];
        query.orders = {"storename": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.userdata.stores = storeData.response.data;
            $scope.trainingdata.stores = storeData.response.data;
            $scope.userdata.selectedStore = $scope.userdata.stores[0];
            $scope.trainingdata.assignedStore = $scope.trainingdata.stores[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getTrainingCategories = function () {
        var query = {"table": "training_categories__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryData) {
            $scope.trainingdata.trainingCategories = trainingCategoryData.response.data;
            $scope.trainingdata.selectedTrainingCategory = $scope.trainingdata.trainingCategories[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getTrainingCategories();
    $scope.showDocFile = function (file, updateScope) {
        if (updateScope) {
            if ((/\.(doc|docx|pdf|ppt|pptx)$/i).test(file[0].name)) {
                $scope.readonlydocrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
                $scope.readonlydocrow.fileType = "documentfile";
                $scope.readonlydocrow.filenotexist = false;
                $scope.readonlydocrow.filename = file[0].name;
            }
            else {
                $scope.readonlydocrow.filenotexist = true;
                $scope.popuptext = "Please Upload document File only";
                $('#pop_forgt').toggle("slide");
            }
            $scope.docrow[$scope.colmetadocdata.expression] = file;
        }
        else if (file && file.length > 0) {
            $scope.readonlydocrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
            $scope.readonlydocrow.fileType = "documentfile";
            $scope.readonlydocrow.filenotexist = false;
            $scope.readonlydocrow.filename = file[0].name;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    //clear content
    $scope.clearStoreContent = function () {
        $scope.storedata.manager = {};
        $scope.storedata["address"] = "";
        $scope.storedata["contact"] = "";
        //$scope.storedata["loyalty_status"] = "";
        $scope.storedata["pump_model"] = "";
        $scope.storedata["pump_brand"] = ""
        $scope.storedata["email"] = "";
        $scope.storedata["pos_version"] = "";
        $scope.storedata["postalcode"] = "";
        $scope.storedata["storename"] = "";
        $scope.storedata["address2"] = "";
        $scope.storedata["manager"]["contact"] = "";
        $scope.storedata["manager"]["email"] = "";
        $scope.storedata["manager"]["name"] = "";
        //changes Made
        $scope.readonlyrow.fileurl = "";
        //$scope.storedata["company_logo"] = "";
        //$scope.readonlyrow.fileurl = "";
        $scope.storedata.selectedCountry = "";
        $scope.storedata.selectedCity = "";
        $scope.storedata.selectedState = "";
        $scope.storedata.selectedPosType = $scope.storedata.posTypes[0];
        //$scope.storedata.selectedShift = $scope.storedata.shifts[0];
        $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
        //changes made 02/05
        $scope.storedata.selectedBrand = $scope.storedata.brands[0];
        $scope.storedata.otherBrand = "";
        $scope.storedata.otherPosType = "";
        $scope.storedata.otherRewardType = "";
        $scope.storedata.siteid = "";
        $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
        $scope.storedata.selectedShift = "";
        //$scope.oFile.fileExist = false;
        $scope.productdata.selectedProgram = $scope.productdata.programs[0];
    }
    $scope.clearProductContent = function () {
        $scope.productdata["name"] = "";
        $scope.productdata["cost"] = "";
        $scope.productdata["description"] = "";
        $scope.productdata["short_description"] = "";
        $scope.productdata["quantity"] = "";
        $scope.productdata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
        $scope.productdata.selectedProgram = $scope.productdata.programs[0];
        //$scope.productdata.selectedVendor = $scope.productdata.vendors[0];
        $scope.oFile.fileExist = false;

    }
    $scope.clearUserContent = function () {
        $scope.userdata["username"] = "";
        $scope.userdata["firstname"] = "";
        $scope.userdata["lastname"] = "";
        $scope.userdata["password"] = "";
        $scope.userdata.selectedRole = $scope.userdata.roles[0];
        $scope.userdata.selectedStore = $scope.userdata.roles[0];
    }
    $scope.clearPromotionContent = function () {
        $scope.promotiondata["promo_title"] = "";
        $scope.promotiondata["end_date"] = "";
        //$scope.promotiondata["end_time"]="";
        //$scope.promotiondata["start_time"]="";
        $scope.promotiondata.selectedStartHour = $scope.promotiondata.hours[0];
        $scope.promotiondata.selectedEndHour = $scope.promotiondata.hours[0];
        $scope.promotiondata.selectedStartMinute = $scope.promotiondata.minutes[0];
        $scope.promotiondata.selectedEndMinute = $scope.promotiondata.minutes[0];
        $scope.promotiondata["start_date"] = "";
        $scope.promotiondata["offer_description"] = "";
        $scope.promotiondata["offer_title"] = "";
        $scope.promotiondata["promo_description"] = "";
        $scope.promotiondata["reward_value"] = "";
        $scope.promotiondata["sponsor"] = "";
        $scope.promotiondata["threshold"] = "";
        $scope.promotiondata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
        $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
        $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[0];
        $scope.promotiondata.codes = [];
        //changes made by anuradha 0105 evening
        $scope.promotiondata["top_promo"] = false;
        // $scope.promotiondata.vendorsList = $scope.vendors[0];
        $scope.oFile.fileExist = false;
    }
    $scope.clearTrainingSessionContent = function () {
        $scope.trainingdata["title"] = "";
        $scope.trainingdata["description"] = "";
        $scope.trainingdata["video_url"] = "";
        $scope.trainingdata["file"] = "";
        $scope.trainingdata["uploadedimages"] = [];
        $scope.trainingdata["editImages"] = [];
        $scope.trainingdata.selectedTrainingCategory = $scope.trainingdata.trainingCategories[0];
    }
    $scope.clearSurveyContent = function () {
        $scope.surveydata["title"] = "";
        $scope.surveydata["description"] = "";
        $scope.questions = [
            {"optionArr": [], "question": "", "type": $scope.listType[0], "addOption": true}
        ];
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.setPath('surveys');
    }
    $scope.clearProgramContent = function () {
        $scope.programdata["name"] = "";
        $scope.productdata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.oFile.fileExist = false;
    }
    //changes 0605
    $scope.getShoppingCartLength = function () {
        if ($scope.currentUser.data.roleid == STOREMANAGER) {
            var query = {"table": "shopping_cart__cstore"};
            query.columns = ["product", "product.name", "product.cost", "product.quantity", "userid"];
            query.filter = {};
            query.filter["userid._id"] = $scope.currentUser.data.userid;
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {
                //$scope.cartData = cartData.response.data;
                //$scope.cartProducts=cartData.response.data[0].product;
                if (cartData.response.data && cartData.response.data.length) {
                    $scope.cartProducts.length = cartData.response.data[0].product.length;
                }
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            })
        }
    }
    $scope.getShoppingCartLength();
    $scope.loadingPopularProductData = false;
    $scope.addToCart = function (product, quantity) {
        $scope.newShoppingCartProduct = {};
        $scope.products = [];
        var productObj = {"name": "", "cost": {}, "quantity": "", "popid": ""};
        $scope.newShoppingCartProduct["userid"] = {"username": $scope.currentUser.data.username};
        //$scope.newShoppingCartProduct["sub_total"]={"amount":product.cost.amount*1,"type": {"currency": "usd"}};
        productObj.name = product.name;
        if (quantity) {
            productObj.quantity = quantity;
        }
        else {
            productObj.quantity = 1;
        }
        productObj.cost = {"amount": product.cost.amount, "type": {"currency": "usd"}};
        productObj.popid = product._id;
        $scope.products.push(productObj);
        $scope.newShoppingCartProduct["product"] = $scope.products;
        //$scope.newShoppingCartProduct["$inc"] = {"sub_total": (product.cost.amount*productObj.quantity)};
        $scope.newShoppingCartProduct["__type__"] = "insertifnotexist";
        var query = {};
        query.table = "shopping_cart__cstore";
        query.operations = [$scope.newShoppingCartProduct];
        $appService.save(query, ASK, OSK, null, function (callBackData) {
            if (callBackData.code == 200 && callBackData.status == "ok") {
                //$("#popupMessage").html("Product is added to cart");
                //$('.popup').toggle("slide");
                window.location.href = "#!/shopping-cart";
                $scope.cartProducts.length++;
            } else {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            $("#popupMessage").html(err);
            $('.popup').toggle("slide");
        });
    }
    //shopping Cart Functions
    $scope.shoppingCartProducts = {"total": "", "grandTotal": ""};
    $scope.getShoppingCart = function () {
        $scope.loadingShoppingCartData = true;
        var query = {"table": "shopping_cart__cstore"};
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid", "bill_address", "shipping_address", "same_shipping_address"];
        query.filter = {};
        query.filter["userid._id"] = $scope.currentUser.data.userid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {
            $scope.loadingShoppingCartData = false;
            $scope.cartData = cartData.response.data[0];
            if (cartData.response.data && cartData.response.data.length) {
                $scope.shoppingCartProducts = cartData.response.data[0].product;
                $scope.savedBillingAddress = cartData.response.data[0].bill_address;
                $scope.savedShippingAddress = cartData.response.data[0].shipping_address;
                for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                    $scope.shoppingCartProducts[i].total = $scope.shoppingCartProducts[i].quantity * $scope.shoppingCartProducts[i].cost.amount;
                    $scope.grandTotal += $scope.shoppingCartProducts[i].total;
                }
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.removeFromCart = function (product) {
        if (product) {
            $scope.removeShoppingCartProduct = {};
            $scope.loadingStatus = true;
            $scope.products = [];
            $scope.removeShoppingCartProduct["userid"] = {"_id": $scope.currentUser.data.userid};
            $scope.products.push({"_id": product._id, "__type__": "delete"});
            $scope.removeShoppingCartProduct["product"] = $scope.products;
            $scope.removeShoppingCartProduct["__type__"] = "insertifnotexist";
            //$scope.removeShoppingCartProduct["$inc"] = {"sub_total": -(product.cost.amount)};
            var query = {};
            query.table = "shopping_cart__cstore";
            query.operations = [$scope.removeShoppingCartProduct];
            $appService.save(query, ASK, OSK, null, function (callBackData) {
                $scope.loadingStatus = false;
                if (callBackData.code == 200 && callBackData.status == "ok") {
                    for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                        if ($scope.shoppingCartProducts[i]._id == product._id) {
                            $scope.shoppingCartProducts.splice(i, 1);
                            i--;
                        }
                    }
                    $scope.cartProducts.length--;
                } else {
                    $("#popupMessage").html(callBackData.response);
                    $('.popup').toggle("slide");
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (err) {
                $("#popupMessage").html(err);
                $('.popup').toggle("slide");
            });
        }
    }
    $scope.getProgramList = function () {
        var query = {"table": "program__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.productdata.programs = programData.response.data;
            $scope.productdata.selectedProgram = $scope.productdata.programs[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

/*cstore.controller('TypeaheadCtrl',function($scope, $http) {
 // Any function returning a promise object can be used to load values asynchronously
 $scope.getLocation = function(val) {
 return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
 params: {
 address: val,
 sensor: true
 }
 }).then(function(res){
 var addresses = [];
 angular.forEach(res.data.results, function(item){
 addresses.push(item.formatted_address);
 });
 return addresses;
 });
 };
 }); */

cstore.controller('homeCtrl', function ($scope, $appService, $location, $routeParams) {
    $scope.homeView = {};
    $scope.myInterval = 5000;
    $scope.loadingPopularProductData = false;
    $scope.getPopularProducts = function (maxRow, searchText) {
        $scope.loadingPopularProductData = true;
        var query = {"table": "products__cstore"};

        query.columns = ["name", "image", "short_description", "cost", "soldcount"];
        query.filter = {};
        query.filter["programid._id"] = $scope.currentUser.data.programid;
        if (searchText && searchText != "") {
            query.filter["name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"soldcount": "desc"};
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 8;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingPopularProductData = false;
            $scope.popularProducts = $appService.setUrls(productData.response.data, 291, 196);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getRecentPromotions = function (maxRow, searchText) {
        $scope.loadingRecentPromotionData = true;
        var currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes());
        var query = {"table": "promotions__cstore"};
        query.columns = ["promo_title", "image", "start_date", "end_date"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.filter["start_date"] = {"$lte": currentTime};
        query.filter["end_date"] = {"$gte": currentTime};
        if (searchText && searchText != "") {
            query.filter["promo_title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"__createdon": "desc"};
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 8;
        }
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionData) {
            $scope.loadingRecentPromotionData = false;
            $scope.recentPromotions = $appService.setUrls(promotionData.response.data, 291, 196);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getCarouselPromotions = function (maxRow) {
        $scope.loadingCrouselPromotionData = true;
        var currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes());
        var query = {"table": "promotions__cstore"};
        query.columns = ["promo_title", "image"];
        query.filter = {};
        query.filter["start_date"] = {"$lte": currentTime};
        query.filter["end_date"] = {"$gte": currentTime};
        query.filter["top_promo"] = true;
        query.orders = {"__createdon": "desc"};
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 5;
        }
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (carouselPromotionData) {
            $scope.loadingCarouselPromotionData = false;
            $scope.carouselPromotions = $appService.setUrls(carouselPromotionData.response.data, 270, 237);
            //$scope.carouselPromotions = $appService.setUrls(carouselPromotionData.response.data);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }

    $scope.$on('test', function (ngRepeatFinishedEvent) {
        $('.bxslider').bxSlider({
            auto: true,
            autoHover: true,
            captions: true,
            pager: false
        });
    });
    //changes made by anuradha on 30-04
    $scope.getAssignedTrainingSessions = function (maxRow, searchText) {
        $scope.loadingAssignedTrainingSessionData = true;
        var query = {"table": "training_session__cstore"};

        query.columns = ["store_manager_id", "title", "description"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        if (searchText && searchText != "") {
            query.filter["training_session_id.title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 4;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (sessionData) {
            $scope.loadingAssignedTrainingSessionData = false;
            $scope.assignedTrainingSessions = sessionData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    //changes end
    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            $scope.getPopularProducts(8, $routeParams.search);
            $scope.getRecentPromotions(8, $routeParams.search);
            $scope.getAssignedTrainingSessions(4, $routeParams.search);
            $scope.getCarouselPromotions(4);
            $scope.homeView = {"storeManager": true, "admin": false};
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.homeView = {"storeManager": false, "admin": true};
//            var pathToBeSet = $appService.getCookie("adminView");
//            if (pathToBeSet) {
////                $appService.setAdminView(pathToBeSet);
//                window.location
//            }
//            else {
////                $appService.setAdminView(VENDOR);
//            }

            window.location.href = "#!/vendors";

        }
    }
    else {
        window.location.href = "#!/login";
    }


});

cstore.controller('allCategory', function ($scope, $appService, $routeParams) {

    $scope.getProductList = function (searchText) {
        $scope.loadingAllProductData = true;

        var query = {"table": "product_categories__cstore"};

        query.columns = ["name"];


        if (searchText && searchText != "") {
            query.childs = [
                {"alias": "categoryWiseData", "query": {"table": "products__cstore", "columns": ["name", "image", "short_description", "cost"], "max_rows": 4, "orders": {"__createdon": "desc"}, "filter": {"name": {"$regex": "(" + searchText + ")", "$options": "-i"}, "programid._id": $scope.currentUser.data.programid}}, "relatedcolumn": "product_category", "parentcolumn": "_id"}
            ]
        }
        else {
            query.childs = [
                {"alias": "categoryWiseData", "query": {"table": "products__cstore", "columns": ["name", "image", "short_description", "cost"], "max_rows": 4, "filter": {"programid._id": $scope.currentUser.data.programid}, "orders": {"__createdon": "desc"}}, "relatedcolumn": "product_category", "parentcolumn": "_id"}
            ];
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingAllProductData = false;
            var rawData = productData.response.data;
            for (var i = 0; i < rawData.length; i++) {
                if (rawData[i] && rawData[i]["categoryWiseData"] && rawData[i]["categoryWiseData"].length) {

                    rawData[i]["categoryWiseData"] = $appService.setUrls(rawData[i]["categoryWiseData"], 291, 196);
                }
            }
            $scope.products = rawData;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProductList($routeParams.search);
});

cstore.controller('productDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.getProductDetail = function () {
        $scope.loadingProductDetailData = true;

        var query = {"table": "products__cstore"};
        query.columns = ["cost", "description", "image", "name", "short_description", {"expression": "product_category", "columns": ["_id", "name"]}, "quantity", "soldcount"];
        query.filter = {"_id": $routeParams.popid};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            $scope.loadingProductDetailData = false;
            $scope.product = $appService.setUrls(productDetailData.response.data, 550, 350);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProductDetail();
});

cstore.controller('productCategoryDetailCtrl', function ($scope, $appService, $routeParams) {

    $scope.categoryData = {"loadingData": false, "available": false};

    $scope.products = [];
    $scope.getProductDetail = function (cursor, filter, searchText) {
        if ($scope.categoryData.loadingData) {
            return false;
        }
        $scope.categoryData.loadingData = true;
        var query = {"table": "products__cstore"};
        query.columns = ["cost", "image", "name", "short_description", {"expression": "product_category", "columns": ["_id", "name"]} ];
        if (filter && filter != undefined && filter != "undefined") {
            query.filter = {};
            query.filter["programid._id"] = $scope.currentUser.data.programid;
            query.filter["product_category._id"] = filter;
            if (searchText && searchText != "") {

                query.filter["name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};

            }
        }
        else {
            $("#popupMessage").html("Not Valid");
            $('.popup').toggle("slide");
            return false;
        }
        query.max_rows = 8;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            var rawData = $appService.setUrls(productDetailData.response.data, 291, 196);

            if ($scope.products.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.products.push(rawData[i]);
                }
            }
            if (!$scope.products.length) {
                $scope.products = rawData;

            }
            $scope.categoryData.loadingData = false;
            $scope.cursor = productDetailData.response.cursor;
            if ($scope.products.length) {
                /*wee need string for ng-switch*/
                $scope.categoryData.available = "true";
            }
            else {
                $scope.categoryData.available = "false";
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getProductDetail($scope.cursor, $routeParams.q, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getProductDetail(cursor, $routeParams.q, $routeParams.search);
    }
});

cstore.controller('loginCtrl', function ($scope, $appService, $location) {
    //changed on 0105
    $appService.unauth();
    $scope.login = function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (regEmail.test(username) == false) {
            $("#popupMessage").html("Please enter a valid email id");
            $('.popup').toggle("slide");
            return;
        }
        if (username == "" || username == undefined) {
            $("#popupMessage").html("Please enter vaild email");
            $('.popup').toggle("slide");
            return;
        }
        if (!password) {
            $("#popupMessage").html("Enter your password");
            $('.popup').toggle("slide");
            return;
        }
        var params = {};
        params.username = username;
        params.password = password;
        params.ask = ASK;
        params.osk = OSK;
        $appService.getDataFromJQuery("/rest/login", params, "GET", "JSON", function (callBackData) {
            if (callBackData.code && callBackData.code == 8) {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
                return;
            }
            else if (callBackData.code && callBackData.code == 3) {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
                return;
            }
            else if (callBackData.code && callBackData.code == 200) {
                var usk = callBackData.response ? callBackData.response.usk : null;
                if (usk) {

                    var query = {"table": "user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid", "storeid.programid", "storeid.programid.image", "storeid.stateid.name", "username"];
                    query.filter = {"userid": "{_CurrentUserId}"};
                    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};

                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        $appService.deleteAllCookie();
                        var roleid = callBackData.response.data[0].roleid._id;
                        var firstname = callBackData.response.data[0].userid.firstname;
                        var userid = callBackData.response.data[0].userid._id;
                        var username = callBackData.response.data[0].username;
                        if (callBackData.response.data[0] && callBackData.response.data[0]["storeid"]) {
                            var storeid = callBackData.response.data[0]["storeid"]._id;
                            var programid = callBackData.response.data[0]["storeid"].programid._id;
                            var stateName = callBackData.response.data[0].storeid.stateid.name;
                            if (!$appService.getCookie("selectedLoc")) {
                                var c_name = "selectedLoc";
                                document.cookie = c_name + "=" + escape(stateName);
                                $scope.currentLoc["data"] = stateName;
                            }
                            var image = [
                                {"image": ""}

                            ];
                            for (var i = 0; i < callBackData.response.data.length; i++) {
                                image[i]["image"] = callBackData.response.data[i].storeid.programid.image;
                            }
                            var setCompanyLogo = $appService.setUrls(image, 140, 88);
                            var companyLogoUrl = setCompanyLogo[0].imageUrl;
                            if (storeid) {
                                var c_name = "storeid";
                                document.cookie = c_name + "=" + escape(storeid);
                                var c_name = "programid";
                                document.cookie = c_name + "=" + escape(programid);
                                if (companyLogoUrl) {
                                    //changes made 3004
                                    var c_name = "companyLogoUrl";
                                    document.cookie = c_name + "=" + escape(companyLogoUrl);

                                }

                            }
                        }
                        var c_name = "usk";
                        document.cookie = c_name + "=" + escape(usk);
                        var c_name = "roleid";
                        document.cookie = c_name + "=" + escape(roleid);
                        var c_name = "userid";
                        document.cookie = c_name + "=" + escape(userid);
                        var c_name = "firstname";
                        document.cookie = c_name + "=" + escape(firstname);
                        var c_name = "username";
                        document.cookie = c_name + "=" + escape(username);
                        if (!$scope.$$phase) {
                            $scope.$apply();

                        }
                        window.location.href = "/";

                    }, function (err) {
                        $("#popupMessage").html("error while making request");
                        $('.popup').toggle("slide");
                        return;
                    });

                }

            }
            else {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
                return;
            }

        }, function (jqxhr, error) {
            if (jqxhr.responseText && JSON.parse(jqxhr.responseText).response) {
                $("#popupMessage").html(JSON.parse(jqxhr.responseText).response);
                $('.popup').toggle("slide");
                return;
            }
            else {
                $("#popupMessage").html("error while making request");
                $('.popup').toggle("slide");
                return;
            }
        });

    }
    $scope.userForgotPassword = function () {
        var userName = $("#username").val();
        if (!userName) {
            $("#popupMessage").html("Please enter email");
            $('.popup').toggle("slide");
            return;
        }
        $scope.forgotPassword(userName, function (data) {
            if (data.response == "User Not Found.") {
                $("#popupMessage").html("User does not exist");
                $('.popup').toggle("slide");
                return;
            } else {
                $("#popupMessage").html("We have sent you an email to reset password. Please check your email id.");
                $('.popup').toggle("slide");
                return;
            }
        });
    };
    $scope.forgotPassword = function (username, callback) {
        var params = {};
        params.username = username;
        params.ask = ASK;
        params.osk = OSK;
        $appService.getDataFromJQuery("/rest/forgotpassword", params, "GET", "JSON", function (callBackData) {
            callback(callBackData);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
            return;
        });
    };
});

cstore.controller('vendorCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingVenderData = false;
    $scope.venderSearch = [
        {"value": "firstname", "name": "Name"},
        {"value": "address", "name": "Address"},
        {"value": "city.name", "name": "City"},
        {"value": "state.name", "name": "State"},
        {"value": "email", "name": "Email"},
        {"value": "contact", "name": "Contact"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.vendors = [];
    $appService.auth();
    $scope.getAllVendors = function (direction, limit, column, searchText) {
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

        var query = {"table": "vendors__cstore"};
        query.columns = ["address2", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode", "category"];

        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.loadingVenderData = false;
            $scope.show.currentCursor = vendorData.response.cursor;
            $scope.vendors = vendorData.response.data;
            for (var i = 0; i < $scope.vendors.length; i++) {
                $scope.vendors[i]["deleteStatus"] = false;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllVendors(1, 10);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0;
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllVendors(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllVendors(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllVendors(0, 10, column, searchText);
    }
    $scope.getEditCountries(null, null, null, $scope.data);
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
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingProductData = false;
    $scope.venderSearch = [
        {"value": "name", "name": " POP Name"},
        {"value": "product_category.name", "name": "POP Category"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.products = [];
    $appService.auth();
    $scope.getAllProducts = function (direction, limit, column, searchText) {
        if ($scope.loadingProductData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingProductData = true;

        var query = {"table": "products__cstore"};
        query.columns = ["programid", "description", "name", "image", "short_description", {"expression": "product_category", "columns": ["_id", "name"]}, "cost", "soldcount", "quantity"];

        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingProductData = false;
            $scope.show.currentCursor = productData.response.cursor;
            //$scope.products = productData.response.data;
            $scope.products = productData.response.data;
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllProducts(1, 10);
    $scope.setProductOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllProducts(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllProducts(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllProducts(0, 10, column, searchText);
    }
    $scope.getProgramList();
});

cstore.controller('addProductCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    /* $scope.clearProductContent = function () {
     $scope.productdata["name"] = "";
     $scope.productdata["cost"] = "";
     $scope.productdata["description"] = "";
     $scope.productdata["short_description"] = "";
     $scope.productdata["quantity"] = "";
     $scope.productdata["image"] = "";
     $scope.readonlyrow.fileurl = "";
     $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
     //$scope.productdata.selectedVendor = $scope.productdata.vendors[0];

     }*/
    var productId = $routeParams.q;
    if (productId && productId != undefined && productId != "undefined") {
        $scope.productdata["productid"] = productId;
    }
    else {
        delete $scope.productdata["productid"];

    }
    //$scope.getProgramList();
});

cstore.controller('storeManagerList', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingStoreData = false;

    $scope.venderSearch = [

        {"value": "storename", "name": "Site Name"},
        {"value": "shift", "name": "Manager Shift"},
        {"value": "programid.name", "name": "Program"},
        {"value": "loyalty_status", "name": "Loyalty Status"},
        {"value": "reward_point", "name": "Reward Type"},
        {"value": "email", "name": "Email"},
        {"value": "contact", "name": "Contact"}

    ];

    $scope.searchby = $scope.venderSearch[0];
    $scope.storeManagers = [];
    $appService.auth();
    $scope.getAllStoreManagers = function (direction, limit, column, searchText) {
        if ($scope.loadingStoreData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingStoreData = true;
        var query = {"table": "storemanagers__cstore"};

        query.columns = ["programid", "siteid", "manager.email", "manager.contact", "manager.name", "address", "cityid", "countryid", "manager", "postalcode", "stateid", "storename", "contact", "email", "brands", "pos_type", "shift", "loyalty_status", "pos_version", "reward_point", "pump_brand", "pump_model", "address2"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeManagerData) {
            $scope.loadingStoreData = false;
            $scope.show.currentCursor = storeManagerData.response.cursor;
            $scope.storeManagers = storeManagerData.response.data;
            for (var i = 0; i < $scope.storeManagers.length; i++) {
                $scope.storeManagers[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getAllStoreManagers(1, 10);
    $scope.setStoreOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllStoreManagers(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllStoreManagers(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllStoreManagers(0, 10, column, searchText);
    }
    $scope.getEditCountries(null, null, null, $scope.storedata);
    $scope.getProgramList();
});

cstore.controller('addStoreManagerCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.passwordStatus = true;
    /*$scope.clearStoreContent = function () {
     $scope.storedata.manager = {};
     $scope.storedata["address"] = "";
     $scope.storedata["contact"] = "";
     //$scope.storedata["loyalty_status"] = "";
     $scope.storedata["pump_model"] = "";
     $scope.storedata["pump_brand"] = ""
     $scope.storedata["email"] = "";
     $scope.storedata["pos_version"] = "";
     $scope.storedata["postalcode"] = "";
     $scope.storedata["storename"] = "";
     $scope.storedata["address2"] = "";
     $scope.storedata["manager"]["contact"] = "";
     $scope.storedata["manager"]["email"] = "";
     $scope.storedata["manager"]["name"] = "";
     //changes Made
     $scope.readonlyrow.fileurl = "";
     $scope.storedata["company_logo"] = "";
     $scope.readonlyrow.fileurl = "";
     $scope.storedata.selectedCountry = "";
     $scope.storedata.selectedCity = "";
     $scope.storedata.selectedState = "";
     $scope.storedata.selectedPosType = $scope.storedata.posTypes[0];
     //$scope.storedata.selectedShift = $scope.storedata.shifts[0];
     $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
     //changes made 02/05
     $scope.storedata.selectedBrand=$scope.storedata.brands[0];
     $scope.storedata.otherBrand="";
     $scope.storedata.otherPosType = "";
     $scope.storedata.otherRewardType = "";
     $scope.storedata.siteid="";
     $scope.storedata.selectedLoyaltyStatus=$scope.storedata.loyalty_status[0];
     $scope.storedata.selectedShift="";
     } */
    var storeId = $routeParams.q;
    if (storeId && storeId != undefined && storeId != "undefined") {
        $scope.storedata["storeid"] = storeId;
        $scope.passwordStatus = false;
    }
    else {
        delete $scope.storedata["storeid"];
    }
});

/**************************************** Set up Ctrl****************************************************/
cstore.controller('countryCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingCountryData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "Country"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.countries = [];
    $appService.auth();
    $scope.getAllCountries = function (direction, limit, column, searchText) {
        if ($scope.loadingCountryData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingCountryData = true;
        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            $scope.loadingCountryData = false;
            $scope.show.currentCursor = countryData.response.cursor;
            $scope.countries = countryData.response.data;
            for (var i = 0; i < $scope.countries.length; i++) {
                $scope.countries[i]["deleteStatus"] = false;
                $scope.countries[i]["editStatus"] = false;
                $scope.countries[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllCountries(1, 10);
    $scope.setCountryOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllCountries(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllCountries(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllCountries(0, 10, column, searchText);
    }
    $scope.refreshCountries = function (index, refreshCountryId) {

        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        query.filter = {"_id": refreshCountryId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            countryData.response.data[0].deleteStatus = false;
            countryData.response.data[0].oldstatus = true;
            $scope.countries[index] = countryData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

cstore.controller('productCategoryCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingProductCategoryData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "POP Category"},
        {"value": "description", "name": "Description"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.productCategories = [];
    $appService.auth();
    $scope.getAllProductCategories = function (direction, limit, column, searchText) {
        //changes made
        if ($scope.loadingProductCategoryData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingProductCategoryData = true;

        var query = {"table": "product_categories__cstore"};
        query.columns = ["name", "description"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.loadingProductCategoryData = false;
            $scope.show.currentCursor = productCategoryData.response.cursor;
            $scope.productCategories = productCategoryData.response.data;
            for (var i = 0; i < $scope.productCategories.length; i++) {
                $scope.productCategories[i]["deleteStatus"] = false;
                $scope.productCategories[i]["editStatus"] = false;
                $scope.productCategories[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllProductCategories(1, 10);
    $scope.setProductCatOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllProductCategories(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllProductCategories(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllProductCategories(0, 10, column, searchText);
    }
    $scope.refreshProductCategories = function (index, refreshProductCategoryId) {

        var query = {"table": "product_categories__cstore"};
        query.columns = ["name", "description"];
        query.filter = {"_id": refreshProductCategoryId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            productCategoryData.response.data[0].deleteStatus = false;
            productCategoryData.response.data[0].oldstatus = true;
            $scope.productCategories[index] = productCategoryData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

cstore.controller('trainingCategoryCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingTrainingCategoryData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "Training Category"},
        {"value": "description", "name": "Description"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.trainingCategories = [];
    $appService.auth();
    $scope.getAllTrainingCategories = function (direction, limit, column, searchText) {
        if ($scope.loadingTrainingCategoryData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingTrainingCategoryData = true;

        var query = {"table": "training_categories__cstore"};

        query.columns = ["name", "description"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }

        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryData) {
            $scope.loadingTrainingCategoryData = false;
            $scope.show.currentCursor = trainingCategoryData.response.cursor;
            $scope.trainingCategories = trainingCategoryData.response.data;
            for (var i = 0; i < $scope.trainingCategories.length; i++) {
                $scope.trainingCategories[i]["deleteStatus"] = false;
                $scope.trainingCategories[i]["editStatus"] = false;
                $scope.trainingCategories[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllTrainingCategories(1, 10);
    $scope.setTrainingCatOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllTrainingCategories(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllTrainingCategories(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllTrainingCategories(0, 10, column, searchText);
    }
    $scope.refreshTrainingCategories = function (index, refreshTrainingCategoryId) {

        var query = {"table": "training_categories__cstore"};
        query.columns = ["name", "description"];
        query.filter = {"_id": refreshTrainingCategoryId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryData) {
            trainingCategoryData.response.data[0].deleteStatus = false;
            trainingCategoryData.response.data[0].oldstatus = true;
            $scope.trainingCategories[index] = trainingCategoryData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

cstore.controller('stateCtrl', function ($scope, $appService) {
    $scope.getStateCountries = function () {
        $scope.countryList = {};
        var countries = {};
        var query = {"table": "countries__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            $scope.countryList = countryData.response.data;
            //$scope.countryList.selectedCountry = $scope.state.countries[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }

    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingStateData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "State"},
        {"value": "abbreviation", "name": "Abbreviation"},
        {"value": "countryid.name", "name": "Country"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    //$scope.states = [];
    $appService.auth();
    $scope.getAllStates = function (direction, limit, column, searchText) {
        if ($scope.loadingStateData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingStateData = true;

        var query = {"table": "states__cstore"};

        query.columns = ["name", "countryid", "abbreviation"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            $scope.loadingStateData = false;
            $scope.show.currentCursor = stateData.response.cursor;
            $scope.states = stateData.response.data;
            for (var i = 0; i < $scope.states.length; i++) {
                $scope.states[i]["deleteStatus"] = false;
                $scope.states[i]["editStatus"] = false;
                $scope.states[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllStates(1, 10);
    $scope.setStateOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllStates(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllStates(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllStates(0, 10, column, searchText);
    }
    $scope.getStateCountries();
    $scope.refreshStates = function (index, refreshStateId) {

        var query = {"table": "states__cstore"};
        query.columns = ["name", "countryid", "abbreviation"];
        query.filter = {"_id": refreshStateId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            stateData.response.data[0].deleteStatus = false;
            stateData.response.data[0].oldstatus = true;
            $scope.states[index] = stateData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

cstore.controller('cityCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingCityData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "City"},
        {"value": "stateid.name", "name": "State"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.cities = [];
    $appService.auth();
    $scope.getAllCities = function (direction, limit, column, searchText) {
        if ($scope.loadingCityData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingCityData = true;

        var query = {"table": "cities__cstore"};

        query.columns = ["name", "stateid"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
            $scope.loadingCityData = false;
            $scope.show.currentCursor = cityData.response.cursor;
            $scope.cities = cityData.response.data;
            for (var i = 0; i < $scope.cities.length; i++) {
                $scope.cities[i]["deleteStatus"] = false;
                $scope.cities[i]["editStatus"] = false;
                $scope.cities[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllCities(1, 10);
    $scope.setCityOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllCities(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllCities(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllCities(0, 10, column, searchText);
    }
    $scope.getCityStates = function () {
        $scope.stateList = {};
        var states = {};
        var query = {"table": "states__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            $scope.stateList = stateData.response.data;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getCityStates();
    $scope.refreshCities = function (index, refreshCityId) {

        var query = {"table": "cities__cstore"};
        query.columns = ["name", "stateid"];
        query.filter = {"_id": refreshCityId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
            cityData.response.data[0].deleteStatus = false;
            cityData.response.data[0].oldstatus = true;
            $scope.cities[index] = cityData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
});

cstore.controller('profileCtrl', function ($scope, $appService, $location, $routeParams) {
    var usk = $appService.getCookie("usk");
    var query = {"table": "user_profiles__cstore"};
    query.columns = ["userid", "roleid"];
    query.filter = {"userid": "{_CurrentUserId}"};
    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};
    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
        $scope.loggedIn = callBackData.response.data[0];

        var userquery = {"table": "users__baas"};
        userquery.columns = ["password", "_id"];
        userquery.filter = {"username": $scope.loggedIn.userid.username};
        var params = {"query": JSON.stringify(userquery), "ask": ASK, "osk": OSK, "usk": usk};

        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.loggedIn.userbassId = callBackData.response.data[0]._id;
            $scope.loggedIn.password = callBackData.response.data[0].password;
        });
    });

});

cstore.controller('resetpasswordCtrl', function ($scope, $appService, $location, $routeParams) {
    $scope.resetPassword = function (password, fpcode, callback) {
        var params = {};
        params.pwd = password;
        params.fpcode = fpcode;
        $appService.getDataFromJQuery(BAAS_SERVER + "/resetpassword", params, "GET", "JSON", function (callBackData) {
            callback(callBackData);
        }, function (jqxhr, error) {
            $("#popupMessage").html("Something went wrong. Can you please try again");
            $('.popup').toggle("slide");
            return;
        });
    };
});

cstore.controller('userCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingUserData = false;
    $scope.venderSearch = [
        {"value": "userid.firstname", "name": "Name"},
        {"value": "username", "name": "Email"},
        {"value": "roleid.name", "name": "Role"},
        {"value": "storeid.storename", "name": "Site Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.users = [];
    $appService.auth();
    $scope.getAllUsers = function (direction, limit, column, searchText) {
        if ($scope.loadingUserData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingUserData = true;
        var query = {"table": "user_profiles__cstore"};

        query.columns = ["userid", "storeid", "roleid", "username"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.loadingUserData = false;
            $scope.show.currentCursor = userData.response.cursor;
            $scope.users = userData.response.data;
            for (var i = 0; i < $scope.users.length; i++) {
                $scope.users[i]["deleteStatus"] = false;
                $scope.users[i]["editStatus"] = false;
                $scope.users[i]["oldstatus"] = true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html("exception in making request");
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllUsers(1, 10);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllUsers(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllUsers(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllUsers(0, 10, column, searchText);
    }
    $scope.getStores();
    $scope.getRoles();

});

/********************ADD User  *****************/
cstore.controller('addUserCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getStores();
    $scope.getRoles();
    /*$scope.clearUserContent = function () {
     $scope.userdata["username"] = "";
     $scope.userdata["firstname"] = "";
     $scope.userdata["lastname"] = "";
     $scope.userdata["password"] = "";
     $scope.userdata.selectedRole = $scope.userdata.roles[0];
     $scope.userdata.selectedStore = $scope.userdata.roles[0];
     } */
});

/****************************Promotion***************************************************/
cstore.controller('promotionCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingPromotionData = false;
    $scope.venderSearch = [
        {"value": "promo_title", "name": "Promo Title"},
        {"value": "offer_title", "name": "Offer Title"},
        {"value": "offer_type", "name": "Offer Type"},
        {"value": "item_signage", "name": "Item Signage"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.promotions = [];
    $appService.auth();
    $scope.getAllPromotions = function (direction, limit, column, searchText) {
        if ($scope.loadingPromotionData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingPromotionData = true;
        var query = {"table": "promotions__cstore"};
        //change made
        query.columns = [
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm"},
            "image",
            "item_signage",
            "offer_description",
            "offer_title",
            "offer_type",
            "promo_description",
            "promo_title",
            "reward_value",
            "sponsor",
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},
            "threshold",
            "upc",
            "vendorid",
            "top_promo",
            "codes"
        ];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var timeZone = new Date().getTimezoneOffset();
        //timeZone = timeZone * 60000;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionData) {
            $scope.loadingPromotionData = false;
            $scope.show.currentCursor = promotionData.response.cursor;
            $scope.promotions = promotionData.response.data;
            for (var i = 0; i < $scope.promotions.length; i++) {
                $scope.promotions[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllPromotions(1, 10);
    $scope.setPromotionOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllPromotions(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllPromotions(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllPromotions(0, 10, column, searchText);
    }
});

cstore.controller('addPromotionCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    /*$scope.clearPromotionContent = function () {
     $scope.promotiondata["promo_title"] = "";
     $scope.promotiondata["end_date"] = "";
     //$scope.promotiondata["end_time"]="";
     //$scope.promotiondata["start_time"]="";
     $scope.promotiondata.selectedStartHour=$scope.promotiondata.hours[0];
     $scope.promotiondata.selectedEndHour=$scope.promotiondata.hours[0];
     $scope.promotiondata.selectedStartMinute=$scope.promotiondata.minutes[0];
     $scope.promotiondata.selectedEndMinute=$scope.promotiondata.minutes[0];
     $scope.promotiondata["start_date"] = "";
     $scope.promotiondata["offer_description"] = "";
     $scope.promotiondata["offer_title"] = "";
     $scope.promotiondata["promo_description"] = "";
     $scope.promotiondata["reward_value"] = "";
     $scope.promotiondata["sponsor"] = "";
     $scope.promotiondata["threshold"] = "";
     $scope.promotiondata["image"] = "";
     $scope.readonlyrow.fileurl = "";
     $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
     $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
     $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[0];
     $scope.promotiondata.codes = [];
     //changes made by anuradha 0105 evening
     $scope.promotiondata["top_promo"]=false;
     // $scope.promotiondata.vendorsList = $scope.vendors[0];
     } */

    var promotionId = $routeParams.q;
    if (promotionId && promotionId != undefined && promotionId != "undefined") {
        $scope.promotiondata["promotionid"] = promotionId;
    }
    else {
        delete $scope.promotiondata["promotionid"];
    }
});

// changes made by Anuradha
/*******************************************Training Session*************************************************/
cstore.controller('trainingSessionCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingTrainingSessionData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "training_category_id.name", "name": "Training Category"},
        {"value": "video_url", "name": "Video Url"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.trainingSessions = [];
    $appService.auth();
    $scope.getAllTrainingSessions = function (direction, limit, column, searchText) {
        if ($scope.loadingTrainingSessionData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingTrainingSessionData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["title", "description", "file", "training_category_id", "video_url"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingSessionData) {
            $scope.loadingTrainingSessionData = false;
            $scope.show.currentCursor = trainingSessionData.response.cursor;
            $scope.trainingSessions = trainingSessionData.response.data;
            for (var i = 0; i < $scope.trainingSessions.length; i++) {
                $scope.trainingSessions[i]["deleteStatus"] = false;
                $scope.trainingSessions[i].string_video_url = ($scope.trainingSessions[i].video_url) ? $scope.trainingSessions[i].video_url.toString() : "";
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllTrainingSessions(1, 10);
    $scope.setTrainingSessionOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllTrainingSessions(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllTrainingSessions(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllTrainingSessions(0, 10, column, searchText);
    }
    //changes made by anuradha 0n 30-04
    $scope.getStores();
});

cstore.controller('addTrainingSessionCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();


    var trainingId = $routeParams.q;
    if (trainingId && trainingId != undefined && trainingId != "undefined") {
        $scope.trainingdata["trainingSessionId"] = trainingId;
    }
    else {
        delete $scope.trainingdata["trainingSessionId"];
    }
})
/************************************ Assign Training Session *****************************************************/
cstore.controller('assignTrainingCtrl', function ($scope, $appService) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [
        {"value": "storename", "name": "Store Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.getStoresName = function (direction, limit, column, searchText) {
        if ($scope.loadingStatus) {
            return false;
        }
        if (direction == 1) {
            $scope.preCursor = $scope.currentCursor;
        } else {
            $scope.preCursor = $scope.preCursor - limit;
            $scope.currentCursor = $scope.preCursor;
        }
        $scope.loadingStatus = true;
        var query = {"table": "storemanagers__cstore"};
        query.columns = [ "_id", "storename"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        } else {
            query.orders["storename"] = "asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            if (storeData.response.data && storeData.response.data.length > 0) {
                $scope.storesName = storeData.response.data;
                $scope.currentCursor = storeData.response.cursor;
                $scope.trainingSessionId = $scope.getURLParam("id");
                if (!$scope.trainingSessionId) {
                    return;
                }
                var query = {"table": "training_session__cstore"};
                query.columns = ["store_manager_id"];
                query.filter = {"_id": $scope.trainingSessionId};
                query.orders = {"storename": "asc"};
                var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                var serviceUrl = "/rest/data";
                $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeTrainingData) {
                    $scope.loadingStatus = false;
                    if (storeTrainingData.response.data && storeTrainingData.response.data.length > 0 && storeTrainingData.response.data[0].store_manager_id && storeTrainingData.response.data[0].store_manager_id.length) {
                        $scope.storeManager = storeTrainingData.response.data[0].store_manager_id;
                        for (i = 0; i < $scope.storesName.length; i++) {
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[i]._id == $scope.storeManager[j]._id) {
                                    $scope.storesName[i].assigned = true;
                                }
                            }
                            if (!$scope.storesName[i].assigned) {
                                $scope.storesName[i].assigned = false;
                            }
                        }
                    }
                }, function (jqxhr, error) {
                    $("#popupMessage").html(error);
                    $('.popup').toggle("slide");
                });
            } else {
                $scope.loadingStatus = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getStoresName(1, 10);
    $scope.setStoreNameOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getStoresName(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getStoresName(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getStoresName(0, 10, column, searchText);
    }
});
/************************************ Survey *****************************************************/
cstore.controller('surveyCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingSurveyData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "description", "name": "Description"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.surveys = [];
    $scope.getAllSurveys = function (direction, limit, column, searchText) {
        if ($scope.loadingSurveyData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingSurveyData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["title", "description", "survey_question", "survey_question.question", "survey_question.options"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyData) {
            $scope.loadingSurveyData = false;
            $scope.show.currentCursor = surveyData.response.cursor;
            $scope.surveys = surveyData.response.data;
            for (var i = 0; i < $scope.surveys.length; i++) {
                $scope.surveys[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllSurveys(1, 10);
    $scope.setSurveyOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllSurveys(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllSurveys(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllSurveys(0, 10, column, searchText);
    }
    $scope.getStores();
});
cstore.controller('addSurveyCtrl', function ($scope, $appService) {
    /*$scope.clearSurveyContent = function () {
     $scope.surveydata["title"] = "";
     $scope.surveydata["description"] = "";
     $scope.questions = [{"optionArr":[],"question":"","type":$scope.listType[0],"addOption":true}];
     if (!$scope.$$phase) {
     $scope.$apply();
     }
     $scope.setPath('surveys');
     } */
});

//changes made by Anuradha

/************************************ Assign Survey *****************************************************/
cstore.controller('assignSurveyCtrl', function ($scope, $appService) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [
        {"value": "storename", "name": "Store Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.getSurveyStoresName = function (direction, limit, column, searchText) {
        if ($scope.loadingStatus) {
            return false;
        }
        if (direction == 1) {
            $scope.preCursor = $scope.currentCursor;
        } else {
            $scope.preCursor = $scope.preCursor - limit;
            $scope.currentCursor = $scope.preCursor;
        }
        $scope.loadingStatus = true;
        var query = {"table": "storemanagers__cstore"};
        query.columns = [ "_id", "storename"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        } else {
            query.orders["storename"] = "asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            if (storeData.response.data && storeData.response.data.length > 0) {
                $scope.storesName = storeData.response.data;
                $scope.currentCursor = storeData.response.cursor;
                $scope.trainingSessionId = $scope.getURLParam("id");
                if (!$scope.trainingSessionId) {
                    return;
                }
                var query = {"table": "surveys__cstore"};
                query.columns = ["store_manager_id"];
                query.filter = {"_id": $scope.trainingSessionId};
                query.orders = {"storename": "asc"};
                var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                var serviceUrl = "/rest/data";
                $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeSurveyData) {
                    $scope.loadingStatus = false;
                    if (storeSurveyData.response.data && storeSurveyData.response.data.length > 0 && storeSurveyData.response.data[0].store_manager_id && storeSurveyData.response.data[0].store_manager_id.length) {
                        $scope.storeManager = storeSurveyData.response.data[0].store_manager_id;
                        for (i = 0; i < $scope.storesName.length; i++) {
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[i]._id == $scope.storeManager[j]._id) {
                                    $scope.storesName[i].assigned = true;
                                }
                            }
                            if (!$scope.storesName[i].assigned) {
                                $scope.storesName[i].assigned = false;
                            }
                        }
                    }
                }, function (jqxhr, error) {
                    $("#popupMessage").html(error);
                    $('.popup').toggle("slide");
                });
            } else {
                $scope.loadingStatus = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getSurveyStoresName(1, 10);
    $scope.setStoreNameOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getSurveyStoresName(0, 10, column, searchText);
    }
});

/************************************ Answered Survey Store *****************************************************/
cstore.controller('answeredStoreCtrl', function ($scope, $appService) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [
        {"value": "storename", "name": "Store Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.getSurveyStoresName = function (direction, limit, column, searchText) {
        if ($scope.loadingStatus) {
            return false;
        }
        if (direction == 1) {
            $scope.preCursor = $scope.currentCursor;
        } else {
            $scope.preCursor = $scope.preCursor - limit;
            $scope.currentCursor = $scope.preCursor;
        }
        $scope.loadingStatus = true;
        var query = {"table": "answered_survey__cstore"};
        query.columns = [ "_id", "store_id", "survey_id", "answers"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {"store_id.storename": {"$regex": "(" + searchText + ")", "$options": "-i"}};
        }
        var survey_id = $scope.getURLParam("id");
        if (survey_id) {
            query.filter["survey_id"] = survey_id;
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        } else {
            query.orders["store_id"] = {};
            query.orders["store_id"].storename = "asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.loadingStatus = false;
            if (storeData.response.data && storeData.response.data.length > 0) {
                $scope.storesName = storeData.response.data;
                $scope.currentCursor = storeData.response.cursor;
            } else {
                $scope.storesName = [];
                $scope.currentCursor = 0;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getSurveyStoresName(1, 10);
    $scope.setStoreNameOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getSurveyStoresName(0, 10, column, searchText);
    }
});

cstore.controller('assignedSurveyCtrl', function ($scope, $appService, $routeParams) {
    var assignedSurveyId = $routeParams.q;
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingAssignedSurveyData = false;
    $scope.venderSearch = [
        {"value": "store_manager_id.storename", "name": "Store"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.assignedSurveys = [];
    $appService.auth();
    $scope.getAssignedSurveys = function (direction, limit, column, searchText) {
        if ($scope.loadingAssignedSurveyData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingAssignedSurveyData = true;
        var query = {"table": "storemanager_survey__cstore"};
        query.columns = ["store_manager_id", "survey_id"];
        query.filter = {};
        query.filter = {"survey_id._id": assignedSurveyId};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (assignedSurveyData) {
            $scope.loadingAssignedSurveyData = false;
            $scope.show.currentCursor = assignedSurveyData.response.cursor;
            $scope.assignedSurveys = assignedSurveyData.response.data;
            for (var i = 0; i < $scope.assignedSurveys.length; i++) {
                $scope.assignedSurveys[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAssignedSurveys(1, 10);
    $scope.setAssignedSurveyOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAssignedSurveys(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAssignedSurveys(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAssignedSurveys(0, 10, column, searchText);
    }

});

cstore.controller('allPromotionsCtrl', function ($scope, $appService, $routeParams) {
    var currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes());
    $scope.promotionData = {"loadingData": false, "available": false};

    $scope.promotions = [];
    $scope.getAllPromos = function (cursor, searchText) {
        if ($scope.promotionData.loadingData) {
            return false;
        }
        $scope.promotionData.loadingData = true;
        var query = {"table": "promotions__cstore"};
        query.columns = ["end_date", "start_date", "image", "promo_title"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.filter["start_date"] = {"$lte": currentTime};
        query.filter["end_date"] = {"$gte": currentTime};
        if (searchText && searchText != "") {
            query.filter["promo_title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promoData) {
            var rawData = $appService.setUrls(promoData.response.data, 291, 196);
            //var rawData = promoData.response.data;
            if ($scope.promotions.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.promotions.push(rawData[i]);
                }
            }
            if (!$scope.promotions.length) {
                $scope.promotions = rawData;

            }
            $scope.promotionData.loadingData = false;
            $scope.cursor = promoData.response.cursor;
            if ($scope.promotions.length) {
                $scope.promotionData.available = "true";
            }
            else {
                $scope.promotionData.available = "false";
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getAllPromos($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getAllPromos(cursor, $routeParams.search);
    }
});

cstore.controller('promoDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.getPromoDetail = function () {
        $scope.loadingPromotionDetailData = true;

        var query = {"table": "promotions__cstore"};
        query.columns = [
            "image",
            "promo_description",
            "promo_title",
            "store_manager_id"
        ];
        query.filter = {"_id": $routeParams.promoid};
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionDetailData) {
            $scope.loadingPromotionDetailData = false;
            $scope.promotion = $appService.setUrls(promotionDetailData.response.data, 550, 350);
            $scope.assignedStoreManagers=promotionDetailData.response.data[0].store_manager_id;
            console.log($scope.assignedStoreManagers);
            for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                    $scope.booleanOpt = $scope.assignedStoreManagers[i].opt;
                    $scope.storeManagerId=$scope.assignedStoreManagers[i]._id;
                }
            }
            console.log($scope.booleanOpt);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getPromoDetail();
});

/*****************assigned session**************************/
cstore.controller('assignedSessionCtrl', function ($scope, $appService, $routeParams) {
    var assignedSessionId = $routeParams.q;
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingAssignedSessionData = false;
    $scope.venderSearch = [
        {"value": "store_manager_id.storename", "name": "Store"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.assignedSessions = [];
    $appService.auth();
    $scope.getAssignedSessions = function (direction, limit, column, searchText) {
        if ($scope.loadingAssignedSessionData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingAssignedSessionData = true;
        var query = {"table": "storemanager_trainingsession__cstore"};
        query.columns = ["store_manager_id", "training_session_id"];
        query.filter = {};
        query.filter = {"training_session_id._id": assignedSessionId};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (assignedSessionData) {
            $scope.loadingAssignedSessionData = false;
            $scope.show.currentCursor = assignedSessionData.response.cursor;
            $scope.assignedSessions = assignedSessionData.response.data;
            for (var i = 0; i < $scope.assignedSessions.length; i++) {
                $scope.assignedSessions[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAssignedSessions(1, 10);
    $scope.setAssignedSessionOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAssignedSessions(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAssignedSessions(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAssignedSessions(0, 10, column, searchText);
    }

});

/************************ Training Session Detail for Store Manager ****************************************/
cstore.controller('sessionDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSessionDetail = function (searchText) {
        $scope.loadingSessionDetailData = true;
        $scope.videoUrls = [];
        $scope.files = [];
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "description", "file", "title", "training_category_id", "video_url"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid, "_id": $routeParams.sessionid};
        //if (searchText && searchText != "") {
        //    query.filter["training_session_id.file.name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        //}
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (sessionDetailData) {
            $scope.loadingSessionDetailData = false;
            $scope.session = sessionDetailData.response.data;
            if (sessionDetailData.response.data[0].video_url) {
                $scope.videoUrls = sessionDetailData.response.data[0].video_url;
            }
            if (sessionDetailData.response.data[0].file) {
                $scope.files = sessionDetailData.response.data[0].file;
            }
            if ($scope.videoUrls || $scope.videoUrls != "undefined" || $scope.videoUrls != "") {
                for (var i = 0; i < $scope.videoUrls.length; i++) {
                    if ($scope.videoUrls[i].indexOf("http") == -1) {
                        $scope.videoUrls[i] = "http://" + $scope.videoUrls[i];
                    }
                }
            }
            if ($scope.files || $scope.files != "undefined" || $scope.files != "") {
                for (var i = 0; i < $scope.files.length; i++) {
                    if ((/\.(doc|docx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/doc1.png";
                    }
                    else if ((/\.(pdf)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/pdf1.png";
                    }
                    else if ((/\.(ppt|pptx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/ppt1.png";
                    }
                    else if ((/\.(xls|csv|xlsx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/excel_icon1.png";
                    }

                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getSessionDetail();
});

/*******************************All Training Sessions*********************************/
cstore.controller('allTrainingSessionsCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getTrainingList = function (searchText) {
        $scope.loadingAllTrainingData = true;

        var query = {"table": "training_categories__cstore"};

        query.columns = ["name"];


        if (searchText && searchText != "") {
            query.childs = [
                {"alias": "trainingCategoryWiseData", "query": {"table": "training_session__cstore", "columns": ["store_manager_id", "title", "description"], "max_rows": 4, "orders": {"__createdon": "desc"}, "filter": {"store_manager_id._id": $scope.currentUser.data.storeid, "title": {"$regex": "(" + searchText + ")", "$options": "-i"}}}, "relatedcolumn": "training_category_id", "parentcolumn": "_id"}
            ]
        }
        else {
            query.childs = [
                {"alias": "trainingCategoryWiseData", "query": {"table": "training_session__cstore", "columns": ["store_manager_id", "title", "description"], "max_rows": 4, "orders": {"__createdon": "desc"}, "filter": {"store_manager_id._id": $scope.currentUser.data.storeid}}, "relatedcolumn": "training_category_id", "parentcolumn": "_id"}
            ];
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingData) {
            $scope.loadingAllTrainingData = false;
            var rawData = trainingData.response.data;
            for (var i = 0; i < rawData.length; i++) {
                if (rawData[i] && rawData[i]["trainingCategoryWiseData"] && rawData[i]["trainingCategoryWiseData"].length) {

                    rawData[i]["trainingCategoryWiseData"] = rawData[i]["trainingCategoryWiseData"];
                }
            }
            $scope.sessionCategories = rawData;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getTrainingList($routeParams.search);
});

/***************************** Training Category Detail**************************************/
cstore.controller('trainingCategoryDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.categoryData = {"loadingData": false, "available": false};

    $scope.sessions = [];
    $scope.getTrainingCategoryDetail = function (cursor, filter, searchText) {
        if ($scope.categoryData.loadingData) {
            return false;
        }
        $scope.categoryData.loadingData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "title", "description", "training_category_id"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        if (filter && filter != undefined && filter != "undefined") {
            query.filter["training_category_id._id"] = filter;
            if (searchText && searchText != "") {
                query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
            }
        }
        else {
            $("#popupMessage").html("Not Valid");
            $('.popup').toggle("slide");
            return false;
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryDetailData) {
            var rawData = trainingCategoryDetailData.response.data;

            if ($scope.sessions.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.sessions.push(rawData[i]);
                }
            }
            if (!$scope.sessions.length) {
                $scope.sessions = rawData;

            }
            $scope.categoryData.loadingData = false;
            $scope.cursor = trainingCategoryDetailData.response.cursor;
            if ($scope.sessions.length) {
                /*wee need string for ng-switch*/
                $scope.categoryData.available = "true";
            }
            else {
                $scope.categoryData.available = "false";
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getTrainingCategoryDetail($scope.cursor, $routeParams.q, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getTrainingCategoryDetail(cursor, $routeParams.q, $routeParams.search);
    }
});


/*************************Assigned Survey***********************************/
cstore.controller('allAssignedSurveysCtrl', function ($scope, $appService, $routeParams) {
    $scope.assignedSurveyData = {"loadingData": false, "available": false};
    $scope.assignedSurveys = [];
    $scope.getAllAssignedSurveys = function (cursor, searchText) {
        if ($scope.assignedSurveyData.loadingData) {
            return false;
        }
        $scope.assignedSurveyData.loadingData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["store_manager_id", "title", "description"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.filter["store_manager_id.status"] = "unanswered";
        if (searchText && searchText != "") {
            query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (assignedSurveyData) {
            var rawData = assignedSurveyData.response.data;
            if ($scope.assignedSurveys.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.assignedSurveys.push(rawData[i]);
                }
            }
            if (!$scope.assignedSurveys.length) {
                $scope.assignedSurveys = rawData;
            }
            $scope.assignedSurveyData.loadingData = false;
            $scope.cursor = assignedSurveyData.response.cursor;
            if ($scope.assignedSurveys.length) {
                $scope.assignedSurveys.available = "true";
            }
            else {
                $scope.assignedSurveys.available = "false";
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getAllAssignedSurveys($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialSurveyData = function (cursor) {
        $scope.getAllAssignedSurveys(cursor, $routeParams.search);
    }
});
/****************************ProductCodeCtrls*************************************/
cstore.controller('productCodesCtrl', function ($scope, $appService) {

    //$scope.codeTypes=[{"name":"UPC"},{"name":"PLU"},{"name":"Group"}];
    $scope.types = ["GROUP", "PLU", "UPC"];

    //$scope.codedata.selectedCodeType=$scope.codedata.codeTypes[0];
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingProductCodeData = false;
    $scope.venderSearch = [
        {"value": "code", "name": "Code"},
        {"value": "description", "name": "Description"},
        {"value": "type", "name": "Type"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.productCodes = [];
    $appService.auth();
    $scope.getAllProductCodes = function (direction, limit, column, searchText) {
        if ($scope.loadingProductCodeData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingProductCodeData = true;

        var query = {"table": "product_codes__cstore"};

        query.columns = ["code", "description", "type"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCodeData) {
            $scope.loadingProductCodeData = false;
            $scope.show.currentCursor = productCodeData.response.cursor;
            $scope.productCodes = productCodeData.response.data;
            for (var i = 0; i < $scope.productCodes.length; i++) {
                $scope.productCodes[i]["deleteStatus"] = false;
                $scope.productCodes[i]["editStatus"] = false;
                $scope.productCodes[i]["oldstatus"] = true;
                //$scope.productCodes[i].type=$scope.types[0];
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllProductCodes(1, 10);
    $scope.setProductCodeOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllProductCodes(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllProductCodes(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllProductCodes(0, 10, column, searchText);
    }
    $scope.refreshProductCodes = function (index, refreshProductCodeId) {

        var query = {"table": "product_codes__cstore"};
        query.columns = ["code", "description", "type"];
        query.filter = {"_id": refreshProductCodeId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCodeData) {
            productCodeData.response.data[0].deleteStatus = false;
            productCodeData.response.data[0].oldstatus = true;
            $scope.productCodes[index] = productCodeData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
});

/******************************** Shopping Cart*************************************/
cstore.controller('shoppingCartCtrl', function ($scope, $appService) {
    $appService.auth();
    $scope.grandTotal = 0;
    $scope.getShoppingCart();
});
cstore.controller('billingAddressCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSavedAddress = function () {
        $scope.loadingSavedAddress = true;
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["address", "cityid", "contact", "countryid", "stateid", "email", "storename", "manager.name", "postalcode", "address2"];
        query.filter = {};
        query.filter["_id"] = $scope.currentUser.data.storeid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (savedAddressData) {
            $scope.loadingSavedAddress = false;
            $scope.savedAddressData = savedAddressData.response.data[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getSavedAddress();
    if ($routeParams.q != "setBackData") {
        $scope.getEditCountries(null, null, null, $scope.data);
        $scope.billingdata.same_shipping_address = true;
        //if(!$scope.billingdata.same_shipping_address){
        $scope.getEditCountries(null, null, null, $scope.storedata);
        //}
    }
    $scope.clearBillingContent = function () {
        $scope.billingdata.bill_address.firstname = "";
        $scope.billingdata.bill_address.lastname = "";
        $scope.billingdata.bill_address.address = "";
        $scope.billingdata.bill_address.address_2 = "";
        $scope.billingdata.bill_address.zipcode = "";
        $scope.billingdata.bill_address.phone = "";
        $scope.billingdata.bill_address.ext = "";
        $scope.billingdata.bill_address.email = "";
        //$scope.getEditCountries(null, null, null);
    }
    $scope.clearShippingContent = function () {
        $scope.billingdata.shipping_address.firstname = "";
        $scope.billingdata.shipping_address.lastname = "";
        $scope.billingdata.shipping_address.address = "";
        $scope.billingdata.shipping_address.address_2 = "";
        $scope.billingdata.shipping_address.zipcode = "";
        $scope.billingdata.shipping_address.phone = "";
        $scope.billingdata.shipping_address.ext = "";
        $scope.billingdata.shipping_address.email = "";
        //$scope.getEditCountries(null, null, null);
    }
});
cstore.controller('orderReviewCtrl', function ($scope, $appService) {
    $appService.auth();
    $scope.getShoppingCart();
});


/*************Survey Detail Ctrl***************/
cstore.controller('surveyDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSurveyDetail = function (searchText) {
        $scope.surveyQuestions = [
            {"options": [
                {"optionVal": "", "optionStatus": false}
            ], "optionType": "" }
        ];
        $scope.loadingSurveyDetailData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["description", "title", "survey_question", "store_manager_id"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid, "_id": $routeParams.surveyid};
        //if (searchText && searchText != "") {
        //    query.filter["training_session_id.file.name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        //}
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyDetailData) {
            $scope.loadingSurveyDetailData = false;
            $scope.survey = surveyDetailData.response.data[0];
            if (surveyDetailData.response.data[0].survey_question) {
                $scope.surveyQuestions = surveyDetailData.response.data[0].survey_question;
            }
            if ($scope.surveyQuestions.length > 0) {
                for (var i = 0; i < $scope.surveyQuestions.length; i++) {
                    if ($scope.surveyQuestions[i].options) {
                        //$scope.surveyQuestions[i].optionArray = $scope.surveyQuestions[i].options;
                        for (var j = 0; j < $scope.surveyQuestions[i].options.length; j++) {

                            if ($scope.surveyQuestions[i].options.length) {
                                $scope.surveyQuestions[i].options[j] = {"optionVal": $scope.surveyQuestions[i].options[j], "optionStatus": false};
                            }

                        }

                    }

                }
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.getSurveyDetail();
    $scope.clearSubmittedSurvey = function (path) {
        for (i = 0; i < $scope.surveyQuestions.length; i++) {
            if ($scope.surveyQuestions[i].options && $scope.surveyQuestions[i].survey_type == "radio") {

                $scope.surveyQuestions[i].radioAns = false;

            }
            else if ($scope.surveyQuestions[i].options && $scope.surveyQuestions[i].survey_type == "checkbox") {
                for (j = 0; j < $scope.surveyQuestions[i].options.length; j++) {
                    $scope.surveyQuestions[i].options[j].optionStatus = false;
                }
            }
            else {
                $scope.surveyQuestions[i].answer = "";
            }
        }
        window.location.href = "#!/" + path;
    }
});

cstore.controller('paymentCtrl', function ($scope, $appService) {
    $appService.auth();
    $scope.cartdata = {"total": 0.00, "subtotal": 0.00, "shipping_charges": 0.00};
    $scope.getPayment = function () {
        var paymentId = $scope.getURLParam("id");
        if (!paymentId) {
            return;
        }
        $scope.loadingStatus = true;
        var query = {"table": "shopping_cart__cstore"};
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid", "bill_address", "shipping_address", "same_shipping_address"];
        query.filter = {"_id": paymentId};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartResp) {
            $scope.loadingStatus = false;
            var cartData = cartResp.response.data[0];
            $scope.cartdata.total = (cartData.total && cartData.total.amount) ? cartData.total.amount : 0.00;
            $scope.cartdata.subtotal = (cartData.sub_total) ? cartData.sub_total : 0.00;
            $scope.cartdata.shipping_charges = (cartData.shipping_charges && cartData.shipping_charges.amount) ? cartData.shipping_charges.amount : 0.00;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })

    }
    $scope.getPayment();
});

/********************************************* Program 14/05**********************************************************/
cstore.controller('programList', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingProgramData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "Program Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.programs = [];
    $appService.auth();
    $scope.getAllPrograms = function (direction, limit, column, searchText) {
        if ($scope.loadingProgramData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingProgramData = true;

        var query = {"table": "program__cstore"};
        query.columns = ["name", "image"];

        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.loadingProgramData = false;
            $scope.show.currentCursor = programData.response.cursor;
            $scope.programs = programData.response.data;
            for (var i = 0; i < $scope.programs.length; i++) {
                $scope.programs[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllPrograms(1, 10);
    $scope.setProgramOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllPrograms(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllPrograms(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllPrograms(0, 10, column, searchText);
    }
});

cstore.controller('addProgramCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var programId = $routeParams.q;
    if (programId && programId != undefined && programId != "undefined") {
        $scope.programdata["programid"] = programId;
    }
    else {
        delete $scope.programdata["programid"];
    }
});

/************************************ Order List For Store Manager*************************************/
cstore.controller('orderListCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingOrderData = false;
    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            $scope.venderSearch = [
                {"value": "status", "name": "Status"}
            ];
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.venderSearch = [
                {"value": "status", "name": "Status"},
                {"value": "userid.storeid.storename", "name": "Site Name"}
            ];
        }
    }
    $scope.searchby = $scope.venderSearch[0];
    $scope.orders = {};
    $appService.auth();
    $scope.getAllOrders = function (direction, limit, column, searchText) {
        if ($scope.loadingOrderData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingOrderData = true;

        var query = {"table": "orders__cstore"};
        query.columns = ["userid", "userid.storeid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY HH:mm"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                query.filter["userid.storeid._id"] = $scope.currentUser["data"]["storeid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (orderData) {
            $scope.loadingOrderData = false;
            $scope.show.currentCursor = orderData.response.cursor;
            $scope.orders = orderData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllOrders(1, 10);
    $scope.sortOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllOrders(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllOrders(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllOrders(0, 10, column, searchText);
    }
});
/**************************Order Detail*******************************/
cstore.controller('orderDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getOrderDetail = function () {
        var orderid = $scope.getURLParam("orderid");
        if (!orderid || $scope.loadingStatus) {
            return
        }
        $scope.loadingStatus = true;
        var query = {"table": "orders__cstore"};
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid", "bill_address", "shipping_address", "same_shipping_address"];
        query.filter = {};
        query.filter["_id"] = $routeParams.orderid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {
            $scope.orderData = cartData.response.data[0];
            if (cartData.response.data && cartData.response.data.length) {
                $scope.orderedProducts = cartData.response.data[0].product;
                $scope.savedOrderBillingAddress = cartData.response.data[0].bill_address;
                $scope.savedOrderShippingAddress = cartData.response.data[0].shipping_address;
                if (cartData.response.data[0].userid.storeid) {
                    var storequery = {"table": "storemanagers__cstore"};
                    storequery.columns = ["programid", "manager.name"];
                    storequery.filter = {};
                    storequery.filter["_id"] = cartData.response.data[0].userid.storeid._id;
                    var queryParams = {query: JSON.stringify(storequery), "ask": ASK, "osk": OSK};
                    var serviceUrl = "/rest/data";
                    $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (savedAddressData) {
                        $scope.loadingStatus = false;
                        $scope.savedAddressData = savedAddressData.response.data[0];
                    }, function (jqxhr, error) {
                        $("#popupMessage").html(error);
                        $('.popup').toggle("slide");
                    })
                }
            } else {
                $scope.loadingStatus = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getOrderDetail();
});
