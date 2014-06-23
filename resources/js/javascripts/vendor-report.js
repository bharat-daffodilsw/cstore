cstore.controller('vendorReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingVendorReportData = false;
    $scope.venderSearch = [
        {"value": "firstname", "name": "Name"},
        {"value": "address", "name": "Address"},
        {"value": "address2", "name": "Address"},
        {"value": "postalcode", "name": "Postal Code"},
        {"value": "city.name", "name": "City"},
        {"value": "country.name", "name": "Country"},
        {"value": "email", "name": "Email"},
        {"value": "category", "name": "Category"},
        {"value": "contact", "name": "Contact"},
        {"value": "companyid.name", "name": "Company"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.vendorReport = [];
    $appService.auth();
    $scope.getAllVendorsReport = function (direction, limit, column, searchText, programFilter, stateFilter, companyFilter) {
        if ($scope.loadingVendorReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingVendorReportData = true;

        var query = {"table": "vendors__cstore"};
        query.columns = ["address2","programid", "companyid", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode", "category"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (programFilter && programFilter!="") {
            query.filter["programid._id"] = programFilter._id;
        }
        if (companyFilter && companyFilter != "") {
            query.filter["companyid._id"] = companyFilter._id;
        }
        if (stateFilter && stateFilter!="") {
            query.filter["state._id"] = stateFilter._id;
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorReportData) {
            $scope.loadingVendorReportData = false;
            $scope.show.currentCursor = vendorReportData.response.cursor;
            $scope.vendorReport = vendorReportData.response.data;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllVendorsReport(1, 200);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText, programFilter, stateFilter, companyFilter) {
        $scope.show.currentCursor = 0;
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllVendorsReport(1, 200, column, searchText, programFilter, stateFilter, companyFilter);
    }
    $scope.getMore = function (column, searchText, programFilter, stateFilter) {
        $scope.getAllVendorsReport(1, 200, column, searchText, programFilter, stateFilter, companyFilter);
    }
    $scope.getLess = function (column, searchText, programFilter, stateFilter) {
        $scope.getAllVendorsReport(0, 200, column, searchText, programFilter, stateFilter, companyFilter);
    }
    $scope.getProgramList();
    $scope.getCompanyList();
    $scope.getStateListForFilter();
    $scope.filterByProgram=function(column, searchText, programFilter, stateFilter, companyFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllVendorsReport(1, 200, column, searchText, programFilter, stateFilter, companyFilter)
    }
    $scope.filterByCompany=function(column, searchText, programFilter, stateFilter, companyFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllVendorsReport(1, 200, column, searchText, programFilter, stateFilter, companyFilter)
    }
    $scope.filterByState=function(column, searchText, programFilter, stateFilter, companyFilter){
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllVendorsReport(1, 200, column,searchText,programFilter,stateFilter, companyFilter)
    }
    $scope.exportVendors=function(){
        vendorTableToExcel('vendorTable', 'vendor List');
    }
    var vendorTableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myvendorclone = $("#vendorTable").clone();
                var vendorHtml=myvendorclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: vendorHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
});

cstore.directive('filterProgram', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedProgram" ng-options="program.name for program in filterdata.programs" ng-change="filterByProgram(searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"><option value="">-- Choose Program --</option></select>'
    }
}]);

cstore.directive('filterCompany', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedCompany" ng-options="company.name for company in filterdata.companies" ng-change="filterByCompany(searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"><option value="">-- Choose Company --</option></select>'
    }
}]);

cstore.directive('filterStates', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedState" ng-options="state.name for state in filterdata.states" ng-change="filterByState(searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"><option value="">-- Choose State --</option></select>'
    }
}]);
cstore.directive('vendorReport', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="delete_btn pull-right"><button type="button" ng-click="getExportVendors()"><a ng-href={{tempUrl}} target="_blank">Excel</a></button></div>' +
            '<div class="delete_btn pull-right"><button type="button" ng-click="printDiv(\'printVendors\')">Print</button></div>' +
            '<div class="delete_btn pull-right"><button type="button" ng-click="generatepdf()"><a ng-href={{vendorpdfurl}} target="_blank">PDF</a></button></div></div>'+
            '<div class="filter_div"><div class="pull-left filter_text">Filter</div><div class="pull-left filter_table"><filter-company></filter-company></div><div class="pull-left filter_table"><filter-program></filter-program></div><div class="pull-left filter_table"><filter-states></filter-states></div><div ng-click="getMore(searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + vendorReport.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left vendor_report" id="printVendors"><table id="vendorTable" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
            '<th><span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'firstname\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'firstname\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div></span></th>'+
            '<th><span>Address</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'address\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'address\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th>'+
            '<th><span>Address 2</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'address2\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'address2\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th>'+
            '<th><span>City</span><span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'city.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'city.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th><th><span>State</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'state.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'state.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div></span></th>'+
            '<th><span>Country</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'country.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'country.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th>'+
            '<th><span>Postal Code</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'postalcode\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'postalcode\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th>'+
            '<th><span>Category</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'category\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'category\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th>'+
            '<th><span>Email</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'email\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'email\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th><th>' +
            '<span>Program</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>	</span></th><th><span>Contact No.</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'contact\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div><div class="sortDown" ng-click="setOrder(\'contact\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div></span></th>' +
            '<th><span>Company</span><span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'companyid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div>' +
            ' <div class="sortDown" ng-click="setOrder(\'companyid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,filterdata.selectedState,filterdata.selectedCompany)"></div></span></th>' +
            '</tr><tr ng-repeat="vendor in vendorReport"><td>{{vendor.firstname}} {{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td>'+
            '<td>{{vendor.address2}}</td><td>{{vendor.city.name}}</td>'+
            '<td>{{vendor.state.name}}</td><td>{{vendor.country.name}}</td>'+
            '<td>{{vendor.postalcode}}</td><td>{{vendor.category}}</td>'+
            '<td>{{vendor.email}}</td><td>{{vendor.programid.name}}</td><td>{{vendor.contact}}</td><td>{{vendor.companyid.name}}</td>'+
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingVendorReportData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllVendorsReport(1, 200, $scope.searchby.value, $scope.search.searchContent,$scope.filterdata.selectedProgram,$scope.filterdata.selectedState,$scope.filterdata.selectedCompany);
                    }
                    $scope.printDiv = function(divName) {
                        var printContents = document.getElementById(divName).innerHTML;
                        var popupWin = window.open();
                        popupWin.document.write('<html><head><style>table { border:solid #000 !important;  border-width:1px 0 0 1px !important;} th, td { border:solid #000 !important;border-width:0 1px 1px 0 !important;}</style></head><body onload="window.print()"><table border="1">' + printContents + '</table></body></html>');
                        //popupWin..print();
                        popupWin.document.close();
                    }

                },
                post:function($scope){
                    $scope.generatepdf=function(){
                        var tempalateId = "cstore_vendorpdf";
                        var pdfquery = {"table": "vendors__cstore"};
                        pdfquery.columns = ["address2","programid", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", {"expression": "postalcode","type":"number"}, "category"];
                        pdfquery.filter = {};
                        if ($scope.searchby.value && $scope.search.searchContent && $scope.searchby.value != "" && $scope.search.searchContent != "") {
                            pdfquery.filter[$scope.searchby.value] = {"$regex": "(" + $scope.search.searchContent + ")", "$options": "-i"};
                        }
                        if ($scope.filterdata.selectedProgram) {
                            pdfquery.filter["programid._id"] = $scope.filterdata.selectedProgram._id;
                        }
                        if ($scope.filterdata.selectedState && $scope.filterdata.selectedState!="") {
                            pdfquery.filter["state._id"] = $scope.filterdata.selectedState._id;
                        }
                        pdfquery.orders = {};
                        if ($scope.sortingCol && $scope.sortingType) {
                            pdfquery.orders[$scope.sortingCol] = $scope.sortingType;
                        }
                        console.log(JSON.stringify(pdfquery))
                        $scope.vendorpdfurl = BAAS_SERVER + "/export/pdf?query=" + JSON.stringify(pdfquery) + "&ask=" + ASK + "&osk=" + OSK + "&templateId="+tempalateId;
                    }
                    $scope.getExportVendors = function () {
                        var query = {"table": "vendors__cstore"};
                        query.columns = ["firstname","lastname",{"expression": "programid", "columns": ["_id", "name"]},"email","address","address2",{"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]},"category",{"expression":"postalcode", "type":"number"},"contact"];
                        query.filter = {};
                        if ($scope.searchby.value && $scope.search.searchContent && $scope.searchby.value != "" && $scope.search.searchContent != "") {
                            query.filter[$scope.searchby.value] = {"$regex": "(" + $scope.search.searchContent + ")", "$options": "-i"};
                        }
                        if ($scope.filterdata.selectedProgram) {
                            query.filter["programid._id"] = $scope.filterdata.selectedProgram._id;
                        }
                        if ($scope.filterdata.selectedState && $scope.filterdata.selectedState!="") {
                            query.filter["state._id"] = $scope.filterdata.selectedState._id;
                        }
                        query.orders = {};
                        if ($scope.sortingCol && $scope.sortingType) {
                            query.orders[$scope.sortingCol] = $scope.sortingType;
                        }
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/export/excel";
                        $scope.tempUrl=serviceUrl+"?query="+JSON.stringify(query)+"&ask="+ASK+"&osk="+OSK;
                        console.log($scope.tempUrl);
                        //window.open(tempUrl,'_blank', 'width=300,height=300');
                    }
                }
            }
        }
    }
}]);
