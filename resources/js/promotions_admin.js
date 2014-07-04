/****************************Promotion***************************************************/
cstore.controller('promotionCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingPromotionData = false;
    $scope.venderSearch = [
        {"value": "promo_title", "name": "Promo Title"},
        {"value": "offer_title", "name": "Offer Title"},
        {"value": "programid.name", "name": "Program"},
        {"value": "offer_type", "name": "Offer Type"},
        {"value": "item_signage", "name": "Item Signage"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.promotions = [];
    $appService.auth();
    $scope.getAllPromotions = function (direction, limit, column, searchText, filterDate) {
        if ($scope.loadingPromotionData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingPromotionData = true;
        var query = {"table": "promotions__cstore"};
        query.columns = [
            {"expression": "end_date", "format": "MM/DD/YYYY HH:mm:ss"},
            "image",
            "item_signage",
            "offer_description",
            "offer_title",
            "offer_type",
            "promo_description",
            "promo_title",
            "reward_value",
            "sponsor",
            {"expression": "start_date", "format": "MM/DD/YYYY HH:mm:ss"},
            "threshold",
            "upc",
            "vendorid",
            "top_promo",
            "codes",
            "programid",
            "minimum_retail",
            "decal_description",
            "decal_subdescription"
        ];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (filterDate && filterDate != "") {
            query.filter["end_date"] = {"$gte": new Date(filterDate)};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var timeZone = new Date().getTimezoneOffset();
        //timeZone = timeZone * 60000;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (promotionData) {
            $scope.loadingPromotionData = false;
            $scope.show.currentCursor = promotionData.response.cursor;
            $scope.promotions = promotionData.response.data;
            for (var i = 0; i < $scope.promotions.length; i++) {
                $scope.promotions[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllPromotions(1, 10);
    $scope.setPromotionOrder = function (sortingCol, sortingType, column, searchText, filterDate) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllPromotions(1, 10, column, searchText, filterDate);
    }
    $scope.getMore = function (column, searchText, filterDate) {
        $scope.getAllPromotions(1, 10, column, searchText, filterDate);
    }
    $scope.getLess = function (column, searchText, filterDate) {
        $scope.getAllPromotions(0, 10, column, searchText, filterDate);
    }
    $scope.getPrograms(null, null);
});

cstore.controller('addPromotionCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var promotionId = $routeParams.q;
    if (promotionId && promotionId != undefined && promotionId != "undefined") {
        $scope.promotiondata["promotionid"] = promotionId;
    }
    else {
        delete $scope.promotiondata["promotionid"];
    }
});

cstore.directive('promotionList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="setPath(\'promo-notification\')"><a href>Notification</a></button></div>' +
            '<div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-promotion\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deletePromotion()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<span class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></><input type="submit" style="display:none;"></form></div>' +
            '<div class="pull-left order_date_filter"><form ng-submit="filterByDate()"><input id="filter_date" type="text" placeholder="Date" ng-model="promotiondata.filter_date" jqdatepicker /><span class="search_sign_3 pull-left"><a ng-click="filterByDate()"><img style="cursor: pointer width:30px;" src="images/Search.png"></a></span><input type="submit" style="display:none;"></form></div>' +
            '<div ng-click="getMore(searchby.value,search.searchContent,promotiondata.filter_date)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + promotions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,promotiondata.filter_date)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Promo Title</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'promo_title\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'promo_title\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th>' +
            '<th>Offer Title<span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_title\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_title\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th>' +
            '<th><span>Offer Type</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_type\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_type\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th><th><span>Item Signage</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'item_signage\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'item_signage\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th><span>Start Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'start_date\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'start_date\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th><span>End Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'end_date\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'end_date\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th></th></tr><tr ng-repeat="promotion in promotions"><td>' +
            '<input type="checkbox" ng-model="promotion.deleteStatus"></td><td>{{promotion.promo_title}}</td><td>{{promotion.offer_title}}</td><td>{{promotion.programid.name}}</td><td>' +
            '{{promotion.offer_type}}</td><td>{{promotion.item_signage}}</td><td>{{promotion.start_date}}</td><td>{{promotion.end_date}}</td>' +
            '<td><a class="edit_btn" ng-click="setPromotionState(promotion)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingPromotionData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPromotions(1, 10, $scope.searchby.value, $scope.search.searchContent, $scope.promotiondata.filter_date);
                    }

                    $scope.filterByDate = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPromotions(1, 10, $scope.searchby.value, $scope.search.searchContent, $scope.promotiondata.filter_date);
                    }
                    $scope.setAssignedPromo = function (promotionid, programid) {
                        window.location.href = "#!/assign-promo?id=" + promotionid + "&programid=" + programid;
                    }
                    $scope.deletePromotionArray = [];
                    $scope.deletePromotion = function () {
                        for (var i = 0; i < $scope.promotions.length; i++) {
                            if ($scope.promotions[i].deleteStatus) {
                                $scope.deletePromotionArray.push({"_id": $scope.promotions[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "promotions__cstore";
                        query.operations = angular.copy($scope.deletePromotionArray);
                        $scope.deletePromotionArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.promotions.length; i++) {
                                    if ($scope.promotions[i].deleteStatus) {
                                        $scope.promotions.splice(i, 1);
                                        i--;
                                    }
                                }
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
                    $scope.setPromotionState = function (promotion) {
                        var endArray=[];
                        var endMinArray=[];
                        var startArray = [];
                        var startMinArray = [];
                        if(promotion["end_date"]){
                            endArray = promotion["end_date"].split(" ");
                            endMinArray = endArray[1].split(":");
                        }
                        $scope.promotiondata.end_date = endArray[0];
                        if(promotion["start_date"]){
                            startArray = promotion["start_date"].split(" ");
                            startMinArray = startArray[1].split(":");
                        }
                        $scope.promotiondata.start_date = startArray[0];
                        if (promotion.end_date && $scope.promotiondata.hours && endMinArray) {
                            $scope.promotiondata.selectedEndHour = endMinArray[0];
                        }
                        if (promotion.start_date && $scope.promotiondata.hours && startMinArray) {
                            $scope.promotiondata.selectedStartHour = startMinArray[0];
                        }
                        if (promotion.end_date && $scope.promotiondata.minutes && endMinArray) {
                            $scope.promotiondata.selectedEndMinute = endMinArray[1];
                        }
                        if (promotion.start_date && $scope.promotiondata.minutes && startMinArray) {
                            $scope.promotiondata.selectedStartMinute = startMinArray[1];
                        }
                        if (promotion.end_date && $scope.promotiondata.minutes && endMinArray) {
                            $scope.promotiondata.selectedEndSecond = endMinArray[2];
                        }
                        if (promotion.start_date && $scope.promotiondata.seconds && startMinArray) {
                            $scope.promotiondata.selectedStartSecond = startMinArray[2];
                        }
                        $scope.promotiondata["promo_title"] = promotion.promo_title ? promotion.promo_title : "";
                        $scope.promotiondata["offer_description"] = promotion.offer_description ? promotion.offer_description : "";
                        $scope.promotiondata["offer_title"] = promotion.offer_title ? promotion.offer_title : "";
                        $scope.promotiondata["promo_description"] = promotion.promo_description ? promotion.promo_description : "";
                        $scope.promotiondata["reward_value"] = promotion.reward_value ? promotion.reward_value : "";
                        $scope.promotiondata["sponsor"] = promotion.sponsor ? promotion.sponsor : "";
                        $scope.promotiondata["threshold"] = promotion.threshold ? promotion.threshold : "";
                        $scope.promotiondata["codes"] = promotion.codes ? promotion.codes : [];
                        $scope.promotiondata["top_promo"] = promotion.top_promo ? promotion.top_promo : "";
                        $scope.promotiondata["minimum_retail"] = promotion.minimum_retail ? promotion.minimum_retail : "";
                        $scope.promotiondata["decal_description"] = promotion.decal_description ? promotion.decal_description : "";
                        $scope.promotiondata["decal_subdescription"] = promotion.decal_subdescription ? promotion.decal_subdescription : "";
                        if (promotion.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(promotion.image, false);
                        if (promotion.offer_type && $scope.promotiondata.offerTypes) {
                            for (var j = 0; j < $scope.promotiondata.offerTypes.length; j++) {
                                if ($scope.promotiondata.offerTypes[j].name == promotion.offer_type) {
                                    $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.vendorid && $scope.promotiondata.vendors) {
                            for (var j = 0; j < $scope.promotiondata.vendors.length; j++) {
                                if ($scope.promotiondata.vendors[j]._id == promotion.vendorid._id) {
                                    $scope.promotiondata.vendorsList = $scope.promotiondata.vendors[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.item_signage && $scope.promotiondata.itemSignage) {
                            for (var j = 0; j < $scope.promotiondata.itemSignage.length; j++) {
                                if ($scope.promotiondata.itemSignage[j].name == promotion.item_signage) {
                                    $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.upc && $scope.promotiondata.upc) {
                            for (var j = 0; j < $scope.promotiondata.upc.length; j++) {
                                if ($scope.promotiondata.upc[j].name == promotion.upc) {
                                    $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.programid) {
                            $scope.getPrograms(promotion.programid._id, promotion._id);
                        }
                        window.location.href = "#!edit-promotion?q=" + promotion._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('itemSignageSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedItemSignage" ng-options="itemSignage.name for itemSignage in promotiondata.itemSignage"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('offerTypeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedOfferType" ng-options="offerType.name for offerType in promotiondata.offerTypes"></select>',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('upcSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div>' +
            '<select class="brand" ng-model="promotiondata.selectedUpc" ng-options="upc.name for upc in promotiondata.upc" ng-change="changeUpc(promotiondata.selectedUpc.name)">' +
            '</select>' +
            '<ul id="upc_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showUpc">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '<ul id="plu_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showPlu">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '<ul id="group_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showGroup">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '</div>',
        compile: function () {
            return{
                pre: function () {
                }, post: function ($scope) {
                    $scope.getAllAvailableTags = function () {
                        var query = {"table": "product_codes__cstore"};
                        query.columns = ["description", "code", "type"];
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
                            $scope.availableTags = {0: [], 1: [], 2: []};
                            for (var i = 0; i < productData.response.data.length; i++) {
                                var type = productData.response.data[i].type;
                                switch (type) {
                                    case "UPC":
                                        $scope.availableTags[0].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                    case "PLU":
                                        $scope.availableTags[1].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                    case "GROUP":
                                        $scope.availableTags[2].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                }
                            }
                            $('#upc_grp_tags').tagit({"tagSource": $scope.availableTags[0], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $('#plu_grp_tags').tagit({"tagSource": $scope.availableTags[1], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $('#group_grp_tags').tagit({"tagSource": $scope.availableTags[2], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $scope.changeUpc($scope.promotiondata.selectedUpc.name);
                        }, function (jqxhr, error) {
                            $("#popupMessage").html(error);
                            $('.popup').toggle("slide");
                        })
                    }
                    $scope.changeUpc = function (type) {
                        var i = "";
                        if (!$scope.fillnotset && $scope.fillnotset != "false") {
                            $scope.fillnotset = "true";
                        }
                        switch (type.toUpperCase()) {
                            case "UPC":
                                $scope.showUpc = true;
                                $scope.showPlu = false;
                                $scope.showGroup = false;
                                $scope.parentId = "upc_grp_tags";
                                i = 0;
                                break;
                            case "PLU":
                                $scope.showPlu = true;
                                $scope.showUpc = false;
                                $scope.showGroup = false;
                                $scope.parentId = "plu_grp_tags";
                                i = 1;
                                break;
                            case "GROUP":
                                $scope.showGroup = true;
                                $scope.showUpc = false;
                                $scope.showPlu = false;
                                $scope.parentId = "group_grp_tags";
                                i = 2;
                                break;
                        }
                        if ($scope.promotiondata && $scope.promotiondata.codes && $scope.promotiondata.codes.length > 0 && $scope.parentId && $scope.fillnotset == "true") {
                            var fillCodes = $scope.promotiondata.codes;
                            $('#' + $scope.parentId).tagit('fill', fillCodes);
                            $scope.fillnotset = "false";
                        }
                    }
                    $scope.getAllAvailableTags();
                }
            }
        }
    }
}]);

cstore.directive('selectProgramPromo', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedProgram" ng-options="program.name for program in promotiondata.programs" ng-change="getProgramSelectedStore(promotiondata.selectedProgram._id,null)"></select>'
    }
}]);


cstore.directive('addPromotion', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Promo Title*</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Title*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.promo_title"></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.offer_title"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Promo Description*</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.promo_description"></textarea></td>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.offer_description"></textarea></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Sponsor*</div></td>' +
            '<td class="half_td"><div class="margin_top">Vendor*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.sponsor"></td>' +
            '<td class="half_td"><select class="brand" ng-model="promotiondata.vendorsList" ng-options="vendor.firstname for vendor in promotiondata.vendors"></select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top"><div class="date_time pull-left">Start Date*</div><span class="hours">HH</span><span class="minutes">MM</span><span class="minutes">SS</span></div></td>' +
            '<td class="half_td"><div class="margin_top"><div class="date_time pull-left">End Date*</div><span class="hours">HH</span><span class="minutes">MM</span><span class="minutes">SS</span></div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">' +
            '<input class="date_time" id="start_date" type="text" ng-model="promotiondata.start_date" jqdatepicker />' +
            '<select class="hour_min" ng-model="promotiondata.selectedStartHour" ng-options="hour for hour in promotiondata.hours"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedStartMinute" ng-options="minute for minute in promotiondata.minutes"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedStartSecond" ng-options="second for second in promotiondata.seconds"></select>' +
            '</td>' +
            '<td class="half_td">' +
            '<input class="date_time" id="end_date" type="text" ng-model="promotiondata.end_date" jqdatepicker />' +
            '<select class="hour_min" ng-model="promotiondata.selectedEndHour" ng-options="hour for hour in promotiondata.hours"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedEndMinute" ng-options="minute for minute in promotiondata.minutes"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedEndSecond" ng-options="second for second in promotiondata.seconds"></select>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Reward Value*</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Type*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">$ <input style="width: 91%;" type="text" placeholder="" ng-model="promotiondata.reward_value.amount"></td>' +
            '<td class="half_td"><offer-type-select></offer-type-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Item Signage*</div></td>' +
            '<td class="half_td"><div class="margin_top">Threshold*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><item-signage-select></item-signage-select></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.threshold"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Program</div></td>' +
            '<td class="half_td"><div class="margin_top">Sites</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><select-program-promo ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></select-program-promo><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '<td class="half_td"><div multi-select  input-model="promotiondata.stores"  button-label="siteName" item-label="siteName" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Decal Description</div></td>' +
            '<td class="half_td"><div class="margin_top">Decal Subdescription</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.decal_description"></textarea></td>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.decal_subdescription"></textarea></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">UPC/PLU/GROUP*</div></td>' +
            '<td class="half_td"><div class="margin_top">Promo Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><upc-select></upc-select></td>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '<td class="product_image half_td"><span ng-show="promotiondata.display_image"><img ng-src="promotiondata.display_image"</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Minimum Retail*</div></td>' +
            '<td class="half_td"><div class="margin_top"></div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">$ <input style="width: 91%;" type="text" placeholder="" ng-model="promotiondata.minimum_retail.amount"></td>' +
            '<td class="half_td"><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="savePromotion()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforPromotion(\'promotions\')"><a href="">Close</a></button>' +
            '</div></div></td>' +
            '</tr>' +
            '</tbody></table></div>' +
            '<div class="loadingImage" ng-hide="!loadingAddPromotionData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    //$scope.promotiondata["editImage"] = false;
                    $scope.loadingAddPromotionData = true;
                    $scope.newPromotion = {};
                    $scope.setPathforPromotion = function (path) {
                        $scope.clearPromotionContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.loadingAddPromotionData = false;
                    var regDecimalNumberOnly = /^[+]?\d[0-9\.-]*$/;
                    $scope.savePromotion = function () {

                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            var tags = $scope.showTags($('#' + $scope.parentId).tagit("tags"));
                            if (!$scope.promotiondata.promo_title) {
                                $("#popupMessage").html("Please enter promo title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_title) {
                                $("#popupMessage").html("Please enter offer title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.promo_description) {
                                $("#popupMessage").html("Please enter promo description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_description) {
                                $("#popupMessage").html("Please enter offer description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.sponsor) {
                                $("#popupMessage").html("Please enter sponsor");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.start_date) {
                                $("#popupMessage").html("Please select start date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.end_date) {
                                $("#popupMessage").html("Please select end date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (new Date($scope.promotiondata.start_date) > new Date($scope.promotiondata.end_date)) {
                                $("#popupMessage").html("Please select valid start or end date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.reward_value || !$scope.promotiondata.reward_value.amount || !regDecimalNumberOnly.test($scope.promotiondata.reward_value.amount)) {
                                $("#popupMessage").html("Please enter valid reward value");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.threshold || !regNumberOnly.test($scope.promotiondata.threshold)) {
                                $("#popupMessage").html("Please enter valid numeric threshold value");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            //if (!$scope.resultData || $scope.resultData.length<=0) {
                            //    $("#popupMessage").html("Please select atleast one store");
                            //    $('.popup').toggle("slide");
                            //    return false;
                            //}
                            if (($scope.promotiondata.selectedUpc.name == "PLU" || $scope.promotiondata.selectedUpc.name == "GROUP") && tags.length > 1) {
                                $("#popupMessage").html("You can select only one tag in " + $scope.promotiondata.selectedUpc.name);
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.minimum_retail || !$scope.promotiondata.minimum_retail.amount || !regDecimalNumberOnly.test($scope.promotiondata.minimum_retail.amount)) {
                                $("#popupMessage").html("Please enter valid minimum retail");
                                $('.popup').toggle("slide");
                                return false;
                            }

                            $scope.loadingAddPromotionData = true;

                            var query = {};
                            query.table = "promotions__cstore";
                            if ($scope.promotiondata["promotionid"]) {
                                $scope.newPromotion["_id"] = $scope.promotiondata["promotionid"];
                            }
                            $scope.storeManagerArray = [];
                            for (var i = 0; i < $scope.resultData.length; i++) {
                                $scope.storeManagerArray.push({"_id": $scope.resultData[i].storeid._id, "email": $scope.resultData[i].userid.emailid, "opt": true, "submitted": false});
                            }
                            $scope.newPromotion["end_date"] = new Date($scope.promotiondata.end_date + " " + $scope.promotiondata.selectedEndHour + ":" + $scope.promotiondata.selectedEndMinute + ":" + $scope.promotiondata.selectedEndSecond);
                            $scope.newPromotion["item_signage"] = $scope.promotiondata.selectedItemSignage.name;
                            $scope.newPromotion["offer_description"] = $scope.promotiondata.offer_description;
                            $scope.newPromotion["offer_title"] = $scope.promotiondata.offer_title;
                            $scope.newPromotion["offer_type"] = $scope.promotiondata.selectedOfferType.name;
                            $scope.newPromotion["promo_description"] = $scope.promotiondata.promo_description;
                            $scope.newPromotion["promo_title"] = $scope.promotiondata.promo_title;
                            $scope.newPromotion["reward_value"] = {"amount": $scope.promotiondata.reward_value.amount, "type": {"currency": "usd"}};
                            $scope.newPromotion["sponsor"] = $scope.promotiondata.sponsor;
                            $scope.newPromotion["start_date"] = new Date($scope.promotiondata.start_date + " " + $scope.promotiondata.selectedStartHour + ":" + $scope.promotiondata.selectedStartMinute + ":" + $scope.promotiondata.selectedStartSecond);
                            $scope.newPromotion["threshold"] = $scope.promotiondata.threshold;
                            $scope.newPromotion["store_manager_id"] = {data: $scope.storeManagerArray, "override": "true"};
                            $scope.newPromotion["minimum_retail"] = {"amount": $scope.promotiondata.minimum_retail.amount, "type": {"currency": "usd"}};
                            $scope.newPromotion["decal_description"] = $scope.promotiondata.decal_description;
                            $scope.newPromotion["decal_subdescription"] = $scope.promotiondata.decal_subdescription;
                            if (tags && tags.length > 0) {
                                $scope.newPromotion["codes"] = tags;
                            }
                            $scope.newPromotion["upc"] = $scope.promotiondata.selectedUpc.name;
                            $scope.newPromotion["vendorid"] = {"_id": $scope.promotiondata.vendorsList._id};
                            if ($scope.currentUser["data"]) {
                                if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                    $scope.newPromotion["programid"] = {"_id": $scope.currentUser.data.programid};
                                }
                                else {
                                    $scope.newPromotion["programid"] = {"name": $scope.promotiondata.selectedProgram.name, "_id": $scope.promotiondata.selectedProgram._id};
                                }
                            }

                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newPromotion["image"];
                                query.operations = [$scope.newPromotion];
                                $scope.saveFunction(query);
                            }
                            else {
                                var current_file = {};
                                current_file.name = $scope.oFile.name;
                                current_file.type = $scope.oFile.type;
                                current_file.contents = $scope.oFile.data;
                                current_file.ask = ASK;
                                current_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                    $scope.loadingAddPromotionData = false;
                                    if (data.response) {
                                        $scope.newPromotion["image"] = data.response;
                                        if(!$scope.promotiondata.selectedProgram.cooler_html && !$scope.promotiondata.selectedProgram.aisle_html){
                                            $scope.newPromotion["display_image"] = data.response;
                                        }
                                        query.operations = [$scope.newPromotion];
                                        $scope.saveFunction(query);
                                    }
                                    else {
                                        $("#popupMessage").html("some error while uploading image please try again");
                                        $('.popup').toggle("slide");
                                    }
                                }, function (callbackerror) {
                                    $("#popupMessage").html(callbackerror);
                                    $('.popup').toggle("slide");
                                });
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
//                                if($scope.promotiondata.selectedProgram && $scope.promotiondata.selectedProgram.cooler_html && $scope.promotiondata.selectedProgram.aisle_html){
//                                    var requestBody={};
//                                    if(callBackData.response.insert){
//                                        requestBody={"ask":ASK,"osk":OSK,"promoid":callBackData.response.insert[0]._id}
//                                    }
//                                    else {
//                                        requestBody={"ask":ASK,"osk":OSK,"promoid":callBackData.response.update[0]._id};
//                                    }
//
//                                    $appService.getDataFromJQuery("/rest/create/image/cstore",requestBody,"GET","JSON",function(err,data){
//                                        if(err){
//                                            $("#popupMessage").html(err.Error);
//                                            $('.popup').toggle("slide");
//                                        }
//                                        else {
//                                            if(data.update.display_image){
//                                                var display_image=data.update.display_image;
//                                               $scope.promotiondata["display_image"]= BAAS_SERVER + "/file/render?filekey=" + display_image[0]["key"] + "&ask=" + ASK + "&osk=" + OSK;
//                                            }
//                                        }
//                                    })
//                                }
////                                else{
////                                    $scope.promotiondata["display_image"]= BAAS_SERVER + "/file/render?filekey=" + data.update.image[0]["key"] + "&ask=" + ASK + "&osk=" + OSK;
////                                }
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforPromotion("promotions");
                            }
                            else if ((callBackData.response && callBackData.response.indexOf("Duplicate value for Unique columns") >= 0 ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.indexOf("Duplicate value for Unique columns") >= 0)) {
                                $("#popupMessage").html("There is duplicate value for promo title or offer titile");
                                $('.popup').toggle("slide");
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving promotion");
                                $('.popup').toggle("slide");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (err) {
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");

                        });
                    }
                }
            }
        }
    }
}]);
