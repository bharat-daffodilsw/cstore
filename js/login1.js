var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var delete_cookie = function (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
var app=angular.module("myApp",[]);
app.controller("loginCtrl",function($scope){
 $scope.getDataFromJQuery=function(url, requestBody, callType, dataType, callback, errcallback) {
        console.log("called");
        $.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                console.log("done");
                callback(returnData);
            },
            error:function (jqXHR, exception) {
                console.log("ex"+exception);
                console.log("error in ajax"+JSON.stringify(jqXHR));
                if (jqXHR.status == 417 && jqXHR.responseText) {
                    var error_resp = JSON.parse(jqXHR.responseText);
                    if (error_resp.code && error_resp.code == 34) {
                        delete_cookie('usk');
                        console.log("before login");
                    }
                }

                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {

                    callback(jqXHR);
                    console.log("exception in making [" + url + "] :[" + exception + "]");
                }

            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });
    }
    $scope.login = function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (regEmail.test(username) == false) {
            alert("Please Enter A Valid Email");
            return false;
        }
        if (username == "" || username == undefined) {
            alert("Please enter vaild user name ");
            return false;
        }
        if (!password) {
            alert("enter your password");
            return false;
        }
        var params = {};
        params.username = username;
        params.password = password;
        params.ask = ASK;
        params.osk = OSK;
//    http://cstore.daffodilapps.co/m
        console.log("65"+params);
        $scope.getDataFromJQuery("/rest/login", params, "GET", "JSON", function (callBackData) {
            console.log("errrr");
            loginUserData = callBackData;
            if (!callBackData.usk) {
                alert("Username and Password didn't match ");
                return;
            }
            else {
                var usk = loginUserData.usk;
                if (usk) {
                    var query = {"table": "user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid"];
                    query.filter = {"userid": "{_CurrentUserId}"};
                    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};
                    $scope.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        delete_cookie("usk");
                        delete_cookie("userid");
                        delete_cookie("firstname");
                        delete_cookie("storeid");
                        var roleid = callBackData.response.data[0].roleid._id;
                        var firstname = callBackData.response.data[0].userid.firstname;
                        var userid = callBackData.response.data[0].userid._id;
                        var storeid = callBackData.data[0].storeid._id;
                        var c_name = "usk";
                        document.cookie = c_name + "=" + escape(usk);
                        var c_name = "roleid";
                        document.cookie = c_name + "=" + escape(roleid);
                        var c_name = "userid";
                        document.cookie = c_name + "=" + escape(userid);
                        var c_name = "firstname";
                        document.cookie = c_name + "=" + escape(firstname);
                        if (storeid) {
                            var c_name = "storeid";
                            document.cookie = c_name + "=" + escape(storeid);
                        }
                    }, function (err) {

                        alert(JSON.stringify(err));
                    });

                }
                // window.location.href = "/#/home";
            }

        }, function (jqxhr, error) {
            alert("bbb"+JSON.stringify(jqxhr));
        });

    }
});




