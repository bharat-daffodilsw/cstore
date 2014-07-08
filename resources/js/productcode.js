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

cstore.directive('typeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="productCode.type" ng-options="type for type in types"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    if (!$scope.productCode.type) {
                        $scope.productCode.type = $scope.types[0];
                    }
                }, post: function ($scope) {

                }
            }
        }
    }
}]);

cstore.directive('productCodeList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveProductCodes()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProductCodes()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCodes.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Code</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'code\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'code\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th><span>Type</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'type\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'type\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="productCode in productCodes"><td><input type="checkbox" ng-model="productCode.deleteStatus" ng-show="productCode._id">' +
            '</td><td><span ng-hide="productCode.editStatus">{{productCode.code}}</span>' +
            '<input type="text" ng-show="productCode.editStatus" ng-model="productCode.code"></td><td>' +
            '<span ng-hide="productCode.editStatus">{{productCode.description}}</span><input type="text" ng-show="productCode.editStatus" ng-model="productCode.description"></td><td>' +
            '<span ng-hide="productCode.editStatus">{{productCode.type}}</span><type-select ng-show="productCode.editStatus"></type-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="productCode.editStatus=true;setProductCode(productCode)" ng-hide="productCode.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,productCode._id)" ng-show="productCode.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewProductCode()">' +
            '+ Click Here To Add New Product Code</a></div></div><div class="loadingImage" ng-hide="!loadingProductCodeData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewProductCode = function () {
                        $scope.productCodes.push({ code: '', description: '', type: '' });
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.productCodes[$scope.productCodes.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProductCodes(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteProductCodeArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteProductCodes = function () {
                        for (var i = 0; i < $scope.productCodes.length; i++) {
                            if ($scope.productCodes[i].deleteStatus) {
                                $scope.deleteProductCodeArray.push({"_id": $scope.productCodes[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "product_codes__cstore";
                        query.operations = angular.copy($scope.deleteProductCodeArray);
                        $scope.deleteProductCodeArray = [];
                        if (query.operations.length) {
                            $scope.loadingProductCodeData=true;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingProductCodeData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.productCodes.length; i++) {
                                        if ($scope.productCodes[i].deleteStatus) {
                                            $scope.productCodes.splice(i, 1);
                                            i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in other table");
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
                            $("#popupMessage").html("Please select at least one product code before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                    $scope.remove = function (index, refreshProductCodeId) {
                        if (!$scope.productCodes[index]["oldstatus"]) {
                            $scope.productCodes.splice(index, 1);
                        }
                        else {
                            $scope.refreshProductCodes(index, refreshProductCodeId);
                        }
                    }
                    $scope.saveProductCodes = function () {
                        var savedindexes = [];
                        for (var j = $scope.productCodes.length - 1; j >= 0; j--) {
                            if (!$scope.productCodes[j]._id && !$scope.productCodes[j].code && !$scope.productCodes[j].description && !$scope.productCodes[j].type) {
                                $scope.states.splice(j, 1);
                            }
                        }
                        var productCodeList = $scope.productCodes.filter(function (el) {
                            if (!el._id && (el.code || el.description || el.type)) {
                                savedindexes.push($scope.productCodes.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < productCodeList.length; i++) {
                            if (!productCodeList[i].code || !regNumberOnly.test(productCodeList[i].code)) {
                                $("#popupMessage").html("Please enter valid code");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!productCodeList[i].description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!productCodeList[i].type) {
                                $("#popupMessage").html("Please select type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (productCodeList[i].type == "UPC" && productCodeList[i].code.length > 12) {
                                $("#popupMessage").html("Code for UPC can not be greater than 12 digits");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (productCodeList && productCodeList.length > 0) {
                            $scope.loadingProductCodeData = true;
                            var query = {};
                            query.table = "product_codes__cstore";
                            query.operations = productCodeList;
                            $scope.addProductCodeArray = [];
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingProductCodeData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.productCodes[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.productCodes.length; i++) {
                                        $scope.productCodes[i]["editStatus"] = false;
                                    }
                                }
                                else if ((callBackData.response && callBackData.response.indexOf("Duplicate value for Unique columns") >= 0 ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.indexOf("Duplicate value for Unique columns") >= 0)) {
                                    $("#popupMessage").html("There is duplicate value for code");
                                    $('.popup').toggle("slide");
                                }
                                else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setProductCode = function (productcode) {
                        for (var i = 0; i < $scope.types.length; i++) {
                            if ($scope.types[i] == productcode.type) {
                                $scope.productCodes[i].type = $scope.types[i];
                                //productCode.type = $scope.types[i];
                                break;
                            }
                        }
                    }

                }
            }
        }
    }
}]);
