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


cstore.directive('cityStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="city.stateid" ng-options="state.name for state in stateList"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    if (!$scope.city.stateid) {
                        $scope.city.stateid = $scope.stateList[0];
                    }
                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('cityList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCities()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCities()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + cities.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>City</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCityOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'stateid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCityOrder(\'stateid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="city in cities"><td><input type="checkbox" ng-model="city.deleteStatus" ng-show="city._id">' +
            '</td><td><span ng-hide="city.editStatus">{{city.name}}</span>' +
            '<input type="text" ng-show="city.editStatus" ng-model="city.name"></td><td>' +
            '<span ng-hide="city.editStatus">{{city.stateid.name}}</span><city-state-select ng-show="city.editStatus"></city-state-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="city.editStatus=true;setCity(city)" ng-hide="city.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,city._id)" ng-show="city.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewCity()">' +
            '+ Click Here To Add New City</a></div></div><div class="loadingImage" ng-hide="!loadingCityData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewCity = function () {
                        $scope.cities.push({ name: '', stateid: '' });
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.cities[$scope.cities.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllCities(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteCityArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteCities = function () {
                        for (var i = 0; i < $scope.cities.length; i++) {
                            if ($scope.cities[i].deleteStatus) {
                                $scope.deleteCityArray.push({"_id": $scope.cities[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "cities__cstore";
                        query.operations = angular.copy($scope.deleteCityArray);
                        $scope.deleteCityArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.cities.length; i++) {
                                        if ($scope.cities[i].deleteStatus) {
                                            $scope.cities.splice(i, 1);
                                            i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("Some error occur while deleting");
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
                        else {
                            $("#popupMessage").html("Please select at least one city before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshCityId) {
                        if (!$scope.cities[index]["oldstatus"]) {
                            $scope.cities.splice(index, 1);
                        }
                        else {
                            $scope.refreshCities(index, refreshCityId);
                        }
                    }
                    $scope.saveCities = function () {
                        var savedindexes = [];
                        for (var j = $scope.cities.length - 1; j >= 0; j--) {
                            if (!$scope.cities[j]._id && $scope.cities[j].name == "" && $scope.cities[j].stateid == "") {
                                $scope.cities.splice(j, 1);
                            }
                        }
                        var cityList = $scope.cities.filter(function (el) {
                            if (!el._id && (el.name || el.stateid)) {
                                savedindexes.push($scope.cities.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < cityList.length; i++) {
                            if (!cityList[i].name) {
                                $("#popupMessage").html("Please enter city name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!cityList[i].stateid) {
                                $("#popupMessage").html("Please select state");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }

                        if (cityList && cityList.length > 0) {
                            $scope.loadingCityData = true;
                            var query = {};
                            query.table = "cities__cstore";
                            query.operations = cityList;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingCityData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.cities[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.cities.length; i++) {
                                        $scope.cities[i]["editStatus"] = false;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("Some error occur while deleting");
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
                        else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.setCity = function (city) {
                        //$scope.states[state].editStatus = true;
                        //for (var i = 0; i < $scope.data.states.length; i++) {
                        //  if ($scope.data.states[i]._id == vendor.state._id) {
                        //    $scope.data.selectedState = $scope.data.states[i];
                        //  break;
                        // }
                        // }
                        for (var i = 0; i < $scope.stateList.length; i++) {
                            if ($scope.stateList[i]._id == city.stateid._id) {
                                city.stateid = $scope.stateList[i];
                                break;
                            }
                        }

                    }

                }
            }
        }
    }
}]);
