cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="header"><div ng-show="displayData.options" id="cm"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown"><div class="logo"><img src="images/logo.jpg">' +

            '</div><store-header ng-show="displayData.cart"></store-header><div  class="logo1"><img src="images/logo.jpg"></div><div class="username"><div ng-show="displayData.loggedIn" class="user">{{currentUser.data.firstname}}</div>' +
            '<div ng-show="displayData.loggedIn" id="my_profile"><img src="images/logout.png"><div class="signOut" id="sign_out" ">' +

            '<ul><li class="active"><a href>Profile</a></li><li><a href>Change Password</a></li><li><a ng-click="logOut()">' +
            'Sign Out</a></li></ul></div></div></div></div>' +
            '<drop-down ng-show="displayData.options"></drop-down><admin-menu ng-show="displayData.menu"></admin-menu></div>'
    }
}]);
cstore.directive('adminMenu', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="admin_menu"><ul><li><a href>Vendor</a></li><li><a href>Store Manager</a></li>' +
            '<li><a href>Product</a></li><li><a href>Promotion</a></li><li><a href>Training Session</a></li><li>' +
            '<a href>Survey</a></li><li><a href>Setup</a><div class="setup"><ul><li><a href>Training Category</a>' +
            '</li><li><a href>Product Category</a></li><li><a href>Cities</a></li><li><a href>States</a></li><li>' +
            '<a href>Countries</a></li></ul></div></li></ul></div>'
    }
}]);

cstore.directive('storeHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="search_addcart"><div class="search"><input type="text" placeholder="Search by product" name="search_theme_form"id="edit-search-theme-form-1" size="15" value="" title="Enter the terms you wish to search for." class="search">' +
            '<div class="search_sign"><a href><img src="images/Search.png"></a></div></div><div class="location">' +
            ' <a href><span class="where_i">I am in</span><span class="loction_img"><img src="images/location.png">' +
            '</span><span class="country">India</span></a></div><div class="add_cart"><div class="addcart_link"><a href>' +
            '<img src="images/finalcart.png"></a></div><div class="add_count">( 0 )</div></div></div>'
    }
}]);

cstore.directive('dropDown', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",

        template:'<div id="primary" style="display:none;z-index:100000"><ul><li  ng-repeat="productCategory in productCategories" class="active"><a href>{{productCategory.name}}</a></li>' +
            '</ul></div>'
    }
}]);
/*cstore.directive('activeLink', ['$location', function(location) {
 return {
 restrict: 'A',
 link: function(scope, element, attrs, controller) {
 var clazz = attrs.activeLink;
 var path = attrs.href;
 path = path.substring(1); //hack because path does bot return including hashbang
 scope.location = location;
 scope.$watch('location.path()', function(newPath) {
 if (path === newPath) {
 element.addClass(clazz);
 } else {
 element.removeClass(clazz);
 }
 });
 }

 };
 }]);*/

cstore.directive('popularProducts', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="category"><div class="pop_products">Popular products <a href="#!/all-products">( View all )</a>' +
            '</div><div class="products" ng-repeat="product in popularProducts"><div class="products_img">' +


            '<a href="#!/product?productid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +

            '</a></div><div class="name"><a href="#!/product?productid={{product._id}}">{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href="#!/product?productid={{product._id}}">{{product.cost.amount | currency}}</a></div>' +

            '<div class="add_to_cart"><a href>Add To Cart</a></div></div></div>'
    }
}]);

cstore.directive('allproducts', ['$appService', function ($appService, $scope) {
    return{
        restrict:'E',
        template:'<div class="m_bar"><div class="category" ng-repeat="product in products" ng-show="product.categoryWiseData.length">' +
            '<div class="pop_products">{{product.name}} <a href="#!/product-category?q={{product._id}}">( View all )</a></div><div class="products" ng-repeat="childproduct in product.categoryWiseData">' +
            '<div class="products_img"><a href="#!/product?productid={{childproduct._id}}"><img ng-src="{{childproduct.imageUrl}}"></a></div><div class="name"><a href="#!/product?productid={{childproduct._id}}">' +
            '{{childproduct.name}}</a></div><div class="product_details">' +
            '{{childproduct.short_description}}</div><div class="price">' +
            '<a href="#!/product?productid={{childproduct._id}}">{{childproduct.cost.amount | currency}}</a></div><div class="add_to_cart"><a href>Add To Cart</a></div></div>' +
            '</div></div>'
    }
}]);

cstore.directive('productDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="category"><div class="pop_products">{{product[0].name}}</div><div class="img_product">' +
            '<img ng-src="{{product[0].imageUrl}}" /></div>' +
            '<div class="details_product"><div class="short_details">{{product[0].short_description}}</div><div class="Qty">' +
            '<select class="form-control search_select"><option>Qty*</option><option>1</option><option>2</option><option>3</option>' +
            '<option>4</option><option>5</option></select><div class="final_price">{{product[0].cost.amount}}</div><div class="add_to_btn">' +
            '<a href>ADD TO CART</a></div></div></div><div class="product_description">{{product[0].description}}</div></div>'
    }
}]);

cstore.directive('vendor', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete"><div class="add_btn"><button ng-click="setPath(\'add-new-vendor\')" type="button">Add</button>' +
            '</div><div class="delete_btn"><button ng-click="deleteUsers()"  type="button">Delete</button></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count">{{show.preCursor}}-{{show.preCursor + vendors.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess()"class="nxt_btn"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            'Name</th><th>Address</th><th>City</th><th>State</th><th>Email</th><th>Contact No.</th><th></th>' +
            '</tr><tr ng-repeat="vendor in vendors"><td><input type="checkbox" ng-model="vendor.deleteStatus"></td><td>{{vendor.firstname}}{{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td><td>{{vendor.city.name}}</td><td>{{vendor.state.name}}</td><td>{{vendor.email}}</td><td>{{vendor.contact}}</td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="setUserState(vendor)">Edit</a></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteUserArray = [];
                    $scope.deleteUsers = function () {
                        for (var i = 0; i < $scope.vendors.length; i++) {
                            if ($scope.vendors[i].deleteStatus) {
                                $scope.deleteUserArray.push({"_id":$scope.vendors[i]._id, "__type__":"delete"});
                            }
                        }
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = angular.copy($scope.deleteUserArray);
                        $scope.deleteUserArray = [];
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

                                alert("Deleted");
                            }
                            else {
                                alert("some err while deleting");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (err) {
                            alert(err);
                        });

                    }
                    $scope.setUserState = function (vendor) {
                        $scope.data["firstname"] = vendor.firstname;
                        $scope.data["lastname"] = vendor.lastname;
                        $scope.data["contact"] = vendor.contact;
                        $scope.data["postalCode"] = vendor.postalCode;
                        $scope.data["address"] = vendor.address;
                        $scope.data["email"] = vendor.email;
                        for (var i = 0; i < $scope.data.states.length; i++) {
                            if ($scope.data.states[i]._id == vendor.state._id) {
                                $scope.data.selectedState = $scope.data.states[i];
                                break;
                            }
                        }
                        $scope.getCities($scope.data.selectedState._id, vendor.city._id);
                        window.location.href = "#!edit-vendor?q=" + vendor._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('citySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="qty_select" style="width: 266px;" ng-model="data.selectedCity" ' +
            'ng-options="city.name for city in data.cities"></select>',
        compile:function () {
            return {
                pre:function () {

                }
            }
        }
    }
}]);

cstore.directive('stateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="qty_select" style="width: 266px;" ng-change="getCities(data.selectedState._id)" ng-model="data.selectedState" ng-options="state.name for state in data.states"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('addVendor', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        replace:'true',
        template:'<div class="table_1"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">First Name</div></td><td><div class="margin_top">Last Name</div></td></tr><tr>' +
            '<td><input type="text" placeholder="" ng-model="data.firstname"></td><td><input type="text" placeholder=""ng-model="data.lastname"></td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Address</div>' +
            '</td></tr><tr><td><textarea style="width: 650px; height:80px;" ng-model="data.address"> </textarea></td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">State</div>' +
            '</td><td><div class="margin_top">City</div></td></tr><tr><td><state-select></state-select></td><td>' +
            '<city-select></city-select></td></tr><tr><td><div class="margin_top">Postal Code</div></td><td>' +
            '<div class="margin_top">Contact No.</div></td></tr><tr><td><input type="text"  placeholder="" ng-model="data.postalCode"></td><td>' +
            '<input maxlength="10" type="text" ng-model="data.contact" placeholder=""></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td><input type="email" ng-model="data.email">' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close">' +
            '<div class="add_btn"><button ng-click="saveVendor()" type="button">Save</button></div><div class="delete_btn"><button ng-click="setPathforVender(\'vendors\')" type="button">Close</button>' +
            '</div></div></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.newVendor = {};
                    $scope.setPathforVender = function (path) {
                        $scope.clearContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post:function ($scope) {
                    $scope.saveVendor = function () {
                        $scope.newVendor = {};
                        if ($scope.data.firstname == "" || $scope.data.firstname == undefined) {
                            alert("please enter firstname");
                            return false;
                        }
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $scope.data.email;
                        if (regEmail.test(email) == false) {
                            alert("please enter a valid email");
                            return false;
                        }
                        $scope.newVendor.email = email;
                        if (!$scope.data.selectedState) {
                            alert("please select state first ");
                            return false;
                        }

                        if (!$scope.data.selectedCity) {
                            alert("please select city first ");
                            return false;
                        }
                        if ($scope.data["userid"]) {
                            $scope.newVendor["_id"] = $scope.data["userid"];
                        }
                        $scope.newVendor["firstname"] = $scope.data.firstname;
                        $scope.newVendor["lastname"] = $scope.data.lastname;
                        $scope.newVendor["address"] = $scope.data.address;
                        $scope.newVendor["city"] = {"_id":$scope.data.selectedCity._id, "name":$scope.data.selectedCity.name}
                        $scope.newVendor["state"] = {"_id":$scope.data.selectedState._id, "name":$scope.data.selectedState.name}
                        $scope.newVendor["postalcode"] = $scope.data.postalCode;
                        $scope.newVendor["contact"] = $scope.data.contact;
                        $scope.newVendor["email"] = $scope.data.email;
                        var query = {};
                        query.table = "vendors__cstore";
                        query.operations = [$scope.newVendor];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                $scope.clearContent();
                                alert("Updated");
                            } else {
                                alert("some error while saving");
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (err) {
                            alert(err);
                        });
                    }
                }
            }
        }

    }
}]);

cstore.directive('editvendor', ['$appService', function ($appService, $scope) {
}]);

cstore.directive('productCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict:'E',
        template:'<div class="m_bar"><div class="category"><div class="pop_products">{{products[0].product_category.name}}</div>' +
            '<div class="products" ng-repeat="product in products"><div class="products_img"><a href="#!/product?productid={{product._id}}">' +
            '<img src="{{product.imageUrl}}"/></a>' +
            '</div><div class="name"><a href="#!/product?productid={{product._id}}">{{product.name}}</a></div><div class="product_details">{{product.short_description}}</div>' +
            '<div class="price"><a href="#!/product?productid={{product._id}}">{{product.cost.amount | currency}}</a></div><div class="add_to_cart"><a href>' +
            'Add To Cart</a></div></div></div></div><div id="scrollDiv"></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.getInitialData(0);
                }
            }
        }
    }
}]);

cstore.directive('storeManager', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete"><div class="add_btn"><button type="button"><a href="">Add</a>' +
            '</button></div><div class="delete_btn"><button type="button"><a href="">Delete</a></button></div>' +
            '<div class="prv_btn"><a href="#"><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count">' +
            '1-11 from start</div><div class="nxt_btn"><a href="#"><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Store Name</th>' +
            '<th>Shift</th><th>POS Type</th><th>POS Version</th><th>Loyalty Status</th><th>Reward Points</th><th>Brands</th><th>' +
            'Email</th><th>Contact</th><th></th></tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input id="" name="" type="checkbox" value="1"></td><td>{{storeManager.storename}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.pos_type}}</td><td>' +
            '{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td><td>{{storeManager.brands}}</td><td>{{storeManager.email}}</td><td>{{storeManager.contact}}</td>' +
            '<td><a class="edit_btn" href>Edit</a></td></tr><tr><td>' +
            '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>' +
            '<td></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('productList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete"><div class="add_btn"><button type="button"><a href="">Add</a></button>' +
            '</div><div class="delete_btn"><button type="button"><a href="">Delete</a></button></div><div class="prv_btn">' +
            '<a href="#"><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count">1-11 from start</div>' +
            '<div class="nxt_btn"><a href="#"><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Product Name</th><th>Product Image' +
            '</th><th>Product Category</th><th>Sold Count</th><th>Price</th><th></th></tr><tr ng-repeat="product in products"><td>' +
            '<input id="" name="" type="checkbox" value="1"></td><td>{{product.name}}</td><td>{{product.image}}</td><td>' +
            '{{product.product_category.name}}</td><td>{{product.soldcount}}</td><td>{{product.cost.amount | currency}}</td>' +
            '<td><a class="edit_btn" href>Edit</a></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                }
            }
        }
    }
}]);
