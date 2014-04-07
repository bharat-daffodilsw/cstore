var BAAS_SERVER;
BAAS_SERVER = "/rest";
var appStrapDirectives = angular.module('$appstrap.directives', []);
var appStrapServices = angular.module('$appstrap.services', []);
/**
 * App Services
 */
appStrapServices.factory('$appService', [
    '$rootScope',
    '$http',
    '$timeout',
    function ($rootScope, $http, $timeout) {
        var $appService = {
        };
        $appService.login = function (username, password, callback) {
            var params = {};
            params.username = username;
            params.password = password;
            params.usergroup = 'baas';

            this.getDataFromJQuery(BAAS_SERVER + "/login", params, "GET", "JSON", "Loading...", function (callBackData) {
                callback(callBackData);
            }, function (jqxhr, error) {
                alert("Error:" + JSON.stringify(jqxhr));
            });
        };


        $appService.save = function (data, ask, osk, usk, callBack) {
            if (!ask) {
                throw "No ask found for saving";
            }
            // return;
            var params;
            if (usk) {

                params = {"updates":JSON.stringify(data), "ask":ask, "osk":osk, "usk":usk};
            }
            else {
                params = {"updates":JSON.stringify(data), "ask":ask, "osk":osk};

            }
            var that = this;

            var url = BAAS_SERVER + "/data";
            this.getDataFromJQuery(url, params, "POST", "JSON", function (callBackData) {
                callBack(callBackData);
            });
        }

        $appService.delete_cookie = function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        $appService.checkCookie = function () {
            return $appService.getCookie("usk");

        }
        $appService.getCookie = function (usk) {
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

        $appService.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
            $.support.cors = true;

            $.ajax({
                type:callType,
                url:url,
                data:requestBody,
                crossDomain:true,
                success:function (returnData, status, xhr) {
                    callback(returnData);
                    $rootScope.showbusymessage = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                },
                error:function (jqXHR, exception) {
                    if (jqXHR.status == 417 && jqXHR.responseText) {
                        var error_resp = JSON.parse(jqXHR.responseText);
                        if (error_resp.code && error_resp.code == 34) {
                            $appService.delete_cookie('usk');
                            window.location.href = "/login";
                        }
                    }
                    $rootScope.showbusymessage = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
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
        $appService.getSession = function () {
            var currentSession = {};
            if (!$appService.getCookie("usk")) {
                return null;
            }
            currentSession["usk"] = $appService.getCookie("usk");
            currentSession["roleid"] = $appService.getCookie("roleid");
            currentSession["userid"] = $appService.getCookie("userid");
            currentSession["firstname"] = $appService.getCookie("firstname");
            if ($appService.getCookie("storeid")) {
                currentSession["storeid"] = $appService.getCookie("storeid");
            }
            return currentSession;
        }
        $appService.deleteAllCookie = function () {
            $appService.delete_cookie("usk");
            $appService.delete_cookie("role");
            $appService.delete_cookie("userid");
            $appService.delete_cookie("firstname");
            $appService.delete_cookie("storeid");
            $appService.delete_cookie("storename");
        }
        return $appService;
    }
]);
getURLParam = function (strParamName) {
    var strReturn = "";
    var strHref = window.location.href;
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?"));
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (
                aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    return unescape(strReturn);
}