/*******************************All Training Sessions*********************************/
cstore.controller('allTrainingSessionsCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.allTrainingData = {"loadingData": false, "available": false};

    $scope.allTrainings = [];
    $scope.getTrainingList = function (cursor, searchText) {
        if ($scope.allTrainingData.loadingData) {
            return false;
        }
        $scope.allTrainingData.loadingData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "title", "description"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.unwindcolumns = {"store_manager_id": 1};
        if (searchText && searchText != "") {
            query.filter["title"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {"training_category.name": "asc"};
        query.max_rows = 8;
        query.cursor = cursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingData) {
            var rawTrainingData = trainingData.response.data;
            if ($scope.allTrainings.length) {
                for (var i = 0; i < rawTrainingData.length; i++) {
                    $scope.allTrainings.push(rawTrainingData[i]);
                }
            }
            if (!$scope.allTrainings.length) {
                $scope.allTrainings = rawTrainingData;

            }
            $scope.allTrainingData.loadingData = false;
            $scope.cursor = trainingData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#scrollDiv").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            $scope.getTrainingList($scope.cursor, $routeParams.search);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getInitialTrainingData = function (cursor) {
        $scope.getTrainingList(cursor, $routeParams.search);
    };
});


/************************** All Assigned Training***************************************/
cstore.directive('allTrainingSessions', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left">' +
            '<div class="pop_products">All Trainings </div>' +
            '<div class="trainings col-sm-3 col-md-3 pull-left" ng-repeat="childSession in allTrainings">' +
            '<div class="name"><a href="#!/training-session?sessionid={{childSession._id}}">{{childSession.title}}</a></div>' +
            '<div class="short_product_details">{{childSession.description}}</div></div>' +
            '</div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!allTrainingData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialTrainingData(0);
                }
            }
        }
    }
}]);
