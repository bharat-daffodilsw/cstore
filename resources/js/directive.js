cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div><div class="header"><div ng-class="{visible:!displayData.options}" id="cm" class="pull-left"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown pull-left"><div class="logo1 pull-left"><a href="/"><img src="/images/main_logo.png"/></a>' +

            '</div><store-header ng-show="displayData.cart"></store-header><div ng-show="displayData.options" class="logo pull-right"><a href="/"><img ng-show="displayData.companyLogo" ng-src="{{currentUser.data.companyLogoUrl}}"/><img ng-hide="displayData.companyLogo" src="images/main_logo02.png"></a></div><div class="username pull-right"><div ng-show="displayData.loggedIn" class="user pull-left">{{currentUser.data.firstname}}</div>' +
            '<div ng-show="displayData.loggedIn" id="my_profile" class="pull-left"><img src="images/logout.png"><div class="pull-left" id="sign_out" ">' +

            '<ul><li class="active"><a href = "/#!/profile">Profile</a></li><li><a ng-click="logOut()">' +
            'Sign Out</a></li></ul></div></div></div></div>' +
            '<drop-down ng-show="displayData.options"></drop-down><admin-menu ng-show="displayData.menu"></admin-menu></div>' +
            '<div class="popup" style="display:none;">' +
            '<div class="popup-manage">' +
            '<h2 class="h2-popup">Attention</h2>' +
            '<form method="" class="ng-pristine ng-valid">' +
            '<p class="alert-p" id="popupMessage"></p>' +
            '<p class="role-change"><input type="button" value="OK" class="alert-ok" ng-click="cancelAlertPopup()"></p>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.cancelAlertPopup = function () {
                        $('.popup').toggle("slide");
                    }
                }
            }
        }
    }
}]);

//cstore.directive('locationPopup', ['$appService', function ($appService, $scope) {
//    return{
//        restrict: "E",
//        template: '<div class="location_popup pull-left"><div class="loction_img pull-left"><img src="images/location.png"></div><div class="popup">Help us to serve you better</div>' +
//            '<div class="popup">Please provide your location details.</div><div class="pop_btn pull-left"><div class="popup_input pull-left">' +
//            '<input type="text" ng-model="asyncSelected" placeholder="Locations" typeahead="address for address in getLocation($viewValue) | filter:$viewValue" typeahead-loading="loadingLocations">' +
//            '</div><div class="delete_btn pull-right"><button type="button" ng-click="selectedLocation()"><a href="">Go</a></button></div><div class="add_btn"><button type="button" ng-click="hidePopup()"><a href>Cancel</a></button></div></div></div>',
//        compile: function () {
//            return {
//                pre: function ($scope) {
//                    $scope.hidePopup = function () {
//                        $(".location_popup").hide();
//                    }
//                    /*$scope.selectedLocation=function(){
//                     //console.log($scope.asyncSelected);
//                     $appService.delete_cookie("selectedLoc");
//                     $scope.selectedLoc=$scope.asyncSelected;
//                     var c_name = "selectedLoc";
//                     if($scope.selectedLoc && $scope.selectedLoc!=null && $scope.selectedLoc!="null"){
//                     document.cookie = c_name + "=" + escape($scope.selectedLoc);
//                     }
//                     else {
//                     var defaultLocation ="United States";
//                     document.cookie = c_name + "=" + escape(defaultLocation);
//                     }
//                     $(".location_popup").hide();
//                     } */
//                },
//                post: function () {
//                }
//            }
//        }
//
//    }
//}]);
/*bharat chanage */
cstore.directive('locationPopup', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="location_popup pull-left"><div class="loction_img pull-left"><img src="images/location.png"></div><div class="popup">Help us to serve you better</div>' +
            '<div class="popup">Please provide your location details.</div><div class="pop_btn pull-left"><div class="popup_input pull-left">' +
            '<google-places location=location></google-places>' +
            '</div><div class="delete_btn pull-right"><button type="button" ng-click="doSearch()"><a href="">Go</a></button></div><div class="add_btn"><button type="button" ng-click="hidePopup()"><a href>Cancel</a></button></div></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.hidePopup = function () {
                        $(".location_popup").hide();
                    }
                    /*$scope.selectedLocation=function(){
                     //console.log($scope.asyncSelected);
                     $appService.delete_cookie("selectedLoc");
                     $scope.selectedLoc=$scope.asyncSelected;
                     var c_name = "selectedLoc";
                     if($scope.selectedLoc && $scope.selectedLoc!=null && $scope.selectedLoc!="null"){
                     document.cookie = c_name + "=" + escape($scope.selectedLoc);
                     }
                     else {
                     var defaultLocation ="United States";
                     document.cookie = c_name + "=" + escape(defaultLocation);
                     }
                     $(".location_popup").hide();
                     } */
                },
                post: function () {
                }
            }
        }

    }
}]);
/*change end here */
cstore.directive('adminMenu', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="admin_menu pull-left"><ul><li><a href ="#!/vendors" active-link="active">Vendor</a></li><li><a href="#!/site-info" active-link="active">Site Info</a></li>' +
            '<li id="pops"><a href="#!/pops" active-link="active">POP</a></li><li id="promotions"><a active-link="active" href="#!/promotions" >Promotion</a></li><li id="training-sessions"><a active-link="active" href>Training Session</a></li><li>' +
            '<a href active-link="active">Survey</a></li><li id="setup"><a href active-link="active">Setup</a><div class="setup pull-left"><ul><li id="users"><a href="#!/manage-users" active-link="active">Manage Users</a></li><li id="training-categories"><a href active-link="active">Training Category</a>' +
            '</li><li id="product-categories"><a href="#!/pop-categories" active-link="active">POP Category</a></li><li id="cities"><a href="#!/cities" active-link="active">Cities</a></li><li id="states"><a href="#!/states" active-link="active">States</a></li><li id="countries">' +
            '<a href="#!/countries"active-link="active">Countries</a></li></ul></div></li></ul></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                },
                post: function () {

                }
            }
        }

    }
}]);

cstore.directive('storeHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="search_addcart pull-left"><div class="search pull-left"><form ng-submit="search()">' +
            '<input type="text" placeholder="Search by pop" name="search_theme_form"id="edit-search-theme-form-1" ng-model="searchContent" size="15"  title="Enter the terms you wish to search for." class="search">' +
            '<input type="submit" style="display:none"></form>' +
            '<div class="search_sign pull-left" ng-click="search()"><a href><img src="images/Search.png"></a></div></div><div class="location pull-left">' +
            ' <span class="where_i">I am in</span><a href><span class="loction_img pull-left"><img src="images/location.png">' +
            '</span><span class="country">{{currentLoc.data.selectedLoc}}</span></a></div><div class="add_cart pull-right"><div class="addcart_link pull-left"><a href>' +
            '<img src="images/finalcart.png"></a></div><div class="add_count pull-left">( 0 )</div></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.search = function () {
                        var hash = window.location.hash;
                        if ($scope.searchContent != "" && $scope.searchContent != "undefined") {
                            if (hash.indexOf("?q=") > 0) {
                                if (hash.indexOf("search") > 0) {
                                    var searchIndex = hash.indexOf("search");
                                    //console.log(hash.indexOf("search"));
                                    //console.log(hash.substring(0,searchIndex-1));
                                    var substr = hash.substring(0, searchIndex - 1);
                                    console.log(substr);
                                    window.location.href = substr + "&search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                                else {
                                    console.log(hash);
                                    window.location.href = hash + "&search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                    //window.location.href = "/#!/?search=" + $scope.searchContent;
                                    //window.location.href = hash+"?search="+$scope.searchContent;
                                }
                            }
                            else if (hash.indexOf("?popid=") > 0) {

                                window.location.href = "#!/all-pops?search=" + $scope.searchContent;
                                //$scope.searchContent="";
                            }
                            else if (hash.indexOf("#!/") >= 0 || hash == "#!/") {
                                //console.log(hash.indexOf("#!/"));
                                if (hash.indexOf("search") > 0) {
                                    var searchIndex = hash.indexOf("search");
                                    //console.log(hash.indexOf("search"));
                                    //console.log(hash.substring(0,searchIndex-1));
                                    var substr = hash.substring(0, searchIndex - 1);
                                    window.location.href = "/" + substr + "?search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                                else {
                                    //window.location.href = "/#!/?search=" + $scope.searchContent;
                                    window.location.href = hash + "?search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                            }
                            else {
                                console.log(hash);
                            }
                        }
                        else {
                            console.log(hash);
                            if (hash.indexOf("search") > 0) {
                                var searchIndex = hash.indexOf("search");
                                var substr = hash.substring(0, searchIndex - 1);
                                window.location.href = substr;
                                //$scope.searchContent="";
                            }
                            else {
                                window.location.href = hash;
                            }
                        }
                    }
                },
                post: function () {

                }
            }
        }
    }
}]);

cstore.directive('dropDown', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",


        template: '<div id="primary" class="pull-left" style="display:none;z-index:100000"><ul><li ng-repeat="productCategory in productdata.productCategories" class="active" ng-click="hideOptions()"><a href="#!/pop-category?q={{productCategory._id}}">{{productCategory.name}}</a></li>' +

            '</ul></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.hideOptions = function () {
                        $("#primary").hide();
                    }
                }
            }
        }
    }
}]);

cstore.directive('activeLink', ['$location', function (location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            //console.log(click);
            path = path.substring(2); //hack because path does bot return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.addClass(clazz);
                } else {
                    element.removeClass(clazz);
                }
            });
        }
    };
}]);

cstore.directive('footer', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="footer pull-left"><div class="footer_3 pull-left">' +
            ' Copyright </div><div class="footer_3 pull-left"> Terms Privacy </div>' +
            '<div class="footer_3 pull-left"> Contact us </div>' +
            '<div class="footer_4 pull-left"><img src="images/logo.jpg"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {

                }
            }
        }
    }
}]);

cstore.directive('popularProducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products">Popular pops <a href="#!/all-pops">( View all )</a>' +
            '</div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in popularProducts"><div class="products_img">' +


            '<a href="#!/pop?popid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +

            '</a></div><div class="name"><a href="#!/pop?popid={{product._id}}">{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href="#!/pop?popid={{product._id}}">{{product.cost.amount | currency}}</a></div>' +

            '<div class="add_to_cart"><a href>Add To Cart</a></div></div></div><div class="loadingImage" ng-hide="!loadingPopularProductData"><img src="images/loading.gif"></div>'
    }
}]);

cstore.directive('allproducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left" ng-repeat="product in products" ng-show="product.categoryWiseData.length">' +
            '<div class="pop_products">{{product.name}} <a href="#!/pop-category?q={{product._id}}">( View all )</a></div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="childproduct in product.categoryWiseData">' +
            '<div class="products_img"><a href="#!/pop?popid={{childproduct._id}}"><img ng-src="{{childproduct.imageUrl}}"></a></div><div class="name"><a href="#!/pop?popid={{childproduct._id}}">' +
            '{{childproduct.name}}</a></div><div class="product_details">' +
            '{{childproduct.short_description}}</div><div class="price">' +
            '<a href="#!/pop?popid={{childproduct._id}}">{{childproduct.cost.amount | currency}}</a></div><div class="add_to_cart"><a href>Add To Cart</a></div></div>' +
            '</div></div><div class="loadingImage" ng-hide="!loadingAllProductData"><img src="images/loading.gif"></div>'
    }
}]);

cstore.directive('productDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products"><a href="/">Home</a> > <a href="#!/all-pops">POP Store</a> > <a href="#!/pop-category?q={{product[0].product_category._id}}">{{product[0].product_category.name}}</a> > {{product[0].name}}</div><div class="img_product pull-left">' +
            '<img ng-src="{{product[0].imageUrl}}" /></div>' +
            '<div class="details_product pull-left"><div class="short_details">{{product[0].short_description}}</div><div class="Qty"><div class="quantity_border">Quantity : ' +
            '<select class="qty_select_1"><option>1</option><option>2</option><option>3</option>' +
            '<option>4</option><option>5</option></select></div><div class="final_price">Price : <b>{{product[0].cost.amount | currency}}</b></div><div class="add_to_btn pull-left">' +
            '<a href>ADD TO CART</a></div></div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{product[0].description}}</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingProductDetailData"><img src="images/loading.gif"></div>'
    }
}]);

cstore.directive('vendor', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-vendor\')" type="button">Add</button>' +
            '</div><div class="delete_btn pull-left"><button ng-click="deleteUsers()"  type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + vendors.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess()"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            '<span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'firstname\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'firstname\',\'desc\')"></div>	</span></th><th><span>Address</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'address\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'address\',\'desc\')"></div>	</span></th><th><span>City</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'city.name\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'city.name\',\'desc\')"></div>	</span></th><th><span>State</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'state.name\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'state.name\',\'desc\')"></div></span>	</th><th><span>Email</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'email\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'email\',\'desc\')"></div>	</span></th><th><span>Contact No.</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'contact\',\'asc\')"></div><div class="sortDown" ng-click="setOrder(\'contact\',\'desc\')"></div></span>	</th><th></th>' +
            '</tr><tr ng-repeat="vendor in vendors"><td><input type="checkbox" ng-model="vendor.deleteStatus"></td><td>{{vendor.firstname}} {{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td><td>{{vendor.city.name}}</td><td>{{vendor.state.name}}</td><td>{{vendor.email}}</td><td>{{vendor.contact}}</td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="setUserState(vendor)">Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingVenderData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllVendors(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.deleteUserArray = [];
                    $scope.deleteUsers = function () {
                        for (var i = 0; i < $scope.vendors.length; i++) {
                            if ($scope.vendors[i].deleteStatus) {
                                $scope.deleteUserArray.push({"_id": $scope.vendors[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = angular.copy($scope.deleteUserArray);
                        $scope.deleteUserArray = [];
                        if (query.operations.length) {
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.vendors.length; i++) {
                                        if ($scope.vendors[i].deleteStatus) {
                                            console.log("delete items" + i);
                                            $scope.vendors.splice(i, 1);
                                        }
                                    }
                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    console.log(callBackData);
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
                            $("#popupMessage").html("please select at least one vendor before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.setUserState = function (vendor) {
                        $scope.data["firstname"] = vendor.firstname ? vendor.firstname : "";
                        $scope.data["lastname"] = vendor.lastname ? vendor.lastname : "";
                        $scope.data["contact"] = vendor.contact ? vendor.contact : "";
                        $scope.data["postalCode"] = vendor.postalcode ? vendor.postalcode : "";
                        $scope.data["address"] = vendor.address ? vendor.address : "";
                        $scope.data["email"] = vendor.email ? vendor.email : "";
                        $scope.data["address2"] = vendor.address2 ? vendor.address2 : "";
                        //$scope.data["vendorCategory"]=vendor.category ;//? vendor.category :$scope.vendorCategories[0];
                        if (vendor.category) {
                            for (var j = 0; j < $scope.data.vendorCategories.length; j++) {
                                if ($scope.data.vendorCategories[j].name == vendor.category) {
                                    $scope.data.selectedVendorCategory = $scope.data.vendorCategories[j];
                                    break;
                                }
                                else {
                                    $scope.data.selectedVendorCategory = $scope.data.vendorCategories[$scope.data.vendorCategories.length-1];
                                    $scope.data.otherCategory = vendor.category;
                                    console.log(JSON.stringify(vendor.category));
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                    break;
                                }

                            }
                        }
                        if (vendor.country) {	
							vendor.state = (vendor.state) ? {"_id":vendor.state._id} : {"_id":false};
							vendor.city = (vendor.city) ? {"_id":vendor.city._id} : {"_id":false};
                            $scope.getEditCountries(vendor.country._id,vendor.state._id,vendor.city._id);
                        }
                        window.location.href = "#!edit-vendor?q=" + vendor._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('citySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="select_city" ng-model="data.selectedCity" ' +
            'ng-options="city.name for city in data.cities"></select>',
        compile: function () {
            return {
                pre: function () {

                }
            }
        }
    }
}]);

cstore.directive('searchBy', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="searchby" ng-options="search.name for search in venderSearch"></select>',
        compile: function () {
            return {
                pre: function () {

                }
            }
        }
    }
}]);

cstore.directive('stateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="select_city"  ng-change="getCities(data.selectedState._id)" ng-model="data.selectedState" ng-options="state.name for state in data.states"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('vendorCountrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand"  ng-change="getEditStates(data,false,false)" ng-model="data.selectedCountry" ng-options="country.name for country in data.countries"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('vendorCategorySelect', ['$appService', function ($appService, $scope) {
    return { 
        restrict: 'E',
        template: '<select class="brand" ng-model="data.selectedVendorCategory" ng-options="vendorCategory.name for vendorCategory in data.vendorCategories"></select>' +
            '<input type="text" placeholder="" ng-show = "data.selectedVendorCategory.name== \'Others\'" ng-model="data.otherCategory" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);


cstore.directive('addVendor', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">First Name</div></td><td><div class="margin_top">Last Name</div></td></tr><tr>' +
            '<td><input type="text" placeholder="" ng-model="data.firstname"></td><td><input type="text" placeholder=""ng-model="data.lastname"></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td class="city"><input type="email" ng-model="data.email">' +
            '</td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Address</div>' +
            '</td></tr><tr><td class="text_area"><textarea ng-model="data.address"> </textarea></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Address 2</div>' +
            '</td></tr><tr><td class="text_area"><textarea ng-model="data.address2"> </textarea></td></tr></table>' +
            '<div class="l_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Country</div>' +
            '</td></tr><tr><td><vendor-country-select></vendor-country-select></td></tr><tr><td><div class="margin_top">City</div>' +
            '</td></tr><tr><td><city-select></city-select></td>' +
            '</tr><tr><td><div class="margin_top">Postal Code</div></td>' +
            '</tr><tr><td><input type="text"  placeholder="" ng-model="data.postalCode"></td>' +
            '</tr></table></div><div class="r_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
            '<td><div class="margin_top">State</div></td></tr><tr><td>' +
            '<state-select></state-select></td></tr><tr>' +
            '<td><div class="margin_top">Category</div></td></tr><tr><td>' +
            '<vendor-category-select></vendor-category-select></td></tr><tr><td>' +
            '<div class="margin_top">Contact No.</div></td></tr><tr><td>' +
            '<input maxlength="10" type="text" ng-model="data.contact" placeholder=""></td></tr></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button ng-click="saveVendor()" type="button">Save</button></div><div class="delete_btn pull-left"><button ng-click="setPathforVender(\'vendors\')" type="button">Close</button>' +
            '</div></div></td></tr></table></div><div class="loadingImage" ng-hide="!loadingAddVenderData"><img src="images/loading.gif"></div></div>',

        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddVenderData = true;
                    $scope.newVendor = {};
                    $scope.setPathforVender = function (path) {
                        $scope.clearContent();
                        $scope.removeCategoryValue();
                        window.location.href = "#!/" + path;
                    }
                    $scope.removeCategoryValue = function () {
                        $scope.data.vendorCategories.splice($scope.data.vendorCategories.length - 2, 1);
                    }
                },
                post: function ($scope) {
                    $scope.loadingAddVenderData = false;
                    $scope.saveVendor = function () {
					
                        $scope.newVendor = {};
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
						var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var email = $scope.data.email;
                        if (!$scope.data.firstname) {
                            $("#popupMessage").html("Please enter firstname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!email || regEmail.test(email) == false) {
                            $("#popupMessage").html("Please enter a valid email id");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.address) {
                            $("#popupMessage").html("Please enter address");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCountry) {
                            $("#popupMessage").html("Please select country first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedVendorCategory) {
                            $("#popupMessage").html("Please select category first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data.selectedVendorCategory.name == "Others" && !$scope.data.otherCategory) {
                            $("#popupMessage").html("Please enter category");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data.postalCode && !regNumberOnly.test($scope.storedata.postalCode)) {
                            $("#popupMessage").html("Please enter correct postal code");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data["userid"]) {
                            $scope.newVendor["_id"] = $scope.data["userid"];
                        }
                        $scope.newVendor.email = email;
                        $scope.newVendor["firstname"] = $scope.data.firstname;
                        $scope.newVendor["lastname"] = $scope.data.lastname;
                        $scope.newVendor["address"] = $scope.data.address;
                        $scope.newVendor["address2"] = $scope.data.address2;

                        $scope.newVendor["category"] = ($scope.data.selectedVendorCategory.name == "Others") ? $scope.data.otherCategory :$scope.data.selectedVendorCategory.name ;
                        if ($scope.data.selectedCountry && $scope.data.selectedCountry != null && $scope.data.selectedCountry != undefined && $scope.data.selectedCountry != "undefined" && $scope.data.selectedCountry != "null") {
                            $scope.newVendor["country"] = {"_id": $scope.data.selectedCountry._id, "name": $scope.data.selectedCountry.name}
                        }
                        if ($scope.data.selectedCity && $scope.data.selectedCity != null && $scope.data.selectedCity != undefined && $scope.data.selectedCity != "undefined" && $scope.data.selectedCity != "null") {
                            $scope.newVendor["city"] = {"_id": $scope.data.selectedCity._id, "name": $scope.data.selectedCity.name}
                        }
                        if ($scope.data.selectedState && $scope.data.selectedState != null && $scope.data.selectedState != undefined && $scope.data.selectedState != "undefined" && $scope.data.selectedState != "null") {
                            $scope.newVendor["state"] = {"_id": $scope.data.selectedState._id, "name": $scope.data.selectedState.name}
                        }
                        $scope.newVendor["postalcode"] = $scope.data.postalCode;
                        $scope.newVendor["contact"] = $scope.data.contact;
                        $scope.newVendor["email"] = $scope.data.email;
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = [$scope.newVendor];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforVender('vendors');
                            } else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving user");
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

cstore.directive('productCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">{{products[0].product_category.name}}</div>' +
            '<div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in products"><div class="products_img"><a href="#!/pop?popid={{product._id}}">' +
            '<img src="{{product.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/pop?popid={{product._id}}">{{product.name}}</a></div><div class="product_details">{{product.short_description}}</div>' +
            '<div class="price"><a href="#!/pop?popid={{product._id}}">{{product.cost.amount | currency}}</a></div><div class="add_to_cart"><a href>' +
            'Add To Cart</a></div></div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!categoryData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);

/********************************Product*****************************************/

cstore.directive('productList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-pop\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProduct()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + products.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Name</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'name\',\'asc\')"></div><div class="sortDown" ng-click="setProductOrder(\'name\',\'desc\')"></div>	</span></th>' +
            '<th>POP Category<span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'product_category.name\',\'asc\')"></div><div class="sortDown" ng-click="setProductOrder(\'product_category.name\',\'desc\')"></div>	</span></th><th><span>Price</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'cost\',\'asc\')"></div><div class="sortDown" ng-click="setProductOrder(\'cost\',\'desc\')"></div>	</span></th><th><span>Quantity</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'quantity\',\'asc\')"></div><div class="sortDown" ng-click="setProductOrder(\'quantity\',\'desc\')"></div></span></th><th><span>Sold Count</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'soldcount\',\'asc\')"></div><div class="sortDown" ng-click="setProductOrder(\'soldcount\',\'desc\')"></div></span></th><th></th></tr><tr ng-repeat="product in products"><td>' +
            '<input type="checkbox" ng-model="product.deleteStatus"></td><td>{{product.name}}</td><td>{{product.product_category.name}}</td><td>' +
            '{{product.cost.amount | currency}}</td><td>{{product.quantity}}</td><td>{{product.soldcount}}</td>' +
            '<td><a class="edit_btn" ng-click="setProductState(product)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingProductData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProducts(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.deleteProductArray = [];
                    $scope.deleteProduct = function () {
                        for (var i = 0; i < $scope.products.length; i++) {
                            if ($scope.products[i].deleteStatus) {
                                $scope.deleteProductArray.push({"_id": $scope.products[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "products__cstore";
                        query.operations = angular.copy($scope.deleteProductArray);
                        $scope.deleteProductArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.products.length; i++) {
                                    if ($scope.products[i].deleteStatus) {
                                        console.log("delete items" + i);
                                        $scope.products.splice(i, 1);
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            }
                            else {
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
                    $scope.setProductState = function (product) {
                        $scope.productdata["name"] = product.name ? product.name : "";
                        $scope.productdata["cost"] = product.cost ? product.cost : "";
                        $scope.productdata["description"] = product.description ? product.description : "";
                        $scope.productdata["short_description"] = product.short_description ? product.short_description : "";
                        $scope.productdata["quantity"] = product.quantity ? product.quantity : "";
                        //$scope.productdata["image"] = product.image;
                        $scope.showFile(product.image, false);
                        //console.log($scope.productdata.image);

                        if (product.product_category._id) {
                            for (var j = 0; j < $scope.productdata.productCategories.length; j++) {
                                if ($scope.productdata.productCategories[j]._id == product.product_category._id) {
                                    $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-pop?q=" + product._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('vendorSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="search_select" ng-model="productdata.selectedVendor" ng-options="vendor.firstname for vendor in productdata.vendors"></select>'
    }
}]);

cstore.directive('productCategorySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="search_select" ng-model="productdata.selectedProductCategory" ng-options="productCategory.name for productCategory in productdata.productCategories"></select>'
    }
}]);

cstore.directive('addProduct', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">Name</div></td><td><div class="margin_top">POP Categroy</div></td></tr><tr><td><input type="text" placeholder="" ng-model="productdata.name">' +
            '</td><td><product-category-select></product-category-select></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">' +
            'Detailed Description</div></td></tr><tr><td class="name_input"><input type="text" placeholder="" ng-model="productdata.description"> ' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">' +
            'Short Description</div></td></tr><tr><td class="name_input"><input type="text" placeholder="" ng-model="productdata.short_description"> ' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr><td><div class="margin_top">Quantity</div></td><td><div class="margin_top">Price</div></td>' +
            '</tr><tr><td><input type="text" placeholder="" ng-model="productdata.quantity"></td><td><input type="text" placeholder="" ng-model="productdata.cost.amount"></td>' +
            '</tr>' +
            '</table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="saveProduct()"><a href>Save</a></button></div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforProduct(\'pops\')"><a href>Close</a></button></div></div></td><td class="product_image"><app-file-upload></app-file-upload></td></tr></table></div><div class="loadingImage" ng-hide="!loadingAddProductData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.productdata["editImage"] = false;
                    $scope.loadingAddProductData = true;
                    $scope.newProduct = {};
                    $scope.setPathforProduct = function (path) {
                        $scope.clearProductContent();
                        window.location.href = "#!/" + path;
                    }
                    $scope.editImage = function () {
                        $scope.productdata["editImage"] = false;
                    }

                },
                post: function ($scope) {
                    $scope.loadingAddProductData = false;
                    $scope.saveProduct = function () {
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.productdata.name) {
                                $("#popupMessage").html("Please enter product name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.description) {
                                $("#popupMessage").html("Please enter detailed description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.short_description) {
                                $("#popupMessage").html("Please enter short description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.quantity) {
                                $("#popupMessage").html("Please enter quantity");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.productdata.cost || !$scope.productdata.cost.amount ) {
                                $("#popupMessage").html("Please enter price");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$('#uploadfile').val()) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            var query = {};
                            query.table = "products__cstore";

                            if ($scope.productdata["productid"]) {
                                $scope.newProduct["_id"] = $scope.productdata["productid"];
                            }
                            $scope.newProduct["name"] = $scope.productdata.name;
                            $scope.newProduct["description"] = $scope.productdata.description;
                            $scope.newProduct["short_description"] = $scope.productdata.short_description;
                            $scope.newProduct["quantity"] = $scope.productdata.quantity;
                            //$scope.newProduct["vendor"] = {"firstname":$scope.productdata.selectedVendor.firstname, "_id":$scope.productdata.selectedVendor._id};
                            $scope.newProduct["product_category"] = {"name": $scope.productdata.selectedProductCategory.name, "_id": $scope.productdata.selectedProductCategory._id};
                            $scope.newProduct["cost"] = {"amount": $scope.productdata.cost.amount, "type": {"currency": "usd"}};
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newProduct["image"];
                                query.operations = [$scope.newProduct];
                                $scope.saveFunction(query);
                            }
                            else {
                                var current_file = {};
                                current_file.name = $scope.oFile.name;
                                current_file.type = $scope.oFile.type;
                                current_file.contents = $scope.oFile.data;
                                current_file.ask = ASK;
                                current_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                    if (data.response) {
                                        $scope.newProduct["image"] = data.response;
                                        query.operations = [$scope.newProduct];
                                        $scope.saveFunction(query);
                                    }
                                    else {
                                        
										$("#popupMessage").html("some error while uploading image please try again");
										$('.popup').toggle("slide");
                                
                                    }
                                }, function (callbackerror) {
                                    $("#popupMessage").html(callbackerror);
                                    $('.popup').toggle("slide");
                                });
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.saveFunction = function (query) {
                        //console.log(query);
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforProduct("pops");
                            } else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving user");
                                $('.popup').toggle("slide");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (err) {
                            console.log(err.stack);

                        });
                    }
                }
            }
        }
    }
}]);

cstore.directive('appFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
//        scope:true,
        template: "<div>" +
            '<div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div>' +
            "<span><input ng-show='readonlyrow.filenotexist' type='file' id='uploadfile'/></span>" +
            "<div ng-hide='readonlyrow.filenotexist'>" +
            "<span>" +
            "<div class='pic_preview'><img ng-src='{{readonlyrow.fileurl}}&resize={\"width\":100}'/></div>" +
            "</span>" +
            "<img src='images/icon_cross.gif'class='cross_icon' value='Remove' ng-click='removeFile()'/>" +
            "</div>" +
            "</div>",
        compile: function () {
            return {
                post: function ($scope, iElement) {
                    $scope.removeFile = function () {
                        delete $scope.row[$scope.colmetadata.expression];
                        $("#uploadfile").val("");
                        $scope.readonlyrow.filenotexist = true;
                    };
                    if ($scope.row[$scope.colmetadata.expression]) {
                        $scope.showFile($scope.row[$scope.colmetadata.expression], false);

                    } else if (!$scope.readonlyrow.fileurl) {
                        $scope.readonlyrow.filenotexist = true;
                    }
                    $scope.loadFile = function (evt) {
                        $scope.file = {};
                        $scope.file.name = $scope.oFile.name;
                        $scope.file.result = evt.target.result;
                        $scope.oFile['data'] = evt.target.result;
                        $scope.showUploadedFile($scope.file);
                    };
                    $scope.showUploadedFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(file.name)) {
                            $scope.showimage = true;
                            $scope.imageData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFReader = new FileReader();
                            if (document.getElementById('uploadfile').files.length === 0) {
                                return;
                            }
                            $scope.oFile = document.getElementById('uploadfile').files[0];
                            $scope.oFReader.onload = $scope.loadFile;
                            $scope.oFReader.readAsDataURL($scope.oFile);
                        });
                    });
                }
            }
        }
    }
}]);

/*****************************Store Manager******************************/
cstore.directive('storeManagerList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-site-info\')"><a href="">Add</a>' +
            '</button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteStoreManagers()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor" ><a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + storeManagers.length}} from start</div><div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Store Name</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'storename\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'storename\',\'desc\')"></div>	</span></th>' +
            '<th><span>Manager Shift<span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'shift\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'shift\',\'desc\')"></div>	</span></th><th><span>POS Type</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_type\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'pos_type\',\'desc\')"></div>	</span></th><th><span>POS Version</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_version\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'pos_version\',\'desc\')"></div>	</span></th><th><span>Loyalty Status</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'loyalty_status\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'loyalty_status\',\'desc\')"></div>	</span></th><th><span>Reward Type</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'reward_point\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'reward_point\',\'desc\')"></div>	</span></th><th><span>' +
            'Email</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'email\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'email\',\'desc\')"></div>	</span></th><th><span>Contact</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'contact\',\'asc\')"></div><div class="sortDown" ng-click="setStoreOrder(\'contact\',\'desc\')"></div>	</span></th><th></th></tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input type="checkbox"ng-model="storeManager.deleteStatus"></td><td>{{storeManager.storename}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.pos_type}}</td><td>' +
            '{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td><td>{{storeManager.email}}</td><td>{{storeManager.contact}}</td>' +
            '<td><a class="edit_btn" ng-click="setStoreState(storeManager)">Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingStoreData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllStoreManagers(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.deleteStoreArray = [];
                    $scope.deleteStoreManagers = function () {
                        for (var i = 0; i < $scope.storeManagers.length; i++) {
                            if ($scope.storeManagers[i].deleteStatus) {
                                $scope.deleteStoreArray.push({"_id": $scope.storeManagers[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = angular.copy($scope.deleteStoreArray);
                        $scope.deleteStoreArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.storeManagers.length; i++) {
                                    if ($scope.storeManagers[i].deleteStatus) {
                                        console.log("delete items" + i);
                                        $scope.storeManagers.splice(i, 1);
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            }
                            else {
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
                    $scope.setStoreState = function (store) {
                        //$scope.storedata.pos_version.name = store.pos_version;
                        //console.log("pos version name :::: "+ $scope.storedata.pos_version.name);
                        console.log(store.brands);
                        $scope.storedata["address"] = store.address ? store.address : "";
                        $scope.storedata["address2"] = store.address2 ? store.address2 : "";
                        $scope.storedata["pump_brand"] = store.pump_brand ? store.pump_brand : "";
                        $scope.storedata["pump_model"] = store.pump_model ? store.pump_model : "";
                        if (store.brands && store.brands.length > 0) {
//                            for(var i=0; i < store.brands.length;i++){
//                                $scope.storedata.brands[i] = {};
//                                $scope.storedata.brands[i] = store.brands[i];
//                                console.log($scope.storedata.brands[i].name);
//                            }
                            for (var i = 0; i < $scope.brands.length; i++) {
                                for (var j = 0; j < store.brands.length; j++) {
                                    console.log(JSON.stringify($scope.brands[i]));
                                    console.log(JSON.stringify(store.brands[j]));
                                    if (angular.equals($scope.brands[i].name, store.brands[j])) {
										if(!$scope.storedata.brands)
											$scope.storedata.brands = [];
                                        $scope.storedata.brands.push($scope.brands[i]);
                                    }
                                }
                            }
                        }
                        else {
                            $scope.storedata["brands"] = [];
                        }
                        console.log(JSON.stringify($scope.storedata.brands));
                        $scope.storedata["contact"] = store.contact ? store.contact : "";
                        $scope.storedata["loyalty_status"] = store.loyalty_status ? store.loyalty_status : "";
                        //$scope.storedata["pos_type"] = store.pos_type ? store.pos_type : "" ;
                        $scope.storedata["email"] = store.email ? store.email : "";
                        $scope.storedata["pos_version"] = store.pos_version ? store.pos_version : "";
                        $scope.storedata["postalcode"] = store.postalcode ? store.postalcode : "";
                        //$scope.storedata["reward_point"] = store.reward_point ? store.reward_point : "" ;
                        //$scope.storedata["shift"] = store.shift ? store.shift : "" ;
                        $scope.storedata["storename"] = store.storename ? store.storename : "";
                        //$scope.storedata["username"] = store.username ? store.username : "";
                        $scope.showFile(store.company_logo, false);
						$scope.storedata["manager"] = {};
                        if (store.manager) {
                            $scope.storedata["manager"]["contact"] = store.manager.contact ? store.manager.contact : "";
                            $scope.storedata["manager"]["email"] = store.manager.email ? store.manager.email : "";
                            $scope.storedata["manager"]["name"] = store.manager.name ? store.manager.name : "";

                        }
                        else {
                            $scope.storedata["manager"]["contact"] = "";
                            $scope.storedata["manager"]["email"] = "";
                            $scope.storedata["manager"]["name"] = "";

                        }
                        if (store.pos_type && $scope.storedata.posTypes) {
                            for (var j = 0; j < $scope.storedata.posTypes.length; j++) {
                                if ($scope.storedata.posTypes[j].name == store.pos_type) {
                                    $scope.storedata.selectedPosType = $scope.storedata.posTypes[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedPosType = $scope.storedata.posTypes[$scope.storedata.posTypes.length-1];
                                    $scope.storedata.otherPosType = store.pos_type;
                                    break;
                                }
                            }
                        }
                        if (store.reward_point && $scope.storedata.rewardTypes) {
                            for (var j = 0; j < $scope.storedata.rewardTypes.length; j++) {
                                if ($scope.storedata.rewardTypes[j].name == store.reward_point) {
                                    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[$scope.storedata.rewardTypes.length-1];
                                    $scope.storedata.otherRewardType = store.reward_point;
                                    break;
                                }
                            }
                        }
                        if (store.shift && $scope.storedata.shifts) {
                            for (var j = 0; j < $scope.storedata.shifts.length; j++) {
                                if ($scope.storedata.shifts[j].name == store.shift) {
                                    $scope.storedata.selectedShift = $scope.storedata.shifts[j];
                                    break;
                                }
                            }
                        }
						if (store.countryid) {	
							store.stateid = (store.stateid) ? {"_id":store.stateid._id} : {"_id":false};
							store.cityid = (store.cityid) ? {"_id":store.cityid._id} : {"_id":false};
                            $scope.getEditCountries(store.countryid._id,store.stateid._id,store.cityid._id);
                        }
                        window.location.href = "#!edit-site-info?q=" + store._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('storeCitySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand"  ng-model="storedata.selectedCity" ' +
            'ng-options="city.name for city in storedata.cities"></select>',
        compile: function () {
            return {
                pre: function () {

                }
            }
        }
    }
}]);

cstore.directive('storeStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-change="getCitiesNew(storedata,null)" ng-model="storedata.selectedState" ng-options="state.name for state in storedata.states"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('storeCountrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand"  ng-change="getStatesNew(storedata,null)" ng-model="storedata.selectedCountry" ng-options="country.name for country in storedata.countries"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('brand', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="multiple_select" multiple ng-multiple="true" ng-model="storedata.brands" ng-options="brand.name for brand in brands"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.brands.name == \'Others\'" ng-model="storedata.brandName" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('posType', ['$appService', function ($appService, $scope) {
    return { 
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedPosType" ng-options="posType.name for posType in storedata.posTypes"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedPosType.name== \'Others\'" ng-model="storedata.otherPosType" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('rewardType', ['$appService', function ($appService, $scope) {
    return { 
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedRewardType" ng-options="rewardType.name for rewardType in storedata.rewardTypes"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedRewardType.name== \'Others\'" ng-model="storedata.otherRewardType" class="other_input pull-left" >',
        compile: function () {
            return{
            }
        }
    }
}]);

cstore.directive('shift', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedShift" ng-options="shift.name for shift in storedata.shifts"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('addStoreManager', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div class="l_bar pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Site Name</div>' +
            '</td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.storename"></td></tr><tr><td>' +
            '<div class="margin_top">Site Phone</div></td></tr><tr><td><input type="text" maxlength="10" placeholder="" ng-model="storedata.contact">' +
            '</td></tr>' +
            '<tr><td><div class="margin_top">POS Type</div></td></tr><tr><td><pos-type></pos-type>' +
            '</td></tr><tr><td><div class="margin_top">POS Version</div></td></tr><tr><td><input type="text" placeholder="" ng-model="storedata.pos_version"></td>' +
            '</tr>' +           
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.email"></td>' +
            '</tr><tr><td><div class="margin_top">Address</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.address"></td></tr><tr><td><div class="margin_top">Address 2</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.address2"></td></tr>' +
            '<tr><td><div class="margin_top">Country </div></td></tr><tr><td><store-country-select></store-country-select></td></tr>' +
			'<tr><td><div class="margin_top">State </div></td></tr><tr><td><store-state-select></store-state-select></td></tr>' +
			'<tr><td><div class="margin_top">City</div></td></tr><tr><td><store-city-select></store-city-select></td></tr>' +
            '<tr><td><div class="margin_top">Postal Code</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.postalcode"></td></tr>' +
            '</table></div>' +			
            '<div class="r_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">Manager Name</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.manager.name"></td></tr>' +
            '<tr><td><div class="margin_top">Manager Phone</div></td></tr><tr><td><input type="text" maxlength="10" placeholder=""ng-model="storedata.manager.contact" ></td></tr><tr><td>' +
            '<div class="margin_top">Manager Email Address</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.manager.email"></td>' +
            '</tr><tr><td><div class="margin_top">Manager Shift</div></td></tr><tr><td><shift></shift></td></tr><tr><td><div class="margin_top">Loyalty Status</div></td></tr><tr><td>' +
            '<input type="text" placeholder="" ng-model="storedata.loyalty_status"></td></tr><tr><td><div class="margin_top">Reward Type</div>' +
            '</td></tr><tr><td><reward-type></reward-type></td></tr><tr><td><div class="margin_top">Pump Brand</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.pump_brand"></td></tr><tr><td><div class="margin_top">Pump Model </div>' +
            '</td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.pump_model"></td></tr>'+
			'<tr><td><div class="margin_top">Brand</div></td></tr><tr><td><brand></brand></td></tr>' +
            '<tr><td class="product_image"><app-file-upload></app-file-upload></td></tr><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="saveStore()"><a href="">Save</a></button></div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforStore(\'site-info\')"><a href="">Close</a></button></div></div></td></tr></table>' +
            '</div></div><div class="loadingImage" ng-hide="!loadingAddStoreData"><img src="images/loading.gif"></div></div>',	
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddStoreData = true;
                    $scope.newStore = {};
                    $scope.setPathforStore = function (path) {
                        $scope.clearStoreContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    var usk = $scope.CSession["usk"] ? $scope.CSession["usk"] : null;
                    $scope.loadingAddStoreData = false;
                    $scope.saveStore = function () {
                        if ($scope.CSession) {						
                            $scope.newStore = {};
                            $scope.newStore["manager"] = {};
                            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
							var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                            var email = $scope.storedata.email;
                            var managerEmail = $scope.storedata.manager.email;
                            if (!$scope.storedata.storename) {
                                $("#popupMessage").html("Please enter site name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.contact) {
                                $("#popupMessage").html("Please enter site phone number");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if ($scope.storedata.selectedPosType.name == "Others" && !$scope.storedata.otherPosType) {
                                $("#popupMessage").html("Please enter post type");
                                $('.popup').toggle("slide");
                                return false;
                            }    
                            if ($scope.storedata.postalcode && !regNumberOnly.test($scope.storedata.postalcode) ) {
                                $("#popupMessage").html("Please select correct postal code");
                                $('.popup').toggle("slide");
                                return false;
                            }     
                            if (!email || regEmail.test(email) == false) {
                                $("#popupMessage").html("Please enter a valid email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.address) {
                                $("#popupMessage").html("Please enter address");
                                $('.popup').toggle("slide");
                                return false;
                            }
							if (!$scope.storedata.manager.name) {
                                $("#popupMessage").html("Please enter manager name");
                                $('.popup').toggle("slide");
                                return false;
                            }  
                            if (!managerEmail || regEmail.test(managerEmail) == false) {
                                $("#popupMessage").html("Please enter a valid manager email id");
                                $('.popup').toggle("slide");
                                return false;
                            }  
                            if ($scope.storedata["storeid"]) {
                                $scope.newStore["_id"] = $scope.storedata["storeid"];
                            }
                            if ($scope.storedata.selectedRewardType.name == "Others" && !$scope.storedata.otherRewardType) {
                                $("#popupMessage").html("Please enter reward type");
                                $('.popup').toggle("slide");
                                return false;
                            } 
                            var query = {};
                            query.table = "storemanagers__cstore";
                            $scope.newStore.email = email;
                            $scope.newStore["storename"] = $scope.storedata.storename;
                            $scope.newStore["address"] = $scope.storedata.address;
                            $scope.newStore["address2"] = $scope.storedata.address2;
                            for (var i = 0; i < $scope.storedata.brands.length; i++) {
                                var selectedBrands = $scope.storedata.brands[i].name
                            }
                            $scope.newStore["brands"] = [selectedBrands];
                            $scope.newStore["contact"] = $scope.storedata.contact;
                            $scope.newStore["email"] = $scope.storedata.email;
                            if ($scope.storedata.selectedCountry) {
                                $scope.newStore["countryid"] = {"_id": $scope.storedata.selectedCountry._id, "name": $scope.storedata.selectedCountry.name};
                            }
                            if ($scope.storedata.selectedState) {
                                $scope.newStore["stateid"] = {"_id": $scope.storedata.selectedState._id, "name": $scope.storedata.selectedState.name};
                            }
                            if ($scope.storedata.selectedCity ) {
                                $scope.newStore["cityid"] = {"_id": $scope.storedata.selectedCity._id, "name": $scope.storedata.selectedCity.name};
                            }
                            $scope.newStore["loyalty_status"] = $scope.storedata.loyalty_status;
                            $scope.newStore["pump_brand"] = $scope.storedata.pump_brand;
                            $scope.newStore["pump_model"] = $scope.storedata.pump_model;
                             $scope.newStore["pos_type"] = ($scope.storedata.selectedPosType.name == "Others") ? $scope.storedata.otherPosType : $scope.storedata.selectedPosType.name;
                            $scope.newStore["pos_version"] = $scope.storedata.pos_version;
                            $scope.newStore["postalcode"] = $scope.storedata.postalcode;
                            $scope.newStore["reward_point"] = ($scope.storedata.selectedRewardType.name == "Others") ? $scope.storedata.otherRewardType : $scope.storedata.selectedRewardType.name;
                            $scope.newStore["shift"] = $scope.storedata.selectedShift.name;
                            $scope.newStore["manager"]["email"] = $scope.storedata.manager.email;
                            $scope.newStore["manager"]["contact"] = $scope.storedata.manager.contact;
                            $scope.newStore["manager"]["name"] = $scope.storedata.manager.name;


                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newStore["company_logo"];
								$scope.newStore["company_logo"] = null;
                                query.operations = [$scope.newStore];
                                $scope.saveFunction(query);
                            }
                            else {
                                var current_file = {};
                                current_file.name = $scope.oFile.name;
                                current_file.type = $scope.oFile.type;
                                current_file.contents = $scope.oFile.data;
                                current_file.ask = ASK;
                                current_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                    if (data.response) {
                                        $scope.newStore["company_logo"] = data.response;
                                        query.operations = [$scope.newStore];
                                        $scope.saveFunction(query);
                                    }
                                    else {
                                        $("#popupMessage").html("Some error while uploading image please try again");
                                        $('.popup').toggle("slide");
                                    }
                                }, function (callbackerror) {
                                    $("#popupMessage").html(callbackerror);
                                    $('.popup').toggle("slide");
                                });
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                
                                $("#popupMessage").html("Site Info Saved");
                                $('.popup').toggle("slide");
                                $scope.setPathforStore("site-info");
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
                    $scope.saveUser = function (storeid) {
                        $scope.newUser = {};
                        $scope.newUser["userid"] = {"emailid": $scope.storedata.username, "firstname": $scope.storedata.manager.name, "lastname": "", "password": $scope.storedata.password, "username": $scope.storedata.username};
                        $scope.newUser["roleid"] = {"_id": STOREMANAGER, "name": "store-manager"};
                        $scope.newUser["username"] = $scope.storedata.username;
                        $scope.newUser["storeid"] = {"_id": storeid, "storename": $scope.storedata.storename};
                        var userquery = {};
                        userquery.table = "user_profiles__cstore";
                        userquery.operations = [$scope.newUser];
                        $appService.save(userquery, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                if (!$scope.storedata["storeid"]) {
                                    $scope.clearStoreContent();
                                }
                                $("#popupMessage").html("Store manager saved");
                                $('.popup').toggle("slide");
                                window.location.href = "#!/store-managers"
                            } else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving user");
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


/**************************Setup***********************************/

cstore.directive('countryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCountries()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCountries()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + countries.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setCountryOrder(\'name\',\'asc\')"></div><div class="sortDown" ng-click="setCountryOrder(\'name\',\'desc\')"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="country in countries"><td><input type="checkbox" ng-model="country.deleteStatus" ng-show="country._id">' +
            '</td><td><span ng-hide="country.editStatus">{{country.name}}</span><input ng-show="country.editStatus" class="edit_input" type="text" ng-model="country.name"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="country.editStatus = true" ng-hide="country.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,country._id)" ng-show="country.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewCountry()" class="add_new"><a href>' +
            '+ Click Here To Add New Country</a></div></div><div class="loadingImage" ng-hide="!loadingCountryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewCountry = function () {
                        $scope.countries.push({ name: ''});
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.countries[$scope.countries.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllCountries(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteCountryArray = [];
                    $scope.deleteCountries = function () {
                        for (var i = 0; i < $scope.countries.length; i++) {
                            if ($scope.countries[i].deleteStatus) {
                                $scope.deleteCountryArray.push({"_id": $scope.countries[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "countries__cstore";
                        query.operations = angular.copy($scope.deleteCountryArray);
                        $scope.deleteCountryArray = [];
                        if (query.operations.length) {
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.countries.length; i++) {
                                        if ($scope.countries[i].deleteStatus) {
                                            $scope.countries.splice(i, 1);
											i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }else if(callBackData.code == 58 && callBackData.status == "error"){
									$("#popupMessage").html("This record is referred in products");
									$('.popup').toggle("slide");								
								}else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while deleting");
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
                            $("#popupMessage").html("Please select at least one country before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshCountryId) {
                        if (!$scope.countries[index]["oldstatus"]) {
                            $scope.countries.splice(index, 1);
                        }
                        else {
                            $scope.refreshCountries(index, refreshCountryId);
                        }
                    }

                    $scope.saveCountries = function () {
						var savedindexes = [];
						for (var j = $scope.countries.length-1; j >= 0; j--) {
							if(!$scope.countries[j]._id && !$scope.countries[j].name){		
								$scope.countries.splice(j, 1);
							}
						}
                        var countryList = $scope.countries.filter(function (el) {
							if(!el._id && el.name){							
								savedindexes.push($scope.countries.indexOf(el));
							}
                            return el.editStatus == true ;
                        });
                        for (var i = 0; i < countryList.length; i++) {
                            if (!countryList[i].name) {
                                $("#popupMessage").html("Please enter country name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (countryList && countryList.length > 0) {
                            var query = {};
                            query.table = "countries__cstore";
                            query.operations = countryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
									for (var j = 0; j < savedindexes.length; j++) {
										$scope.countries[savedindexes[j]]._id = callBackData.response.insert[j]._id;
									}
                                    for (var i = 0; i < $scope.countries.length; i++) {
                                        $scope.countries[i]["editStatus"] = false;
                                    }

                                }else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while saving");
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
                            $("#popupMessage").html("No Data Found For Saving");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);

cstore.directive('productCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveProductCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button"  ng-click="deleteProductCategories()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Category</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'name\',\'asc\')"></div><div class="sortDown" ng-click="setProductCatOrder(\'name\',\'desc\')"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'description\',\'asc\')"></div><div class="sortDown" ng-click="setProductCatOrder(\'description\',\'desc\')"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="productCategory in productCategories"><td><input type="checkbox" ng-model="productCategory.deleteStatus" ng-show="productCategory._id">' +
            '</td><td><span ng-hide="productCategory.editStatus">{{productCategory.name}}</span>' +
            '<input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.name"></td><td><span ng-hide="productCategory.editStatus">' +
            '{{productCategory.description}}</span><input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="productCategory.editStatus = true" ng-hide="productCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,productCategory._id)" ng-show="productCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewProductCategory()" class="add_new"><a href>' +
            '+ Click Here To Add New POP Category</a></div></div><div class="loadingImage" ng-hide="!loadingProductCategoryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewProductCategory = function () {
                        $scope.productCategories.push({ name: '', description: '' });
                        //for (var i = 0; i < $scope.productCategories.length; i++) {
                        $scope.productCategories[$scope.productCategories.length - 1]["editStatus"] = true;
                        //}

                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProductCategories(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.remove = function (index) {
                        if ($scope.productCategories.length - 1 == index) {
                            $scope.productCategories.splice(index, 1);
                        }
                        else {
                            $scope.productCategories[index]["editStatus"] = false;
                        }
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteProductCategoryArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteProductCategories = function () {
                        for (var i = 0; i < $scope.productCategories.length; i++) {
                            if ($scope.productCategories[i].deleteStatus) {
                                $scope.deleteProductCategoryArray.push({"_id": $scope.productCategories[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "product_categories__cstore";
                        query.operations = angular.copy($scope.deleteProductCategoryArray);
                        $scope.deleteProductCategoryArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.productCategories.length; i++) {
                                        if ($scope.productCategories[i].deleteStatus) {
                                            $scope.productCategories.splice(i, 1);
											i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }else if(callBackData.code == 58 && callBackData.status == "error"){
									$("#popupMessage").html("This record is referred in products");
									$('.popup').toggle("slide");								
								}else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while deleting");
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
                            $("#popupMessage").html("Please select at least one product category before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshProductCategoryId) {
                        if (!$scope.productCategories[index]["oldstatus"]) {
                            $scope.productCategories.splice(index, 1);
                        }
                        else {
                            $scope.refreshProductCategories(index, refreshProductCategoryId);
                        }
                    }
                    $scope.saveProductCategories = function () {
						var savedindexes = [];						
						for (var j = $scope.productCategories.length-1; j >= 0; j--) {
							if(!$scope.productCategories[j]._id && $scope.productCategories[j].name == "" && $scope.productCategories[j].description == ""){		
								$scope.productCategories.splice(j, 1);
							}
						}
                        var productCategoryList = $scope.productCategories.filter(function (el) {
							if(!el._id && (el.name || el.description)){							
								savedindexes.push($scope.productCategories.indexOf(el));
							}
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < productCategoryList.length; i++) {
                            if (!productCategoryList[i].name) {
                                $("#popupMessage").html("Please enter product category name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (productCategoryList && productCategoryList.length > 0) {
                            var query = {};
                            query.table = "product_categories__cstore";
                            query.operations = productCategoryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
									for (var j = 0; j < savedindexes.length; j++) {
										$scope.productCategories[savedindexes[j]]._id = callBackData.response.insert[j]._id;
									}
                                    for (var i = 0; i < $scope.productCategories.length; i++) {
                                        $scope.productCategories[i]["editStatus"] = false;
                                    }
                                }else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while saving");
									$('.popup').toggle("slide");
								}
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }, function (err) {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                            });
                        }else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);

cstore.directive('trainingCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveTrainingCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteTrainingCategories()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + trainingCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Training Category</th><th>Description</th><th></th>' +
            '</tr><tr ng-repeat="trainingCategory in trainingCategories"><td><input type="checkbox" ng-model="trainingCategory.deleteStatus">' +
            '</td><td><span ng-hide="trainingCategory.editStatus">{{trainingCategory.name}}</span>' +
            '<input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.name"></td><td>' +
            '<span ng-hide="trainingCategory.editStatus">{{trainingCategory.description}}</span>' +
            '<input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="trainingCategory.editStatus = true" ng-hide="trainingCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="trainingCategory.editStatus = false" ng-show="trainingCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewTrainingCategory()" class="add_new"><a href>' +
            '+ Click Here To Add New Training Category</a></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewTrainingCategory = function () {
                        $scope.trainingCategories.push({ name: '', description: '' });
                        for (var i = 0; i < $scope.trainingCategories.length; i++) {
                            $scope.trainingCategories[$scope.trainingCategories.length - 1]["editStatus"] = true;
                        }
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteTrainingCategoryArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteTrainingCategories = function () {
                        for (var i = 0; i < $scope.trainingCategories.length; i++) {
                            if ($scope.trainingCategories[i].deleteStatus) {
                                $scope.deleteTrainingCategoryArray.push({"_id": $scope.trainingCategories[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "training_categories__cstore";
                        query.operations = angular.copy($scope.deleteTrainingCategoryArray);
                        $scope.deleteTrainingCategoryArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                        if ($scope.trainingCategories[i].deleteStatus) {
                                            console.log("delete items" + i);
                                            $scope.trainingCategories.splice(i, 1);
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }
                                else {
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
                            $("#popupMessage").html("Please select at least one training category before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.saveTrainingCategories = function () {
                        $scope.addtrainingCategoryArray = [];
                        for (var i = 0; i < $scope.trainingCategories.length; i++) {
                            if ($scope.trainingCategories[i]._id) {
                                $scope.addtrainingCategoryArray.push({"name": $scope.trainingCategories[i].name, "description": $scope.trainingCategories[i].description, "_id": $scope.trainingCategories[i]._id})
                            }
                            else {
                                $scope.addtrainingCategoryArray.push({"name": $scope.trainingCategories[i].name, "description": $scope.trainingCategories[i].description})
                            }
                        }
                        var query = {};
                        query.table = "training_categories__cstore";
                        query.operations = angular.copy($scope.addtrainingCategoryArray);
                        $scope.addtrainingCategoryArray = [];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                    $scope.trainingCategories[i]["editStatus"] = false;
                                }
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

cstore.directive('countrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="state.countryid" ng-options="country.name for country in countryList"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('stateList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveStates()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteStates()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + states.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'name\',\'asc\')"></div><div class="sortDown" ng-click="setStateOrder(\'name\',\'desc\')"></div>	</span></th><th><span>Abbreviation</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'abbreviation\',\'asc\')"></div><div class="sortDown" ng-click="setStateOrder(\'abbreviation\',\'desc\')"></div></span></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'countryid.name\',\'asc\')"></div><div class="sortDown" ng-click="setStateOrder(\'countryid.name\',\'desc\')"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="state in states"><td><input type="checkbox" ng-model="state.deleteStatus" ng-show="state._id">' +
            '</td><td><span ng-hide="state.editStatus">{{state.name}}</span>' +
            '<input type="text" ng-show="state.editStatus" ng-model="state.name"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.abbreviation}}</span><input type="text" ng-show="state.editStatus" ng-model="state.abbreviation"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.countryid.name}}</span><country-select ng-show="state.editStatus"></country-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="state.editStatus=true;setState(state)" ng-hide="state.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,state._id)" ng-show="state.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewState()" class="add_new"><a href>' +
            '+ Click Here To Add New State</a></div></div><div class="loadingImage" ng-hide="!loadingStateData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewState = function () {
                        $scope.states.push({ name: '', countryid: '' });
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.states[$scope.states.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllStates(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteStateArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteStates = function () {
                        for (var i = 0; i < $scope.states.length; i++) {
                            if ($scope.states[i].deleteStatus) {
                                $scope.deleteStateArray.push({"_id": $scope.states[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "states__cstore";
                        query.operations = angular.copy($scope.deleteStateArray);
                        $scope.deleteStateArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.states.length; i++) {
                                        if ($scope.states[i].deleteStatus) {
                                            $scope.states.splice(i, 1);
											i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }else if(callBackData.code == 58 && callBackData.status == "error"){
									$("#popupMessage").html("This record is referred in products");
									$('.popup').toggle("slide");								
								}else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while deleting");
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
                            $("#popupMessage").html("Please select at least one state before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshStateId) {
                        if (!$scope.states[index]["oldstatus"]) {
                            $scope.states.splice(index, 1);
                        }
                        else {
                            $scope.refreshStates(index, refreshStateId);
                        }
                    }
                    $scope.saveStates = function () {
						var savedindexes = [];		
						for (var j = $scope.states.length-1; j >= 0; j--) {
							if(!$scope.states[j]._id && !$scope.states[j].name && !$scope.states[j].countryid && !$scope.states[j].abbreviation){		
								$scope.states.splice(j, 1);
							}
						}						
                        var stateList = $scope.states.filter(function (el) {
							if(!el._id && (el.name || el.countryid || el.abbreviation)){							
								savedindexes.push($scope.states.indexOf(el));
							}
                            return el.editStatus == true ;
                        });
                        for (var i = 0; i < stateList.length; i++) {
                            if (!stateList[i].name) {
                                $("#popupMessage").html("Please enter state name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!stateList[i].abbreviation) {
                                $("#popupMessage").html("Please enter abbreviation");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!stateList[i].countryid) {
                                $("#popupMessage").html("Please select country");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (stateList && stateList.length > 0) {
                            var query = {};
                            query.table = "states__cstore";
                            query.operations = stateList;
                            $scope.addStateArray = [];
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
									for (var j = 0; j < savedindexes.length; j++) {
										$scope.states[savedindexes[j]]._id = callBackData.response.insert[j]._id;
									}
                                    for (var i = 0; i < $scope.states.length; i++) {
                                        $scope.states[i]["editStatus"] = false;
                                    }
                                }else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while saving");
									$('.popup').toggle("slide");
								}
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }, function (err) {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                            });
                        }else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.setState = function (state) {
                        //$scope.states[state].editStatus = true;
                        //for (var i = 0; i < $scope.data.states.length; i++) {
                        //  if ($scope.data.states[i]._id == vendor.state._id) {
                        //    $scope.data.selectedState = $scope.data.states[i];
                        //  break;
                        // }
                        // }
                        for (var i = 0; i < $scope.countryList.length; i++) {
                            if ($scope.countryList[i]._id == state.countryid._id) {
                                state.countryid = $scope.countryList[i];
                                break;
                            }
                        }

                    }

                }
            }
        }
    }
}]);

cstore.directive('cityStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="city.stateid" ng-options="state.name for state in stateList"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {

                }
            }
        }
    }
}]);

cstore.directive('cityList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCities()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCities()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + cities.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>City</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'name\',\'asc\')"></div><div class="sortDown" ng-click="setCityOrder(\'name\',\'desc\')"></div>	</span></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'stateid.name\',\'asc\')"></div><div class="sortDown" ng-click="setCityOrder(\'stateid.name\',\'desc\')"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="city in cities"><td><input type="checkbox" ng-model="city.deleteStatus" ng-show="city._id">' +
            '</td><td><span ng-hide="city.editStatus">{{city.name}}</span>' +
            '<input type="text" ng-show="city.editStatus" ng-model="city.name"></td><td>' +
            '<span ng-hide="city.editStatus">{{city.stateid.name}}</span><city-state-select ng-show="city.editStatus"></city-state-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="city.editStatus=true;setCity(city)" ng-hide="city.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,city._id)" ng-show="city.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewCity()" class="add_new"><a href>' +
            '+ Click Here To Add New City</a></div></div><div class="loadingImage" ng-hide="!loadingCityData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewCity = function () {
                        $scope.cities.push({ name: '', stateid: '' });
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.cities[$scope.cities.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllCities(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteCityArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteCities = function () {
                        for (var i = 0; i < $scope.cities.length; i++) {
                            if ($scope.cities[i].deleteStatus) {
                                $scope.deleteCityArray.push({"_id": $scope.cities[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "cities__cstore";
                        query.operations = angular.copy($scope.deleteCityArray);
                        $scope.deleteCityArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.cities.length; i++) {
                                        if ($scope.cities[i].deleteStatus) {
                                            $scope.cities.splice(i, 1);
											i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }else if(callBackData.code == 58 && callBackData.status == "error"){
									$("#popupMessage").html("This record is referred in vendor");
									$('.popup').toggle("slide");								
								}else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while deleting");
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
                            $("#popupMessage").html("Please select at least one city before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshCityId) {
                        if (!$scope.cities[index]["oldstatus"]) {
                            $scope.cities.splice(index, 1);
                        }
                        else {
                            $scope.refreshCities(index, refreshCityId);
                        }
                    }
                    $scope.saveCities = function () {
						var savedindexes = [];
						for (var j = $scope.cities.length-1; j >= 0; j--) {
							if(!$scope.cities[j]._id && $scope.cities[j].name == "" && $scope.cities[j].stateid == ""){		
								$scope.cities.splice(j, 1);
							}
						}
                        var cityList = $scope.cities.filter(function (el) {
							if(!el._id && (el.name || el.stateid)){							
								savedindexes.push($scope.cities.indexOf(el));
							}
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < cityList.length; i++) {
                            if (!cityList[i].name) {
                                $("#popupMessage").html("Please enter city name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!cityList[i].stateid) {
                                $("#popupMessage").html("Please select state");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }

                        if (cityList && cityList.length > 0) {
                            var query = {};
                            query.table = "cities__cstore";
                            query.operations = cityList;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
									for (var j = 0; j < savedindexes.length; j++) {
										$scope.cities[savedindexes[j]]._id = callBackData.response.insert[j]._id;
									}
                                    for (var i = 0; i < $scope.cities.length; i++) {
                                        $scope.cities[i]["editStatus"] = false;
                                    }
                                }else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
									$("#popupMessage").html(JSON.parse(callBackData.responseText).response);
									$('.popup').toggle("slide");
								}
								else {
									$("#popupMessage").html("Some error occur while deleting");
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
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.setCity = function (city) {
                        //$scope.states[state].editStatus = true;
                        //for (var i = 0; i < $scope.data.states.length; i++) {
                        //  if ($scope.data.states[i]._id == vendor.state._id) {
                        //    $scope.data.selectedState = $scope.data.states[i];
                        //  break;
                        // }
                        // }
                        for (var i = 0; i < $scope.stateList.length; i++) {
                            if ($scope.stateList[i]._id == city.stateid._id) {
                                city.stateid = $scope.stateList[i];
                                break;
                            }
                        }

                    }

                }
            }
        }
    }
}]);

cstore.directive('userList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-user\')" type="button">Add</button>' +
            '</div><div class="delete_btn pull-left"><button ng-click="deleteUsers()"  type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + users.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess()"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            '<span>FirstName</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'userid.firstname\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'userid.firstname\',\'desc\')"></div>	</span></th><th><span>Email</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'username\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'username\',\'desc\')"></div>	</span></th><th><span>Role</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'roleid.name\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'roleid.name\',\'desc\')"></div>	</span></th><th><span>StoreName</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'storeid.storename\',\'asc\')"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'storeid.storename\',\'desc\')"></div></span></th>' +
            '</tr><tr ng-repeat="user in users"><td><input type="checkbox" ng-model="user.deleteStatus"></td><td>{{user.userid.firstname}}</td><td>{{user.username}}' +
            '</td><td>{{user.roleid.name}}</td><td>{{user.storeid.storename}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingVenderData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllUsers(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.deleteUserArray = [];
                    $scope.deleteUsers = function () {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if ($scope.users[i].deleteStatus) {
                                $scope.deleteUserArray.push({"_id": $scope.users[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = angular.copy($scope.deleteUserArray);
                        $scope.deleteUserArray = [];
                        if (query.operations.length) {
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.users.length; i++) {
                                        if ($scope.users[i].deleteStatus) {
                                            $scope.users.splice(i, 1);
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    console.log(callBackData);
                                    //alert(callBackData.response);
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
                            $("#popupMessage").html("please select at least one vendor before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                }
            }
        }
    }
}]);

cstore.directive('roleSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="userdata.selectedRole" ng-options="role.name for role in userdata.roles"></select>'
    }
}]);

cstore.directive('storeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'" class="brand" ng-model="userdata.selectedStore" ng-options="store.storename for store in userdata.stores"></select>'
    }
}]);

cstore.directive('addUser', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div class="table_1 pull-left"><div class="l_bar pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="margin_top">First Name</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="userdata.firstname"></td></tr>' +
            '<tr><td><div class="margin_top">Email</div></td></tr>' +
            '<tr><td><input type="email" placeholder="" ng-model="userdata.username"></td></tr>' +
            '<tr><td><div class="margin_top">Role</div></td></tr>' +
            '<tr><td><role-select></role-select></td></tr>' +
            '</tbody></table></div>' +
            '<div class="r_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="margin_top">Last Name</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="userdata.lastname"></td></tr>' +
            '<tr><td><div class="margin_top">Password</div></td></tr>' +
            '<tr><td><input type="password" placeholder="" ng-model="userdata.password"></td></tr>' +
            '<tr ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'"><td><div class="margin_top">Store Name</div></td></tr>' +
            '<tr ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'"><td><store-select></store-select></td></tr>' +
            '</tbody></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveUser()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforUser(\'manage-users\')"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>',

        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.newUser = {};
                    $scope.setPathforUser = function (path) {
                        $scope.clearUserContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.saveUser = function () {
                        $scope.newUser = {};
                        if ($scope.userdata.firstname == "" || $scope.userdata.firstname == undefined) {
                            $("#popupMessage").html("Please enter your firstname");
							$('.popup').toggle("slide");
                            return false;
                        }
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $scope.userdata.username;
                        if (regEmail.test(email) == false) {                            
							$("#popupMessage").html("please enter a valid email");
							$('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.userdata.selectedRole) {                            
							$("#popupMessage").html("please select role first");
							$('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.userdata.password) {                            
							$("#popupMessage").html("please enter password");
							$('.popup').toggle("slide");
                            return false;
                        }

                        $scope.newUser["userid"] = {"emailid": $scope.userdata.username, "firstname": $scope.userdata.firstname, "lastname": $scope.userdata.lastname, "password": $scope.userdata.password, "username": $scope.userdata.username};
                        if ($scope.userdata.selectedRole) {
                            $scope.newUser["roleid"] = {"_id": $scope.userdata.selectedRole._id, "name": $scope.userdata.selectedRole.name};
                        }
                        $scope.newUser["username"] = $scope.userdata.username;
                        if ($scope.userdata.selectedStore) {
                            $scope.newUser["storeid"] = {"_id": $scope.userdata.selectedStore._id, "storename": $scope.userdata.selectedStore.storename};
                        }
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = [$scope.newUser];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("User Saved");
                                $('.popup').toggle("slide");
                                $scope.clearUserContent();
                                window.location.href = "#!/manage-users";
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
                                    window.location.href="/";
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

/****************************Promotions************************/
cstore.directive('promotionList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-promotion\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deletePromotion()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + promotions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Promo Title</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'promo_title\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'promo_title\',\'desc\')"></div>	</span></th>' +
            '<th>Offer Title<span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_title\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_title.name\',\'desc\')"></div>	</span></th><th><span>Offer Type</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_type\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_type\',\'desc\')"></div>	</span></th><th><span>Item Signage</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'item_signage\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'item_signage\',\'desc\')"></div></span></th><th><span>Start Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'start_date\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'start_date\',\'desc\')"></div></span></th><th><span>End Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'end_date\',\'asc\')"></div><div class="sortDown" ng-click="setPromotionOrder(\'end_date\',\'desc\')"></div></span></th><th></th></tr><tr ng-repeat="promotion in promotions"><td>' +
            '<input type="checkbox" ng-model="promotion.deleteStatus"></td><td>{{promotion.promo_title}}</td><td>{{promotion.offer_title}}</td><td>' +
            '{{promotion.offer_type}}</td><td>{{promotion.item_signage}}</td><td>{{promotion.start_date}}</td><td>{{promotion.end_date}}</td>' +
            '<td><a class="edit_btn" ng-click="setPromotionState(promotion)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingPromotionData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPromotions(1, 10, $scope.searchby.value, $scope.searchContent);
                    }
                    $scope.deletePromotionArray = [];
                    $scope.deletePromotion = function () {
                        for (var i = 0; i < $scope.promotions.length; i++) {
                            if ($scope.promotions[i].deleteStatus) {
                                $scope.deletePromotionArray.push({"_id": $scope.promotions[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "promotions__cstore";
                        query.operations = angular.copy($scope.deletePromotionArray);
                        $scope.deletePromotionArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.promotions.length; i++) {
                                    if ($scope.promotions[i].deleteStatus) {
                                        $scope.promotions.splice(i, 1);
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            }
                            else {
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
                    $scope.setPromotionState = function (promotion) {
                        $scope.promotiondata["promo_title"] = promotion.promo_titile ? promotion.promo_title : "";
                        $scope.promotiondata["end_date"] = promotion.end_date ? promotion.end_date : "";
                        $scope.promotiondata["start_date"] = promotion.start_date ? promotion.start_date : "";
                        $scope.promotiondata["offer_description"] = promotion.offer_description ? promotion.offer_description : "";
                        $scope.promotiondata["offer_title"] = promotion.offer_title ? promotion.offer_title : "";
                        $scope.promotiondata["promo_description"] = promotion.promo_description ? promotion.promo_description : "";
                        $scope.promotiondata["reward_value"] = promotion.reward_value ? promotion.reward_value : "";
                        $scope.promotiondata["sponsor"] = promotion.sponsor ? promotion.sponsor : "";
                        $scope.promotiondata["threshold"] = promotion.threshold ? promotion.threshold : "";
                        $scope.showFile(promotion.image, false);
                        if (promotion.offer_type && $scope.promotiondata.offerTypes) {
                            for (var j = 0; j < $scope.promotiondata.offerTypes.length; j++) {
                                if ($scope.promotiondata.offerTypes[j].name == promotion.offer_type) {
                                    $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.item_signage && $scope.promotiondata.itemSignage) {
                            for (var j = 0; j < $scope.promotiondata.itemSignage.length; j++) {
                                if ($scope.promotiondata.itemSignage[j].name == promotion.item_signage) {
                                    $scope.promotiondata.selectedItemSignage = $scope.promotiondata.itemSignage[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.upc/plu/dept && $scope.promotiondata.upc) {
                            for (var j = 0; j < $scope.promotiondata.upc.length; j++) {
                                if ($scope.promotiondata.upc[j].name == promotion.upc/plu/dept) {
                                    $scope.promotiondata.selectedUpc = $scope.promotiondata.upc[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-promotion?q=" + promotion._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('itemSignageSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedItemSignage" ng-options="itemSignage.name for itemSignage in promotiondata.itemSignage"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    console.log(JSON.stringify($scope.promotiondata.itemSignage));
                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('offerTypeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedOfferType" ng-options="offerType.name for offerType in promotiondata.offerTypes"></select>',
        compile: function () {
            return{
                pre: function ($scope) {

                }, post: function () {
                }
            }
        }
    }
}]);

cstore.directive('upcSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="promotiondata.selectedUpc" ng-options="upc.name for upc in promotiondata.upc"></select>',
        compile: function () {
            return{
                pre: function () {

                }, post: function ($scope) {
                }
            }
        }
    }
}]);


//changed
cstore.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});

cstore.directive('addPromotion', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template:'<div><div class="table_1 pull-left"><div class="l_bar pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="margin_top">Promo Title</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.promo_title"></td></tr>' +
            '<tr><td><div class="margin_top">Promo Description</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.promo_description"></td></tr>' +
            '<tr><td><div class="margin_top">Reward Value</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.reward_value"></td></tr>' +
            '<tr><td><div class="margin_top">Start Date</div></td></tr>' +
            '<tr><td><input type="text" ng-model="promotiondata.start_date" jqdatepicker /></td></tr>' +
            '<tr><td><div class="margin_top">End Date</div></td></tr>' +
            '<tr><td><input type="text" ng-model="promotiondata.end_date" jqdatepicker /></td></tr>' +
            '<tr><td><div class="margin_top">Item Signage</div></td></tr>' +
            '<tr><td><item-signage-select></item-signage-select></td></tr>' +
            '<tr><td class="product_image"><app-file-upload></app-file-upload></td></tr>' +
            '</tbody></table></div>' +
            '<div class="r_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="margin_top">Offer Title</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.offer_title"></td></tr>' +
            '<tr><td><div class="margin_top">Offer Description</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.offer_description"></td></tr>' +
            '<tr><td><div class="margin_top">Offer Type</div></td></tr>' +
            '<tr><td><offer-type-select></offer-type-select></td></tr>' +
            '<tr><td><div class="margin_top">UPC/PLU/DEPT</div></td></tr>' +
            '<tr><td><upc-select></upc-select></td></tr>' +
            '<tr><td><div class="margin_top">Threshold</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.threshold"></td></tr>' +
            '<tr><td><div class="margin_top">Sponsor</div></td></tr>' +
            '<tr><td><input type="text" placeholder="" ng-model="promotiondata.sponsor"></td></tr>' +
            '</tbody></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="savePromotion()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforPromotion(\'promotions\')"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingAddPromotionData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    //$scope.promotiondata["editImage"] = false;
                    $scope.loadingAddPromotionData = true;
                    $scope.newPromotion = {};
                    $scope.setPathforPromotion = function (path) {
                        $scope.clearPromotionContent();
                        window.location.href = "#!/" + path;
                    }

                },
                post: function ($scope) {
                    $scope.loadingAddPromotionData = false;
                    $scope.savePromotion = function () {
                    //console.log($scope.promotiondata.promo_description);

                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.promotiondata.promo_title) {
                                $("#popupMessage").html("Please enter promo title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.promo_description) {
                                $("#popupMessage").html("Please enter promo description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_title) {
                                $("#popupMessage").html("Please enter offer title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_description) {
                                $("#popupMessage").html("Please enter offer description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            //if (!$scope.promotiondata.start_date) {
                            //    $("#popupMessage").html("Please select start date");
                            //    $('.popup').toggle("slide");
                            //    return false;
                           // }
                           // if (!$scope.promotiondata.end_date) {
                           //     $("#popupMessage").html("Please select end_date");
                           //     $('.popup').toggle("slide");
                           //     return false;
                           // }
                            //if (!$('#uploadfile').val()) {
                            //    $("#popupMessage").html("Please upload file");
                            //    $('.popup').toggle("slide");
                            //    return false;
                            //}
                            var query = {};
                            query.table = "promotions__cstore";

                            if ($scope.promotiondata["promotionid"]) {
                                $scope.newPromotion["_id"] = $scope.promotiondata["promotionid"];
                            }
                            $scope.newPromotion["end_date"] = $scope.promotiondata.end_date;
                            $scope.newPromotion["item_signage"] = $scope.promotiondata.selectedItemSignage.name;
                            $scope.newPromotion["offer_description"] = $scope.promotiondata.offer_description;
                            $scope.newPromotion["offer_title"] = $scope.promotiondata.offer_title;
                            $scope.newPromotion["offer_type"] = $scope.promotiondata.selectedOfferType.name;
                            $scope.newPromotion["promo_description"] = $scope.promotiondata.promo_description;
                            $scope.newPromotion["promo_title"] = $scope.promotiondata.promo_title;
                            $scope.newPromotion["reward_value"] = $scope.promotiondata.reward_value;
                            $scope.newPromotion["sponsor"] = $scope.promotiondata.sponsor;
                            $scope.newPromotion["start_date"] = $scope.promotiondata.start_date;
                            $scope.newPromotion["threshold"] = $scope.promotiondata.threshold;
                            $scope.newPromotion["end_date"] = $scope.promotiondata.end_date;
                            $scope.newPromotion["upc/plu/dept"] = $scope.promotiondata.selectedUpc.name;
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newPromotion["image"];
                                query.operations = [$scope.newPromotion];
                                $scope.saveFunction(query);
                            }
                            else {
                                var current_file = {};
                                current_file.name = $scope.oFile.name;
                                current_file.type = $scope.oFile.type;
                                current_file.contents = $scope.oFile.data;
                                current_file.ask = ASK;
                                current_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                    if (data.response) {
                                        $scope.newPromotion["image"] = data.response;
                                        query.operations = [$scope.newPromotion];
                                        $scope.saveFunction(query);
                                    }
                                    else {

                                        $("#popupMessage").html("some error while uploading image please try again");
                                        $('.popup').toggle("slide");

                                    }
                                }, function (callbackerror) {
                                    $("#popupMessage").html(callbackerror);
                                    $('.popup').toggle("slide");
                                });
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.saveFunction = function (query) {
                        //console.log(query);
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforPromotion("promotions");
                            } else if(callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving promotion");
                                $('.popup').toggle("slide");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (err) {
                            console.log(err.stack);

                        });
                    }
                }
            }
        }
    }
}]);
/*bharat chnage */
cstore.directive('googlePlaces', function(){
    return {
        restrict:'E',
        replace:true,
        // transclude:true,
        scope: {location:'='},
        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
        link: function($scope, elm, attrs){
            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                $scope.location=place["address_components"][0].long_name;
//
// $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                $scope.$apply();
            });
        }
    }
});
/*bharat change end here*/
