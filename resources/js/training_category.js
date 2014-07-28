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

cstore.directive('trainingCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveTrainingCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button"  ng-click="deleteTrainingCategories()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + trainingCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Training Category</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingCatOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingCatOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingCatOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingCatOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="trainingCategory in trainingCategories"><td><input type="checkbox" ng-model="trainingCategory.deleteStatus" ng-show="trainingCategory._id">' +
            '</td><td><span ng-hide="trainingCategory.editStatus">{{trainingCategory.name}}</span>' +
            '<input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.name"></td><td><span ng-hide="trainingCategory.editStatus">' +
            '{{trainingCategory.description}}</span><input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="trainingCategory.editStatus = true" ng-hide="trainingCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,trainingCategory._id)" ng-show="trainingCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewTrainingCategory()">' +
            '+ Click Here To Add New Training Category</a></div></div><div class="loadingImage" ng-hide="!loadingTrainingCategoryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewTrainingCategory = function () {
                        $scope.trainingCategories.push({ name: '', description: '' });
                        $scope.trainingCategories[$scope.trainingCategories.length - 1]["editStatus"] = true;

                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTrainingCategories(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.remove = function (index) {
                        if ($scope.trainingCategories.length - 1 == index) {
                            $scope.trainingCategories.splice(index, 1);
                        }
                        else {
                            $scope.trainingCategories[index]["editStatus"] = false;
                        }
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteTrainingCategoryArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteTrainingCategories = function () {
                        for (var i = 0; i < $scope.trainingCategories.length; i++) {
                            if ($scope.trainingCategories[i].deleteStatus) {
                                $scope.deleteTrainingCategoryArray.push({"_id": $scope.trainingCategories[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "training_categories__cstore";
                        query.operations = angular.copy($scope.deleteTrainingCategoryArray);
                        $scope.deleteTrainingCategoryArray = [];
                        if (query.operations.length) {
                            $scope.loadingTrainingCategoryData=true;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingTrainingCategoryData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                        if ($scope.trainingCategories[i].deleteStatus) {
                                            $scope.trainingCategories.splice(i, 1);
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
                            $("#popupMessage").html("Please select at least one training category before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshTrainingCategoryId) {
                        if (!$scope.trainingCategories[index]["oldstatus"]) {
                            $scope.trainingCategories.splice(index, 1);
                        }
                        else {
                            $scope.refreshTrainingCategories(index, refreshTrainingCategoryId);
                        }
                    }
                    $scope.saveTrainingCategories = function () {
                        var savedindexes = [];
                        for (var j = $scope.trainingCategories.length - 1; j >= 0; j--) {
                            if (!$scope.trainingCategories[j]._id && $scope.trainingCategories[j].name == "" && $scope.trainingCategories[j].description == "") {
                                $scope.trainingCategories.splice(j, 1);
                            }
                        }
                        var trainingCategoryList = $scope.trainingCategories.filter(function (el) {
                            if (!el._id && (el.name || el.description)) {
                                savedindexes.push($scope.trainingCategories.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < trainingCategoryList.length; i++) {
                            if (!trainingCategoryList[i].name) {
                                $("#popupMessage").html("Please enter training category name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (trainingCategoryList && trainingCategoryList.length > 0) {
                            $scope.loadingTrainingCategoryData = true;
                            var query = {};
                            query.table = "training_categories__cstore";
                            query.operations = trainingCategoryList;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingTrainingCategoryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.trainingCategories[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                        $scope.trainingCategories[i]["editStatus"] = false;
                                        $scope.trainingCategories[i]["oldstatus"] = true;
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
                }
            }
        }
    }
}]);
