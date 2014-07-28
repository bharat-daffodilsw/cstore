cstore.controller('allFilesCtrl', function ($scope, $appService, $routeParams) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingDownloadFileData = false;
    $scope.filterdata.filter_date="";
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.downloadFiles = [];
    $appService.auth();
    $scope.getAllFilesList = function (direction, limit, column, searchText) {
        if ($scope.loadingDownloadFileData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingDownloadFileData = true;
        var query = {"table": "file__cstore"};
        query.columns = ["title","programid","store_manager_id","file",{"expression": "__createdon", "format": "MM/DD/YYYY HH:mm"}];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.unwindcolumns = {"store_manager_id": 1};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if ($scope.filterdata.filter_date && $scope.filterdata.filter_date != "") {
            query.filter["__createdon"] = new Date($scope.filterdata.filter_date);
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        else {
            query.orders["title"]="asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (fileData) {
            $scope.loadingDownloadFileData = false;
            $scope.show.currentCursor = fileData.response.cursor;
            $scope.downloadFiles = fileData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllFilesList(1, 10);
    $scope.setDownloadFileOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllFilesList(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllFilesList(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllFilesList(0, 10, column, searchText);
    }
    $scope.downloadFileLink=function(file){
        if(file) {
            $scope.downloadUrl = BAAS_SERVER + "/file/download?filekey=" + file.key + "&ask=" + ASK + "&osk=" + OSK;
        }
    }
});

cstore.directive('downloadFileList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">'+
            '<div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<span class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></><input type="submit" style="display:none;"></form></div>' +
            '<date-filter></date-filter>' +
            '<div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + downloadFiles.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setDownloadFileOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setDownloadFileOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setDownloadFileOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setDownloadFileOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>'+
            '<th><span>Date</span><span class="sortWrap"><div class="sortUp" ng-click="setDownloadFileOrder(\'__createdon\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setDownloadFileOrder(\'__createdon\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>'+
            '<th><span>Files</span></th>'+
            '</tr><tr ng-repeat="file in downloadFiles"><td>{{file.title}}</td><td>{{file.programid.name}}</td>' +
            '<td>{{file.__createdon}}</td>' +
            '<td><div class="downloadFile"ng-repeat="subfile in file.file" ng-click="downloadFileLink(subfile)"><a ng-href={{downloadUrl}} target="_blank">{{subfile.name}}</a></div></td></div><div class="loadingImage" ng-hide="!loadingDownloadFileData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllFilesList(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.filterByDate = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllFilesList(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                }
            }
        }
    }
}]);
