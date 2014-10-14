cstore.controller('loginCtrl', function ($scope, $appService, $location,$routeParams) {
    $appService.unauth();
	
	$scope.sendMailNotification = function (username, password) {
		$('.popup1').toggle("slide");
		var query = {"table": "user_profiles__cstore"};
        query.columns = [ "_id", "userid.verificationcode"];
        query.filter = {};
        query.filter["userid.username"] = username;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (result) {
            var verificationcode = result.response.data[0].userid.verificationcode;
		
			var mailContent = {}
			mailContent["to"] = username;
			mailContent["bcc"] = "subhash.kumar@daffodilsw.com";
			mailContent["subject"] = 'Welcome to the "Promo Marketplace" Portal';
			mailContent["html"] = 'Dear <span style="color: #000;">' + username + '</span>,<br/> Welcome to the "Promo Marketplace" Portal.<br/><br/> Please verify your account by clicking <a style="color: #000;text-decoration: underline;" href="http://www.ecpromomarket.com/#!/login?code=' + verificationcode + '"> here </a> <br/> Here is your login information:<br/> Site: <span style="color:black;">http://www.ecpromomarket.com/</span><br/> Username: <span style="color: #000;">' + username + '</span><br/> Password: ' + password + '<br/><br/> Please contact Exclusive Connection$ at 800-467-8073 with any questions. <br/><br/> Thanks,<br/><br/> Exclusive Connection$<br/>';
			$appService.sendNotification(mailContent, ASK, OSK, null, function (callBackData) {
				$scope.verification = {};
				if (callBackData.code == 200 && callBackData.status == "ok") {
					$("#popupMessage").html("Verification mail sent succussfully.");
					$('.popup').toggle("slide");
				} else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
					$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
					$('.popup').toggle("slide");
				} else {
					$("#popupMessage").html("Some error while sending Notification");
					$('.popup').toggle("slide");
				}
			}, function (err) {
				$("#popupMessage").html(err.stack);
				$('.popup').toggle("slide");
			});
		});
	}
	
    $scope.login = function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (regEmail.test(username) == false) {
            $("#popupMessage").html("Please enter valid email");
            $('.popup').toggle("slide");
            return;
        }
        if (username == "" || username == undefined) {
            $("#popupMessage").html("Please enter valid email");
            $('.popup').toggle("slide");
            return;
        }
        if (!password) {
            $("#popupMessage").html("Please enter your password");
            $('.popup').toggle("slide");
            return;
        }
        var params = {};
        params.username = username;
        params.password = password;
        params.ask = ASK;
        params.osk = OSK;
        $appService.getDataFromJQuery("/rest/login", params, "GET", "JSON", function (callBackData) {
            if (callBackData.code && callBackData.code == 8) {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
                return;
            }
            else if (callBackData.code && callBackData.code == 3) {
                $("#popupMessage").html(callBackData.response);
                $('.popup').toggle("slide");
                return;
            }
            else if (callBackData.code && callBackData.code == 200) {
                var usk = callBackData.response ? callBackData.response.usk : null;
                if (usk) {

                    var query = {"table": "user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid", "storeid.programid", "storeid.programid.image", "storeid.stateid.name", "username", "programid", "userid.status","stores_id", "stores_id.programid", "stores_id.programid.image", "stores_id.stateid.name"];
                    query.filter = {"userid": "{_CurrentUserId}", "userid.status": true};
                    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};

                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        $appService.deleteAllCookie();
                        if (callBackData.response.data && callBackData.response.data.length > 0) {
                            var roleid = callBackData.response.data[0].roleid._id;
                            var firstname = callBackData.response.data[0].userid.firstname;
                            var userid = callBackData.response.data[0].userid._id;
                            var username = callBackData.response.data[0].username;
                            if (callBackData.response.data[0] && callBackData.response.data[0]["stores_id"] && callBackData.response.data[0]["stores_id"][0]) {
                                var storeid = callBackData.response.data[0]["stores_id"][0]._id;
                                var programid = callBackData.response.data[0]["stores_id"][0].programid ? callBackData.response.data[0]["stores_id"][0].programid._id:"";
                                var stateName = callBackData.response.data[0].stores_id[0].stateid ? callBackData.response.data[0].stores_id[0].stateid.name:"";
                                if (!$appService.getCookie("selectedLoc")) {
                                    var c_name = "selectedLoc";
                                    document.cookie = c_name + "=" + escape(stateName);
                                    $scope.currentLoc["data"] = stateName;
                                }
                                var image = [
                                    {"image": ""}

                                ];
                                for (var i = 0; i < callBackData.response.data.length; i++) {
                                    if(callBackData.response.data[i].stores_id[0].programid){
                                        image[i]["image"] = callBackData.response.data[i].stores_id[0].programid.image;
                                    }
                                }
                                var setCompanyLogo = $appService.setUrls(image, 140, 88);
                                var companyLogoUrl = setCompanyLogo[0].imageUrl;
                                if (storeid) {
                                    var c_name = "storeid";
                                    document.cookie = c_name + "=" + escape(storeid);
                                    var c_name = "programid";
                                    document.cookie = c_name + "=" + escape(programid);
                                    if (companyLogoUrl) {
                                        var c_name = "companyLogoUrl";
                                        document.cookie = c_name + "=" + escape(companyLogoUrl);
                                    }
                                }
                            }
                            if (callBackData.response.data[0] && callBackData.response.data[0]["programid"]) {
                                var programid = callBackData.response.data[0]["programid"]._id;
                                if (programid) {
                                    var c_name = "programid";
                                    document.cookie = c_name + "=" + escape(programid);
                                }
                            }
                            var c_name = "usk";
                            document.cookie = c_name + "=" + escape(usk);
                            var c_name = "roleid";
                            document.cookie = c_name + "=" + escape(roleid);
                            var c_name = "userid";
                            document.cookie = c_name + "=" + escape(userid);
                            var c_name = "firstname";
                            document.cookie = c_name + "=" + escape(firstname);
                            var c_name = "username";
                            document.cookie = c_name + "=" + escape(username);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            window.location.href = "/";
                        }
                        else {
                            $("#popupMessage").html("You are currently deactivated. Please contact admin");
                            $('.popup').toggle("slide");
                            return;
                        }
                    }, function (err) {
                        $("#popupMessage").html("Error while making request");
                        $('.popup').toggle("slide");
                        return;
                    });

                }

            }
            else {
				if (callBackData.response == "User not verified.") {
					$scope.verification = {"un":username,"pd":password};
					$('.popup1').toggle("slide");
				} else {
					$("#popupMessage").html(callBackData.response);
					$('.popup').toggle("slide");
				}
                return;
            }

        }, function (jqxhr, error) {
            if (jqxhr.responseText && JSON.parse(jqxhr.responseText).response) {
				var responseMsg = JSON.parse(jqxhr.responseText).response;
				if (responseMsg == "User not verified.") {
					$scope.verification = {"un":username,"pd":password};
					$('.popup1').toggle("slide");
				} else {
					$("#popupMessage").html(responseMsg);
					$('.popup').toggle("slide");
				}
                return;
            }
            else {
                $("#popupMessage").html("Error while making request");
                $('.popup').toggle("slide");
                return;
            }
        });

    }
    $scope.userForgotPassword = function () {
        var userName = $("#username").val();
        if (!userName) {
            $("#popupMessage").html("Please enter email");
            $('.popup').toggle("slide");
            return;
        }
        $scope.forgotPassword(userName, function (data) {
            if (data.response == "User Not Found.") {
                $("#popupMessage").html("User does not exist");
                $('.popup').toggle("slide");
                return;
            } else {
                $("#popupMessage").html("We have sent you an email to reset password. Please check your email id.");
                $('.popup').toggle("slide");
                return;
            }
        });
    };
    $scope.forgotPassword = function (username, callback) {
        var params = {};
        params.username = username;
        params.ask = ASK;
        params.osk = OSK;
        $appService.getDataFromJQuery("/rest/forgotpassword", params, "GET", "JSON", function (callBackData) {
            callback(callBackData);
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
            return;
        });
    };
    $scope.checkVerification = function(code){
        $.ajax({
            url : BAAS_SERVER+"/verifyuser?code="+code,
            success : function(result){
                result = JSON.parse(result);
                if(result.code == 200){
                    $scope.popuptext="Your account has been activated. Please try logging in.";
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $("#popupMessage").html($scope.popuptext);
                    $('.popup').toggle("slide");
                } else{
                    $scope.popuptext="Wrong verification link. Please click the verification link again.";
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $("#popupMessage").html($scope.popuptext);
                    $('.popup').toggle("slide");
                }
            },
            error : function(jqXHR){
                if(jqXHR.status){
                    $scope.popuptext="Wrong verification link. Please click the verification link again.";
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $("#popupMessage").html($scope.popuptext);
                    $('.popup').toggle("slide");
                }
            }
        });
    }	

    var hash = window.location.hash;
    if((hash.indexOf("#!/login") >= 0) && $routeParams.code){
        $scope.checkVerification($routeParams.code);
    }
});

cstore.directive('verificationResend', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="popup1" style="display:none;">' +
            '<div class="popup-manage">' +
            '<h2 class="h2-popup">Attention</h2>' +
            '<form method="" class="ng-pristine ng-valid">' +
            '<p class="alert-p">User not verified.</p>' +
            '<p class="role-change"><input style="width:200px;" type="button" value="Resend Verification Mail" class="alert-ok" ng-click="sendMailNotification(verification.un,verification.pd)"></p>' +
			'<p class="role-change"><input type="button" value="OK" class="alert-ok" ng-click="cancelAlertPopup()"></p>' +
            '</form>' +
            '</div>' +
            '</div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.cancelAlertPopup = function () {
                        $('.popup1').toggle("slide");
                    }
                }
            }
        }
    }
}]);
