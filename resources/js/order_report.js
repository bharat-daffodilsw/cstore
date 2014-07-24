cstore.controller('orderReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingOrderReportData = false;
    $scope.filterdata.selectedProgram="";
    $scope.venderSearch = [
        {"value": "storeid.storename", "name": "Site Name"},
        {"value": "status", "name": "Status"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.orderReport = [];
    $appService.auth();
    $scope.getAllOrderReport = function (direction, limit, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        if ($scope.loadingSiteInfoReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingOrderReportData = true;

        var query = {"table": "orders__cstore"};
        query.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
        }
        if (programFilter && programFilter!="") {
            query.filter["storeid.programid._id"] = programFilter._id;
        }
        if (siteFilter && siteFilter!="") {
            query.filter["storeid._id"] = siteFilter._id;
        }
        if (statusFilter && statusFilter!="") {
            query.filter["status"] = statusFilter.name;
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (orderReportData) {
            $scope.loadingOrderReportData = false;
            $scope.show.currentCursor = orderReportData.response.cursor;
            $scope.orderReport = orderReportData.response.data;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllOrderReport(1, 200);
    $scope.sortOrder = function (sortingCol, sortingType, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getMore = function (column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getLess = function (column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter) {
        $scope.getAllOrderReport(0, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.getProgramList();
    $scope.getStoresForFilter();
    $scope.filterByProgram=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.filterBySite=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.filterByStatus=function(column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllOrderReport(1, 200, column, searchText,orderStartDate,orderEndDate,programFilter,siteFilter,statusFilter);
    }
    $scope.exportOrders=function(){
        orderTableToExcel('orderTable', 'Order List');
    }
    var orderTableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myorderclone = $("#orderTable").clone();
                var orderHtml=myorderclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: orderHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
});
cstore.directive('filterStatus', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedStatus" ng-options="status.name for status in filterdata.status" ng-change="filterByStatus(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"><option value="">-- Choose Status --</option></select>'
    }
}]);
cstore.directive('filterProgramOrder', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedProgram" ng-options="program.name for program in filterdata.programs" ng-change="filterByProgram(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"><option value="">-- Choose Program --</option></select>'
    }
}]);

cstore.directive('filterSite', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedSite" ng-options="site.storename for site in filterdata.sites" ng-change="filterBySite(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"><option value="">-- Choose Site --</option></select>'
    }
}]);
cstore.directive('orderReport', ['$appService', function ($appService, $scope,$window) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div>'+
            '<div class="pull-left order_date"><input type="text" ng-model="orderFilterData.start_date" placeholder="Start Date" jqdatepicker></div><div class="pull-left order_date"><input type="text" placeholder="End Date" ng-model="orderFilterData.end_date" jqdatepicker></div>' +
            '<div class="pull-left"><button ng-click="orderDateFilter()">Filter</button></div><div class="pull-right"><div class="pull-right"><button ng-click="exportOrders()">Download in Excel</button></div><div class="pull-right"><button ng-click="generateorderpdf()">Download in PDF</button></div></div>'+
            '</div>'+
            '<div class="filter_div">'+
            '<div class="pull-left filter_text">Filter</div>'+
            '<div class="pull-left filter_table"><filter-program-order></filter-program-order></div>'+
            '<div class="pull-left filter_table"><filter-site></filter-site></div>'+
            '<div class="pull-left filter_table"><filter-status></filter-status></div>'+
            '<div ng-click="getMore(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + orderReport.length}} from start</div>'+
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>'+
            '<div class="table pull-left" id="printOrder">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" id="orderTable"><tr>' +
            '<th>POP</th><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div><div class="sortDown" ng-click="sortOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div>	</span></th>' +
            '<th><span>Program </span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'storeid.programid.name\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div><div class="sortDown" ng-click="sortOrder(\'storeid.programid.name\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div>	</span></th>' +
            '<th>Total<span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'total\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div><div class="sortDown" ng-click="sortOrder(\'total\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div>	</span></th><th><span>Order Date</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'order_date\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div>' +
            '<div class="sortDown" ng-click="sortOrder(\'order_date\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div>	</span></th>' +
            '<th><span>Status</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'status\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div><div class="sortDown" ng-click="sortOrder(\'status\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date,filterdata.selectedProgram,filterdata.selectedSite,filterdata.selectedStatus)"></div></span></th></tr><tr ng-repeat="order in orderReport">' +
            '<td><table class="ordered_products"><tr class="ordered_pop_name" ng-show="$index==0"><td class="ordered_pop">Name</td><td class="ordered_pop">Price</td><td class="ordered_pop">Qty</td></tr>' +
            '<tr ng-repeat="pop in order.product"><td class="ordered_pop pop_name">{{pop.name}}</td><td class="ordered_pop">{{pop.cost.amount}}</td><td class="ordered_pop">{{pop.quantity}}</td></tr></table></td><td>' +
            '{{order.storeid.storename}}</td><td>' +
            '{{order.storeid.programid.name}}</td><td>{{order.total.amount | currency}}</td><td>{{order.order_date}}</td><td>{{order.status}}</td>' +
            '</tr></table>' +
            '</div><div class="loadingImage" ng-hide="!loadingOrderReportData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope,$window) {
                    $scope.setPath = function (orderid) {
                        window.location.href = "#!/order-detail?orderid=" + orderid;
                    }
					$scope.orderDateFilter = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrderReport(1, 200, $scope.searchby.value,$scope.search.searchContent,$scope.orderFilterData.start_date,$scope.orderFilterData.end_date,$scope.filterdata.selectedProgram,$scope.filterdata.selectedSite,$scope.filterdata.selectedStatus);

                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrderReport(1, 200, $scope.searchby.value,$scope.search.searchContent,$scope.orderFilterData.start_date,$scope.orderFilterData.end_date,$scope.filterdata.selectedProgram,$scope.filterdata.selectedSite,$scope.filterdata.selectedStatus);
                    }                   
					$scope.printOrders = function(divName) {
                        var printContents = document.getElementById(divName).innerHTML;
                        var popupWin = window.open();
                        popupWin.document.write('<html><head><style> #orderTable { border:solid #000 !important;  border-width:1px 0 0 1px !important;} #orderTable th, td { border:solid #000 !important;border-width:0 1px 1px 0 !important;}</style></head><body onload="window.print()"><table border="1">' + printContents + '</table></body></html>');
                        //popupWin..print();
                        popupWin.document.close();
                    }
                    
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                },                
				post: function($scope) {
					$scope.generateorderpdf=function(){						
						var tempalateId = "cstore_orderPdf";
						var pdfquery = {"table": "orders__cstore"};
						pdfquery.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
                        pdfquery.filter = {};
                        if ($scope.orderFilterData.start_date && $scope.orderFilterData.start_date != "" && $scope.orderFilterData.end_date && $scope.orderFilterData.end_date != "") {
							pdfquery.filter["order_date"] = {"$gte":$scope.orderFilterData.start_date,"$lte": $scope.orderFilterData.end_date};
						}
						if ($scope.filterdata.selectedProgram && $scope.filterdata.selectedProgram!="") {
							pdfquery.filter["storeid.programid._id"] = $scope.filterdata.selectedProgram._id;
						}
						if ($scope.filterdata.selectedSite && $scope.filterdata.selectedSite!="") {
							pdfquery.filter["storeid._id"] = $scope.filterdata.selectedSite._id;
						}
						if ($scope.filterdata.selectedStatus && $scope.filterdata.selectedStatus!="") {
							pdfquery.filter["status"] = $scope.filterdata.selectedStatus.name;
						}            
						pdfquery.orders = {};
                        if ($scope.sortingCol && $scope.sortingType) {
                            pdfquery.orders[$scope.sortingCol] = $scope.sortingType;
                        }
                        var timeZone = new Date().getTimezoneOffset();
                        $scope.orderpdfurl = BAAS_SERVER + "/export/pdf?query=" + JSON.stringify(pdfquery) + "&ask=" + ASK + "&osk=" + OSK + "&templateId="+tempalateId+"&state="+JSON.stringify({"timezone": timeZone});
                        var a = document.createElement('a');
                        a.href=$scope.orderpdfurl;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
				}
            }
        }
    }
}]);
