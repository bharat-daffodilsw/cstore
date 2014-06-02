cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div><div class="header"><div class="cm pull-left">' +
            '</div><div class="dropdown pull-left"><div class="logo1 pull-left"><a href="/"><img src="/images/main_logo.png"/></a>' +

            '</div><store-header ng-show="displayData.cart"></store-header><div ng-show="displayData.options" class="logo pull-right"><a href="/"><img ng-show="displayData.companyLogo" ng-src="{{currentUser.data.companyLogoUrl}}"/><img ng-hide="displayData.companyLogo" src="images/main_logo02.png"></a></div><div class="username pull-right"><div ng-show="displayData.loggedIn" class="user pull-left">{{currentUser.data.firstname}}</div>' +
            '<div ng-show="displayData.loggedIn" id="my_profile" class="pull-left"><img src="images/logout.png"><div class="pull-left" id="sign_out" ">' +
            '<ul><li class="active"><a href = "/#!/profile">Profile</a></li><li><a ng-click="logOut()">' +
            'Sign Out</a></li></ul></div></div></div></div>' +
            '<admin-menu ng-show="displayData.menu"></admin-menu><store-menu ng-show="displayData.options"></store-menu></div>' +
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
        template: '<div class="admin_menu pull-left">' +
            '<ul><li ng-click="clearContent()"><a href ="#!/vendors" active-link="active">Vendor</a></li><li id="programs" ng-click="clearProgramContent()"><a href="#!/programs" active-link="active">Program</a></li><li ng-click="clearStoreContent()"><a href="#!/site-info" active-link="active">Site Info</a></li>' +
            '<li id="pops" ng-click="clearProductContent()"><a href="#!/pops" active-link="active">POP</a></li>' +
            '<li id="promotions" ng-click="clearPromotionContent()"><a active-link="active" href="#!/promotions" >Promotion</a></li>' +
            '<li id="training-sessions" ng-click="clearTrainingSessionContent()"><a active-link="active" href="#!/trainings">Training</a></li><li ng-click="clearSurveyContent()">' +
            '<a href="#!/surveys" active-link="active">Surveys</a></li><li id="orders" ng-click="clearOrderContent()"><a href="#!/orders"active-link="active">Orders</a></li><li id="setup"><a href active-link="active">Setup</a><div class="setup pull-left"><ul><li id="users"><a href="#!/manage-users" ng-click="clearUserContent()" active-link="active">Manage Users</a></li>' +
            '<li id="product-codes"><a href="#!/product-codes" active-link="active">Product Codes</a></li>' +
            '<li id="training-categories"><a href="#!/training-categories" active-link="active">Training Category</a>' +
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

cstore.directive('storeMenu', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<add-to-cart-pop-up></add-to-cart-pop-up><div class="admin_menu pull-left">' +
            '<ul><li><a href ="#!/all-pops" active-link="active">POP</a></li><li><a href="#!/all-promos" active-link="active">Promos</a></li>' +
            '<li><a href="#!/all-trainings" active-link="active">Training</a></li>' +
            '<li><a active-link="active" href="#!/all-surveys" >Surveys</a></li>' +
            '<li ng-click="clearOrderContent()"><a active-link="active" href="#!/orders">Orders</a></li></ul></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPathForStoreManager = function (path) {
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
        template: '<div><div class="search_addcart pull-left"><div class="search pull-left"><form ng-submit="search()">' +
            '<input type="text" placeholder="Search" name="search_theme_form"id="edit-search-theme-form-1" ng-model="searchContent" size="15"  title="Enter the terms you wish to search for." class="search">' +
            '<input type="submit" style="display:none"></form>' +
            '<div class="search_sign pull-left" ng-click="search()"><a href><img src="images/Search.png"></a></div></div><div class="location pull-left">' +
            ' <span class="where_i">I am in</span><span class="loction_img pull-left"><img src="images/location.png">' +
            '</span><span class="country">{{currentLoc.data.selectedLoc}}</span></div><div class="add_cart pull-right"ng-click="setPathForCart(\'shopping-cart\')"><div class="addcart_link pull-left"><a href>' +
            '<img src="images/finalcart.png"></a></div><div class="add_count pull-left">({{cartProducts.length}})</div></div></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPathForCart = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        var hash = window.location.hash;
                        if ($scope.searchContent != "" && $scope.searchContent != "undefined") {
                            if (hash.indexOf("?q=") > 0) {
                                if (hash.indexOf("search") > 0) {
                                    var searchIndex = hash.indexOf("search");
                                    var substr = hash.substring(0, searchIndex - 1);
                                    window.location.href = substr + "&search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                                else {
                                    window.location.href = hash + "&search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                            }
                            else if (hash.indexOf("?popid=") > 0) {

                                window.location.href = "#!/all-pops?search=" + $scope.searchContent;
                            }//changes made by anuradha 3004
                            else if (hash.indexOf("?promoid=") > 0) {

                                window.location.href = "#!/all-promos?search=" + $scope.searchContent;
                            }
                            else if (hash.indexOf("?sessionid=") > 0) {
                                window.location.href = "#!/all-trainings?search=" + $scope.searchContent;
                                //$scope.searchContent="";
                            }
                            else if (hash.indexOf("?surveyid=") > 0) {
                                window.location.href = "#!/all-surveys?search=" + $scope.searchContent;
                            }
                            else if (hash.indexOf("#!/") >= 0 || hash == "#!/") {
                                if (hash.indexOf("search") > 0) {
                                    var searchIndex = hash.indexOf("search");
                                    var substr = hash.substring(0, searchIndex - 1);
                                    window.location.href = "/" + substr + "?search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                                else {
                                    window.location.href = hash + "?search=" + $scope.searchContent;
                                    $scope.searchContent = "";
                                }
                            }
                            else {
                                console.log(hash);
                            }
                        }
                        else {
                            if (hash.indexOf("search") > 0) {
                                var searchIndex = hash.indexOf("search");
                                var substr = hash.substring(0, searchIndex - 1);
                                window.location.href = substr;
                            }
                            else {
                                window.location.href = hash;
                            }
                        }
                    }
                },
                post: function ($scope) {

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
            ' Copyright &copy; </div><div class="footer_3 pull-left" ng-click="setFooterPath(\'terms-conditions\')"> Terms & Condition </div>' +
            '<div class="footer_3 pull-left" ng-click="setFooterPath(\'contact-us\')"> Contact us </div>' +
            '<div class="footer_4 pull-left"><img src="images/logo.jpg"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setFooterPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                }
            }
        }
    }
}]);

cstore.directive('addToCartPopUp', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="popup2" style="display:none;">' +
            '<div class="popup-manage">' +
            '<h2 class="h2-popup">Attention</h2>' +
            '<form method="" class="ng-pristine ng-valid">' +
            '<p class="alert-p" id="popupMessage2"></p>' +
            '<p class="role-change card-ok"><input type="button" value="OK" class="alert-ok" ng-click="okCartPopup(product,quantity)"></p>' +
            '<p class="role-change card-ok"><input type="button" value="Cancel" class="alert-ok" ng-click="cancelCartPopup()"></p>' +
            '</form>' +
            '</div>' +
            '</div>' ,
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.cancelCartPopup = function () {
                        $('.popup2').toggle("slide");
                    }
                    $scope.okCartPopup = function () {
                        console.log($scope.addCart.pop);
                        console.log($scope.addCart.quantity);
                        $('.popup2').toggle("slide");
                        $scope.addToCart($scope.addCart.pop,$scope.addCart.quantity);
                    }
                }
            }
        }
    }
}]);

cstore.directive('popularProducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left" ng-show="popularProducts.length > 0"><div class="pop_products">Popular Signage <a href="#!/all-pops">( View all )</a>' +
            '</div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in popularProducts"><div class="products_img">' +


            '<a href="#!/pop?popid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +

            '</a></div><div class="name"><a href="#!/pop?popid={{product._id}}">{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href=>{{product.cost.amount | currency}}</a></div>' +

            '<div class="add_to_cart" ng-click="showCartPopup(product,null)"><a href>Add To Cart</a></div></div></div><div class="loadingImage" ng-hide="!loadingPopularProductData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {

                }
            }
        }
    }
}]);
//changes by anu 2804
cstore.directive('recentPromotions', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div ng-show="recentPromotions.length > 0"><div class="category pull-left"><div class="pop_products">Recent Promotions <a href="#!/all-promos">( View all )</a>' +
            '</div><div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="promotion in recentPromotions"><div class="products_img">' +
            '<a href="#!/promo?promoid={{promotion._id}}"><img title="{{promotion.promo_title}}" ng-src="{{promotion.imageUrl}}"/>' +
            '</a></div><div class="name"><a href="#!/promo?promoid={{promotion._id}}">{{promotion.promo_title}}</a></div>' +
            '</div></div><div class="loadingImage" ng-hide="!loadingRecentPromotionData"><img src="images/loading.gif"></div></div>'
    }
}]);
/***************/

cstore.directive('assignedTrainingSessions', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div ng-show="assignedTrainingSessions.length > 0"><div class="category pull-left"><div class="pop_products">Training Sessions<a href="#!/all-trainings">( View all )</a>' +
            '</div><div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="assignedTrainingSession in assignedTrainingSessions">' +
            '<div class="name"><a href="#!/training-session?sessionid={{assignedTrainingSession._id}}">{{assignedTrainingSession.title}}</a></div><div class="short_product_details">{{assignedTrainingSession.description}}</div>' +
            '</div></div><div class="loadingImage" ng-hide="!loadingAssignedTrainingSessionData"><img src="images/loading.gif"></div></div>'
    }
}]);
/************/
cstore.directive('allproducts', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left">' +
            '<div class="pop_products">All POP </div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in allproducts" ng-show="allproducts.length">' +
            '<div class="products_img"><a href="#!/pop?popid={{product._id}}"><img ng-src="{{product.imageUrl}}"></a></div><div class="name"><a href="#!/pop?popid={{product._id}}">' +
            '{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price">' +
            '<a href>{{product.cost.amount | currency}}</a></div><div class="add_to_cart"ng-click="showCartPopup(product,null)"><a href>Add To Cart</a></div></div>' +
            '</div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!allProductData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialProductData(0);
                }
            }
        }
    }
}]);

cstore.directive('productDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products"><a href="/">Home</a> > <a href="#!/all-pops">POP Store</a> ><a href="#!/pop-category?q={{product[0].product_category._id}}"> {{product[0].product_category.name}}</a> > {{product[0].name}}</div><div class="img_product pull-left">' +
            '<img ng-src="{{product[0].imageUrl}}" /></div>' +
            '<div class="details_product pull-left"><div class="short_details">{{product[0].short_description}}</div><div class="Qty"><div class="quantity_border">Quantity : ' +
            '<select class="qty_select_1" ng-model="qty" ng-options="quantity for quantity in shoppingCartData.quantity">' +
            '</select></div><div class="final_price">Price : <b>{{product[0].cost.amount | currency}}</b></div><div class="add_to_btn pull-left">' +
            '<a href ng-click="showCartPopup(product[0],qty)">ADD TO CART</a></div></div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{product[0].description}}</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingProductDetailData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.qty = $scope.shoppingCartData.quantity[0];
                }
            }
        }
    }
}]);

cstore.directive('vendor', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-vendor\')" type="button">Add</button>' +
            '</div><div class="delete_btn pull-left"><button ng-click="deleteVendors()"  type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + vendors.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            '<span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'firstname\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'firstname\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Address</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'address\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'address\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>City</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'city.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'city.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>State</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'state.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'state.name\',\'desc\',searchby.value,search.searchContent)"></div></span>	</th><th><span>Email</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'email\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>' +
            '<span>Program</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Contact No.</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'contact\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setOrder(\'contact\',\'desc\',searchby.value,search.searchContent)"></div></span>	</th><th></th>' +
            '</tr><tr ng-repeat="vendor in vendors"><td><input type="checkbox" ng-model="vendor.deleteStatus"></td><td>{{vendor.firstname}} {{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td><td>{{vendor.city.name}}</td><td>{{vendor.state.name}}</td><td>{{vendor.email}}</td><td>{{vendor.programid.name}}</td><td>{{vendor.contact}}</td><td style="cursor: pointer">' +
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
                        $scope.getAllVendors(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteUserArray = [];
                    $scope.deleteVendors = function () {
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
                                            $scope.vendors.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                                $scope.data.selectedVendorCategory = "";
                                if ($scope.data.vendorCategories[j].name == vendor.category) {
                                    $scope.data.selectedVendorCategory = $scope.data.vendorCategories[j];
                                    break;
                                }
                            }
                            if (!$scope.data.selectedVendorCategory) {
                                $scope.data.selectedVendorCategory = $scope.data.vendorCategories[$scope.data.vendorCategories.length - 1];
                                $scope.data.otherCategory = vendor.category;
                            }
                        }
                        if (vendor.country) {
                            vendor.state = (vendor.state) ? {"_id": vendor.state._id} : {"_id": false};
                            vendor.city = (vendor.city) ? {"_id": vendor.city._id} : {"_id": false};
                            $scope.getEditCountries(vendor.country._id, vendor.state._id, vendor.city._id, $scope.data);
                        }
                        if (vendor.programid) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == vendor.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
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
        template: '<select class="select_city"  ng-change="getEditCities(data,false)" ng-model="data.selectedState" ng-options="state.name for state in data.states"></select>',
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
        template: '<select class="select_city"  ng-change="getEditStates(data,false,false)" ng-model="data.selectedCountry" ng-options="country.name for country in data.countries"></select>',
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
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">First Name*</div></td>' +
            '<td><div class="margin_top">Last Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="data.firstname"></td>' +
            '<td><input type="text" placeholder=""ng-model="data.lastname"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="email" ng-model="data.email"></td>' +
            '<td class="half_td"><program-select></program-select></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="data.address"> </textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address 2</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="data.address2"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><vendor-country-select></vendor-country-select></td>' +
            '<td class="half_td"><state-select></state-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td>' +
            '<td class="half_td"><div class="margin_top">Category*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><city-select></city-select></td>' +
            '<td class="half_td"><vendor-category-select></vendor-category-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Postal Code*</div></td>' +
            '<td class="half_td"><div class="margin_top">Contact No.*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text"  placeholder="" ng-model="data.postalCode"></td>' +
            '<td class="half_td"><input maxlength="10" type="text" ng-model="data.contact" placeholder=""></td>' +
            '</tr>' +
            '</table></div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button ng-click="saveVendor()" type="button">Save</button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button ng-click="setPathforVender(\'vendors\')" type="button">Close</button>' +
            '</div>' +
            '</div></td>' +
            '</tr>' +
            '</table></div>' +
            '<div class="loadingImage" ng-hide="!loadingAddVenderData"><img src="images/loading.gif"></div>' +
            '</div>',

        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddVenderData = true;
                    //evening changes
                    $scope.disabled = false;
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
                        $scope.disabled = true;
                        $scope.newVendor = {};
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var email = $scope.data.email;
                        if (!$scope.data.firstname) {
                            $("#popupMessage").html("Please enter firstname");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.lastname) {
                            $("#popupMessage").html("Please enter lastname");
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
                        if (!$scope.data.selectedState) {
                            $("#popupMessage").html("Please select state first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.selectedCity) {
                            $("#popupMessage").html("Please select city first");
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

                        if (!$scope.data.postalCode || !regNumberOnly.test($scope.data.postalCode)) {
                            $("#popupMessage").html("Please enter correct postal code");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.data.contact || !regNumberOnly.test($scope.data.contact)) {
                            $("#popupMessage").html("Please enter correct contact");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if ($scope.data["userid"]) {
                            $scope.newVendor["_id"] = $scope.data["userid"];
                        }
                        $scope.loadingAddVenderData = true;
                        $scope.newVendor.email = email;
                        $scope.newVendor["firstname"] = $scope.data.firstname;
                        $scope.newVendor["lastname"] = $scope.data.lastname;
                        $scope.newVendor["address"] = $scope.data.address;
                        $scope.newVendor["address2"] = $scope.data.address2;

                        $scope.newVendor["category"] = ($scope.data.selectedVendorCategory.name == "Others") ? $scope.data.otherCategory : $scope.data.selectedVendorCategory.name;
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
                        $scope.newVendor["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = [$scope.newVendor];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            $scope.loadingAddVenderData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.disabled = false;
                                $scope.setPathforVender('vendors');
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
            '<div class="price"><a href>{{product.cost.amount | currency}}</a></div><div class="add_to_cart" ng-click="showCartPopup(product,null)"><a href>' +
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
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProduct()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + products.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Name</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>POP Category<span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'product_category.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'product_category.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Program<span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Price</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'cost\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setProductOrder(\'cost\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Sold Count</span><span class="sortWrap"><div class="sortUp" ng-click="setProductOrder(\'soldcount\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductOrder(\'soldcount\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th></th></tr><tr ng-repeat="product in products"><td>' +
            '<input type="checkbox" ng-model="product.deleteStatus"></td><td>{{product.name}}</td><td>{{product.product_category.name}}</td><td>{{product.programid.name}}</td><td>' +
            '{{product.cost.amount | currency}}</td><td>{{product.soldcount}}</td>' +
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
                        $scope.getAllProducts(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                        $scope.products.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setProductState = function (product) {
                        $scope.productdata["name"] = product.name ? product.name : "";
                        $scope.productdata["cost"] = product.cost ? product.cost : "";
                        $scope.productdata["description"] = product.description ? product.description : "";
                        $scope.productdata["short_description"] = product.short_description ? product.short_description : "";
                        //$scope.productdata["image"] = product.image;
                        if (product.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(product.image, false);
                        //changed 28/04

                        if (product.product_category._id) {
                            for (var j = 0; j < $scope.productdata.productCategories.length; j++) {
                                if ($scope.productdata.productCategories[j]._id == product.product_category._id) {
                                    $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[j];
                                    break;
                                }
                            }
                        }
                        if (product.programid) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == product.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
                        }
                        window.location.href = "#!edit-pop?q=" + product._id;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
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
        template: '<select class="brand" ng-model="productdata.selectedProductCategory" ng-options="productCategory.name for productCategory in productdata.productCategories"></select>'
    }
}]);

cstore.directive('programSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="productdata.selectedProgram" ng-options="program.name for program in productdata.programs"></select>'
    }
}]);

cstore.directive('addProduct', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">POP Categroy*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="productdata.name"></td>' +
            '<td class="half_td"><product-category-select></product-category-select></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Detailed Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="name_input"><textarea type="text" placeholder="" ng-model="productdata.description"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Short Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="name_input"><textarea type="text" placeholder="" ng-model="productdata.short_description"></textarea></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Price*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">$ <input style="width: 91%;" type="text" placeholder="" ng-model="productdata.cost.amount"></td>' +
            '<td class="product_image half_td"><program-select></program-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">POP Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveProduct()"><a href>Save</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforProduct(\'pops\')"><a href>Close</a></button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div class="loadingImage" ng-hide="!loadingAddProductData"><img src="images/loading.gif"></div>' +
            '</div>',
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
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        var regDecimalNumberOnly = /^[+]?\d[0-9\.-]*$/
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.productdata.name) {
                                $("#popupMessage").html("Please enter pop name");
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
                            if (!$scope.productdata.cost || !$scope.productdata.cost.amount || !regDecimalNumberOnly.test($scope.productdata.cost.amount)) {
                                $("#popupMessage").html("Please enter valid price");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingStatus = true;
                            var query = {};
                            query.table = "products__cstore";

                            if ($scope.productdata["productid"]) {
                                $scope.newProduct["_id"] = $scope.productdata["productid"];
                            }
                            $scope.newProduct["name"] = $scope.productdata.name;
                            $scope.newProduct["description"] = $scope.productdata.description;
                            $scope.newProduct["short_description"] = $scope.productdata.short_description;
                            //$scope.newProduct["vendor"] = {"firstname":$scope.productdata.selectedVendor.firstname, "_id":$scope.productdata.selectedVendor._id};
                            $scope.newProduct["product_category"] = {"name": $scope.productdata.selectedProductCategory.name, "_id": $scope.productdata.selectedProductCategory._id};
                            $scope.newProduct["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                            $scope.newProduct["cost"] = {"amount": $scope.productdata.cost.amount, "type": {"currency": "usd"}};
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newProduct["image"];
                                query.operations = [$scope.newProduct];
                                $scope.saveFunction(query);
                            }
                            else {
                                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($scope.oFile.name)) {
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
                                else {
                                    $("#popupMessage").html("Please Upload Image File only");
                                    $('.popup').toggle("slide");
                                }
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    };

                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforProduct("pops");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving product");
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

cstore.directive('appMultiFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
        scope: false,
        template: "<div class='app-float-left'>" +
            "<input  onchange='angular.element(this).scope().uploadFileChange()' class='app-float-left' type='file' id='uploadMultiImgfile'/>" +
            '<span ng-show="uploadingimage" style="float:right; margin-top: -25px;"><img src="images/loading.gif"></span>' +
            "</div>",
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.albumArr = {};
                    $scope.albumArr.uploadedimg = [];
                },
                post: function ($scope, iElement) {
                    $scope.uploadFileChange = function () {
                        $scope.$apply(function () {
                            $scope.oFReader = new FileReader();
                            if (document.getElementById('uploadMultiImgfile').files.length === 0) {
                                return;
                            }
                            $scope.oFile = document.getElementById('uploadMultiImgfile').files[0];
                            $scope.oFReader.onload = $scope.loadImgFile;
                            $scope.oFReader.readAsDataURL($scope.oFile);
                        });
                    }
                    $scope.removeImgFile = function (index) {
                        $scope.trainingdata.uploadedimages.splice(index, 1);
                        $scope.albumArr.uploadedimg.splice(index, 1);
                        if ($scope.trainingdata.uploadedimages.length == 0) {
                            $scope.imgFilenotexist = true;
                        }
                        $scope.imgFileLimitExceed = false;
                        $("#uploadMultiImgfile").val("");
                    };

                    $scope.showMultiImgFile = function (file, index) {
                        if (!$scope.trainingdata.uploadedimages[index]) {
                            $scope.trainingdata.uploadedimages[index] = {};
                        }
                        if (!$scope.trainingdata.uploadedimages) {
                            $scope.trainingdata.uploadedimages = [];
                        }
                        $scope.trainingdata.uploadedimages[index].filename = file[0].name;
                        $scope.trainingdata.uploadedimages[index].fileurl = BAAS_SERVER + "/file/download?filekey=" + file[0].key + "&ask=" + ASK + "&osk=" + OSK;
                        $scope.trainingdata.uploadedimages[index].image = file;
                        $scope.trainingdata.uploadedimages[index].default = true;
                        $scope.albumArr.uploadedimg[index] = file[0];
                        $scope.imgFilenotexist = false;
                        $scope.uploadingimage = false;
                        $("#uploadMultiImgfile").val("");
                        //  $scope.row[$scope.colmetadata.expression] = file;
                        if (index == 10)
                            $scope.imgFileLimitExceed = true;
                    };
                    if ($scope.trainingdata.editImages && $scope.trainingdata.editImages.length > 0) {
                        for (var k = 0; k < $scope.trainingdata.editImages.length; k++) {
                            $scope.showMultiImgFile([$scope.trainingdata.editImages[k]], k);
                        }
                    } else {
                        $scope.imgFilenotexist = true;
                    }

                    $scope.loadImgFile = function (evt) {
                        if ((/\.(doc|docx|xls|xlsx|pdf|ppt|pptx)$/i).test($scope.oFile.name)) {
                            var current_file = {};
                            $scope.uploadingimage = true;
                            current_file.name = $scope.oFile.name;
                            current_file.type = $scope.oFile.type;
                            current_file.contents = evt.target.result;
                            current_file.ask = ASK;
                            current_file.osk = OSK;
                            $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                if (data.response && data.response.length > 0) {
                                    $scope.showMultiImgFile(data.response, $scope.trainingdata.uploadedimages.length);
                                }
                            });
                        } else {
                            $("#popupMessage").html("You can upload doc,ppt,xls and pdf file only");
                            $('.popup').toggle("slide");
                        }
                    };

                    /* iElement.bind('change', function () {
                     $scope.$apply(function () {
                     $scope.oFReader = new FileReader();
                     if (document.getElementById('uploadMultiImgfile').files.length === 0) {
                     return;
                     }
                     $scope.oFile = document.getElementById('uploadMultiImgfile').files[0];
                     $scope.oFReader.onload = $scope.loadImgFile;
                     $scope.oFReader.readAsDataURL($scope.oFile);
                     });
                     });*/
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
                pre: function ($scope) {
                    //$scope.oFile.fileExist=false;
                },
                post: function ($scope, iElement) {
                    $scope.removeFile = function () {
                        delete $scope.row[$scope.colmetadata.expression];
                        $("#uploadfile").val("");
                        $scope.readonlyrow.filenotexist = true;
                        $scope.oFile.fileExist = false;
                    };
                    if ($scope.row[$scope.colmetadata.expression]) {
                        $scope.showFile($scope.row[$scope.colmetadata.expression], false);
                        //changed 2804
                        //$scope.showFile($scope.row[$scope.colmetadata.expression], true);

                    } else if (!$scope.readonlyrow.fileurl) {
                        $scope.readonlyrow.filenotexist = true;
                    }
                    $scope.loadFile = function (evt) {
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test($scope.oFile.name)) {
                            $scope.file = {};
                            $scope.file.name = $scope.oFile.name;
                            $scope.file.result = evt.target.result;
                            $scope.oFile['data'] = evt.target.result;
                            $scope.showUploadedFile($scope.file);
                        }
                        else {
                            $("#popupMessage").html("You can upload image file only");
                            $('.popup').toggle("slide");
                        }
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
                            $scope.oFile.fileExist = true;
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
        template: '<div class="add_delete pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'add-site-info\')"><a href="">Add</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="deleteStoreManagers()"><a href>Delete</a></button>' +
            '</div>' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()">' +
            '<input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div>' +
            '<input type="submit" style="display:none;"></form>' +
            '</div>' +
            '<div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" >' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a>' +
            '</div>' +
            '<div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + storeManagers.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)">' +
            '<a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left site_info">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<th></th>' +
            '<th><span>Site Id</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'siteid\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'siteid\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Site Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'storename\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Program</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Manager Name</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Manager Shift<span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'shift\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'shift\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Site Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'contact\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'contact\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Manager Phone</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.contact\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.contact\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'email\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Manager Email</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'manager.email\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'manager.email\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Address</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'address\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'address\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Country</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'countryid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'countryid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>State</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'stateid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'stateid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>City</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'cityid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'cityid.name\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Postal Code</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'postalcode\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'postalcode\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>POS Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_type\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_type\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>POS Version</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pos_version\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pos_version\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Loyalty Status</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'loyalty_status\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'loyalty_status\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Reward Type</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'reward_point\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'reward_point\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'brands\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'brands\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>' +
            '<th><span>Pump Brand</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_brand\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_brand\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th><span>Pump Model</span>' +
            '<span class="sortWrap"><div class="sortUp" ng-click="setStoreOrder(\'pump_model\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreOrder(\'pump_model\',\'desc\',searchby.value,search.searchContent)"></div>' +
            '</span></th>'+
            '<th></th>' +
            '</tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input type="checkbox"ng-model="storeManager.deleteStatus"></td><td>{{storeManager.siteid}}</td><td>{{storeManager.storename}}</td><td>{{storeManager.programid.name}}</td><td>{{storeManager.manager.name}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.contact}}</td>' +
            '<td>{{storeManager.manager.contact}}</td><td>{{storeManager.email}}</td><td>{{storeManager.manager.email}}</td><td>{{storeManager.address}}</td><td>{{storeManager.countryid.name}}</td>' +
            '<td>{{storeManager.stateid.name}}</td><td>{{storeManager.cityid.name}}</td><td>{{storeManager.postalcode}}</td><td>{{storeManager.pos_type}}</td><td>{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td>'+
            '<td>{{storeManager.brands}}</td><td>{{storeManager.pump_brand}}</td><td>{{storeManager.pump_model}}</td>' +
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
                        $scope.getAllStoreManagers(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                        $scope.storeManagers.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setStoreState = function (store) {
                        //$scope.storedata.pos_version.name = store.pos_version;
                        $scope.storedata["address"] = store.address ? store.address : "";
                        $scope.storedata["address2"] = store.address2 ? store.address2 : "";
                        $scope.storedata["pump_brand"] = store.pump_brand ? store.pump_brand : "";
                        $scope.storedata["pump_model"] = store.pump_model ? store.pump_model : "";
                        /*if (store.brands && store.brands.length > 0) {
                         //                            for(var i=0; i < store.brands.length;i++){
                         //                                $scope.storedata.brands[i] = {};
                         //                                $scope.storedata.brands[i] = store.brands[i];
                         //                            }
                         for (var i = 0; i < $scope.brands.length; i++) {
                         for (var j = 0; j < store.brands.length; j++) {
                         if (angular.equals($scope.brands[i].name, store.brands[j])) {
                         if (!$scope.storedata.brands)
                         $scope.storedata.brands = [];
                         $scope.storedata.brands.push($scope.brands[i]);
                         }
                         }
                         }
                         }
                         else {
                         $scope.storedata["brands"] = [];
                         }   */
                        $scope.storedata["contact"] = store.contact ? store.contact : "";
                        //$scope.storedata["loyalty_status"] = store.loyalty_status ? store.loyalty_status : "";
                        //$scope.storedata["pos_type"] = store.pos_type ? store.pos_type : "" ;
                        $scope.storedata["email"] = store.email ? store.email : "";
                        $scope.storedata["pos_version"] = store.pos_version ? store.pos_version : "";
                        $scope.storedata["postalcode"] = store.postalcode ? store.postalcode : "";
                        //$scope.storedata["reward_point"] = store.reward_point ? store.reward_point : "" ;
                        //$scope.storedata["shift"] = store.shift ? store.shift : "" ;
                        $scope.storedata["storename"] = store.storename ? store.storename : "";
                        //$scope.storedata["username"] = store.username ? store.username : "";
                        $scope.storedata["siteid"] = store.siteid ? store.siteid : "";
                        if (store.company_logo) {
                            $scope.oFile.fileExist = true;
                        }
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
                                $scope.storedata.selectedPosType = "";
                                if ($scope.storedata.posTypes[j].name == store.pos_type) {
                                    $scope.storedata.selectedPosType = $scope.storedata.posTypes[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedPosType) {
                                $scope.storedata.selectedPosType = $scope.storedata.posTypes[$scope.storedata.posTypes.length - 1];
                                $scope.storedata.otherPosType = store.pos_type;
                            }
                        }
                        if (store.reward_point && $scope.storedata.rewardTypes) {
                            for (var j = 0; j < $scope.storedata.rewardTypes.length; j++) {
                                $scope.storedata.selectedRewardType = "";
                                if ($scope.storedata.rewardTypes[j].name == store.reward_point) {
                                    $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedRewardType) {
                                $scope.storedata.selectedRewardType = $scope.storedata.rewardTypes[$scope.storedata.rewardTypes.length - 1];
                                $scope.storedata.otherRewardType = store.reward_point;
                            }
                        }
                        if (store.brands && $scope.storedata.brands) {
                            for (var j = 0; j < $scope.storedata.brands.length; j++) {
                                $scope.storedata.selectedBrand = "";
                                if ($scope.storedata.brands[j].name == store.brands) {
                                    $scope.storedata.selectedBrand = $scope.storedata.brands[j];
                                    break;
                                }
                            }
                            if (!$scope.storedata.selectedBrand) {
                                $scope.storedata.selectedBrand = $scope.storedata.brands[$scope.storedata.brands.length - 1];
                                $scope.storedata.otherBrand = store.brands;
                            }
                        }
                        if (store.shift && $scope.storedata.shifts) {
                            for (var j = 0; j < $scope.storedata.shifts.length; j++) {
                                if ($scope.storedata.shifts[j].name == store.shift) {
                                    $scope.storedata.selectedShift = $scope.storedata.shifts[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedShift = "";
                                }
                            }
                        }
                        if (store.loyalty_status && $scope.storedata.loyalty_status) {
                            for (var j = 0; j < $scope.storedata.loyalty_status.length; j++) {
                                if ($scope.storedata.loyalty_status[j].name == store.loyalty_status) {
                                    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[j];
                                    break;
                                }
                                else {
                                    $scope.storedata.selectedLoyaltyStatus = $scope.storedata.loyalty_status[0];
                                }
                            }
                        }
                        if (store.countryid) {
                            store.stateid = (store.stateid) ? {"_id": store.stateid._id} : {"_id": false};
                            store.cityid = (store.cityid) ? {"_id": store.cityid._id} : {"_id": false};
                            $scope.getEditCountries(store.countryid._id, store.stateid._id, store.cityid._id, $scope.storedata);
                        }
                        if (store.programid) {
                            for (var j = 0; j < $scope.productdata.programs.length; j++) {
                                if ($scope.productdata.programs[j]._id == store.programid._id) {
                                    $scope.productdata.selectedProgram = $scope.productdata.programs[j];
                                    break;
                                }
                            }
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
        template: '<select class="select_city"  ng-model="storedata.selectedCity" ' +
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
        template: '<select class="select_city" ng-change="getCitiesNew(storedata,null)" ng-model="storedata.selectedState" ng-options="state.name for state in storedata.states"></select>',
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
        template: '<select class="select_city"  ng-change="getStatesNew(storedata,null)" ng-model="storedata.selectedCountry" ng-options="country.name for country in storedata.countries"></select>',
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
        template: '<select class="brand" ng-model="storedata.selectedBrand" ng-options="brand.name for brand in storedata.brands"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.selectedBrand.name == \'Others\'" ng-model="storedata.otherBrand" class="other_input pull-left" >',
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

cstore.directive('loyaltyStatus', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="storedata.selectedLoyaltyStatus" ng-options="loyalty_status.name for loyalty_status in storedata.loyalty_status"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
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
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Site Id*</div></td>' +
            '<td class="half_td"><div class="margin_top">Site Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.siteid"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.storename"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Manager Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Shift</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.manager.name"></td>' +
            '<td class="half_td"><shift></shift></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Site Phone*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Phone*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" maxlength="10" placeholder="" ng-model="storedata.contact"></td>' +
            '<td class="half_td"><input type="text" maxlength="10" placeholder=""ng-model="storedata.manager.contact" ></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '<td class="half_td"><div class="margin_top">Manager Email*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.email"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.manager.email"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Address*</div></td>' +
            '<td class="half_td"><div class="margin_top">Address 2</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.address"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.address2"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Country*</div></td>' +
            '<td class="half_td"><div class="margin_top">State*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-country-select></store-country-select></td>' +
            '<td class="half_td"><store-state-select></store-state-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">City*</div></td>' +
            '<td class="half_td"><div class="margin_top">Postal Code*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><store-city-select></store-city-select></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.postalcode"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">POS Type*</div></td>' +
            '<td class="half_td"><div class="margin_top">POS Version</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><pos-type></pos-type></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="storedata.pos_version"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Loyalty Status*</div></td>' +
            '<td class="half_td"><div class="margin_top">Reward Type*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><loyalty-status></loyalty-status></td>' +
            '<td class="half_td"><reward-type></reward-type></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Pump Brand</div></td>' +
            '<td class="half_td"><div class="margin_top">Pump Model </div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.pump_brand"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="storedata.pump_model"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Brand*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><brand></brand></td>' +
            '<td class="half_td"><program-select></program-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveStore()"><a href="">Save</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforStore(\'site-info\')"><a href="">Close</a></button>' +
            '</div>' +
            '</div></td>' +
            '</tr>' +
            '</table></div>' +
            '</div><div class="loadingImage" ng-hide="!loadingAddStoreData"><img src="images/loading.gif"></div></div>',
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
                            if (!$scope.storedata.siteid) {
                                $("#popupMessage").html("Please enter site id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.storename) {
                                $("#popupMessage").html("Please enter site name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.manager.name) {
                                $("#popupMessage").html("Please enter manager name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.contact || !regNumberOnly.test($scope.storedata.contact)) {
                                $("#popupMessage").html("Please enter valid site phone number");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.manager.contact || !regNumberOnly.test($scope.storedata.manager.contact)) {
                                $("#popupMessage").html("Please enter valid manager contact");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!email || regEmail.test(email) == false) {
                                $("#popupMessage").html("Please enter a valid email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!managerEmail || regEmail.test(managerEmail) == false) {
                                $("#popupMessage").html("Please enter a valid manager email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.address) {
                                $("#popupMessage").html("Please enter address");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCountry) {
                                $("#popupMessage").html("Please select country");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedState) {
                                $("#popupMessage").html("Please select state");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedCity) {
                                $("#popupMessage").html("Please select city");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.postalcode || !regNumberOnly.test($scope.storedata.postalcode)) {
                                $("#popupMessage").html("Please enter correct postal code");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedPosType || ($scope.storedata.selectedPosType.name == "Others" && !$scope.storedata.otherPosType)) {
                                $("#popupMessage").html("Please choose pos type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedLoyaltyStatus) {
                                $("#popupMessage").html("Please select loyalty status");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedRewardType || ($scope.storedata.selectedRewardType.name == "Others" && !$scope.storedata.otherRewardType)) {
                                $("#popupMessage").html("Please choose reward type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.storedata.selectedBrand || ($scope.storedata.selectedBrand.name == "Others" && !$scope.storedata.otherBrand)) {
                                $("#popupMessage").html("Please choose brand");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingStatus = true;
                            if ($scope.storedata["storeid"]) {
                                $scope.newStore["_id"] = $scope.storedata["storeid"];
                            }
                            var query = {};
                            query.table = "storemanagers__cstore";
                            $scope.newStore.email = email;
                            $scope.newStore["storename"] = $scope.storedata.storename;
                            $scope.newStore["address"] = $scope.storedata.address;
                            $scope.newStore["address2"] = $scope.storedata.address2;
                            //changes made 02/05
                            //for (var i = 0; i < $scope.storedata.brands.length; i++) {
                            //    var selectedBrands = $scope.storedata.brands[i].name
                            //}
                            //$scope.newStore["brands"] = [selectedBrands];
                            $scope.newStore["brands"] = ($scope.storedata.selectedBrand.name == "Others") ? $scope.storedata.otherBrand : $scope.storedata.selectedBrand.name;
                            $scope.newStore["siteid"] = $scope.storedata.siteid;
                            $scope.newStore["contact"] = $scope.storedata.contact;
                            $scope.newStore["email"] = $scope.storedata.email;
                            if ($scope.storedata.selectedCountry) {
                                $scope.newStore["countryid"] = {"_id": $scope.storedata.selectedCountry._id, "name": $scope.storedata.selectedCountry.name};
                            }
                            if ($scope.storedata.selectedState) {
                                $scope.newStore["stateid"] = {"_id": $scope.storedata.selectedState._id, "name": $scope.storedata.selectedState.name};
                            }
                            if ($scope.storedata.selectedCity) {
                                $scope.newStore["cityid"] = {"_id": $scope.storedata.selectedCity._id, "name": $scope.storedata.selectedCity.name};
                            }
                            $scope.newStore["programid"] = {"name": $scope.productdata.selectedProgram.name, "_id": $scope.productdata.selectedProgram._id};
                            $scope.newStore["loyalty_status"] = $scope.storedata.selectedLoyaltyStatus.name;
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
                            query.operations = [$scope.newStore];
                            $scope.saveFunction(query);
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingStatus = false;
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
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + countries.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setCountryOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCountryOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="country in countries"><td><input type="checkbox" ng-model="country.deleteStatus" ng-show="country._id">' +
            '</td><td><span ng-hide="country.editStatus">{{country.name}}</span><input ng-show="country.editStatus" class="edit_input" type="text" ng-model="country.name"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="country.editStatus = true" ng-hide="country.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,country._id)" ng-show="country.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href  ng-click="addNewCountry()">' +
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
                        $scope.getAllCountries(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        for (var j = $scope.countries.length - 1; j >= 0; j--) {
                            if (!$scope.countries[j]._id && !$scope.countries[j].name) {
                                $scope.countries.splice(j, 1);
                            }
                        }
                        var countryList = $scope.countries.filter(function (el) {
                            if (!el._id && el.name) {
                                savedindexes.push($scope.countries.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < countryList.length; i++) {
                            if (!countryList[i].name) {
                                $("#popupMessage").html("Please enter country name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (countryList && countryList.length > 0) {
                            $scope.loadingCountryData = true;
                            var query = {};
                            query.table = "countries__cstore";
                            query.operations = countryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                $scope.loadingCountryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.countries[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.countries.length; i++) {
                                        $scope.countries[i]["editStatus"] = false;
                                    }

                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>POP Category</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCatOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCatOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCatOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="productCategory in productCategories"><td><input type="checkbox" ng-model="productCategory.deleteStatus" ng-show="productCategory._id">' +
            '</td><td><span ng-hide="productCategory.editStatus">{{productCategory.name}}</span>' +
            '<input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.name"></td><td><span ng-hide="productCategory.editStatus">' +
            '{{productCategory.description}}</span><input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="productCategory.editStatus = true" ng-hide="productCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,productCategory._id)" ng-show="productCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href  ng-click="addNewProductCategory()">' +
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
                        $scope.getAllProductCategories(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        for (var j = $scope.productCategories.length - 1; j >= 0; j--) {
                            if (!$scope.productCategories[j]._id && $scope.productCategories[j].name == "" && $scope.productCategories[j].description == "") {
                                $scope.productCategories.splice(j, 1);
                            }
                        }
                        var productCategoryList = $scope.productCategories.filter(function (el) {
                            if (!el._id && (el.name || el.description)) {
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
                            $scope.loadingProductCategoryData = true;
                            var query = {};
                            query.table = "product_categories__cstore";
                            query.operations = productCategoryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                $scope.loadingProductCategoryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.productCategories[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.productCategories.length; i++) {
                                        $scope.productCategories[i]["editStatus"] = false;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        } else {
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
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button"  ng-click="deleteTrainingCategories()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + trainingCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Training Category</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingCatOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingCatOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingCatOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingCatOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="trainingCategory in trainingCategories"><td><input type="checkbox" ng-model="trainingCategory.deleteStatus" ng-show="trainingCategory._id">' +
            '</td><td><span ng-hide="trainingCategory.editStatus">{{trainingCategory.name}}</span>' +
            '<input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.name"></td><td><span ng-hide="trainingCategory.editStatus">' +
            '{{trainingCategory.description}}</span><input type="text" ng-show="trainingCategory.editStatus" ng-model="trainingCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="trainingCategory.editStatus = true" ng-hide="trainingCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,trainingCategory._id)" ng-show="trainingCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewTrainingCategory()">' +
            '+ Click Here To Add New Training Category</a></div></div><div class="loadingImage" ng-hide="!loadingTrainingCategoryData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewTrainingCategory = function () {
                        $scope.trainingCategories.push({ name: '', description: '' });
                        //for (var i = 0; i < $scope.trainingCategories.length; i++) {
                        $scope.trainingCategories[$scope.trainingCategories.length - 1]["editStatus"] = true;
                        //}

                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTrainingCategories(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.remove = function (index) {
                        if ($scope.trainingCategories.length - 1 == index) {
                            $scope.trainingCategories.splice(index, 1);
                        }
                        else {
                            $scope.trainingCategories[index]["editStatus"] = false;
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
                                            $scope.trainingCategories.splice(i, 1);
                                            i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                            $("#popupMessage").html("Please select at least one training category before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    $scope.remove = function (index, refreshTrainingCategoryId) {
                        if (!$scope.trainingCategories[index]["oldstatus"]) {
                            $scope.trainingCategories.splice(index, 1);
                        }
                        else {
                            $scope.refreshTrainingCategories(index, refreshTrainingCategoryId);
                        }
                    }
                    $scope.saveTrainingCategories = function () {
                        var savedindexes = [];
                        for (var j = $scope.trainingCategories.length - 1; j >= 0; j--) {
                            if (!$scope.trainingCategories[j]._id && $scope.trainingCategories[j].name == "" && $scope.trainingCategories[j].description == "") {
                                $scope.trainingCategories.splice(j, 1);
                            }
                        }
                        var trainingCategoryList = $scope.trainingCategories.filter(function (el) {
                            if (!el._id && (el.name || el.description)) {
                                savedindexes.push($scope.trainingCategories.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < trainingCategoryList.length; i++) {
                            if (!trainingCategoryList[i].name) {
                                $("#popupMessage").html("Please enter training category name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (trainingCategoryList && trainingCategoryList.length > 0) {
                            $scope.loadingTrainingCategoryData = true;
                            var query = {};
                            query.table = "training_categories__cstore";
                            query.operations = trainingCategoryList;
                            $appService.save(query, ASK, OSK, null, function (callBackData) {
                                $scope.loadingTrainingCategoryData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.trainingCategories[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                        $scope.trainingCategories[i]["editStatus"] = false;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        } else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
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
                pre: function ($scope) {
                    if (!$scope.state.countryid) {
                        for (var i = 0; i < $scope.countryList.length; i++) {
                            if ($scope.countryList[i]._id == "531d3e9b8826fc304706a460") {
                                $scope.state.countryid = $scope.countryList[i];
                                break;
                            }
                        }
                    }
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
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent" title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + states.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Abbreviation</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'abbreviation\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'abbreviation\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th><span>Country</span><span class="sortWrap"><div class="sortUp" ng-click="setStateOrder(\'countryid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setStateOrder(\'countryid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="state in states"><td><input type="checkbox" ng-model="state.deleteStatus" ng-show="state._id">' +
            '</td><td><span ng-hide="state.editStatus">{{state.name}}</span>' +
            '<input type="text" ng-show="state.editStatus" ng-model="state.name"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.abbreviation}}</span><input type="text" ng-show="state.editStatus" ng-model="state.abbreviation"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.countryid.name}}</span><country-select ng-show="state.editStatus"></country-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="state.editStatus=true;setState(state)" ng-hide="state.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,state._id)" ng-show="state.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewState()">' +
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
                        $scope.getAllStates(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        for (var j = $scope.states.length - 1; j >= 0; j--) {
                            if (!$scope.states[j]._id && !$scope.states[j].name && !$scope.states[j].countryid && !$scope.states[j].abbreviation) {
                                $scope.states.splice(j, 1);
                            }
                        }
                        var stateList = $scope.states.filter(function (el) {
                            if (!el._id && (el.name || el.countryid || el.abbreviation)) {
                                savedindexes.push($scope.states.indexOf(el));
                            }
                            return el.editStatus == true;
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
                            $scope.loadingStateData = true;
                            var query = {};
                            query.table = "states__cstore";
                            query.operations = stateList;
                            $scope.addStateArray = [];
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingStateData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.states[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.states.length; i++) {
                                        $scope.states[i]["editStatus"] = false;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        } else {
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
                pre: function ($scope) {
                    if (!$scope.city.stateid) {
                        $scope.city.stateid = $scope.stateList[0];
                    }
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
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + cities.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>City</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCityOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>State</span><span class="sortWrap"><div class="sortUp" ng-click="setCityOrder(\'stateid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setCityOrder(\'stateid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="city in cities"><td><input type="checkbox" ng-model="city.deleteStatus" ng-show="city._id">' +
            '</td><td><span ng-hide="city.editStatus">{{city.name}}</span>' +
            '<input type="text" ng-show="city.editStatus" ng-model="city.name"></td><td>' +
            '<span ng-hide="city.editStatus">{{city.stateid.name}}</span><city-state-select ng-show="city.editStatus"></city-state-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="city.editStatus=true;setCity(city)" ng-hide="city.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,city._id)" ng-show="city.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewCity()">' +
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
                        $scope.getAllCities(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        for (var j = $scope.cities.length - 1; j >= 0; j--) {
                            if (!$scope.cities[j]._id && $scope.cities[j].name == "" && $scope.cities[j].stateid == "") {
                                $scope.cities.splice(j, 1);
                            }
                        }
                        var cityList = $scope.cities.filter(function (el) {
                            if (!el._id && (el.name || el.stateid)) {
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
                            $scope.loadingCityData = true;
                            var query = {};
                            query.table = "cities__cstore";
                            query.operations = cityList;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingCityData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.cities[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.cities.length; i++) {
                                        $scope.cities[i]["editStatus"] = false;
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + users.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            '<span>Name</span> <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'userid.firstname\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'userid.firstname\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Email</span>' +
            '<span class="sortWrap"> <div class="sortUp" ng-click="setOrder(\'username\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'username\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Role</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'roleid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'roleid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Site Name</span>' +
            ' <span class="sortWrap"><div class="sortUp" ng-click="setOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent)"></div></span></th>' +
            '</tr><tr ng-repeat="user in users"><td><input type="checkbox" ng-model="user.deleteStatus"></td><td>{{user.userid.firstname}}</td><td>{{user.username}}' +
            '</td><td>{{user.roleid.name}}</td><td>{{user.storeid.storename}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingUserData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllUsers(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
                                            i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in another table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
        template: '<select ng-if="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'" class="brand" ng-model="userdata.selectedStore" ng-options="store.storename for store in userdata.stores"></select>'
    }
}]);

cstore.directive('addUser', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">First Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">Last Name</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="userdata.firstname"></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="userdata.lastname"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Email*</div></td>' +
            '<td class="half_td"><div class="margin_top">Password*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="email" placeholder="" ng-model="userdata.username"></td>' +
            '<td class="half_td"><input type="password" placeholder="" ng-model="userdata.password"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Role*</div></td>' +
            '<td class="half_td" ng-show="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'"><div class="margin_top">Site Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><role-select></role-select></td>' +
            '<td class="half_td" ng-if="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'"><store-select></store-select></td>' +
            '</tr>' +
            '</tbody></table></div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveUser()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforUser(\'manage-users\')"><a href="">Close</a></button>' +
            '</div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div></td></tr>' +
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
                        if (!$scope.userdata.password) {
                            $("#popupMessage").html("please enter password");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        if (!$scope.userdata.selectedRole) {
                            $("#popupMessage").html("please select role first");
                            $('.popup').toggle("slide");
                            return false;
                        }
                        $scope.loadingStatus = true;
                        $scope.newUser["userid"] = {"emailid": $scope.userdata.username, "firstname": $scope.userdata.firstname, "lastname": $scope.userdata.lastname, "password": $scope.userdata.password, "username": $scope.userdata.username};
                        if ($scope.userdata.selectedRole) {
                            $scope.newUser["roleid"] = {"_id": $scope.userdata.selectedRole._id, "name": $scope.userdata.selectedRole.name};
                        }
                        $scope.newUser["username"] = $scope.userdata.username;
                        if ($scope.userdata.selectedStore && $scope.userdata.selectedRole._id == '531d4aa0bd1515ea1a9bbaf6') {
                            $scope.newUser["storeid"] = {"_id": $scope.userdata.selectedStore._id, "storename": $scope.userdata.selectedStore.storename};
                        }
                        var query = {};
                        query.table = "user_profiles__cstore";
                        query.operations = [$scope.newUser];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("User Saved");
                                $('.popup').toggle("slide");
                                $scope.clearUserContent();
                                window.location.href = "#!/manage-users";
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                                return;
                            }
                            else {
                                $("#popupMessage").html(callBackData.response);
                                $('.popup').toggle("slide");

                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (jqxhr, err) {
                            if (jqxhr.responseText && JSON.parse(jqxhr.responseText).response) {
                                $("#popupMessage").html(JSON.parse(jqxhr.responseText).response);
                                $('.popup').toggle("slide");
                                return;
                            }
                            else {
                                $("#popupMessage").html(err);
                                $('.popup').toggle("slide");
                                return;
                            }

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
                                    window.location.href = "/";
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
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deletePromotion()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<span class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></><input type="submit" style="display:none;"></form></div>' +
            '<div class="pull-left order_date_filter"><form ng-submit="filterByDate()"><input id="filter_date" type="text" placeholder="Date" ng-model="promotiondata.filter_date" jqdatepicker /><span class="search_sign_3 pull-left"><a ng-click="filterByDate()"><img style="cursor: pointer width:30px;" src="images/Search.png"></a></span><input type="submit" style="display:none;"></form></div>'+
            '<div ng-click="getMore(searchby.value,search.searchContent,promotiondata.filter_date)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + promotions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,promotiondata.filter_date)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Promo Title</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'promo_title\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'promo_title\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th>' +
            '<th>Offer Title<span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_title\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_title\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th><th><span>Offer Type</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'offer_type\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'offer_type\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div>	</span></th><th><span>Item Signage</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'item_signage\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'item_signage\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th><span>Start Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'start_date\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'start_date\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th><span>End Date</span><span class="sortWrap"><div class="sortUp" ng-click="setPromotionOrder(\'end_date\',\'asc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div><div class="sortDown" ng-click="setPromotionOrder(\'end_date\',\'desc\',searchby.value,search.searchContent,promotiondata.filter_date)"></div></span></th><th></th></tr><tr ng-repeat="promotion in promotions"><td>' +
            '<input type="checkbox" ng-model="promotion.deleteStatus"></td><td>{{promotion.promo_title}}</td><td>{{promotion.offer_title}}</td><td>' +
            '{{promotion.offer_type}}</td><td>{{promotion.item_signage}}</td><td>{{promotion.start_date}}</td><td>{{promotion.end_date}}</td>' +
            '<td><a class="edit_btn" ng-click="setAssignedPromo(promotion._id)" href>Assign</a><a class="edit_btn" ng-click="setPromotionState(promotion)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingPromotionData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPromotions(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }

                    $scope.filterByDate = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPromotions(1, 10, null, null,$scope.promotiondata.filter_date);
                    }
                    $scope.setAssignedPromo = function (promotionid) {
                        window.location.href = "#!/assign-promo?id=" + promotionid;
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
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setPromotionState = function (promotion) {
                        var endArray = promotion["end_date"].split(" ");
                        var endMinArray = endArray[1].split(":");
                        $scope.promotiondata.end_date = endArray[0];
                        var startArray = promotion["start_date"].split(" ");
                        var startMinArray = startArray[1].split(":");
                        $scope.promotiondata.start_date = startArray[0];
                        if (promotion.end_date && $scope.promotiondata.hours) {
                            for (var j = 0; j < $scope.promotiondata.hours.length; j++) {
                                if ($scope.promotiondata.hours[j] == endMinArray[0]) {
                                    $scope.promotiondata.selectedEndHour = $scope.promotiondata.hours[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.start_date && $scope.promotiondata.hours) {
                            for (var j = 0; j < $scope.promotiondata.hours.length; j++) {
                                if ($scope.promotiondata.hours[j] == startMinArray[0]) {
                                    $scope.promotiondata.selectedStartHour = $scope.promotiondata.hours[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.end_date && $scope.promotiondata.minutes) {
                            for (var j = 0; j < $scope.promotiondata.minutes.length; j++) {
                                if ($scope.promotiondata.minutes[j] == endMinArray[1]) {
                                    $scope.promotiondata.selectedEndMinute = $scope.promotiondata.minutes[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.start_date && $scope.promotiondata.minutes) {
                            for (var j = 0; j < $scope.promotiondata.minutes.length; j++) {
                                if ($scope.promotiondata.minutes[j] == startMinArray[1]) {
                                    $scope.promotiondata.selectedStartMinute = $scope.promotiondata.minutes[j];
                                    break;
                                }
                            }
                        }
                        $scope.promotiondata["promo_title"] = promotion.promo_title ? promotion.promo_title : "";
                        //$scope.promotiondata.end_date = promotion.end_date ? promotion.end_date : "";
                        //$scope.promotiondata.start_date = promotion.start_date ? promotion.start_date : "";
                        $scope.promotiondata["offer_description"] = promotion.offer_description ? promotion.offer_description : "";
                        $scope.promotiondata["offer_title"] = promotion.offer_title ? promotion.offer_title : "";
                        $scope.promotiondata["promo_description"] = promotion.promo_description ? promotion.promo_description : "";
                        $scope.promotiondata["reward_value"] = promotion.reward_value ? promotion.reward_value : "";
                        $scope.promotiondata["sponsor"] = promotion.sponsor ? promotion.sponsor : "";
                        $scope.promotiondata["threshold"] = promotion.threshold ? promotion.threshold : "";
                        $scope.promotiondata["codes"] = promotion.codes ? promotion.codes : [];
                        $scope.promotiondata["top_promo"] = promotion.top_promo ? promotion.top_promo : "";
                        if (promotion.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(promotion.image, false);
                        if (promotion.offer_type && $scope.promotiondata.offerTypes) {
                            for (var j = 0; j < $scope.promotiondata.offerTypes.length; j++) {
                                if ($scope.promotiondata.offerTypes[j].name == promotion.offer_type) {
                                    $scope.promotiondata.selectedOfferType = $scope.promotiondata.offerTypes[j];
                                    break;
                                }
                            }
                        }
                        if (promotion.vendorid && $scope.promotiondata.vendors) {
                            for (var j = 0; j < $scope.promotiondata.vendors.length; j++) {
                                if ($scope.promotiondata.vendors[j]._id == promotion.vendorid._id) {
                                    $scope.promotiondata.vendorsList = $scope.promotiondata.vendors[j];
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
                        if (promotion.upc && $scope.promotiondata.upc) {
                            for (var j = 0; j < $scope.promotiondata.upc.length; j++) {
                                if ($scope.promotiondata.upc[j].name == promotion.upc) {
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
cstore.directive('promoAssignStore', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="assignPromo()"><a href>Save</a></button>' +
            '<button type="button" ng-click="setPath(\'promotions\')"><a href>Back</a></button>' +
            '</div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="searchPromoName()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{preCursor}}-{{preCursor + storesName.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setPromoStoreNameOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setPromoStoreNameOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setPromoStoreNameOrder(\'storeid.programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setPromoStoreNameOrder(\'storeid.programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Assign Store</th></tr><tr ng-repeat="store in storesName"><td>{{store.storeid.storename}}</td><td>{{store.storeid.programid.name}}</td><td>' +
            '<input type="checkbox" ng-model="store.assigned" ng-click="getOperationData($index)"></td>' +
            '</tr></table></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.getOperationData = function (index) {
                        var push = true;
                        if ($scope.storeManager && $scope.storeManager.length > 0) {
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[index].storeid._id == $scope.storeManager[j]._id) {
                                    $scope.storeManager.splice(j, 1);
                                    push = false;
                                    break;
                                }
                            }
                        } else {
                            $scope.storeManager = [];
                        }
                        if (push) {
                            $scope.storeManager.push({"_id": $scope.storesName[index].storeid._id,"email": $scope.storesName[index].userid.emailid});
                        }
                    }
                    $scope.assignPromo = function () {
                        if (!$scope.promoId) {
                            return;
                        }
                        $scope.loadingStatus = true;
                        var query = {"table": "promotions__cstore"};
                        var operationArray = {};
                        $scope.CSession = $appService.getSession();
                        operationArray._id = $scope.promoId;
                        var dataArr = [];
                        for (j = 0; j < $scope.storeManager.length; j++) {
                            dataArr.push({"_id": $scope.storeManager[j]._id,"opt":true,"email": $scope.storeManager[j].email});
                        }
                        operationArray.store_manager_id = {data: dataArr, "override": "true"};
                        query.operations = [operationArray];
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            } else {
                                $("#popupMessage").html("some error while saving training session");
                                $('.popup').toggle("slide");
                            }
                        }, function (err) {
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");
                        });
                    }
                    $scope.searchPromoName = function () {
                        $scope.preCursor = 0;
                        $scope.currentCursor = 0;
                        $scope.getPromoStoresName(1, 10, $scope.searchby.value, $scope.search.searchContent);
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
            }
        }
    }
}]);
// change made
cstore.directive('upcSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div>' +
            '<select class="brand" ng-model="promotiondata.selectedUpc" ng-options="upc.name for upc in promotiondata.upc" ng-change="changeUpc(promotiondata.selectedUpc.name)">' +
            '</select>' +
            '<ul id="upc_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showUpc">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '<ul id="plu_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showPlu">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '<ul id="group_grp_tags" data-name="nameOfSelect" class="tagit ui-sortable" ng-show="showGroup">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '</div>',
        compile: function () {
            return{
                pre: function () {
                }, post: function ($scope) {
                    $scope.getAllAvailableTags = function () {
                        var query = {"table": "product_codes__cstore"};
                        query.columns = ["description", "code", "type"];
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (productData) {
                            $scope.availableTags = {0: [], 1: [], 2: []};
                            for (var i = 0; i < productData.response.data.length; i++) {
                                var type = productData.response.data[i].type;
                                switch (type) {
                                    case "UPC":
                                        $scope.availableTags[0].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                    case "PLU":
                                        $scope.availableTags[1].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                    case "GROUP":
                                        $scope.availableTags[2].push(productData.response.data[i].description + " - " + productData.response.data[i].code);
                                        break;
                                }
                            }
                            $('#upc_grp_tags').tagit({"tagSource": $scope.availableTags[0], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $('#plu_grp_tags').tagit({"tagSource": $scope.availableTags[1], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $('#group_grp_tags').tagit({"tagSource": $scope.availableTags[2], "allowNewTags": false, "triggerKeys": ['enter', 'comma', 'tab']});
                            $scope.changeUpc($scope.promotiondata.selectedUpc.name);
                        }, function (jqxhr, error) {
                            $("#popupMessage").html(error);
                            $('.popup').toggle("slide");
                        })
                    }
                    $scope.changeUpc = function (type) {
                        var i = "";
                        if (!$scope.fillnotset && $scope.fillnotset != "false") {
                            $scope.fillnotset = "true";
                        }
                        switch (type.toUpperCase()) {
                            case "UPC":
                                $scope.showUpc = true;
                                $scope.showPlu = false;
                                $scope.showGroup = false;
                                $scope.parentId = "upc_grp_tags";
                                i = 0;
                                break;
                            case "PLU":
                                $scope.showPlu = true;
                                $scope.showUpc = false;
                                $scope.showGroup = false;
                                $scope.parentId = "plu_grp_tags";
                                i = 1;
                                break;
                            case "GROUP":
                                $scope.showGroup = true;
                                $scope.showUpc = false;
                                $scope.showPlu = false;
                                $scope.parentId = "group_grp_tags";
                                i = 2;
                                break;
                        }
                        if ($scope.promotiondata && $scope.promotiondata.codes && $scope.promotiondata.codes.length > 0 && $scope.parentId && $scope.fillnotset == "true") {
                            var fillCodes = $scope.promotiondata.codes;
                            $('#' + $scope.parentId).tagit('fill', fillCodes);
                            $scope.fillnotset = "false";
                        }
                    }
                    $scope.getAllAvailableTags();
                }
            }
        }
    }
}]);

cstore.directive('startDate', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<input type="text" ng-model="date" jqdatepicker /><br>{{date}}',
        compile: function () {
            return{
                pre: function () {

                }, post: function () {
                }
            }
        }
    }
}]);

//changed 2404


cstore.directive('addPromotion', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Promo Title*</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Title*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.promo_title"></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.offer_title"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Promo Description*</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.promo_description"></textarea></td>' +
            '<td class="half_td"><textarea class="description_promo" type="text" placeholder="" ng-model="promotiondata.offer_description"></textarea></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Sponsor*</div></td>' +
            '<td class="half_td"><div class="margin_top">Vendor*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.sponsor"></td>' +
            '<td class="half_td"><select class="brand" ng-model="promotiondata.vendorsList" ng-options="vendor.firstname for vendor in promotiondata.vendors"></select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top"><div class="date_time pull-left">Start Date*</div><span class="hours">HH</span><span class="minutes">MM</span></div></td>' +
            '<td class="half_td"><div class="margin_top"><div class="date_time pull-left">End Date*</div><span class="hours">HH</span><span class="minutes">MM</span></div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td">' +
            '<input class="date_time" id="start_date" type="text" ng-model="promotiondata.start_date" jqdatepicker />' +
            '<select class="hour_min" ng-model="promotiondata.selectedStartHour" ng-options="hour for hour in promotiondata.hours"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedStartMinute" ng-options="minute for minute in promotiondata.minutes"></select>' +
            '</td>' +
            '<td class="half_td">' +
            '<input class="date_time" id="end_date" type="text" ng-model="promotiondata.end_date" jqdatepicker />' +
            '<select class="hour_min" ng-model="promotiondata.selectedEndHour" ng-options="hour for hour in promotiondata.hours"></select>' +
            '<select class="hour_min" ng-model="promotiondata.selectedEndMinute" ng-options="minute for minute in promotiondata.minutes"></select>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Reward Value</div></td>' +
            '<td class="half_td"><div class="margin_top">Offer Type*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.reward_value"></td>' +
            '<td class="half_td"><offer-type-select></offer-type-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Item Signage*</div></td>' +
            '<td class="half_td"><div class="margin_top">Threshold*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><item-signage-select></item-signage-select></td>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="promotiondata.threshold"></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">UPC/PLU/GROUP*</div></td>' +
            '<td><div class="margin_top">Promo Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><upc-select></upc-select></td>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Top Promo : <input type="checkbox" ng-model="promotiondata.top_promo" style="width:auto"/></div>' +
            '</td>' +
            '<td class="half_td"><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="savePromotion()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforPromotion(\'promotions\')"><a href="">Close</a></button>' +
            '</div></div></td>' +
            '</tr>' +
            '</tbody></table></div>' +
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
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            var tags = $scope.showTags($('#' + $scope.parentId).tagit("tags"));
                            if (!$scope.promotiondata.promo_title) {
                                $("#popupMessage").html("Please enter promo title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_title) {
                                $("#popupMessage").html("Please enter offer title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.promo_description) {
                                $("#popupMessage").html("Please enter promo description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.offer_description) {
                                $("#popupMessage").html("Please enter offer description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.sponsor) {
                                $("#popupMessage").html("Please enter sponsor");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.start_date) {
                                $("#popupMessage").html("Please select start date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.end_date) {
                                $("#popupMessage").html("Please select end date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if ($scope.promotiondata.start_date > $scope.promotiondata.end_date) {
                                $("#popupMessage").html("Please select valid start or end date");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.promotiondata.threshold || !regNumberOnly.test($scope.promotiondata.threshold)) {
                                $("#popupMessage").html("Please enter valid numeric threshold value");
                                $('.popup').toggle("slide");
                                return false;
                            }


                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (($scope.promotiondata.selectedUpc.name == "PLU" || $scope.promotiondata.selectedUpc.name == "GROUP") && tags.length > 1) {
                                $("#popupMessage").html("You can select only one tag in " + $scope.promotiondata.selectedUpc.name);
                                $('.popup').toggle("slide");
                                return false;
                            }

                            $scope.loadingStatus = true;

                            var query = {};
                            query.table = "promotions__cstore";
                            if ($scope.promotiondata["promotionid"]) {
                                $scope.newPromotion["_id"] = $scope.promotiondata["promotionid"];
                            }
                            $scope.newPromotion["end_date"] = new Date($scope.promotiondata.end_date + " " + $scope.promotiondata.selectedEndHour + ":" + $scope.promotiondata.selectedEndMinute);
                            $scope.newPromotion["item_signage"] = $scope.promotiondata.selectedItemSignage.name;
                            $scope.newPromotion["offer_description"] = $scope.promotiondata.offer_description;
                            $scope.newPromotion["offer_title"] = $scope.promotiondata.offer_title;
                            $scope.newPromotion["offer_type"] = $scope.promotiondata.selectedOfferType.name;
                            $scope.newPromotion["promo_description"] = $scope.promotiondata.promo_description;
                            $scope.newPromotion["promo_title"] = $scope.promotiondata.promo_title;
                            $scope.newPromotion["reward_value"] = $scope.promotiondata.reward_value;
                            $scope.newPromotion["sponsor"] = $scope.promotiondata.sponsor;
                            $scope.newPromotion["start_date"] = new Date($scope.promotiondata.start_date + " " + $scope.promotiondata.selectedStartHour + ":" + $scope.promotiondata.selectedStartMinute);
                            $scope.newPromotion["threshold"] = $scope.promotiondata.threshold;
                            // change made
                            if (tags && tags.length > 0) {
                                $scope.newPromotion["codes"] = tags;
                            }
                            //changes made by anuradha 0105 evening
                            $scope.newPromotion["top_promo"] = $scope.promotiondata.top_promo;
                            $scope.newPromotion["upc"] = $scope.promotiondata.selectedUpc.name;
                            $scope.newPromotion["vendorid"] = {"_id": $scope.promotiondata.vendorsList._id};
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
                                    $scope.loadingStatus = false;
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
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforPromotion("promotions");
                            }
                            else if ((callBackData.response && callBackData.response.indexOf("Duplicate value for Unique columns") >= 0 ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.indexOf("Duplicate value for Unique columns") >= 0)) {
                                $("#popupMessage").html("There is duplicate value for promo title or offer titile");
                                $('.popup').toggle("slide");
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");

                        });
                    }
                }
            }
        }
    }
}]);

cstore.directive('jqdatepicker', [ '$appService', function ($appService, $scope) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModelCtrl) {
            var model = attrs.ngModel.split(".");
            $(element).datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    if (!$scope[model[0]])
                        $scope[model[0]] = {};
                    $scope[model[0]][model[1]] = date;
                    $scope.$apply();
                }
            });
        }
    };
}]);
//changes made 02/05
cstore.directive('jqtimepicker', [ '$appService', function ($appService, $scope) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModelCtrl) {
            var model = attrs.ngModel.split(".");
            $(element).timepicker({
                onSelect: function (time) {
                    if (!$scope[model[0]])
                        $scope[model[0]] = {};
                    $scope[model[0]][model[1]] = time;
                    $scope.$apply();
                }
            });
        }
    };
}]);

/*bharat chnage */
cstore.directive('googlePlaces', function () {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {location: '='},
        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
        link: function ($scope, elm, attrs) {
            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $scope.location = place["address_components"][0].long_name;
//
// $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                $scope.$apply();
            });
        }
    }
});
/*bharat change end here*/

/******************************************* Training Session****************************************************/
//changes made by anuradha on 30-04
cstore.directive('trainingSessionList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><assign-store-session-popup></assign-store-session-popup><div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-training-session\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteTrainingSession()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + trainingSessions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setTrainingSessionOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Training Category<span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'training_category_id.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingSessionOrder(\'training_category_id.name\',\'desc\',searchby.value,search.searchContent)"></div>	' +
            '</span></th><th><span>Video Url</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'video_url\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setTrainingSessionOrder(\'video_url\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>Actions</th></tr><tr ng-repeat="trainingSession in trainingSessions"><td>' +
            '<input type="checkbox" ng-model="trainingSession.deleteStatus"></td><td>{{trainingSession.title}}</td><td>{{trainingSession.training_category_id.name}}</td><td>' +
            '{{trainingSession.string_video_url}}</td><td><a class="edit_btn" ng-click="setAssignedPath(trainingSession._id)" href>Assign</a>' +
            '<a class="edit_btn" ng-click="setTrainingSessionState(trainingSession)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingTrainingSessionData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.setAssignedPath = function (sessionid) {
                        window.location.href = "#!/assign-store?id=" + sessionid;
                    }
                    $scope.showAssignPopup = function (session) {
                        $(".assign_popup").show();
                        $scope.sessionTitle = session.title;
                        $scope.sessionId = session._id;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTrainingSessions(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteTrainingSessionArray = [];
                    $scope.deleteTrainingSession = function () {
                        for (var i = 0; i < $scope.trainingSessions.length; i++) {
                            if ($scope.trainingSessions[i].deleteStatus) {
                                $scope.deleteTrainingSessionArray.push({"_id": $scope.trainingSessions[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "training_session__cstore";
                        query.operations = angular.copy($scope.deleteTrainingSessionArray);
                        $scope.deleteTrainingSessionArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.trainingSessions.length; i++) {
                                    if ($scope.trainingSessions[i].deleteStatus) {
                                        $scope.trainingSessions.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setTrainingSessionState = function (trainingSession) {
                        $scope.trainingdata["title"] = trainingSession.title ? trainingSession.title : "";
                        $scope.trainingdata["video_url"] = trainingSession.video_url ? trainingSession.video_url : "";
                        $scope.trainingdata["description"] = trainingSession.description ? trainingSession.description : "";
                        //$scope.showDocFile(trainingSession.file, false);
                        //$scope.productdata["image"] = product.image;
                        //$scope.showFile(product.image, false);

                        if (trainingSession.training_category_id._id) {
                            for (var j = 0; j < $scope.trainingdata.trainingCategories.length; j++) {
                                if ($scope.trainingdata.trainingCategories[j]._id == trainingSession.training_category_id._id) {
                                    $scope.trainingdata.selectedTrainingCategory = $scope.trainingdata.trainingCategories[j];
                                    break;
                                }
                            }
                        }
                        $scope.trainingdata.editImages = trainingSession.file;
                        if (trainingSession.file && trainingSession.file.length > 0) {
                            for (var k = 0; k < trainingSession.file.length; k++) {
                                $scope.trainingdata.uploadedimages[k] = {"filename": trainingSession.file[k].name};
                                $scope.trainingdata.uploadedimages[k].fileurl = BAAS_SERVER + "/file/download?filekey=" + trainingSession.file[k].key + "&ask=" + ASK + "&osk=" + OSK;
                            }
                        }
                        window.location.href = "#!edit-training-session?q=" + trainingSession._id;
                    }
                    //changes made on 3004  by anu
                    $scope.setAssignedSessionState = function (session) {
                        $scope.session_title = session.title;
                        window.location.href = "#!/assigned-session-store?q=" + session._id;
                    }
                    /*****end*******/
                }
            }
        }
    }
}]);

cstore.directive('trainingCategorySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="search_select" ng-model="trainingdata.selectedTrainingCategory" ng-options="trainingCategory.name for trainingCategory in trainingdata.trainingCategories"></select>'
    }
}]);

cstore.directive('trainingAssignStore', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="assignTrainingSession()"><a href>Save</a></button>' +
            '<button type="button" ng-click="setPath(\'trainings\')"><a href>Back</a></button>' +
            '</div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="searchStoreName()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{preCursor}}-{{preCursor + storesName.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'storeid.programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'storeid.programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>'+
            '<th>Assign Store</th></tr><tr ng-repeat="store in storesName"><td>{{store.storeid.storename}}</td><td>{{store.storeid.programid.name}}</td><td>' +
            '<input type="checkbox" ng-model="store.assigned" ng-click="getOperationData($index)"></td>' +
            '</tr></table></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.getOperationData = function (index) {
                        var push = true;
                        if ($scope.storeManager && $scope.storeManager.length > 0) {
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[index].storeid._id == $scope.storeManager[j]._id) {
                                    $scope.storeManager.splice(j, 1);
                                    push = false;
                                    break;
                                }
                            }
                        } else {
                            $scope.storeManager = [];
                        }
                        if (push) {
                            $scope.storeManager.push({"_id": $scope.storesName[index].storeid._id,"email": $scope.storesName[index].userid.emailid});
                        }
                    }
                    $scope.assignTrainingSession = function () {
                        if (!$scope.trainingSessionId) {
                            return;
                        }
                        $scope.loadingStatus = true;
                        var query = {"table": "training_session__cstore"};
                        var operationArray = {};
                        $scope.CSession = $appService.getSession();
                        operationArray._id = $scope.trainingSessionId;
                        var dataArr = [];
                        for (j = 0; j < $scope.storeManager.length; j++) {
                            dataArr.push({"_id": $scope.storeManager[j]._id,"email": $scope.storeManager[j].email});
                        }
                        operationArray.store_manager_id = {data: dataArr, "override": "true"};
                        query.operations = [operationArray];
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            } else {
                                $("#popupMessage").html("some error while saving training session");
                                $('.popup').toggle("slide");
                            }
                        }, function (err) {
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");
                        });
                    }
                    $scope.searchStoreName = function () {
                        $scope.preCursor = 0;
                        $scope.currentCursor = 0;
                        $scope.getStoresName(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                }
            }
        }
    }
}]);

cstore.directive('addTrainingSession', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Title*</div></td>' +
            '<td class="half_td"><div class="margin_top">Training Category*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="trainingdata.title"></td>' +
            '<td class="half_td"><training-category-select></training-category-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2"><textarea type="text" placeholder="" ng-model="trainingdata.description" class="description"></textarea></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td><div class="margin_top">Video Url*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td>' +
            '<ul id="demo2" data-name="demo2" class="tagit">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">' +
            '</li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '</td>' +
            '</tr>' +
            '<tr><td><app-multi-file-upload></app-multi-img-file-upload></td></tr>' +
            '<tr><td>' +
            '<ul class="uploadList">' +
            '<li ng-repeat="uploadedimage in trainingdata.uploadedimages"><div class="uploadLink"><a href="{{uploadedimage.fileurl}}">{{uploadedimage.filename}}</a></div>' +
            '<img src="images/icon_cross.gif" style="width: 3%;margin-left: 8px;" value="Remove" ng-click="removeImgFile($index)">' +
            '</li>' +
            '</ul>' +
            '</td></tr>' +
            '</tbody></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveTrainingSession()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforSession(\'trainings\')"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingAddTrainingdata"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddTrainingData = true;
                    $scope.newSession = {};
                    $scope.setPathforSession = function (path) {
                        $scope.clearTrainingSessionContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $('#demo2').tagit();
                    if ($scope.trainingdata.video_url && $scope.trainingdata.video_url.length > 0) {
                        $("#demo2").tagit("fill", $scope.trainingdata.video_url);
                    }
                    $scope.loadingAddTrainingData = false;
                    $scope.saveTrainingSession = function () {
                        $scope.CSession = $appService.getSession();
                        var regexp = /(ftp|http|https|www)(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                        var video_url = $scope.showTags($('#demo2').tagit("tags"));
                        var invalid_url = false;
                        for (i = 0; i < video_url.length; i++) {
                            if (!regexp.test(video_url[i])) {
                                invalid_url = true;
                                break;
                            }
                        }
                        if ($scope.CSession) {
                            if (!$scope.trainingdata.title) {
                                $("#popupMessage").html("Please enter training session title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.trainingdata.description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (video_url && (video_url.length == 0 || invalid_url)) {
                                $("#popupMessage").html("Please enter valid video url");
                                $('.popup').toggle("slide");
                                return false;
                            }

                            if (!$scope.trainingdata.uploadedimages || $scope.trainingdata.uploadedimages.length == 0) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingAddTrainingdata = true;

                            var query = {};
                            query.table = "training_session__cstore";
                            if ($scope.trainingdata["trainingSessionId"]) {
                                $scope.newSession["_id"] = $scope.trainingdata["trainingSessionId"];
                            }
                            $scope.newSession["title"] = $scope.trainingdata.title;
                            $scope.newSession["description"] = $scope.trainingdata.description;
                            $scope.newSession["video_url"] = $scope.showTags($("#demo2").tagit("tags"));
                            $scope.newSession["training_category_id"] = {"name": $scope.trainingdata.selectedTrainingCategory.name, "_id": $scope.trainingdata.selectedTrainingCategory._id};
                            if ($scope.trainingdata.uploadedimages && $scope.trainingdata.uploadedimages.length == 0) {
                                query.operations = [$scope.newSession];
                                $scope.saveFunction(query);
                            }
                            else {
                                $scope.newSession["file"] = [];
                                for (j = 0; j < $scope.trainingdata.uploadedimages.length; j++) {
                                    $scope.newSession["file"][j] = $scope.trainingdata.uploadedimages[j].image[0];
                                }
                                query.operations = [$scope.newSession];
                                $scope.saveFunction(query);
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.saveFunction = function (query) {

                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingAddTrainingdata = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforSession("trainings");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving training session");
                                $('.popup').toggle("slide");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
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

cstore.directive('docFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
//        scope:true,
        template: "<div>" +
            '<div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div>' +
            "<span><input ng-show='readonlydocrow.filenotexist' type='file' id='uploaddocfile'/></span>" +
            "<div ng-hide='readonlydocrow.filenotexist'>" +
            "<span>" +
            "<div class='pic_preview'>{{readonlydocrow.filename}}</div>" +
            "</span>" +
            "<img src='images/icon_cross.gif'class='cross_icon_doc' value='Remove' ng-click='removeFile()'/>" +
            "</div>" +
            "</div>",
        compile: function () {
            return {
                post: function ($scope, iElement) {
                    $scope.removeFile = function () {
                        delete $scope.docrow[$scope.colmetadocdata.expression];
                        $("#uploaddocfile").val("");
                        $scope.readonlydocrow.filenotexist = true;
                    };
                    if ($scope.docrow[$scope.colmetadocdata.expression]) {
                        $scope.showDocFile($scope.docrow[$scope.colmetadocdata.expression], false);

                    } else if (!$scope.readonlydocrow.fileurl) {
                        $scope.readonlydocrow.filenotexist = true;
                    }
                    $scope.loadFile = function (evt) {
                        $scope.docfile = {};
                        $scope.docfile.name = $scope.docOFile.name;
                        $scope.docfile.result = evt.target.result;
                        $scope.docOFile['data'] = evt.target.result;
                        $scope.showUploadedFile($scope.docfile);
                    };
                    $scope.showUploadedFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(doc|docx|pdf|ppt|pptx)$/gi).test(file.name)) {

                            $scope.documentData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFReader = new FileReader();
                            if (document.getElementById('uploaddocfile').files.length === 0) {
                                return;
                            }
                            $scope.docOFile = document.getElementById('uploaddocfile').files[0];
                            $scope.oFReader.onload = $scope.loadFile;
                            $scope.oFReader.readAsDataURL($scope.docOFile);
                        });
                    });
                }
            }
        }
    }
}]);

/*************************************** Survey ************************************************/
//changes made by anu on 2904
cstore.directive('surveyList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button"  ng-click="setPath(\'add-survey\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteSurvey()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + surveys.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setSurveyOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setSurveyOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Description<span class="sortWrap"><div class="sortUp" ng-click="setSurveyOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setSurveyOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>Actions</th></tr><tr ng-repeat="survey in surveys"><td>' +
            '<input type="checkbox" ng-model="survey.deleteStatus"></td><td>{{survey.title}}</td><td>{{survey.description}}</td><td><a class="edit_btn"  ng-click="setSurveyAssignedPath(survey._id)" href>Assign</a><a class="edit_btn"  ng-click="setSurveyAnsweredPath(survey._id)" href>Answered</a>' +
            '<a class="edit_btn" ng-click="setSurveyState(survey)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingSurveyData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.setSurveyAssignedPath = function (sessionid) {
                        window.location.href = "#!/assign-survey-store?id=" + sessionid;
                    }
                    $scope.setSurveyAnsweredPath = function (sessionid) {
                        window.location.href = "#!/answered-survey-store?id=" + sessionid;
                    }
                    //changes made 2904
                    $scope.showAssignPopup = function (survey) {
                        $(".assign_popup").show();
                        $scope.surveyTitle = survey.title;
                        $scope.surveyId = survey._id;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllSurveys(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteSurveyArray = [];
                    $scope.deleteSurvey = function () {
                        for (var i = 0; i < $scope.surveys.length; i++) {
                            if ($scope.surveys[i].deleteStatus) {
                                $scope.deleteSurveyArray.push({"_id": $scope.surveys[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "surveys__cstore";
                        query.operations = angular.copy($scope.deleteSurveyArray);
                        $scope.deleteSurveyArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.surveys.length; i++) {
                                    if ($scope.surveys[i].deleteStatus) {
                                        $scope.surveys.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setAssignedSurveyState = function (survey) {
                        //$scope.survey["title"] = survey.title ? survey.title : "";
                        window.location.href = "#!/assigned-survey-store?q=" + survey._id;
                    }
                    $scope.setSurveyState = function (survey) {
                        $scope.surveydata["surveyId"] = survey._id ? survey._id : "";
                        $scope.surveydata["title"] = survey.title ? survey.title : "";
                        $scope.surveydata["description"] = survey.description ? survey.description : "";
                        if (survey.survey_question && survey.survey_question.length > 0) {
                            $scope.questions.length = survey.survey_question.length;
                            for (i = 0; i < survey.survey_question.length; i++) {
                                $scope.questions[i] = {"question": survey.survey_question[i].question};
                                for (var j = 0; j < $scope.listType.length; j++) {
                                    if ($scope.listType[j].value == survey.survey_question[i].survey_type) {
                                        $scope.questions[i].type = $scope.listType[j];
                                        break;
                                    }
                                }
                                $scope.questions[i]["optionArr"] = [];
                                if (survey.survey_question[i].survey_type != "subjective" && (survey.survey_question[i].options && survey.survey_question[i].options.length > 0 )) {
                                    for (k = 0; k < survey.survey_question[i].options.length; k++) {
                                        $scope.questions[i]["optionArr"][k] = {"options": survey.survey_question[i].options[k]};
                                    }
                                    $scope.questions[i].addOption = true;
                                } else {
                                    $scope.questions[i].addOption = false;
                                }
                            }
                        }
                        window.location.href = "#!/edit-survey?q=" + survey._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('addsurvey', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="margin_top">Title*</div></td></tr>' +
            '<tr><td class="full"><input type="text" placeholder="" ng-model="surveydata.title"></td></tr>' +
            '<tr><td><div class="margin_top">Description*</div></td></tr>' +
            '<tr><td colspan="2"><textarea type="text" placeholder="" ng-model="surveydata.description" class="description"></textarea></td></tr>' +
            '</tbody></table></div>' +
            '<h2 class="sub-head-border">' +
            '<span class="small-txt">Choose the type and add as many questions as you need.</span>  ' +
            '</h2>  ' +
            "<div class='questionWrap' ng-repeat='ques in questions'>" +
            "<div><div>" +
            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
            '<tr><td class="pull-left"><div class="margin_top">Question Type</div></td>' +
            '<td class="pull-left" colspan="2"><select class="typelist" ng-model="ques.type" ng-change="showOption(ques)" ng-options="list.name for list in listType"></select></td></tr>' +
            "</table>" +
            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
            "<tr>" +
            "<td class='full'>" +
            "<span class='ques_index'>Question* {{$index+1}}.</span> " +
            "</td>" +
            "<td align='right' valign='middle'>&nbsp;<a ng-click='questions.splice($index,1)'>" +
            "<img src='/images/icon_delete.gif' alt='delete this question' class='question_answer'>" +
            "</a></td> " +
            "</tr></table>" +
            "</div> " +
            "<div id='question_desc'><div id='bg'>" +
            "<textarea cols=76 class='description_1' rows=3 ng-model='ques.question' id='question{{$index}}' ></textarea>" +
            "</div>" +
            "</div>" +
            "<table class='full' border=0 ng-show='ques.addOption'>" +
            "<tr><td colspan='2'>" +
            "<div id='mc_answers{{$index}}' name='mc_answers{{$index}}'>" +
            "<table class='full'><tbody><tr><th>" +
            "<th class='th_option' ng-hide='ques.optionArr.length == 0'>Option</th>" +
            "<th class='th_action' ng-hide='ques.optionArr.length == 0'>Action</th>" +
            "</tr></tbody></table>" +
            "<div id='opt{{$index}}_1' name='opt{{$index}}_1' ng-repeat='opt in ques.optionArr'>" +
            "<table class='full'><tr>" +
            "<td><input type='text' ng-model='opt.options' id='answer{{$index}}'></td>" +
            "<td align=center>" +
            "<a title='delete this answer' ng-click='ques.optionArr.splice($index,1)' >" +
            "<img src='/images/comment_delete.gif' alt='delete this answer' class='no' width='8'>" +
            "</a>" +
            "</td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</div></td></tr></table>" +
            "<br/><div id='add_options{{$index}}' ng-show='ques.addOption'>" +
            "<a title='Add alternate correct answers.' ng-click='ques.optionArr.push({options:[]})'>" +
            "<strong>+ Add New Option</strong>" +
            "</a></b><br/><br/></div>" +
            "</div></div>" +
            '<div class="questionToolBox">' +
            '<div style="width: 800px;" class="add-questions-box" id="qButtons"> ' +
            '<span style="position: relative;" ng-click="questions.push({optionArr:[],type:listType[0],addOption:true})" class="btn">  ' +
            '<strong id="checkbox" class="plusSign">&nbsp;</strong>&nbsp;+ Add Question&nbsp;</span> ' +
            '</div>   ' +
            '</div> ' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveSurvey()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="clearSurveyContent()"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingAddTrainingdata"><img src="/images/loading.gif"></div>' +
            '</div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    if (window.location.hash == "#!/add-survey")
                        $scope.questions = [
                            {"optionArr": [], "question": "", "type": $scope.listType[0], "addOption": true}
                        ];
                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    $scope.showOption = function (ques) {
                        if (ques.type.value != "subjective") {
                            ques.addOption = true;
                        } else {
                            ques.addOption = false;
                        }
                    }
                    $scope.saveSurvey = function () {
                        if ($scope.CSession) {
                            if (!$scope.surveydata.title) {
                                $("#popupMessage").html("Please enter survey title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.surveydata.description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingAddTrainingdata = true;
                            var query = {};
                            var newSession = {};
                            query.table = "surveys__cstore";
                            if ($scope.surveydata["surveyId"]) {
                                newSession["_id"] = $scope.surveydata["surveyId"];
                            }
                            newSession["title"] = $scope.surveydata.title;
                            newSession["description"] = $scope.surveydata.description;
                            newSession["survey_question"] = [];
                            for (i = 0; i < $scope.questions.length; i++) {
                                if (!$scope.questions[i].question) {
                                    $("#popupMessage").html("Please enter question " + Number(i + 1) + ".");
                                    $('.popup').toggle("slide");
                                    return;
                                }
                                newSession["survey_question"][i] = {"question": $scope.questions[i].question};
                                newSession["survey_question"][i]["survey_type"] = $scope.questions[i].type.value;
                                if ($scope.questions[i].type.value != "subjective") {
                                    newSession["survey_question"][i]["options"] = [];
                                    if ($scope.questions[i].optionArr.length < 2) {
                                        $("#popupMessage").html("Please add at least two options of question " + Number(i + 1) + ".");
                                        $('.popup').toggle("slide");
                                        return;
                                    }
                                    for (j = 0; j < $scope.questions[i].optionArr.length; j++) {
                                        if (!$scope.questions[i].optionArr[j].options || ($scope.questions[i].optionArr[j].options && $scope.questions[i].optionArr[j].options.length == 0)) {
                                            $("#popupMessage").html("Please enter option " + Number(j + 1) + " of question " + Number(i + 1) + ".");
                                            $('.popup').toggle("slide");
                                            return;
                                        }
                                        newSession["survey_question"][i]["options"][j] = $scope.questions[i].optionArr[j].options;
                                    }
                                }
                            }
                            newSession["survey_question"] = {data: newSession["survey_question"], "override": "true"};
                            query.operations = [newSession];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingAddTrainingdata = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    $scope.setPath('surveys');
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while saving survey");
                                    $('.popup').toggle("slide");
                                }
                                $scope.clearSurveyContent();
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            });
                        } else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }

                }
            }
        }
    }
}]);

cstore.directive('surveyAssignStore', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="assignSurveySession()"><a href>Save</a></button>' +
            '<button type="button" ng-click="setPath(\'surveys\')"><a href>Back</a></button>' +
            '</div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="searchSurveyStoreName()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{preCursor}}-{{preCursor + storesName.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'storeid.programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'storeid.programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Assign Store</th></tr><tr ng-repeat="store in storesName"><td>{{store.storeid.storename}}</td><td>{{store.storeid.programid.name}}</td><td>' +
            '<input type="checkbox" ng-model="store.assigned" ng-click="getSurveyOperationData($index)"></td>' +
            '</tr></table></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.getSurveyOperationData = function (index) {
                        var push = true;
                        if ($scope.storeManager && $scope.storeManager.length > 0) {
                            for (j = 0; j < $scope.storeManager.length; j++) {
                                if ($scope.storesName[index].storeid._id == $scope.storeManager[j]._id) {
                                    $scope.storeManager.splice(j, 1);
                                    push = false;
                                    break;
                                }
                            }
                        } else {
                            $scope.storeManager = [];
                        }
                        if (push) {
                            $scope.storeManager.push({"_id": $scope.storesName[index].storeid._id,"email": $scope.storesName[index].userid.emailid});
                        }
                    }
                    $scope.assignSurveySession = function () {
                        if (!$scope.trainingSessionId) {
                            return;
                        }
                        $scope.loadingStatus = true;
                        var query = {"table": "surveys__cstore"};
                        var operationArray = {};
                        $scope.CSession = $appService.getSession();
                        operationArray._id = $scope.trainingSessionId;
                        var dataArr = [];
                        for (j = 0; j < $scope.storeManager.length; j++) {
                            dataArr.push({"_id": $scope.storeManager[j]._id, "status": "unanswered","email": $scope.storeManager[j].email});
                        }
                        operationArray.store_manager_id = {data: dataArr, "override": "true"};
                        query.operations = [operationArray];
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingStatus = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            } else {
                                $("#popupMessage").html("some error while saving training session");
                                $('.popup').toggle("slide");
                            }
                        }, function (err) {
                            $("#popupMessage").html(err.stack);
                            $('.popup').toggle("slide");
                        });
                    }
                    $scope.searchSurveyStoreName = function () {
                        $scope.preCursor = 0;
                        $scope.currentCursor = 0;
                        $scope.getSurveyStoresName(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                }
            }
        }
    }
}]);

cstore.directive('surveyAnsweredStore', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'surveys\')"><a href>Back</a></button>' +
            '</div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{preCursor}}-{{preCursor + storesName.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'store_id.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'store_id.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'store_id.programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'store_id.programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '</tr><tr ng-repeat="store in storesName"><td><a ng-click = "setQuesAns(store)">{{store.store_id.storename}}</a></td><td>{{store.store_id.programid.name}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.search = function () {
                        $scope.preCursor = 0;
                        $scope.currentCursor = 0;
                        $scope.getSurveyStoresName(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setQuesAns = function (store) {
                        $scope.loadingStatus = true;
                        var query = {};
                        query.table = "surveys__cstore";
                        query.columns = ["store_manager_id", "survey_question"];
                        query.filter = {"_id": store.survey_id};
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyResp) {
                            $scope.loadingStatus = false;
                            var surveyData = surveyResp.response.data[0].survey_question;
                            for (var i = 0; i < surveyData.length; i++) {
                                $scope.answeredSurveys[i] = {"question": surveyData[i].question};
                                if (store.answers[i] instanceof Object) {
                                    $scope.answeredSurveys[i].answer = store.answers[i];
                                    $scope.answeredSurveys[i].is_array = true;
                                } else {
                                    $scope.answeredSurveys[i].answer = store.answers[i];
                                    $scope.answeredSurveys[i].is_array = false;
                                }
                            }
                            window.location.href = "#!/assigned-survey-response";
                        });
                    }
                }
            }
        }
    }
}]);

cstore.directive('assignedSurveyResponse', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'surveys\')"><a href>Back</a></button>' +
            '</div>' +
            '</div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Answered Surveys</span></th>' +
            '</tr></table><div class="queans" ng-repeat="answeredSurvey in answeredSurveys"><div class="que"><b>Ques {{$index + 1}}. </b>{{answeredSurvey.question}}</div>' +
            '<div class="que" ng-switch="answeredSurvey.is_array"><div ng-switch-when="true"><span class="ans_label"><b>Ans.</b></span><ul class="answers"> <li ng-repeat="answer in answeredSurvey.answer">{{answer}}</li></ul></div></div>' +
            '<div class="que" ng-show="!answeredSurvey.is_array"><b>Ans.</b> {{answeredSurvey.answer}}</div>' +
            '</div></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                }
            }
        }
    }
}]);

/******************************* All Promotions **************************************/
cstore.directive('allPromos', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">All Promotions</div>' +
            '<div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="promotion in promotions"><div class="products_img"><a href="#!/promo?promoid={{promotion._id}}">' +
            '<img ng-src="{{promotion.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/promo?promoid={{promotion._id}}">{{promotion.promo_title}}</a></div>' +
            '' +
            '</div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!promotionData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);

/************************** Carousel Promo *******************************************/
cstore.directive('carouselPromos', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<ul class="bxslider" style="margin-top:0px"><li ng-repeat="carouselPromotion in carouselPromotions" on-finish-render="test"><a href="#!/promo?promoid={{carouselPromotion._id}}"><img title="{{carouselPromotion.promo_title}}" ng-src="{{carouselPromotion.imageUrl}}" height="237px" width="270px;"/></a></li></ul>',
        compile: function () {
            return {
                pre: function () {
                },
                post: function () {

                }
            }
        }
    }
}]);


cstore.directive('onFinishRender', function ($timeout) {
    return{
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});

/********** Promo Detail**********/
cstore.directive('promoDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="category pull-left"><div class="pop_products"><a href="/">Home</a> > <a href="#!/all-promos">Promotions</a> > {{promotion[0].promo_title}}</div><div class="img_product pull-left">' +
            '<img ng-src="{{promotion[0].imageUrl}}" /></div>' +
            '<div class="details_product pull-left"><div class="short_details">{{promotion[0].promo_description}}</div>' +
            '<div class="Qty"><div class="quantity_border">Opt/Out: <input type="checkbox" ng-model="booleanOpt"/> </div></div>' +
            '<div class="add_to_btn pull-left"><a href="" ng-click="changeAssignedPromoStatus()">Opt/Out</a></div></div>' +
            '<div class="loadingImage" ng-hide="!loadingPromotionDetailData"><img src="images/loading.gif"></div>',
        compile:function(){
            return {
                pre:function(){},
                post:function($scope){
                    $scope.CSession = $appService.getSession();
                    $scope.changeAssignedPromoStatus = function () {
                        if ($scope.CSession) {
                            var query = {};
                            $scope.loadingPromotionDetailData = true;
                            $scope.newPromoStatus = {};
                            $scope.newPromoStatus["store_manager_id"] = {};
                            query.table = "promotions__cstore";
                            $scope.newPromoStatus["_id"] = $scope.promotion[0]._id;
                            var promoStoreArray = [];
                            for(var i=0;i<$scope.assignedStoreManagers.length;i++){
                                if($scope.assignedStoreManagers[i]._id==$scope.currentUser.data.storeid) {
                                    $scope.assignedStoreManagers[i].opt=$scope.booleanOpt;
                                }
                                promoStoreArray.push({"_id": $scope.assignedStoreManagers[i]._id, "opt": $scope.assignedStoreManagers[i].opt});
                            }
                            $scope.newPromoStatus.store_manager_id = {data: promoStoreArray, "override": "true"};
                            query.operations = [$scope.newPromoStatus];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingPromotionDetailData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    window.location.href="#!/all-promos";
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while updating status");
                                    $('.popup').toggle("slide");
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);

/*********************************** Assign Survey To Store Manager********************************************/
cstore.directive('assignStorePopup', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="assign_popup pull-left"><div class="popup">Assign {{surveyTitle}} To Store Manager</div>' +
            '<div class="pop_btn pull-left"><div class="popup_input pull-left"><table>' +
            '<tr><td>Store Name</td></tr><tr><td>' +
            '<select class="brand" ng-model="trainingdata.assignedStore" ng-options="store.storename for store in trainingdata.stores"></select></td></tr></table>' +
            '</div><div class="add_btn"><button type="button" ng-click="assignStoreSurvey()"><a href>Save</a></button>' +
            '<button type="button" ng-click="hideAssignPopup()"><a href>Cancel</a></button></div></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.hideAssignPopup = function () {
                        $(".assign_popup").hide();
                        $scope.trainingdata.assignedStore = $scope.trainingdata.stores[0];
                    }
                    $scope.newStoreSurvey = {};
                },
                post: function ($scope) {

                    $scope.assignStoreSurvey = function () {
                        var query = {};
                        query.table = "storemanager_survey__cstore";
                        $scope.newStoreSurvey["store_manager_id"] = {"storename": $scope.trainingdata.assignedStore.storename, "_id": $scope.trainingdata.assignedStore._id};
                        $scope.newStoreSurvey["survey_id"] = {"title": $scope.surveyTitle, "_id": $scope.surveyId};
                        query.operations = [$scope.newStoreSurvey];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Assigned successfully");
                                $('.popup').toggle("slide");
                                $scope.hideAssignPopup();
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while assigning survey");
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
//changes made by anuradha on 30-04
cstore.directive('assignedSurveyList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left">' +
            '<div class="delete_btn pull-left"><button type="button" ng-click="deleteAssignedSurvey()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + assignedSurveys.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Store</span><span class="sortWrap"><div class="sortUp" ng-click="setAssignedSurveyOrder(\'store_manager_id.storename\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setAssignedSurveyOrder(\'store_manager_id.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '</tr><tr ng-repeat="assignedSurvey in assignedSurveys"><td>' +
            '<input type="checkbox" ng-model="assignedSurvey.deleteStatus"></td><td>{{assignedSurvey.store_manager_id.storename}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingAssignedSurveyData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAssignedSurveys(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteAssignedSurveyArray = [];
                    $scope.deleteAssignedSurvey = function () {
                        for (var i = 0; i < $scope.assignedSurveys.length; i++) {
                            if ($scope.assignedSurveys[i].deleteStatus) {
                                $scope.deleteAssignedSurveyArray.push({"_id": $scope.assignedSurveys[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "storemanager_survey__cstore";
                        query.operations = angular.copy($scope.deleteAssignedSurveyArray);
                        $scope.deleteAssignedSurveyArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.assignedSurveys.length; i++) {
                                    if ($scope.assignedSurveys[i].deleteStatus) {
                                        $scope.assignedSurveys.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                }
            }
        }
    }
}]);

/***********************************Assign Session To Store Manager************************************************/
cstore.directive('assignStoreSessionPopup', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="assign_popup pull-left"><div class="popup">Assign {{sessionTitle}} To Store Manager</div>' +
            '<div class="pop_btn pull-left"><div class="popup_input pull-left"><table>' +
            '<tr><td>Store Name</td></tr><tr><td>' +
            '<select class="brand" ng-model="trainingdata.assignedStore" ng-options="store.storename for store in trainingdata.stores"></select></td></tr></table>' +
            '</div><div class="add_btn"><button type="button" ng-click="assignStoreSession()"><a href>Save</a></button>' +
            '<button type="button" ng-click="hideAssignPopup()"><a href>Cancel</a></button></div></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.hideAssignPopup = function () {
                        $(".assign_popup").hide();
                        $scope.trainingdata.assignedStore = $scope.trainingdata.stores[0];
                    }
                    $scope.newStoreSession = {};
                },
                post: function ($scope) {


                    $scope.assignStoreSession = function () {
                        var query = {};
                        query.table = "storemanager_trainingsession__cstore";
                        $scope.newStoreSession["store_manager_id"] = {"storename": $scope.trainingdata.assignedStore.storename, "_id": $scope.trainingdata.assignedStore._id};
                        $scope.newStoreSession["training_session_id"] = {"title": $scope.sessionTitle, "_id": $scope.sessionId};
                        query.operations = [$scope.newStoreSession];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Assigned successfully");
                                $('.popup').toggle("slide");
                                $scope.hideAssignPopup();
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while assigning sesion");
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

cstore.directive('assignedSessionList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left">' +
            '<div class="delete_btn pull-left"><button type="button" ng-click="deleteAssignedSession()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + assignedSessions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><caption>{{session_title}}</caption><tr><th></th><th><span>Store</span><span class="sortWrap"><div class="sortUp" ng-click="setAssignedSessionOrder(\'store_manager_id.storename\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setAssignedSessionOrder(\'store_manager_id.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '</tr><tr ng-repeat="assignedSession in assignedSessions"><td>' +
            '<input type="checkbox" ng-model="assignedSession.deleteStatus"></td><td>{{assignedSession.store_manager_id.storename}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-hide="!loadingAssignedSessionData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAssignedSessions(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteAssignedSessionArray = [];
                    $scope.deleteAssignedSession = function () {
                        for (var i = 0; i < $scope.assignedSessions.length; i++) {
                            if ($scope.assignedSessions[i].deleteStatus) {
                                $scope.deleteAssignedSessionArray.push({"_id": $scope.assignedSessions[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "storemanager_trainingsession";
                        query.operations = angular.copy($scope.deleteAssignedSessionArray);
                        $scope.deleteAssignedSessionArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.assignedSessions.length; i++) {
                                    if ($scope.assignedSessions[i].deleteStatus) {
                                        $scope.assignedSessions.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                }
            }
        }
    }
}]);

/************************************ Training Session Detail for StoreManager Section**************************/
cstore.directive('sessionDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div><div class="m_bar pull-left">' +
            '<div class="category pull-left">' +
            '<div class="pop_products"><a href="/">Home</a> > <a href="#!/all-trainings">All Training Sessions</a> ><a href="#!/session-category?q={{session[0].training_category_id._id}}"> {{session[0].training_category_id.name}}</a> > {{session[0].title}}</div>' +
            '<div class="training pull-left" ng-repeat="videoUrl in videoUrls">' +
            '<div class="pdf_img">' +
            '<a href={{videoUrl}} target="_blank"><img title="{{videoUrl}}" src="images/Photo-Video-Start-icon.png"></a>' +
            '</div>' +
            '<div class="pdf_name">' +
            '<a href="{{videoUrl}}" target="_blank" target="_blank" title="{{videoUrl}}">{{videoUrl}}</a>' +
            '</div></div>' +
            '<div class="training pull-left" ng-repeat="file in files">' +
            '<div class="pdf_img">' +
            '<a href={{url}} target="_blank" ng-click="download(file)"><img ng-src="{{file.imageSrc}}" title="{{file.name}}"></a>' +
            '</div>' +
            '<div class="pdf_name">' +
            '<a href={{url}} target="_blank" ng-click="download(file)" title="{{file.name}}">{{file.name}}</a>' +
            '</div></div>' +
            '</div></div>' +
            '<div class="loadingImage" ng-hide="!loadingSessionDetailData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                },
                post: function ($scope) {
                    $scope.download = function (file) {
                        $scope.url = BAAS_SERVER + "/file/download?filekey=" + file.key + "&ask=" + ASK + "&osk=" + OSK;
                    }
                }
            }
        }
    }
}]);

/************************** All Assigned Training***************************************/
cstore.directive('allTrainingSessions', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left">' +
            '<div class="pop_products">All Trainings </div>' +
            '<div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="childSession in allTrainings">' +
            '<div class="name"><a href="#!/training-session?sessionid={{childSession._id}}">{{childSession.title}}</a></div>' +
            '<div class="short_product_details">{{childSession.description}}</div></div>' +
            '</div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!allTrainingData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialTrainingData(0);
                }
            }
        }
    }
}]);

cstore.directive('trainingCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">{{sessions[0].training_category_id.name}}</div>' +
            '<div class="promotions col-sm-3 col-md-3 pull-left" ng-repeat="session in sessions">' +
            '<div class="name"><a href="#!/training-session?sessionid={{session._id}}">{{session.title}}</a></div>' +
            '<div class="short_product_details">{{session.description}}</div></div></div></div><div id="scrollDiv"></div><div class="loadingImage" ng-hide="!categoryData.loadingData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);
/********************************Product Codes************************************************/
cstore.directive('typeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="qty_select" ng-model="productCode.type" ng-options="type for type in types"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    if (!$scope.productCode.type) {
                        $scope.productCode.type = $scope.types[0];
                    }
                }, post: function ($scope) {

                }
            }
        }
    }
}]);
cstore.directive('productCodeList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveProductCodes()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProductCodes()"><a href="">Delete</a>' +
            '</button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div class="prv_btn pull-right" ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor"><a href=>' +
            '<img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCodes.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Code</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'code\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'code\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Description</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div></span></th><th><span>Type</span><span class="sortWrap"><div class="sortUp" ng-click="setProductCodeOrder(\'type\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProductCodeOrder(\'type\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th>' +
            '</tr><tr ng-repeat="productCode in productCodes"><td><input type="checkbox" ng-model="productCode.deleteStatus" ng-show="productCode._id">' +
            '</td><td><span ng-hide="productCode.editStatus">{{productCode.code}}</span>' +
            '<input type="text" ng-show="productCode.editStatus" ng-model="productCode.code"></td><td>' +
            '<span ng-hide="productCode.editStatus">{{productCode.description}}</span><input type="text" ng-show="productCode.editStatus" ng-model="productCode.description"></td><td>' +
            '<span ng-hide="productCode.editStatus">{{productCode.type}}</span><type-select ng-show="productCode.editStatus"></type-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="productCode.editStatus=true;setProductCode(productCode)" ng-hide="productCode.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index,productCode._id)" ng-show="productCode.editStatus">Cancel</a></td></tr>' +
            '</table><div class="add_new"><a href ng-click="addNewProductCode()">' +
            '+ Click Here To Add New Product Code</a></div></div><div class="loadingImage" ng-hide="!loadingProductCodeData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.addNewProductCode = function () {
                        $scope.productCodes.push({ code: '', description: '', type: '' });
                        //for (var i = 0; i < $scope.countries.length; i++) {
                        $scope.productCodes[$scope.productCodes.length - 1]["editStatus"] = true;
                        //}
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllProductCodes(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteProductCodeArray = [];
                    var currentSession = $appService.getSession();
                    var usk = currentSession["usk"] ? currentSession["usk"] : null;
                    $scope.deleteProductCodes = function () {
                        for (var i = 0; i < $scope.productCodes.length; i++) {
                            if ($scope.productCodes[i].deleteStatus) {
                                $scope.deleteProductCodeArray.push({"_id": $scope.productCodes[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "product_codes__cstore";
                        query.operations = angular.copy($scope.deleteProductCodeArray);
                        $scope.deleteProductCodeArray = [];
                        if (query.operations.length) {

                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.productCodes.length; i++) {
                                        if ($scope.productCodes[i].deleteStatus) {
                                            $scope.productCodes.splice(i, 1);
                                            i--;
                                        }
                                    }

                                    $("#popupMessage").html("Deleted");
                                    $('.popup').toggle("slide");
                                } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                    $("#popupMessage").html("This record is referred in other table");
                                    $('.popup').toggle("slide");
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                            $("#popupMessage").html("Please select at least one product code before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                },
                post: function ($scope) {
                    var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                    $scope.remove = function (index, refreshProductCodeId) {
                        if (!$scope.productCodes[index]["oldstatus"]) {
                            $scope.productCodes.splice(index, 1);
                        }
                        else {
                            $scope.refreshProductCodes(index, refreshProductCodeId);
                        }
                    }
                    $scope.saveProductCodes = function () {
                        var savedindexes = [];
                        for (var j = $scope.productCodes.length - 1; j >= 0; j--) {
                            if (!$scope.productCodes[j]._id && !$scope.productCodes[j].code && !$scope.productCodes[j].description && !$scope.productCodes[j].type) {
                                $scope.states.splice(j, 1);
                            }
                        }
                        var productCodeList = $scope.productCodes.filter(function (el) {
                            if (!el._id && (el.code || el.description || el.type)) {
                                savedindexes.push($scope.productCodes.indexOf(el));
                            }
                            return el.editStatus == true;
                        });
                        for (var i = 0; i < productCodeList.length; i++) {
                            if (!productCodeList[i].code || !regNumberOnly.test(productCodeList[i].code)) {
                                $("#popupMessage").html("Please enter valid code");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!productCodeList[i].description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!productCodeList[i].type) {
                                $("#popupMessage").html("Please select type");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (productCodeList[i].type == "UPC" && productCodeList[i].code.length > 12) {
                                $("#popupMessage").html("Code for UPC can not be greater than 12 digits");
                                $('.popup').toggle("slide");
                                return false;
                            }
                        }
                        if (productCodeList && productCodeList.length > 0) {
                            $scope.loadingProductCodeData = true;
                            var query = {};
                            query.table = "product_codes__cstore";
                            query.operations = productCodeList;
                            $scope.addProductCodeArray = [];
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingProductCodeData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    for (var j = 0; j < savedindexes.length; j++) {
                                        $scope.productCodes[savedindexes[j]]._id = callBackData.response.insert[j]._id;
                                    }
                                    for (var i = 0; i < $scope.productCodes.length; i++) {
                                        $scope.productCodes[i]["editStatus"] = false;
                                    }
                                }
                                else if ((callBackData.response && callBackData.response.indexOf("Duplicate value for Unique columns") >= 0 ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.indexOf("Duplicate value for Unique columns") >= 0)) {
                                    $("#popupMessage").html("There is duplicate value for code");
                                    $('.popup').toggle("slide");
                                }
                                else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                        } else {
                            $("#popupMessage").html("No data found for saving");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.setProductCode = function (productcode) {
                        for (var i = 0; i < $scope.types.length; i++) {
                            if ($scope.types[i] == productcode.type) {
                                $scope.productCodes[i].type = $scope.types[i];
                                //productCode.type = $scope.types[i];
                                break;
                            }
                        }
                    }

                }
            }
        }
    }
}]);

cstore.directive('shoppingCart', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<th></th>' +
            '<th>Item</th>' +
            '<th>Item Price</th>' +
            '<th>Qty</th>' +
            '<th>Price</th>' +
            '</tr>' +
            '<tr ng-hide="shoppingCartProducts.length > 0"><td></td><td><div class="item">No POP is added to cart</div></td><td></td><td></td><td></td></tr>' +
            '<tr ng-show="shoppingCartProducts.length > 0" ng-repeat="cartProduct in shoppingCartProducts">' +
            '<td>{{$index+1}}</td>' +
            '<td>' +
            '<div class="item">' +
            '<div class="item_name">{{cartProduct.name}}</div>' +
            '<div class="item_remove" ng-click="removeFromCart(cartProduct)"><a href="">Remove</a></div>' +
            '</div>' +
            '</td>' +
            '<td class="item_price">{{cartProduct.cost.amount | currency}}</td>' +
            '<td class="qty_1"><select class="qty_select" ng-model="cartProduct.quantity" ng-options="quantity for quantity in shoppingCartData.quantity"></select></td>' +
            '<td class="item_price">{{cartProduct.quantity*cartProduct.cost.amount | currency}}</td>' +
            '</tr>' +
            '</table>' +
            '<div class="saved_last pull-right" ng-show="shoppingCartProducts.length > 0">' +
            '<div class="fix_price pull-right">' +
            '<div class="saved_1 col-sm-7 col-md-7 pull-left">' +
            '<div class="fix_height">Subtotal :</div>' +
            '<div class="fix_height">Shipping Charge :</div>' +
            '<div class="fix_height margin_top total_amount">Total :</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-5 col-md-5 pull-left">' +
            '<div class="fix_height text-right">{{getTotal() | currency}}</div>' +
            '<div class="fix_height text-right">{{shipping_charges}}</div>' +
            '<div class="fix_height margin_top text-right total_amount">{{getTotal() | currency}}</div>' +
            '</div>' +
            '</div>' +
            '<div class="add_delete pull-right">' +
            '<div class="add_btn pull-right"  ng-click="updatedOrder(\'billing-address\')">' +
            '<button type="button"><a href>Checkout</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-right">' +
            '<button type="button" ng-click="continueShoppingPath()"><a href>Continue Shopping</a></button>' +
            '</div></div></div></div>' +
            '<div class="loadingImage" ng-hide="!loadingShoppingCartData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.continueShoppingPath = function () {
                        window.location.href = "#!/";
                    }
                },
                post: function ($scope) {
                    $scope.getTotal = function () {
                        var total = 0;
                        for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                            var item = $scope.shoppingCartProducts[i];
                            total += item.quantity * item.cost.amount;
                        }
                        return total;
                    }
                    $scope.updatedOrder = function (path) {
                        $scope.loadingShoppingCartData = true;
                        $scope.updateShoppingCartProduct = {};
                        $scope.updateShoppingCartProduct["userid"] = {"_id": $scope.currentUser.data.userid};
                        $scope.updateShoppingCartProduct["product"] = $scope.shoppingCartProducts;
                        $scope.updateShoppingCartProduct["sub_total"] = $scope.getTotal();
                        $scope.updateShoppingCartProduct["total"] = {"amount": $scope.updateShoppingCartProduct["sub_total"], "type": {"currency": "usd"}};
                        $scope.updateShoppingCartProduct["__type__"] = "insertifnotexist";
                        var query = {};
                        query.table = "shopping_cart__cstore";
                        query.operations = [$scope.updateShoppingCartProduct];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.loadingShoppingCartData = false;
                                //$("#popupMessage").html("Products are updated");
                                //$('.popup').toggle("slide");
                                window.location.href = "#!/" + path;
                                //$scope.cartProducts.length++;
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
                }
            }
        }
    }
}]);

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
            '<div class="delete_btn pull-left"><button type="button" ng-click="saveOrder(cartData)"><a href="">Payment</a></button></div>' +
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
                    $scope.checkoutParameters = {};
                   function checkoutParameters(serviceName, merchantID, options) {
                        this.serviceName = serviceName;
                        this.merchantID = merchantID;
                        this.options = options;
                    }
                    $scope.addCheckoutParameters = function (serviceName, merchantID, options) {

                        // check parameters
                        if (serviceName != "PayPal" && serviceName != "Google") {
                            throw "serviceName must be 'PayPal' or 'Google'.";
                        }
                        if (merchantID == null) {
                            throw "A merchantID is required in order to checkout.";
                        }

                        // save parameters
                        $scope.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
                    }
                    $scope.addCheckoutParameters("PayPal", "bernardo.castilho-facilitator@gmail.com");
                    $scope.checkout = function (serviceName, clearCart) {

                        // select serviceName if we have to
                        if (serviceName == null) {
                            var p = $scope.checkoutParameters[Object.keys($scope.checkoutParameters)[0]];
                            serviceName = p.serviceName;
                        }

                        // sanity
                        if (serviceName == null) {
                            throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
                        }

                        // go to work
                        var parms = $scope.checkoutParameters[serviceName];
                        if (parms == null) {
                            throw "Cannot get checkout parameters for '" + serviceName + "'.";
                        }
                        switch (parms.serviceName) {
                            case "PayPal":
                                $scope.checkoutPayPal(parms, clearCart);
                                break;
                            case "Google":
                                this.checkoutGoogle(parms, clearCart);
                                break;
                            default:
                                throw "Unknown checkout service: " + parms.serviceName;
                        }
                    }
                    $scope.checkoutPayPal = function (parms, clearCart) {

                        // global data
                        var data = {
                            cmd: "_cart",
                            business: parms.merchantID,
                            upload: "1",
                            rm: "2",
                            charset: "utf-8"
                        };

                        // item data
                        for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                            var item = $scope.shoppingCartProducts[i];
                            var ctr = i + 1;
                            //data["item_number_" + ctr] = item.sku;
                            data["item_name_" + ctr] = item.name;
                            data["quantity_" + ctr] = item.quantity;
                            data["amount_" + ctr] = item.cost.amount;
                        }

                        // build form
                        var form = $('<form/></form>');
                        form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
                        form.attr("method", "POST");
                        form.attr("style", "display:none;");
                        $scope.addFormFields(form, data);
                        $scope.addFormFields(form, parms.options);
                        $("body").append(form);

                        // submit form
                        this.clearCart = clearCart == null || clearCart;
                        form.submit();
                        form.remove();
                    }
                    $scope.addFormFields = function (form, data) {
                        if (data != null) {
                            $.each(data, function (name, value) {
                                if (value != null) {
                                    var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                                    form.append(input);
                                }
                            });
                        }
                    }
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
                            $scope.billingdata["shipping_addresss"]["address_2"] = cart.shipping_address.address_2 ? cart.shipping_address.address_2 : "";
                            $scope.billingdata["shipping_address"]["zipcode"] = cart.shipping_address.zipcode ? cart.shipping_address.zipcode : "";
                            $scope.billingdata["shipping_address"]["phone"] = cart.shipping_address.phone ? cart.shipping_address.phone : "";
                            $scope.billingdata["shipping_address"]["email"] = cart.shipping_address.email ? cart.shipping_address.email : "";
                            if (cart.shipping_address.country) {
                                $scope.getEditCountries(cart.shipping_address.country._id, cart.shipping_address.state._id, cart.shipping_address.city._id, $scope.storedata);
                            }
                        }
                        $scope.setPathForOrder('billing-address?q=setBackData');
                    }
                    $scope.saveOrder = function (cart) {
                        var order_date = new Date();
                        $scope.loadingShoppingCartData = true;
                        $scope.newOrder = {};
                        $scope.newOrder["bill_address"] = {};
                        $scope.newOrder["userid"] = {};
                        $scope.newOrder["shipping_address"] = {};
                        $scope.newOrder["product"] = [
                            {"name": "", "cost": "", "quantity": ""}
                        ];
                        $scope.newOrder["userid"] = {"_id":$scope.currentUser.data.userid,"username": $scope.currentUser.data.username};
                        $scope.newOrder["storeid"] = {"_id":$scope.currentUser.data.storeid};
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
                        var query = {};
                        query.table = "orders__cstore";
                        query.operations = [$scope.newOrder];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.updatePopSoldCount(cart,cart.product);
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
                    $scope.removeCart = function (cart) {
                        $scope.removeShoppingCart = {};
                        $scope.removeShoppingCart["_id"] = cart._id;
                        $scope.removeShoppingCart["__type__"] = "delete";
                        var query = {};
                        query.table = "shopping_cart__cstore";
                        query.operations = [$scope.removeShoppingCart];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {

                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                if (cart.product.length > 0) {
                                    $scope.cartProducts.length = $scope.cartProducts.length - cart.product.length;
                                    for (var i = 0; i < $scope.shoppingCartProducts.length; i++) {
                                        //if ($scope.shoppingCartProducts[i]._id == product._id) {
                                        $scope.shoppingCartProducts.splice(i, cart.product.length);
                                        i--;
                                        //}
                                    }
                                }
                                //$scope.setPathForOrder('payment');
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
                    $scope.updatePopSoldCount = function (cart,pop) {
                        var popList = [
                            {"_id": "", "soldcount": ""}
                        ];
                        popList = pop.filter(function (el) {
                            if (el._id) {
                                return el;
                            }
                        });
                        for (var i = 0; i < popList.length; i++) {
                            popList[i] = {"_id": popList[i].popid, "$inc": {"soldcount": popList[i].quantity}};
                        }
                        var query = {};
                        query.table = "products__cstore";
                        query.operations = popList;
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            $scope.loadingShoppingCartData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.removeCart(cart);
                                console.log("Done");
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

/*********************All Survey****************************************/
cstore.directive('allAssignedSurveys', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div><div class="survey_all">' +
            '<div class="survey_form pull-left" ng-repeat="assignedSurvey in allAssignedSurveys">' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Title</div>' +
            '<div class="survey_right pull-right">{{assignedSurvey.title}}</div></div>' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Description</div>' +
            '<div class="survey_right pull-right">{{assignedSurvey.description}}</div></div>' +
            '<div class="more_btn pull-right"><a href="#!/survey?surveyid={{assignedSurvey._id}}">More>></a></div>' +
            '</div>' +
            '<div id="scrollDiv"></div>' +
            '<div class="loadingImage" ng-hide="!assignedSurveyData.loadingData"><img src="images/loading.gif"></div>' +
            '</div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.getInitialSurveyData(0);
                }
            }
        }
    }
}]);
/************************* Survey Detail****************************/
cstore.directive('surveyDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div>'+
            '<div class="survey_all" ng-repeat="survey in surveys">' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Title</div>' +
            '<div class="survey_right pull-right">{{survey.title}}</div></div>' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Description</div>' +
            '<div class="survey_right pull-right">{{survey.description}}</div></div>' +
            '<div class="clear"></div>' +
            '<div class="survey_form pull-left">' +
            '<div class="survey_title">Please complete the following Questions regarding your experiences with us.</div>' +
            '<div class="survey_dic pull-left" ng-repeat="surveyQuestion in survey.surveyQuestions">' +
            '<div class="survey_que pull-left">{{surveyQuestion.question}}</div>' +
            '<div class="survey_ans pull-right">' +
            '<form action ng-if="surveyQuestion.survey_type==\'radio\'">' +
            '<div ng-repeat="option in surveyQuestion.options">' +
            '<input type="radio" name="option" value="{{option.optionVal}}" ng-model="surveyQuestion.radioAns"/> {{option.optionVal}}</div></form>' +
            '<form action ng-if="surveyQuestion.survey_type==\'checkbox\'">' +
            '<div ng-repeat="option in surveyQuestion.options">' +
            '<input type="checkbox" value="{{option.optionVal}}" ng-model="option.optionStatus"/> {{option.optionVal}}</div></form>' +
            '<textarea ng-if="surveyQuestion.survey_type==\'subjective\'" ng-model="surveyQuestion.answer" ></textarea></div>' +
            '</div>' +
            '<div class="add_delete pull-right"><div class="add_btn pull-right"><button type="button" ng-click="clearSubmittedSurvey(survey._id)"><a href="">Cancel</a></button></div><div class="delete_btn pull-right">' +
            '<button type="button" ng-click="submitSurvey(survey)"><a href="">Submit</a></button></div></div>' +
            '</div>' +
            '</div>'+
            '<div class="loadingImage" ng-hide="!loadingSurveyDetailData"><img src="images/loading.gif"></div>'+
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {

                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    $scope.submitSurvey = function (survey) {
                        if ($scope.CSession) {
                            $scope.loadingSurveyDetailData = true;
                            var query = {};
                            $scope.newSurveyAnswer = {};
                            $scope.newSurveyAnswer["answers"] = {};
                            query.table = "answered_survey__cstore";
                            $scope.newSurveyAnswer["survey_id"] = {"_id": survey._id};
                            $scope.newSurveyAnswer["store_id"] = {"_id": $scope.currentUser.data.storeid};
                            for(var tempid=0; tempid <$scope.surveys.length;tempid++){
                                if($scope.surveys[tempid]._id==survey._id){
                                    for (var i = 0; i < $scope.surveys[tempid].surveyQuestions.length; i++) {
                                        if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "radio") {
                                            //for (j = 0; j < $scope.surveyQuestions[i].options.length; j++){

                                            $scope.newSurveyAnswer["answers"][i] = $scope.surveys[tempid].surveyQuestions[i].radioAns;
                                            //}
                                        }
                                        else if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "checkbox") {
                                            var temp = [];
                                            for (var j = 0; j < $scope.surveys[tempid].surveyQuestions[i].options.length; j++) {
                                                if ($scope.surveys[tempid].surveyQuestions[i].options[j].optionStatus) {
                                                    temp.push($scope.surveys[tempid].surveyQuestions[i].options[j].optionVal);

                                                }
                                            }
                                            $scope.newSurveyAnswer["answers"][i] = temp;
                                        }
                                        else {
                                            $scope.newSurveyAnswer["answers"][i] = $scope.surveys[tempid].surveyQuestions[i].answer;
                                        }
                                    }
                                    break;
                                }
                            }
                            query.operations = [$scope.newSurveyAnswer];
                            console.log(JSON.stringify(query));
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $scope.changeStatusOfSurvey(survey);
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                    $scope.loadingSurveyDetailData = false;
                                }
                                else {
                                    $("#popupMessage").html("some error while submitting survey");
                                    $('.popup').toggle("slide");
                                    $scope.loadingSurveyDetailData = false;
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                                $scope.loadingSurveyDetailData = false;
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                            $scope.loadingSurveyDetailData = false;
                        }
                    }
                    $scope.changeStatusOfSurvey = function (survey) {
                        if ($scope.CSession) {
                            var query = {};
                            $scope.newSurveyStatus = {};
                            $scope.newSurveyStatus["store_manager_id"] = {};
                            query.table = "surveys__cstore";
                            $scope.newSurveyStatus["_id"] = survey._id;
                            var storeArray = [];
                                    var statusObj = {"_id": "", "status":"","__type__":""};
                                    statusObj._id=$scope.currentUser.data.storeid;
                                    statusObj.status="answered";
                                    statusObj.__type__="update";
                                    storeArray.push(statusObj);
                            $scope.newSurveyStatus.store_manager_id=storeArray;
                            query.operations = [$scope.newSurveyStatus];
                            console.log(JSON.stringify(query));
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingSurveyDetailData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Submitted");
                                    $('.popup').toggle("slide");
                                    for (var i = 0; i < $scope.surveys.length; i++) {
                                        if ($scope.surveys[i]._id == survey._id) {
                                            $scope.surveys.splice(i, 1);
                                            i--;
                                        }
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while submitting survey");
                                    $('.popup').toggle("slide");
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.clearSubmittedSurvey = function (surveyid) {
                        for (var tempid = 0; tempid < $scope.surveys.length; tempid++) {
                            if ($scope.surveys[tempid]._id == surveyid) {
                                for (i = 0; i < $scope.surveys[tempid].surveyQuestions.length; i++) {
                                    if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "radio") {

                                        $scope.surveys[tempid].surveyQuestions[i].radioAns = false;

                                    }
                                    else if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "checkbox") {
                                        for (j = 0; j < $scope.surveys[tempid].surveyQuestions[i].options.length; j++) {
                                            $scope.surveys[tempid].surveyQuestions[i].options[j].optionStatus = false;
                                        }
                                    }
                                    else {
                                        $scope.surveys[tempid].surveyQuestions[i].answer = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}]);

cstore.directive('payment', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="admin_menu pull-left"><div class="billing_info pull-left">Shipping Address</div>' +
            '<div class="billing_info pull-left">Order</div>' +
            '<div class="billing_info active_1 pull-left">Payment</div></div>' +
            '<div class="cstore_payment pull-left">' +
            '<div class="cstore-payment-content-left"><div class="cstore-payment-button pull-left">' +
            '<ul>' +
            '<li class="option_selector_cc"><a href="javascript:void(0);" onclick="show_payment_option(\'cc\');">Credit/Debit Card</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="hlpydt pu_cnt" style="display: block;">' +
            '<div class="hccwrp">' +
            '<div class="storedCC" style="display: none;">' +
            '<span>Choose from Saved Card(s)</span>' +
            '<div class="hcctb"><a class="hcctbat" href="javascript:void(0);" style="display: none;">Remove Card</a></div>' +
            '<div class="hysv">' +
            '<div class="hvs">' +
            '<select class="CCstore" style="background-color: #fff;">' +
            '<option value="0">New Card</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="cart-container">' +
            '<div class="pu_cnt dn" style="display: none;"></div>' +
            '<ul class="we-accept-cards cards CC">' +
            '<li class="visa on pull-right" style="background-position-y: 0px;"></li>' +
            '<li class="amex on pull-right" style="background-position-y: 0px;"></li>' +
            '<li class="mastercard on pull-right" style="background-position-y: 0px;"></li>' +
            '<li class="maestro on pull-right" style="background-position-y: 0px;"></li>' +
            '<li class="diners on pull-right" style="background-position-y: 0px;"></li>' +
            '</ul>' +
            '<div class="hlno"><input class="CCnum" tabindex="2" type="text" placeholder="Card Number" ng-model="card_num"></div>' +
            '<div class="hlnmcrd"><input class="CCname" tabindex="3" type="text" placeholder="Name on the card" ng-model="card_name">' +
            '<span class="hlcvc"><input class="CCcvv pull-right" maxlength="3" tabindex="6" type="text" placeholder="CVV" ng-model="cvv"></span></div>' +
            '<div class="hlexp">' +
            '<span>' +
            '<select class="htflb htdar" tabindex="4" ng-model="expiry_month">' +
            '<option>Month</option>' +
            '<option value="01">01</option>' +
            '<option value="02">02</option>' +
            '<option value="03">03</option>' +
            '<option value="04">04</option>' +
            '<option value="05">05</option>' +
            '<option value="06">06</option>' +
            '<option value="07">07</option>' +
            '<option value="08">08</option>' +
            '<option value="09">09</option>' +
            '<option value="10">10</option>' +
            '<option value="11">11</option>' +
            '<option value="12">12</option>' +
            '</select>' +
            '</span>' +
            '<span>' +
            '<select class="htflb htdar" tabindex="5" ng-model="expiry_year">' +
            '<option>Year</option>' +
            '<option value="2012">2012</option>' +
            '<option value="2013">2013</option>' +
            '<option value="2014">2014</option>' +
            '<option value="2015">2015</option>' +
            '<option value="2016">2016</option>' +
            '<option value="2017">2017</option>' +
            '<option value="2018">2018</option>' +
            '<option value="2019">2019</option>' +
            '<option value="2020">2020</option>' +
            '<option value="2021">2021</option>' +
            '<option value="2022">2022</option>' +
            '<option value="2023">2023</option>' +
            '<option value="2024">2024</option>' +
            '<option value="2025">2025</option>' +
            '<option value="2026">2026</option>' +
            '<option value="2027">2027</option>' +
            '<option value="2028">2028</option>' +
            '<option value="2029">2029</option>' +
            '<option value="2030">2030</option>' +
            '<option value="2031">2031</option>' +
            '<option value="2032">2032</option>' +
            '<option value="2033">2033</option>' +
            '<option value="2034">2034</option>' +
            '<option value="2035">2035</option>' +
            '<option value="2036">2036</option>' +
            '</select>' +
            '<div class="saveCardBarCC" style="display: block; clear: both; font-size: 14px;">' +
            '<span class="checked"></span> <input class="storeCardFlagCC" name="store-card" type="checkbox"> Save this card for faster checkout (100% Secure)</div>' +
            '<div class="hlmkpy"><input class="payment1" type="submit" value="Proceed Securely" ng-click="send_payment()"></div>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="amount_details pull-right">' +
            '<div class="saved_address">Amount Detail :</div>' +
            '<div class="saved_1 col-sm-7 col-md-7 pull-left">' +
            '<div class="fix_height">Subtotal :</div>' +
            '<div class="fix_height">Shipping Charge :</div>' +
            '<div class="fix_height">Shipping Discount :</div>' +
            '<div class="fix_height">GV Discount :</div>' +
            '<div class="fix_height total_amount  margin_top">Total :</div>' +
            '</div>' +
            '<div class="saved_1 col-sm-5 col-md-5 pull-left">' +
            '<div class="fix_height text-right"> {{cartdata.subtotal | currency}}</div>' +
            '<div class="fix_height text-right">{{cartdata.shipping_charges | currency}}</div>' +
            '<div class="fix_height text-right">0</div>' +
            '<div class="fix_height text-right">0</div>' +
            '<div class="fix_height margin_top total_amount  text-right">{{cartdata.total | currency}}</div>' +
            '</div>' +
            '<div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                },
                post: function ($scope) {
                    $scope.send_payment = function () {
                        var payment_details = {
                            "intent": "sale",
                            "payer": {
                                "payment_method": "credit_card",
                                "funding_instruments": [
                                    {
                                        "credit_card": {
                                            "type": "visa",
                                            "number": "4417119669820331",
                                            "expire_month": "11",
                                            "expire_year": "2018",
                                            "cvv2": "123",
                                            "first_name": "Joe",
                                            "last_name": "Shopper",
                                            "billing_address": {
                                                "line1": "52 N Main ST",
                                                "city": "Johnstown",
                                                "state": "OH",
                                                "postal_code": "43210",
                                                "country_code": "US"
                                            }
                                        }
                                    }
                                ]
                            },
                            "transactions": [
                                {
                                    "amount": {
                                        "total": "100",
                                        "currency": "USD",
                                        "details": {
                                            "subtotal": "100",
                                            "tax": "0.00",
                                            "shipping": "0.00"}},
                                    "description": "This is the payment transaction description." }
                            ]};
                        var config_options = {
                            'mode': 'sandbox',
                            'schema': 'https',
                            'host': 'api.sandbox.paypal.com',
                            'port': '',
                            'openid_connect_schema': 'https',
                            'openid_connect_host': 'api.sandbox.paypal.com',
                            'openid_connect_port': '',
                            'authorize_url': 'https://www.sandbox.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize',
                            'logout_url': 'https://www.sandbox.paypal.com/webapps/auth/protocol/openidconnect/v1/endsession',
                            'headers': {}
                        };
                        paypal_sdk.payment.create(payment_details, config_options, function (error, payment) {
                            if (error) {
                                console.error(error);
                            } else {
                                console.error(payment);
                            }
                        });
                    }
                }
            }
        }
    }
}]);

/*******************************************Program*********************************************************/
cstore.directive('programList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPathForProgram(\'add-program\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProgram()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + programs.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Program Name</span><span class="sortWrap"><div class="sortUp" ng-click="setProgramOrder(\'name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProgramOrder(\'name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Image<span class="sortWrap"><div class="sortUp" ng-click="setProgramOrder(\'image.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProgramOrder(\'image.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th></tr><tr ng-repeat="program in programs"><td>' +
            '<input type="checkbox" ng-model="program.deleteStatus"></td><td>{{program.name}}</td><td>{{program.image[0].name}}</td>' +
            '<td><a class="edit_btn" ng-click="setProgramState(program)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingProgramData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPathForProgram = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllPrograms(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteProgramArray = [];
                    $scope.deleteProgram = function () {
                        for (var i = 0; i < $scope.programs.length; i++) {
                            if ($scope.programs[i].deleteStatus) {
                                $scope.deleteProgramArray.push({"_id": $scope.programs[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "program__cstore";
                        query.operations = angular.copy($scope.deleteProgramArray);
                        $scope.deleteProgramArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.programs.length; i++) {
                                    if ($scope.programs[i].deleteStatus) {
                                        $scope.programs.splice(i, 1);
                                        i--;
                                    }
                                }
                                $("#popupMessage").html("Deleted");
                                $('.popup').toggle("slide");
                            } else if ((callBackData.response && callBackData.response.substring(0, 29) == "Opertion can not be processed" ) || (callBackData.responseText && JSON.parse(callBackData.responseText).response.substring(0, 29) == "Opertion can not be processed")) {
                                $("#popupMessage").html("This record is referred in another table");
                                $('.popup').toggle("slide");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
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
                    $scope.setProgramState = function (program) {
                        $scope.programdata["name"] = program.name ? program.name : "";
                        if (program.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(program.image, false);

                        window.location.href = "#!edit-program?q=" + program._id;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            }
        }
    }
}]);

cstore.directive('addProgram', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Name*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="programdata.name"></td>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="save_close pull-left">' +
            '<div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveProgram()"><a href>Save</a></button>' +
            '</div>' +
            '<div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforProgram(\'programs\')"><a href>Close</a></button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div class="loadingImage" ng-hide="!loadingAddProgramData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.newProgram = {};
                    $scope.setPathforProgram = function (path) {
                        $scope.clearProgramContent();
                        window.location.href = "#!/" + path;
                    }

                },
                post: function ($scope) {
                    $scope.saveProgram = function () {
                        var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.programdata.name) {
                                $("#popupMessage").html("Please enter program name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingAddProgramData = true;
                            var query = {};
                            query.table = "program__cstore";
                            if ($scope.programdata["programid"]) {
                                $scope.newProgram["_id"] = $scope.programdata["programid"];
                            }
                            $scope.newProgram["name"] = $scope.programdata.name;
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newProgram["image"];
                                query.operations = [$scope.newProgram];
                                $scope.saveFunction(query);
                            }
                            else {
                                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($scope.oFile.name)) {
                                    var current_file = {};
                                    current_file.name = $scope.oFile.name;
                                    current_file.type = $scope.oFile.type;
                                    current_file.contents = $scope.oFile.data;
                                    current_file.ask = ASK;
                                    current_file.osk = OSK;
                                    $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                        if (data.response) {
                                            $scope.newProgram["image"] = data.response;
                                            query.operations = [$scope.newProgram];
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
                                else {
                                    $("#popupMessage").html("Please Upload Image File only");
                                    $('.popup').toggle("slide");
                                }
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }

                    };

                    $scope.saveFunction = function (query) {
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingAddProgramData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforProgram("programs");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving program");
                                $('.popup').toggle("slide");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
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

/*********************************Order View**************************************/
cstore.directive('orderStatusSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="status_select" ng-model="order.status" ng-options="status for status in status"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                    /*for (var i = 0; i < $scope.orderStatus.length; i++) {
                        if ($scope.orderStatus[i] == $scope.order.status) {
                            $scope.orders[i].status = $scope.orderStatus[i];
                            break;
                        }
                    } */
                    //console.log($scope.order.status);
                    //$scope.xyz=$scope.order.status;
                }, post: function ($scope) {

                }
            }
        }
    }
}]);
cstore.directive('orderList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div>'+
            '<div class="pull-left order_date_filter"><input type="text" ng-model="orderFilterData.start_date" placeholder="Start Date" jqdatepicker><input type="text" placeholder="End Date" ng-model="orderFilterData.end_date" jqdatepicker>' +
            '<button ng-click="orderDateFilter()">Filter</button><button ng-click="printPreview()">Print Preview</button></div><div ng-click="getMore(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + orders.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
            '<th>POP</th><th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'storeid.storename\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div><div class="sortDown" ng-click="sortOrder(\'storeid.storename\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div>	</span></th>' +
            '<th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Program </span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'storeid.programid.name\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div><div class="sortDown" ng-click="sortOrder(\'storeid.programid.name\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div>	</span></th>' +
            '<th>Total<span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'total\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div><div class="sortDown" ng-click="sortOrder(\'total\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div>	</span></th><th><span>Order Date</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'order_date\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div>' +
            '<div class="sortDown" ng-click="sortOrder(\'order_date\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div>	</span></th>' +
            '<th><span>Status</span><span class="sortWrap"><div class="sortUp" ng-click="sortOrder(\'status\',\'asc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div><div class="sortDown" ng-click="sortOrder(\'status\',\'desc\',searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)"></div></span></th><th></th></tr><tr ng-repeat="order in orders">' +
            '<td><table class="ordered_products"><tr class="ordered_pop_name" ng-show="$index==0"><td class="ordered_pop">Name</td><td class="ordered_pop">Price</td><td class="ordered_pop">Qty</td></tr>' +
            '<tr ng-repeat="pop in order.product | limitTo:3"><td class="ordered_pop pop_name">{{pop.name}}</td><td class="ordered_pop">{{pop.cost.amount}}</td><td class="ordered_pop">{{pop.quantity}}</td></tr></table></td><td ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
            '{{order.storeid.storename}}</td><td ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
            '{{order.storeid.programid.name}}</td><td>{{order.total.amount | currency}}</td><td>{{order.order_date}}</td><td><span ng-if="currentUser.data.roleid == \'531d4aa0bd1515ea1a9bbaf6\'">{{order.status}}</span><order-status-select ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"></order-status-select></td>' +
            '<td><a class="edit_btn" ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'" ng-click="updateStatusOfOrder(order)" href>Change Status</a><a class="edit_btn" ng-click="setPath(order._id)" href>View Detail</a></td></tr></table>' +
            '</div><div class="loadingImage" ng-hide="!loadingOrderData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (orderid) {
                        window.location.href = "#!/order-detail?orderid=" + orderid;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrders(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.orderDateFilter = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrders(1, 10, null, null,$scope.orderFilterData.start_date,$scope.orderFilterData.end_date);

                    }
                    $scope.printPreview=function(){
                        console.log($scope.orderFilterData.start_date+ "hdgvchjgdhsjhbnbx"+$scope.orderFilterData.end_date);

                        var query = {"table": "orders__cstore"};
                        query.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
                        query.filter = {};
                        if ($scope.currentUser["data"]) {
                            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                                query.filter["storeid._id"] = $scope.currentUser["data"]["storeid"];
                            }
                        }
                        if ($scope.orderFilterData.start_date && $scope.orderFilterData.start_date != "" && $scope.orderFilterData.end_date && $scope.orderFilterData.end_date != "") {
                            query.filter["order_date"] = {"$gte":$scope.orderFilterData.start_date,"$lte": $scope.orderFilterData.end_date};
                        }
                        var timeZone = new Date().getTimezoneOffset();
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (orderData) {
                            $scope.loadingOrderData = false;
                            $scope.download.orders = orderData.response.data;
                            window.location.href = "#!/print-preview";
                            $scope.clearOrderContent();
                        }, function (jqxhr, error) {
                            $("#popupMessage").html(error);
                            $('.popup').toggle("slide");
                        })
                    }
                    $scope.updateStatusOfOrder = function (order) {
                        $scope.loadingOrderData = true;
                        $scope.updateOrderStatus = {};
                        $scope.updateOrderStatus["_id"] =order._id;
                        $scope.updateOrderStatus["status"] = order.status;
                        var query = {};
                        query.table = "orders__cstore";
                        query.operations = [$scope.updateOrderStatus];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            $scope.loadingOrderData=false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                //$scope.getAllOrders(1, 10);
                                $("#popupMessage").html("Update Order Status");
                                $('.popup').toggle("slide");
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
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                },
                post:function($scope){

                }
            }
        }
    }
}]);

cstore.directive('printPreviewOrders', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left"><button ng-click="exportFunction()">Export</button>' +
            '<button ng-click="printDiv(\'printableOrders\')">Print</button>' +
            '' +
            '</div><div id="printableOrders" class="table pull-left">' +
            '<table id="testTable" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
            '<th>POP</th><th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Site Name</span></th>' +
            '<th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Program </span></th>' +
            '<th>Total</th><th><span>Order Date</span></th>' +
            '<th><span>Status</span></th></tr><tr ng-repeat="order in download.orders">' +
            '<td><table class="ordered_products"><tr class="ordered_pop_name" ng-show="$index==0"><td class="ordered_pop">Name</td><td class="ordered_pop">Price</td><td class="ordered_pop">Qty</td></tr>' +
            '<tr ng-repeat="pop in order.product"><td class="ordered_pop pop_name">{{pop.name}}</td><td class="ordered_pop">{{pop.cost.amount}}</td><td class="ordered_pop">{{pop.quantity}}</td></tr></table></td><td ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
            '{{order.storeid.storename}}</td><td  ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
            '{{order.storeid.programid.name}}</td><td>{{order.total.amount | currency}}</td><td>{{order.order_date}}</td><td>{{order.status}}</td>' +
            '</tr></table>' +
            '</div><div class="loadingImage" ng-hide="!loadingOrderData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                },
                post:function($scope){
                    $scope.exportData = function (divId) {
                        var blob = new Blob([document.getElementById(divId).innerHTML], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        saveAs(blob, "Report.xls");
                    };
                    $scope.printDiv = function(divName) {
                        var printContents = document.getElementById(divName).innerHTML;
                        var originalContents = document.body.innerHTML;
                        var popupWin = window.open('', '_blank', 'width=300,height=300');
                        popupWin.document.open()
                        popupWin.document.write('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><link rel="stylesheet" type="text/css" href="custom.css" /></head><body onload="window.print()"><table>' + printContents + '</table></body></html>');
                        popupWin.document.close();
                    }
                }
            }
        }
    }
}]);

cstore.directive('orderDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table_4 pull-left">' +
            '<div class="store_program pull-left" ng-show="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'" >' +
            '<div><b>Site Name</b> :{{orderData.storeid.storename}}</div>' +
            '<div><b>Manager Name</b> :{{savedAddressData.manager.name}}</div>' +
            '<div><b>Program Name</b> : {{savedAddressData.programid.name}}</div>' +
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
            '<tr ng-repeat="orderedProduct in orderedProducts">' +
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
            '<div class="fix_height text-right">{{orderData.sub_total | currency}}</div>' +
            '<div class="fix_height text-right">{{ordered_shipping_charges}}</div>' +
            '<div class="fix_height margin_top text-right total_amount">{{orderData.total.amount | currency}}</div>' +
            '</div>' +
            '</div>' +
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
            '<div class="fix_height">{{savedOrderBillingAddress.firstname}} {{savedOrderBillingAddress.lastname}}</div>' +
            '<div class="address fix_height">{{savedOrderBillingAddress.address}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.city.name}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.state.name}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.zipcode}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.phone}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.ext}}</div>' +
            '<div class="fix_height">{{savedOrderBillingAddress.email}}</div>' +
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
            '<div class="fix_height">{{savedOrderShippingAddress.firstname}} {{savedOrderShippingAddress.lastname}}</div>' +
            '<div class="address fix_height">{{savedOrderShippingAddress.address}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.city.name}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.state.name}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.zipcode}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.phone}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.ext}}</div>' +
            '<div class="fix_height">{{savedOrderShippingAddress.email}}</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div>' +
            '</div>',
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

cstore.directive('contactPage', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="table_4 pull-left">' +
            '<div class="saved_r_bar col-sm-7 col-md-7">' +
            '<div class="saved_address">Contact Us</div>' +
            '<table width="100%" border="0" cellspac1ing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Name*</div></td>' +
            '<td><div class="margin_top">Company Name*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="contact.name"></td>' +
            '<td><input type="text" placeholder="" ng-model="contact.company_name"></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">Email*</div></td>' +
            '<td><div class="margin_top"># of Stores*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="text" placeholder="" ng-model="contact.email"></td>' +
            '<td><input type="text" placeholder="" ng-model="contact.siteid"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Address</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="text_area"><textarea ng-model="contact.address"></textarea></td>' +
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
            '<td class="half_td"><input type="text" placeholder="" ng-model="contact.zipcode"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Phone*</div></td>' +
            '<td class="half_td"><div class="margin_top">Extension</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="contact.phone"></td>' +
            '<td class="half_td"><input type="text" placeholder=""ng-model="contact.extension"></td>' +
            '</tr>' +
            '</table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td><div class="margin_top">Notes*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="notes"><textarea ng-model="contact.notes"></textarea></td>' +
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
                        if ($scope.CSession) {
                            $scope.newContact = {};
                            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            var regNumberOnly = /^[+]?\d[0-9\-]*$/;
                            var email = $scope.contact.email;
                            if (!$scope.contact.name) {
                                $("#popupMessage").html("Please enter name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.company_name) {
                                $("#popupMessage").html("Please enter company name");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!email || regEmail.test(email) == false) {
                                $("#popupMessage").html("Please enter a valid email id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.siteid) {
                                $("#popupMessage").html("Please enter # of store");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.data.selectedCountry) {
                                $("#popupMessage").html("Please select country first");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.data.selectedState) {
                                $("#popupMessage").html("Please select state first");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.data.selectedCity) {
                                $("#popupMessage").html("Please select city first");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.zipcode || !regNumberOnly.test($scope.contact.zipcode)) {
                                $("#popupMessage").html("Please enter correct zipcode");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.phone || !regNumberOnly.test($scope.contact.phone)) {
                                $("#popupMessage").html("Please enter correct contact");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.contact.notes) {
                                $("#popupMessage").html("Please enter notes");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            $scope.loadingAddContactData = true;
                            $scope.newContact["name"] = $scope.contact.name;
                            $scope.newContact["company_name"] = $scope.contact.company_name;
                            $scope.newContact["email"] = $scope.contact.email;
                            $scope.newContact["siteid"] = $scope.contact.siteid;
                            $scope.newContact["address"] = $scope.contact.address;
                            $scope.newContact["zipcode"] = $scope.contact.zipcode;
                            $scope.newContact["phone"] = $scope.contact.phone;
                            $scope.newContact["extension"] = $scope.contact.extension;
                            $scope.newContact["notes"] = $scope.contact.notes;
                            if ($scope.data.selectedCountry && $scope.data.selectedCountry != null && $scope.data.selectedCountry != undefined && $scope.data.selectedCountry != "undefined" && $scope.data.selectedCountry != "null") {
                                $scope.newContact["country"] = {"_id": $scope.data.selectedCountry._id, "name": $scope.data.selectedCountry.name}
                            }
                            if ($scope.data.selectedCity && $scope.data.selectedCity != null && $scope.data.selectedCity != undefined && $scope.data.selectedCity != "undefined" && $scope.data.selectedCity != "null") {
                                $scope.newContact["city"] = {"_id": $scope.data.selectedCity._id, "name": $scope.data.selectedCity.name}
                            }
                            if ($scope.data.selectedState && $scope.data.selectedState != null && $scope.data.selectedState != undefined && $scope.data.selectedState != "undefined" && $scope.data.selectedState != "null") {
                                $scope.newContact["state"] = {"_id": $scope.data.selectedState._id, "name": $scope.data.selectedState.name}
                            }
                            var query = {};
                            query.table = "contact__cstore";
                            query.operations = [$scope.newContact];
                            $appService.save(query, ASK, OSK,$scope.CSession["usk"], function (callBackData) {
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
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }
                }
            }
        }
    }
}]);
