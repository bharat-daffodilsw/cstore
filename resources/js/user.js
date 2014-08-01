cstore.controller('userCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingUserData = false;
    $scope.venderSearch = [
        {"value": "userid.firstname", "name": "Name"},
        {"value": "username", "name": "Email"},
        {"value": "roleid.name", "name": "Role"},
        {"value": "stores_id.storename", "name": "Site Name"},
        {"value": "programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.users = [];
    $appService.auth();
    $scope.getAllUsers = function (direction, limit, column, searchText) {
        if ($scope.loadingUserData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }
        $scope.loadingUserData = true;
        var query = {"table": "user_profiles__cstore"};

        query.columns = ["userid", "storeid", "roleid", "username","programid","userid.status","stores_id","stores_id.programid","userid.password","userid.lastname"];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["roleid._id"] = STOREMANAGER;
                query.filter["stores_id.programid._id"]=$scope.currentUser.data.programid;
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        else {
            query.orders["roleid"] = "asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.loadingUserData = false;
            $scope.show.currentCursor = userData.response.cursor;
            $scope.users = userData.response.data;
            for (var i = 0; i < $scope.users.length; i++) {
                $scope.users[i]["deleteStatus"] = false;
                $scope.users[i]["editStatus"] = false;
                $scope.users[i]["oldstatus"] = true;
                $scope.users[i]["prevStatus"]= $scope.users[i].userid.status;
            }

        }, function (jqxhr, error) {
            $("#popupMessage").html("exception in making request");
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllUsers(1, 10);
    $scope.setOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllUsers(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllUsers(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllUsers(0, 10, column, searchText);
    }
    $scope.getRoles();
    $scope.getProgramList();
});

/********************ADD User  *****************/
cstore.controller('addUserCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var userId = $routeParams.q;
    if (userId && userId != undefined && userId != "undefined") {
        $scope.userdata["userid"] = userId
    }
    else {
        delete $scope.userdata["userid"];
    }
});

cstore.directive('userList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-user\')" type="button">Add</button>' +
            '</div>' +
//            '<div class="delete_btn pull-left"><button ng-click="deleteUsers()"  type="button">Delete</button></div>' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + users.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
//            '<th></th>' +
            '<th><span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'userid.firstname\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'userid.firstname\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Email</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'username\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'username\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Role</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'roleid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'roleid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
//            '<th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
//            '<div class="sortDown" ng-click="setOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent)"></div></span></th>' +
            '<th ng-hide="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'"><span>Program</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'progarid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'progarmid.name\',\'desc\',searchby.value,search.searchContent)"></div></span></th>'+
            '<th>Sites</th>'+
            '<th></th>'+
            '</tr><tr ng-repeat="user in users">' +
//            '<td><input type="checkbox" ng-model="user.deleteStatus"></td>' +
            '<td>{{user.userid.firstname}}</td><td>{{user.username}}' +
            '</td><td>{{user.roleid.name}}</td>' +
//            '<td>{{user.storeid.storename}}</td>' +
            '<td ng-hide="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{user.programid.name}}</td>' +
            '<td>' +
//            '<table class="ordered_products">' +
//            '<tr ng-repeat="site in user.stores_id"><td class="ordered_pop">{{site.storename}}</td></tr>' +
//            '</table>' +
            '<span ng-repeat="site in user.stores_id"><span ng-hide=$index==0  style="padding-right: 5px;">,</span>{{site.storename}}</span>' +
            '</td>'+
            '<td><a class="edit_btn" ng-click="setUserState(user)" href>Edit</a>' +
            '<a class="edit_btn" ng-show="user.userid.status==true" ng-click="toggleUserStatus(user)" href>Deactivate</a>'+
            '<a class="edit_btn" ng-show="user.userid.status==false" ng-click="toggleUserStatus(user)" href>Activate</a></td>'+
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingUserData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllUsers(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteUserArray = [];
                    //$scope.siteArray=[];
                    $scope.deleteUsers = function () {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if ($scope.users[i].deleteStatus) {
                                $scope.deleteUserArray.push({"_id": $scope.users[i]._id, "__type__": "delete"});
                            }
//                            if ($scope.users[i].deleteStatus && $scope.users[i].storeid && ($scope.users[i].roleid._id==STOREMANAGER)) {
//                                $scope.siteArray.push({"_id": $scope.users[i]._id, "storeid": $scope.users[i].storeid});
//                            }
                        }
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = angular.copy($scope.deleteUserArray);
                        $scope.deleteUserArray = [];
                        if (query.operations.length) {
                            $scope.loadingUserData = true;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingUserData = false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.users.length; i++) {
                                        if ($scope.users[i].deleteStatus) {
                                            $scope.users.splice(i, 1);
                                            i--;
                                        }
                                    }
//                                    if($scope.siteArray && $scope.siteArray.length > 0){
//                                        $scope.updateSiteStatusWhileDeleting($scope.siteArray);
//                                    }
//                                    else {
                                        $scope.search();
                                        $("#popupMessage").html("Deleted");
                                        $('.popup').toggle("slide");
//                                    }

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
                            $("#popupMessage").html("please select at least one user before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.toggleUserStatus = function (user) {
                        var deactivateUser = {};
                        deactivateUser["_id"] = user._id;
                        deactivateUser["userid.username"] = user.userid.username;
                        deactivateUser["userid.status"] = !user.userid.status;
                        if (deactivateUser["userid.status"] == false && (user.roleid._id == STOREMANAGER || user.roleid._id == STOREADMIN)) {
                            deactivateUser["stores_id"] = {data: [], "override": "true"};
                        }
                        $scope.loadingUserData = true;
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = [deactivateUser];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingUserData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                user.userid.status = !user.userid.status;
                                if (user.userid.status == false && user.roleid._id == STOREMANAGER) {
                                    $scope.updateSiteStatusWhileDeleting(user.stores_id);
                                }
                                else if (user.userid.status == true && user.roleid._id == STOREMANAGER) {
                                    $("#popupMessage").html("Please Assign Sites to "+ user.userid.firstname);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("User Status Changed");
                                    $('.popup').toggle("slide");
                                }
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                                return;
                            }
                            else {
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
                    $scope.updateSiteStatusWhileDeleting = function (sitearray) {
                        $scope.loadingUserData = true;
                        var siteList=[];
                        for (var i = 0; i < sitearray.length; i++) {
                            siteList.push({"_id": sitearray[i]._id, "assigned_user": false});
                        }
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = siteList;
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingUserData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("User Status Chnaged");
                                $('.popup').toggle("slide");
                                $scope.search();
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
                    $scope.setUserState = function (user) {
                        $scope.userdata.stores_id=[];
                        $scope.userdata["firstname"] = user.userid ? user.userid.firstname : "";
                        $scope.userdata["lastname"] = user.userid ? user.userid.lastname : "";
                        $scope.userdata["password"] = user.userid ? user.userid.password : "";
                        $scope.userdata["username"] = user.username ? user.username : "";
                        if (user.roleid) {
                            for (var j = 0; j < $scope.userdata.roles.length; j++) {
                                if ($scope.userdata.roles[j]._id == user.roleid._id) {
                                    $scope.userdata.selectedRole = $scope.userdata.roles[j];
                                    break;
                                }
                            }
                        }
                        if (user.programid && user.roleid._id==PROGRAMADMIN) {
                            for (var j = 0; j < $scope.userdata.programs.length; j++) {
                                if ($scope.userdata.programs[j]._id == user.programid._id) {
                                    $scope.userdata.selectedProgram = $scope.userdata.programs[j];
                                    break;
                                }
                            }
                        }
                        if(user.roleid._id==STOREADMIN || user.roleid._id==STOREMANAGER){
                            $scope.getStores(user.roleid,user.stores_id);
                        }
                        if(user.roleid._id==STOREMANAGER){
                            $scope.userdata.stores_id=user.stores_id;
                        }
                        window.location.href = "#!edit-user?q=" + user._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('programAdminSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="userdata.selectedProgram" ng-options="program.name for program in userdata.programs"></select>'
    }
}]);

cstore.directive('addUser', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">First Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">Last Name</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="userdata.firstname"></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="userdata.lastname"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '<td class="half_td"><div class="margin_top">Password*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><span ng-if="userdata.userid">{{userdata.username}}</span><input ng-if="!userdata.userid" type="email" placeholder="" ng-model="userdata.username"></td>' +
            '<td class="half_td"><input type="password" placeholder="" ng-model="userdata.password"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Role*</div></td>' +
            '<td class="half_td" ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'|| userdata.selectedRole._id==\'53d5fe79894f1e646d2ca754\'"><div class="margin_top">Site Name*</div></td>' +
            '<td class="half_td" ng-show="userdata.selectedRole._id==\'539fddda1e993c6e426860c4\'"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><role-select></role-select></td>' +
            //'<td class="half_td" ng-if="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'"><store-select></store-select></td>' +
            '<td class="half_td" ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\' || userdata.selectedRole._id==\'53d5fe79894f1e646d2ca754\'"><div multi-select  input-model="userdata.stores"  button-label="storename" item-label="storename" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>' +
            '<td class="half_td" ng-if="userdata.selectedRole._id==\'539fddda1e993c6e426860c4\'"><program-admin-select></program-admin-select></td>' +
            '</tr>' +
            '</tbody></table></div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveUser()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforUser(\'manage-users\')"><a href="">Close</a></button>' +
            '</div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div></td></tr>' +
            '</tbody></table>',

        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.newUser = {};
                    $scope.setPathforUser = function (path) {
                        $scope.clearUserContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.saveUser = function () {
                        if (($scope.userdata.selectedRole._id == STOREMANAGER || $scope.userdata.selectedRole._id == STOREADMIN) && $scope.resultData) {
                            $scope.storeArray = [];
                            for (var i = 0; i < $scope.resultData.length; i++) {
                                $scope.storeArray.push({"_id": $scope.resultData[i]._id, "storename": $scope.resultData[i].storename});
                            }
                        }

                        $scope.newUser = {};
                        if ($scope.userdata.firstname == "" || $scope.userdata.firstname == undefined) {
                            $("#popupMessage").html("Please enter your firstname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $scope.userdata.username;
                        if (regEmail.test(email) == false) {
                            $("#popupMessage").html("Please enter a valid email");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.userdata.password) {
                            $("#popupMessage").html("Please enter password");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.userdata.selectedRole) {
                            $("#popupMessage").html("Please select role first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (($scope.userdata.selectedRole._id == STOREMANAGER || $scope.userdata.selectedRole._id == STOREADMIN) && $scope.storeArray.length == 0) {
                            $("#popupMessage").html("Please select at least one site");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        $scope.loadingStatus = true;
                        if ($scope.userdata["userid"]) {
                            $scope.newUser["_id"] = $scope.userdata["userid"];
                        }
                        $scope.newUser["userid"] = {"emailid": $scope.userdata.username, "firstname": $scope.userdata.firstname, "lastname": $scope.userdata.lastname, "password": $scope.userdata.password, "username": $scope.userdata.username, "status": true};
                        if ($scope.userdata.selectedRole) {
                            $scope.newUser["roleid"] = {"_id": $scope.userdata.selectedRole._id, "name": $scope.userdata.selectedRole.name};
                        }
                        $scope.newUser["username"] = $scope.userdata.username;
                        if ($scope.userdata.selectedRole._id == STOREMANAGER || $scope.userdata.selectedRole._id == STOREADMIN) {
                            $scope.newUser["stores_id"] = {data: $scope.storeArray, "override": "true"};
                        }
                        else {
                            $scope.newUser["stores_id"] = {data: [], "override": "true"};
                        }
                        if ($scope.userdata.selectedProgram) {
                            if ($scope.userdata.selectedRole._id == PROGRAMADMIN) {
                                $scope.newUser["programid"] = {"_id": $scope.userdata.selectedProgram._id, "name": $scope.userdata.selectedProgram.name};
                            }
                            else {
                                $scope.newUser["programid"] = null;
                            }
                        }
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = [$scope.newUser];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        //console.log(JSON.stringify($scope.userdata.stores_id));
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                if ($scope.userdata.selectedRole._id == STOREMANAGER) {
                                    $scope.updateSiteStatus($scope.userdata.stores, $scope.storeArray);
                                }
                                else if($scope.userdata.stores_id.length>0){
                                    $scope.updateSiteStatus($scope.userdata.stores_id);
                                }
                                else {
                                    $("#popupMessage").html("User Saved");
                                    $('.popup').toggle("slide");
                                    $scope.clearUserContent();
                                    window.location.href = "#!/manage-users";
                                }
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                                return;
                            }
                            else {
                                $("#popupMessage").html(callBackData.response);
                                $('.popup').toggle("slide");

                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (jqxhr, err) {
                            if (jqxhr.responseText && JSON.parse(jqxhr.responseText).response) {
                                $("#popupMessage").html(JSON.parse(jqxhr.responseText).response);
                                $('.popup').toggle("slide");
                                return;
                            }
                            else {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                                return;
                            }

                        });
                    }
                    $scope.updateSiteStatus = function (inputArray, siteArray) {
                        var siteList = [];
                        $scope.loadingUserData = true;
                        for (var i = 0; i < inputArray.length; i++) {
                            siteList.push({"_id": inputArray[i]._id, "assigned_user": false});
                        }
                        if(siteArray){
                            for (var k = 0; k < siteList.length; k++) {
                                for (var j = 0; j < siteArray.length; j++) {
                                    if (siteList[k]._id == siteArray[j]._id) {
                                        siteList[k].assigned_user = true;
                                    }
                                }
                            }
                        }
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = siteList;
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingUserData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("User Saved");
                                $('.popup').toggle("slide");
                                $scope.clearUserContent();
                                window.location.href = "#!/manage-users";
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
