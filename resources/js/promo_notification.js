cstore.controller('promoNotificationCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.loadingSendNotification=true;
    $scope.getAllAvailableMultipleUsers = function () {
        var query = {"table": "user_profiles__cstore"};
        query.columns = ["username","stores_id","stores_id.siteid","userid"];
        query.filter = {};
        query.filter["roleid._id"] = STOREMANAGER;
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["stores_id.programid._id"]=$scope.currentUser.data.programid;
            }
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (userData) {
            $scope.loadingSendNotification=false;
            $scope.userData = userData.response.data;
            $scope.inputData = [];
            for (var i = 0; i < $scope.userData.length; i++) {
                var row = $scope.userData[i];
                if (row.stores_id) {
                    for (var m = 0; m < row.stores_id.length; m++) {
                        if ($scope.currentUser["data"]) {
                            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                if(row.stores_id[m].programid._id==$scope.currentUser.data.programid){
                                    $scope.inputData.push({"emailid": row.userid.emailid, "storeid": row.stores_id[m]._id, "sitename": row.userid.firstname + "-" + row.stores_id[m].storename + "-" + row.stores_id[m].siteid,"ticked":false});
                                }
                            }
                        }
                        else{
                            $scope.inputData.push({"emailid": row.userid.emailid, "storeid": row.stores_id[m]._id, "sitename": row.userid.firstname + "-" + row.stores_id[m].storename + "-" + row.stores_id[m].siteid,"ticked":false});
                        }
                    }
                }
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
            '<td class="half_td"><div multi-select  input-model="inputData"  button-label="sitename" item-label="sitename" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>' +
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
                    $scope.sendMailNotification=function(){
                        $scope.notification.users=[];
                        for (var i = 0; i < $scope.resultData.length; i++) {
                            $scope.notification.users.push($scope.resultData[i].emailid);
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
                        var uniqueUsers = [];
                        $scope.notification.users.forEach(function(value) {
                            if (uniqueUsers.indexOf(value) == -1) {
                                uniqueUsers.push(value);
                            }
                        });
                        $scope.loadingSendNotification=true;
                        var mailContent= {}
                        mailContent["to"] = uniqueUsers;
                        mailContent["subject"] = $scope.notification.subject;
                        mailContent["html"]="<div>Hello<br/>"+ $scope.notification.mail_content+"</div><div>Thank You</div>";
                        $appService.sendNotification(mailContent, ASK, OSK, $scope.currentSession["usk"], function (callBackData) {
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
