/******************************** Shopping Cart*************************************/
cstore.controller('shoppingCartCtrl', function ($scope, $appService) {
    $appService.auth();
    $scope.grandTotal = 0;
    $scope.getShoppingCart();
});

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
            '<button type="button" ng-click="updatedOrder()"><a href>Continue Shopping</a></button>' +
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
                        $scope.updateShoppingCartProduct["storeid"]={"_id":$scope.currentUser.data.storeid};
                        $scope.updateShoppingCartProduct["product"] = $scope.shoppingCartProducts;
                        $scope.updateShoppingCartProduct["sub_total"] = $scope.getTotal();
                        $scope.updateShoppingCartProduct["total"] = {"amount": $scope.updateShoppingCartProduct["sub_total"], "type": {"currency": "usd"}};
                        $scope.updateShoppingCartProduct["__type__"] = "insertifnotexist";
                        var query = {};
                        query.table = "shopping_cart__cstore";
                        query.operations = [$scope.updateShoppingCartProduct];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $scope.loadingShoppingCartData = false;
                                if(path){
                                    window.location.href = "#!/" + path;
                                }
                                else {
                                    window.location.href = "#!/";
                                }
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
