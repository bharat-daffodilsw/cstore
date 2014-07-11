cstore.controller('vendorCtrl', function ($scope, $appService, $location) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingVenderData = false;
    $scope.testSortingCol="";
    $scope.venderSearch = [
        {"value": "firstname", "name": "Name"},
        {"value": "address", "name": "Address"},
        {"value": "city.name", "name": "City"},
        {"value": "state.name", "name": "State"},
        {"value": "email", "name": "Email"},
        {"value": "programid.name", "name": "Program"},
        {"value": "contact", "name": "Contact"},
        {"value": "companyid.name", "name": "Company"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.vendors = [];
    $appService.auth();
    $scope.getAllVendors = function (direction, limit, column, searchText) {
        if ($scope.loadingVenderData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingVenderData = true;

        var query = {"table": "vendors__cstore"};
        query.columns = ["address2","programid", "companyid", "address", {"expression": "city", "columns": ["_id", "name"]}, {"expression": "state", "columns": ["_id", "name"]}, {"expression": "country", "columns": ["_id", "name"]}, "contact", "email", "firstname", "lastname", "postalcode", "category","notes"];
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
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
            $scope.loadingVenderData = false;
            $scope.show.currentCursor = vendorData.response.cursor;
            $scope.vendors = vendorData.response.data;
            for (var i = 0; i < $scope.vendors.length; i++) {
                $scope.vendors[i]["deleteStatus"] = false;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllVendors(1, 10);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0;
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllVendors(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllVendors(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllVendors(0, 10, column, searchText);
    }
    $scope.getEditCountries(null, null, null, $scope.data);
    $scope.getProgramList();
    $scope.getCompanyList();
});

cstore.controller('addNewVendorCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var vendorId = $routeParams.q;
    if (vendorId && vendorId != undefined && vendorId != "undefined") {
        $scope.data["userid"] = vendorId
    }
    else {
        delete $scope.data["userid"];

    }

});

cstore.directive('vendor', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-vendor\')" type="button">Add</button>' +
            '</div><div class="delete_btn pull-left"><button ng-click="deleteVendors()"  type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + vendors.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            '<span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'firstname\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'firstname\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Address</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'address\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'address\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>City</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'city.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'city.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>State</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'state.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'state.name\',\'desc\',searchby.value,search.searchContent)"></div></span>	</th><th><span>Email</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'email\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>' +
            '<span>Program</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Contact No.</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'contact\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setOrder(\'contact\',\'desc\',searchby.value,search.searchContent)"></div></span>	</th>'+
            '<th><span>Company</span><span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'companyid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'companyid.name\',\'desc\',searchby.value,search.searchContent)"></div></span>	</th><th></th>' +
            '</tr><tr ng-repeat="vendor in vendors"><td><input type="checkbox" ng-model="vendor.deleteStatus"></td><td>{{vendor.firstname}} {{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td><td>{{vendor.city.name}}</td><td>{{vendor.state.name}}</td><td>{{vendor.email}}</td><td>{{vendor.programid.name}}</td><td>{{vendor.contact}}</td><td>{{vendor.companyid.name}}</td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="setUserState(vendor)">Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingVenderData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllVendors(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteUserArray = [];
                    $scope.deleteVendors = function () {
                        for (var i = 0; i < $scope.vendors.length; i++) {
                            if ($scope.vendors[i].deleteStatus) {
                                $scope.deleteUserArray.push({"_id": $scope.vendors[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = angular.copy($scope.deleteUserArray);
                        $scope.deleteUserArray = [];
                        if (query.operations.length) {
                            $scope.loadingVenderData=true;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingVenderData=false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.vendors.length; i++) {
                                        if ($scope.vendors[i].deleteStatus) {
                                            $scope.vendors.splice(i, 1);
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
                    $scope.setUserState = function (vendor) {
                        $scope.data["firstname"] = vendor.firstname ? vendor.firstname : "";
                        $scope.data["lastname"] = vendor.lastname ? vendor.lastname : "";
                        $scope.data["contact"] = vendor.contact ? vendor.contact : "";
                        $scope.data["postalCode"] = vendor.postalcode ? vendor.postalcode : "";
                        $scope.data["address"] = vendor.address ? vendor.address : "";
                        $scope.data["email"] = vendor.email ? vendor.email : "";
                        $scope.data["address2"] = vendor.address2 ? vendor.address2 : "";
                        $scope.data["notes"] = vendor.notes ? vendor.notes : "";
                        if (vendor.category) {
                            for (var j = 0; j < $scope.data.vendorCategories.length; j++) {
                                $scope.data.selectedVendorCategory = "";
                                if ($scope.data.vendorCategories[j].name == vendor.category) {
                                    $scope.data.selectedVendorCategory = $scope.data.vendorCategories[j];
                                    break;
                                }
                            }
                            if (!$scope.data.selectedVendorCategory) {
                                $scope.data.selectedVendorCategory = $scope.data.vendorCategories[$scope.data.vendorCategories.length - 1];
                                $scope.data.otherCategory = vendor.category;
                            }
                        }
                        if (vendor.country) {
                            vendor.state = (vendor.state) ? {"_id": vendor.state._id} : {"_id": false};
                            vendor.city = (vendor.city) ? {"_id": vendor.city._id} : {"_id": false};
                            $scope.getEditCountries(vendor.country._id, vendor.state._id, vendor.city._id, $scope.data);
                        }

                        if (vendor.programid && $scope.currentUser["data"] && $scope.currentUser["data"]["roleid"] == ADMIN) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == vendor.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
                        }

                        if (vendor.companyid) {
                            for (var j = 0; j < $scope.data.companies.length; j++) {
                                if ($scope.data.companies[j]._id == vendor.companyid._id) {
                                    $scope.data.selectedCompany = $scope.data.companies[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-vendor?q=" + vendor._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('company', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="select_city"  ng-model="data.selectedCompany" ng-options="company.name for company in data.companies"></select>'+
        '<input type="text" placeholder="" ng-show = "data.selectedCompany.name == \'Others\'" ng-model="data.otherCompany" class="other_input pull-left" >',

        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('addVendor', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">First Name*</div></td>' +
            '<td><div class="margin_top">Last Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="data.firstname"></td>' +
            '<td><input type="text" placeholder=""ng-model="data.lastname"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="datanotes"><input type="email" ng-model="data.email"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="data.address"> </textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address 2</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="data.address2"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><vendor-country-select></vendor-country-select></td>' +
            '<td class="half_td"><state-select></state-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td>' +
            '<td class="half_td"><div class="margin_top">Category*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><city-select></city-select></td>' +
            '<td class="half_td"><vendor-category-select></vendor-category-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Postal Code*</div></td>' +
            '<td class="half_td"><div class="margin_top">Contact No.*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text"  placeholder="" ng-model="data.postalCode"></td>' +
            '<td class="half_td"><input maxlength="12" type="text" ng-model="data.contact" placeholder=""></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Company*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><company></company></td>' +
            '<td class="half_td"><program-select ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></program-select><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Notes</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="data.notes"> </textarea></textarea></td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button ng-click="saveVendor()" type="button">Save</button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button ng-click="setPathforVender(\'vendors\')" type="button">Close</button>' +
            '</div>' +
            '</div></td>' +
            '</tr>' +
            '</table></div>' +
            '<div class="loadingImage" ng-hide="!loadingAddVenderData"><img src="images/loading.gif"></div>' +
            '</div>',

        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddVenderData = true;
                    $scope.disabled = false;
                    $scope.newVendor = {};
                    $scope.setPathforVender = function (path) {
                        $scope.clearContent();
                        $scope.removeCategoryValue();
                        window.location.href = "#!/" + path;
                    }
                    $scope.removeCategoryValue = function () {
                        $scope.data.vendorCategories.splice($scope.data.vendorCategories.length - 2, 1);
                    }
                },
                post: function ($scope) {
                    $scope.loadingAddVenderData = false;
                    $scope.saveVendor = function () {
                        $scope.disabled = true;
                        $scope.newVendor = {};
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var email = $scope.data.email;
                        if (!$scope.data.firstname) {
                            $("#popupMessage").html("Please enter firstname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.lastname) {
                            $("#popupMessage").html("Please enter lastname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!email || regEmail.test(email) == false) {
                            $("#popupMessage").html("Please enter a valid email id");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.address) {
                            $("#popupMessage").html("Please enter address");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCountry) {
                            $("#popupMessage").html("Please select country first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedState) {
                            $("#popupMessage").html("Please select state first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCity) {
                            $("#popupMessage").html("Please select city first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedVendorCategory) {
                            $("#popupMessage").html("Please select category first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data.selectedVendorCategory.name == "Others" && !$scope.data.otherCategory) {
                            $("#popupMessage").html("Please enter category");
                            $('.popup').toggle("slide");
                            return false;
                        }

                        if (!$scope.data.postalCode || !regNumberOnly.test($scope.data.postalCode)) {
                            $("#popupMessage").html("Please enter correct postal code");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.contact || !regNumberOnly.test($scope.data.contact)) {
                            $("#popupMessage").html("Please enter correct contact");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCompany || ($scope.data.selectedCompany.name == "Others" && !$scope.data.otherCompany)) {
                            $("#popupMessage").html("Please choose brand");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data["userid"]) {
                            $scope.newVendor["_id"] = $scope.data["userid"];
                        }
                        $scope.loadingAddVenderData = true;
                        $scope.newVendor.email = email;
                        $scope.newVendor["firstname"] = $scope.data.firstname;
                        $scope.newVendor["lastname"] = $scope.data.lastname;
                        $scope.newVendor["address"] = $scope.data.address;
                        $scope.newVendor["address2"] = $scope.data.address2;
                        $scope.newVendor["notes"] = $scope.data.notes;
                        $scope.newVendor["category"] = ($scope.data.selectedVendorCategory.name == "Others") ? $scope.data.otherCategory : $scope.data.selectedVendorCategory.name;
                        if ($scope.data.selectedCountry && $scope.data.selectedCountry != null && $scope.data.selectedCountry != undefined && $scope.data.selectedCountry != "undefined" && $scope.data.selectedCountry != "null") {
                            $scope.newVendor["country"] = {"_id": $scope.data.selectedCountry._id, "name": $scope.data.selectedCountry.name}
                        }
                        if ($scope.data.selectedCity && $scope.data.selectedCity != null && $scope.data.selectedCity != undefined && $scope.data.selectedCity != "undefined" && $scope.data.selectedCity != "null") {
                            $scope.newVendor["city"] = {"_id": $scope.data.selectedCity._id, "name": $scope.data.selectedCity.name}
                        }
                        if ($scope.data.selectedState && $scope.data.selectedState != null && $scope.data.selectedState != undefined && $scope.data.selectedState != "undefined" && $scope.data.selectedState != "null") {
                            $scope.newVendor["state"] = {"_id": $scope.data.selectedState._id, "name": $scope.data.selectedState.name}
                        }
                        $scope.newVendor["postalcode"] = $scope.data.postalCode;
                        $scope.newVendor["contact"] = $scope.data.contact;
                        $scope.newVendor["email"] = $scope.data.email;
                        if ($scope.currentUser["data"]) {
                            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                $scope.newVendor["programid"] = {"_id": $scope.currentUser.data.programid};
                            }
                            else {
                                $scope.newVendor["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                            }
                        }
                        if($scope.data.selectedCompany.name=="Others" || $scope.data.otherCompany){
                            $scope.newVendor["companyid"] = { "name": $scope.data.otherCompany };
                        }
                        else{
                            $scope.newVendor["companyid"] = {"name": $scope.data.selectedCompany.name, "_id": $scope.data.selectedCompany._id};
                        }

                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = [$scope.newVendor];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingAddVenderData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.disabled = false;
                                $scope.setPathforVender('vendors');
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving user");
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
