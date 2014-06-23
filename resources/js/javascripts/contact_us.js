cstore.controller('contactPageCtrl', function ($scope, $appService) {
    $scope.contact={};
    $scope.loadingAddContactData = false;
    $scope.clearContactContent = function () {
        $scope.contact.name = "";
        $scope.contact.email = "";
        $scope.contact.sitename = "";
        $scope.contact.program = "";
        $scope.contact.phone = "";
        $scope.contact.comment_box = "";
    }
});

cstore.directive('contactPage', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table_4 pull-left">' +
            '<div class="saved_r_bar col-sm-7 col-md-7">' +
            '<div class="saved_address">Contact Us</div>' +
            '<table width="100%" border="0" cellspac1ing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td pull-left"><div class="margin_top">Name*</div></td>' +
            '<td class="half_td pull-left"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><input type="text" placeholder="" ng-model="contact.name"></td>' +
            '<td class="half_td pull-left"><input type="text" placeholder="" ng-model="contact.program"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><div class="margin_top">Site Name*</div></td>' +
            '<td class="half_td pull-left"><div class="margin_top">Phone*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><input type="text" placeholder="" ng-model="contact.sitename"></td>' +
            '<td class="half_td pull-left"><input type="text" placeholder="" ng-model="contact.phone"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="full"><div class="margin_top">Email*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="full"><input type="text" placeholder="" ng-model="contact.email"></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">Comments</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="notes"><textarea ng-model="contact.comment_box"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="submit_reset right_btn pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="submitContact()"><a href>Submit</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="clearContactContent()"><a href>Reset</a></button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '<div class="loadingImage" ng-hide="!loadingAddContactData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.submitContact = function () {
                        $scope.CSession = $appService.getSession();
                        //if ($scope.CSession) {
                            $scope.newContact = {};
                            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                            var email = $scope.contact.email;
                            if (!$scope.contact.name) {
                                $("#popupMessage").html("Please enter name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.program) {
                                $("#popupMessage").html("Please enter program name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.sitename) {
                                $("#popupMessage").html("Please enter site name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.phone || !regNumberOnly.test($scope.contact.phone)) {
                                $("#popupMessage").html("Please enter correct contact");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!email || regEmail.test(email) == false) {
                                $("#popupMessage").html("Please enter a valid email");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingAddContactData = true;
                            $scope.newContact["name"] = $scope.contact.name;
                            $scope.newContact["program"] = $scope.contact.program;
                            $scope.newContact["email"] = $scope.contact.email;
                            $scope.newContact["sitename"] = $scope.contact.sitename;
                            $scope.newContact["phone"] = $scope.contact.phone;
                            $scope.newContact["comment_box"] = $scope.contact.comment_box;
                            var query = {};
                            query.table = "contact__cstore";
                            query.operations = [$scope.newContact];
                            $appService.save(query, ASK, OSK,null, function (callBackData) {
                                $scope.loadingAddContactData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Submitted");
                                    $('.popup').toggle("slide");
                                    $scope.clearContactContent();
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while submitting form");
                                    $('.popup').toggle("slide");
                                }
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }, function (err) {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                            });
                        //}
                        //else {
                        //    $("#popupMessage").html("Please login first");
                        //    $('.popup').toggle("slide");
                        //}
                    }
                }
            }
        }
    }
}]);
