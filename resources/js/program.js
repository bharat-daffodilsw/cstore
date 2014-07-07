
/********************************************* Program 14/05**********************************************************/
cstore.controller('programList', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingProgramData = false;
    $scope.venderSearch = [
        {"value": "name", "name": "Program Name"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.programs = [];
    $appService.auth();
    $scope.getAllPrograms = function (direction, limit, column, searchText) {
        if ($scope.loadingProgramData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingProgramData = true;

        var query = {"table": "program__cstore"};
        query.columns = ["name", "image","cooler_template","aisle_template","participation_id","aisle_html","cooler_html","image_type"];

        if (column && searchText && column != "" && searchText != "") {
            query.filter = {};
            query.filter[column] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        }
        query.max_rows = limit;
        query.cursor = $scope.show.currentCursor;
        query.$count = 1;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (programData) {
            $scope.loadingProgramData = false;
            $scope.show.currentCursor = programData.response.cursor;
            $scope.programs = programData.response.data;
            for (var i = 0; i < $scope.programs.length; i++) {
                $scope.programs[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllPrograms(1, 10);
    $scope.setProgramOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllPrograms(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllPrograms(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllPrograms(0, 10, column, searchText);
    }
});

cstore.controller('addProgramCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var programId = $routeParams.q;
    if (programId && programId != undefined && programId != "undefined") {
        $scope.programdata["programid"] = programId;
    }
    else {
        delete $scope.programdata["programid"];
    }
});

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
            '<th><span>Participation Id</span><span class="sortWrap"><div class="sortUp" ng-click="setProgramOrder(\'participation_id\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProgramOrder(\'participation_id\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>'+
            '<th>Image<span class="sortWrap"><div class="sortUp" ng-click="setProgramOrder(\'image.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setProgramOrder(\'image.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th></th></tr><tr ng-repeat="program in programs"><td>' +
            '<input type="checkbox" ng-model="program.deleteStatus"></td>'+
            '<td>{{program.name}}</td><td>{{program.participation_id}}</td><td>{{program.image[0].name}}</td>' +
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
                        $scope.programdata["participation_id"] = program.participation_id ? program.participation_id : "";
                        for(var i=0;i<$scope.imageTypes.length;i++){
                            if(program.image_type==$scope.imageTypes[i].name){
                                $scope.programdata.image_type=$scope.imageTypes[i];
                                break;
                            }
                        }
                        if (program.image) {
                            $scope.oFile.fileExist = true;
                        }


                        if (program.aisle_html) {

                            $scope.programdata["aisle_html"] = program.aisle_html;
                        }
                        if (program.cooler_html) {
                            $scope.programdata["cooler_html"] = program.cooler_html;
                        }
                        $scope.showFile(program.image, false);
                        if (program.cooler_template) {
                            $scope.coolerOFile.fileExist = true;
                        }
                        $scope.showCoolerFile(program.cooler_template, false);
						if (program.aisle_template) {
                            $scope.aisleOFile.fileExist = true;
                        }
                        $scope.showAisleFile(program.aisle_template, false);
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
            '<td class="half_td"><div class="margin_top">Participation Id*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="programdata.name"></td>' +
            '<td class="product_image half_td"><input type="text" placeholder="" ng-model="programdata.participation_id"></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"> <div class="margin_top">Aisle Html*</div> </td>' +
            '<td class="product_image half_td"><div class="margin_top">Cooler Html*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"> <textarea ng-model="programdata.aisle_html" class="programTexarea"></textarea> </td>' +
            '<td class="product_image half_td"><textarea ng-model="programdata.cooler_html" class="programTexarea"></textarea></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Program Image*</div></td>' +
            '<td class="half_td"><div class="margin_top">Cooler*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '<td class="product_image half_td"><app-cooler-file-upload></app-cooler-file-upload></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Aisle*</div></td>' +
            '<td class="half_td"><div class="margin_top">Image Type</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="product_image half_td"><app-aisle-file-upload></app-aisle-file-upload></td>' +
            '<td class="half_td"><image-type></image-type></td>' +
            '</tr>' +
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
            '</tr>'+
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
                            if (!$scope.programdata.participation_id) {
                                $("#popupMessage").html("Please enter participation id");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.oFile.fileExist) {
                                $("#popupMessage").html("Please upload program image");
                                $('.popup').toggle("slide");
                                return false;
                            }
							if (!$scope.coolerOFile.fileExist) {
                                $("#popupMessage").html("Please upload cooler template");
                                $('.popup').toggle("slide");
                                return false;
                            }
							if (!$scope.aisleOFile.fileExist) {
                                $("#popupMessage").html("Please upload aisle template");
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
                            $scope.newProgram["participation_id"] = $scope.programdata.participation_id;
                            /*bharat change*/

                            $scope.newProgram["aisle_html"] = $scope.programdata.aisle_html;
                            $scope.newProgram["cooler_html"] = $scope.programdata.cooler_html;
                            $scope.newProgram["image_type"]=$scope.programdata.image_type.name;
                            /*end*/
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newProgram["image"];
                                $scope.uploadCoolerTemplate(query);

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
											$scope.uploadCoolerTemplate(query);

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
                    $scope.uploadCoolerTemplate = function (query) {
                        if (document.getElementById('uploadCoolerFile').files.length === 0) {
                            delete $scope.newProgram["cooler_template"];
                            $scope.uploadAisleTemplate(query);

                        }
                        else  {
                            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($scope.coolerOFile.name)) {
                                var cooler_file = {};
                                cooler_file.name = $scope.coolerOFile.name;
                                cooler_file.type = $scope.coolerOFile.type;
                                cooler_file.contents = $scope.coolerOFile.data;
                                cooler_file.ask = ASK;
                                cooler_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', cooler_file, "POST", "JSON", function (coolerdata) {
                                    if (coolerdata.response) {
                                        $scope.newProgram["cooler_template"] = coolerdata.response;
                                        $scope.uploadAisleTemplate(query);

                                    }
                                    else {

                                        $("#popupMessage").html("some error while uploading cooler template please try again");
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
                    $scope.uploadAisleTemplate = function (query) {
                        if (document.getElementById('uploadAisleFile').files.length === 0) {
                            delete $scope.newProgram["aisle_template"];
                            query.operations = [$scope.newProgram];
                            $scope.saveFunction(query);
                        }
                        else  {
                            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($scope.aisleOFile.name)) {
                                var aisle_file = {};
                                aisle_file.name = $scope.aisleOFile.name;
                                aisle_file.type = $scope.aisleOFile.type;
                                aisle_file.contents = $scope.aisleOFile.data;
                                aisle_file.ask = ASK;
                                aisle_file.osk = OSK;
                                $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', aisle_file, "POST", "JSON", function (aisledata) {
                                    if (aisledata.response) {
                                        $scope.newProgram["aisle_template"] = aisledata.response;
                                        query.operations = [$scope.newProgram];
                                        $scope.saveFunction(query);
                                    }
                                    else {

                                        $("#popupMessage").html("some error while uploading aisle template please try again");
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
