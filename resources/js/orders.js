/************************************ Order List For Store Manager*************************************/
cstore.controller('orderListCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingOrderData = false;
    $scope.status=["In Progress","Cancelled","Delivered"];
    if ($scope.currentUser["data"]) {
        if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
            $scope.venderSearch = [
                {"value": "status", "name": "Status"}
            ];
        }
        else if ($scope.currentUser["data"]["roleid"] == ADMIN) {
            $scope.venderSearch = [
                {"value": "storeid.storename", "name": "Site Name"},
                {"value": "status", "name": "Status"}
            ];
        }
    }
    $scope.searchby = $scope.venderSearch[0];
    $scope.orders = {};
    $appService.auth();
    $scope.getAllOrders = function (direction, limit, column, searchText,orderStartDate,orderEndDate) {
        if ($scope.loadingOrderData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingOrderData = true;

        var query = {"table": "orders__cstore"};
        query.columns = ["userid", "storeid","storeid.programid", "status", "sub_total", "total", "product", {"expression": "order_date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                query.filter["storeid._id"] = $scope.currentUser["data"]["storeid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var timeZone = new Date().getTimezoneOffset();
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK, "state": JSON.stringify({"timezone": timeZone})};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (orderData) {
            $scope.loadingOrderData = false;
            $scope.show.currentCursor = orderData.response.cursor;
            $scope.orders = orderData.response.data;
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllOrders(1, 10);
    $scope.sortOrder = function (sortingCol, sortingType, column, searchText,orderStartDate,orderEndDate) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllOrders(1, 10, column, searchText,orderStartDate,orderEndDate);
    }
    $scope.getMore = function (column, searchText,orderStartDate,orderEndDate) {
        $scope.getAllOrders(1, 10, column, searchText,orderStartDate,orderEndDate);
    }
    $scope.getLess = function (column, searchText,orderStartDate,orderEndDate) {
        $scope.getAllOrders(0, 10, column, searchText,orderStartDate,orderEndDate);
    }

    $scope.exportFunction=function(){
        tableToExcel('testTable', 'Order List Table');
    }
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType){
                table = document.getElementById(table)
                var myclone = $("#testTable").clone();
                myclone.find( "tr > th:last-child" ).remove();
                myclone.find( "tr > td:last-child" ).remove();
                var html=myclone.html();
                //console.log(myclone.html());
                //console.log(table.innerHTML);
            }
            var ctx = {worksheet: name || 'Worksheet', table: html}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
    $scope.getExportOrders = function (column,searchText,sortingCol,sortingType,orderStartDate,orderEndDate) {

        var query = {"table": "orders__cstore"};
        query.columns = [{"expression":"userid","columns":["_id","username"]},{"expression":"storeid","columns":["_id","storename"]},"status","sub_total",{"expression":"total","type":"currency"},{"expression": "order_date","type":"date", "format": "MM/DD/YYYY"}];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == STOREMANAGER) {
                query.filter["storeid._id"] = $scope.currentUser["data"]["storeid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        if (orderStartDate && orderStartDate != "" && orderEndDate && orderEndDate != "") {
            query.filter["order_date"] = {"$gte":orderStartDate,"$lte": orderEndDate};
        }
        if (sortingCol && sortingType) {
            query.orders = {};
            query.orders[sortingCol] = sortingType;
        }
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/excelexport";
        var tempUrl=serviceUrl+"?query="+JSON.stringify(query)+"&ask="+ASK+"&osk="+OSK;
        window.open(tempUrl,'_blank', 'width=300,height=300');
        //$appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (vendorData) {
        //    console.log("done");
        //}, function (jqxhr, error) {
        //    $("#popupMessage").html(error);
        //    $('.popup').toggle("slide");
        //})
    }
});

cstore.controller('orderDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getOrderDetail = function () {
        var orderid = $scope.getURLParam("orderid");
        if (!orderid || $scope.loadingStatus) {
            return
        }
        $scope.loadingStatus = true;
        var query = {"table": "orders__cstore"};
        query.columns = ["product", "shipping_charges", "sub_total", "total", "userid","storeid","bill_address", "shipping_address"];
        query.filter = {};
        query.filter["_id"] = $routeParams.orderid;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (cartData) {
            $scope.orderData = cartData.response.data[0];
            if (cartData.response.data && cartData.response.data.length) {
                $scope.orderedProducts = cartData.response.data[0].product;
                $scope.savedOrderBillingAddress = cartData.response.data[0].bill_address;
                $scope.savedOrderShippingAddress = cartData.response.data[0].shipping_address;
                $scope.ordered_shipping_charges = (cartData.response.data[0].shipping_charges && cartData.response.data[0].shipping_charges.amount) ? cartData.shipping_charges.amount : "Free";
                if (cartData.response.data[0].storeid) {
                    var storequery = {"table": "storemanagers__cstore"};
                    storequery.columns = ["programid", "manager.name"];
                    storequery.filter = {};
                    storequery.filter["_id"] = cartData.response.data[0].storeid._id;
                    var queryParams = {query: JSON.stringify(storequery), "ask": ASK, "osk": OSK};
                    var serviceUrl = "/rest/data";
                    $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (savedAddressData) {
                        $scope.loadingStatus = false;
                        $scope.savedAddressData = savedAddressData.response.data[0];
                    }, function (jqxhr, error) {
                        $("#popupMessage").html(error);
                        $('.popup').toggle("slide");
                    })
                }
            } else {
                $scope.loadingStatus = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getOrderDetail();
});

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

cstore.directive('orderList', ['$appService', function ($appService, $scope,$window) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">' +
            '<div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div>'+
            '<div class="pull-left order_date_filter"><input type="text" ng-model="orderFilterData.start_date" placeholder="Start Date" jqdatepicker><input type="text" placeholder="End Date" ng-model="orderFilterData.end_date" jqdatepicker>' +
            '<button ng-click="orderDateFilter()">Filter</button></div><div ng-click="getMore(searchby.value,search.searchContent,orderFilterData.start_date,orderFilterData.end_date)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
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
                pre: function ($scope,$window) {
                    $scope.setPath = function (orderid) {
                        window.location.href = "#!/order-detail?orderid=" + orderid;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrders(1, 10, $scope.searchby.value, $scope.search.searchContent,$scope.orderFilterData.start_date,$scope.orderFilterData.end_date);
                    }
                    $scope.orderDateFilter = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllOrders(1, 10, $scope.searchby.value, $scope.search.searchContent,$scope.orderFilterData.start_date,$scope.orderFilterData.end_date);

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
                            $scope.myHtml='<table id="testTable" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' +
                                '<th>POP</th><th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Site Name</span></th>' +
                                '<th ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'"><span>Program </span></th>' +
                                '<th>Total</th><th><span>Order Date</span></th>' +
                                '<th><span>Status</span></th></tr><tr ng-repeat="order in download.orders">' +
                                '<td><table class="ordered_products"><tr class="ordered_pop_name" ng-show="$index==0"><td class="ordered_pop">Name</td><td class="ordered_pop">Price</td><td class="ordered_pop">Qty</td></tr>' +
                                '<tr ng-repeat="pop in order.product"><td class="ordered_pop pop_name">{{pop.name}}</td><td class="ordered_pop">{{pop.cost.amount}}</td><td class="ordered_pop">{{pop.quantity}}</td></tr></table></td><td ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
                                '{{order.storeid.storename}}</td><td  ng-if="currentUser.data.roleid == \'531d4a79bd1515ea1a9bbaf5\'">' +
                                '{{order.storeid.programid.name}}</td><td>{{order.total.amount | currency}}</td><td>{{order.order_date}}</td><td>{{order.status}}</td>' +
                                '</tr></table>';
                            //console.log("11111" + $scope.myHtml);
                            var orderHtml = $scope.myHtml;
                            //$scope.testFunction();
                            //var w = $window.open();
                            //console.log(w);
                            //w.document.write(orderHtml);
                            //w.print();
                            //w.close();
                            window.location.href = "#!/print-preview";
                            //$scope.exportFunction();
                            //$scope.clearOrderContent();
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
