cstore.controller('allPromotionsCtrl', function ($scope, $appService, $routeParams) {
    var currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes());
    $scope.promotionData = {"loadingData": false, "available": false};

    $scope.promotions = [];
    $scope.getAllPromos = function (cursor, searchText) {
        if ($scope.promotionData.loadingData) {
            return false;
        }
        $scope.promotionData.loadingData = true;
        var query = {"table": "promotions__cstore"};
        query.columns = [{"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},{"expression": "end_date", "format": "MM/DD/YYYY HH:mm"}, "image", "promo_title","store_manager_id","promo_description","threshold","reward_value"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.unwindcolumns={"store_manager_id":1};
        query.filter["start_date"] = {"$lte": currentTime};
        query.filter["end_date"] = {"$gte": currentTime};
        if (searchText && searchText != "") {
            query.filter["promo_title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promoData) {
            var rawData = $appService.setUrls(promoData.response.data, 291, 196);
            if ($scope.promotions.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.promotions.push(rawData[i]);
                }
            }
            if (!$scope.promotions.length) {
                $scope.promotions = rawData;

            }
            for (var k = 0; k < $scope.promotions.length; k++) {
                $scope.promotions[k]["optStatus"] = false;
            }
            $scope.promotionData.loadingData = false;
            $scope.cursor = promoData.response.cursor;
            if ($scope.promotions.length) {
                $scope.promotionData.available = "true";
            }
            else {
                $scope.promotionData.available = "false";
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getAllPromos($scope.cursor, $routeParams.search);
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
        $scope.getAllPromos(cursor, $routeParams.search);
    }
});


/******************************* All Promotions **************************************/
cstore.directive('allPromos', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">All Promotions<span class="opt_button pull-right" ng-click="changeOptInOutStatus()"><a href="">Submit</a></span><span class="opt_button pull-right"><a href="">Export as txt</a></span></div>' +
            '<div class="all_promotions col-sm-3 col-md-3 pull-left" ng-repeat="promotion in promotions"><div class="products_img"><a href="#!/promo?promoid={{promotion._id}}">' +
            '<img ng-src="{{promotion.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/promo?promoid={{promotion._id}}">{{promotion.promo_title}}</a></div>'+
            '<div class="promo_details"><b>Start Date</b> : {{promotion.start_date}}</div>'+
            '<div class="promo_details"><b>End Date</b> : {{promotion.end_date}}</div>'+
            '<div class="promo_details"><b>Threshold</b> : {{promotion.threshold}}</div>'+
            '<div class="promo_details"><b>Reward Value</b>: {{promotion.reward_value}}</div>'+
            '<div class="product_details">' +
            '{{promotion.promo_description}}</div>'+
            '<div class="Qty"><div class="quantity_border">Enable: <input type="checkbox" ng-model="promotion.store_manager_id.opt" ng-click="getOptData($index)"/> </div></div>' +
            '</div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!promotionData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                },
                post:function($scope){
                    $scope.CSession = $appService.getSession();
                    $scope.optArray=[];
                    $scope.getOptData = function (index) {
                        for(var i=0; i < $scope.promotions.length;i++){
                            if($scope.promotions[i]._id==$scope.promotions[index]._id){
                                console.log($scope.promotions[i]);
                                $scope.promotions[i]["optStatus"] = true;
                            }
                        }
                    }
                    $scope.changeOptInOutStatus = function () {
                        for (var i = 0; i < $scope.promotions.length; i++) {
                            if ($scope.promotions[i].optStatus) {
                                $scope.optArray.push({"_id":$scope.promotions[i]._id,"store_manager_id":[{"_id":$scope.promotions[i].store_manager_id._id,"opt":$scope.promotions[i].store_manager_id.opt,"__type__":"update"}]});
                            }
                        }
                        console.log("test array " + JSON.stringify($scope.optArray));
                        if (!$scope.optArray.length || $scope.optArray.length ==0) {
                            $("#popupMessage").html("Please opt atleast one promo");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        $scope.promotionData.loadingData = true;
                        var query = {};
                        query.table = "promotions__cstore";
                        query.operations = $scope.testArray;
                        console.log(JSON.stringify(query));
                         $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                         $scope.promotionData.loadingData = false;
                         if (callBackData.code == 200 && callBackData.status == "ok") {
                         // $("#popupMessage").html("Submitted");
                         // $('.popup').toggle("slide");
                         } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                         $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                         $('.popup').toggle("slide");
                         }
                         else {
                         $("#popupMessage").html("some error while updating promos");
                         $('.popup').toggle("slide");
                         }
                         }, function (err) {
                         $("#popupMessage").html(err.stack);
                         $('.popup').toggle("slide");
                         });
                    }
                    $scope.changeOptStatus = function (promo) {
                        if ($scope.CSession) {
                       // $scope.promotionData.loadingData = true;
                            var query = {};
							$scope.newOptStatus={};
                            $scope.newOptStatus["store_manager_id"] = {};
                            query.table = "promotions__cstore";
                            $scope.newOptStatus["_id"] = promo._id;
                            var storeArray = [];
                            var optStatusObj = {"_id": "", "opt":"","__type__":""};
                            optStatusObj._id=$scope.currentUser.data.storeid;
                            for(var i=0; i < $scope.promotions.length;i++){
                                if($scope.promotions[i]._id==promo._id){
                                    optStatusObj.opt=!$scope.promotions[i].store_manager_id.opt;
                                    console.log(optStatusObj.opt);
                                    break;
                                }
                            }
                            optStatusObj.__type__="update";
                            storeArray.push(optStatusObj);
                            $scope.newOptStatus.store_manager_id=storeArray;
                            query.operations = [$scope.newOptStatus];
                            console.log(JSON.stringify($scope.newOptStatus));
                            /* $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.promotionData.loadingData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                   // $("#popupMessage").html("Submitted");
                                   // $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while updating promos");
                                    $('.popup').toggle("slide");
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            }); */
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
