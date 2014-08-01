cstore.directive('topHeader', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div><div class="header"><div class="cm pull-left">' +
            '</div><div class="dropdown pull-left"><div class="logo1 pull-left"><a href="/"><img src="/images/main_logo.png"/></a>' +

            '</div><store-header ng-show="displayData.cart"></store-header><div ng-show="displayData.options" class="logo pull-right"><a href="/"><img ng-show="displayData.companyLogo" ng-src="{{currentUser.data.companyLogoUrl}}"/><img ng-hide="displayData.companyLogo" src="images/main_logo02.png"></a></div><div class="username pull-right"><div ng-show="displayData.loggedIn" class="user pull-left">{{currentUser.data.firstname}}</div>' +
            '<div ng-show="displayData.loggedIn" id="my_profile" class="pull-left"><img src="images/logout.png"><div class="pull-left" id="sign_out">' +
            '<ul><li class="active"><a href = "/#!/profile">Profile</a></li>' +
            '<li ng-show="displayData.options" class="active"><a href>Sites</a>' +
            '<div class="site_menu pull-left"><ul>' +
            '<li ng-show="displayData.options" ng-repeat="assignedStore in userAssignedStores" ng-click="changeStore(assignedStore)" ng-class="{\'activeUser\': assignedStore.userActive}"><a href>{{assignedStore.storename}}</a></li>' +
            '</ul></div>' +
            '</li>'+
            '<li><a ng-click="logOut()">' +
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
                    $scope.changeStore = function (store) {
                        if ($scope.userAssignedStores) {
                            var storeid = store._id;
                            var programid = store.programid ? store.programid._id:"";
                            var stateName = store.stateid ? store.stateid.name:"";
                            var image = [
                                {"image": ""}
                            ];
                            if(store.programid &&store.programid.image){
                                image[0]["image"] = store.programid.image;
                            }
                            var setCompanyLogo = $appService.setUrls(image, 140, 88);
                            var companyLogoUrl = setCompanyLogo[0].imageUrl;
                            if (storeid) {
                                var c_name = "storeid";
                                document.cookie = c_name + "=" + escape(storeid);
                                var c_name = "programid";
                                document.cookie = c_name + "=" + escape(programid);
                                var c_name = "selectedLoc";
                                document.cookie = c_name + "=" + escape(stateName);
                                if (companyLogoUrl) {
                                    var c_name = "companyLogoUrl";
                                    document.cookie = c_name + "=" + escape(companyLogoUrl);
                                }
                            }
                            for (var i = 0; i < $scope.userAssignedStores.length; i++) {
                                if ($scope.userAssignedStores[i]._id == store._id) {
                                    $scope.userAssignedStores[i].userActive = true;
                                    break;
                                }
                                else {
                                    $scope.userAssignedStores[i].userActive = false;
                                }
                            }
                            window.location.href = "/";
                        }
                    }
                }
            }
        }
    }
}]);   

cstore.directive('adminMenu', ['$appService', function ($appService, $scope) {
    return{
        restrict: "E",
        template: '<div class="admin_menu pull-left">' +
            '<ul>'+
            '<li ng-click="clearContent()"><a href ="#!/vendors" active-link="active" >Vendor</a></li>'+
            '<li ng-click="clearStoreContent()"><a href="#!/site-info" active-link="active">Site Info</a></li>'+
            '<li id="users"><a href="#!/manage-users" ng-click="clearUserContent()" active-link="active">Users</a></li>'+
            '<li id="pops" ng-click="clearProductContent()"><a href="#!/pops" active-link="active">POP</a></li>' +
            '<li id="promotions" ng-click="clearPromotionContent()"><a active-link="active" href="#!/promotions" >Promotion</a></li>' +
            '<li ng-click="deactiveHightLight()"><a active-link="active" href="#!/promo-text-files" >Promo Text Files</a></li>' +
            '<li id="training-sessions" ng-click="clearTrainingSessionContent()"><a active-link="active" href="#!/trainings">Training</a></li>'+
            '<li ng-click="clearSurveyContent()"><a href="#!/surveys" active-link="active">Surveys</a></li>'+
            '<li ng-click="clearFileContent()"><a href ="#!/files" active-link="active">Files</a></li>'+
            '<li id="setup" ng-hide="displayData.role.programAdmin"><a href ng-class="{\'active\': hasHighlight.setup}">Setup</a>'+
            '<div class="setup pull-left"><ul>'+
            '<li ng-click="clearProgramContent()"><a href="#!/programs" active-link="highlight">Program</a></li>' +
            '<li ng-click="activeHightLight()"><a href="#!/product-codes" active-link="highlight">Product Codes</a></li>' +
            '<li id="training-categories" ng-click="activeHightLight()"><a href="#!/training-categories" active-link="highlight">Training Category</a></li>' +
            '<li id="product-categories" ng-click="activeHightLight()"><a href="#!/pop-categories" active-link="highlight">POP Category</a></li>'+
            '<li id="cities" ng-click="activeHightLight()"><a href="#!/cities" active-link="highlight">Cities</a></li>'+
            '<li id="states" ng-click="activeHightLight()"><a href="#!/states" active-link="highlight">States</a></li>'+
            '<li id="countries" ng-click="activeHightLight()"><a href="#!/countries"active-link="highlight">Countries</a></li>'+
            //'<li ng-click="activeHightLight()"><a href="#!/mail-template" active-link="highlight">Mail Template</a></li>' +
            '</ul></div></li>'+
            '<li id="setup" ng-hide="displayData.role.programAdmin"><a href ng-class="{\'active\': hasHighlight.reports}">Reports</a>'+
            '<div class="setup pull-left"><ul>'+
            '<li ng-click="activeHightLightReports()"><a href="#!/vendor-report" active-link="active">Vendors</a></li>' +
            '<li ng-click="activeHightLightReports()"><a href="#!/site-info-report" active-link="active">Site Info</a></li>' +
            '<li ng-click="activeHightLightReports()"><a href="#!/order-report" active-link="active">Orders</a></li>' +
            '</ul></div></li>'+
            '</ul></div>',
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
            '<ul><li ng-click="inActivePromo()"><a href ="#!/all-pops" active-link="active">POP</a></li>'+
            '<li id="setup"><a href ng-class="{\'active\': hasHighlight.promos}">Promos</a>'+
            '<div class="setup promo_drop pull-left"><ul>'+
            '<li ng-click="activePromo()"><a href="#!/all-promos" active-link="active">Available Offers</a></li>' +
            '<li ng-click="activePromo()"><a href="#!/submitted-promos" active-link="active">Selected Offers</a></li>' +
            '<li ng-click="activePromo()"><a href="#!/disabled-promos" active-link="active">Disabled Offers</a></li>' +
            '</ul></div></li>'+
            '<li ng-click="inActivePromo()"><a href="#!/all-trainings" active-link="active">Training</a></li>' +
            '<li ng-click="inActivePromo()"><a active-link="active" href="#!/all-surveys" >Surveys</a></li>' +
            '<li ng-click="inActivePromo()"><a href ="#!/all-files" active-link="active">Files</a></li>'+
            '<li ng-click="clearOrderContent()"><a active-link="active" href="#!/orders">Orders</a></li>'+
            '<li class="active_store pull-right">{{activeStore.storename}}</li>'+
            '</ul></div>',
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
            '<img src="images/finalcart.png"></a></div><div class="add_count pull-left" ng-show="cartProducts.length">({{cartProducts.length}})</div></div></div></div>',
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
                            }
                            else if (hash.indexOf("?promoid=") > 0) {
                                window.location.href = "#!/all-promos?search=" + $scope.searchContent;
                            }
                            else if (hash.indexOf("?sessionid=") > 0) {
                                window.location.href = "#!/all-trainings?search=" + $scope.searchContent;                                
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
                                //console.log(hash);
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
            ' Copyright &copy; EC Loyalty Corporation 2014 <br> All Rights Reserved  </div><div class="footer_3 pull-left" ng-click="setFooterPath(\'terms-conditions\')"> Terms & Condition </div>' +
            '<div class="footer_3 pull-left" ng-click="setFooterPath(\'contact-us\')"> Contact us </div>' +
            '<div class="footer_4 pull-left"><img src="images/logo.jpg" ng-click="setFooterPath()"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setFooterPath = function (path) {
                        if(path){
                            window.location.href = "#!/" + path;
                        }
                        else{
                            var a = document.createElement('a');
                            a.href=REDIRECT_URL;
                            a.target = '_blank';
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                        }
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
                        $('.popup2').toggle("slide");
                        $scope.addToCart($scope.addCart.pop,$scope.addCart.quantity);
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

cstore.directive('appMultiFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
        scope: false,
        template: "<div class='app-float-left'>" +
            "<input  onchange='angular.element(this).scope().uploadFileChange()' class='app-float-left' type='file' id='uploadMultiImgfile'/>" +
            '<span class="loadingImage" ng-show="uploadingimage" style="float:right; margin-top: -25px;"><img src="images/loading.gif"></span>' +
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
            "<div class='pic_preview'><img ng-src='{{readonlyrow.fileurl}}'/></div>" +
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
cstore.directive('appCoolerFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
//        scope:true,
        template: "<div>" +
            '<div></div>' +
            "<span><input ng-show='readonlycoolerrow.filenotexist' type='file' id='uploadCoolerFile'/></span>" +
            "<div ng-hide='readonlycoolerrow.filenotexist'>" +
            "<span>" +
            "<div class='pic_preview'><img ng-src='{{readonlycoolerrow.fileurl}}'/></div>" +
            "</span>" +
            "<img src='images/icon_cross.gif'class='cross_icon' value='Remove' ng-click='removeCoolerFile()'/>" +
            "</div>" +
            "</div>",
        compile: function () {
            return {
                pre: function ($scope) {

                },
                post: function ($scope, iElement) {
                    $scope.removeCoolerFile = function () {
                        delete $scope.coolerrow[$scope.colmetacoolerdata.expression];
                        $("#uploadCoolerFile").val("");
                        $scope.readonlycoolerrow.filenotexist = true;
                        $scope.coolerOFile.fileExist = false;
                    };
                    if ($scope.coolerrow[$scope.colmetacoolerdata.expression]) {
                        $scope.showCoolerFile($scope.coolerrow[$scope.colmetacoolerdata.expression], false);                        

                    } else if (!$scope.readonlycoolerrow.fileurl) {
                        $scope.readonlycoolerrow.filenotexist = true;
                    }
                    $scope.loadCoolerFile = function (evt) {
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test($scope.coolerOFile.name)) {
                            $scope.coolerfile = {};
                            $scope.coolerfile.name = $scope.coolerOFile.name;
                            $scope.coolerfile.result = evt.target.result;
                            $scope.coolerOFile['data'] = evt.target.result;
                            $scope.showUploadedCoolerFile($scope.coolerfile);
                        }
                        else {
                            $("#popupMessage").html("You can upload image file only");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.showUploadedCoolerFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(file.name)) {
                            $scope.showcoolerimage = true;
                            $scope.coolerimageData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFCoolerReader = new FileReader();
                            if (document.getElementById('uploadCoolerFile').files.length === 0) {
                                return;
                            }
                            $scope.coolerOFile = document.getElementById('uploadCoolerFile').files[0];
                            $scope.oFCoolerReader.onload = $scope.loadCoolerFile;
                            $scope.oFCoolerReader.readAsDataURL($scope.coolerOFile);
                            $scope.coolerOFile.fileExist = true;
                        });
                    });
                }
            }
        }
    }
}]);
cstore.directive('appAisleFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
//        scope:true,
        template: "<div>" +
            '<div></div>' +
            "<span><input ng-show='readonlyaislerow.filenotexist' type='file' id='uploadAisleFile'/></span>" +
            "<div ng-hide='readonlyaislerow.filenotexist'>" +
            "<span>" +
            "<div class='pic_preview'><img ng-src='{{readonlyaislerow.fileurl}}'/></div>" +
            "</span>" +
            "<img src='images/icon_cross.gif'class='cross_icon' value='Remove' ng-click='removeAisleFile()'/>" +
            "</div>" +
            "</div>",
        compile: function () {
            return {
                pre: function ($scope) {

                },
                post: function ($scope, iElement) {
                    $scope.removeAisleFile = function () {
                        delete $scope.aislerow[$scope.colmetaaisledata.expression];
                        $("#uploadAisleFile").val("");
                        $scope.readonlyaislerow.filenotexist = true;
                        $scope.aisleOFile.fileExist = false;
                    };
                    if ($scope.aislerow[$scope.colmetaaisledata.expression]) {
                        $scope.showAisleFile($scope.aislerow[$scope.colmetaaisledata.expression], false);

                    } else if (!$scope.readonlyaislerow.fileurl) {
                        $scope.readonlyaislerow.filenotexist = true;
                    }
                    $scope.loadAisleFile = function (evt) {
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test($scope.aisleOFile.name)) {
                            $scope.aislefile = {};
                            $scope.aislefile.name = $scope.aisleOFile.name;
                            $scope.aislefile.result = evt.target.result;
                            $scope.aisleOFile['data'] = evt.target.result;
                            $scope.showUploadedAisleFile($scope.aislefile);
                        }
                        else {
                            $("#popupMessage").html("You can upload image file only");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.showUploadedAisleFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(file.name)) {
                            $scope.showaisleimage = true;
                            $scope.aisleimageData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFAisleReader = new FileReader();
                            if (document.getElementById('uploadAisleFile').files.length === 0) {
                                return;
                            }
                            $scope.aisleOFile = document.getElementById('uploadAisleFile').files[0];
                            $scope.oFAisleReader.onload = $scope.loadAisleFile;
                            $scope.oFAisleReader.readAsDataURL($scope.aisleOFile);
                            $scope.aisleOFile.fileExist = true;
                        });
                    });
                }
            }
        }
    }
}]);
cstore.directive('appMultiAnyFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
        scope: false,
        template: "<div class='app-float-left'>" +
            "<input  onchange='angular.element(this).scope().uploadFileChange()' class='app-float-left' type='file' id='uploadMultiImgfile'/>" +
            '<span class="loadingImage" ng-show="uploadingimage" style="float:right; margin-top: -25px;"><img src="images/loading.gif"></span>' +
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
                        $scope.filedata.uploadedimages.splice(index, 1);
                        $scope.albumArr.uploadedimg.splice(index, 1);
                        if ($scope.filedata.uploadedimages.length == 0) {
                            $scope.imgFilenotexist = true;
                        }
                        $scope.imgFileLimitExceed = false;
                        $("#uploadMultiImgfile").val("");
                    };

                    $scope.showMultiImgFile = function (file, index) {
                        if (!$scope.filedata.uploadedimages[index]) {
                            $scope.filedata.uploadedimages[index] = {};
                        }
                        if (!$scope.filedata.uploadedimages) {
                            $scope.filedata.uploadedimages = [];
                        }
                        $scope.filedata.uploadedimages[index].filename = file[0].name;
                        $scope.filedata.uploadedimages[index].fileurl = BAAS_SERVER + "/file/download?filekey=" + file[0].key + "&ask=" + ASK + "&osk=" + OSK;
                        $scope.filedata.uploadedimages[index].image = file;
                        $scope.filedata.uploadedimages[index].default = true;
                        $scope.albumArr.uploadedimg[index] = file[0];
                        $scope.imgFilenotexist = false;
                        $scope.uploadingimage = false;
                        $("#uploadMultiImgfile").val("");
                        if (index == 10)
                            $scope.imgFileLimitExceed = true;
                    };
                    if ($scope.filedata.editImages && $scope.filedata.editImages.length > 0) {
                        for (var k = 0; k < $scope.filedata.editImages.length; k++) {
                            $scope.showMultiImgFile([$scope.filedata.editImages[k]], k);
                        }
                    } else {
                        $scope.imgFilenotexist = true;
                    }

                    $scope.loadImgFile = function (evt) {
                            var current_file = {};
                            $scope.uploadingimage = true;
                            current_file.name = $scope.oFile.name;
                            current_file.type = $scope.oFile.type;
                            current_file.contents = evt.target.result;
                            current_file.ask = ASK;
                            current_file.osk = OSK;
                            $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                if (data.response && data.response.length > 0) {
                                    $scope.showMultiImgFile(data.response, $scope.filedata.uploadedimages.length);
                                }
                            });

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
cstore.directive('imageType', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="select_city"  ng-model="programdata.image_type" ng-options="type.name for type in imageTypes"></select>'

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

cstore.directive('roleSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="userdata.selectedRole" ng-options="role.name for role in userdata.roles" ng-change="getStores(userdata.selectedRole,null)"></select>',
        compile: function () {
            return{
                pre: function ($scope) {
                }, post: function ($scope) {
                }
            }
        }
    }
}]);

cstore.directive('storeSelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select ng-if="userdata.selectedRole._id==\'531d4aa0bd1515ea1a9bbaf6\'" class="brand" ng-model="userdata.selectedStore" ng-options="store.storename for store in userdata.stores"></select>'
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

cstore.directive('dateFilter', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="pull-left order_date_filter"><form ng-submit="filterByDate()">' +
            '<input id="filter_date" type="text" placeholder="Date" ng-model="filterdata.filter_date" jqdatepicker />' +
            '<span class="search_sign_3 pull-left"><a ng-click="filterByDate()">' +
            '<img style="cursor: pointer width:30px;" src="images/Search.png">' +
            '</a></span>' +
            '<input type="submit" style="display:none;"></form></div>'
    }
}]);

