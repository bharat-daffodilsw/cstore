cstore.controller('allCategory', function ($scope, $appService, $routeParams) {
    $scope.allProductData = {"loadingData": false, "available": false};

    $scope.allproducts = [];
    $scope.getProductList = function (cursor, searchText) {
        if ($scope.allProductData.loadingData) {
            return false;
        }
        $scope.allProductData.loadingData = true;
        var query = {"table": "products__cstore"};
        query.columns = ["name", "image", "short_description", "cost","product_category"];
        query.filter = {};
        query.filter["programid._id"] = $scope.currentUser.data.programid;

        if (searchText && searchText != "") {
            query.filter["name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"product_category.name": "asc"};
        query.max_rows = 8;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            var rawProductData = $appService.setUrls(productData.response.data, 291, 196);
            if ($scope.allproducts.length) {
                for (var i = 0; i < rawProductData.length; i++) {
                    $scope.allproducts.push(rawProductData[i]);
                }
            }
            if (!$scope.allproducts.length) {
                $scope.allproducts = rawProductData;

            }
            $scope.allProductData.loadingData = false;
            $scope.cursor = productData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getProductList($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialProductData = function (cursor) {
        $scope.getProductList(cursor, $routeParams.search);
    };
});

cstore.directive('allproducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left">' +
            '<div class="pop_products">All POP </div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in allproducts" ng-show="allproducts.length">' +
            '<div class="products_img"><a href="#!/pop?popid={{product._id}}"><img ng-src="{{product.imageUrl}}"></a></div><div class="name"><a href="#!/pop?popid={{product._id}}">' +
            '{{product.name}}</a></div>'+
            '<div class="category_name">{{product.product_category.name}} <a href="#!/pop-category?q={{product.product_category._id}}"><b>See More</b></a></div>'+
            '<div class="product_details">' +
            '{{product.short_description}}</div><div class="price">' +
            '<a href>{{product.cost.amount | currency}}</a></div><div class="add_to_cart"ng-click="showCartPopup(product,null)"><a href>Add To Cart</a></div></div>' +
            '</div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!allProductData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialProductData(0);
                }
            }
        }
    }
}]);
