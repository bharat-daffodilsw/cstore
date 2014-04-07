cstore.directive('topHeader',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="header"><div ng-show="displayData.options" id="cm"> <img src="images/dropdown.png">' +
            '</div><div class="dropdown"><div class="logo"><img src="images/logo.jpg">' +
            '</div><store-header ng-show="displayData.cart"></store-header><div class="username"><div class="user">Rich Gold</div>' +
            '<div id="my_profile"><img src="images/logout.png"><div class="signOut" id="sign_out" ">' +
            '<ul><li class="active"><a href>Profile</a></li><li><a href>Change Password</a></li><li><a href>' +
            'Sign Out</a></li></ul></div></div></div><div class="logo1"><img src="images/logo.jpg"></div></div>' +
            '<drop-down ng-show="displayData.options"></drop-down><admin-menu ng-show="displayData.menu"></admin-menu></div>'
    }
}]);

cstore.directive('adminMenu',['$appService', function($appService,$scope){
    return{
        restrict:"E",
        template:'<div class="admin_menu"><ul><li><a href>Promotion</a></li><li><a href>Product</a></li>' +
            '<li><a href>Store Manager</a></li><li><a href>Training Session</a></li><li><a href>Survey</a></li><li>' +
            '<a href>Vendor</a></li><li><a href>Setup</a><div class="setup"><ul><li><a href>Training Category</a>' +
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
        template:'<div id="primary" style="display:none;z-index:100000"><ul><li class="active"><a href>Brochures</a></li>' +
            '<li><a href>Complete POP Kit</a></li><li><a href>Cooler Displays</a></li><li><a href>Counter Displays</a></li>' +
            '<li><a href>Door Signage</a></li><li><a href>Installation Supplies</a></li><li><a href>Pump Toppers</a></li>' +
            '<li><a href>Shelf Tags</a></li><li><a href>Squawker Items</a></li></ul></div>'
    }
}]);

cstore.directive('activeLink', ['$location', function(location) {
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
}]);
