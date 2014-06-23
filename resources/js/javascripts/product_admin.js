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

cstore.directive('productList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-pop\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProduct()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + products.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Name</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>POP Category<span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'product_category.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'product_category.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Program<span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Price</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'cost\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setProductOrder(\'cost\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Sold Count</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'soldcount\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'soldcount\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th></th></tr><tr ng-repeat="product in products"><td>' +
            '<input type="checkbox" ng-model="product.deleteStatus"></td><td>{{product.name}}</td><td>{{product.product_category.name}}</td><td>{{product.programid.name}}</td><td>' +
            '{{product.cost.amount | currency}}</td><td>{{product.soldcount}}</td>' +
            '<td><a class="edit_btn" ng-click="setProductState(product)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingProductData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProducts(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteProductArray = [];
                    $scope.deleteProduct = function () {
                        for (var i = 0; i < $scope.products.length; i++) {
                            if ($scope.products[i].deleteStatus) {
                                $scope.deleteProductArray.push({"_id": $scope.products[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "products__cstore";
                        query.operations = angular.copy($scope.deleteProductArray);
                        $scope.deleteProductArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.products.length; i++) {
                                    if ($scope.products[i].deleteStatus) {
                                        $scope.products.splice(i, 1);
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
                    $scope.setProductState = function (product) {
                        $scope.productdata["name"] = product.name ? product.name : "";
                        $scope.productdata["cost"] = product.cost ? product.cost : "";
                        $scope.productdata["description"] = product.description ? product.description : "";
                        $scope.productdata["short_description"] = product.short_description ? product.short_description : "";
                        //$scope.productdata["image"] = product.image;
                        if (product.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(product.image, false);
                        //changed 28/04

                        if (product.product_category._id) {
                            for (var j = 0; j < $scope.productdata.productCategories.length; j++) {
                                if ($scope.productdata.productCategories[j]._id == product.product_category._id) {
                                    $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[j];
                                    break;
                                }
                            }
                        }
                        if (product.programid) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == product.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-pop?q=" + product._id;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            }
        }
    }
}]);

cstore.directive('addProduct', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">POP category*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="productdata.name"></td>' +
            '<td class="half_td"><product-category-select></product-category-select></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Detailed Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="name_input"><textarea type="text" placeholder="" ng-model="productdata.description"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Short Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="name_input"><textarea type="text" placeholder="" ng-model="productdata.short_description"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Price*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">$ <input style="width: 91%;" type="text" placeholder="" ng-model="productdata.cost.amount"></td>' +
            '<td class="product_image half_td"><program-select></program-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">POP Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveProduct()"><a href>Save</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforProduct(\'pops\')"><a href>Close</a></button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div class="loadingImage" ng-hide="!loadingAddProductData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.productdata["editImage"] = false;
                    $scope.loadingAddProductData = true;
                    $scope.newProduct = {};
                    $scope.setPathforProduct = function (path) {
                        $scope.clearProductContent();
                        window.location.href = "#!/" + path;
                    }
                    $scope.editImage = function () {
                        $scope.productdata["editImage"] = false;
                    }

                },
                post: function ($scope) {
                    $scope.loadingAddProductData = false;
                    $scope.saveProduct = function () {
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var regDecimalNumberOnly = /^[+]?\d[0-9\.-]*$/
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.productdata.name) {
                                $("#popupMessage").html("Please enter pop name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.description) {
                                $("#popupMessage").html("Please enter detailed description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.short_description) {
                                $("#popupMessage").html("Please enter short description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.cost || !$scope.productdata.cost.amount || !regDecimalNumberOnly.test($scope.productdata.cost.amount)) {
                                $("#popupMessage").html("Please enter valid price");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingStatus = true;
                            var query = {};
                            query.table = "products__cstore";

                            if ($scope.productdata["productid"]) {
                                $scope.newProduct["_id"] = $scope.productdata["productid"];
                            }
                            $scope.newProduct["name"] = $scope.productdata.name;
                            $scope.newProduct["description"] = $scope.productdata.description;
                            $scope.newProduct["short_description"] = $scope.productdata.short_description;
                            //$scope.newProduct["vendor"] = {"firstname":$scope.productdata.selectedVendor.firstname, "_id":$scope.productdata.selectedVendor._id};
                            $scope.newProduct["product_category"] = {"name": $scope.productdata.selectedProductCategory.name, "_id": $scope.productdata.selectedProductCategory._id};
                            $scope.newProduct["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                            $scope.newProduct["cost"] = {"amount": $scope.productdata.cost.amount, "type": {"currency": "usd"}};
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newProduct["image"];
                                query.operations = [$scope.newProduct];
                                $scope.saveFunction(query);
                            }
                            else {
                                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($scope.oFile.name)) {
                                    var current_file = {};
                                    current_file.name = $scope.oFile.name;
                                    current_file.type = $scope.oFile.type;
                                    current_file.contents = $scope.oFile.data;
                                    current_file.ask = ASK;
                                    current_file.osk = OSK;
                                    $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                        if (data.response) {
                                            $scope.newProduct["image"] = data.response;
                                            query.operations = [$scope.newProduct];
                                            $scope.saveFunction(query);
                                        }
                                        else {

                                            $("#popupMessage").html("some error while uploading image please try again");
                                            $('.popup').toggle("slide");

                                        }
                                    }, function (callbackerror) {
                                        $("#popupMessage").html(callbackerror);
                                        $('.popup').toggle("slide");
                                    });
                                }
                                else {
                                    $("#popupMessage").html("Please Upload Image File only");
                                    $('.popup').toggle("slide");
                                }
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    };

                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforProduct("pops");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving product");
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
            }
        }
    }
}]);
