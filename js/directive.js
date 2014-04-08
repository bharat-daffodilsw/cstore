cstore.directive('topHeader',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="header"><div ng-show="displayData.options" id="cm"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown"><div class="logo"><img src="images/logo.jpg">' +
            '</div><store-header ng-show="displayData.cart"></store-header><div class="logo1"><img src="images/logo.jpg"></div><div class="username"><div class="user">Rich Gold</div>' +
            '<div id="my_profile"><img src="images/logout.png"><div class="signOut" id="sign_out" ">' +
            '<ul><li class="active"><a href>Profile</a></li><li><a href>Change Password</a></li><li><a ng-click="logOut()">' +
            'Sign Out</a></li></ul></div></div></div></div>' +
            '<drop-down ng-show="displayData.options"></drop-down><admin-menu ng-show="displayData.menu"></admin-menu></div>'
    }
}]);

cstore.directive('adminMenu',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="admin_menu"><ul><li><a href>Vendor</a></li><li><a href>Store Manager</a></li>' +
            '<li><a href>Product</a></li><li><a href>Promotion</a></li><li><a href>Training Session</a></li><li>' +
            '<a href>Survey</a></li><li><a href>Setup</a><div class="setup"><ul><li><a href>Training Category</a>' +
            '</li><li><a href>Product Category</a></li><li><a href>Cities</a></li><li><a href>States</a></li><li>' +
            '<a href>Countries</a></li></ul></div></li></ul></div>'
    }
}]);

cstore.directive('storeHeader',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="search_addcart"><div class="search"><input type="text" placeholder="Search by product" name="search_theme_form"id="edit-search-theme-form-1" size="15" value="" title="Enter the terms you wish to search for." class="search">' +
            '<div class="search_sign"><a href><img src="images/Search.png"></a></div></div><div class="location">' +
            ' <a href><span class="where_i">I am in</span><span class="loction_img"><img src="images/location.png">' +
            '</span><span class="country">India</span></a></div><div class="add_cart"><div class="addcart_link"><a href>' +
            '<img src="images/finalcart.png"></a></div><div class="add_count">( 0 )</div></div></div>'
    }
}]);

cstore.directive('dropDown',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div id="primary" style="display:none;z-index:100000"><ul ng-repeat="productCategory in productCategories"><li class="active"><a href>{{productCategory.name}}</a></li>' +
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

cstore.directive('popularProducts',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="category"><div class="pop_products">Popular products <a href="/#/all-products">( View all )</a>' +
            '</div><div class="products" ng-repeat="product in popularProducts"><div class="products_img">' +

            '<a href="#!/product?productid={{product._id}}"><img title="{{product.name}}" ng-src="{{product.imageUrl}}"/>' +

            '</a></div><div class="name"><a href="#!/product?productid={{product._id}}">{{product.name}}</a></div><div class="product_details">' +
            '{{product.short_description}}</div><div class="price"><a href="#!/product?productid={{product._id}}">{{product.cost.amount | currency}}</a></div>' +
            '<div class="add_to_cart"><a href>Add To Cart</a></div></div></div>'
    }
}]);

cstore.directive('allproducts',['$appService', function($appService,$scope){
    return{
        restrict:'E',
        template:'<div class="m_bar"><div class="category" ng-repeat="product in products" ng-show="product.categoryWiseData.length">' +
            '<div class="pop_products">{{product.name}} <a href="">( View all )</a></div><div class="products" ng-repeat="childproduct in product.categoryWiseData">' +
            '<div class="products_img"><a href="#!/product/{{childproduct._id}}"><img src></a></div><div class="name"><a href="#!/product/{{childproduct._id}}">' +
            '{{childproduct.name}}</a></div><div class="product_details">' +
            '{{childproduct.short_description}}</div><div class="price">' +
            '<a href="#!/product/{{childproduct._id}}">{{childproduct.cost.amount | currency}}</a></div><div class="add_to_cart"><a href>Add To Cart</a></div></div>' +
            '</div></div>'
    }
}]);


cstore.directive('productDetail',['$appService', function($appService,$scope){
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

cstore.directive('vendor',['$appService', function($appService,$scope){
    return {
        restrict:'E',
        template:'<div class="add_delete"><div class="add_btn"><button type="button">Add</button>' +
            '</div><div class="delete_btn"><button type="button">Delete</button></div><div class="prv_btn">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count">1-11 from start' +
            '</div><div class="nxt_btn"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th>' +
            'Name</th><th>Address</th><th>City</th><th>State</th><th>Email</th><th>Contact No.</th><th></th>' +
            '</tr><tr ng-repeat="vendor in vendors"><td><input id="" name="" type="checkbox" value="1"></td><td>{{vendor.firstname}} {{vendor.lastname}}</td><td>{{vendor.address}}' +
            '</td><td>{{vendor.city}}</td><td>{{vendor.state}}</td><td>{{vendor.email}}</td><td>{{vendor.contact}}</td><td>' +
            '<a class="edit_btn" href>Edit</a></td></tr></table></div>',
        compile:function () {
            return {
                pre:function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('citySelect',['$appService', function($appService,$scope){
    return {
        restrict:'E',
        template:'<select class="qty_select" style="width: 266px;" ng-model="vendor.city" ng-options="city.name for city in cities"></select>'
    }
}]);

cstore.directive('stateSelect',['$appService', function($appService,$scope){
    return {
        restrict:'E',
        template:'<select class="qty_select" style="width: 266px;" ng-model="vendor.state" ng-options="state.name for state in states"></select>'
    }
}]);

cstore.directive('addvendor',['$appService', function($appService,$scope){
    return {
        restrict:'E',
        replace:'true',
        template:'<div class="table_1"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>' +
            '<div class="margin_top">First Name</div></td><td><div class="margin_top">Last Name</div></td></tr><tr>' +
            '<td><input type="text" placeholder="" ng-model="newVendor.firstname"></td><td><input type="text" placeholder=""ng-model="newVendor.lastname"></td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">Address</div>' +
            '</td></tr><tr><td><textarea style="width: 650px; height:80px;" ng-model="newVendor.address"> </textarea></td></tr></table>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="margin_top">City</div>' +
            '</td><td><div class="margin_top">State</div></td></tr><tr><td><city-select></city-select></td><td>' +
            '<state-select></state-select></td></tr><tr><td><div class="margin_top">Postal Code</div></td><td>' +
            '<div class="margin_top">Contact No.</div></td></tr><tr><td><input type="text" placeholder="" ng-model="newVendor.contact"></td><td>' +
            '<input type="text" placeholder=""></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr><td><div class="margin_top">Email</div></td></tr><tr><td><textarea style="width: 650px; height:50px;"ng-model="newVendor.email"> </textarea>' +
            '</td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="save_close">' +
            '<div class="add_btn"><button type="button">Save</button></div><div class="delete_btn"><button type="button">Close</button>' +
            '</div></div></td></tr></table></div>',
        compile:function(){
            return {
                pre:function ($scope) {
                    $scope.newVendor = {};
                },
                post:function($scope) {
                    $scope.saveVendor =function(){
                        if ($scope.newVendor.firstname == "" || $scope.newVendor.firstname == undefined) {
                            alert("please enter firstname");
                            return false;
                        }
                        if ($scope.newVendor.email == "" || $scope.newVendor.email == undefined) {
                            alert("please enter email");
                            return false;
                        }
                        if(!$scope.vendor.city){
                            alert("please select product");
                            return false;
                        }
                        if(!$scope.vendor.state){
                            alert("please select promotion");
                            return false;
                        }

                        var query = {};
                        query.table = "vendors__cstore";
                        $scope.newVendor["city"] = {"name":$scope.vendor.city.name,"_id":$scope.vendor.city._id};
                        $scope.newVendor["state"] = {"name":$scope.vendor.state.name,"_id":$scope.vendor.state._id};
                        query.operations = [$scope.newVendor];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (!callBackData["insert"]) {
                                alert(callBackData);
                            }
                            else {
                                $scope.addVendor = false;
                                alert("Saved Successfully");
                                $scope.newVendor = {};
                                $scope.vendor.city={};
                                $scope.vendor.state={};
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        });
                    }
                }
            }
        }

    }
}]);
