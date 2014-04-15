cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        template:'<div class="header"><div ng-show="displayData.options" id="cm" class="pull-left"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown pull-left"><div class="logo pull-left"><img src="images/main_logo02.png">' +

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
        template:'<div class="admin_menu pull-left"><ul><li><a href ng-click="setPath(\'vendors\')" active-link="active">Vendor</a></li><li><a  href ng-click="setPath(\'store-managers\')" active-link="active">Store Manager</a></li>' +
            '<li><a  href ng-click="setPath(\'products\')" active-link="active">Product</a></li><li><a active-link="active" href >Promotion</a></li><li><a active-link="active" href>Training Session</a></li><li>' +
            '<a href active-link="active">Survey</a></li><li><a href active-link="active">Setup</a><div class="setup pull-left"><ul><li><a href ng-click="setPath(\'training-categories\')" active-link="active">Training Category</a>' +
            '</li><li><a href ng-click="setPath(\'product-categories\')" active-link="active">Product Category</a></li><li><a href ng-click="setPath(\'cities\')" active-link="active">Cities</a></li><li><a href ng-click="setPath(\'states\')" active-link="active">States</a></li><li>' +
            '<a href ng-click="setPath(\'countries\')" active-link="active">Countries</a></li></ul></div></li></ul></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                },
                post:function () {

                }
            }
        }

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


        template:'<div id="primary" class="pull-left" style="display:none;z-index:100000"><ul><li  ng-repeat="productCategory in productdata.productCategories" class="active"><a href="#!/product-category?q={{productCategory._id}}">{{productCategory.name}}</a></li>' +

            '</ul></div>'
    }
}]);

cstore.directive('activeLink', ['$location', function (location) {
    return {
        restrict:'A',
        link:function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            var click = attrs.ng-click;
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
            '<div class="search_2 pull-left"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
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

                        $scope.data["firstname"] = vendor.firstname ? vendor.firstname: "" ;
                        $scope.data["lastname"] = vendor.lastname ? vendor.lastname: "";
                        $scope.data["contact"] = vendor.contact ? vendor.contact: "";
                        $scope.data["postalCode"] = vendor.postalCode ? vendor.postalCode: "";
                        $scope.data["address"] = vendor.address ? vendor.address: "";
                        $scope.data["email"] = vendor.email ? vendor.email: "";
                        if(vendor.state){
                            for (var i = 0; i < $scope.data.states.length; i++) {
                                if ($scope.data.states[i]._id == vendor.state._id) {
                                    $scope.data.selectedState = $scope.data.states[i];
                                    break;
                                }
                            }
                        }
                        if(vendor.city){
                            $scope.getCities($scope.data.selectedState._id, vendor.city._id);
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
        restrict:'E',
        template:'<select class="select_city" ng-model="data.selectedCity" ' +
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
        template:'<select class="select_city"  ng-change="getCities(data.selectedState._id)" ng-model="data.selectedState" ng-options="state.name for state in data.states"></select>',
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
            '</td></tr><tr><td class="text_area"><textarea ng-model="data.address"> </textarea></td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">State</div>' +
            '</td><td><div class="margin_top">City</div></td></tr><tr><td><state-select></state-select></td><td>' +
            '<city-select></city-select></td></tr><tr><td><div class="margin_top">Postal Code</div></td><td>' +
            '<div class="margin_top">Contact No.</div></td></tr><tr><td><input type="text"  placeholder="" ng-model="data.postalCode"></td><td>' +
            '<input maxlength="10" type="text" ng-model="data.contact" placeholder=""></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td class="city"><input type="email" ng-model="data.email">' +
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

                        /*if (!$scope.data.selectedCity) {
                            alert("please select city first ");
                            return false;
                        } */
                        if ($scope.data["userid"]) {
                            $scope.newVendor["_id"] = $scope.data["userid"];
                        }
                        $scope.newVendor["firstname"] = $scope.data.firstname;
                        $scope.newVendor["lastname"] = $scope.data.lastname;
                        $scope.newVendor["address"] = $scope.data.address;
                        if($scope.data.selectedCity && $scope.data.selectedCity!=null && $scope.data.selectedCity!=undefined && $scope.data.selectedCity!="undefined" && $scope.data.selectedCity!="null"){
                            $scope.newVendor["city"] = {"_id":$scope.data.selectedCity._id, "name":$scope.data.selectedCity.name}
                        }
                        if($scope.data.selectedState && $scope.data.selectedState!=null && $scope.data.selectedState!=undefined && $scope.data.selectedState!="undefined" && $scope.data.selectedState!="null"){
                            $scope.newVendor["state"] = {"_id":$scope.data.selectedState._id, "name":$scope.data.selectedState.name}
                        }
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

/********************************Product*****************************************/

cstore.directive('productList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button"><a href ng-click="setPath(\'add-product\')">Add</a></button>' +
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
                        $scope.productdata["name"] = product.name ? product.name: "";
                        $scope.productdata["cost"] = product.cost ? product.cost : "";
                        $scope.productdata["description"] = product.description ? product.description : "";
                        $scope.productdata["short_description"] = product.short_description ? product.short_description : "";
                        $scope.productdata["soldcount"] = product.soldcount ? product.soldcount : "";
                        $scope.productdata["image"] = product.imageUrl;
                        $scope.productdata["editImage"]=false;
                        console.log($scope.productdata.image);
                        if(product.vendor){
                            for (var i = 0; i < $scope.productdata.vendors.length; i++) {
                                if ($scope.productdata.vendors[i]._id == product.vendor._id) {
                                    $scope.productdata.selectedVendor = $scope.productdata.vendors[i];
                                    break;
                                }
                            }
                        }

                        if(product.product_category._id) {
                            for (var j = 0; j < $scope.productdata.productCategories.length; j++) {
                                if ($scope.productdata.productCategories[j]._id == product.product_category._id)
                                {
                                    $scope.productdata.selectedProductCategory = $scope.productdata.productCategories[j];
                                    break;
                                }
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
        template:'<select class="search_select" ng-model="productdata.selectedVendor" ng-options="vendor.firstname for vendor in productdata.vendors"></select>'
    }
}]);

cstore.directive('productCategorySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="search_select" ng-model="productdata.selectedProductCategory" ng-options="productCategory.name for productCategory in productdata.productCategories"></select>'
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
            '</td></tr><tr><td><div class="margin_top">Price</div></td></tr><tr><td>' +
            '<input type="text" placeholder="" ng-model="productdata.cost.amount"></td><td class="product_image"><img ng-src="{{productdata.image}}" ng-hide="productdata.editImage"/></td><td style="position: absolute;">' +
            '<app-file-upload><app-file-upload>' +
            '</td></tr>' +
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
                    $scope.editImage= function()
                    {
                        $scope.productdata["editImage"]=true;
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
                            if (document.getElementById('uploadfile').files.length === 0 ) {
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
                        console.log(query);
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Saved");
                            } else {
                                alert("some error while saving");
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
        restrict:"E",
        replace:true,
//        scope:true,
        template:"<p>" +
            "<input class ='edit_image' type='file' id='uploadfile'> " +
            "</p>",
        compile:function () {
            return {
                post:function ($scope, iElement) {
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
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-store-manager\')"><a href="">Add</a>' +
            '</button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteStoreManagers()"><a href>Delete</a></button></div>' +
            '<div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor" ><a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + storeManagers.length}} from start</div><div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess()"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table_3 pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Store Name</th>' +
            '<th>Shift</th><th>POS Type</th><th>POS Version</th><th>Loyalty Status</th><th>Reward Points</th><th>Brands</th><th>' +
            'Email</th><th>Contact</th><th></th></tr><tr ng-repeat="storeManager in storeManagers"><td>' +
            '<input type="checkbox"ng-model="storeManager.deleteStatus"></td><td>{{storeManager.storename}}</td><td>{{storeManager.shift}}</td><td>{{storeManager.pos_type}}</td><td>' +
            '{{storeManager.pos_version}}</td><td>{{storeManager.loyalty_status}}</td><td>{{storeManager.reward_point}}</td><td>{{storeManager.brands}}</td><td>{{storeManager.email}}</td><td>{{storeManager.contact}}</td>' +
            '<td><a class="edit_btn" ng-click="setStoreState(storeManager)"href>Edit</a></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.deleteStoreArray = [];
                    $scope.deleteStoreManagers = function () {
                        for (var i = 0; i < $scope.storeManagers.length; i++) {
                            if ($scope.storeManagers[i].deleteStatus) {
                                $scope.deleteStoreArray.push({"_id":$scope.storeManagers[i]._id, "__type__":"delete"});
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
                    $scope.setStoreState = function (store) {
                        //$scope.storedata.pos_version.name = store.pos_version;
                        //console.log("pos version name :::: "+ $scope.storedata.pos_version.name);
                        $scope.storedata["address"] = store.address ? store.address : "" ;
                        $scope.storedata["brands"] = store.brands ? store.brands : "" ;
                        $scope.storedata["contact"] = store.contact ? store.contact : "" ;
                        $scope.storedata["loyalty_status"] = store.loyalty_status ? store.loyalty_status : "" ;
                        $scope.storedata["pos_type"] = store.pos_type ? store.pos_type : "" ;
                        $scope.storedata["email"] = store.email ? store.email : "" ;
                        $scope.storedata["pos_version"] = store.pos_version ? store.pos_version : "" ;
                        $scope.storedata["postalcode"] = store.postalcode ? store.postalcode : "" ;
                        $scope.storedata["reward_point"] = store.reward_point ? store.reward_point : "" ;
                        $scope.storedata["shift"] = store.shift ? store.shift : "" ;
                        $scope.storedata["storename"] = store.storename ? store.storename : "" ;
                        if(store.manager){
                            $scope.storedata["manager"]["address"] = store.manager.address ? store.manager.address : "" ;
                            $scope.storedata["manager"]["contact"] = store.manager.contact ? store.manager.contact : "";
                            $scope.storedata["manager"]["email"] = store.manager.email ? store.manager.email : "";
                            $scope.storedata["manager"]["name"] = store.manager.name ? store.manager.name : "";
                            $scope.storedata["manager"]["postalcode"] = store.manager.postalcode ? store.manager.postalcode : "";
                            if(store.manager.countryid){
                                for (var j = 0; j < $scope.storedata.manager.countries.length; j++) {
                                    if ($scope.storedata.manager.countries[j]._id == store.manager.countryid._id) {
                                        $scope.storedata.manager.selectedCountry = $scope.storedata.manager.countries[j];
                                        break;
                                    }
                                }
                            }
                            if(store.manager.stateid){
                                $scope.getStatesNew($scope.storedata.manager, store.manager.stateid._id);
                            }
                            if(store.manager.cityid){
                                $scope.getCitiesNew($scope.storedata.manager, store.manager.cityid._id);
                            }
                        }
                        else {
                            $scope.storedata["manager"]["address"] = "";
                            $scope.storedata["manager"]["contact"] = "";
                            $scope.storedata["manager"]["email"] = "";
                            $scope.storedata["manager"]["name"] = "";
                            $scope.storedata["manager"]["postalcode"] = "";
                        }
                        if(store.countryid){
                            for (var i = 0; i < $scope.storedata.countries.length; i++) {
                                if ($scope.storedata.countries[i]._id == store.countryid._id) {
                                    $scope.storedata.selectedCountry = $scope.storedata.countries[i];
                                    break;
                                }
                            }
                        }
                        if(store.stateid) {
                            $scope.getStatesNew($scope.storedata, store.stateid._id);
                        }
                        if(store.cityid) {
                            $scope.getCitiesNew($scope.storedata, store.cityid._id);
                        }
                        window.location.href = "#!edit-store-manager?q=" + store._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('storeCitySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand"  ng-model="storedata.selectedCity" ' +
            'ng-options="city.name for city in storedata.cities"></select>',
        compile:function () {
            return {
                pre:function () {

                }
            }
        }
    }
}]);

cstore.directive('storeStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand" ng-change="getCitiesNew(storedata,null)" ng-model="storedata.selectedState" ng-options="state.name for state in storedata.states"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('storeCountrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand"  ng-change="getStatesNew(storedata,null)" ng-model="storedata.selectedCountry" ng-options="country.name for country in storedata.countries"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('managerCitySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand"  ng-model="storedata.manager.selectedCity" ' +
            'ng-options="city.name for city in storedata.manager.cities"></select>',
        compile:function () {
            return {
                pre:function () {

                }
            }
        }
    }
}]);

cstore.directive('managerStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand"  ng-change="getCitiesNew(storedata.manager,null)" ng-model="storedata.manager.selectedState" ng-options="state.name for state in storedata.manager.states"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('managerCountrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand" ng-change="getStatesNew(storedata.manager,null)" ng-model="storedata.manager.selectedCountry" ng-options="country.name for country in storedata.countries">' +
            '</select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('posVersionSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand" ng-model="storedata.pos_version" ng-options="posVersion.name for posVersion in posVersions"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.pos_version.name == \'Others\'" ng-model="pos" class="other_input pull-left" ng-blur="addPos()" >',
        compile:function () {
            return{
                pre:function () {

                }, post:function ($scope) {
                    $scope.addPos = function () {
                        $scope.posVersions[$scope.posVersions.length-2]={"name":$scope.pos};
                        $scope.storedata.pos_version= $scope.posVersions[$scope.posVersions.length-2];

                    }
                }
            }
        }
    }
}]);

cstore.directive('rewardPoint', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand" ng-model="storedata.reward_point" ng-options="rewardPoint.name for rewardPoint in rewardPoints"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.reward_point.name == \'Others\'" ng-model="reward" class="other_input pull-left" ng-blur="addValue()">',
        compile:function () {
            return{
                pre:function () {

                }, post:function ($scope) {
                    $scope.addValue = function () {
                        $scope.rewardPoints[$scope.rewardPoints.length-2]={"name":$scope.reward};
                        $scope.storedata.reward_point= $scope.rewardPoints[$scope.rewardPoints.length-2];

                    }
                }
            }
        }
    }
}]);

cstore.directive('brand', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="brand" multiple ng-multiple="true" ng-model="storedata.brand" ng-options="brand.name for brand in brands"></select>' +
            '<input type="text" placeholder="" ng-show = "storedata.brand.name == \'Others\'" ng-model="brandName" class="other_input pull-left" ng-blur="addBrand()">',
        compile:function () {
            return{
                pre:function () {

                }, post:function ($scope) {
                    $scope.addBrand = function () {
                        $scope.brands[$scope.brands.length-2]={"name":$scope.brandName};
                        $scope.storedata.brand= $scope.posVersions[$scope.brands.length-2];

                    }
                }
            }
        }
    }
}]);

cstore.directive('addStoreManager', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        replace:'true',
        template:'<div class="table_1 pull-left"><div class="l_bar pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Store Name</div>' +
            '</td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.storename"></td></tr><tr><td>' +
            '<div class="margin_top">Site Phone</div></td></tr><tr><td><input type="text" maxlength="10" placeholder="" ng-model="storedata.contact">' +
            '</td></tr><tr><td><div class="margin_top">Shift</div></td></tr><tr><td><input type="text" placeholder="" ng-model="storedata.shift">' +
            '</td></tr><tr><td><div class="margin_top">POS Type</div></td></tr><tr><td><input type="text" placeholder="" ng-model="storedata.pos_type">' +
            '</td></tr><tr><td><div class="margin_top">POS Version</div></td></tr><tr><td><pos-version-select></pos-version-select></td>' +
            '</tr><tr><td>' +
            '<div class="margin_top">Brands</div></td></tr><tr><td><brand></brand></td></tr>' +
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.email"></td>' +
            '</tr><tr><td><div class="margin_top">Address</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.address"></td></tr>' +
            '<tr><td><div class="margin_top">Country </div></td></tr><tr><td><store-country-select></store-country-select></td></tr><tr><td>' +
            '<div class="margin_top">State </div></td></tr><tr><td><store-state-select></store-state-select></td></tr><tr><td>' +
            '<div class="margin_top">City</div></td></tr><tr><td><store-city-select></store-city-select></td></tr><tr><td><div class="margin_top">' +
            'Postal Code</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.postalcode"></td></tr></table></div>' +
            '<div class="r_bar pull-left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">Manager Name</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.manager.name"></td></tr>' +
            '<tr><td><div class="margin_top">Manager Phone</div></td></tr><tr><td><input type="text" maxlength="10" placeholder=""ng-model="storedata.manager.contact" ></td></tr><tr><td>' +
            '<div class="margin_top">Manager Email Address</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.manager.email"></td>' +
            '</tr><tr><td><div class="margin_top">Loyalty Status</div></td></tr><tr><td>' +
            '<input type="text" placeholder="" ng-model="storedata.loyalty_status"></td></tr><tr><td><div class="margin_top">Reward Point</div>' +
            '</td></tr><tr><td><reward-point></reward-point></td></tr><tr><td><div class="margin_top">Address</div></td></tr><tr><td><input type="text" placeholder=""ng-model="storedata.manager.address"></td></tr><tr><td><div class="margin_top">Country </div>' +
            '</td></tr><tr><td><manager-country-select></manager-country-select></td></tr><tr><td><div class="margin_top">State </div></td></tr>' +
            '<tr><td><manager-state-select></manager-state-select></td></tr><tr><td><div class="margin_top">City</div></td></tr><tr><td>' +
            '<manager-city-select></manager-city-select></td></tr><tr><td><div class="margin_top">Postal Code</div></td></tr><tr><td>' +
            '<input type="text" placeholder=""ng-model="storedata.manager.postalcode"></td></tr><tr><td><div class="save_close pull-left">' +
            '<div class="add_btn pull-left"><button type="button" ng-click="saveStore()"><a href="">Save</a></button></div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforStore(\'store-managers\')"><a href="">Close</a></button></div></div></td></tr></table></div></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.newStore = {};
                    $scope.setPathforStore = function (path) {
                        $scope.clearStoreContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post:function ($scope) {
                    $scope.saveStore = function () {
                        $scope.newStore = {};
                        $scope.newStore["manager"] ={};
                        if ($scope.storedata.storename == "" || $scope.storedata.storename == undefined) {
                            alert("please enter storename");
                            return false;
                        }
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $scope.storedata.email;
                        if (regEmail.test(email) == false) {
                            alert("please enter a valid email");
                            return false;
                        }
                        $scope.newStore.email = email;
                        if (!$scope.storedata.selectedCountry) {
                          alert("please select city first ");
                         return false;
                         }

                        if (!$scope.storedata.selectedState) {
                            alert("please select state first ");
                            return false;
                         }

                        if (!$scope.storedata.selectedCity) {
                           alert("please select city first ");
                          return false;
                        }
                        if (!$scope.storedata.manager.selectedCountry) {
                            alert("please select city first ");
                            return false;
                        }
                        if(!$scope.storedata.brand){
                            alert("please select brand first ");
                            return false;
                        }
                        if(!$scope.storedata.pos_version){
                            alert("please select pos version first ");
                            return false;
                        }
                        if(!$scope.storedata.reward_point){
                            alert("please select reward point first");
                            return false;
                        }
                        if (!$scope.storedata.manager.selectedState) {
                            alert("please select state first ");
                            return false;
                        }

                        if (!$scope.storedata.manager.selectedCity) {
                            alert("please select city first ");
                            return false;
                        }
                        if ($scope.storedata["storeid"]) {
                            $scope.newStore["_id"] = $scope.storedata["storeid"];
                        }
                        $scope.newStore["storename"] = $scope.storedata.storename;
                        $scope.newStore["address"] = $scope.storedata.lastname;
                        $scope.newStore["brands"] = [$scope.storedata.brand.name];
                        $scope.newStore["contact"] = $scope.storedata.contact;
                        $scope.newStore["email"] = $scope.storedata.email;
                        if($scope.storedata.selectedCountry && $scope.storedata.selectedCountry!=null && $scope.storedata.selectedCountry!=undefined && $scope.storedata.selectedCountry!="undefined" && $scope.storedata.selectedCountry!="null"){
                            $scope.newStore["countryid"] = {"_id":$scope.storedata.selectedCountry._id, "name":$scope.storedata.selectedCountry.name};
                        }
                        if($scope.storedata.selectedState && $scope.storedata.selectedState!=null && $scope.storedata.selectedState!=undefined && $scope.storedata.selectedState!="undefined" && $scope.storedata.selectedState!="null"){
                            $scope.newStore["stateid"] = {"_id":$scope.storedata.selectedState._id, "name":$scope.storedata.selectedState.name};
                        }
                        if($scope.storedata.selectedState && $scope.storedata.selectedState!=null && $scope.storedata.selectedState!=undefined && $scope.storedata.selectedState!="undefined" && $scope.storedata.selectedState!="null"){
                            $scope.newStore["cityid"] = {"_id":$scope.storedata.selectedCity._id, "name":$scope.storedata.selectedCity.name};
                        }
                        $scope.newStore["loyalty_status"] = $scope.storedata.loyalty_status;
                        $scope.newStore["pos_type"] = $scope.storedata.pos_type;
                        $scope.newStore["pos_version"] = $scope.storedata.pos_version.name;
                        $scope.newStore["postalcode"] = $scope.storedata.postalcode;
                        $scope.newStore["reward_point"] = $scope.storedata.reward_point.name;
                        $scope.newStore["shift"] = $scope.storedata.shift;
                        $scope.newStore["manager"]["address"] = $scope.storedata.manager.address;
                        $scope.newStore["manager"]["email"] = $scope.storedata.manager.email;
                        $scope.newStore["manager"]["contact"] = $scope.storedata.manager.contact;
                        $scope.newStore["manager"]["name"] = $scope.storedata.manager.name;
                        $scope.newStore["manager"]["postalcode"] = $scope.storedata.manager.postalcode;
                        $scope.newStore["manager"]["cityid"] = {"_id":$scope.storedata.manager.selectedCity._id, "name":$scope.storedata.manager.selectedCity.name};
                        $scope.newStore["manager"]["countryid"] = {"_id":$scope.storedata.manager.selectedCountry._id, "name":$scope.storedata.manager.selectedCountry.name};
                        $scope.newStore["manager"]["stateid"] = {"_id":$scope.storedata.manager.selectedState._id, "name":$scope.storedata.manager.selectedState.name};
                        var query = {};
                        query.table = "storemanagers__cstore";
                        query.operations = [$scope.newStore];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                if (!$scope.storedata["storeid"]) {
                                    $scope.clearStoreContent();
                                }
                                alert("Saved");
                                window.location.href="#!/store-managers"
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


/**************************Setup***********************************/

cstore.directive('countryList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCountries()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCountries()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src=images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + countries.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Country</th><th></th>' +
            '</tr><tr ng-repeat="country in countries"><td><input type="checkbox" ng-model="country.deleteStatus">' +
            '</td><td><span ng-hide="country.editStatus">{{country.name}}</span><input ng-show="country.editStatus" class="edit_input" type="text" ng-model="country.name"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="country.editStatus = true" ng-hide="country.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index)" ng-show="country.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewCountry()" class="add_new"><a href>' +
            '+ Click Here To Add New Country</a></div></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.addNewCountry = function() {
                        $scope.countries.push( { name : ''} );
                        //for (var i = 0; i < $scope.countries.length; i++) {
                            $scope.countries[$scope.countries.length-1]["editStatus"] = true;
                        //}
                    }
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.remove = function(index){
                        if($scope.productCategories.length-1 == index) {
                            $scope.productCategories.splice(index, 1);
                        }
                        else {
                            $scope.productCategories[index]["editStatus"] = false;
                        }
                    }
                    $scope.deleteCountryArray = [];
                    $scope.deleteCountries = function () {
                        for (var i = 0; i < $scope.countries.length; i++) {
                            if ($scope.countries[i].deleteStatus) {
                                $scope.deleteCountryArray.push({"_id":$scope.countries[i]._id, "__type__":"delete"});
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
                                            //console.log("delete items" + i);
                                            $scope.countries.splice(i, 1);
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
                            alert("please select at least one country before delete");
                        }

                    }
                },
                post:function($scope){
                    $scope.saveCountries = function () {
                        $scope.addCountryArray = [];
                        for(var i = 0; i < $scope.countries.length; i++){
                            if($scope.countries[i]._id) {
                                $scope.addCountryArray.push({"name":$scope.countries[i].name,"_id":$scope.countries[i]._id})
                            }
                            else {
                                $scope.addCountryArray.push({"name":$scope.countries[i].name})
                            }
                        }
                        var query = {};
                        query.table = "countries__cstore";
                        query.operations = angular.copy($scope.addCountryArray);
                        $scope.addCountryArray = [];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Saved");
                                for (var i = 0; i < $scope.countries.length; i++) {
                                    $scope.countries[i]["editStatus"] = false;
                                }

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

cstore.directive('productCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveProductCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button"  ng-click="deleteProductCategories()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src=images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + productCategories.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>Product Category</th><th>Description</th><th></th>' +
            '</tr><tr ng-repeat="productCategory in productCategories"><td><input type="checkbox" ng-model="productCategory.deleteStatus">' +
            '</td><td><span ng-hide="productCategory.editStatus">{{productCategory.name}}</span>' +
            '<input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.name"></td><td><span ng-hide="productCategory.editStatus">' +
            '{{productCategory.description}}</span><input type="text" ng-show="productCategory.editStatus" ng-model="productCategory.description"></td>' +
            '<td style="cursor: pointer"><a class="edit_btn" ng-click="productCategory.editStatus = true" ng-hide="productCategory.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index)" ng-show="productCategory.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewProductCategory()" class="add_new"><a href>' +
            '+ Click Here To Add New Product Category</a></div></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.addNewProductCategory = function() {
                        $scope.productCategories.push( { name : '',description : '' } );
                        //for (var i = 0; i < $scope.productCategories.length; i++) {
                            $scope.productCategories[$scope.productCategories.length-1]["editStatus"] = true;
                        //}

                    }
                    $scope.remove = function(index){
                        if($scope.productCategories.length-1 == index) {
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
                                $scope.deleteProductCategoryArray.push({"_id":$scope.productCategories[i]._id, "__type__":"delete"});
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
                                            console.log("delete items" + i);
                                            $scope.productCategories.splice(i, 1);
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
                            alert("please select at least one product category before delete");
                        }

                    }
                },
                post:function($scope){
                    $scope.saveProductCategories = function () {
                        $scope.addproductCategoryArray = [];
                        for(var i = 0; i < $scope.productCategories.length; i++){
                            if($scope.productCategories[i]._id) {
                                $scope.addproductCategoryArray.push({"name":$scope.productCategories[i].name,"description":$scope.productCategories[i].description,"_id":$scope.productCategories[i]._id})
                            }
                            else {
                                $scope.addproductCategoryArray.push({"name":$scope.productCategories[i].name,"description":$scope.productCategories[i].description})
                            }
                        }
                        var query = {};
                        query.table = "product_categories__cstore";
                        query.operations = angular.copy($scope.addproductCategoryArray);
                        $scope.addproductCategoryArray = [];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Saved");
                                for (var i = 0; i < $scope.productCategories.length; i++) {
                                    $scope.productCategories[i]["editStatus"] = false;
                                }
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

cstore.directive('trainingCategoryList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveTrainingCategories()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteTrainingCategories()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src=images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
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
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.addNewTrainingCategory = function() {
                        $scope.trainingCategories.push( { name : '',description : '' } );
                        for (var i = 0; i < $scope.trainingCategories.length; i++) {
                            $scope.trainingCategories[$scope.trainingCategories.length-1]["editStatus"] = true;
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
                                $scope.deleteTrainingCategoryArray.push({"_id":$scope.trainingCategories[i]._id, "__type__":"delete"});
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
                            alert("please select at least one training category before delete");
                        }

                    }
                },
                post:function($scope){
                    $scope.saveTrainingCategories = function () {
                        $scope.addtrainingCategoryArray = [];
                        for(var i = 0; i < $scope.trainingCategories.length; i++){
                            if($scope.trainingCategories[i]._id) {
                                $scope.addtrainingCategoryArray.push({"name":$scope.trainingCategories[i].name,"description":$scope.trainingCategories[i].description,"_id":$scope.trainingCategories[i]._id})
                            }
                            else {
                                $scope.addtrainingCategoryArray.push({"name":$scope.trainingCategories[i].name,"description":$scope.trainingCategories[i].description})
                            }
                        }
                        var query = {};
                        query.table = "training_categories__cstore";
                        query.operations = angular.copy($scope.addtrainingCategoryArray);
                        $scope.addtrainingCategoryArray = [];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Saved");
                                for (var i = 0; i < $scope.trainingCategories.length; i++) {
                                    $scope.trainingCategories[i]["editStatus"] = false;
                                }
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

cstore.directive('countrySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select class="qty_select" ng-model="state.selectedCountry" ng-options="country.name for country in state.countries"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('stateList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveStates()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteStates()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src=images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + states.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>State</th><th>Country</th><th></th>' +
            '</tr><tr ng-repeat="state in states"><td><input type="checkbox" ng-model="state.deleteStatus">' +
            '</td><td><span ng-hide="state.editStatus">{{state.name}}</span>' +
            '<input type="text" ng-show="state.editStatus" ng-model="state.name"></td><td>' +
            '<span ng-hide="state.editStatus">{{state.countryid.name}}</span><country-select ng-show="state.editStatus"></country-select></td><td style="cursor: pointer">' +
            '<a class="edit_btn" ng-click="state.editStatus=true; setState(state)" ng-hide="state.editStatus">Edit</a>' +
            '<a class="edit_btn" ng-click="remove($index)" ng-show="state.editStatus">Cancel</a></td></tr>' +
            '</table><div ng-click="addNewState()" class="add_new"><a href>' +
            '+ Click Here To Add New State</a></div></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.addNewState = function() {
                        $scope.states.push( { name : '',countryid : '' } );
                        //for (var i = 0; i < $scope.countries.length; i++) {
                            $scope.states[$scope.states.length-1]["editStatus"] = true;
                        //}
                    }
                    $scope.remove = function(index){
                        if($scope.states.length-1 == index) {
                            $scope.states.splice(index, 1);
                        }
                        else {
                            $scope.states[index]["editStatus"] = false;
                        }
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
                                $scope.deleteStateArray.push({"_id":$scope.states[i]._id, "__type__":"delete"});
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
                                            //console.log("delete items" + i);
                                            $scope.states.splice(i, 1);
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
                            alert("please select at least one state before delete");
                        }

                    }
                },
                post:function($scope){
                    $scope.saveStates = function () {
                        $scope.addStateArray = [];
                        for(var i = 0; i < $scope.states.length; i++){
                            if($scope.states[i]._id) {
                                $scope.addStateArray.push({"name":$scope.states[i].name,"_id":$scope.states[i]._id,"countryid":{"_id":$scope.states[i].countryid._id,"name":$scope.states[i].countryid.name}})
                            }
                            else {
                                $scope.addStateArray.push({"name":$scope.states[i].name,"countryid":{"_id":$scope.states[i].countryid._id,"name":$scope.states[i].countryid.name}})
                            }
                        }
                        var query = {};
                        query.table = "states__cstore";
                        query.operations = angular.copy($scope.addStateArray);
                        $scope.addStateArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Saved");
                                for (var i = 0; i < $scope.states.length; i++) {
                                    $scope.states[i]["editStatus"] = false;
                                }
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
                    $scope.setState = function (state) {
                        //$scope.states[state].editStatus = true;
                        //for (var i = 0; i < $scope.data.states.length; i++) {
                          //  if ($scope.data.states[i]._id == vendor.state._id) {
                            //    $scope.data.selectedState = $scope.data.states[i];
                              //  break;
                           // }
                       // }
                        for (var i = 0; i < $scope.state.countries.length; i++) {
                            if ($scope.state.countries[i]._id == state.countryid._id) {
                                $scope.state.selectedCountry = $scope.state.countries[i];
                                break;
                            }
                        }
                        $scope.state["name"]=state.name;

                    }
                }
            }
        }
    }
}]);

cstore.directive('cityStateSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<select ng-show="editCityState" class="qty_select" ng-model="city.stateid" ng-options="state.name for state in data.states"></select>',
        compile:function () {
            return{
                pre:function () {

                }, post:function () {

                }
            }
        }
    }
}]);

cstore.directive('cityList', ['$appService', function ($appService, $scope) {
    return {
        restrict:'E',
        template:'<div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="saveCities()"><a href="">' +
            'Save</a></button></div><div class="delete_btn pull-left"><button type="button" ng-click="deleteCities()"><a href="">Delete</a>' +
            '</button></div><div class="prv_btn pull-right" ng-click="getMore()" ng-show="show.currentCursor"><a href=>' +
            '<img src=images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">' +
            '{{show.preCursor}}-{{show.preCursor + cities.length}} from start</div>' +
            '<div ng-show="show.preCursor" ng-click="getLess()" class="nxt_btn pull-right"><a href=>' +
            '<img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>City</th><th>State</th>' +
            '</tr><tr ng-repeat="city in cities"><td><input type="checkbox" ng-model="city.deleteStatus">' +
            '</td><td  ng-click="editCity=true"><span ng-hide="editCity">{{city.name}}</span>' +
            '<input type="text" ng-show="editCity" ng-model="city.name"></td><td ng-click="editCityState=true">' +
            '<span ng-hide="editCityState">{{city.stateid.name}}</span><city-state-select></city-state-select></td></tr>' +
            '</table><div ng-click="addNewCity()" class="add_new"><a href>' +
            '+ Click Here To Add New City</a></div></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                    $scope.addNewCity = function() {
                        $scope.cities.push( { name : '',stateid : '' } );
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
                                $scope.deleteCityArray.push({"_id":$scope.cities[i]._id, "__type__":"delete"});
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
                                            console.log("delete items" + i);
                                            $scope.cities.splice(i, 1);
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
                            alert("please select at least one city before delete");
                        }

                    }
                },
                post:function($scope){
                    $scope.saveCities = function () {
                        $scope.addCityArray = [];
                        for(var i = 0; i < $scope.cities.length; i++){
                            if($scope.cities[i]._id) {
                                $scope.addCityArray.push({"name":$scope.cities[i].name,"_id":$scope.cities[i]._id,"stateid":{"_id":$scope.cities[i].stateid._id,"name":$scope.cities[i].stateid.name}})
                            }
                            else {
                                $scope.addCityArray.push({"name":$scope.cities[i].name,"stateid":{"_id":$scope.cities[i].stateid._id,"name":$scope.cities[i].stateid.name}})
                            }
                        }
                        var query = {};
                        query.table = "cities__cstore";
                        query.operations = angular.copy($scope.addCityArray);
                        $scope.addCityArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code = 200 && callBackData.status == "ok") {
                                alert("Updated");
                                window.location.href = "#!/cities";
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