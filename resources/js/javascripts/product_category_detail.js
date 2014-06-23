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

cstore.directive('productCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">{{products[0].product_category.name}}</div>' +
            '<div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in products"><div class="products_img"><a href="#!/pop?popid={{product._id}}">' +
            '<img src="{{product.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/pop?popid={{product._id}}">{{product.name}}</a></div><div class="product_details_category">{{product.short_description}}</div>' +
            '<div class="price"><a href>{{product.cost.amount | currency}}</a></div><div class="add_to_cart" ng-click="showCartPopup(product,null)"><a href>' +
            'Add To Cart</a></div></div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!categoryData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);
