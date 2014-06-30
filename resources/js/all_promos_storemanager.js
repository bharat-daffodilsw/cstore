/**************************All Offered Promos*****************************/
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
        query.columns = [
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm"},
            "image",
            "promo_title",
            "store_manager_id",
            "promo_description",
            "threshold",
            "reward_value"
        ];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.unwindcolumns = {"store_manager_id": 1};
        query.filter["store_manager_id.submitted"] = false;
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
            $scope.promotionData.loadingData = false;
            var rawData = $appService.setUrls(promoData.response.data, 291, 196);
            $scope.promotions = rawData;
            for (var k = 0; k < $scope.promotions.length; k++) {
                $scope.promotions[k]["optStatus"] = true;
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialData = function (cursor) {
        $scope.getAllPromos(0, $routeParams.search);
    }
    $scope.getInitialData(0);
});
cstore.directive('allPromos', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">All Offered Promos<span class="opt_button pull-right" ng-click="changeOptInOutStatus()"><a href="">Submit</a></span></div>' +
            '<div ng-hide="promotions.length > 0">There is no new offered promos.</div>' +
            '<div class="all_promotions col-sm-3 col-md-3 pull-left" ng-show="promotions.length > 0" ng-repeat="promotion in promotions"><div class="products_img"><a href="#!/promo?promoid={{promotion._id}}">' +
            '<img ng-src="{{promotion.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/promo?promoid={{promotion._id}}">{{promotion.promo_title}}</a></div>' +
            '<div class="detail_outer"><div class="promo_details"><b>Start Date</b> : {{promotion.start_date}}</div>' +
            '<div class="promo_details"><b>End Date</b> : {{promotion.end_date}}</div>' +
            '<div class="promo_details"><b>Threshold</b> : {{promotion.threshold}}</div>' +
            '<div class="promo_details"><b>Reward Value</b>: {{promotion.reward_value}}</div></div>' +
            '<div class="product_details">' +
            '{{promotion.promo_description}}</div>' +
            '<div class="Qty"><div class="quantity_border">Enable: <input type="checkbox" ng-model="promotion.store_manager_id.opt" ng-click="getOptData($index)"/> </div></div>' +
            '</div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!promotionData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();

                    $scope.getOptData = function (index) {
                        for (var i = 0; i < $scope.promotions.length; i++) {
                            if ($scope.promotions[i]._id == $scope.promotions[index]._id) {
                                $scope.promotions[i]["optStatus"] = false;
                            }
                        }
                    }
                    $scope.changeOptInOutStatus = function () {
                        $scope.optArray = [];
                        $scope.promosArray = [];
                        for (var i = 0; i < $scope.promotions.length; i++) {
                            if (!$scope.promotions[i].optStatus || ($scope.promotions[i].store_manager_id.opt == true)) {
                                $scope.promosArray.push($scope.promotions[i]._id);
                                $scope.optArray.push({"_id": $scope.promotions[i]._id, "store_manager_id": [
                                    {"_id": $scope.promotions[i].store_manager_id._id, "opt": $scope.promotions[i].store_manager_id.opt, "submitted": true, "__type__": "update"}
                                ]});
                            }
                        }
                        if (!$scope.promotions.length || $scope.promotions.length == 0) {
                            $("#popupMessage").html("There is no promo for submission");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        $scope.promotionData.loadingData = true;
                        var query = {};
                        query.table = "promotions__cstore";
                        query.operations = $scope.optArray;

                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.promotionData.loadingData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.updateSiteCounter($scope.promosArray);
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
                    $scope.submitPromoOptOut=function(promos){
                        var storeid = $scope.currentUser.data.storeid;
                        var programid = $scope.currentUser.data.programid;
                        $appService.createFile(storeid, programid,promos,ASK,OSK, null, function (callBackData) {
                            $scope.loadingSendNotification = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Submitted");
                                $('.popup').toggle("slide");
                                $scope.setClosePath('promotions');
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            } else {
                                $("#popupMessage").html("some error while uploading  file");
                                $('.popup').toggle("slide");
                            }
                        }, function (err) {
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");
                        });
                    }
                    $scope.uploadTextFile=function(promos){

                        $scope.submitPromoOptOut(promos);
                    };
                    $scope.updateSiteCounter = function (promos) {
                        var siteList = {"_id": "", "counter": ""};
                        if ($scope.currentUser.data.storeid) {
                            siteList["_id"] = $scope.currentUser.data.storeid;
                            siteList["$inc"] = {"counter": 1};
                        }
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = [siteList];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.getInitialData(0);
                                $scope.uploadTextFile(promos)
                            } else {
                                $("#popupMessage").html(callBackData.response);
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

/********************* all submitted promos*******************/
cstore.controller('submittedPromotionsCtrl', function ($scope, $appService, $routeParams) {
    var currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes());
    $scope.promotionData = {"loadingData": false, "available": false};
    $scope.submittedPromos = [];
    $scope.getAllSubmittedPromos = function (cursor, searchText) {
        if ($scope.promotionData.loadingData) {
            return false;
        }
        $scope.promotionData.loadingData = true;
        var query = {"table": "promotions__cstore"};
        query.columns = [
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm"},
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm"},
            "image",
            "promo_title",
            "store_manager_id",
            "promo_description",
            "threshold",
            "reward_value"
        ];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid};
        query.unwindcolumns = {"store_manager_id": 1};
        query.filter["store_manager_id.opt"] = true;
        query.filter["store_manager_id.submitted"] = true;
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
            $scope.promotionData.loadingData = false;
            var rawData = $appService.setUrls(promoData.response.data, 291, 196);
            if ($scope.submittedPromos.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.submittedPromos.push(rawData[i]);
                }
            }
            if (!$scope.submittedPromos.length) {
                $scope.submittedPromos = rawData;

            }
            $scope.promotionData.loadingData = false;
            $scope.cursor = promoData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getAllSubmittedPromos($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });


            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }

    $scope.getInitialData = function (cursor) {
        $scope.getAllSubmittedPromos(cursor, $routeParams.search);
    };

});
cstore.directive('submittedPromos', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">All Submitted Promos</div>' +
            '<div ng-hide="submittedPromos.length > 0">There is no submitted promo.</div>' +
            '<div class="all_promotions col-sm-3 col-md-3 pull-left" ng-repeat="promotion in submittedPromos" ng-show="submittedPromos.length > 0"><div class="products_img"><a href="#!/promo?promoid={{promotion._id}}">' +
            '<img ng-src="{{promotion.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/promo?promoid={{promotion._id}}">{{promotion.promo_title}}</a></div>' +
            '<div class="detail_outer"><div class="promo_details"><b>Start Date</b> : {{promotion.start_date}}</div>' +
            '<div class="promo_details"><b>End Date</b> : {{promotion.end_date}}</div>' +
            '<div class="promo_details"><b>Threshold</b> : {{promotion.threshold}}</div>' +
            '<div class="promo_details"><b>Reward Value</b>: {{promotion.reward_value}}</div></div>' +
            '<div class="product_details">' +
            '{{promotion.promo_description}}</div>' +
            '</div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!promotionData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);
