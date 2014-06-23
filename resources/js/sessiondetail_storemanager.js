/************************ Training Session Detail for Store Manager ****************************************/
cstore.controller('sessionDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSessionDetail = function (searchText) {
        $scope.loadingSessionDetailData = true;
        $scope.videoUrls = [];
        $scope.files = [];
        var query = {"table": "training_session__cstore"};
        query.columns = ["store_manager_id", "description", "file", "title", "training_category_id", "video_url"];
        query.filter = {};
        query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid, "_id": $routeParams.sessionid};
        //if (searchText && searchText != "") {
        //    query.filter["training_session_id.file.name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        //}
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (sessionDetailData) {
            $scope.loadingSessionDetailData = false;
            $scope.session = sessionDetailData.response.data;
            if (sessionDetailData.response.data[0].video_url) {
                $scope.videoUrls = sessionDetailData.response.data[0].video_url;
            }
            if (sessionDetailData.response.data[0].file) {
                $scope.files = sessionDetailData.response.data[0].file;
            }
            if ($scope.videoUrls || $scope.videoUrls != "undefined" || $scope.videoUrls != "") {
                for (var i = 0; i < $scope.videoUrls.length; i++) {
                    if ($scope.videoUrls[i].indexOf("http") == -1) {
                        $scope.videoUrls[i] = "http://" + $scope.videoUrls[i];
                    }
                }
            }
            if ($scope.files || $scope.files != "undefined" || $scope.files != "") {
                for (var i = 0; i < $scope.files.length; i++) {
                    if ((/\.(doc|docx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/doc1.png";
                    }
                    else if ((/\.(pdf)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/pdf1.png";
                    }
                    else if ((/\.(ppt|pptx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/ppt1.png";
                    }
                    else if ((/\.(xls|csv|xlsx)$/gi).test($scope.files[i].name)) {
                        $scope.files[i].imageSrc = "images/excel_icon1.png";
                    }

                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getSessionDetail();
});


/************************************ Training Session Detail for StoreManager Section**************************/
cstore.directive('sessionDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div><div class="m_bar pull-left">' +
            '<div class="category pull-left">' +
            '<div class="pop_products"><a href="/">Home</a> > <a href="#!/all-trainings">All Training Sessions</a> ><a href="#!/session-category?q={{session[0].training_category_id._id}}"> {{session[0].training_category_id.name}}</a> > {{session[0].title}}</div>' +
            '<div class="training pull-left" ng-repeat="videoUrl in videoUrls">' +
            '<div class="pdf_img">' +
            '<a href={{videoUrl}} target="_blank"><img title="{{videoUrl}}" src="images/Photo-Video-Start-icon.png"></a>' +
            '</div>' +
            '<div class="pdf_name">' +
            '<a href="{{videoUrl}}" target="_blank" target="_blank" title="{{videoUrl}}">{{videoUrl}}</a>' +
            '</div></div>' +
            '<div class="training pull-left" ng-repeat="file in files">' +
            '<div class="pdf_img">' +
            '<a href={{url}} target="_blank" ng-click="download(file)"><img ng-src="{{file.imageSrc}}" title="{{file.name}}"></a>' +
            '</div>' +
            '<div class="pdf_name">' +
            '<a href={{url}} target="_blank" ng-click="download(file)" title="{{file.name}}">{{file.name}}</a>' +
            '</div></div>' +
            '</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingSessionDetailData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                },
                post: function ($scope) {
                    $scope.download = function (file) {
                        $scope.url = BAAS_SERVER + "/file/download?filekey=" + file.key + "&ask=" + ASK + "&osk=" + OSK;
                    }
                }
            }
        }
    }
}]);
