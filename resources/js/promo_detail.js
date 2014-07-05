

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
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm"},
            "offer_title",
            "reward_value",
            "offer_description",
            "sponsor",
            "vendorid",
            "item_signage",
            "minimum_retail",
            "upc",
            "offer_type",
            "codes"
        ];
        query.filter = {"_id": $routeParams.promoid};
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionDetailData) {
            $scope.loadingPromotionDetailData = false;
            $scope.promotion = $appService.setUrls(promotionDetailData.response.data, 550, 350);
            $scope.assignedStoreManagers=promotionDetailData.response.data[0].store_manager_id;
            for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                    $scope.booleanOpt = $scope.assignedStoreManagers[i].opt;
                    $scope.storeManagerId=$scope.assignedStoreManagers[i]._id;
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
            '<a target="_blank" href="'+DOMAIN_NAME+'{{promotion[0].displayImageUrl}}"><img ng-src="{{promotion[0].displayImageUrl}}" /></a></div>' +
            '<div class="details_product pull-left"><div class="Qty"><div class="quantity_border"><b>Offer</b> : {{promotion[0].offer_title}}</div>'+
            '<div class="short_details ng-binding"><b>Offer Description</b> : {{promotion[0].offer_description}}</div>'+
            '<div class="quantity_border"><b>Offer Type</b> : {{promotion[0].offer_type}}</div>'+
            '<div class="quantity_border"><b>Start Date</b> :{{promotion[0].start_date}} </div>'+
            '<div class="quantity_border"><b>End Date</b> :{{promotion[0].end_date}} </div>'+
            '<div class="quantity_border"><b>Threshold</b> :{{promotion[0].threshold}} </div>'+
            '<div class="quantity_border"><b>Reward Value</b> :{{promotion[0].reward_value.amount | currency}} </div>'+
            '<div class="quantity_border"><b>Sponsor</b> : {{promotion[0].sponsor}}</div>'+
            '<div class="quantity_border"><b>Vendor</b> : {{promotion[0].vendorid.firstname}}</div>'+
            '<div class="quantity_border"><b>Item Signage</b> : {{promotion[0].item_signage}}</div>'+
            '<div class="quantity_border"><b>Minimum Retail</b> : {{promotion[0].minimum_retail.amount | currency}}</div>'+
            '<div class="quantity_border"><b>UPC/PLU/GROUP</b> : {{promotion[0].upc}}</div>'+
            '<div class="quantity_border"><b>Codes</b> : <span ng-repeat="code in promotion[0].codes"><span ng-hide=$index==0  style="padding-right: 5px;">,</span>{{code}}</span></div>'+
            '</div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{promotion[0].promo_description}}</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingPromotionDetailData"><img src="images/loading.gif"></div>',
        compile:function(){
            return {
                pre:function(){},
                post:function($scope){
                    $scope.CSession = $appService.getSession();
                    $scope.changeAssignedPromoStatus = function () {
                        if ($scope.CSession) {
                            var query = {};
                            $scope.loadingPromotionDetailData = true;
                            $scope.newPromoStatus = {};
                            $scope.newPromoStatus["store_manager_id"] = {};
                            query.table = "promotions__cstore";
                            $scope.newPromoStatus["_id"] = $scope.promotion[0]._id;
                            var storeArray = [];
                            var optStatusObj = {"_id": "", "opt":"","__type__":""};
                            optStatusObj._id=$scope.currentUser.data.storeid;
                            optStatusObj.opt=$scope.booleanOpt;

                            //for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                                //    if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                                //        $scope.assignedStoreManagers[i].opt=$scope.booleanOpt;

                                //    }
                            //}
                            optStatusObj.__type__="update";
                            storeArray.push(optStatusObj);
                            //var promoStoreArray = [];
                            //for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                            //    if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                            //        $scope.assignedStoreManagers[i].opt=$scope.booleanOpt;
                            //    }
                            //    promoStoreArray.push({"_id": $scope.assignedStoreManagers[i]._id, "opt": $scope.assignedStoreManagers[i].opt});
                            //}
                            //$scope.newPromoStatus.store_manager_id = {data: promoStoreArray, "override": "true"};
                            $scope.newPromoStatus.store_manager_id=storeArray;
                            query.operations = [$scope.newPromoStatus];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingPromotionDetailData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    window.location.href="#!/all-promos";
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while updating status");
                                    $('.popup').toggle("slide");
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);
