var ASK = "531829f47754938f0ecfd3c7";
var OSK = "531972e05fccddeb550a04a3";
var STOREMANAGER = "531d4aa0bd1515ea1a9bbaf6";
var ADMIN = "531d4a79bd1515ea1a9bbaf5";

var delete_cookie = function (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
var app = angular.module("myApp", []);
app.controller("loginCtrl", function ($scope) {
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
        $.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData);
            },
            error:function (jqXHR, exception) {
                if (jqXHR.status == 417 && jqXHR.responseText) {
                    var error_resp = JSON.parse(jqXHR.responseText);
                    if (error_resp.code && error_resp.code == 34) {
                        delete_cookie('usk');
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
    $scope.getCookie = function (usk) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + usk + "=");
        // alert('c_start='+c_start+" c_value="+c_value+" usk="+usk);
        if (c_start == -1) {
            c_start = c_value.indexOf(usk + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
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
        $scope.getDataFromJQuery("/rest/login", params, "GET", "JSON", function (callBackData) {
            if (callBackData.code && callBackData.code == 8) {
                alert(callBackData.response);
                return false;
            }
            else if (callBackData.code && callBackData.code == 3) {
                alert(callBackData.response);
                return false;
            }
            else if (callBackData.code && callBackData.code == 200) {
                var usk = callBackData.response ? callBackData.response.usk : null;
                if (usk) {
                    var query = {"table":"user_profiles__cstore"};
                    query.columns = ["userid", "roleid", "storeid"];
                    query.filter = {"userid":"{_CurrentUserId}"};
                    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
                    $scope.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                        delete_cookie("usk");
                        delete_cookie("userid");
                        delete_cookie("firstname");
                        delete_cookie("storeid");
                        var roleid = callBackData.response.data[0].roleid._id;
                        var firstname = callBackData.response.data[0].userid.firstname;
                        var userid = callBackData.response.data[0].userid._id;
                        if(callBackData.response.data[0] && callBackData.response.data[0]["storeid"]){
                            var storeid = callBackData.response.data[0]["storeid"]._id;
                        }
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
                        if($scope.getCookie("roleid")==ADMIN){
                            window.location.href='cstore.daffodilapps.com/#!/admin';
                        }
                        else if($scope.getCookie("roleid")==STOREMANAGER) {
                            window.location.href='http://127.0.0.1:5400/#!/store-manager';
                        }
                        else{
                            window.location.href="http://127.0.0.1:5400/login.html";
                        }

                    }, function (err) {

                        alert("error while making request");
                    });

                }

            }
            else{
               /*for messgae*/
            }

        }, function (jqxhr, error) {
            alert("error while making request");
        });

    }
});




