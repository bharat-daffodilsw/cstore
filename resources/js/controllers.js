var BAAS_SERVER = "/rest";
var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";
var VENDOR = "vendors";
var DEFAULTCOUNTRY ="531d3e9b8826fc304706a460"; //united states

// Declare app level module which depends on filters, and services
var cstore = angular.module('cstore', ['ngRoute','ui.bootstrap' ,'$appstrap.services']);
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
            }).when('/all-pops', {
                templateUrl:'../all-pops',
                controller:'allCategory'
            }).when('/pop', {
                templateUrl:'../popdetail',
                controller:'productDetailCtrl'
            }).when('/pop-category', {
                templateUrl:'../pop-category',
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
            }).when('/site-info', {
                templateUrl:'../site-info',
                controller:'storeManagerList'
            }).when('/pops', {
                templateUrl:'../pops',
                controller:'productList'
            }).when('/add-pop', {
                templateUrl:'../add-pop',
                controller:'addProductCtrl'
            }).when('/edit-pop', {
                templateUrl:'../add-pop',
                controller:'addProductCtrl'
            }).when('/add-site-info', {
                templateUrl:'../add-site-info',
                controller:'addStoreManagerCtrl'
            }).when('/edit-site-info', {
                templateUrl:'../add-site-info',
                controller:'addStoreManagerCtrl'
            }).when('/countries', {
                templateUrl:'../countries',
                controller:'countryCtrl'
            }).when('/pop-categories', {
                templateUrl:'../pop-categories',
                controller:'productCategoryCtrl'
            }).when('/training-categories', {
                templateUrl:'../training-categories',
                controller:'trainingCategoryCtrl'
            }).when('/states', {
                templateUrl:'../states',
                controller:'stateCtrl'
            }).when('/cities', {
                templateUrl:'../cities',
                controller:'cityCtrl'
            }).when('/profile',{
                templateUrl:'../profile',
                controller:'profileCtrl'
            }).when('/resetpassword', {
                templateUrl:'../resetpassword',
                controller:'resetpasswordCtrl'
            }).when('/manage-users', {
                templateUrl:'../manage-users',
                controller:'userCtrl'
            }).when('/add-new-user', {
                templateUrl:'../add-new-user',
                controller:'addUserCtrl'
            })
            .otherwise(
//            {"redirectTo":"/login.html"}
        );
    });

cstore.controller('mainCtrl', function ($scope, $appService, $location,$http) {
    $scope.currentUser = {"data":""};
    //$scope.selectedLoc = $scope.asyncSelected ? $scope.asyncSelected : "United States";
    $scope.currentLoc ={"data":""};
    $scope.currentLoc["data"]=$appService.getLocation();
    //console.log($scope.currentLoc.data.selectedLoc);
    $scope.file = {};
    $scope.oFile={};
    $scope.readonlyrow = {};
    $scope.row = {};
    $scope.colmetadata = {"expression":"postfile","type":"file"};
    var FILE_KEY = 'key';
    $scope.data = {"countries":[],"cities":[], "states":[], "selectedCity":"", "selectedState":"","selectedVendorCategory":"","selectedCountry":"","vendorCategories":[]};
    $scope.data.vendorCategories =[{"name":"Beverage"},{"name":"Food Service"},{"name":"Salty Snacks"},{"name":"Candy"},{"name":"Propane"},{"name":"Fuel"},{"name":"Energy"},{"name":"Others"}];
    $scope.data.selectedVendorCategory=$scope.data.vendorCategories[0];
    //$scope.storedata = {"cities":[], "states":[],"countries":[] , "selectedCity":"", "selectedState":"","selectedCountry":"","manager":{"selectedCity":"","selectedState":"","selectedCountry":"","cities":[], "states":[],"countries":[]}};
	$scope.storedata = {"cities":[], "states":[],"countries":[] , "selectedCity":"", "selectedState":"","selectedCountry":"","posTypes":[],"selectedPosType":"","rewardTypes":[],"selectedRewardType":"","shifts":[],"selectedShift":"","manager":{},"brands":[],"brandName":"","otherPosType":"","otherRewardType":""};
    $scope.storedata.posTypes =[{"name":"Gilbarco Passport"},{"name":"VeriFone Ruby Only"},{"name":"VeriFone Ruby Sapphire"},{"name":"VeriFone Sapphire w/Topaz"},{"name":"Wayne Nucleus"},{"name":"Radiant"},{"name":"Retalix"},{"name":"FisCal"},{"name":"Pinnacle Palm"},{"name":"Others"}];
    $scope.storedata.selectedPosType=$scope.storedata.posTypes[0];
    $scope.storedata.rewardTypes = [{"name":"Cents Per Gallon"},{"name":"Points/Clubs"},{"name":"Clubs Only"},{"name":"Mobile Only"},{"name":"Others"}];
    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
    $scope.brands =[{"name":"Shell"},{"name":"CITGO"},{"name":"BP"},{"name":"Mobil"},{"name":"Exxon"},{"name":"Marathon"},{"name":"Conoco"},{"name":"Phillips 66"},{"name":"Valero"},{"name":"Chevron"},{"name":"Others"}];
    $scope.storedata.shifts =[{"name":"Day"},{"name":"Night"}];
    $scope.storedata.selectedShift =$scope.storedata.shifts[0];
    $scope.productdata = {"productCategories":[], "vendors":[], "selectedProductCategory":"", "selectedVendor":""};
    $scope.userdata={"roles":[],"selectedRole":"","stores":[],"selectedStore":""};
    $scope.currentUser["data"] = $appService.getSession();
    $scope.displayData = {};
	var hash = window.location.hash;
    if ($scope.currentUser["data"] == null || $scope.currentUser["data"] == "null" || hash.indexOf("resetpassword") == -1) {
		window.location.href = "#!/login";
		return false;
	}
    if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
        $scope.displayData["options"] = true;
        $scope.displayData["cart"] = true;
        $scope.displayData["menu"] = false;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin":false, "storeManager":true};
        if($scope.currentUser["data"]["companyLogoUrl"]){
            $scope.displayData["companyLogo"] = true;
        }
        else {
            $scope.displayData["companyLogo"] = false;
        }

    }
    else {
        $scope.displayData["options"] = false;
        $scope.displayData["cart"] = false;
        $scope.displayData["menu"] = true;
        $scope.displayData["loggedIn"] = true;
        $scope.displayData["role"] = {"admin":true, "storeManager":false};
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
        //console.log($scope.asyncSelected);
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

  $scope.getEditCountries = function (countryid,stateid,cityid) {
        var query = {"table":"countries__cstore"};
        query.columns = ["name"];
        $scope.data.selectedCountry = {"_id":countryid};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
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
            }
            else {
                for (var i = 0; i < $scope.data.countries.length; i++) {
                    if ($scope.data.countries[i]._id == "531d3e9b8826fc304706a460") {
                        $scope.data.selectedCountry = $scope.data.countries[i];
                        break;
                    }
                }
            }
            $scope.storedata.selectedCountry = $scope.data.selectedCountry;
            $scope.storedata.countries = $scope.data.countries;
            $scope.getEditStates($scope.data,stateid,cityid);
        }, function (jqxhr, error) {
        })
    }
    $scope.getEditStates = function (countryid,stateid,cityid) {
        if(countryid.selectedCountry){
            var query = {"table":"states__cstore"};
            query.columns = ["name"];
            countryid.selectedState = {"_id":stateid};
            query.filter = {"countryid._id":countryid.selectedCountry._id};
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
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
				$scope.storedata.states = countryid.states;
                $scope.storedata.selectedState = countryid.selectedState;
                $scope.getEditCities(countryid,cityid);
            }, function (jqxhr, error) {
            })
        }
    }
    $scope.getEditCities = function (stateid, cityid) {
        if (stateid.selectedState) {
            var query = {"table":"cities__cstore"};
            query.columns = ["name"];
            $scope.defaultCity = cityid;
            query.filter = {"stateid._id":stateid.selectedState._id};
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
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
				
				$scope.storedata.cities = stateid.cities;
                $scope.storedata.selectedCity = stateid.selectedCity;
            }, function (jqxhr, error) {
            })
        }else{
            stateid.cities =[];
        }
    }

    /*************************************************/
    $scope.getCountries = function () {
        var countries = {};
        var query = {"table":"countries__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            if($scope.storedata.countries && $scope.storedata.countries.length>0){
                $scope.storedata.countries = countryData.response.data;
                $scope.storedata.selectedCountry = $scope.storedata.countries[0];
                $scope.storedata.manager.selectedCountry = $scope.storedata.countries[0];
                $scope.getStatesNew($scope.storedata, false);
            }
            else {
                $scope.data.countries = countryData.response.data;
                for(var i =0; i < $scope.data.countries.length ;i++){
                    if($scope.data.countries[i]._id == "531d3e9b8826fc304706a460"){
                        $scope.data.selectedCountry = $scope.data.countries[i];
                        break;
                    }
                }
                //console.log($scope.data.selectedCountry);
                $scope.getStatesNew($scope.data, false);
            }

        }, function (jqxhr, error) {
        })
    }
    /*********************************************************/
    $scope.getCountriesNew = function (countryid) {
        //if(countryid.selectedCountry){
            var query = {"table":"countries__cstore"};
            query.columns = ["name"];
            $scope.data.selectedCountry = {"_id":countryid};
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
                $scope.data.countries = countryData.response.data;
                //console.log($scope.storedata.states.length);

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
                if($scope.data.countries.length && !countryid){
                    $scope.getStatesNew($scope.data,false);
                }
                else {
                    states=[];
                }
                $scope.storedata=$scope.data;

            }, function (jqxhr, error) {
            })
        //}else{
          //  countryid.states = [];
        //}
    }

    $scope.getStatesNew = function (countryid, stateid) {
        if(countryid.selectedCountry){
            var query = {"table":"states__cstore"};
            query.columns = ["name"];
            countryid.selectedState = {"_id":stateid};
            query.filter = {"countryid._id":countryid.selectedCountry._id};
            //else {
            //  query.filter ={"countryid._id":DEFAULTCOUNTRY};
            // }
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
                countryid.states = stateData.response.data;
                //console.log($scope.storedata.states.length);

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
                if(countryid.states.length && !stateid){
                    $scope.getCitiesNew(countryid, false);
                }
                else {
                    countryid.cities=[];
                }

            }, function (jqxhr, error) {
            })
        }else{
            countryid.states = [];
        }
    }
    $scope.getCitiesNew = function (stateid, cityid) {
        if (stateid.selectedState) {
            var query = {"table":"cities__cstore"};
            query.columns = ["name"];
            $scope.defaultCity = cityid;
            query.filter = {"stateid._id":stateid.selectedState._id};
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
                //console.log(JSON.stringify(cityData));
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
        }else{
            stateid.cities =[];
        }
    }
    /****************************************************************/

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
        $scope.data["address2"] = "";
        $scope.data["email"] = "";
		$scope.data["otherCategory"] = "";
        $scope.data["selectedVendorCategory"]=$scope.data.vendorCategories[0];
        for (var i = 0; i < $scope.data.countries.length; i++) {
            if ($scope.data.countries[i]._id == "531d3e9b8826fc304706a460") {
                $scope.data.selectedCountry = $scope.data.countries[i];
                break;
            }
        }
        $scope.getStatesNew($scope.data,false);
        $scope.getCitiesNew($scope.data,false);
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
        var productCategories = {};
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.productdata.productCategories = productCategoryData.response.data;
            $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
    $scope.showFile = function (file, updateScope) {
        if(updateScope){
            if( (/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(file[0].name)){
                $scope.readonlyrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask="+ASK +"&osk="+OSK;
                $scope.readonlyrow.fileType  = "imagefile";
                $scope.readonlyrow.filenotexist = false;
                $scope.readonlyrow.imgWidth = 75;
                $scope.readonlyrow.imgHeight = 75;
            }
            else{
                $scope.readonlyrow.filenotexist = true;
                $scope.popuptext="Please Upload Image File only";
                $('#pop_forgt').toggle("slide");
            }
            $scope.row[$scope.colmetadata.expression] = file;
        }
        else if(file && file.length > 0){
            $scope.readonlyrow.fileurl = BAAS_SERVER + "/file/render?filekey=" + file[0][FILE_KEY] + "&ask="+ASK +"&osk="+OSK;
            $scope.readonlyrow.fileType  = "imagefile";
            $scope.readonlyrow.filenotexist = false;
            $scope.readonlyrow.imgWidth = 75;
            $scope.readonlyrow.imgHeight = 75;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.getRoles = function () {
        var productCategories = {};
        var query = {"table":"roles__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (roleData) {
            $scope.userdata.roles = roleData.response.data;
            console.log($scope.userdata.roles);
            $scope.userdata.selectedRole = $scope.userdata.roles[1];
            console.log($scope.userdata.selectedRole);
        }, function (jqxhr, error) {
        })
    }
    $scope.getStores = function () {
        var productCategories = {};
        var query = {"table":"storemanagers__cstore"};
        query.columns = ["storename"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.userdata.stores = storeData.response.data;
            console.log($scope.userdata.stores);
            $scope.userdata.selectedStore = $scope.userdata.stores[0];
            console.log($scope.userdata.selectedStore);
        }, function (jqxhr, error) {
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

cstore.controller('homeCtrl', function ($scope, $appService, $location,$routeParams) {
    $scope.homeView = {};
    $scope.loadingPopularProductData = false;
    $scope.getPopularProducts = function (maxRow, searchText) {
        $scope.loadingPopularProductData = true;
        /*$scope.venderSearch = [
            {"value":"name", "name":"Name"},
            {"value":"short_description", "name":"Short Description"},
            {"value":"cost.amount", "name":"Cost"},
            {"value":"image.name", "name":"Image"},
            {"value":"soldcount", "name":"Sold Count"}
        ];
        $scope.searchby = $scope.venderSearch[0]; */
        var query = {"table":"products__cstore"};
        query.columns = ["name", "image", "short_description", "cost", "soldcount"];
        if (searchText && searchText != "") {
            query.filter = {};
            query.filter["name"] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
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
            $scope.loadingPopularProductData = false;
            $scope.popularProducts = $appService.setUrls(productData.response.data,291,196);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }

    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            //console.log($routeParams.q);
            $scope.getPopularProducts(8,$routeParams.search);

            $scope.homeView = {"storeManager":true, "admin":false};
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.homeView = {"storeManager":false, "admin":true};
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

cstore.controller('allCategory', function ($scope, $appService,$routeParams) {

    $scope.getProductList = function (searchText) {
        $scope.loadingAllProductData=true;
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name"];


        if (searchText && searchText != "") {
            query.childs = [
                {"alias":"categoryWiseData", "query":{"table":"products__cstore", "columns":["name", "image", "short_description", "cost"], "maxrow":4, "orders":{"__createdon":"desc"},"filter":{"name":{"$regex":"(" + searchText + ")", "$options":"-i"}}}, "relatedcolumn":"product_category", "parentcolumn":"_id"}
            ];

        }
        else {
            query.childs = [
                {"alias":"categoryWiseData", "query":{"table":"products__cstore", "columns":["name", "image", "short_description", "cost"], "maxrow":4, "orders":{"__createdon":"desc"}}, "relatedcolumn":"product_category", "parentcolumn":"_id"}
            ];
        }
        //console.log(query.childs.query);
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        //console.log(JSON.stringify(query));
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingAllProductData=false;
            var rawData = productData.response.data;
            for (var i = 0; i < rawData.length; i++) {
                if (rawData[i] && rawData[i]["categoryWiseData"] && rawData[i]["categoryWiseData"].length) {

                    rawData[i]["categoryWiseData"] = $appService.setUrls(rawData[i]["categoryWiseData"],291,196);
                }
                //console.log("bbb" + rawData[i]["categoryWiseData"]);
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
        $scope.loadingProductDetailData=true;
        var query = {"table":"products__cstore"};
        query.columns = ["cost", "description", "image", "name", "short_description", {"expression":"product_category", "columns":["_id", "name"]}, "quantity", "soldcount"];
        query.filter = {"_id":$routeParams.popid};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            $scope.loadingProductDetailData=false;
            $scope.product = $appService.setUrls(productDetailData.response.data,550,350);
        }, function (jqxhr, error) {
        })
    }
    $scope.getProductDetail();
});

cstore.controller('productCategoryDetailCtrl', function ($scope, $appService,$routeParams) {
    $scope.categoryData = {"loadingData":false, "available":false};
    $scope.products = [];
    $scope.getProductDetail = function (cursor, filter,searchText) {
        if ($scope.categoryData.loadingData) {
            return false;
        }
        $scope.categoryData.loadingData = true;
        var query = {"table":"products__cstore"};
        query.columns = ["cost", "image", "name", "short_description", {"expression":"product_category", "columns":["_id", "name"]} ];
        if (filter && filter != undefined && filter != "undefined") {
            query.filter = {};
            query.filter["product_category._id"]=filter;
            if (searchText && searchText != "") {
              query.filter["name"] = {"$regex":"(" + searchText + ")", "$options":"-i"};
            }
        }
        else {
            $("#popupMessage").html("Not Valid");
			$('.popup').toggle("slide");
            return false;
        }
        query.maxrow = 8;
        query.cursor = cursor;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            var rawData = $appService.setUrls(productDetailData.response.data,291,196);

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
                            $scope.getProductDetail($scope.cursor, $routeParams.q);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getProductDetail(cursor, $routeParams.q,$routeParams.search);
    }
});

cstore.controller('loginCtrl', function ($scope, $appService, $location) {
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
                    var query = {"table":"user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid","storeid.company_logo"];
                    query.filter = {"userid":"{_CurrentUserId}"};
                    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        $appService.deleteAllCookie();
                        var roleid = callBackData.response.data[0].roleid._id;
                        var firstname = callBackData.response.data[0].userid.firstname;
                        var userid = callBackData.response.data[0].userid._id;
                        if (callBackData.response.data[0] && callBackData.response.data[0]["storeid"]) {
                            var storeid = callBackData.response.data[0]["storeid"]._id;
                            var image =[{"image":""}];
                            for(var i=0; i < callBackData.response.data.length; i++){
                                image[i]["image"]=callBackData.response.data[i].storeid.company_logo;
                                //console.log(image);
                            }
                            var setCompanyLogo =$appService.setUrls(image,140,88);
                            var companyLogoUrl = setCompanyLogo[0].imageUrl;
                            //console.log(setCompanyLogo[0].imageUrl);

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
                            var c_name ="companyLogoUrl";
                            document.cookie = c_name + "=" + escape(companyLogoUrl);
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
			$("#popupMessage").html("error while making request");
			$('.popup').toggle("slide");
			return;
        });

    }
	 $scope.userForgotPassword = function () {
       var userName = $("#username").val();
		if(!userName){
			$("#popupMessage").html("Please enter email");
			$('.popup').toggle("slide");
			return;
		}
        $scope.forgotPassword(userName,  function (data) {
            if(data.response == "User Not Found."){
				$("#popupMessage").html("User does not exist");
				$('.popup').toggle("slide");
				return;
            }else{
				$("#popupMessage").html("We have sent you an email to reset password. Please check your email id.");
				$('.popup').toggle("slide");
				return;
            }
        });
    };
    $scope.forgotPassword = function (username, callback) {
        var params = {};
        params.username = username;
        params.ask=ASK;
        params.osk=OSK;
        $appService.getDataFromJQuery("/rest/forgotpassword", params, "GET", "JSON",  function (callBackData) {
            callback(callBackData);
        }, function (jqxhr, error) {
			$("#popupMessage").html(error);
			$('.popup').toggle("slide");
			return;
        });
    };

});

cstore.controller('vendorCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingVenderData = false;
    $scope.venderSearch = [
        {"value":"firstname", "name":"Name"},
        {"value":"address", "name":"Address"},
        {"value":"city.name", "name":"City"},
        {"value":"state.name", "name":"State"},
        {"value":"email", "name":"Email"},
        {"value":"contact", "name":"Contact"}
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
        var query = {"table":"vendors__cstore"};
        query.columns = ["address2","address", {"expression":"city", "columns":["_id", "name"]}, {"expression":"state", "columns":["_id", "name"]}, {"expression":"country", "columns":["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode","category"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
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
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllVendors(1, 10);
    $scope.setOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0;
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllVendors(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllVendors(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllVendors(0, 10);
    }
    $scope.getEditCountries(null,null,null);
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
    $scope.venderSearch = [
        {"value":"name", "name":" POP Name"},
        {"value":"product_category.name", "name":"POP Category"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.products = [];
    $appService.auth();
    $scope.getAllProducts = function (direction, limit,column, searchText) {
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
        var query = {"table":"products__cstore"};
        query.columns = ["description", "name", "image", "short_description", {"expression":"product_category", "columns":["_id", "name"]}, "cost", "soldcount","quantity"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingProductData = false;
            $scope.show.currentCursor = productData.response.cursor;
            //$scope.products = productData.response.data;
            $scope.products = productData.response.data;
            //console.log($scope.products);
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllProducts(1, 10);
    $scope.setProductOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllProducts(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllProducts(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllProducts(0, 10);
    }
    //$scope.getVendors();
});

cstore.controller('addProductCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.clearProductContent = function () {
        $scope.productdata["name"] = "";
        $scope.productdata["cost"] = "";
        $scope.productdata["description"] = "";
        $scope.productdata["short_description"] = "";
        $scope.productdata["quantity"] = "";
        $scope.productdata["image"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[0];
        //$scope.productdata.selectedVendor = $scope.productdata.vendors[0];

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
    $scope.venderSearch = [
        {"value":"storename", "name":"Store Name"},
        {"value":"shift", "name":"Shift"},
        {"value":"pos_type", "name":"POS Type"},
        {"value":"pos_version", "name":"POS Version"},
        {"value":"loyalty_status", "name":"Loyalty Status"},
        {"value":"reward_point", "name":"Reward Points"},
        {"value":"email", "name":"Email"},
        {"value":"contact", "name":"Contact"}
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
        var query = {"table":"storemanagers__cstore"};

        query.columns = ["manager.email","manager.contact","manager.name","address","cityid","countryid","manager","postalcode","stateid","storename","contact","email","brands","pos_type","shift","loyalty_status","pos_version","reward_point","company_logo","pump_brand","pump_model","address2"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeManagerData) {
            $scope.loadingStoreData = false;
            $scope.show.currentCursor = storeManagerData.response.cursor;
            $scope.storeManagers = storeManagerData.response.data;
            //console.log("storemanager length::::" + $scope.storeManagers.length);
            for (var i = 0; i < $scope.storeManagers.length; i++) {
                $scope.storeManagers[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        });
    }
    $scope.getAllStoreManagers(1, 10);
    $scope.setStoreOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllStoreManagers(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllStoreManagers(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllStoreManagers(0, 10);
    }
    $scope.getEditCountries(null,null,null);
});

cstore.controller('addStoreManagerCtrl', function ($scope, $appService,$routeParams) {
    $appService.auth();
    $scope.storedata.posTypes =[{"name":"Gilbarco Passport"},{"name":"VeriFone Ruby Only"},{"name":"VeriFone Ruby Sapphire"},{"name":"VeriFone Sapphire w/Topaz"},{"name":"Wayne Nucleus"},{"name":"Radiant"},{"name":"Retalix"},{"name":"FisCal"},{"name":"Pinnacle Palm"},{"name":"Others"}];
    $scope.storedata.selectedPosType=$scope.storedata.posTypes[0];
    $scope.storedata.rewardTypes = [{"name":"Cents Per Gallon"},{"name":"Points/Clubs"},{"name":"Clubs Only"},{"name":"Mobile Only"},{"name":"Others"}];
    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[0];
    $scope.brands =[{"name":"Shell"},{"name":"CITGO"},{"name":"BP"},{"name":"Mobil"},{"name":"Exxon"},{"name":"Marathon"},{"name":"Conoco"},{"name":"Phillips 66"},{"name":"Valero"},{"name":"Chevron"},{"name":"Others"}];
    $scope.storedata.shifts =[{"name":"Day"},{"name":"Night"}];
    $scope.storedata.selectedShift =$scope.storedata.shifts[0];
    $scope.passwordStatus=true;
    $scope.clearStoreContent = function () {
        $scope.storedata.manager={};
        //console.log(JSON.stringify($scope.storedata.manager));
        $scope.storedata["address"] = "";
        $scope.storedata["brands"] = [];
        $scope.storedata["contact"] = "";
        $scope.storedata["loyalty_status"] = "";
        $scope.storedata["pump_model"] = "";
        $scope.storedata["pump_brand"]=""
        $scope.storedata["email"] = "";
        $scope.storedata["pos_version"] = "";
        $scope.storedata["postalcode"] = "";
        $scope.storedata["storename"] = "";
        $scope.storedata["address2"]="";
        $scope.storedata["manager"]["contact"] = "";
        $scope.storedata["manager"]["email"] = "";
        $scope.storedata["manager"]["name"] = "";
        $scope.storedata["company_logo"] = "";
        $scope.readonlyrow.fileurl = "";
        $scope.storedata.selectedCountry = "";
        $scope.storedata.selectedCity = "";
        $scope.storedata.selectedState = "";
        $scope.storedata.selectedPosType=$scope.storedata.posTypes[0];
        $scope.storedata.selectedShift=$scope.storedata.shifts[0];
        $scope.storedata.selectedRewardType =$scope.storedata.rewardTypes[0];
		$scope.storedata.otherPosType = "";
		$scope.storedata.otherRewardType = "";
    }
    var storeId = $routeParams.q;
    if (storeId && storeId != undefined && storeId != "undefined") {
        $scope.storedata["storeid"] = storeId;
        $scope.passwordStatus=false;
    }
    else {
        delete $scope.storedata["storeid"];
    }
});

  /**************************************** Set up Ctrl****************************************************/
cstore.controller('countryCtrl', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingCountryData = false;
    $scope.venderSearch = [
        {"value":"name", "name":"Country"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.countries = [];
    $appService.auth();
    $scope.getAllCountries = function (direction, limit,column,searchText) {
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
        var query = {"table":"countries__cstore"};
        query.columns = ["name"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            $scope.loadingCountryData = false;
            $scope.show.currentCursor = countryData.response.cursor;
            $scope.countries = countryData.response.data;
            for (var i = 0; i < $scope.countries.length; i++) {
                $scope.countries[i]["deleteStatus"] = false;
                $scope.countries[i]["editStatus"] = false;
                $scope.countries[i]["oldstatus"] =true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllCountries(1, 10);
    $scope.setCountryOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllCountries(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllCountries(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllCountries(0, 10);
    }
    $scope.refreshCountries=function(index,refreshCountryId){
            var query = {"table":"countries__cstore"};
            query.columns = ["name"];
            query.filter ={"_id":refreshCountryId};
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
            var serviceUrl = "/rest/data";
            $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
                countryData.response.data[0].deleteStatus = false;
                countryData.response.data[0].oldstatus = true;
                $scope.countries[index] = countryData.response.data[0];
                console.log($scope.countries[index]);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (jqxhr, error) {
            })
    }
});

cstore.controller('productCategoryCtrl', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingProductCategoryData = false;
    $scope.venderSearch = [
        {"value":"name", "name":"Product Category"},
        {"value":"description", "name":"Description"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.productCategories = [];
    $appService.auth();
    $scope.getAllProductCategories = function (direction, limit, column, searchText) {
        if ($scope.loadingCountryData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingProductCategoryData = true;
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name","description"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            $scope.loadingProductCategoryData = false;
            $scope.show.currentCursor = productCategoryData.response.cursor;
            $scope.productCategories = productCategoryData.response.data;
            for (var i = 0; i < $scope.productCategories.length; i++) {
                $scope.productCategories[i]["deleteStatus"] = false;
                $scope.productCategories[i]["editStatus"] = false;
                $scope.productCategories[i]["oldstatus"] =true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllProductCategories(1, 10);
    $scope.setProductCatOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllProductCategories(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllProductCategories(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllProductCategories(0, 10);
    }
    $scope.refreshProductCategories=function(index,refreshProductCategoryId){
        var query = {"table":"product_categories__cstore"};
        query.columns = ["name","description"];
        query.filter ={"_id":refreshProductCategoryId};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productCategoryData) {
            productCategoryData.response.data[0].deleteStatus = false;
            productCategoryData.response.data[0].oldstatus = true;
            $scope.productCategories[index] = productCategoryData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
});

cstore.controller('trainingCategoryCtrl', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingTrainingCategoryData = false;
    $scope.trainingCategories = [];
    $appService.auth();
    $scope.getAllTrainingCategories = function (direction, limit) {
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
        var query = {"table":"training_categories__cstore"};
        query.columns = ["name","description"];
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryData) {
            $scope.loadingTrainingCategoryData = false;
            $scope.show.currentCursor = trainingCategoryData.response.cursor;
            $scope.trainingCategories = trainingCategoryData.response.data;
            for (var i = 0; i < $scope.trainingCategories.length; i++) {
                $scope.trainingCategories[i]["deleteStatus"] = false;
                $scope.trainingCategories[i]["editStatus"] = false;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllTrainingCategories(1, 10);
    $scope.getMore = function () {
        $scope.getAllTrainingCategories(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllTrainingCategories(0, 10);
    }
});

cstore.controller('stateCtrl', function ($scope, $appService) {
    $scope.getStateCountries = function () {
        $scope.countryList = {};
        var countries = {};
        var query = {"table":"countries__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (countryData) {
            //console.log("countryData::" + JSON.stringify(countryData));
            $scope.countryList = countryData.response.data;
            //$scope.countryList.selectedCountry = $scope.state.countries[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }

    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingStateData = false;
    $scope.venderSearch = [
        {"value":"name", "name":"State"},
        {"value":"abbreviation", "name":"Abbreviation"},
        {"value":"countryid.name", "name":"Country"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    //$scope.states = [];
    $appService.auth();
    $scope.getAllStates = function (direction, limit, column,searchText) {
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
        var query = {"table":"states__cstore"};
        query.columns = ["name","countryid","abbreviation"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            $scope.loadingStateData = false;
            $scope.show.currentCursor = stateData.response.cursor;
            $scope.states = stateData.response.data;
            for (var i = 0; i < $scope.states.length; i++) {
                $scope.states[i]["deleteStatus"] = false;
                $scope.states[i]["editStatus"] = false;
                $scope.states[i]["oldstatus"] =true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllStates(1, 10);
    $scope.setStateOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllStates(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllStates(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllStates(0, 10);
    }
    $scope.getStateCountries();
    $scope.refreshStates=function(index,refreshStateId){
        var query = {"table":"states__cstore"};
        query.columns = ["name","countryid","abbreviation"];
        query.filter ={"_id":refreshStateId};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (stateData) {
            stateData.response.data[0].deleteStatus = false;
            stateData.response.data[0].oldstatus = true;
            $scope.states[index] = stateData.response.data[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
});

cstore.controller('cityCtrl', function ($scope, $appService) {
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingCityData = false;
    $scope.venderSearch = [
        {"value":"name", "name":"City"},
        {"value":"stateid.name", "name":"State"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.cities = [];
    $appService.auth();
    $scope.getAllCities = function (direction, limit,column,searchText) {
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
        var query = {"table":"cities__cstore"};
        query.columns = ["name","stateid"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cityData) {
            $scope.loadingCityData = false;
            $scope.show.currentCursor = cityData.response.cursor;
            $scope.cities = cityData.response.data;
            for (var i = 0; i < $scope.cities.length; i++) {
                $scope.cities[i]["deleteStatus"] = false;
                $scope.cities[i]["editStatus"] = false;
                $scope.cities[i]["oldstatus"] =true;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
			$('.popup').toggle("slide");
        })
    }
    $scope.getAllCities(1, 10);
    $scope.setCityOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllCities(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllCities(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllCities(0, 10);
    }
    $scope.getCityStates = function () {
        $scope.stateList = {};
        var states = {};
        var query = {"table":"states__cstore"};
        query.columns = ["name"];
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
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
    $scope.refreshCities=function(index,refreshCityId){
        var query = {"table":"cities__cstore"};
        query.columns = ["name","stateid"];
        query.filter ={"_id":refreshCityId};
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
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

cstore.controller('profileCtrl', function ($scope, $appService, $location,$routeParams) {
    var usk = $appService.getCookie("usk");
    var query = {"table":"user_profiles__cstore"};
    query.columns = ["userid", "roleid"];
    query.filter = {"userid":"{_CurrentUserId}"};
    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
        $scope.loggedIn = callBackData.response.data[0];
        var userquery = {"table":"users__baas"};
        userquery.columns = ["password","_id"];
        userquery.filter = {"username":$scope.loggedIn.userid.username};
        var params = {"query":JSON.stringify(userquery), "ask":ASK, "osk":OSK, "usk":usk};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.loggedIn.userbassId = callBackData.response.data[0]._id;
            $scope.loggedIn.password = callBackData.response.data[0].password;
        });
    });

});

cstore.controller('resetpasswordCtrl', function ($scope, $appService, $location,$routeParams) {
    $scope.getURLParam =  function(strParamName){
        var strReturn = "";
        var strHref = window.location.href;
        if ( strHref.indexOf("?") > -1 ){
            var strQueryString = strHref.substr(strHref.indexOf("?"));
            var aQueryString = strQueryString.split("&");
            for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
                if (
                    aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    break;
                }
            }
        }
        return unescape(strReturn);
    }
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
    $scope.show = {"pre":false, "next":true, "preCursor":0, "currentCursor":0};
    $scope.loadingUserData = false;
    $scope.venderSearch = [
        {"value":"username", "name":"UserName"},
        {"value":"userid.firstname", "name":"Firstname"},
        {"value":"storeid.storename", "name":"Store Name"},
        {"value":"roleid.name", "name":"Role"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.users = [];
    $appService.auth();
    $scope.getAllUsers = function (direction, limit,column,searchText) {
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
        var query = {"table":"user_profiles__cstore"};
        query.columns = ["userid","storeid","roleid","username"];
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex":"(" + searchText + ")", "$options":"-i"};
        }
        query.orders = {};
        if($scope.sortingCol && $scope.sortingType){
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.loadingUserData = false;
            $scope.show.currentCursor = userData.response.cursor;
            $scope.users = userData.response.data;
            for (var i = 0; i < $scope.users.length; i++) {
                $scope.users[i]["deleteStatus"] = false;
                $scope.users[i]["editStatus"] = false;
                $scope.users[i]["oldstatus"] =true;
            }

        }, function (jqxhr, error) {
            alert("exception in making request");
        })
    }
    $scope.getAllUsers(1, 10);
    $scope.setOrder = function (sortingCol, sortingType) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllUsers(1, 10, null, null);
    }
    $scope.getMore = function () {
        $scope.getAllUsers(1, 10);
    }
    $scope.getLess = function () {
        $scope.getAllUsers(0, 10);
    }
    $scope.getStores();
    $scope.getRoles();

});

/********************ADD User  *****************/
cstore.controller('addUserCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.clearUserContent = function () {
        $scope.userdata["username"] = "";
        $scope.userdata["firstname"] = "";
        $scope.userdata["lastname"] = "";
        $scope.userdata["password"] = "";
        $scope.userdata.selectedRole = $scope.userdata.roles[0];
        $scope.userdata.selectedStore = $scope.userdata.roles[0];
    }
});

