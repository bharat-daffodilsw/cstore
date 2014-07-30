cstore.controller('promoDetailCtrl', function ($scope, $appService, $routeParams) {
    $scope.getPromoDetail = function () {
        $scope.loadingPromotionDetailData = true;

        var query = {"table": "promotions__cstore"};
        query.columns = [
            "image",
            "display_image",
            "promo_description",
            "promo_title",
            "store_manager_id",
            "threshold",
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm:ss"},
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm:ss"},
            "reward_value",
            "item_signage",
            "minimum_retail",
            "upc",
            "codes",
            "programid.promorate",
            "notes"
        ];
        query.filter = {"_id": $routeParams.promoid};
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionDetailData) {
            $scope.loadingPromotionDetailData = false;
            $scope.promotion = $appService.setUrls(promotionDetailData.response.data, 550, 350);
            $scope.assignedStoreManagers = promotionDetailData.response.data[0].store_manager_id;
            for (var i = 0; i < $scope.assignedStoreManagers.length; i++) {
                if ($scope.assignedStoreManagers[i]._id == $scope.currentUser.data.storeid) {
                    $scope.booleanOpt = $scope.assignedStoreManagers[i].opt;
                    $scope.storeManagerId = $scope.assignedStoreManagers[i]._id;
                }
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getPromoDetail();
});

/********** Promo Detail**********/
cstore.directive('promoDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products"><a href="/">Home</a> > <a href="#!/all-promos">Promotions</a> > {{promotion[0].promo_title}}</div><div class="img_product pull-left">' +
            '<a target="_blank" href="' + DOMAIN_NAME + '{{promotion[0].downloadImageUrl}}"><img ng-src="{{promotion[0].displayImageUrl}}" /></a></div>' +
            '<div class="details_product pull-left"><div class="Qty">' +
            '<div class="quantity_border"><b>Start Date</b> :{{promotion[0].start_date}} </div>' +
            '<div class="quantity_border"><b>End Date</b> :{{promotion[0].end_date}} </div>' +
            '<div class="quantity_border"><b>Threshold</b> :{{promotion[0].threshold}} </div>' +
            '<div class="quantity_border"><b>Reward Value</b> :{{promotion[0].reward_value.amount | currency}} </div>' +
            '<div class="quantity_border"><b>Item Signage</b> : {{promotion[0].item_signage}}</div>' +
            '<div class="quantity_border"><b>Minimum Retail</b> : {{promotion[0].minimum_retail.amount | currency}}</div>' +
            '<div class="quantity_border"><b>UPC/PLU/GROUP</b> : {{promotion[0].upc}}</div>' +
            '<div class="product_code"><b>Product Codes</b> : <span ng-repeat="code in promotion[0].codes"><span ng-hide=$index==0  style="padding-right: 5px;">,</span>{{code}}</span></div>' +
            '<div class="product_code"><b>Notes</b> : {{promotion[0].notes}}</div>' +
            '<div class="Qty"><div class="quantity_border">Quantity : ' +
            '<select class="qty_select_1" ng-model="qty" ng-options="quantity for quantity in shoppingCartData.quantity">' +
            '</select></div>'+
            '<div class="final_price">Price : <b>{{promotion[0].programid.promorate.amount | currency}}</b></div>'+
            '<div class="add_to_btn pull-left">' +
            '<a href ng-click="addPromoToCart(promotion[0],qty)">ADD TO CART</a></div>'+
            '<div id="downloadImage" class="add_to_btn pull-left"><a target="_blank" href="' + DOMAIN_NAME + '{{promotion[0].downloadImage}}">DOWNLOAD</a></div>'+
            '</div>'+
            '</div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{promotion[0].promo_description}}</div>' +
            '</div>' +
            '<div class="loadingImage" ng-hide="!loadingPromotionDetailData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.qty = $scope.shoppingCartData.quantity[0];
                },
                post: function ($scope) {
                }
            }
        }
    }
}]);
