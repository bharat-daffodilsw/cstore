cstore.controller('resetpasswordCtrl', function ($scope, $appService, $location, $routeParams) {
    $scope.resetPassword = function (password, fpcode, callback) {
        var params = {};
        params.pwd = password;
        params.fpcode = fpcode;
        $appService.getDataFromJQuery(BAAS_SERVER + "/resetpassword", params, "GET", "JSON", function (callBackData) {
            callback(callBackData);
        }, function (jqxhr, error) {
            $("#popupMessage").html("Something went wrong. Can you please try again");
            $('.popup').toggle("slide");
            return;
        });
    };
});

cstore.directive('resetpassword', ['$appService', function ($appService, $scope) {
    return{
        template: '  <div class="profile">' +
            '<div class="forget_content">Reset Your Password</div>' +
            '<form ng-submit="userResetPassword()"><div class="">' +
            '<label class="profile_edit">New Password</label>' +
            '<input type="password" placeholder="" name=""  size="" value="" title="" ng-model="password">' +
            '</div>' +
            '<div class="">' +
            '<label class="profile_edit">Confirm Password</label>' +
            '<input type="password" placeholder="" name=""  size="" value="" title="" ng-model="confirmpassword">' +
            '</div>' +
            '<div class="add_delete pull-left">' +
            '<input type="submit" value="Submit">' +
            '</div></form>' +
            '</div>',
        restrict: "E",
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.userResetPassword = function () {
                        var fpcode = $scope.getURLParam('fpcode');
                        var password = $scope.password;
                        var confirmpassword = $scope.confirmpassword;
                        if (!fpcode) {
                            $("#popupMessage").html("Please try forgot password again");
                            $('.popup').toggle("slide");
                            return;
                        }
                        if (!password) {
                            $("#popupMessage").html("Please enter password");
                            $('.popup').toggle("slide");
                            return;
                        }
                        if (password != confirmpassword) {
                            $("#popupMessage").html("Password does not match");
                            $('.popup').toggle("slide");
                            return;
                        }
                        $scope.resetPassword(password, fpcode, function (data) {
                            if (data.response == "Reset Password Successfully..") {
                                $("#popupMessage").html(data.response);
                                $('.popup').toggle("slide");
                                window.location.href = "/#!/login";
                                return;
                            } else {
                                $("#popupMessage").html(data.response);
                                $('.popup').toggle("slide");
                                return;
                            }
                        });
                    };
                }
            }
        }
    }
}]);
