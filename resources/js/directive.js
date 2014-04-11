cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="header"><div ng-show="displayData.options" id="cm" class="pull-left"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown pull-left"><div class="logo pull-left"><img src="images/logo.jpg">' +

            '</div><store-header ng-show="displayData.cart"></store-header><div  class="logo1 pull-right"><img src="images/logo.jpg"></div><div class="username pull-right"><div ng-show="displayData.loggedIn" class="user pull-left">{{currentUser.data.firstname}}</div>' +
            '<div ng-show="displayData.loggedIn" id="my_profile" class="pull-left"><img src="images/logout.png"><div class="pull-left" id="sign_out" ">' +

            '<ul><li class="active"><a href>Profile</a></li><li><a href>Change Password</a></li><li><a ng-click="logOut()">' +
            'Sign Out</a></li></ul></div></div></div></div>' +
            '<drop-down ng-show="displayData.options"></drop-down><admin-menu ng-show="displayData.menu"></admin-menu></div>'
    }
}]);

cstore.directive('adminMenu', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="admin_menu pull-left"><ul><li><a href="#!/vendors" active-link="active">Vendor</a></li><li><a  href="#!/store-managers" active-link="active">Store Manager</a></li>' +
            '<li><a  href="#!/products" active-link="active">Product</a></li><li><a active-link="active" href >Promotion</a></li><li><a active-link="active" href>Training Session</a></li><li>' +
            '<a href active-link="active">Survey</a></li><li><a href active-link="active">Setup</a><div class="setup pull-left"><ul><li><a href active-link="active">Training Category</a>' +
            '</li><li><a href active-link="active">Product Category</a></li><li><a href active-link="active">Cities</a></li><li><a href active-link="active">States</a></li><li>' +
            '<a href active-link="active">Countries</a></li></ul></div></li></ul></div>'

    }
}]);

cstore.directive('storeHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="search_addcart pull-left"><div class="search pull-left"><input type="text" placeholder="Search by product" name="search_theme_form"id="edit-search-theme-form-1" size="15" value="" title="Enter the terms you wish to search for." class="search">' +
            '<div class="search_sign pull-left"><a href><img src="images/Search.png"></a></div></div><div class="location pull-left">' +
            ' <a href><span class="where_i">I am in</span><span class="loction_img pull-left"><img src="images/location.png">' +
            '</span><span class="country">India</span></a></div><div class="add_cart pull-right"><div class="addcart_link pull-left"><a href>' +
            '<img src="images/finalcart.png"></a></div><div class="add_count pull-left">( 0 )</div></div></div>'
    }
}]);

cstore.directive('dropDown', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",


        template:'<div id="primary" class="pull-left" style="display:none;z-index:100000"><ul><li  ng-repeat="productCategory in productCategories" class="active"><a href="#!/product-category?q={{productCategory._id}}">{{productCategory.name}}</a></li>' +

            '</ul></div>'
    }
}]);

cstore.directive('activeLink', ['$location', function (location) {
    return {
        restrict:'A',
        link:function (scope, element, attrs, controller) {
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

cstore.directive('popularProducts', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="category pull-left"><div class="pop_products">Popular products <a href="#!/all-products">( View all )</a>' +
            '</div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in popularProducts"><div class="products_img">' +


            '<a href="#!/product?productid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +

            '</a></div><div class="name"><a href="#!/product?productid={{product._id}}">{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href="#!/product?productid={{product._id}}">{{product.cost.amount | currency}}</a></div>' +

            '<div class="add_to_cart"><a href>Add To Cart</a></div></div></div>'
    }
}]);

cstore.directive('allproducts', ['$appService', function ($appService, $scope) {
    return{
        restrict:'E',
        template:'<div class="m_bar pull-left"><div class="category pull-left" ng-repeat="product in products" ng-show="product.categoryWiseData.length">' +
            '<div class="pop_products">{{product.name}} <a href="#!/product-category?q={{product._id}}">( View all )</a></div><div class="products col-sm-3 col-md-3 pull-left" ng-repeat="childproduct in product.categoryWiseData">' +
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
        template:'<div class="category pull-left"><div class="pop_products">{{product[0].name}}</div><div class="img_product pull-left">' +
            '<img ng-src="{{product[0].imageUrl}}" /></div>' +
            '<div class="details_product pull-right"><div class="short_details">{{product[0].short_description}}</div><div class="Qty">' +
            '<select class="qty_select"><option>Qty*</option><option>1</option><option>2</option><option>3</option>' +
            '<option>4</option><option>5</option></select><div class="final_price">{{product[0].cost.amount}}</div><div class="add_to_btn">' +
            '<a href>ADD TO CART</a></div></div></div><div class="product_description col-sm-12 col-md-12 pull-left">{{product[0].description}}</div></div>'
    }
}]);

cstore.directive('vendor', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',


        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button ng-click="setPath(\'add-new-vendor\')" type="button">Add</button>' +
            '</div><div class="delete_btn pull-left"><button ng-click="deleteUsers()"  type="button">Delete</button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><input type="text" placeholder="Search by product" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div></div><div ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + vendors.length}} from start' +
            '</div><div ng-show="show.preCursor" ng-click="getLess()"class="nxt_btn pull-right"><a><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
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
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllVendors(1, 5, $scope.searchby.value, $scope.searchContent);
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
                        else {
                            alert("please select at least one vendor before delete");
                        }

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
cstore.directive('searchBy', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="qty_select" ng-model="searchby" ng-options="search.name for search in venderSearch"></select>',
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
        template:'<div class="table_1 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
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
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button ng-click="saveVendor()" type="button">Save</button></div><div class="delete_btn pull-left"><button ng-click="setPathforVender(\'vendors\')" type="button">Close</button>' +
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

cstore.directive('productCategoryDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict:'E',
        template:'<div class="m_bar pull-left"><div class="category pull-left"><div class="pop_products">{{products[0].product_category.name}}</div>' +
            '<div class="products col-sm-3 col-md-3 pull-left" ng-repeat="product in products"><div class="products_img"><a href="#!/product?productid={{product._id}}">' +
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

cstore.directive('storeManagerList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button"><a href="">Add</a>' +
            '</button></div><div class="delete_btn pull-left"><button type="button"><a href="">Delete</a></button></div>' +
            '<div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor" ><a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + storeManagers.length}} from start</div><div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Store Name</th>' +
            '<th>Shift</th><th>POS Type</th><th>POS Version</th><th>Loyalty Status</th><th>Reward Points</th><th>Brands</th><th>' +
            'Email</th><th>Contact</th><th></th></tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input id="" name="" type="checkbox" value="1"></td><td>{{storeManager.storename}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.pos_type}}</td><td>' +
            '{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td><td>{{storeManager.brands}}</td><td>{{storeManager.email}}</td><td>{{storeManager.contact}}</td>' +
            '<td><a class="edit_btn" href>Edit</a></td></tr><tr><td>' +
            '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>' +
            '</tr></table></div>',
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
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button"><a href="#!/add-product">Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteProduct()"><a href>Delete</a></button></div><div  ng-click="getMore()" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + products.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Product Name</th><th>Product Image' +
            '</th><th>Product Category</th><th>Sold Count</th><th>Price</th><th></th></tr><tr ng-repeat="product in products"><td>' +
            '<input type="checkbox" ng-model="product.deleteStatus"></td><td>{{product.name}}</td><td>{{product.image[0].name}}</td><td>' +
            '{{product.product_category.name}}</td><td>{{product.soldcount}}</td><td>{{product.cost.amount | currency}}</td>' +
            '<td><a class="edit_btn" ng-click="setProductState(product)" href>Edit</a></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteProductArray = [];
                    $scope.deleteProduct = function () {
                        for (var i = 0; i < $scope.products.length; i++) {
                            if ($scope.products[i].deleteStatus) {
                                $scope.deleteProductArray.push({"_id":$scope.products[i]._id, "__type__":"delete"});
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
                    $scope.setProductState = function (product) {
                        console.log(product);
                        $scope.productdata["name"] = product.name;
                        $scope.productdata["cost"] = product.cost;
                        $scope.productdata["description"] = product.description;
                        $scope.productdata["short_description"] = product.short_description;
                        $scope.productdata["soldcount"] = product.soldcount;
                        $scope.productdata["image"] = product.image;
                        for (var i = 0; i < $scope.productdata.vendors.length; i++) {
                            if ($scope.productdata.vendors[i]._id == product.vendor._id) {
                                $scope.productdata.selectedVendor = $scope.productdata.vendors[i];
                                break;
                            }
                        }
                        for (var j = 0; j < $scope.productdata.productCategories.length; i++) {
                            if ($scope.productdata.productCategories[i]._id == product.product_category._id) {
                                $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[i];
                                break;
                            }
                        }
                        window.location.href = "#!edit-product?q=" + product._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('vendorSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="form-control search_select" style="width: 265px;padding: 7px;" ng-model="productdata.selectedVendor" ng-options="vendor.firstname for vendor in productdata.vendors"></select>'
    }
}]);

cstore.directive('productCategorySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="form-control search_select" style="width: 265px;padding: 7px;" ng-model="productdata.selectedProductCategory" ng-options="productCategory.name for productCategory in productdata.productCategories"></select>'
    }
}]);

cstore.directive('addProduct', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        replace:'true',
        template:'<div class="table_1 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">Name</div></td></tr><tr><td class="name_input"><input type="text" placeholder="" ng-model="productdata.name">' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">' +
            'Detailed Description</div></td></tr><tr><td class="name_input"><input type="text" placeholder="" ng-model="productdata.description"> ' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">' +
            'Short Description</div></td><td><div class="margin_top">Product Categroy</div></td></tr><tr><td>' +
            '<input type="text" placeholder="" ng-model="productdata.short_description"></td><td><product-category-select></product-category-select>' +
            '</td></tr><tr><td><div class="margin_top">Sold Count</div></td><td><div class="margin_top">Vendor</div>' +
            '</td></tr><tr><td><input type="text" placeholder="" ng-model="productdata.soldcount"></td><td><vendor-select></vendor-select>' +
            '</td></tr><tr><td><div class="margin_top">Price</div></td><td><div class="margin_top">Image</div></td></tr><tr><td>' +
            '<input type="text" placeholder="" ng-model="productdata.cost.amount"></td><td style="position: absolute;"><app-file-upload><app-file-upload></td></tr>' +
            '</table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="saveProduct()"><a href>Save</a></button></div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforProduct(\'products\')"><a href>Close</a></button></div></div></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.newProduct = {};
                    $scope.setPathforProduct = function (path) {
                        $scope.clearProductContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post:function ($scope) {
                    $scope.saveProduct = function () {
                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if ($scope.productdata.name == "" || $scope.productdata.name == undefined) {
                                alert("please enter product name");
                                return false;
                            }
                            if ($scope.productdata.cost.amount == "" || $scope.productdata.cost.amount == undefined) {
                                alert("please enter cost");
                                return false;
                            }
                            if (document.getElementById('uploadfile').files.length === 0) {
                                alert("please select image first");
                                return false;
                            }
                            if (!$scope.productdata.selectedProductCategory) {
                                alert("please select product category");
                                //return false;
                            }
                            var query = {};
                            query.table = "products__cstore";

                            if ($scope.productdata["productid"]) {
                                $scope.newProduct["_id"] = $scope.productdata["productid"];
                            }
                            $scope.newProduct["name"] = $scope.productdata.name;
                            $scope.newProduct["description"] = $scope.productdata.description;
                            $scope.newProduct["short_description"] = $scope.productdata.short_description;
                            $scope.newProduct["soldcount"] = $scope.productdata.soldcount;
                            $scope.newProduct["vendor"] = {"firstname":$scope.productdata.selectedVendor.firstname, "_id":$scope.productdata.selectedVendor._id};
                            $scope.newProduct["product_category"] = {"name":$scope.productdata.selectedProductCategory.name, "_id":$scope.productdata.selectedProductCategory._id};
                            $scope.newProduct["cost"] = {"amount":$scope.productdata.cost.amount, "type":{"currency":"usd"}};
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
                                        $scope.newProduct["image"] = data.response.data;
                                        query.operations = [$scope.newProduct];
                                        $scope.saveFunction(query);
                                    }
                                    else {
                                        alert("some error while uploading image please try again ");
                                    }
                                }, function (callbackerror) {
                                    alert("error");
                                });
                            }
                        }
                        else {
                            alert("please login first");
                        }
                    };
                    $scope.saveFunction = function (query) {

                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.response.insert) {
                                alert("new product added");
                            }
                            else {
                                alert("err while saving");
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
        restrict:"E",
        replace:true,
//        scope:true,
        template:"<p>" +
            "<input type='file' id='uploadfile' style=' float: left;width: 206px;'> " +
            "<img id='img_thumbnail' ng-show='showimage' ng-src='{{imageData}}' class='thumbnail' style='float: left;height: 142px;width: 200px;margin-top:-37px'></p>",
        compile:function () {
            return {
                post:function ($scope, iElement) {
                    $scope.loadFile = function (evt) {
                        $scope.file={};
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
