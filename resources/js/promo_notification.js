cstore.controller('promoNotificationCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.loadingSendNotification=true;
    $scope.getAllAvailableMultipleUsers = function () {
        var query = {"table": "user_profiles__cstore"};
        query.columns = ["username","storeid.siteid","storeid.storename"];
        query.filter = {};
        query.filter["roleid._id"] = STOREMANAGER;
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["storeid.programid._id"]=$scope.currentUser.data.programid;
            }
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.loadingSendNotification=false;
            $scope.userData = userData.response.data;
            for(var i=0;i<$scope.userData.length;i++){
                var row = $scope.userData[i];
                row["label"] = row.storeid.siteid + " - " + row.storeid.storename
                row.ticked=false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllAvailableMultipleUsers();
});

cstore.directive('promoNotification', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template:'<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Users*</div></td>' +
            '<td class="half_td"><div class="margin_top">Subject*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div multi-select  input-model="userData"  button-label="label" item-label="label" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="notification.subject"></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">Mail Content*</div></td>' +
            '</tr>'+
            '<tr>' +
            '<td colspan="2"><textarea type="text" placeholder="" ng-model="notification.mail_content" class="mailContent"></textarea></td>' +
            '</tr>' +
            '</tbody></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="sendMailNotification()"><a href>Send Notification</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setClosePath(\'promotions\')"><a href>Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingSendNotification"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.setClosePath=function(path){
                        window.location.href="#!/"+ path;
                        $scope.clearPromotionNotificationContent();
                    }
                    $scope.getAllAvailableUsers = function () {
                        var query = {"table": "user_profiles__cstore"};
                        query.columns = ["username"];
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
                            $scope.availableUserTags = [];
                            for (var i = 0; i < userData.response.data.length; i++) {
                                $scope.availableUserTags.push(userData.response.data[i].username);
                            }
                            $('#user_tags').tagit({"tagSource": $scope.availableUserTags, "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                        }, function (jqxhr, error) {
                            $("#popupMessage").html(error);
                            $('.popup').toggle("slide");
                        })
                    }
                    //$scope.getAllAvailableUsers();
                    $scope.sendMailNotification=function(){
                        $scope.notification.users=[];
                        for (var i = 0; i < $scope.resultData.length; i++) {
                            $scope.notification.users.push($scope.resultData[i].username);
                        }
                        $scope.currentSession = $appService.getSession();
                        if (!$scope.notification.users || ($scope.notification.users.length == 0)) {
                            $("#popupMessage").html("Please choose atleast one user");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.notification.subject) {
                            $("#popupMessage").html("Please enter subject");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.notification.mail_content) {
                            $("#popupMessage").html("Please enter mail content");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        $scope.loadingSendNotification=true;
                        var mailContent= {}
                        mailContent["to"] = $scope.notification.users;
                        mailContent["subject"] = $scope.notification.subject;
                        mailContent["html"]="<div>Hello<br/>"+ $scope.notification.mail_content+"</div><div>Thank You</div>";
                        $appService.sendNotification(mailContent, ASK, OSK, $scope.currentSession["usk"], function (callBackData) {
                            console.log(JSON.stringify(callBackData));
                            $scope.loadingSendNotification = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Notification Sent");
                                $('.popup').toggle("slide");
                                $scope.setClosePath('promotions');
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            } else {
                                $("#popupMessage").html("some error while sending Notification");
                                $('.popup').toggle("slide");
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
