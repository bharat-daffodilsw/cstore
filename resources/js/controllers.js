var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";
var PROGRAMADMIN ="539fddda1e993c6e426860c4";
var VENDOR = "vendors";
var DEFAULTCOUNTRY = "531d3e9b8826fc304706a460"; //united states
var DOMAIN_NAME="http://www.ecpromomarket.com";
var REDIRECT_URL="http://www.ecloyalty.com/";
// Declare app level module which depends on filters, and services
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
            }).when('/trainings', {
                templateUrl: '../training-sessions',
                controller: 'trainingSessionCtrl'
            }).when('/add-training-session', {
                templateUrl: '../add-training-session',
                controller: 'addTrainingSessionCtrl'
            }).when('/edit-training-session', {
                templateUrl: '../add-training-session',
                controller: 'addTrainingSessionCtrl'
            }).when('/surveys', {
                templateUrl: '../surveys',
                controller: 'surveyCtrl'
            }).when('/all-promos', {
                templateUrl: '../all-promos',
                controller: 'allPromotionsCtrl'
            }).when('/promo', {
                templateUrl: '../promodetail',
                controller: 'promoDetailCtrl'
            }).when('/add-survey', {
                templateUrl: '../add-survey',
                controller: 'addSurveyCtrl'
            }).when('/edit-survey', {
                templateUrl: '../add-survey',
                controller: 'addSurveyCtrl'
            }).when('/answered-survey-store', {
                templateUrl: '/answered-survey-store',
                controller: 'answeredStoreCtrl'
            }).when('/assigned-survey-response', {
                templateUrl: '/assigned-survey-response',
                controller: ''
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
            }).when('/contact-us',{
                templateUrl:'../contact-us',
                controller:'contactPageCtrl'
            }).when('/terms-conditions',{
                templateUrl:'../terms-privacy'
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
            }).when('/promo-text-files', {
                templateUrl: '../promo-text-files',
                controller: 'promoTextFilesCtrl'
            }).when('/submitted-promos', {
                templateUrl: '../submitted-promos',
                controller: 'submittedPromotionsCtrl'
            }).when('/disabled-promos', {
                templateUrl: '../disabled-promos',
                controller: 'disabledPromotionsCtrl'
            }).otherwise(
//            {"redirectTo":"/login.html"}
            );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location, $http) {
    $scope.currentUser = {"data": ""};
    $scope.hasHighlight={"reports":false,"setup":false,"promos":false};
    $scope.notification={};
    $scope.search = {"searchContent": ""};
    $scope.cartProducts = {"length": ""};
    $scope.orderFilterData={"start_date":"","end_date":""};
    $scope.filterdata={"programs":[],"selectedProgram":"","companies":[],"selectedCompany":"","states":[],"selectedState":"","status":[],"selectedStatus":"","sites":[],"selectedSite":"","brands":[],"selectedBrand":""};
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
    //$scope.filterdata.brands=$scope.storedata.brands;
    $scope.storedata.selectedBrand = $scope.storedata.brands[0];
    $scope.storedata.shifts = [
        {"name": "Day"},
        {"name": "Night"}
    ];
    $scope.storedata.dealers = [
        {"name": "Dealer"},
        {"name": "Company Op"}
    ];
    $scope.storedata.loyalty_status = [
        {"name": "Active"},
        {"name": "Inactive"},
        {"name": "Implementation"},
        {"name": "Off program"}
    ];
    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
    $scope.productdata = {"productCategories": [], "vendors": [], "selectedProductCategory": "", "selectedVendor": "", "programs": [], "selectedProgram": ""};
    $scope.userdata = {"roles": [], "selectedRole": "", "stores": [], "selectedStore": ""};
    $scope.promotiondata = {"offerTypes": [], "selectedOfferType": "", "itemSignage": [], "selectedItemSignage": "", "upc": [], "selectedUpc": "", "hours": [], "minutes": [], "selectedStartHour": "", "selectedStartMinute": "", "selectedStartSecond": "", "selectedEndHour": "", "selectedEndMinute": "","selectedEndSecond": "","seconds":[]};
    $scope.promotiondata.offerTypes = [
        {"name": "NPROD"}
    ];
    $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
    $scope.promotiondata.itemSignage = [
        {"name": "Aisle"},
        {"name": "Cooler"}
    ];
    $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
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
    $scope.promotiondata.selectedEndHour = $scope.promotiondata.hours[23];
    for (var j = 0; j < 60; j++) {
        var min = j >= 10 ? j + "" : "0" + j;
        $scope.promotiondata.minutes.push(min);
        $scope.promotiondata.seconds.push(min);
    }
    $scope.promotiondata.selectedStartMinute = $scope.promotiondata.minutes[0];
    $scope.promotiondata.selectedEndMinute = $scope.promotiondata.minutes[59];
    $scope.promotiondata.selectedStartSecond = $scope.promotiondata.seconds[0];
    $scope.promotiondata.selectedEndSecond = $scope.promotiondata.seconds[59];
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
        {"name":"Cancelled"},
        {"name": "Ordered"},
        {"name": "Shipped"}
    ];
    $scope.currentUser["data"] = $appService.getSession();
    $scope.displayData = {};
    $scope.shoppingCartData = {"quantity": []};
    $scope.answeredSurveys = [];
    for (var i = 1; i <= 10; i++) {
        $scope.shoppingCartData.quantity.push(i);
    }
    $scope.imageTypes=[{name:"jpg"},{name:"png"}];

    $scope.programdata = {};
    $scope.programdata["image_type"]=$scope.imageTypes[0];
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
    $scope.activeHightLight=function(){
        $scope.hasHighlight.setup=true;
        $scope.hasHighlight.reports=false;
    }
    $scope.activeHightLightReports=function(){
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=true;
    }
    $scope.deactiveHightLight=function(){
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
    }
    $scope.activePromo=function(){
        $scope.hasHighlight.promos=true;
    }
    $scope.inActivePromo=function(){
        $scope.hasHighlight.promos=false;
    }
    $scope.getAllVendorsList = function () {
        var query = {"table": "vendors__cstore"};
        query.columns = ["firstname","companyid"];
        query.orders = {"companyid.name": "asc"};
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
    //$scope.getAllVendorsList();
    if ($scope.currentUser["data"] && $scope.currentUser["data"]["roleid"] == STOREMANAGER) {
        $scope.displayData["options"] = true;
        $scope.displayData["cart"] = true;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin": false, "storeManager": true,"programAdmin":false};
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
        $scope.displayData["role"] = {"admin": true, "storeManager": false,"programAdmin":false};
    }
    else if ($scope.currentUser["data"] && $scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = true;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin": false, "storeManager": false,"programAdmin":true};
    }
    else {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = false;
        $scope.displayData["role"] = {"admin": false, "storeManager": false,"programAdmin":false};
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
        $scope.data["otherCompany"] = "";
        $scope.data.notes="";
        //$scope.data["selectedCompany"] = $scope.data.companies[0];
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
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
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
    //$scope.getProductCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
    $scope.showFile = function (file, updateScope) {
        if (updateScope) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(file[0].name)) {
                $scope.readonlyrow.fileurl = BAAS_SERVER + '/file/render?filekey=' + file[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
            $scope.readonlyrow.fileurl = BAAS_SERVER + '/file/render?filekey=' + file[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
                $scope.readonlycoolerrow.fileurl = BAAS_SERVER + '/file/render?filekey=' + coolerFile[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
            $scope.readonlycoolerrow.fileurl = BAAS_SERVER + '/file/render?filekey=' + coolerFile[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
                $scope.readonlyaislerow.fileurl = BAAS_SERVER + '/file/render?filekey=' + aisleFile[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
            $scope.readonlyaislerow.fileurl = BAAS_SERVER + '/file/render?filekey=' + aisleFile[0][FILE_KEY] + '&ask='+ ASK + '&osk=' + OSK+ '&resize={"width":170,"height":120}';
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
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["_id"] = STOREMANAGER;
            }
        }
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
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        query.filter["assigned_user"] = false;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.userdata.stores = storeData.response.data;
            $scope.trainingdata.stores = storeData.response.data;
            $scope.userdata.selectedStore = $scope.userdata.stores[0];
            $scope.trainingdata.assignedStore = $scope.trainingdata.stores[0];
            //$scope.filterdata.sites = storeData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getStoresForFilter = function () {
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["storename"];
        query.orders = {"storename": "asc"};
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
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
    //$scope.getTrainingCategories();
    //clear content
    $scope.clearStoreContent = function () {
        $scope.storedata.manager = {};
        $scope.storedata["address"] = "";
        $scope.storedata["contact"] = "";
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
        $scope.readonlyrow.fileurl = "";
        $scope.storedata.selectedCountry = "";
        $scope.storedata.selectedCity = "";
        $scope.storedata.selectedState = "";
        $scope.storedata.selectedPosType = $scope.storedata.posTypes[0];
        $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
        $scope.storedata.selectedBrand = $scope.storedata.brands[0];
        $scope.storedata.otherBrand = "";
        $scope.storedata.otherPosType = "";
        $scope.storedata.otherRewardType = "";
        $scope.storedata.siteid = "";
        $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
        $scope.storedata.selectedShift = "";
        $scope.storedata.selectedDealer = "";
        $scope.productdata.selectedProgram = $scope.productdata.programs[0];
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
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
        $scope.oFile.fileExist = false;
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
    }
    $scope.clearUserContent = function () {
        $scope.userdata["username"] = "";
        $scope.userdata["firstname"] = "";
        $scope.userdata["lastname"] = "";
        $scope.userdata["password"] = "";
        $scope.userdata.selectedRole = $scope.userdata.roles[0];
        $scope.userdata.selectedStore = $scope.userdata.stores[0];
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
    }
    $scope.clearPromotionContent = function () {
        $scope.promotiondata["promo_title"] = "";
        $scope.promotiondata["end_date"] = "";
        $scope.promotiondata.selectedStartHour = $scope.promotiondata.hours[0];
        $scope.promotiondata.selectedEndHour = $scope.promotiondata.hours[23];
        $scope.promotiondata.selectedStartMinute = $scope.promotiondata.minutes[0];
        $scope.promotiondata.selectedEndMinute = $scope.promotiondata.minutes[59];
        $scope.promotiondata.selectedStartSecond = $scope.promotiondata.minutes[0];
        $scope.promotiondata.selectedEndSecond = $scope.promotiondata.minutes[59];
        $scope.promotiondata["start_date"] = "";
        $scope.promotiondata["offer_description"] = "";
        $scope.promotiondata["offer_title"] = "";
        $scope.promotiondata["promo_description"] = "";
        $scope.promotiondata["reward_value"] = "";
        $scope.promotiondata["sponsor"] = "";
        $scope.promotiondata["threshold"] = "";
        $scope.promotiondata["minimum_retail"] = "";
        $scope.promotiondata["image"] = "";
        $scope.promotiondata["display_image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[0];
        $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[0];
        $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[0];
        $scope.promotiondata["decal_description"] = "";
        $scope.promotiondata["decal_subdescription"] = "";
        $scope.promotiondata.codes = [];
        $scope.promotiondata["top_promo"] = false;
        $scope.oFile.fileExist = false;
        $scope.getPrograms(null,null);
        $scope.clearPromotionNotificationContent();
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
        $scope.promotiondata["demo_image"]="";
        $scope.promotiondata["notes"]="";
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
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
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
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
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
        $scope.programdata["aisle_html"] = "";
        $scope.programdata["cooler_html"] = "";
        $scope.readonlyaislerow.fileurl = "";
        $scope.aisleOFile.fileExist = false;
        $scope.hasHighlight.setup=true;
        $scope.hasHighlight.reports=false;
        $scope.programdata["promorate"] = "";
        $scope.programdata["participation_id"] = "";
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
        $scope.hasHighlight.setup=false;
        $scope.hasHighlight.reports=false;
    }

    $scope.getShoppingCartLength = function () {
        if ($scope.currentUser.data.roleid == STOREMANAGER) {
            var query = {"table": "shopping_cart__cstore"};
            query.columns = ["product", "userid"];
            query.filter = {};
            query.filter["userid._id"] = $scope.currentUser.data.userid;
            var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {

                //$scope.cartProducts=cartData.response.data[0].product;
                if (cartData.response.data && cartData.response.data.length) {
                    $scope.cartProducts.length = cartData.response.data[0].product.length;
                    $scope.testCartData = cartData.response.data[0];
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
    $scope.addPromoToCart=function(promo,qty){
        var promoObj = {"name": "", "cost": {}, "_id": ""};
        promoObj.name=promo.promo_title;
        if(promo.programid.promorate){
            promoObj.cost=promo.programid.promorate;
        }
        else{
            promoObj.cost={"amount": 0.00, "type": {"currency": "usd"}};
        }
        //promoObj._id=promo._id;
        $scope.showCartPopup(promoObj,qty);
    }
    $scope.addToCart = function (product, quantity) {
        $scope.newShoppingCartProduct = {};
        $scope.products = [];
        var productObj = {"name": "", "cost": {}, "quantity": "", "popid": ""};
        $scope.newShoppingCartProduct["userid"] = {"username": $scope.currentUser.data.username};
        //$scope.newShoppingCartProduct["sub_total"]={"amount":product.cost.amount*1,"type": {"currency": "usd"}};
        productObj.name = product.name ? product.name:"";
        if (quantity) {
            productObj.quantity = quantity;
        }
        else {
            productObj.quantity = 1;
        }
        if(product.cost){
            productObj.cost = {"amount": product.cost.amount, "type": {"currency": "usd"}};
        }
        else{
            productObj.cost = {"amount": 0.00, "type": {"currency": "usd"}};
        }
        productObj.popid = product._id ? product._id : "";
        $scope.products.push(productObj);
        $scope.newShoppingCartProduct["product"] = $scope.products;
        //$scope.newShoppingCartProduct["$inc"] = {"sub_total": (product.cost.amount*productObj.quantity)};
        $scope.newShoppingCartProduct["__type__"] = "insertifnotexist";
        var query = {};
        query.table = "shopping_cart__cstore";
        query.operations = [$scope.newShoppingCartProduct];
        var currentSession = $appService.getSession();
        var usk = currentSession["usk"] ? currentSession["usk"] : null;
        $appService.save(query, ASK, OSK, usk, function (callBackData) {
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
    $scope.shoppingCartProducts = {"total": "", "grandTotal": ""};
    $scope.getShoppingCart = function () {
        $scope.loadingShoppingCartData = true;
        var query = {"table": "shopping_cart__cstore"};
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid", "bill_address", "shipping_address", "same_shipping_address","shipping_address.state.abbreviation"];
        query.filter = {};
        query.filter["userid._id"] = $scope.currentUser.data.userid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {
            $scope.loadingShoppingCartData = false;
            $scope.cartData = cartData.response.data[0];
            if (cartData.response.data && cartData.response.data.length) {
                $scope.shoppingCartProducts = cartData.response.data[0].product;
                $scope.cartProducts.length = cartData.response.data[0].product.length;
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
            $scope.loadingShoppingCartData = true;
            $scope.products = [];
            $scope.removeShoppingCartProduct["userid"] = {"_id": $scope.currentUser.data.userid};
            $scope.products.push({"_id": product._id, "__type__": "delete"});
            $scope.removeShoppingCartProduct["product"] = $scope.products;
            $scope.removeShoppingCartProduct["__type__"] = "insertifnotexist";
            //$scope.removeShoppingCartProduct["$inc"] = {"sub_total": -(product.cost.amount)};
            var query = {};
            query.table = "shopping_cart__cstore";
            query.operations = [$scope.removeShoppingCartProduct];
            var currentSession = $appService.getSession();
            var usk = currentSession["usk"] ? currentSession["usk"] : null;
            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                $scope.loadingShoppingCartData = false;
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
            $scope.userdata.programs = programData.response.data;
            for (var i = 0; i < $scope.productdata.programs.length; i++) {
                if ($scope.productdata.programs[i]._id == "53743f7af36413a56b280897") {
                    $scope.productdata.selectedProgram = $scope.productdata.programs[i];
                    $scope.userdata.selectedProgram = $scope.productdata.programs[i];
                    //break;
                }
                else if($scope.currentUser["data"] && ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) && ($scope.productdata.programs[i]._id == $scope.currentUser.data.programid)){
                   $scope.currentUser["data"]["programName"] = $scope.productdata.programs[i].name;
                }
            }
            $scope.filterdata.programs = programData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getCompanyList = function () {
        var query = {"table": "company__cstore"};
        query.columns = ["name"];
        query.orders = {"name": "asc"};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (companyData) {
            $scope.data.companies = companyData.response.data;
            $scope.data.selectedCompany = $scope.data.companies[0];
            $scope.filterdata.companies = companyData.response.data;
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
        query.columns = ["name","aisle_html","cooler_html"];
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
                for (var i = 0; i < $scope.promotiondata.programs.length; i++) {
                    if($scope.currentUser["data"] && ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN)){
                        if($scope.promotiondata.programs[i]._id == $scope.currentUser.data.programid){
                            $scope.currentUser["data"]["programName"] = $scope.promotiondata.programs[i].name;
                            $scope.promotiondata.selectedProgram= $scope.promotiondata.programs[i];
                            $scope.getProgramSelectedStore($scope.promotiondata.programs[i]._id,null);
                            break;
                        }
                    }
                    else if ($scope.promotiondata.programs[i]._id == "53743f7af36413a56b280897") {
                        $scope.promotiondata.selectedProgram = $scope.promotiondata.programs[i];
                        $scope.getProgramSelectedStore($scope.promotiondata.programs[i]._id,null);
                        break;
                    }
                }
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
                        }
                    }
                    else{
                        $scope.promotiondata.stores[j].ticked=false;
                    }
                    $scope.promotiondata.stores[j].siteName=$scope.promotiondata.stores[j].storeid.storename;
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
                for (var i = 0; i < $scope.trainingdata.programs.length; i++) {
                    if($scope.currentUser["data"] && ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN)){
                        if($scope.trainingdata.programs[i]._id == $scope.currentUser.data.programid){
                            $scope.currentUser["data"]["programName"] = $scope.trainingdata.programs[i].name;
                            $scope.getProgramSelectedStoreForTraining($scope.trainingdata.programs[i]._id,null);
                            break;
                        }
                    }
                    else if ($scope.trainingdata.programs[i]._id == "53743f7af36413a56b280897") {
                        $scope.trainingdata.selectedProgram = $scope.trainingdata.programs[i];
                        $scope.getProgramSelectedStoreForTraining($scope.trainingdata.programs[i]._id,null);
                        break;
                    }
                }

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
                for (var i = 0; i < $scope.surveydata.programs.length; i++) {
                    if($scope.currentUser["data"] && ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN)){
                        if($scope.surveydata.programs[i]._id == $scope.currentUser.data.programid){
                            $scope.currentUser["data"]["programName"] = $scope.surveydata.programs[i].name;
                            $scope.getProgramSelectedStoreForSurvey($scope.surveydata.programs[i]._id,null);
                            break;
                        }
                    }
                    else if ($scope.surveydata.programs[i]._id == "53743f7af36413a56b280897") {
                        $scope.surveydata.selectedProgram = $scope.surveydata.programs[i];
                        $scope.getProgramSelectedStoreForSurvey($scope.surveydata.programs[i]._id,null);
                        break;
                    }
                }
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
                for (var i = 0; i < $scope.filedata.programs.length; i++) {
                    if($scope.currentUser["data"] && ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN)){
                        if($scope.filedata.programs[i]._id == $scope.currentUser.data.programid){
                            $scope.currentUser["data"]["programName"] = $scope.filedata.programs[i].name;
                            $scope.getProgramSelectedStoreForFiles($scope.filedata.programs[i]._id,null);
                            break;
                        }
                    }
                    else if ($scope.filedata.programs[i]._id == "53743f7af36413a56b280897") {
                        $scope.filedata.selectedProgram = $scope.filedata.programs[i];
                        $scope.getProgramSelectedStoreForFiles($scope.filedata.programs[i]._id,null);
                        break;
                    }
                }
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