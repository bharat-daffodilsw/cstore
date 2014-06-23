cstore.controller('productDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.getProductDetail = function () {
        $scope.loadingProductDetailData = true;

        var query = {"table": "products__cstore"};
        query.columns = ["cost", "description", "image", "name", "short_description", {"expression": "product_category", "columns": ["_id", "name"]}, "quantity", "soldcount"];
        query.filter = {"_id": $routeParams.popid};
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productDetailData) {
            $scope.loadingProductDetailData = false;
            $scope.product = $appService.setUrls(productDetailData.response.data, 550, 350);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getProductDetail();
});

cstore.directive('productDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products"><a href="/">Home</a> > <a href="#!/all-pops">POP Store</a> ><a href="#!/pop-category?q={{product[0].product_category._id}}"> {{product[0].product_category.name}}</a> > {{product[0].name}}</div><div class="img_product pull-left">' +
            '<img ng-src="{{product[0].imageUrl}}" /></div>' +
            '<div class="details_product pull-left"><div class="short_details">{{product[0].short_description}}</div><div class="Qty"><div class="quantity_border">Quantity : ' +
            '<select class="qty_select_1" ng-model="qty" ng-options="quantity for quantity in shoppingCartData.quantity">' +
            '</select></div><div class="final_price">Price : <b>{{product[0].cost.amount | currency}}</b></div><div class="add_to_btn pull-left">' +
            '<a href ng-click="showCartPopup(product[0],qty)">ADD TO CART</a></div></div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{product[0].description}}</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingProductDetailData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.qty = $scope.shoppingCartData.quantity[0];
                }
            }
        }
    }
}]);
