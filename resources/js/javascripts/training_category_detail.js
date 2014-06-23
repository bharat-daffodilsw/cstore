
/***************************** Training Category Detail**************************************/
cstore.controller('trainingCategoryDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.categoryData = {"loadingData": false, "available": false};

    $scope.sessions = [];
    $scope.getTrainingCategoryDetail = function (cursor, filter, searchText) {
        if ($scope.categoryData.loadingData) {
            return false;
        }
        $scope.categoryData.loadingData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "title", "description", "training_category_id"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        if (filter && filter != undefined && filter != "undefined") {
            query.filter["training_category_id._id"] = filter;
            if (searchText && searchText != "") {
                query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
            }
        }
        else {
            $("#popupMessage").html("Not Valid");
            $('.popup').toggle("slide");
            return false;
        }
        query.max_rows = 4;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingCategoryDetailData) {
            var rawData = trainingCategoryDetailData.response.data;

            if ($scope.sessions.length) {
                for (var i = 0; i < rawData.length; i++) {
                    $scope.sessions.push(rawData[i]);
                }
            }
            if (!$scope.sessions.length) {
                $scope.sessions = rawData;

            }
            $scope.categoryData.loadingData = false;
            $scope.cursor = trainingCategoryDetailData.response.cursor;
            if ($scope.sessions.length) {
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
                            $scope.getTrainingCategoryDetail($scope.cursor, $routeParams.q, $routeParams.search);
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
        $scope.getTrainingCategoryDetail(cursor, $routeParams.q, $routeParams.search);
    }
});

cstore.directive('trainingCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">{{sessions[0].training_category_id.name}}</div>' +
            '<div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="session in sessions">' +
            '<div class="name"><a href="#!/training-session?sessionid={{session._id}}">{{session.title}}</a></div>' +
            '<div class="short_product_details">{{session.description}}</div></div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!categoryData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);
