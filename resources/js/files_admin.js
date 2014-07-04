cstore.controller('fileCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingFileData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.uploadFiles = [];
    $appService.auth();
    $scope.getAllUploadFiles = function (direction, limit, column, searchText) {
        if ($scope.loadingFileData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingFileData = true;
        var query = {"table": "file__cstore"};
        query.columns = ["title","programid","store_manager_id","file"];
        query.filter = {};
        if ($scope.currentUser["data"]) {
            if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                query.filter["programid._id"] = $scope.currentUser["data"]["programid"];
            }
        }
        if (column && searchText && column != "" && searchText != "") {
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (fileData) {
            $scope.loadingFileData = false;
            $scope.show.currentCursor = fileData.response.cursor;
            $scope.uploadFiles = fileData.response.data;
            for (var i = 0; i < $scope.uploadFiles.length; i++) {
                $scope.uploadFiles[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllUploadFiles(1, 10);
    $scope.setUploadFileOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllUploadFiles(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllUploadFiles(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllUploadFiles(0, 10, column, searchText);
    }
    $scope.getProgramsForFiles(null,null);
});

cstore.controller('addFileCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    var fileId = $routeParams.q;
    if (fileId && fileId != undefined && fileId != "undefined") {
        $scope.filedata["fileId"] = fileId;
    }
    else {
        delete $scope.filedata["fileId"];
    }
})

/*************************upload file list**************************************/
cstore.directive('uploadFileList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div class="add_delete pull-left">'+
            '<div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-file\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteFile()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<span class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></><input type="submit" style="display:none;"></form></div>' +
            '<div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + uploadFiles.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setUploadFileOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setUploadFileOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setUploadFileOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setUploadFileOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>'+
            '<th></th></tr><tr ng-repeat="file in uploadFiles"><td>' +
            '<input type="checkbox" ng-model="file.deleteStatus"></td><td>{{file.title}}</td><td>{{file.programid.name}}</td>' +
            '<td><a class="edit_btn" ng-click="setFileState(file)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingFileData"><img src="images/loading.gif"></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllUploadFiles(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteFileArray = [];
                    $scope.deleteFile = function () {
                        for (var i = 0; i < $scope.uploadFiles.length; i++) {
                            if ($scope.uploadFiles[i].deleteStatus) {
                                $scope.deleteFileArray.push({"_id": $scope.uploadFiles[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "file__cstore";
                        query.operations = angular.copy($scope.deleteFileArray);
                        $scope.deleteFileArray = [];
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.uploadFiles.length; i++) {
                                    if ($scope.uploadFiles[i].deleteStatus) {
                                        $scope.uploadFiles.splice(i, 1);
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
                    $scope.setFileState = function (file) {

                        $scope.filedata["title"] = file.title ? file.title : "";
                        if (file.programid) {
                            $scope.getProgramsForFiles(file.programid._id,file._id);
                        }
                        $scope.filedata.editImages = file.file;
                        if (file.file && file.file.length > 0) {
                            for (var k = 0; k < file.file.length; k++) {
                                $scope.filedata.uploadedimages[k] = {"filename": file.file[k].name};
                                $scope.filedata.uploadedimages[k].fileurl = BAAS_SERVER + "/file/download?filekey=" + file.file[k].key + "&ask=" + ASK + "&osk=" + OSK;
                            }
                        }
                        window.location.href = "#!edit-file?q=" + file._id;
                    }
                }
            }
        }
    }
}]);
cstore.directive('selectProgramFile', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="filedata.selectedProgram" ng-options="program.name for program in filedata.programs" ng-change="getProgramSelectedStoreForFiles(filedata.selectedProgram._id,null)"></select>'
    }
}]);
cstore.directive('addFile', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Title*</div></td>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><input type="text" placeholder="" ng-model="filedata.title"></td>' +
            '<td class="half_td"><select-program-file ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></select-program-file><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '</tr>' +
            '<td class="half_td"><div class="margin_top">Sites</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><div multi-select  input-model="filedata.stores"  button-label="siteName" item-label="siteName" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>'+
            '</tr>' +
            '<tr><td><app-multi-any-file-upload></app-multi-any-file-upload></td></tr>' +
            '<tr><td>' +
            '<ul class="uploadList">' +
            '<li ng-repeat="uploadedimage in filedata.uploadedimages"><div class="uploadLink"><a href="{{uploadedimage.fileurl}}">{{uploadedimage.filename}}</a></div>' +
            '<img src="images/icon_cross.gif" style="width: 3%;margin-left: 8px;" value="Remove" ng-click="removeImgFile($index)">' +
            '</li>' +
            '</ul>' +
            '</td></tr>' +
            '<tr>' +
            '<td class="half_td"><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveFile()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforFile(\'files\')"><a href="">Close</a></button>' +
            '</div></div></td>' +
            '</tr>' +
            '</tbody></table></div>' +
            '<div class="loadingImage" ng-hide="!loadingAddFileData"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {

                    $scope.loadingAddFileData = true;
                    $scope.newFile = {};
                    $scope.setPathforFile = function (path) {
                        $scope.clearFileContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $scope.loadingAddFileData = false;
                    $scope.saveFile = function () {

                        $scope.CSession = $appService.getSession();
                        if ($scope.CSession) {
                            if (!$scope.filedata.title) {
                                $("#popupMessage").html("Please enter title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            //if (!$scope.resultData || $scope.resultData.length<=0) {
                            //    $("#popupMessage").html("Please select atleast one store");
                            //    $('.popup').toggle("slide");
                            //    return false;
                            //}
                            if (!$scope.filedata.uploadedimages || $scope.filedata.uploadedimages.length == 0) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }

                            $scope.loadingAddFileData = true;

                            var query = {};
                            query.table = "file__cstore";
                            if ($scope.filedata["fileId"]) {
                                $scope.newFile["_id"] = $scope.filedata["fileId"];
                            }
                            $scope.newFile["title"] = $scope.filedata.title;
                            $scope.fileStoreManagerArray = [];
                            for (var i = 0; i < $scope.resultData.length; i++) {
                                $scope.fileStoreManagerArray.push({"_id": $scope.resultData[i].storeid._id, "email": $scope.resultData[i].userid.emailid});
                            }
                            $scope.newFile["store_manager_id"] = {data: $scope.fileStoreManagerArray, "override": "true"};
                            if ($scope.currentUser["data"]) {
                                if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                    $scope.newFile["programid"] = {"_id": $scope.currentUser.data.programid};
                                }
                                else {
                                    $scope.newFile["programid"] = {"name": $scope.filedata.selectedProgram.name, "_id": $scope.filedata.selectedProgram._id};
                                }
                            }
                            if ($scope.filedata.uploadedimages && $scope.filedata.uploadedimages.length == 0) {
                                query.operations = [$scope.newFile];
                                $scope.saveFunction(query);
                            }
                            else {
                                $scope.newFile["file"] = [];
                                for (j = 0; j < $scope.filedata.uploadedimages.length; j++) {
                                    $scope.newFile["file"][j] = $scope.filedata.uploadedimages[j].image[0];
                                }
                                query.operations = [$scope.newFile];
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
                            $scope.loadingAddFileData = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforFile("files");
                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving file");
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
