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

cstore.directive('countrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="state.countryid" ng-options="country.name for country in countryList"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    if (!$scope.state.countryid) {
                        for (var i = 0; i < $scope.countryList.length; i++) {
                            if ($scope.countryList[i]._id == "531d3e9b8826fc304706a460") {
                                $scope.state.countryid = $scope.countryList[i];
                                break;
                            }
                        }
                    }
                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('stateList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveStates()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteStates()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent" title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + states.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Abbreviation</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'abbreviation\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'abbreviation\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'countryid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'countryid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="state in states"><td><input type="checkbox" ng-model="state.deleteStatus" ng-show="state._id">' +
            '</td><td><span ng-hide="state.editStatus">{{state.name}}</span>' +
            '<input type="text" ng-show="state.editStatus" ng-model="state.name"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.abbreviation}}</span><input type="text" ng-show="state.editStatus" ng-model="state.abbreviation"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.countryid.name}}</span><country-select ng-show="state.editStatus"></country-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="state.editStatus=true;setState(state)" ng-hide="state.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,state._id)" ng-show="state.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewState()">' +
            '+ Click Here To Add New State</a></div></div><div class="loadingImage" ng-hide="!loadingStateData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewState = function () {
                        $scope.states.push({ name: '', countryid: '' });
                        $scope.states[$scope.states.length - 1]["editStatus"] = true;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllStates(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteStateArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteStates = function () {
                        for (var i = 0; i < $scope.states.length; i++) {
                            if ($scope.states[i].deleteStatus) {
                                $scope.deleteStateArray.push({"_id": $scope.states[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "states__cstore";
                        query.operations = angular.copy($scope.deleteStateArray);
                        $scope.deleteStateArray = [];
                        if (query.operations.length) {
                            $scope.loadingStateData=true;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingStateData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.states.length; i++) {
                                        if ($scope.states[i].deleteStatus) {
                                            $scope.states.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    $scope.search();
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
                            $("#popupMessage").html("Please select at least one state before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshStateId) {
                        if (!$scope.states[index]["oldstatus"]) {
                            $scope.states.splice(index, 1);
                        }
                        else {
                            $scope.refreshStates(index, refreshStateId);
                        }
                    }
                    $scope.saveStates = function () {
                        var savedindexes = [];
                        for (var j = $scope.states.length - 1; j >= 0; j--) {
                            if (!$scope.states[j]._id && !$scope.states[j].name && !$scope.states[j].countryid && !$scope.states[j].abbreviation) {
                                $scope.states.splice(j, 1);
                            }
                        }
                        var stateList = $scope.states.filter(function (el) {
                            if (!el._id && (el.name || el.countryid || el.abbreviation)) {
                                savedindexes.push($scope.states.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < stateList.length; i++) {
                            if (!stateList[i].name) {
                                $("#popupMessage").html("Please enter state name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!stateList[i].abbreviation) {
                                $("#popupMessage").html("Please enter abbreviation");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!stateList[i].countryid) {
                                $("#popupMessage").html("Please select country");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (stateList && stateList.length > 0) {
                            $scope.loadingStateData = true;
                            var query = {};
                            query.table = "states__cstore";
                            query.operations = stateList;
                            $scope.addStateArray = [];
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingStateData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.states[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.states.length; i++) {
                                        $scope.states[i]["editStatus"] = false;
                                        $scope.states[i]["oldstatus"] = true;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("Some error occur while saving");
                                    $('.popup').toggle("slide");
                                }
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }, function (err) {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                            });
                        } else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.setState = function (state) {

                        for (var i = 0; i < $scope.countryList.length; i++) {
                            if ($scope.countryList[i]._id == state.countryid._id) {
                                state.countryid = $scope.countryList[i];
                                break;
                            }
                        }

                    }

                }
            }
        }
    }
}]);
