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


cstore.directive('productCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveProductCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button"  ng-click="deleteProductCategories()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Category</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCatOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCatOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="productCategory in productCategories"><td><input type="checkbox" ng-model="productCategory.deleteStatus" ng-show="productCategory._id">' +
            '</td><td><span ng-hide="productCategory.editStatus">{{productCategory.name}}</span>' +
            '<input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.name"></td><td><span ng-hide="productCategory.editStatus">' +
            '{{productCategory.description}}</span><input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="productCategory.editStatus = true" ng-hide="productCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,productCategory._id)" ng-show="productCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href  ng-click="addNewProductCategory()">' +
            '+ Click Here To Add New POP Category</a></div></div><div class="loadingImage" ng-hide="!loadingProductCategoryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewProductCategory = function () {
                        $scope.productCategories.push({ name: '', description: '' });
                        $scope.productCategories[$scope.productCategories.length - 1]["editStatus"] = true;

                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProductCategories(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.remove = function (index) {
                        if ($scope.productCategories.length - 1 == index) {
                            $scope.productCategories.splice(index, 1);
                        }
                        else {
                            $scope.productCategories[index]["editStatus"] = false;
                        }
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteProductCategoryArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteProductCategories = function () {
                        for (var i = 0; i < $scope.productCategories.length; i++) {
                            if ($scope.productCategories[i].deleteStatus) {
                                $scope.deleteProductCategoryArray.push({"_id": $scope.productCategories[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "product_categories__cstore";
                        query.operations = angular.copy($scope.deleteProductCategoryArray);
                        $scope.deleteProductCategoryArray = [];
                        if (query.operations.length) {
                            $scope.loadingProductCategoryData=true;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingProductCategoryData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.productCategories.length; i++) {
                                        if ($scope.productCategories[i].deleteStatus) {
                                            $scope.productCategories.splice(i, 1);
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
                            $("#popupMessage").html("Please select at least one product category before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshProductCategoryId) {
                        if (!$scope.productCategories[index]["oldstatus"]) {
                            $scope.productCategories.splice(index, 1);
                        }
                        else {
                            $scope.refreshProductCategories(index, refreshProductCategoryId);
                        }
                    }
                    $scope.saveProductCategories = function () {
                        var savedindexes = [];
                        for (var j = $scope.productCategories.length - 1; j >= 0; j--) {
                            if (!$scope.productCategories[j]._id && $scope.productCategories[j].name == "" && $scope.productCategories[j].description == "") {
                                $scope.productCategories.splice(j, 1);
                            }
                        }
                        var productCategoryList = $scope.productCategories.filter(function (el) {
                            if (!el._id && (el.name || el.description)) {
                                savedindexes.push($scope.productCategories.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < productCategoryList.length; i++) {
                            if (!productCategoryList[i].name) {
                                $("#popupMessage").html("Please enter product category name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (productCategoryList && productCategoryList.length > 0) {
                            $scope.loadingProductCategoryData = true;
                            var query = {};
                            query.table = "product_categories__cstore";
                            query.operations = productCategoryList;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingProductCategoryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.productCategories[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.productCategories.length; i++) {
                                        $scope.productCategories[i]["editStatus"] = false;
                                        $scope.productCategories[i]["oldstatus"] = true;
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
