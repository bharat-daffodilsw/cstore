cstore.controller('siteInfoReportCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingSiteInfoReportData = false;
    $scope.filterdata.selectedProgram="";
    $scope.venderSearch = [
        {"value": "siteid", "name": "Site Id"},
        {"value": "storename", "name": "Site Name"},
        {"value": "manager.name", "name": "Manager Name"},
        {"value": "contact", "name": "Site Phone"},
        {"value": "manager.contact", "name": "Manager Phone"},
        {"value": "email", "name": "Email"},
        {"value": "manager.email", "name": "Manager Email"},
        {"value": "address", "name": "Address"},
        {"value": "countryid.name", "name": "Country"},
        {"value": "stateid.name", "name": "State"},
        {"value": "cityid.name", "name": "City"},
        {"value": "postalcode", "name": "Postal Code"},
        {"value": "pos_type", "name": "POS Type"},
        {"value": "pos_version", "name": "POS Version"},
        {"value": "loyalty_status", "name": "Loyalty Status"},
        {"value": "reward_point", "name": "Reward Type"},
        {"value": "brands", "name": "Brand"},
        {"value": "pump_brand", "name": "Pump Brand"},
        {"value": "pump_model", "name": "Pump Model"},
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.siteInfoReport = [];
    $appService.auth();
    $scope.getAllSiteInfoReport = function (direction, limit, column, searchText, programFilter, shiftFilter,brandFilter) {
        if ($scope.loadingSiteInfoReportData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingSiteInfoReportData = true;

        var query = {"table": "storemanagers__cstore"};
        query.columns = ["programid", "siteid", "manager.email", "manager.contact", "manager.name", "address", "cityid", "countryid", "manager", "postalcode", "stateid", "storename", "contact", "email", "brands", "pos_type", "shift", "loyalty_status", "pos_version", "reward_point", "pump_brand", "pump_model", "address2"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (programFilter && programFilter != "") {
            query.filter["programid._id"] = programFilter._id;
        }
        if (shiftFilter && shiftFilter != "") {
            query.filter["shift"] = shiftFilter.name;
        }
        if (brandFilter && brandFilter != "") {
            query.filter["brands"] = brandFilter.name;
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (siteReportData) {
            $scope.loadingSiteInfoReportData = false;
            $scope.show.currentCursor = siteReportData.response.cursor;
            $scope.siteInfoReport = siteReportData.response.data;

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllSiteInfoReport(1, 200);
    $scope.setStoreOrder = function (sortingCol, sortingType, column, searchText, programFilter, shiftFilter,brandFilter) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllSiteInfoReport(1, 200, column, searchText, programFilter, shiftFilter,brandFilter);
    }
    $scope.getMore = function (column, searchText, programFilter, shiftFilter,brandFilter) {
        $scope.getAllSiteInfoReport(1, 200, column, searchText, programFilter, shiftFilter,brandFilter);
    }
    $scope.getLess = function (column, searchText, programFilter, shiftFilter,brandFilter) {
        $scope.getAllSiteInfoReport(0, 200, column, searchText, programFilter, shiftFilter,brandFilter);
    }
    $scope.getProgramList();

    $scope.filterByProgram = function (column, searchText, programFilter, shiftFilter,brandFilter) {
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllSiteInfoReport(1, 200, column, searchText, programFilter, shiftFilter,brandFilter);
    }
    $scope.filterSiteData = function (column, searchText, programFilter, shiftFilter,brandFilter) {
        $scope.show.preCursor = 0;
        $scope.show.currentCursor = 0;
        $scope.getAllSiteInfoReport(1, 200, column, searchText, programFilter, shiftFilter,brandFilter);
    }
    $scope.exportSites = function () {
        siteTableToExcel('siteTable', 'Site Info');
    }
    var siteTableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            }
            , format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                })
            }
        return function (table, name) {
            if (!table.nodeType) {
                table = document.getElementById(table)
                var mysiteclone = $("#siteTable").clone();
                var siteHtml = mysiteclone.html();
            }
            var ctx = {worksheet: name || 'Worksheet', table: siteHtml}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()

});

cstore.directive('filterProgramSite', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedProgram" ng-options="program.name for program in filterdata.programs" ng-change="filterByProgram(searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"><option value="">-- Choose Program --</option></select>'
    }
}]);
cstore.directive('filterShift', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="storedata.selectedShift" ng-options="shift.name for shift in storedata.shifts" ng-change="filterSiteData(searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"><option value="">-- Choose Shift --</option></select>'
    }
}]);
cstore.directive('filterBrand', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand filter_program" ng-model="filterdata.selectedBrand" ng-options="brand.name for brand in filterdata.brands" ng-change="filterSiteData(searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"><option value="">-- Choose Brand --</option></select>'
    }
}]);
cstore.directive('siteReport', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left">' +
            '<form ng-submit="search()">' +
            '<input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form>' +
            '</div><div class="delete_btn pull-right"><button type="button" ng-click="getExportSites()">Excel</button></div>' +
            '<div class="delete_btn pull-right"><button type="button" ng-click="generatesitepdf()">PDF</button></div>' +
            '<div class="delete_btn pull-right"><button type="button" ng-click="printSiteInfo(\'printSiteInfo\')">Print</button></div></div>' +
            '<div class="filter_div"><div class="pull-left filter_text">Filter</div><div class="pull-left filter_table"><filter-program></filter-program></div>' +
            '<div class="pull-left filter_table"><filter-shift></filter-shift></div>' +
            '<div class="pull-left filter_table"><filter-brand></filter-brand></div>' +
            '<div ng-click="getMore(searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + siteInfoReport.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left site_info" id="printSiteInfo">' +
            '<table id="siteTable" width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<th><span>Site Id</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'siteid\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'siteid\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Site Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'storename\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'storename\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Program</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Manager Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Manager Shift<span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'shift\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'shift\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Site Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'contact\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'contact\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Manager Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.contact\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.contact\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'email\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'email\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Manager Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.email\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.email\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Address</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'address\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'address\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Country</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'countryid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'countryid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>State</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'stateid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'stateid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>City</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'cityid.name\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'cityid.name\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Postal Code</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'postalcode\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'postalcode\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>POS Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_type\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_type\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>POS Version</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_version\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_version\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Loyalty Status</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'loyalty_status\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'loyalty_status\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Reward Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'reward_point\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'reward_point\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'brands\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'brands\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Pump Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_brand\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_brand\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '<th><span>Pump Model</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_model\',\'asc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_model\',\'desc\',searchby.value,search.searchContent,filterdata.selectedProgram,storedata.selectedShift,filterdata.selectedBrand)"></div>' +
            '</span></th>' +
            '</tr><tr ng-repeat="storeManager in siteInfoReport">' +
            '<td>{{storeManager.siteid}}</td><td>{{storeManager.storename}}</td><td>{{storeManager.programid.name}}</td><td>{{storeManager.manager.name}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.contact}}</td>' +
            '<td>{{storeManager.manager.contact}}</td><td>{{storeManager.email}}</td><td>{{storeManager.manager.email}}</td><td>{{storeManager.address}}</td><td>{{storeManager.countryid.name}}</td>' +
            '<td>{{storeManager.stateid.name}}</td><td>{{storeManager.cityid.name}}</td><td>{{storeManager.postalcode}}</td><td>{{storeManager.pos_type}}</td><td>{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td>' +
            '<td>{{storeManager.brands}}</td><td>{{storeManager.pump_brand}}</td><td>{{storeManager.pump_model}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingSiteInfoReportData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllSiteInfoReport(1, 200, $scope.searchby.value, $scope.search.searchContent, $scope.filterdata.selectedProgram, $scope.storedata.selectedShift,$scope.filterdata.selectedBrand);
                    }
                    $scope.printSiteInfo = function (divName) {
                        var printContents = document.getElementById(divName).innerHTML;
                        var popupWin = window.open();
                        popupWin.document.write('<html><head><style>table { border:solid #000 !important;  border-width:1px 0 0 1px !important;} th, td { border:solid #000 !important;border-width:0 1px 1px 0 !important;}</style></head><body onload="window.print()"><table border="1">' + printContents + '</table></body></html>');
                        //popupWin..print();
                        popupWin.document.close();
                    }
                },
                post: function ($scope) {
                    $scope.generatesitepdf = function () {
                        var tempalateId = "cstore_siteinfopdf";
                        var pdfquery = {"table": "storemanagers__cstore"};
                        pdfquery.columns = ["programid", "siteid", "manager.name", "manager", "stateid", "storename", "shift", "reward_point", "brands", "contact", "email", "cityid", "countryid", "postalcode", "address"];
                        pdfquery.filter = {};
                        if ($scope.searchby.value && $scope.search.searchContent && $scope.searchby.value != "" && $scope.search.searchContent != "") {
                            pdfquery.filter[$scope.searchby.value] = {"$regex": "(" + $scope.search.searchContent + ")", "$options": "-i"};
                        }
                        if ($scope.filterdata.selectedProgram) {
                            pdfquery.filter["programid._id"] = $scope.filterdata.selectedProgram._id;
                        }
                        if ($scope.storedata.selectedShift && $scope.storedata.selectedShift != "") {
                            pdfquery.filter["shift"] = $scope.storedata.selectedShift.name;
                        }
                        if ($scope.filterdata.selectedBrand && $scope.filterdata.selectedBrand != "") {
                            pdfquery.filter["brands"] = $scope.filterdata.selectedBrand.name;
                        }
                        pdfquery.orders = {};
                        if ($scope.sortingCol && $scope.sortingType) {
                            pdfquery.orders[$scope.sortingCol] = $scope.sortingType;
                        }
                        console.log(JSON.stringify(pdfquery))
                        $scope.sitepdfurl = BAAS_SERVER + "/export/pdf?query=" + JSON.stringify(pdfquery) + "&ask=" + ASK + "&osk=" + OSK + "&templateId=" + tempalateId;
                        var a = document.createElement('a');
                        a.href=$scope.sitepdfurl;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                    }
                    $scope.getExportSites = function () {
                        var query = {"table": "storemanagers__cstore"};
                        query.columns = ["siteid", "storename", {"expression": "programid", "columns": ["_id", "name"]}, "shift", "contact", "email", "address", {"expression": "countryid", "columns": ["_id", "name"]}, {"expression": "stateid", "columns": ["_id", "name"]}, {"expression": "cityid", "columns": ["_id", "name"]}, {"expression": "postalcode", "type": "number"}, "pos_type", "pos_version", "loyalty_status", "reward_point", "brands", "pump_brand", "pump_model", {"expression": "manager", "columns": ["_id", "name"]}];
                        query.filter = {};
                        if ($scope.searchby.value && $scope.search.searchContent && $scope.searchby.value != "" && $scope.search.searchContent != "") {
                            query.filter[$scope.searchby.value] = {"$regex": "(" + $scope.search.searchContent + ")", "$options": "-i"};
                        }
                        if ($scope.filterdata.selectedProgram) {
                            query.filter["programid._id"] = $scope.filterdata.selectedProgram._id;
                        }
                        if ($scope.storedata.selectedShift && $scope.storedata.selectedShift != "") {
                            query.filter["shift"] = $scope.storedata.selectedShift.name;
                        }
                        if ($scope.filterdata.selectedBrand && $scope.filterdata.selectedBrand != "") {
                            query.filter["brands"] = $scope.filterdata.selectedBrand.name;
                        }
                        query.orders = {};
                        if ($scope.sortingCol && $scope.sortingType) {
                            query.orders[$scope.sortingCol] = $scope.sortingType;
                        }
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/export/excel";
                        $scope.tempUrl = serviceUrl + "?query=" + JSON.stringify(query) + "&ask=" + ASK + "&osk=" + OSK;
                        var a = document.createElement('a');
                        a.href=$scope.tempUrl;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                    }
                }
            }
        }
    }
}]);

