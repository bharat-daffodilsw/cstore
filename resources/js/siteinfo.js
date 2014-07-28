cstore.controller('storeManagerList', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingStoreData = false;

    $scope.venderSearch = [
        {"value": "siteid", "name": "Site Id"},
        {"value": "storename", "name": "Site Name"},
        {"value": "programid.name", "name": "Program"},
        {"value": "manager.name", "name": "Manager Name"},
        {"value": "shift", "name": "Manager Shift"},
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
        {"value": "dealer", "name": "Dealer/Company Op"}
    ];

    $scope.searchby = $scope.venderSearch[0];
    $scope.storeManagers = [];
    $appService.auth();
    $scope.getAllStoreManagers = function (direction, limit, column, searchText) {
        if ($scope.loadingStoreData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingStoreData = true;
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["dealer","programid", "siteid", "manager.email", "manager.contact", "manager.name", "address", "cityid", "countryid", "manager", "postalcode", "stateid", "storename", "contact", "email", "brands", "pos_type", "shift", "loyalty_status", "pos_version", "reward_point", "pump_brand", "pump_model", "address2"];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeManagerData) {
            $scope.loadingStoreData = false;
            $scope.show.currentCursor = storeManagerData.response.cursor;
            $scope.storeManagers = storeManagerData.response.data;
            for (var i = 0; i < $scope.storeManagers.length; i++) {
                $scope.storeManagers[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getAllStoreManagers(1, 10);
    $scope.setStoreOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllStoreManagers(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllStoreManagers(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllStoreManagers(0, 10, column, searchText);
    }
    $scope.getEditCountries(null, null, null, $scope.storedata);
    $scope.getProgramList();    
});
cstore.controller('addStoreManagerCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.passwordStatus = true;
    var storeId = $routeParams.q;
    if (storeId && storeId != undefined && storeId != "undefined") {
        $scope.storedata["storeid"] = storeId;
        $scope.passwordStatus = false;
    }
    else {
        delete $scope.storedata["storeid"];
    }
});
cstore.directive('storeManagerList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'add-site-info\')"><a href="">Add</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="deleteStoreManagers()"><a href>Delete</a></button>' +
            '</div>' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()">' +
            '<input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div>' +
            '<input type="submit" style="display:none;"></form>' +
            '</div>' +
            '<div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" >' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a>' +
            '</div>' +
            '<div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + storeManagers.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)">' +
            '<a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left site_info">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<th></th>' +
            '<th><span>Site Id</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'siteid\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'siteid\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Site Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'storename\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Program</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Manager Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Manager Shift<span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'shift\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'shift\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Site Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'contact\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'contact\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Manager Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.contact\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.contact\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'email\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Manager Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.email\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Address</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'address\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'address\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Country</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'countryid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'countryid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>State</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'stateid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'stateid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>City</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'cityid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'cityid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Postal Code</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'postalcode\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'postalcode\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>POS Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_type\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_type\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>POS Version</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_version\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_version\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Loyalty Status</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'loyalty_status\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'loyalty_status\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Reward Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'reward_point\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'reward_point\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'brands\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'brands\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Pump Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_brand\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_brand\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Pump Model</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_model\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_model\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Dealer/Company Op</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'dealer\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'dealer\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th></th>' +
            '</tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input type="checkbox"ng-model="storeManager.deleteStatus"></td><td>{{storeManager.siteid}}</td><td>{{storeManager.storename}}</td><td>{{storeManager.programid.name}}</td><td>{{storeManager.manager.name}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.contact}}</td>' +
            '<td>{{storeManager.manager.contact}}</td><td>{{storeManager.email}}</td><td>{{storeManager.manager.email}}</td><td>{{storeManager.address}}</td><td>{{storeManager.countryid.name}}</td>' +
            '<td>{{storeManager.stateid.name}}</td><td>{{storeManager.cityid.name}}</td><td>{{storeManager.postalcode}}</td><td>{{storeManager.pos_type}}</td><td>{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td>'+
            '<td>{{storeManager.brands}}</td><td>{{storeManager.pump_brand}}</td><td>{{storeManager.pump_model}}</td>' +
            '<td>{{storeManager.dealer}}</td>' +
            '<td><a class="edit_btn" ng-click="setStoreState(storeManager)">Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingStoreData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllStoreManagers(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteStoreArray = [];
                    $scope.deleteStoreManagers = function () {
                        for (var i = 0; i < $scope.storeManagers.length; i++) {
                            if ($scope.storeManagers[i].deleteStatus) {
                                $scope.deleteStoreArray.push({"_id": $scope.storeManagers[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = angular.copy($scope.deleteStoreArray);
                        if (query.operations.length) {
                        $scope.loadingStoreData=true;
                        $scope.deleteStoreArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingStoreData=false;
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.storeManagers.length; i++) {
                                    if ($scope.storeManagers[i].deleteStatus) {
                                        $scope.storeManagers.splice(i, 1);
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
                            $("#popupMessage").html("please select at least one site before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.setStoreState = function (store) {
                        $scope.storedata["address"] = store.address ? store.address : "";
                        $scope.storedata["address2"] = store.address2 ? store.address2 : "";
                        $scope.storedata["pump_brand"] = store.pump_brand ? store.pump_brand : "";
                        $scope.storedata["pump_model"] = store.pump_model ? store.pump_model : "";
                        $scope.storedata["contact"] = store.contact ? store.contact : "";
                        $scope.storedata["email"] = store.email ? store.email : "";
                        $scope.storedata["pos_version"] = store.pos_version ? store.pos_version : "";
                        $scope.storedata["postalcode"] = store.postalcode ? store.postalcode : "";
                        $scope.storedata["storename"] = store.storename ? store.storename : "";
                        $scope.storedata["siteid"] = store.siteid ? store.siteid : "";
                        if (store.company_logo) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(store.company_logo, false);
                        $scope.storedata["manager"] = {};
                        if (store.manager) {
                            $scope.storedata["manager"]["contact"] = store.manager.contact ? store.manager.contact : "";
                            $scope.storedata["manager"]["email"] = store.manager.email ? store.manager.email : "";
                            $scope.storedata["manager"]["name"] = store.manager.name ? store.manager.name : "";

                        }
                        else {
                            $scope.storedata["manager"]["contact"] = "";
                            $scope.storedata["manager"]["email"] = "";
                            $scope.storedata["manager"]["name"] = "";

                        }
                        if (store.pos_type && $scope.storedata.posTypes) {
                            for (var j = 0; j < $scope.storedata.posTypes.length; j++) {
                                $scope.storedata.selectedPosType = "";
                                if ($scope.storedata.posTypes[j].name == store.pos_type) {
                                    $scope.storedata.selectedPosType = $scope.storedata.posTypes[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedPosType) {
                                $scope.storedata.selectedPosType = $scope.storedata.posTypes[$scope.storedata.posTypes.length - 1];
                                $scope.storedata.otherPosType = store.pos_type;
                            }
                        }
                        if (store.reward_point && $scope.storedata.rewardTypes) {
                            for (var j = 0; j < $scope.storedata.rewardTypes.length; j++) {
                                $scope.storedata.selectedRewardType = "";
                                if ($scope.storedata.rewardTypes[j].name == store.reward_point) {
                                    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedRewardType) {
                                $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[$scope.storedata.rewardTypes.length - 1];
                                $scope.storedata.otherRewardType = store.reward_point;
                            }
                        }
                        if (store.brands && $scope.storedata.brands) {
                            for (var j = 0; j < $scope.storedata.brands.length; j++) {
                                $scope.storedata.selectedBrand = "";
                                if ($scope.storedata.brands[j].name == store.brands) {
                                    $scope.storedata.selectedBrand = $scope.storedata.brands[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedBrand) {
                                $scope.storedata.selectedBrand = $scope.storedata.brands[$scope.storedata.brands.length - 1];
                                $scope.storedata.otherBrand = store.brands;
                            }
                        }
                        if (store.shift && $scope.storedata.shifts) {
                            for (var j = 0; j < $scope.storedata.shifts.length; j++) {
                                if ($scope.storedata.shifts[j].name == store.shift) {
                                    $scope.storedata.selectedShift = $scope.storedata.shifts[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedShift = "";
                                }
                            }
                        }
                        if (store.dealer && $scope.storedata.dealers) {
                            for (var j = 0; j < $scope.storedata.dealers.length; j++) {
                                if ($scope.storedata.dealers[j].name == store.dealer) {
                                    $scope.storedata.selectedDealer = $scope.storedata.dealers[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedDealer = "";
                                }
                            }
                        }
                        if (store.loyalty_status && $scope.storedata.loyalty_status) {
                            for (var j = 0; j < $scope.storedata.loyalty_status.length; j++) {
                                if ($scope.storedata.loyalty_status[j].name == store.loyalty_status) {
                                    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
                                }
                            }
                        }
                        if (store.countryid) {
                            store.stateid = (store.stateid) ? {"_id": store.stateid._id} : {"_id": false};
                            store.cityid = (store.cityid) ? {"_id": store.cityid._id} : {"_id": false};
                            $scope.getEditCountries(store.countryid._id, store.stateid._id, store.cityid._id, $scope.storedata);
                        }
                        if (store.programid) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == store.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-site-info?q=" + store._id;
                    }
                }
            }
        }
    }
}]);
cstore.directive('brand', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedBrand" ng-options="brand.name for brand in storedata.brands"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedBrand.name == \'Others\'" ng-model="storedata.otherBrand" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('posType', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedPosType" ng-options="posType.name for posType in storedata.posTypes"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedPosType.name== \'Others\'" ng-model="storedata.otherPosType" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('rewardType', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedRewardType" ng-options="rewardType.name for rewardType in storedata.rewardTypes"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedRewardType.name== \'Others\'" ng-model="storedata.otherRewardType" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('shift', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedShift" ng-options="shift.name for shift in storedata.shifts"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('loyaltyStatus', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedLoyaltyStatus" ng-options="loyalty_status.name for loyalty_status in storedata.loyalty_status"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('dealer', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedDealer" ng-options="dealer.name for dealer in storedata.dealers"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function ($scope) {
                }
            }
        }
    }
}]);
cstore.directive('addStoreManager', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Site Id*</div></td>' +
            '<td class="half_td"><div class="margin_top">Site Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.siteid"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.storename"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Manager Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Shift</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.manager.name"></td>' +
            '<td class="half_td"><shift></shift></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Site Phone*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Phone*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" maxlength="12" placeholder="" ng-model="storedata.contact"></td>' +
            '<td class="half_td"><input type="text" maxlength="12" placeholder=""ng-model="storedata.manager.contact" ></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Email*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.email"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.manager.email"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Address*</div></td>' +
            '<td class="half_td"><div class="margin_top">Address 2</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.address"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.address2"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-country-select></store-country-select></td>' +
            '<td class="half_td"><store-state-select></store-state-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td>' +
            '<td class="half_td"><div class="margin_top">Postal Code*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-city-select></store-city-select></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.postalcode"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">POS Type*</div></td>' +
            '<td class="half_td"><div class="margin_top">POS Version</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><pos-type></pos-type></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="storedata.pos_version"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Loyalty Status*</div></td>' +
            '<td class="half_td"><div class="margin_top">Reward Type*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><loyalty-status></loyalty-status></td>' +
            '<td class="half_td"><reward-type></reward-type></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Pump Brand</div></td>' +
            '<td class="half_td"><div class="margin_top">Pump Model </div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.pump_brand"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.pump_model"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Brand*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><brand></brand></td>' +
            '<td class="half_td"><program-select ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></program-select><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Dealer/Company Op</div></td>' +
            '<td class="half_td"></td>'+
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><dealer></dealer></td>' +
            '<td class="half_td"><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveStore()"><a href="">Save</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforStore(\'site-info\')"><a href="">Close</a></button>' +
            '</div>' +
            '</div></td>' +
            '</tr>' +
            '<tr>' +
            '</tr>' +
            '</table></div>' +
            '</div><div class="loadingImage" ng-hide="!loadingAddStoreData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddStoreData = true;
                    $scope.newStore = {};
                    $scope.setPathforStore = function (path) {
                        $scope.clearStoreContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    var usk = $scope.CSession["usk"] ? $scope.CSession["usk"] : null;
                    $scope.loadingAddStoreData = false;
                    $scope.saveStore = function () {
                        if ($scope.CSession) {
                            $scope.newStore = {};
                            $scope.newStore["manager"] = {};
                            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                            var email = $scope.storedata.email;
                            var managerEmail = $scope.storedata.manager.email;
                            if (!$scope.storedata.siteid) {
                                $("#popupMessage").html("Please enter site id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.storename) {
                                $("#popupMessage").html("Please enter site name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.manager.name) {
                                $("#popupMessage").html("Please enter manager name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.contact || !regNumberOnly.test($scope.storedata.contact)) {
                                $("#popupMessage").html("Please enter valid site phone number");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.manager.contact || !regNumberOnly.test($scope.storedata.manager.contact)) {
                                $("#popupMessage").html("Please enter valid manager contact");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!email || regEmail.test(email) == false) {
                                $("#popupMessage").html("Please enter a valid email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!managerEmail || regEmail.test(managerEmail) == false) {
                                $("#popupMessage").html("Please enter a valid manager email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.address) {
                                $("#popupMessage").html("Please enter address");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCountry) {
                                $("#popupMessage").html("Please select country");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedState) {
                                $("#popupMessage").html("Please select state");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCity) {
                                $("#popupMessage").html("Please select city");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.postalcode || !regNumberOnly.test($scope.storedata.postalcode)) {
                                $("#popupMessage").html("Please enter correct postal code");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedPosType || ($scope.storedata.selectedPosType.name == "Others" && !$scope.storedata.otherPosType)) {
                                $("#popupMessage").html("Please choose pos type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedLoyaltyStatus) {
                                $("#popupMessage").html("Please select loyalty status");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedRewardType || ($scope.storedata.selectedRewardType.name == "Others" && !$scope.storedata.otherRewardType)) {
                                $("#popupMessage").html("Please choose reward type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedBrand || ($scope.storedata.selectedBrand.name == "Others" && !$scope.storedata.otherBrand)) {
                                $("#popupMessage").html("Please choose brand");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingStatus = true;
                            if ($scope.storedata["storeid"]) {
                                $scope.newStore["_id"] = $scope.storedata["storeid"];
                            }
                            var query = {};
                            query.table = "storemanagers__cstore";
                            $scope.newStore.email = email;
                            $scope.newStore["storename"] = $scope.storedata.storename;
                            $scope.newStore["address"] = $scope.storedata.address;
                            $scope.newStore["address2"] = $scope.storedata.address2;
                            $scope.newStore["brands"] = ($scope.storedata.selectedBrand.name == "Others") ? $scope.storedata.otherBrand : $scope.storedata.selectedBrand.name;
                            $scope.newStore["siteid"] = $scope.storedata.siteid;
                            $scope.newStore["contact"] = $scope.storedata.contact;
                            $scope.newStore["email"] = $scope.storedata.email;

                            if ($scope.storedata.selectedCountry) {
                                $scope.newStore["countryid"] = {"_id": $scope.storedata.selectedCountry._id, "name": $scope.storedata.selectedCountry.name};
                            }
                            if ($scope.storedata.selectedState) {
                                $scope.newStore["stateid"] = {"_id": $scope.storedata.selectedState._id, "name": $scope.storedata.selectedState.name};
                            }
                            if ($scope.storedata.selectedCity) {
                                $scope.newStore["cityid"] = {"_id": $scope.storedata.selectedCity._id, "name": $scope.storedata.selectedCity.name};
                            }
                            if ($scope.currentUser["data"]) {
                                if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                    $scope.newStore["programid"] = {"_id": $scope.currentUser.data.programid};
                                }
                                else {
                                    $scope.newStore["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                                }
                            }
                            $scope.newStore["loyalty_status"] = $scope.storedata.selectedLoyaltyStatus.name;
                            $scope.newStore["pump_brand"] = $scope.storedata.pump_brand;
                            $scope.newStore["pump_model"] = $scope.storedata.pump_model;
                            $scope.newStore["pos_type"] = ($scope.storedata.selectedPosType.name == "Others") ? $scope.storedata.otherPosType : $scope.storedata.selectedPosType.name;
                            $scope.newStore["pos_version"] = $scope.storedata.pos_version;
                            $scope.newStore["postalcode"] = $scope.storedata.postalcode;
                            $scope.newStore["reward_point"] = ($scope.storedata.selectedRewardType.name == "Others") ? $scope.storedata.otherRewardType : $scope.storedata.selectedRewardType.name;
                            $scope.newStore["shift"] = $scope.storedata.selectedShift ? $scope.storedata.selectedShift.name : "";
                            $scope.newStore["dealer"] = $scope.storedata.selectedDealer ? $scope.storedata.selectedDealer.name : "";
                            $scope.newStore["manager"]["email"] = $scope.storedata.manager.email;
                            $scope.newStore["manager"]["contact"] = $scope.storedata.manager.contact;
                            $scope.newStore["manager"]["name"] = $scope.storedata.manager.name;
                            if (!$scope.storedata["storeid"]) {
                                $scope.newStore["assigned_user"] = false;
                            }
                            query.operations = [$scope.newStore];
                            $scope.saveFunction(query);
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {

                                $("#popupMessage").html("Site Info Saved");
                                $('.popup').toggle("slide");
                                $scope.setPathforStore("site-info");
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


