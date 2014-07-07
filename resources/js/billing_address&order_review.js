cstore.controller('billingAddressCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSavedAddress = function () {
        $scope.loadingSavedAddress = true;
        var query = {"table": "storemanagers__cstore"};
        query.columns = ["address", "cityid", "contact", "countryid", "stateid", "email", "storename", "manager.name", "postalcode", "address2"];
        query.filter = {};
        query.filter["_id"] = $scope.currentUser.data.storeid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (savedAddressData) {
            $scope.loadingSavedAddress = false;
            $scope.savedAddressData = savedAddressData.response.data[0];
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getSavedAddress();
    if ($routeParams.q != "setBackData") {
        $scope.getEditCountries(null, null, null, $scope.data);
        $scope.billingdata.same_shipping_address = true;
        //if(!$scope.billingdata.same_shipping_address){
        $scope.getEditCountries(null, null, null, $scope.storedata);
        //}
    }
    $scope.clearBillingContent = function () {
        $scope.billingdata.bill_address.firstname = "";
        $scope.billingdata.bill_address.lastname = "";
        $scope.billingdata.bill_address.address = "";
        $scope.billingdata.bill_address.address_2 = "";
        $scope.billingdata.bill_address.zipcode = "";
        $scope.billingdata.bill_address.phone = "";
        $scope.billingdata.bill_address.ext = "";
        $scope.billingdata.bill_address.email = "";
        //$scope.getEditCountries(null, null, null);
    }
    $scope.clearShippingContent = function () {
        $scope.billingdata.shipping_address.firstname = "";
        $scope.billingdata.shipping_address.lastname = "";
        $scope.billingdata.shipping_address.address = "";
        $scope.billingdata.shipping_address.address_2 = "";
        $scope.billingdata.shipping_address.zipcode = "";
        $scope.billingdata.shipping_address.phone = "";
        $scope.billingdata.shipping_address.ext = "";
        $scope.billingdata.shipping_address.email = "";
        //$scope.getEditCountries(null, null, null);
    }
});

cstore.controller('orderReviewCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getShoppingCart();
    $scope.getCanceledOrder = function () {
        var query = {"table": "orders__cstore"};
        query.columns = ["_id", "token"];
        query.filter = {};
        query.filter["userid.username"] = $scope.currentUser.data.username;
        query.filter["token"] = $routeParams.token;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (callBackData) {
            var cancelOrderId = callBackData.response.data[0]._id;
            if (callBackData.response.data[0].status == "In Progress") {
                var query = {};
                query.table = "orders__cstore";
                var cancelOrder = {};
                cancelOrder["_id"] = cancelOrderId;
                cancelOrder["status"] = "Cancelled";
                query.operations = [cancelOrder];
                $appService.save(query, ASK, OSK, null, function (callBackData) {
                    if (callBackData.code == 200 && callBackData.status == "ok") {
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
            else {
                $("#popupMessage").html("You have already cancelled this order");
                $('.popup').toggle("slide");
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    var hash = window.location.hash;
    if (hash.indexOf("?token") != -1) {
        $scope.getCanceledOrder();
    }
});
cstore.directive('billingAddress', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table_4 pull-left">' +
            '<div class="admin_menu pull-left" >' +
            '<div class="billing_info active_1 pull-left">Shipping Address</div>' +
            '<div class="billing_info pull-left">Order</div>' +
            '<div class="billing_info pull-left">Payment</div>' +
            '</div>' +
            '<div class="saved_l_bar col-sm-5 colmd-5 pull-left">' +
            '<div class="fix_address pull-left">' +
            '<div class="saved_address" >Saved Address</div>' +
            '<div class="saved_1 col-sm-5 colmd-5 pull-left">' +
            '<div class="fix_height">Name</div>' +
            '<div class="address fix_height">Address</div>' +
            '<div class="fix_height">City</div>' +
            '<div class="fix_height">State</div>' +
            '<div class="fix_height">Postal Code</div>' +
            '<div class="fix_height">Phone No:</div>' +
            '<div class="fix_height">Email:</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-7 colmd-7 pull-left">' +
            '<div class="fix_height">{{savedAddressData.manager.name}}</div>' +
            '<div class="address fix_height">{{savedAddressData.address}}</div>' +
            '<div class="fix_height">{{savedAddressData.cityid.name}}</div>' +
            '<div class="fix_height">{{savedAddressData.stateid.name}}</div>' +
            '<div class="fix_height">{{savedAddressData.postalcode}}</div>' +
            '<div class="fix_height">{{savedAddressData.contact}}</div>' +
            '<div class="fix_height">{{savedAddressData.email}}</div>' +
            '</div>' +
            '<div class="use_saved pull-left" ng-click="useSavedAddress(savedAddressData)"><a href="">Use saved Address</a></div>' +
            '</div></div>' +
            '<div class="saved_r_bar col-sm-7 col-md-7 pull-right">' +
            '<div class="saved_address">Billing Information</div>' +
            '<table width="100%" border="0" cellspac1ing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">First Name*</div></td>' +
            '<td><div class="margin_top">Last Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="billingdata.bill_address.firstname"></td>' +
            '<td><input type="text" placeholder="" ng-model="billingdata.bill_address.lastname"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="billingdata.bill_address.address"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address 2</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="billingdata.bill_address.address_2"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><vendor-country-select></vendor-country-select></td>' +
            '<td class="half_td"><state-select></state-select></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td>' +
            '<td class="half_td"><div class="margin_top">Zip Code*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><city-select></city-select></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="billingdata.bill_address.zipcode"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Phone*</div></td>' +
            '<td class="half_td"><div class="margin_top">Extension</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="billingdata.bill_address.phone"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="billingdata.bill_address.ext"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Email*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><input type="text" placeholder=""ng-model="billingdata.bill_address.email"></td>' +
            '</tr>' +
            '</table>' +
            '<div class="shipping_info pull-left">' +
            '<input id="" name="" type="checkbox" value="1" ng-model="billingdata.same_shipping_address"> Shipping Information same as Billing Information </div>' +
            '</div>' +
            '<div class="saved_r_bar pull-right col-sm-7 col-md-7" ng-hide="billingdata.same_shipping_address">' +
            '<div class="saved_address">Shipping Information</div>' +
            '<shipping-address></shipping-address>' +
            '</div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="save_close right_btn pull-right">' +
            '<div class="add_btn pull-right">' +
            '<button type="button" ng-click="saveBillingAddress()"><a href="">Continue</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-right">' +
            '<button type="button" ng-click="setPath(\'shopping-cart\')"><a href="">Back</a></button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '<div class="loadingImage" ng-hide="!loadingSavedAddress"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                        $scope.clearBillingContent();
                        $scope.clearShippingContent();
                    }
                },
                post: function ($scope) {

                    $scope.useSavedAddress = function (address) {
                        $scope.billingdata["bill_address"]["firstname"] = address.manager.name ? address.manager.name : "";
                        $scope.billingdata["bill_address"]["address"] = address.address ? address.address : "";
                        $scope.billingdata["bill_address"]["address_2"] = address.address2 ? address.address2 : "";
                        $scope.billingdata["bill_address"]["zipcode"] = address.postalcode ? address.postalcode : "";
                        $scope.billingdata["bill_address"]["phone"] = address.contact ? address.contact : "";
                        $scope.billingdata["bill_address"]["email"] = address.email ? address.email : "";
                        if (address.countryid) {
                            //address.stateid = (address.stateid) ? {"_id": address.stateid._id} : {"_id": false};
                            //address.cityid = (address.cityid) ? {"_id": address.cityid._id} : {"_id": false};
                            $scope.getEditCountries(address.countryid._id, address.stateid._id, address.cityid._id, $scope.data);
                        }

                    }
                    $scope.saveBillingAddress = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var billing_email = $scope.billingdata.bill_address.email;
                        if (!$scope.billingdata.bill_address.firstname) {
                            $("#popupMessage").html("Please enter billing info firstname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.billingdata.bill_address.lastname) {
                            $("#popupMessage").html("Please enter billing info lastname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.billingdata.bill_address.address) {
                            $("#popupMessage").html("Please enter billing info address");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCountry) {
                            $("#popupMessage").html("Please select billing info country first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedState) {
                            $("#popupMessage").html("Please select billing info state first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCity) {
                            $("#popupMessage").html("Please select billing info city first");
                            $('.popup').toggle("slide");
                            return false;
                        }

                        if (!$scope.billingdata.bill_address.zipcode || !regNumberOnly.test($scope.billingdata.bill_address.zipcode)) {
                            $("#popupMessage").html("Please enter valid billing info zip code");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.billingdata.bill_address.phone || !regNumberOnly.test($scope.billingdata.bill_address.phone)) {
                            $("#popupMessage").html("Please enter valid billing info phone no");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!billing_email || regEmail.test(billing_email) == false) {
                            $("#popupMessage").html("Please enter a valid billing email id");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.billingdata.same_shipping_address) {
                            var shipping_email = $scope.billingdata.shipping_address.email;
                            if (!$scope.billingdata.shipping_address.firstname) {
                                $("#popupMessage").html("Please enter shipping info firstname");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.billingdata.shipping_address.lastname) {
                                $("#popupMessage").html("Please enter shipping info lastname");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.billingdata.shipping_address.address) {
                                $("#popupMessage").html("Please enter shipping info address");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCountry) {
                                $("#popupMessage").html("Please select shipping info country first");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedState) {
                                $("#popupMessage").html("Please select shipping info state first");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCity) {
                                $("#popupMessage").html("Please select shipping info city first");
                                $('.popup').toggle("slide");
                                return false;
                            }

                            if (!$scope.billingdata.shipping_address.zipcode || !regNumberOnly.test($scope.billingdata.shipping_address.zipcode)) {
                                $("#popupMessage").html("Please enter valid shipping info zip code");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.billingdata.shipping_address.phone || !regNumberOnly.test($scope.billingdata.shipping_address.phone)) {
                                $("#popupMessage").html("Please enter valid shipping info phone no");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!shipping_email || regEmail.test(shipping_email) == false) {
                                $("#popupMessage").html("Please enter a valid shipping info email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        $scope.newBillingAddress = {};
                        $scope.newBillingAddress["bill_address"] = {};
                        $scope.newBillingAddress["shipping_address"] = {};
                        $scope.loadingSavedAddress = true;
                        $scope.newBillingAddress["userid"] = {"_id": $scope.currentUser.data.userid};
                        $scope.newBillingAddress["same_shipping_address"] = $scope.billingdata.same_shipping_address;
                        $scope.newBillingAddress["bill_address"]["firstname"] = $scope.billingdata.bill_address.firstname;
                        $scope.newBillingAddress["bill_address"]["lastname"] = $scope.billingdata.bill_address.lastname;
                        $scope.newBillingAddress["bill_address"]["address"] = $scope.billingdata.bill_address.address;
                        $scope.newBillingAddress["bill_address"]["address_2"] = $scope.billingdata.bill_address.address_2;
                        $scope.newBillingAddress["bill_address"]["zipcode"] = $scope.billingdata.bill_address.zipcode;
                        $scope.newBillingAddress["bill_address"]["phone"] = $scope.billingdata.bill_address.phone;
                        $scope.newBillingAddress["bill_address"]["ext"] = $scope.billingdata.bill_address.ext;
                        $scope.newBillingAddress["bill_address"]["email"] = $scope.billingdata.bill_address.email;
                        if ($scope.data.selectedCountry && $scope.data.selectedCountry != null && $scope.data.selectedCountry != undefined && $scope.data.selectedCountry != "undefined" && $scope.data.selectedCountry != "null") {
                            $scope.newBillingAddress["bill_address"]["country"] = {"_id": $scope.data.selectedCountry._id, "name": $scope.data.selectedCountry.name}
                        }
                        if ($scope.data.selectedCity && $scope.data.selectedCity != null && $scope.data.selectedCity != undefined && $scope.data.selectedCity != "undefined" && $scope.data.selectedCity != "null") {
                            $scope.newBillingAddress["bill_address"]["city"] = {"_id": $scope.data.selectedCity._id, "name": $scope.data.selectedCity.name}
                        }
                        if ($scope.data.selectedState && $scope.data.selectedState != null && $scope.data.selectedState != undefined && $scope.data.selectedState != "undefined" && $scope.data.selectedState != "null") {
                            $scope.newBillingAddress["bill_address"]["state"] = {"_id": $scope.data.selectedState._id, "name": $scope.data.selectedState.name}
                        }
                        if ($scope.billingdata.same_shipping_address == true) {
                            $scope.newBillingAddress["shipping_address"]["firstname"] = $scope.billingdata.bill_address.firstname;
                            $scope.newBillingAddress["shipping_address"]["lastname"] = $scope.billingdata.bill_address.lastname;
                            $scope.newBillingAddress["shipping_address"]["address"] = $scope.billingdata.bill_address.address;
                            $scope.newBillingAddress["shipping_address"]["address_2"] = $scope.billingdata.bill_address.address_2;
                            $scope.newBillingAddress["shipping_address"]["zipcode"] = $scope.billingdata.bill_address.zipcode;
                            $scope.newBillingAddress["shipping_address"]["phone"] = $scope.billingdata.bill_address.phone;
                            $scope.newBillingAddress["shipping_address"]["ext"] = $scope.billingdata.bill_address.ext;
                            $scope.newBillingAddress["shipping_address"]["email"] = $scope.billingdata.bill_address.email;
                            if ($scope.data.selectedCountry && $scope.data.selectedCountry != null && $scope.data.selectedCountry != undefined && $scope.data.selectedCountry != "undefined" && $scope.data.selectedCountry != "null") {
                                $scope.newBillingAddress["shipping_address"]["country"] = {"_id": $scope.data.selectedCountry._id, "name": $scope.data.selectedCountry.name}
                            }
                            if ($scope.data.selectedCity && $scope.data.selectedCity != null && $scope.data.selectedCity != undefined && $scope.data.selectedCity != "undefined" && $scope.data.selectedCity != "null") {
                                $scope.newBillingAddress["shipping_address"]["city"] = {"_id": $scope.data.selectedCity._id, "name": $scope.data.selectedCity.name}
                            }
                            if ($scope.data.selectedState && $scope.data.selectedState != null && $scope.data.selectedState != undefined && $scope.data.selectedState != "undefined" && $scope.data.selectedState != "null") {
                                $scope.newBillingAddress["shipping_address"]["state"] = {"_id": $scope.data.selectedState._id, "name": $scope.data.selectedState.name}
                            }
                        }
                        else {
                            $scope.newBillingAddress["shipping_address"]["firstname"] = $scope.billingdata.shipping_address.firstname;
                            $scope.newBillingAddress["shipping_address"]["lastname"] = $scope.billingdata.shipping_address.lastname;
                            $scope.newBillingAddress["shipping_address"]["address"] = $scope.billingdata.shipping_address.address;
                            $scope.newBillingAddress["shipping_address"]["address_2"] = $scope.billingdata.shipping_address.address_2;
                            $scope.newBillingAddress["shipping_address"]["zipcode"] = $scope.billingdata.shipping_address.zipcode;
                            $scope.newBillingAddress["shipping_address"]["phone"] = $scope.billingdata.shipping_address.phone;
                            $scope.newBillingAddress["shipping_address"]["ext"] = $scope.billingdata.shipping_address.ext;
                            $scope.newBillingAddress["shipping_address"]["email"] = $scope.billingdata.shipping_address.email;
                            if ($scope.storedata.selectedCountry) {
                                $scope.newBillingAddress["shipping_address"]["country"] = {"_id": $scope.storedata.selectedCountry._id, "name": $scope.storedata.selectedCountry.name};
                            }
                            if ($scope.storedata.selectedState) {
                                $scope.newBillingAddress["shipping_address"]["state"] = {"_id": $scope.storedata.selectedState._id, "name": $scope.storedata.selectedState.name};
                            }
                            if ($scope.storedata.selectedCity) {
                                $scope.newBillingAddress["shipping_address"]["city"] = {"_id": $scope.storedata.selectedCity._id, "name": $scope.storedata.selectedCity.name};
                            }
                        }
                        $scope.newBillingAddress["__type__"] = "insertifnotexist";
                        var query = {};
                        query.table = "shopping_cart__cstore";
                        query.operations = [$scope.newBillingAddress];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            $scope.loadingSavedAddress = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                //$("#popupMessage").html("Billing Address is saved");
                                //$('.popup').toggle("slide");
                                $scope.setPath('order-review');

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
cstore.directive('shippingAddress', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="margin_top">First Name*</div>' +
            '</td>' +
            '<td>' +
            '<div class="margin_top">Last Name*</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="billingdata.shipping_address.firstname"></td>' +
            '<td><input type="text" placeholder="" ng-model="billingdata.shipping_address.lastname"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="margin_top">Address*</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="billingdata.shipping_address.address"> </textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="margin_top">Address 2</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="billingdata.shipping_address.address_2"> </textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-country-select></store-country-select></td>' +
            '<td class="half_td"><store-state-select></store-state-select></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td class="half_td">' +
            '<td class="half_td"><div class="margin_top">Zip Code*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-city-select></store-city-select></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="billingdata.shipping_address.zipcode"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="margin_top">Phone*</div>' +
            '</td>' +
            '<td>' +
            '<div class="margin_top">Extension</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="billingdata.shipping_address.phone"></td>' +
            '<td><input type="text" placeholder=""ng-model="billingdata.shipping_address.ext"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td>' +
            '<div class="margin_top">Email*</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><input type="text" placeholder=""ng-model="billingdata.shipping_address.email"></td>' +
            '</tr>' +
            '</table>',
        compile: function () {
            return {
                pre: function ($scope) {

                },
                post: function ($scope) {
                }

            }
        }
    }
}]);

cstore.directive('orderReview', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table_4 pull-left">' +
            '<div class="admin_menu pull-left" >' +
            '<div class="billing_info pull-left">Shipping Address</div>' +
            '<div class="billing_info active_1 pull-left">Order</div>' +
            '<div class="billing_info pull-left">Payment</div>' +
            '</div>' +
            '<div class="table_5 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<th></th>' +
            '<th>Item</th>' +
            '<th>Item Price</th>' +
            '<th>Qty</th>' +
            '<th>Price</th>' +
            '</tr>' +
            '<tr ng-repeat="orderedProduct in shoppingCartProducts">' +
            '<td>{{$index+1}}</td>' +
            '<td>' +
            '<div class="item">' +
            '<div class="item_name">{{orderedProduct.name}}</div>' +
            '</div>' +
            '</td>' +
            '<td>{{orderedProduct.cost.amount | currency}}</td>' +
            '<td class="qty_1">{{orderedProduct.quantity}}</td>' +
            '<td>{{orderedProduct.quantity*orderedProduct.cost.amount | currency}}</td>' +
            '</tr>' +
            '</table>' +
            '<div class="table-bordered">' +
            '<div class="saved_l_bar pull-right">' +
            '<div class="fix_address pull-right">' +
            '<div class="saved_address">Amount Detail :</div>' +
            '<div class="saved_1 col-sm-7 col-md-7 pull-left">' +
            '<div class="fix_height">Subtotal :</div>' +
            '<div class="fix_height">Shipping Charge :</div>' +
            '<div class="fix_height margin_top total_amount">Total :</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-5 col-md-5 pull-left">' +
            '<div class="fix_height text-right">{{cartData.sub_total | currency}}</div>' +
            '<div class="fix_height text-right">{{shipping_charges}}</div>' +
            '<div class="fix_height margin_top text-right total_amount">{{cartData.total.amount | currency}}</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="add_delete pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="setAddressState(cartData)"><a href="">Back</a></button></div>' +
            '<div class="delete_btn pull-left"><button type="button" ng-click="paypal(cartData)"><a href="">Payment</a></button></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="s_bar pull-right">' +
            '<div class="saved_l_bar pull-right">' +
            '<div class="fix_address pull-right">' +
            '<div class="saved_address" >Billing Address</div>' +
            '<div class="saved_1 col-sm-5 colmd-5 pull-left">' +
            '<div class="fix_height">Name</div>' +
            '<div class="address fix_height">Address</div>' +
            '<div class="fix_height">City</div>' +
            '<div class="fix_height">State</div>' +
            '<div class="fix_height">Postal Code</div>' +
            '<div class="fix_height">Phone No:</div>' +
            '<div class="fix_height">Extension</div>' +
            '<div class="fix_height">Email:</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-7 colmd-7 pull-left">' +
            '<div class="fix_height">{{savedBillingAddress.firstname}} {{savedBillingAddress.lastname}}</div>' +
            '<div class="address fix_height">{{savedBillingAddress.address}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.city.name}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.state.name}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.zipcode}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.phone}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.ext}}</div>' +
            '<div class="fix_height">{{savedBillingAddress.email}}</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="saved_l_bar pull-right">' +
            '<div class="fix_address pull-right">' +
            '<div class="saved_address" >Shipping Address</div>' +
            '<div class="saved_1 col-sm-5 colmd-5 pull-left">' +
            '<div class="fix_height">Name</div>' +
            '<div class="address fix_height">Address</div>' +
            '<div class="fix_height">City</div>' +
            '<div class="fix_height">State</div>' +
            '<div class="fix_height">Postal Code</div>' +
            '<div class="fix_height">Phone No:</div>' +
            '<div class="fix_height">Extension</div>' +
            '<div class="fix_height">Email:</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-7 colmd-7 pull-left">' +
            '<div class="fix_height">{{savedShippingAddress.firstname}} {{savedShippingAddress.lastname}}</div>' +
            '<div class="address fix_height">{{savedShippingAddress.address}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.city.name}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.state.name}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.zipcode}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.phone}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.ext}}</div>' +
            '<div class="fix_height">{{savedShippingAddress.email}}</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="loadingImage" ng-hide="!loadingShoppingCartData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPathForOrder = function (path) {
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.setPaymentPath = function (paymentId) {
                        window.location.href = "#!/payment?id=" + paymentId;
                    }
                    $scope.setAddressState = function (cart) {
                        if (cart.bill_address) {
                            $scope.billingdata["bill_address"]["firstname"] = cart.bill_address.firstname ? cart.bill_address.firstname : "";
                            $scope.billingdata["bill_address"]["lastname"] = cart.bill_address.lastname ? cart.bill_address.lastname : "";
                            $scope.billingdata["bill_address"]["address"] = cart.bill_address.address ? cart.bill_address.address : "";
                            $scope.billingdata["bill_address"]["address_2"] = cart.bill_address.address_2 ? cart.bill_address.address_2 : "";
                            $scope.billingdata["bill_address"]["zipcode"] = cart.bill_address.zipcode ? cart.bill_address.zipcode : "";
                            $scope.billingdata["bill_address"]["phone"] = cart.bill_address.phone ? cart.bill_address.phone : "";
                            $scope.billingdata["bill_address"]["email"] = cart.bill_address.email ? cart.bill_address.email : "";
                            if (cart.bill_address.country) {
                                $scope.getEditCountries(cart.bill_address.country._id, cart.bill_address.state._id, cart.bill_address.city._id, $scope.data);
                            }
                        }
                        $scope.billingdata["same_shipping_address"] = cart.same_shipping_address;
                        if (!cart.same_shipping_address && cart.shipping_address) {
                            $scope.billingdata["shipping_address"]["firstname"] = cart.shipping_address.firstname ? cart.shipping_address.firstname : "";
                            $scope.billingdata["shipping_address"]["lastname"] = cart.shipping_address.lastname ? cart.shipping_address.lastname : "";
                            $scope.billingdata["shipping_address"]["address"] = cart.shipping_address.address ? cart.shipping_address.address : "";
                            $scope.billingdata["shipping_address"]["address_2"] = cart.shipping_address.address_2 ? cart.shipping_address.address_2 : "";
                            $scope.billingdata["shipping_address"]["zipcode"] = cart.shipping_address.zipcode ? cart.shipping_address.zipcode : "";
                            $scope.billingdata["shipping_address"]["phone"] = cart.shipping_address.phone ? cart.shipping_address.phone : "";
                            $scope.billingdata["shipping_address"]["email"] = cart.shipping_address.email ? cart.shipping_address.email : "";
                            if (cart.shipping_address.country) {
                                $scope.getEditCountries(cart.shipping_address.country._id, cart.shipping_address.state._id, cart.shipping_address.city._id, $scope.storedata);
                            }
                        }
                        $scope.setPathForOrder('billing-address?q=setBackData');
                    }
                    $scope.paypal = function (cart) {
                        var products = [];
                        for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                            products.push({"name": $scope.shoppingCartProducts[i].name, "price": $scope.shoppingCartProducts[i].cost.amount.toFixed(2), "currency": $scope.shoppingCartProducts[i].cost.type.currency, "quantity": $scope.shoppingCartProducts[i].quantity});
                        }
                        var shipping_address = {"recipient_name": $scope.savedShippingAddress.firstname + " " + $scope.savedShippingAddress.lastname, "type": "residential", "line1": $scope.savedShippingAddress.address, "city": $scope.savedShippingAddress.city.name, "state": $scope.savedShippingAddress.state.abbreviation, "country_code": "US", "postal_code": $scope.savedShippingAddress.zipcode};
                        //var shipping_address = {"recipient_name": "Perry Gupta", "type": "residential", "line1": "Building 4", "city": "Columbus", "state": "OH", "country_code": "US", "postal_code": "43215"};
                        var fixedAmount = $scope.cartData.total.amount.toFixed(2);
                        var amount = {"currency": $scope.cartData.total.type.currency, "total": fixedAmount, "details": {"tax": "0.00", "shipping": "0.00"}};
                        var return_url = "http://cstore.daffodilapps.com/#!/orders";
                        var cancel_url = "http://cstore.daffodilapps.com/#!/order-review";
                        var requestBody = {"products": products, "shipping_address": shipping_address, "amount": amount, "return_url": return_url, "cancel_url": cancel_url, "ask": ASK, "osk": OSK,"mode":"sandbox"};
                        var serviceUrl = "/rest/create/payment";
                        $appService.createPayment(serviceUrl, requestBody, "GET", "JSON", function (callbackdata) {
                            if(callbackdata.code==17){
                                $("#popupMessage").html(callbackdata.response);
                                $('.popup').toggle("slide");
                            }
                            else{
                                var response = callbackdata.response;
                                var paymentId= callbackdata.response.id;
                                var links = callbackdata.response.links;
                                var redirectUrl;
                                for (var index=0; index < links.length; index++) {
                                    //Redirect user to this endpoint for redirect url
                                    if (links[index].rel == 'approval_url') {
                                        redirectUrl = links[index].href;
                                        break;
                                    }
                                }

                                var tokenIndex = redirectUrl.indexOf("token=");
                                var token = redirectUrl.substring(tokenIndex + 6);
                                $scope.saveOrder(cart,paymentId,token,redirectUrl);
                            }

                        }, function (jqxhr, error) {
                            $("#popupMessage").html("Please check your paypal info");
                            $('.popup').toggle("slide");
                        });

                    }
                    $scope.saveOrder = function (cart, paymentId, token,redirectUrl) {
                        var order_date = new Date();
                        //$scope.loadingShoppingCartData = true;
                        $scope.newOrder = {};
                        $scope.newOrder["bill_address"] = {};
                        $scope.newOrder["userid"] = {};
                        $scope.newOrder["shipping_address"] = {};
                        $scope.newOrder["product"] = [
                            {"name": "", "cost": "", "quantity": ""}
                        ];
                        $scope.newOrder["userid"] = {"_id": $scope.currentUser.data.userid, "username": $scope.currentUser.data.username};
                        $scope.newOrder["storeid"] = {"_id": $scope.currentUser.data.storeid};
                        $scope.newOrder["sub_total"] = cart.sub_total;
                        $scope.newOrder["total"] = cart.total;
                        $scope.newOrder["order_date"] = order_date;
                        $scope.newOrder["status"] = "In Progress";
                        $scope.newOrder["bill_address"]["address"] = cart.bill_address.address;
                        $scope.newOrder["bill_address"]["address2"] = cart.bill_address.address_2;
                        $scope.newOrder["bill_address"]["city"] = cart.bill_address.city;
                        $scope.newOrder["bill_address"]["country"] = cart.bill_address.country;
                        $scope.newOrder["bill_address"]["email"] = cart.bill_address.email;
                        $scope.newOrder["bill_address"]["ext"] = cart.bill_address.ext;
                        $scope.newOrder["bill_address"]["firstname"] = cart.bill_address.firstname;
                        $scope.newOrder["bill_address"]["lastname"] = cart.bill_address.lastname;
                        $scope.newOrder["bill_address"]["phone"] = cart.bill_address.phone;
                        $scope.newOrder["bill_address"]["zipcode"] = cart.bill_address.zipcode;
                        $scope.newOrder["bill_address"]["state"] = cart.bill_address.state;
                        $scope.newOrder["shipping_address"]["address"] = cart.shipping_address.address;
                        $scope.newOrder["shipping_address"]["address2"] = cart.shipping_address.address_2;
                        $scope.newOrder["shipping_address"]["city"] = cart.shipping_address.city;
                        $scope.newOrder["shipping_address"]["country"] = cart.shipping_address.country;
                        $scope.newOrder["shipping_address"]["email"] = cart.shipping_address.email;
                        $scope.newOrder["shipping_address"]["ext"] = cart.shipping_address.ext;
                        $scope.newOrder["shipping_address"]["firstname"] = cart.shipping_address.firstname;
                        $scope.newOrder["shipping_address"]["lastname"] = cart.shipping_address.lastname;
                        $scope.newOrder["shipping_address"]["phone"] = cart.shipping_address.phone;
                        $scope.newOrder["shipping_address"]["zipcode"] = cart.shipping_address.zipcode;
                        $scope.newOrder["shipping_address"]["state"] = cart.shipping_address.state;
                        $scope.newOrder["product"] = cart.product;
                        $scope.newOrder["paymentId"] = paymentId;
                        $scope.newOrder["token"] = token;
                        var query = {};
                        query.table = "orders__cstore";
                        query.operations = [$scope.newOrder];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                window.location.href=redirectUrl;
                            } else {
                                $("#popupMessage").html(callBackData.response);
                                $('.popup').toggle("slide");
                                $scope.loadingShoppingCartData = false;
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
