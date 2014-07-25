/**
 * Created with IntelliJ IDEA.
 * User: two
 * Date: 6/25/14
 * Time: 11:52 AM
 * To change this template use File | Settings | File Templates.
 */
cstore.controller('promoTextFilesCtrl', function ($scope, $appService, $routeParams) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.filterdata.filter_date="";
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
        query.columns = ["programid", "siteid", "text_files", {"expression": "date", "format": "MM/DD/YYYY HH:mm:ss"}];
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
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        else{
            query.orders = {"__createdon": "desc"};
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
            for (var i = 0; i < $scope.textFiles.length; i++) {
                $scope.textFiles[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllTextFilesList(1, 10);
    //$scope.getStores();
    $scope.getStoresForFilter();
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
            a.remove();
        }
    }
});

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
            '<div class="delete_btn pull-left"><button ng-click="deletePromoTextFiles()"type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
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
            '<th></th>'+
            '<th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'siteid.storename\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'siteid.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Date</span><span class="sortWrap"><div class="sortUp" ng-click="setFileOrder(\'date\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setFileOrder(\'date\',\'desc\',searchby.value,search.searchContent)"></div></span></th>' +
            '<th><span>Text Files</span></th>' +
            '</tr><tr ng-repeat="textfile in textFiles">' +
            '<td><input type="checkbox" ng-model="textfile.deleteStatus">'+
            '<td>{{textfile.siteid.storename}}</td>'+
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
                    $scope.deletePromoTextFiles = function () {
                        $scope.deleteTextFileArray = [];
                        for (var i = 0; i < $scope.textFiles.length; i++) {
                            if ($scope.textFiles[i].deleteStatus) {
                                $scope.deleteTextFileArray.push({"_id": $scope.textFiles[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "promo_text_files__cstore";
                        query.operations = angular.copy($scope.deleteTextFileArray);

                        if (query.operations.length) {
                            $scope.loadingPromoTextFileData=true;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingPromoTextFileData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.textFiles.length; i++) {
                                        if ($scope.textFiles[i].deleteStatus) {
                                            $scope.textFiles.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    $scope.search();
                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("Some error occur while deleting");
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
                        else {
                            $("#popupMessage").html("please select at least one vendor before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                }
            }
        }
    }
}]);

