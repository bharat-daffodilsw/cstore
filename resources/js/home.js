cstore.controller('homeCtrl', function ($scope, $appService, $location, $routeParams) {
    $scope.homeView = {};
    $scope.myInterval = 5000;
    $scope.loadingPopularProductData = false;
    $scope.getPopularProducts = function (maxRow, searchText) {
        $scope.loadingPopularProductData = true;
        var query = {"table": "products__cstore"};

        query.columns = ["name", "image", "short_description", "cost", "soldcount","product_category"];
        query.filter = {};
        query.filter["programid._id"] = $scope.currentUser.data.programid;
        if (searchText && searchText != "") {
            query.filter["name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"soldcount": "desc"};
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 8;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
            $scope.loadingPopularProductData = false;
            $scope.popularProducts = $appService.setUrls(productData.response.data, 291, 196);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getRecentPromotions = function (maxRow, searchText) {
        $scope.loadingRecentPromotionData = true;
        var currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes());
        var query = {"table": "promotions__cstore"};
        query.columns = [{"expression": "start_date", "format": "MM/DD/YYYY HH:mm:ss"},{"expression": "end_date", "format": "MM/DD/YYYY HH:mm:ss"}, "image","display_image", "promo_title","store_manager_id","promo_description","threshold","reward_value","programid.promorate"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.filter["end_date"] = {"$gte": currentTime};
        if (searchText && searchText != "") {
            query.filter["promo_description"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"__createdon": "desc"};
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 8;
        }
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionData) {
            $scope.loadingRecentPromotionData = false;
            $scope.recentPromotions = $appService.setUrls(promotionData.response.data, 291, 196);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    
    $scope.getAssignedTrainingSessions = function (maxRow, searchText) {
        $scope.loadingAssignedTrainingSessionData = true;
        var query = {"table": "training_session__cstore"};

        query.columns = ["store_manager_id", "title", "description"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        if (searchText && searchText != "") {
            query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (maxRow) {
            query.max_rows = maxRow;
        }
        else {
            query.max_rows = 4;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (sessionData) {
            $scope.loadingAssignedTrainingSessionData = false;
            $scope.assignedTrainingSessions = sessionData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            $scope.getPopularProducts(8, $routeParams.search);
            $scope.getRecentPromotions(8, $routeParams.search);
            $scope.getAssignedTrainingSessions(4, $routeParams.search);
            //$scope.getCarouselPromotions(4);
            $scope.homeView = {"storeManager": true, "admin": false,"programAdmin":false};
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.homeView = {"storeManager": false, "admin": true,"programAdmin":false};
            window.location.href = "#!/vendors";
        }
        else if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
            $scope.homeView = {"storeManager": false, "admin": false,"programAdmin":true};

            window.location.href = "#!/vendors";
        }
    }
    else {
        window.location.href = "#!/login";
    }


});


cstore.directive('popularProducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left" ng-show="popularProducts.length > 0"><div class="pop_products">Popular Signage <a href="#!/all-pops">( View all )</a>' +
            '</div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in popularProducts"><div class="products_img">' +
            '<a href="#!/pop?popid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +
            '</a></div><div class="name"><a href="#!/pop?popid={{product._id}}">{{product.name}}</a></div>'+
            '<div class="category_name">{{product.product_category.name}} <a href="#!/pop-category?q={{product.product_category._id}}"><b>See More</b></a></div>'+
            '<div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href=>{{product.cost.amount | currency}}</a></div>' +
            '<div class="add_to_cart" ng-click="showCartPopup(product,null)"><a href>Add To Cart</a></div></div></div><div class="loadingImage" ng-hide="!loadingPopularProductData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {

                }
            }
        }
    }
}]);
cstore.directive('recentPromotions', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div ng-show="recentPromotions.length > 0"><div class="category pull-left"><div class="pop_products">Recent Promotions <a href="#!/all-promos">( View all )</a>' +
            '</div><div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="promotion in recentPromotions"><div class="products_img">' +
            '<a href="#!/promo?promoid={{promotion._id}}"><img title="{{promotion.promo_title}}" ng-src="{{promotion.displayImageUrl}}"/>' +
            '</a></div>'+
            '<div class="product_details"><a href="#!/promo?promoid={{promotion._id}}"><b>{{promotion.promo_description}}</b></a></div>'+
            '<div class="detail_outer"><div class="promo_details"><div class="left_align_promo pull-left"><b>Start Date</b></div> : {{promotion.start_date}}</div>'+
            '<div class="promo_details"><div class="left_align_promo pull-left"><b>End Date</b></div> : {{promotion.end_date}}</div>'+
            '<div class="promo_details"><div class="left_align_promo pull-left"><b>Threshold</b></div> : {{promotion.threshold}}</div>'+
            '<div class="promo_details"><div class="left_align_promo pull-left"><b>Reward Value</b></div>: {{promotion.reward_value.amount | currency}}</div></div>'+
            '<div class="add_to_cart" ng-click="addPromoToCart(promotion,null)"><a href>Add To Cart</a></div>'+
            '</div></div><div class="loadingImage" ng-hide="!loadingRecentPromotionData"><img src="images/loading.gif"></div></div>',
        compile:function(){
            return {
                pre:function($scope){

                }
            }
        }
    }
}]);

cstore.directive('assignedTrainingSessions', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div ng-show="assignedTrainingSessions.length > 0"><div class="category pull-left"><div class="pop_products">Training Sessions<a href="#!/all-trainings">( View all )</a>' +
            '</div><div class="trainings col-sm-3 col-md-3 pull-left" ng-repeat="assignedTrainingSession in assignedTrainingSessions">' +
            '<div class="name"><a href="#!/training-session?sessionid={{assignedTrainingSession._id}}">{{assignedTrainingSession.title}}</a></div><div class="short_product_details">{{assignedTrainingSession.description}}</div>' +
            '</div></div><div class="loadingImage" ng-hide="!loadingAssignedTrainingSessionData"><img src="images/loading.gif"></div></div>'
    }
}]);

