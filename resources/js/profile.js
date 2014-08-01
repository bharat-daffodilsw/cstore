cstore.controller('profileCtrl', function ($scope, $appService, $location, $routeParams) {
    var usk = $appService.getCookie("usk");
    var query = {"table": "user_profiles__cstore"};
    query.columns = ["userid", "roleid"];
    query.filter = {"userid": "{_CurrentUserId}"};
    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};
    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
        $scope.loggedIn = callBackData.response.data[0];

        var userquery = {"table": "users__baas"};
        userquery.columns = ["password", "_id"];
        userquery.filter = {"username": $scope.loggedIn.userid.username};
        var params = {"query": JSON.stringify(userquery), "ask": ASK, "osk": OSK, "usk": usk};

        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.loggedIn.userbassId = callBackData.response.data[0]._id;
            $scope.loggedIn.password = callBackData.response.data[0].password;
        });
    });

});

/*******************Profile***********************/
cstore.directive('profilePage', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: ' <div class="profile"><form ng-submit="saveName()">' +
            '<div class="">' +
            '<label class="profile_edit">Name</label>' +
            '<input type="text" placeholder="" name=""  size="" value="" title="" ng-model="loggedIn.userid.firstname">' +
            '</div>' +
            '<div class="">' +
            '<div class=""><label class="profile_edit">Username</label>' +
            '<label class="">{{loggedIn.userid.username}}</label>' +
            '</div>' +
            '<div class=""><label class="profile_edit">Role:</label>' +
            '<label class="">{{loggedIn.roleid.name}}</label>' +
            '</div>' +
            '<div class="change_pass"><a ng-click="toggleChangePass()">Change Password</a></div>' +
            '<div class="change-password-box" ng-show="showPass">' +
            '<label class="profile_edit">' +
            'Current password</label>' +
            '<input type="password" autocomplete="off" name="OldPasswd" id="OldPasswd" ng-model="oldPassword">' +
            '<label class="profile_edit">' +
            'New password</label>' +
            '<input type="password" name="Passwd" id="Passwd" ng-model="newPassword">' +
            '<label  class="profile_edit">' +
            'Confirm new password</label>' +
            '<input type="password" name="PasswdAgain" id="PasswdAgain" ng-model="confirmPassword">' +
            '</div>' +
            '<div class="add_delete pull-left">' +
            '<div class="add_btn pull-left"><input type="submit" value="Save"></div>' +
            '<div class="delete_btn pull-left"><button type="button"><a href="/">Close</a></button></div>' +
            '</div>' +
            '</div>' +
            '</form></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.toggleChangePass = function () {
                        $scope.showPass = !$scope.showPass;
                    }
                    $scope.saveName = function () {
                        var userquery = {};
                        var newoperationArray = {};
                        if (!$scope.loggedIn.userid.firstname) {
                            $("#popupMessage").html("Please enter name");
                            $('.popup').toggle("slide");
                            return;
                        }
                        if ($scope.showPass) {
                            if (!$scope.oldPassword) {
                                $("#popupMessage").html("Please enter current password");
                                $('.popup').toggle("slide");
                                return;
                            }
                            if ($scope.oldPassword != $scope.loggedIn.password) {
                                $("#popupMessage").html("Please enter correct password");
                                $('.popup').toggle("slide");
                                return;
                            }
                            if (!$scope.newPassword || !$scope.confirmPassword || $scope.newPassword != $scope.confirmPassword) {
                                $("#popupMessage").html("Password does not match");
                                $('.popup').toggle("slide");
                                return;
                            }
                        }
                        userquery.table = "user_profiles__cstore";
                        newoperationArray._id = $scope.loggedIn._id;
                        newoperationArray.userid = {};
                        newoperationArray.userid._id = $scope.loggedIn.userid._id;
                        newoperationArray.userid.firstname = $scope.loggedIn.userid.firstname;
                        userquery.operations = [newoperationArray];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(userquery, ASK, OSK, usk, function (data) {
                            if (data.response.update && data.response.update.length > 0) {
                                $scope.currentUser.data.firstname = $scope.loggedIn.userid.firstname;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                var c_name = "firstname";
                                document.cookie = c_name + "=" + escape($scope.currentUser.data.firstname);
                                if ($scope.showPass) {
                                    var query = {};
                                    var passOperationArray = {};
                                    query.table = "users__baas";
                                    passOperationArray._id = $scope.loggedIn.userbassId;
                                    passOperationArray.password = $scope.newPassword;
                                    query.operations = [passOperationArray];
                                    var currentSession = $appService.getSession();
                                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                                    $appService.save(query, ASK, OSK, usk, function (data) {
                                        if (data.response.update && data.response.update.length > 0) {
                                            $scope.oldPassword = "";
                                            $scope.newPassword = "";
                                            $scope.confirmPassword = "";
                                            $("#popupMessage").html("Saved successfully");
                                            $('.popup').toggle("slide");
                                            $scope.setPath('vendors');
                                        } else {
                                            $("#popupMessage").html(data.response);
                                            $('.popup').toggle("slide");
                                        }
                                    });
                                } else {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    window.location.href = "/";
                                }
                            } else {
                                $("#popupMessage").html(data.response);
                                $('.popup').toggle("slide");
                            }
                        });
                    }
                }
            }
        }
    }
}]);