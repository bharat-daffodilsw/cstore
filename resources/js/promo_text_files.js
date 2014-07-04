/**
 * Created with IntelliJ IDEA.
 * User: two
 * Date: 6/25/14
 * Time: 11:52 AM
 * To change this template use File | Settings | File Templates.
 */
cstore.controller('promoTextFilesCtrl', function ($scope, $appService, $routeParams) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingPromoTextFileData = false;
    $scope.venderSearch = [
        {"value": "programid.name", "name": "Program"},
        {"value": "siteid.storename", "name": "Sitename"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.textFiles = [];
    $appService.auth();
    $scope.getAllTextFilesList = function (direction, limit, column, searchText) {
        if ($scope.loadingPromoTextFileData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingPromoTextFileData = true;
        var query = {"table": "promo_text_files__cstore"};
        query.columns = ["programid", "siteid", "text_files", {"expression": "date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if ($scope.filterdata.filter_date && $scope.filterdata.filter_date != "") {
            query.filter["date"] = new Date($scope.filterdata.filter_date);
        }
        if ($scope.filterdata.selectedSite && $scope.filterdata.selectedSite!="") {
            query.filter["siteid._id"] = $scope.filterdata.selectedSite._id;
        }
        if ($scope.currentUser["data"]["roleid"] != PROGRAMADMIN && $scope.filterdata.selectedProgram && $scope.filterdata.selectedProgram!="") {
            query.filter["programid._id"] = $scope.filterdata.selectedProgram._id;
        }
        query.orders = {};
        query.orders["programid.name"] = "asc";
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (fileData) {
            $scope.loadingPromoTextFileData = false;
            $scope.show.currentCursor = fileData.response.cursor;
            $scope.textFiles = fileData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllTextFilesList(1, 10);
    $scope.getStores();
    $scope.getProgramList();
    $scope.filterTextFiles=function(column, searchText){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllTextFilesList(1, 10, column, searchText);
    }
    $scope.setFileOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllTextFilesList(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllTextFilesList(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllTextFilesList(0, 10, column, searchText);
    }
    $scope.downloadTextFile = function (file) {
        if (file) {
            $scope.downloadUrl = BAAS_SERVER + "/file/download?filekey=" + file.key + "&ask=" + ASK + "&osk=" + OSK;
            var a = document.createElement('a');
            a.href = $scope.downloadUrl;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
        }
    }
});

cstore.directive('dateFilter', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="pull-left order_date_filter"><form ng-submit="filterByDate()">' +
            '<input id="filter_date" type="text" placeholder="Date" ng-model="filterdata.filter_date" jqdatepicker />' +
            '<span class="search_sign_3 pull-left"><a ng-click="filterByDate()">' +
            '<img style="cursor: pointer width:30px;" src="images/Search.png">' +
            '</a></span>' +
            '<input type="submit" style="display:none;"></form></div>'
    }
}]);

cstore.directive('filterSites', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedSite" ng-options="site.storename for site in filterdata.sites" ng-change="filterTextFiles(searchby.value,search.searchContent)"><option value="">-- Choose Site --</option></select>'
    }
}]);

cstore.directive('filterProgramText', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedProgram" ng-options="program.name for program in filterdata.programs" ng-change="filterTextFiles(searchby.value,search.searchContent)"><option value="">-- Choose Program --</option></select>'
    }
}]);

cstore.directive('textFileList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<span class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></><input type="submit" style="display:none;"></form></div>' +
            '<date-filter></date-filter>' +
            '</div>' +
            '<div class="filter_div"><div class="pull-left filter_text">Filter</div>' +
            '<div class="pull-left filter_table" ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"><filter-program-text></filter-program-text></div>' +
            '<div class="pull-left filter_table"><filter-sites></filter-sites></div>' +
            '<div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div>' +
            '<div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + textFiles.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div>' +
            '</div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
            '<th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'siteid.storename\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'siteid.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Date</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'date\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'date\',\'desc\',searchby.value,search.searchContent)"></div></span></th>' +
            '<th><span>Text Files</span></th>' +
            '</tr><tr ng-repeat="textfile in textFiles"><td>{{textfile.siteid.storename}}</td>' +
            '<td>{{textfile.programid.name}}</td>' +
            '<td>{{textfile.date}}</td>' +
            '<td><div class="downloadTextFile" ng-repeat="subfile in textfile.text_files" ng-click="downloadTextFile(subfile)"><a>{{subfile.name}}</a></div></td></div><div class="loadingImage" ng-hide="!loadingPromoTextFileData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTextFilesList(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.filterByDate = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTextFilesList(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                }
            }
        }
    }
}]);

