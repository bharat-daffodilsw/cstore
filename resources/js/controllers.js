var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";
var VENDOR = "vendors";
var DEFAULTCOUNTRY = "531d3e9b8826fc304706a460"; //united states

// Declare app level module which depends on filters, and services
//changed by anuradha 2804
var cstore = angular.module('cstore', ['multi-select','ngRoute', '$appstrap.services']);
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
            .when('/trainings', {
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
            }).when('/all-trainings', {
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
                templateUrl: '../surveydetail',
                controller: 'surveyDetailCtrl'
            })/*.when('/survey', {
                templateUrl: '../surveydetail',
                controller: 'surveyDetailCtrl'
            })*/.when('/payment', {
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
            }).when('/assign-promo', {
                templateUrl: '../assign-promo',
                controller: 'assignPromoCtrl'	
            }).when('/contact-us',{
                templateUrl:'../contact-us',
                controller:'contactPageCtrl'
            }).when('/terms-conditions',{
                templateUrl:'../terms-privacy'
            }).when('/print-preview',{
                templateUrl:'../print-preview',
                controller:'printPreviewOrderCtrl'
            }).when('/promo-notification',{
                templateUrl:'../promo-notification',
                controller:'promoNotificationCtrl'
            }).when('/files',{
                templateUrl:'../files',
                controller:'fileCtrl'
            }).when('/add-file', {
                templateUrl: '../add-file',
                controller: 'addFileCtrl'
            }).when('/edit-file', {
                templateUrl: '../add-file',
                controller: 'addFileCtrl'
            }).when('/all-files', {
                templateUrl: '../all-files',
                controller: 'allFilesCtrl'
            }).when('/file', {
                templateUrl: '../filedetail',
                controller: 'fileDetailCtrl'
            }).when('/vendor-report', {
                templateUrl: '../vendor-report',
                controller: 'vendorReportCtrl'
            }).when('/site-info-report', {
                templateUrl: '../site-info-report',
                controller: 'siteInfoReportCtrl'
            }).when('/order-report', {
                templateUrl: '../order-report',
                controller: 'orderReportCtrl'
            })
            .otherwise(
//            {"redirectTo":"/login.html"}
            );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location, $http) {
    $scope.currentUser = {"data": ""};
    $scope.notification={};
    $scope.search = {"searchContent": ""};
    $scope.cartProducts = {"length": ""};
    $scope.orderFilterData={"start_date":"","end_date":""};
	$scope.filterdata={"programs":"","selectedProgram":"","states":[],"selectedState":"","status":[],"selectedStatus":"","sites":[],"selectedSite":""};
    $scope.download={"orders":[]};
    $scope.currentLoc = {"data": ""};
    $scope.currentLoc["data"] = $appService.getLocation();
    $scope.file = {};
    $scope.oFile = {};
    $scope.oFile.fileExist = false;
    $scope.readonlyrow = {};
    $scope.row = {};
    $scope.colmetadata = {"expression": "postfile", "type": "file"};
    var FILE_KEY = 'key';
    $scope.loadingstatus = false;
    $scope.coolerfile = {};
    $scope.coolerOFile = {};
    $scope.coolerOFile.fileExist = false;
    $scope.readonlycoolerrow = {};
    $scope.coolerrow = {};
    $scope.colmetacoolerdata = {"expression": "postfile", "type": "file"};
    $scope.aislefile = {};
    $scope.aisleOFile = {};
    $scope.aisleOFile.fileExist = false;
    $scope.readonlyaislerow = {};
    $scope.aislerow = {};
    $scope.colmetaaisledata = {"expression": "postfile", "type": "file"};
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
    $scope.filedata={"uploadedimages": [],"selectedProgram":"","programs":[]};
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
    $scope.filterdata.status = [
        {"name": "In Progress"},
        {"name": "Delivered"},
        {"name":"Cancelled"}
    ];
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
    $scope.allAssignedSurveys = [];
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
        $scope.productdata.selectedProgram = $scope.productdata.programs[0];
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
    $scope.showCoolerFile = function (coolerFile, updateScope) {
        if (updateScope) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(coolerFile[0].name)) {
                $scope.readonlycoolerrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + coolerFile[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
                $scope.readonlycoolerrow.fileType = "imagefile";
                $scope.readonlycoolerrow.filenotexist = false;
                $scope.readonlycoolerrow.imgWidth = 75;
                $scope.readonlycoolerrow.imgHeight = 75;
            }
            else {
                $scope.readonlycoolerrow.filenotexist = true;
                $scope.popuptext = "Please Upload Image File only";
                $('#pop_forgt').toggle("slide");
            }
            $scope.coolerrow[$scope.colmetacoolerdata.expression] = coolerFile;
        }
        else if (coolerFile && coolerFile.length > 0) {
            $scope.readonlycoolerrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + coolerFile[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
            $scope.readonlycoolerrow.fileType = "imagefile";
            $scope.readonlycoolerrow.filenotexist = false;
            $scope.readonlycoolerrow.imgWidth = 75;
            $scope.readonlycoolerrow.imgHeight = 75;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.showAisleFile = function (aisleFile, updateScope) {
        if (updateScope) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(aisleFile[0].name)) {
                $scope.readonlyaislerow.fileurl = BAAS_SERVER + "/file/render?filekey=" + aisleFile[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
                $scope.readonlyaislerow.fileType = "imagefile";
                $scope.readonlyaislerow.filenotexist = false;
                $scope.readonlyaislerow.imgWidth = 75;
                $scope.readonlyaislerow.imgHeight = 75;
            }
            else {
                $scope.readonlyaislerow.filenotexist = true;
                $scope.popuptext = "Please Upload Image File only";
                $('#pop_forgt').toggle("slide");
            }
            $scope.aislerow[$scope.colmetaaisledata.expression] = aisleFile;
        }
        else if (aisleFile && aisleFile.length > 0) {
            $scope.readonlyaislerow.fileurl = BAAS_SERVER + "/file/render?filekey=" + aisleFile[0][FILE_KEY] + "&ask=" + ASK + "&osk=" + OSK;
            $scope.readonlyaislerow.fileType = "imagefile";
            $scope.readonlyaislerow.filenotexist = false;
            $scope.readonlyaislerow.imgWidth = 75;
            $scope.readonlyaislerow.imgHeight = 75;
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
			$scope.filterdata.sites = storeData.response.data;
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
        $scope.promotiondata["minimum_retail"] = "";
        $scope.promotiondata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
        $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
        $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[0];
        $scope.promotiondata.codes = [];
        $scope.promotiondata["top_promo"] = false;
        $scope.oFile.fileExist = false;
        $scope.getPrograms(null,null);
        $scope.clearPromotionNotificationContent();
    }
    $scope.clearTrainingSessionContent = function () {
        $scope.trainingdata["title"] = "";
        $scope.trainingdata["description"] = "";
        $scope.trainingdata["video_url"] = "";
        $scope.trainingdata["file"] = "";
        $scope.trainingdata["uploadedimages"] = [];
        $scope.trainingdata["editImages"] = [];
        $scope.trainingdata.selectedTrainingCategory = $scope.trainingdata.trainingCategories[0];
        $scope.getProgramsForTraining(null,null);
    }
    $scope.clearSurveyContent = function () {
        $scope.surveydata["title"] = "";
        $scope.surveydata["description"] = "";
        $scope.questions = [
            {"optionArr": [], "question": "", "type": $scope.listType[0], "addOption": true}
        ];
        $scope.getProgramsForSurvey(null,null);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.setPath('surveys');
    }
    $scope.clearProgramContent = function () {
        $scope.programdata["name"] = "";
        $scope.programdata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.oFile.fileExist = false;
        $scope.programdata["cooler_template"] = "";
        $scope.readonlycoolerrow.fileurl = "";
        $scope.coolerOFile.fileExist = false;
        $scope.programdata["aisle_template"] = "";
        $scope.readonlyaislerow.fileurl = "";
        $scope.aisleOFile.fileExist = false;
    }
    $scope.clearOrderContent = function () {
        $scope.orderFilterData.start_date = "";
        $scope.orderFilterData.end_date="";
    }
    $scope.clearPromotionNotificationContent = function () {
        $scope.notification.subject="";
        $scope.notification.mail_content="";
    }
    $scope.clearFileContent = function () {
        $scope.filedata["title"] = "";
        $scope.filedata["file"] = "";
        $scope.getProgramsForFiles(null,null);
        $scope.filedata["uploadedimages"] = [];
        $scope.filedata["editImages"] = [];
    }

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
    $scope.addCart={"pop":{},"quantity":""};
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
    $scope.showCartPopup=function(product,quantity){
        $("#popupMessage2").html("Please confirm Add to Card on this item");
        $('.popup2').toggle("slide");
        $scope.addCart.pop=product;
        $scope.addCart.quantity=quantity;
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
                $scope.shipping_charges = (cartData.response.data[0].shipping_charges && cartData.response.data[0].shipping_charges.amount) ? cartData.shipping_charges.amount : "Free";
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
			$scope.filterdata.programs = programData.response.data;
            //$scope.filterdata.selectedProgram = $scope.filterdata.programs[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
	$scope.getStateListForFilter = function () {
        var query = {"table": "states__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {            
			$scope.filterdata.states = stateData.response.data;            
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    /****************multiSelectStoreFor Promotion*********************/
    $scope.getPrograms = function (programid,promotionid) {
        var query = {"table": "program__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.promotiondata.programs = programData.response.data;
            if(programid || promotionid){
                for( var i = 0; i< $scope.promotiondata.programs.length;i++){
                    if($scope.promotiondata.programs[i]._id==programid){
                        $scope.promotiondata.selectedProgram = $scope.promotiondata.programs[i];
                        break;
                    }
                }
                $scope.getProgramSelectedStore(programid,promotionid);
            }
            else {
                $scope.promotiondata.selectedProgram = $scope.promotiondata.programs[0];
                $scope.getProgramSelectedStore($scope.promotiondata.programs[0]._id,null);
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProgramSelectedStore = function (programid,promotionid) {
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        query.filter.roleid = STOREMANAGER;
        if(programid){
            query.filter["storeid.programid._id"] = programid;
        }
        query.orders = {"storeid.storename": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.promotiondata.stores = storeData.response.data;
            var promoQuery = {"table": "promotions__cstore"};
            promoQuery.columns = ["store_manager_id"];
            promoQuery.filter = {"_id": promotionid};
            var promoQueryParams = {query: JSON.stringify(promoQuery), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, promoQueryParams, "GET", "JSON", function (storePromoData) {
                for(var j =0;j <$scope.promotiondata.stores.length;j++){
                    if (storePromoData.response.data && storePromoData.response.data.length > 0 && storePromoData.response.data[0].store_manager_id && storePromoData.response.data[0].store_manager_id.length) {
                        $scope.assignedStoreManagers = storePromoData.response.data[0].store_manager_id;
                        for (var k = 0; k < $scope.assignedStoreManagers.length; k++) {
                            if ($scope.promotiondata.stores[j].storeid._id == $scope.assignedStoreManagers[k]._id) {
                                $scope.promotiondata.stores[j].ticked=true;
                            }
                            //else {
                            //    $scope.promotiondata.stores[j].ticked=false;
                            //}
                        }
                    }
                    else{
                        $scope.promotiondata.stores[j].ticked=false;
                    }
                    $scope.promotiondata.stores[j].siteName=$scope.promotiondata.stores[j].storeid.storename;
                 }
                console.log($scope.promotiondata.stores);
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            });
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    /************************multiSelectStoreForTraining**********************************************/
    $scope.getProgramsForTraining = function (programid,trainingid) {
        var query = {"table": "program__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.trainingdata.programs = programData.response.data;
            if(programid || trainingid){
                for( var i = 0; i< $scope.trainingdata.programs.length;i++){
                    if($scope.trainingdata.programs[i]._id==programid){
                        $scope.trainingdata.selectedProgram = $scope.trainingdata.programs[i];
                        break;
                    }
                }
                $scope.getProgramSelectedStoreForTraining(programid,trainingid);
            }
            else {
                $scope.trainingdata.selectedProgram = $scope.trainingdata.programs[0];
                $scope.getProgramSelectedStoreForTraining($scope.trainingdata.programs[0]._id,null);
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProgramSelectedStoreForTraining = function (programid,trainingid) {
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        query.filter.roleid = STOREMANAGER;
        if(programid){
            query.filter["storeid.programid._id"] = programid;
        }
        query.orders = {"storeid.storename": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.trainingdata.stores = storeData.response.data;
            var promoQuery = {"table": "training_session__cstore"};
            promoQuery.columns = ["store_manager_id"];
            promoQuery.filter = {"_id": trainingid};
            var promoQueryParams = {query: JSON.stringify(promoQuery), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, promoQueryParams, "GET", "JSON", function (storeTrainingData) {
                for(var j =0;j <$scope.trainingdata.stores.length;j++){
                    if (storeTrainingData.response.data && storeTrainingData.response.data.length > 0 && storeTrainingData.response.data[0].store_manager_id && storeTrainingData.response.data[0].store_manager_id.length) {
                        $scope.trainingAssignedStoreManagers = storeTrainingData.response.data[0].store_manager_id;
                        for (var k = 0; k < $scope.trainingAssignedStoreManagers.length; k++) {
                            if ($scope.trainingdata.stores[j].storeid._id == $scope.trainingAssignedStoreManagers[k]._id) {
                                $scope.trainingdata.stores[j].ticked=true;
                            }
                            //else {
                            //    $scope.promotiondata.stores[j].ticked=false;
                            //}
                        }
                    }
                    else{
                        $scope.trainingdata.stores[j].ticked=false;
                    }
                    $scope.trainingdata.stores[j].siteName=$scope.trainingdata.stores[j].storeid.storename;
                }
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            });
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    /************************multiSelectStoreForSurvey**********************************************/
    $scope.getProgramsForSurvey = function (programid,surveyid) {
        var query = {"table": "program__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.surveydata.programs = programData.response.data;
            if(programid || surveyid){
                for( var i = 0; i< $scope.surveydata.programs.length;i++){
                    if($scope.surveydata.programs[i]._id==programid){
                        $scope.surveydata.selectedProgram = $scope.surveydata.programs[i];
                        break;
                    }
                }
                $scope.getProgramSelectedStoreForSurvey(programid,surveyid);
            }
            else {
                $scope.surveydata.selectedProgram = $scope.surveydata.programs[0];
                $scope.getProgramSelectedStoreForSurvey($scope.surveydata.programs[0]._id,null);
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProgramSelectedStoreForSurvey = function (programid,surveyid) {
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        query.filter.roleid = STOREMANAGER;
        if(programid){
            query.filter["storeid.programid._id"] = programid;
        }
        query.orders = {"storeid.storename": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.surveydata.stores = storeData.response.data;
            var promoQuery = {"table": "surveys__cstore"};
            promoQuery.columns = ["store_manager_id"];
            promoQuery.filter = {"_id": surveyid};
            var promoQueryParams = {query: JSON.stringify(promoQuery), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, promoQueryParams, "GET", "JSON", function (storeSurveyData) {
                for(var j =0;j <$scope.surveydata.stores.length;j++){
                    if (storeSurveyData.response.data && storeSurveyData.response.data.length > 0 && storeSurveyData.response.data[0].store_manager_id && storeSurveyData.response.data[0].store_manager_id.length) {
                        $scope.surveyAssignedStoreManagers = storeSurveyData.response.data[0].store_manager_id;
                        for (var k = 0; k < $scope.surveyAssignedStoreManagers.length; k++) {
                            if ($scope.surveydata.stores[j].storeid._id == $scope.surveyAssignedStoreManagers[k]._id) {
                                $scope.surveydata.stores[j].ticked=true;
                            }
                            //else {
                            //    $scope.promotiondata.stores[j].ticked=false;
                            //}
                        }
                    }
                    else{
                        $scope.surveydata.stores[j].ticked=false;
                    }
                    $scope.surveydata.stores[j].siteName=$scope.surveydata.stores[j].storeid.storename;
                }
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            });
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    /********************************multiSelectStoreForFiles*********************************************************/
    $scope.getProgramsForFiles = function (programid,fileid) {
        var query = {"table": "program__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.filedata.programs = programData.response.data;
            if(programid || fileid){
                for( var i = 0; i< $scope.filedata.programs.length;i++){
                    if($scope.filedata.programs[i]._id==programid){
                        $scope.filedata.selectedProgram = $scope.filedata.programs[i];
                        break;
                    }
                }
                $scope.getProgramSelectedStoreForFiles(programid,fileid);
            }
            else {
                $scope.filedata.selectedProgram = $scope.filedata.programs[0];
                $scope.getProgramSelectedStoreForFiles($scope.filedata.programs[0]._id,null);
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProgramSelectedStoreForFiles = function (programid,trainingid) {
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        query.filter.roleid = STOREMANAGER;
        if(programid){
            query.filter["storeid.programid._id"] = programid;
        }
        query.orders = {"storeid.storename": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.filedata.stores = storeData.response.data;
            var promoQuery = {"table": "file__cstore"};
            promoQuery.columns = ["store_manager_id"];
            promoQuery.filter = {"_id": trainingid};
            var promoQueryParams = {query: JSON.stringify(promoQuery), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, promoQueryParams, "GET", "JSON", function (storeFileData) {
                for(var j =0;j <$scope.filedata.stores.length;j++){
                    if (storeFileData.response.data && storeFileData.response.data.length > 0 && storeFileData.response.data[0].store_manager_id && storeFileData.response.data[0].store_manager_id.length) {
                        $scope.fileAssignedStoreManagers = storeFileData.response.data[0].store_manager_id;
                        for (var k = 0; k < $scope.fileAssignedStoreManagers.length; k++) {
                            if ($scope.filedata.stores[j].storeid._id == $scope.fileAssignedStoreManagers[k]._id) {
                                $scope.filedata.stores[j].ticked=true;
                            }
                        }
                    }
                    else{
                        $scope.filedata.stores[j].ticked=false;
                    }
                    $scope.filedata.stores[j].siteName=$scope.filedata.stores[j].storeid.storename;
                }
            }, function (jqxhr, error) {
                $("#popupMessage").html(error);
                $('.popup').toggle("slide");
            });
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

        query.columns = ["name", "image", "short_description", "cost", "soldcount","product_category"];
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
        query.columns = [{"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},{"expression": "end_date", "format": "MM/DD/YYYY HH:mm"}, "image", "promo_title","store_manager_id","promo_description","threshold","reward_value"];
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
            //$scope.getCarouselPromotions(4);
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
    $scope.allProductData = {"loadingData": false, "available": false};

    $scope.allproducts = [];
    $scope.getProductList = function (cursor, searchText) {
        if ($scope.allProductData.loadingData) {
            return false;
        }
        $scope.allProductData.loadingData = true;
        var query = {"table": "products__cstore"};
        query.columns = ["name", "image", "short_description", "cost","product_category"];
        query.filter = {};
        query.filter["programid._id"] = $scope.currentUser.data.programid;

        if (searchText && searchText != "") {
            query.filter["name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"product_category.name": "asc"};
        query.max_rows = 8;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            var rawProductData = $appService.setUrls(productData.response.data, 291, 196);
            if ($scope.allproducts.length) {
                for (var i = 0; i < rawProductData.length; i++) {
                    $scope.allproducts.push(rawProductData[i]);
                }
            }
            if (!$scope.allproducts.length) {
                $scope.allproducts = rawProductData;

            }
            $scope.allProductData.loadingData = false;
            $scope.cursor = productData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getProductList($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialProductData = function (cursor) {
        $scope.getProductList(cursor, $routeParams.search);
    };
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
    $scope.testSortingCol="";
    $scope.venderSearch = [
        {"value": "firstname", "name": "Name"},
        {"value": "address", "name": "Address"},
        {"value": "city.name", "name": "City"},
        {"value": "state.name", "name": "State"},
        {"value": "email", "name": "Email"},
        {"value": "programid.name", "name": "Program"},
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
        query.columns = ["address2","programid", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode", "category"];

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
    $scope.getProgramList();
    $scope.getExportVendors = function (column,searchText,sortingCol,sortingType) {
        var query = {"table": "vendors__cstore"};
        query.columns = ["firstname","lastname",{"expression": "programid", "columns": ["_id", "name"]},"email","address","address2",{"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]},"category",{"expression":"postalcode", "type":"number"},"contact"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if (sortingCol && sortingType) {
            query.orders[sortingCol] = sortingType;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/excelexport";
        var tempUrl=serviceUrl+"?query="+JSON.stringify(query)+"&ask="+ASK+"&osk="+OSK;
        window.open(tempUrl,'_blank', 'width=300,height=300');
        //$appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
        //    console.log("done");
        //}, function (jqxhr, error) {
        //    $("#popupMessage").html(error);
        //    $('.popup').toggle("slide");
        //})
    }
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
        {"value": "siteid", "name": "Site Id"},
        {"value": "storename", "name": "Site Name"},
        {"value": "programid.name", "name": "Program"},
        {"value": "manager.name", "name": "Manager Name"},
        {"value": "shift", "name": "Manager Shift"},
        {"value": "contact", "name": "Site Phone"},
        {"value": "manager.contact", "name": "Manager Phone"},
        {"value": "email", "name": "Email"},
        {"value": "manager.email", "name": "Manager Email"},
        {"value": "address", "name": "Address"},
        {"value": "countryid.name", "name": "Country"},
        {"value": "stateid.name", "name": "State"},
        {"value": "cityid.name", "name": "City"},
        {"value": "postalcode", "name": "Postal Code"},
        {"value": "pos_type", "name": "POS Type"},
        {"value": "pos_version", "name": "POS Version"},
        {"value": "loyalty_status", "name": "Loyalty Status"},
        {"value": "reward_point", "name": "Reward Type"},
        {"value": "brands", "name": "Brand"},
        {"value": "pump_brand", "name": "Pump Brand"},
        {"value": "pump_model", "name": "Pump Model"},
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
    $scope.getExportSites = function (column,searchText,sortingCol,sortingType) {
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["siteid","storename",{"expression": "programid", "columns": ["_id", "name"]},"shift","contact","email","address",{"expression": "countryid", "columns": ["_id", "name"]},{"expression": "stateid", "columns": ["_id", "name"]},{"expression": "cityid", "columns": ["_id", "name"]},{"expression":"postalcode","type":"number"},"pos_type","pos_version","loyalty_status","reward_point","brands","pump_brand","pump_model",{"expression":"manager","columns":["_id","name"]}];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if (sortingCol && sortingType) {
            query.orders[sortingCol] = sortingType;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/excelexport";
        var tempUrl=serviceUrl+"?query="+JSON.stringify(query)+"&ask="+ASK+"&osk="+OSK;
        window.open(tempUrl,'_blank', 'width=300,height=300');
        //$appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
        //    console.log("done");
        //}, function (jqxhr, error) {
        //    $("#popupMessage").html(error);
        //    $('.popup').toggle("slide");
        //})
    }
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
        {"value": "programid.name", "name": "Program"},
        {"value": "offer_type", "name": "Offer Type"},
        {"value": "item_signage", "name": "Item Signage"},
        {"value": "start_date", "name": "Start Date"},
        {"value": "end_date", "name": "End Date"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.promotions = [];
    $appService.auth();
    $scope.getAllPromotions = function (direction, limit, column, searchText,filterDate) {
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
            "codes",
            "programid",
            "minimum_retail"
        ];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (filterDate && filterDate != "") {
            query.filter["start_date"] ={"$lte": new Date(filterDate)};
            query.filter["end_date"] = {"$gte": new Date(filterDate)};
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
    $scope.setPromotionOrder = function (sortingCol, sortingType, column, searchText,filterDate) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllPromotions(1, 10, column, searchText,filterDate);
    }
    $scope.getMore = function (column, searchText,filterDate) {
        $scope.getAllPromotions(1, 10, column, searchText,filterDate);
    }
    $scope.getLess = function (column, searchText,filterDate) {
        $scope.getAllPromotions(0, 10, column, searchText,filterDate);
    }
    $scope.getPrograms(null,null);
});

cstore.controller('addPromotionCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
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
        {"value": "programid.name", "name": "Program"},
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
        query.columns = ["title", "description", "file", "training_category_id", "video_url","programid"];
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
    $scope.getProgramsForTraining(null,null);
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
cstore.controller('assignTrainingCtrl', function ($scope, $appService,$routeParams) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [
        {"value": "storeid.storename", "name": "Store Name"},
        {"value": "storeid.programid.name", "name": "Program"}
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
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
		query.filter.roleid = STOREMANAGER;
        query.filter["storeid.programid._id"] = $routeParams.programid;
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
                                if ($scope.storesName[i].storeid._id == $scope.storeManager[j]._id) {
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
        {"value": "programid.name", "name": "Program"},
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
        query.columns = ["title", "description", "survey_question", "survey_question.question", "survey_question.options","programid"];
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
    //$scope.getStores();
    $scope.getProgramsForSurvey(null,null);
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

/************************************ Assign Survey *****************************************************/
cstore.controller('assignSurveyCtrl', function ($scope, $appService,$routeParams) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [
        {"value": "storeid.storename", "name": "Store Name"},
        {"value": "storeid.programid.name", "name": "Program"}
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
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
		query.filter.roleid = STOREMANAGER;
        query.filter["storeid.programid._id"] = $routeParams.programid;
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
                                if ($scope.storesName[i].storeid._id == $scope.storeManager[j]._id) {
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
});/************************************ Assign Promo *****************************************************/
cstore.controller('assignPromoCtrl', function ($scope, $appService,$routeParams) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.assignStore={} ;
    $scope.assignStore.master=0;
    //$scope.storesName=[{"assigned":false}];
    $scope.venderSearch = [
        {"value": "storeid.storename", "name": "Store Name"},
        {"value": "storeid.programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.getPromoStoresName = function (direction, limit, column, searchText) {
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
        var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id","storeid","storeid.programid","userid"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
		query.filter.roleid = STOREMANAGER;
          console.log($routeParams.programid);
        //query.filter["storeid.programid._id"] = $routeParams.programid;
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
                $scope.promoId = $routeParams.id;
                if (!$scope.promoId) {
                    return;
                }
                var query = {"table": "promotions__cstore"};
                query.columns = ["store_manager_id"];
                query.filter = {"_id": $scope.promoId};
                query.orders = {"storename": "asc"};
                var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                var serviceUrl = "/rest/data";
                $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeSurveyData) {
                    $scope.loadingStatus = false;
                    for (i = 0; i < $scope.storesName.length; i++) {
                        if (storeSurveyData.response.data && storeSurveyData.response.data.length > 0 && storeSurveyData.response.data[0].store_manager_id && storeSurveyData.response.data[0].store_manager_id.length) {
                            $scope.storeManager = storeSurveyData.response.data[0].store_manager_id;
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[i].storeid._id == $scope.storeManager[j]._id) {
                                    $scope.storesName[i].assigned = true;
                                }
                            }
                            if (!$scope.storesName[i].assigned) {
                                $scope.storesName[i].assigned = false;
                            }

                        }
                        else {
                            $scope.storesName[i].assigned = false;
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
    $scope.getPromoStoresName(1, 3);
    $scope.setPromoStoreNameOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getPromoStoresName(1, 3, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getPromoStoresName(1, 3, column, searchText);
        console.log($scope.assignStore.master);
        $scope.assignStore.master = false;
    }
    $scope.getLess = function (column, searchText) {
        $scope.getPromoStoresName(0, 3, column, searchText);
        console.log($scope.assignStore.master);
        if($scope.assignStore.master == true){
            for (i = 0; i < $scope.storesName.length; i++) {
                $scope.storesName[i].assigned = true;
            }
            $scope.assignStore.master = true;
        }
        else {
            $scope.assignStore.master = false;
        }
    }
    console.log($scope);
});

/************************************ Answered Survey Store *****************************************************/
cstore.controller('answeredStoreCtrl', function ($scope, $appService) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [

        {"value": "store_id.storename", "name": "Site Name"},
        {"value": "store_id.programid.name", "name": "Program"}

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
        query.columns = [ "_id", "store_id", "survey_id", "answers","store_id.programid"];
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
        query.columns = [{"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},{"expression": "end_date", "format": "MM/DD/YYYY HH:mm"}, "image", "promo_title","store_manager_id","promo_description","threshold","reward_value"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.unwindcolumns={"store_manager_id":1};
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
            if ($scope.promotions.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.promotions.push(rawData[i]);
                }
            }
            if (!$scope.promotions.length) {
                $scope.promotions = rawData;

            }
            for (var k = 0; k < $scope.promotions.length; k++) {
                $scope.promotions[k]["optStatus"] = false;
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
            "store_manager_id",
            "threshold",
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm"},
            "offer_title",
            "reward_value",
            "offer_description",
            "sponsor",
            "vendorid",
            "item_signage",
            "minimum_retail",
            "upc",
            "offer_type"
        ];
        query.filter = {"_id": $routeParams.promoid};
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionDetailData) {
            $scope.loadingPromotionDetailData = false;
            $scope.promotion = $appService.setUrls(promotionDetailData.response.data, 550, 350);
            $scope.assignedStoreManagers=promotionDetailData.response.data[0].store_manager_id;
            for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                    $scope.booleanOpt = $scope.assignedStoreManagers[i].opt;
                    $scope.storeManagerId=$scope.assignedStoreManagers[i]._id;
                }
            }
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
    $scope.allTrainingData = {"loadingData": false, "available": false};

    $scope.allTrainings = [];
    $scope.getTrainingList = function (cursor, searchText) {
        if ($scope.allTrainingData.loadingData) {
            return false;
        }
        $scope.allTrainingData.loadingData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "title", "description"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        if (searchText && searchText != "") {
            query.filter["promo_title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"training_category.name": "asc"};
        query.max_rows = 8;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingData) {
            var rawTrainingData = trainingData.response.data;
            if ($scope.allTrainings.length) {
                for (var i = 0; i < rawTrainingData.length; i++) {
                    $scope.allTrainings.push(rawTrainingData[i]);
                }
            }
            if (!$scope.allTrainings.length) {
                $scope.allTrainings = rawTrainingData;

            }
            $scope.allTrainingData.loadingData = false;
            $scope.cursor = trainingData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getTrainingList($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialTrainingData = function (cursor) {
        $scope.getTrainingList(cursor, $routeParams.search);
    };
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
    $scope.getAllAssignedSurveys = function (cursor, searchText) {
        if ($scope.assignedSurveyData.loadingData) {
            return false;
        }
        $scope.assignedSurveyData.loadingData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["store_manager_id", "title", "description","survey_question"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.filter["store_manager_id.status"] = "unanswered";
        query.unwindcolumns={"store_manager_id":1};
        if (searchText && searchText != "") {
            query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (assignedSurveyData) {
            var rawData = assignedSurveyData.response.data;
            if ($scope.allAssignedSurveys.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.assignedSurveys.push(rawData[i]);
                }
            }
            if (!$scope.allAssignedSurveys.length) {
                $scope.allAssignedSurveys = rawData;
            }
            $scope.assignedSurveyData.loadingData = false;
            $scope.cursor = assignedSurveyData.response.cursor;
            if ($scope.allAssignedSurveys.length) {
                $scope.allAssignedSurveys.available = "true";
            }
            else {
                $scope.allAssignedSurveys.available = "false";
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
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.filter["store_manager_id.status"] = "unanswered";
        query.unwindcolumns={"store_manager_id":1};
        //query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid, "_id": $routeParams.surveyid};
        //if (searchText && searchText != "") {
        //    query.filter["training_session_id.file.name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        //}
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyDetailData) {
            $scope.loadingSurveyDetailData = false;
            $scope.surveys = surveyDetailData.response.data;
            for(var i=0; i < $scope.surveys.length; i++){
                $scope.surveys[i].surveyAssignedStores=surveyDetailData.response.data[i].store_manager_id;
                console.log(JSON.stringify($scope.surveys[i].surveyAssignedStores));
                $scope.surveys[i].surveyQuestions=surveyDetailData.response.data[i].survey_question;
                if ($scope.surveys[i].surveyQuestions.length > 0) {
                    for (var k = 0; k < $scope.surveys[i].surveyQuestions.length; k++) {
                        if ($scope.surveys[i].surveyQuestions[k].options) {
                            //$scope.surveyQuestions[i].optionArray = $scope.surveyQuestions[i].options;
                            for (var j = 0; j < $scope.surveys[i].surveyQuestions[k].options.length; j++) {

                                if ($scope.surveys[i].surveyQuestions[k].options.length) {
                                    $scope.surveys[i].surveyQuestions[k].options[j] = {"optionVal": $scope.surveys[i].surveyQuestions[k].options[j], "optionStatus": false};
                                }

                            }

                        }

                    }
                }
            }
            //if (surveyDetailData.response.data[0].survey_question) {
            //    $scope.surveyQuestions = surveyDetailData.response.data[0].survey_question;
            //}

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.getSurveyDetail();

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
        query.columns = ["name", "image","cooler_template","aisle_template"];

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
    $scope.status=["In Progress","Cancelled","Delivered"];
    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            $scope.venderSearch = [
                {"value": "status", "name": "Status"}
            ];
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.venderSearch = [
                {"value": "storeid.storename", "name": "Site Name"},
                {"value": "status", "name": "Status"}
            ];
        }
    }
    $scope.searchby = $scope.venderSearch[0];
    $scope.orders = {};
    $appService.auth();
    $scope.getAllOrders = function (direction, limit, column, searchText,orderStartDate,orderEndDate) {
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
        query.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                query.filter["storeid._id"] = $scope.currentUser["data"]["storeid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
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
    $scope.sortOrder = function (sortingCol, sortingType, column, searchText,orderStartDate,orderEndDate) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllOrders(1, 10, column, searchText,orderStartDate,orderEndDate);
    }
    $scope.getMore = function (column, searchText,orderStartDate,orderEndDate) {
        $scope.getAllOrders(1, 10, column, searchText,orderStartDate,orderEndDate);
    }
    $scope.getLess = function (column, searchText,orderStartDate,orderEndDate) {
        $scope.getAllOrders(0, 10, column, searchText,orderStartDate,orderEndDate);
    }

    $scope.exportFunction=function(){
        tableToExcel('testTable', 'Order List Table');
    }
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myclone = $("#testTable").clone();
                myclone.find( "tr > th:last-child" ).remove();
                myclone.find( "tr > td:last-child" ).remove();
                var html=myclone.html();
                //console.log(myclone.html());
                //console.log(table.innerHTML);
            }
            var ctx = {worksheet: name || 'Worksheet', table: html}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
    $scope.getExportOrders = function (column,searchText,sortingCol,sortingType,orderStartDate,orderEndDate) {

        var query = {"table": "orders__cstore"};
        query.columns = [{"expression":"userid","columns":["_id","username"]},{"expression":"storeid","columns":["_id","storename"]},"status","sub_total",{"expression":"total","type":"currency"},{"expression": "order_date","type":"date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                query.filter["storeid._id"] = $scope.currentUser["data"]["storeid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
        }
        if (sortingCol && sortingType) {
            query.orders = {};
            query.orders[sortingCol] = sortingType;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/excelexport";
        var tempUrl=serviceUrl+"?query="+JSON.stringify(query)+"&ask="+ASK+"&osk="+OSK;
        window.open(tempUrl,'_blank', 'width=300,height=300');
        //$appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
        //    console.log("done");
        //}, function (jqxhr, error) {
        //    $("#popupMessage").html(error);
        //    $('.popup').toggle("slide");
        //})
    }
});

cstore.controller('printPreviewOrderCtrl', function ($scope, $appService) {
    $scope.exportFunction=function(){
       tableToExcel('testTable', 'Order List Table');
    }
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
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
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid","storeid","bill_address", "shipping_address"];
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
                $scope.ordered_shipping_charges = (cartData.response.data[0].shipping_charges && cartData.response.data[0].shipping_charges.amount) ? cartData.shipping_charges.amount : "Free";
                if (cartData.response.data[0].storeid) {
                    var storequery = {"table": "storemanagers__cstore"};
                    storequery.columns = ["programid", "manager.name"];
                    storequery.filter = {};
                    storequery.filter["_id"] = cartData.response.data[0].storeid._id;
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

cstore.controller('contactPageCtrl', function ($scope, $appService) {
    $scope.contact={};
    $scope.loadingAddContactData = false;
    $scope.clearContactContent = function () {
        $scope.contact.name = "";
        $scope.contact.email = "";
        $scope.contact.sitename = "";
        $scope.contact.program = "";
        $scope.contact.phone = "";
        $scope.contact.comment_box = "";
    }
});
cstore.controller('promoNotificationCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getAllAvailableMultipleUsers = function () {
        var query = {"table": "user_profiles__cstore"};
        query.columns = ["username"];
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.userData = userData.response.data;
            for(var i=0;i<$scope.userData.length;i++){
                $scope.userData[i].ticked=false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllAvailableMultipleUsers();
});
/*************************file upload**************************/
cstore.controller('fileCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingFileData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.uploadFiles = [];
    $appService.auth();
    $scope.getAllUploadFiles = function (direction, limit, column, searchText) {
        if ($scope.loadingFileData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingFileData = true;
        var query = {"table": "file__cstore"};
        query.columns = ["title","programid","store_manager_id","file"];
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (fileData) {
            $scope.loadingFileData = false;
            $scope.show.currentCursor = fileData.response.cursor;
            $scope.uploadFiles = fileData.response.data;
            for (var i = 0; i < $scope.uploadFiles.length; i++) {
                $scope.uploadFiles[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllUploadFiles(1, 10);
    $scope.setUploadFileOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllUploadFiles(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllUploadFiles(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllUploadFiles(0, 10, column, searchText);
    }
    $scope.getProgramsForFiles(null,null);
});

cstore.controller('addFileCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();


    var fileId = $routeParams.q;
    if (fileId && fileId != undefined && fileId != "undefined") {
        $scope.filedata["fileId"] = fileId;
    }
    else {
        delete $scope.filedata["fileId"];
    }
})
cstore.controller('allFilesCtrl', function ($scope, $appService, $routeParams) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingDownloadFileData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.downloadFiles = [];
    $appService.auth();
    $scope.getAllFilesList = function (direction, limit, column, searchText) {
        if ($scope.loadingDownloadFileData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingDownloadFileData = true;
        var query = {"table": "file__cstore"};
        query.columns = ["title","programid","store_manager_id","file"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        query.orders["title"]="asc";
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (fileData) {
            $scope.loadingDownloadFileData = false;
            $scope.show.currentCursor = fileData.response.cursor;
            $scope.downloadFiles = fileData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllFilesList(1, 10);
    $scope.setDownloadFileOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllFilesList(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllFilesList(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllFilesList(0, 10, column, searchText);
    }
    $scope.downloadFileLink=function(file){
        if(file) {
            $scope.downloadUrl = BAAS_SERVER + "/file/download?filekey=" + file.key + "&ask=" + ASK + "&osk=" + OSK;
        }
    }
});
/*************************Reports***********************/
cstore.controller('vendorReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingVendorReportData = false;    
    $scope.venderSearch = [
        {"value": "firstname", "name": "Name"},
        {"value": "address", "name": "Address"},
		{"value": "address2", "name": "Address"},
		{"value": "postalcode", "name": "Postal Code"},
        {"value": "city.name", "name": "City"},
		{"value": "country.name", "name": "Country"},
        {"value": "email", "name": "Email"},
		{"value": "category", "name": "Category"},
        {"value": "contact", "name": "Contact"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.vendorReport = [];
    $appService.auth();
    $scope.getAllVendorsReport = function (direction, limit, column, searchText,programFilter,stateFilter) {
        if ($scope.loadingVendorReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingVendorReportData = true;

        var query = {"table": "vendors__cstore"};
        query.columns = ["address2","programid", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode", "category"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (programFilter && programFilter!="") {           
            query.filter["programid._id"] = programFilter._id;
        }
		if (stateFilter && stateFilter!="") {
            query.filter["state._id"] = stateFilter._id;
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorReportData) {
            $scope.loadingVendorReportData = false;
            $scope.show.currentCursor = vendorReportData.response.cursor;
            $scope.vendorReport = vendorReportData.response.data;            

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllVendorsReport(1, 200);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText,programFilter,stateFilter) {
        $scope.show.currentCursor = 0;
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllVendorsReport(1, 200, column, searchText,programFilter,stateFilter);
    }
    $scope.getMore = function (column, searchText,programFilter,stateFilter) {
        $scope.getAllVendorsReport(1, 200, column, searchText,programFilter,stateFilter);
    }
    $scope.getLess = function (column, searchText,programFilter,stateFilter) {
        $scope.getAllVendorsReport(0, 200, column, searchText,programFilter,stateFilter);
    }
    $scope.getProgramList();
	$scope.getStateListForFilter();
    $scope.filterByProgram=function(column, searchText,programFilter,stateFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllVendorsReport(1, 200, column, searchText,programFilter,stateFilter)
    }
	$scope.filterByState=function(column, searchText,programFilter,stateFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllVendorsReport(1, 200, column,searchText,programFilter,stateFilter)
    }
	$scope.exportVendors=function(){
        vendorTableToExcel('vendorTable', 'vendor List');
    }
    var vendorTableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myvendorclone = $("#vendorTable").clone();
                var vendorHtml=myvendorclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: vendorHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()	
});

cstore.controller('siteInfoReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingSiteInfoReportData = false;    
    $scope.venderSearch = [
        {"value": "siteid", "name": "Site Id"},
        {"value": "storename", "name": "Site Name"},
        {"value": "manager.name", "name": "Manager Name"},
        {"value": "contact", "name": "Site Phone"},
        {"value": "manager.contact", "name": "Manager Phone"},
        {"value": "email", "name": "Email"},
        {"value": "manager.email", "name": "Manager Email"},
        {"value": "address", "name": "Address"},
        {"value": "countryid.name", "name": "Country"},
        {"value": "stateid.name", "name": "State"},
        {"value": "cityid.name", "name": "City"},
        {"value": "postalcode", "name": "Postal Code"},
        {"value": "pos_type", "name": "POS Type"},
        {"value": "pos_version", "name": "POS Version"},
        {"value": "loyalty_status", "name": "Loyalty Status"},
        {"value": "reward_point", "name": "Reward Type"},
        {"value": "brands", "name": "Brand"},
        {"value": "pump_brand", "name": "Pump Brand"},
        {"value": "pump_model", "name": "Pump Model"},
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.siteInfoReport = [];
    $appService.auth();
    $scope.getAllSiteInfoReport = function (direction, limit, column, searchText,programFilter,shiftFilter) {
        if ($scope.loadingSiteInfoReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingSiteInfoReportData = true;

        var query = {"table": "storemanagers__cstore"};
        query.columns = ["programid", "siteid", "manager.email", "manager.contact", "manager.name", "address", "cityid", "countryid", "manager", "postalcode", "stateid", "storename", "contact", "email", "brands", "pos_type", "shift", "loyalty_status", "pos_version", "reward_point", "pump_brand", "pump_model", "address2"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (programFilter && programFilter!="") {
            query.filter["programid._id"] = programFilter._id;
        }
        if (shiftFilter && shiftFilter!="") {
            query.filter["shift"] = shiftFilter.name;
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (siteReportData) {
            $scope.loadingSiteInfoReportData = false;
            $scope.show.currentCursor = siteReportData.response.cursor;
            $scope.siteInfoReport = siteReportData.response.data;            

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllSiteInfoReport(1, 200);
    $scope.setStoreOrder = function (sortingCol, sortingType, column, searchText,programFilter,shiftFilter) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllSiteInfoReport(1, 200, column, searchText,programFilter,shiftFilter);
    }
    $scope.getMore = function (column, searchText,programFilter,shiftFilter) {
        $scope.getAllSiteInfoReport(1, 200, column, searchText,programFilter,shiftFilter);
    }
    $scope.getLess = function (column, searchText,programFilter,shiftFilter) {
        $scope.getAllSiteInfoReport(0, 200, column, searchText,programFilter,shiftFilter);
    }
    $scope.getProgramList();
	
    $scope.filterByProgram=function(column, searchText,programFilter,shiftFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllSiteInfoReport(1, 200, column, searchText,programFilter,shiftFilter);
    }
    $scope.filterByShift=function(column, searchText,programFilter,shiftFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllSiteInfoReport(1, 200, column, searchText,programFilter,shiftFilter);
    }
	$scope.exportSites=function(){
        siteTableToExcel('siteTable', 'Site Info');
    }
    var siteTableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var mysiteclone = $("#siteTable").clone();
                var siteHtml=mysiteclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: siteHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()	
});

cstore.controller('orderReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingOrderReportData = false;
    $scope.venderSearch = [
        {"value": "storeid.storename", "name": "Site Name"},
        {"value": "status", "name": "Status"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.orderReport = [];
    $appService.auth();
    $scope.getAllOrderReport = function (direction, limit, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        if ($scope.loadingSiteInfoReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingOrderReportData = true;

        var query = {"table": "orders__cstore"};
        query.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
        }
        if (programFilter && programFilter!="") {
            query.filter["storeid.programid._id"] = programFilter._id;
        }
        if (siteFilter && siteFilter!="") {
            query.filter["storeid._id"] = siteFilter._id;
        }
        if (statusFilter && statusFilter!="") {
            query.filter["status"] = statusFilter.name;
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (orderReportData) {
            $scope.loadingOrderReportData = false;
            $scope.show.currentCursor = orderReportData.response.cursor;
            $scope.orderReport = orderReportData.response.data;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllOrderReport(1, 200);
    $scope.sortOrder = function (sortingCol, sortingType, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllOrderReport(1, 10, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getMore = function (column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.getAllOrderReport(1, 10, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getLess = function (column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.getAllOrderReport(0, 10, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getProgramList();
    $scope.getStores();
    $scope.filterByProgram=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.filterBySite=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.filterByStatus=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.exportOrders=function(){
        orderTableToExcel('orderTable', 'Order List');
    }
    var orderTableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myorderclone = $("#orderTable").clone();
                var orderHtml=myorderclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: orderHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
});