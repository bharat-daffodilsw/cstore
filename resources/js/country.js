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

cstore.directive('countryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCountries()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCountries()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + countries.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setCountryOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCountryOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="country in countries"><td><input type="checkbox" ng-model="country.deleteStatus" ng-show="country._id">' +
            '</td><td><span ng-hide="country.editStatus">{{country.name}}</span><input ng-show="country.editStatus" class="edit_input" type="text" ng-model="country.name"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="country.editStatus = true" ng-hide="country.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,country._id)" ng-show="country.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href  ng-click="addNewCountry()">' +
            '+ Click Here To Add New Country</a></div></div><div class="loadingImage" ng-hide="!loadingCountryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewCountry = function () {
                        $scope.countries.push({ name: ''});
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.countries[$scope.countries.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllCountries(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteCountryArray = [];
                    $scope.deleteCountries = function () {
                        for (var i = 0; i < $scope.countries.length; i++) {
                            if ($scope.countries[i].deleteStatus) {
                                $scope.deleteCountryArray.push({"_id": $scope.countries[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "countries__cstore";
                        query.operations = angular.copy($scope.deleteCountryArray);
                        $scope.deleteCountryArray = [];
                        if (query.operations.length) {
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.countries.length; i++) {
                                        if ($scope.countries[i].deleteStatus) {
                                            $scope.countries.splice(i, 1);
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
                            $("#popupMessage").html("Please select at least one country before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshCountryId) {
                        if (!$scope.countries[index]["oldstatus"]) {
                            $scope.countries.splice(index, 1);
                        }
                        else {
                            $scope.refreshCountries(index, refreshCountryId);
                        }
                    }

                    $scope.saveCountries = function () {
                        var savedindexes = [];
                        for (var j = $scope.countries.length - 1; j >= 0; j--) {
                            if (!$scope.countries[j]._id && !$scope.countries[j].name) {
                                $scope.countries.splice(j, 1);
                            }
                        }
                        var countryList = $scope.countries.filter(function (el) {
                            if (!el._id && el.name) {
                                savedindexes.push($scope.countries.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < countryList.length; i++) {
                            if (!countryList[i].name) {
                                $("#popupMessage").html("Please enter country name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (countryList && countryList.length > 0) {
                            $scope.loadingCountryData = true;
                            var query = {};
                            query.table = "countries__cstore";
                            query.operations = countryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                $scope.loadingCountryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.countries[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.countries.length; i++) {
                                        $scope.countries[i]["editStatus"] = false;
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
                        }
                        else {
                            $("#popupMessage").html("No Data Found For Saving");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);
