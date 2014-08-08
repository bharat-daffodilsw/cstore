/*******************************************Training Session*************************************************/
cstore.controller('trainingSessionCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingTrainingSessionData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"},
        {"value": "training_category_id.name", "name": "Training Category"},
        {"value": "video_url", "name": "Video Url"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.trainingSessions = [];
    $appService.auth();
    $scope.getAllTrainingSessions = function (direction, limit, column, searchText) {
        if ($scope.loadingTrainingSessionData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingTrainingSessionData = true;
        var query = {"table": "training_session__cstore"};
        query.columns = ["title", "description", "file","image", "training_category_id", "video_url","programid"];
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (trainingSessionData) {
            $scope.loadingTrainingSessionData = false;
            $scope.show.currentCursor = trainingSessionData.response.cursor;
            $scope.trainingSessions = trainingSessionData.response.data;
            for (var i = 0; i < $scope.trainingSessions.length; i++) {
                $scope.trainingSessions[i]["deleteStatus"] = false;
                $scope.trainingSessions[i].string_video_url = ($scope.trainingSessions[i].video_url) ? $scope.trainingSessions[i].video_url.toString() : "";
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllTrainingSessions(1, 10);
    $scope.setTrainingSessionOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllTrainingSessions(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllTrainingSessions(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllTrainingSessions(0, 10, column, searchText);
    }
    $scope.getProgramsForTraining(null,null);
    $scope.getTrainingCategories();
});

cstore.controller('addTrainingSessionCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();


    var trainingId = $routeParams.q;
    if (trainingId && trainingId != undefined && trainingId != "undefined") {
        $scope.trainingdata["trainingSessionId"] = trainingId;
    }
    else {
        delete $scope.trainingdata["trainingSessionId"];
    }
})

/******************************************* Training Session****************************************************/
cstore.directive('trainingSessionList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button" ng-click="setPath(\'add-training-session\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteTrainingSession()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + trainingSessions.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setTrainingSessionOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div></span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setTrainingSessionOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Training Category<span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'training_category_id.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setTrainingSessionOrder(\'training_category_id.name\',\'desc\',searchby.value,search.searchContent)"></div>	' +
            '</span></th><th><span>Video Url</span><span class="sortWrap"><div class="sortUp" ng-click="setTrainingSessionOrder(\'video_url\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setTrainingSessionOrder(\'video_url\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>Actions</th></tr><tr ng-repeat="trainingSession in trainingSessions"><td>' +
            '<input type="checkbox" ng-model="trainingSession.deleteStatus"></td><td>{{trainingSession.title}}</td><td>{{trainingSession.programid.name}}</td><td>{{trainingSession.training_category_id.name}}</td><td>' +
            '{{trainingSession.string_video_url}}</td><td>' +
            '<a class="edit_btn" ng-click="setTrainingSessionState(trainingSession)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingTrainingSessionData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.setAssignedPath = function (sessionid,programid) {
                        window.location.href = "#!/assign-store?id=" + sessionid + "&programid=" + programid;
                    }
                    $scope.showAssignPopup = function (session) {
                        $(".assign_popup").show();
                        $scope.sessionTitle = session.title;
                        $scope.sessionId = session._id;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllTrainingSessions(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteTrainingSessionArray = [];
                    $scope.deleteTrainingSession = function () {
                        for (var i = 0; i < $scope.trainingSessions.length; i++) {
                            if ($scope.trainingSessions[i].deleteStatus) {
                                $scope.deleteTrainingSessionArray.push({"_id": $scope.trainingSessions[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "training_session__cstore";
                        query.operations = angular.copy($scope.deleteTrainingSessionArray);
                        $scope.deleteTrainingSessionArray = [];
                        if (query.operations.length) {
                        $scope.loadingTrainingSessionData=true;
                        var currentSession = $appService.getSession();
                        var usk = currentSession["usk"] ? currentSession["usk"] : null;
                        $appService.save(query, ASK, OSK, usk, function (callBackData) {
                            $scope.loadingTrainingSessionData=false;
                            if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                for (var i = 0; i < $scope.trainingSessions.length; i++) {
                                    if ($scope.trainingSessions[i].deleteStatus) {
                                        $scope.trainingSessions.splice(i, 1);
                                        i--;
                                    }
                                }
                                $scope.search();
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
                        else{
                            $("#popupMessage").html("please select at least one training before delete");
                            $('.popup').toggle("slide");
                            $scope.loadingProductData = false;
                        }

                    }
                    $scope.setTrainingSessionState = function (trainingSession) {
                        $scope.trainingdata["title"] = trainingSession.title ? trainingSession.title : "";
                        $scope.trainingdata["video_url"] = trainingSession.video_url ? trainingSession.video_url : "";
                        $scope.trainingdata["description"] = trainingSession.description ? trainingSession.description : "";
                        if (trainingSession.image) {
                            $scope.oFile.fileExist = true;
                        }
                        $scope.showFile(trainingSession.image, false);
                        if (trainingSession.training_category_id._id) {
                            for (var j = 0; j < $scope.trainingdata.trainingCategories.length; j++) {
                                if ($scope.trainingdata.trainingCategories[j]._id == trainingSession.training_category_id._id) {
                                    $scope.trainingdata.selectedTrainingCategory = $scope.trainingdata.trainingCategories[j];
                                    break;
                                }
                            }
                        }
                        $scope.trainingdata.editImages = trainingSession.file;
                        if (trainingSession.file && trainingSession.file.length > 0) {
                            for (var k = 0; k < trainingSession.file.length; k++) {
                                $scope.trainingdata.uploadedimages[k] = {"filename": trainingSession.file[k].name};
                                $scope.trainingdata.uploadedimages[k].fileurl = BAAS_SERVER + "/file/download?filekey=" + trainingSession.file[k].key + "&ask=" + ASK + "&osk=" + OSK;
                            }
                        }
                        if (trainingSession.programid) {
                            $scope.getProgramsForTraining(trainingSession.programid._id,trainingSession._id);
                        }
                        window.location.href = "#!edit-training-session?q=" + trainingSession._id;
                    }
                    $scope.setAssignedSessionState = function (session) {
                        $scope.session_title = session.title;
                        window.location.href = "#!/assigned-session-store?q=" + session._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('trainingCategorySelect', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="search_select" ng-model="trainingdata.selectedTrainingCategory" ng-options="trainingCategory.name for trainingCategory in trainingdata.trainingCategories"></select>'
    }
}]);


cstore.directive('selectProgramTraining', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="trainingdata.selectedProgram" ng-options="program.name for program in trainingdata.programs" ng-change="getProgramSelectedStoreForTraining(trainingdata.selectedProgram._id,null)"></select>'
    }
}]);
cstore.directive('addTrainingSession', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>' +
            '<div class="table_1 pull-left">' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tbody>' +
            '<tr>' +
            '<td class="half_td pull-left"><div class="margin_top">Title*</div></td>' +
            '<td class="half_td pull-left"><div class="margin_top">Training Category*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><input type="text" placeholder="" ng-model="trainingdata.title"></td>' +
            '<td class="half_td pull-left"><training-category-select></training-category-select></td>' +
            '</tr>' +
            '<tr>' +
            '<td><div class="margin_top">Description*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2"><textarea type="text" placeholder="" ng-model="trainingdata.description" class="description"></textarea></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '<div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td><div class="margin_top">Video Url</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td>' +
            '<ul id="demo2" data-name="demo2" class="tagit">' +
            '<li class="tagit-new">' +
            '<input class="tagit-input ui-autocomplete-input" type="text" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">' +
            '</li>' +
            '<ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 1; top: 0px; left: 0px; display: none;">' +
            '</ul>' +
            '</ul>' +
            '</td>' +
            '</tr>' +
            '</table>'+
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Program*</div></td>' +
            '<td class="half_td"><div class="margin_top">Sites</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><select-program-training ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></select-program-training><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '<td class="half_td"><div multi-select  input-model="inputData"  button-label="sitename" item-label="sitename" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>'+
            '</tr>'+
            '<tr>' +
            '<td class="half_td"><div class="margin_top">Files*</div></td>' +
            '<td class="half_td"><div class="margin_top">Image*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td"><app-multi-file-upload></app-multi-img-file-upload>' +
            '<td class="product_image half_td"><app-file-upload></app-file-upload></td>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' +
            '<ul class="uploadList">' +
            '<li ng-repeat="uploadedimage in trainingdata.uploadedimages"><div class="uploadLink"><a href="{{uploadedimage.fileurl}}">{{uploadedimage.filename}}</a></div>' +
            '<img src="images/icon_cross.gif" style="width: 3%;margin-left: 8px;" value="Remove" ng-click="removeImgFile($index)">' +
            '</li>' +
            '</ul>' +
            '</td>' +
            '</tr>' +
            '</tbody></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveTrainingSession()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="setPathforSession(\'trainings\')"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingAddTrainingdata"><img src="images/loading.gif"></div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.loadingAddTrainingData = true;
                    $scope.newSession = {};
                    $scope.setPathforSession = function (path) {
                        $scope.clearTrainingSessionContent();
                        window.location.href = "#!/" + path;
                    }
                },
                post: function ($scope) {
                    $('#demo2').tagit();
                    if ($scope.trainingdata.video_url && $scope.trainingdata.video_url.length > 0) {
                        $("#demo2").tagit("fill", $scope.trainingdata.video_url);
                    }
                    $scope.loadingAddTrainingData = false;
                    $scope.saveTrainingSession = function () {
                        $scope.CSession = $appService.getSession();
                        var regexp = /(ftp|http|https|www)(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                        var video_url = $scope.showTags($('#demo2').tagit("tags"));
                        var invalid_url = false;
                        for (i = 0; i < video_url.length; i++) {
                            if (!regexp.test(video_url[i])) {
                                invalid_url = true;
                                break;
                            }
                        }
                        if ($scope.CSession) {
                            if (!$scope.trainingdata.title) {
                                $("#popupMessage").html("Please enter training session title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.trainingdata.description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (video_url && video_url.length >0 && invalid_url) {
                                $("#popupMessage").html("Please enter valid video url");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            //if (!$scope.resultData || $scope.resultData.length<=0) {
                            //    $("#popupMessage").html("Please select atleast one store");
                            //    $('.popup').toggle("slide");
                            //    return false;
                            //}
                            if (!$scope.trainingdata.uploadedimages || $scope.trainingdata.uploadedimages.length == 0) {
                                $("#popupMessage").html("Please upload file");
                                $('.popup').toggle("slide");
                                return false;
                            }
//                            if (!$scope.oFile.fileExist) {
//                                $("#popupMessage").html("Please upload image");
//                                $('.popup').toggle("slide");
//                                return false;
//                            }
                            $scope.loadingAddTrainingdata = true;
                            $scope.trainingAssignedStoreManagerArray = [];
                            for (var i = 0; i < $scope.resultData.length; i++) {
                                $scope.trainingAssignedStoreManagerArray.push({"_id": $scope.resultData[i].storeid, "email": $scope.resultData[i].emailid});
                            }
                            var query = {};
                            query.table = "training_session__cstore";
                            if ($scope.trainingdata["trainingSessionId"]) {
                                $scope.newSession["_id"] = $scope.trainingdata["trainingSessionId"];
                            }
                            $scope.newSession["title"] = $scope.trainingdata.title;
                            $scope.newSession["description"] = $scope.trainingdata.description;
                            $scope.newSession["video_url"] = $scope.showTags($("#demo2").tagit("tags"));
                            $scope.newSession["training_category_id"] = {"name": $scope.trainingdata.selectedTrainingCategory.name, "_id": $scope.trainingdata.selectedTrainingCategory._id};
                            if ($scope.currentUser["data"]) {
                                if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                    $scope.newSession["programid"] = {"_id": $scope.currentUser.data.programid};
                                }
                                else {
                                    $scope.newSession["programid"] = {"name": $scope.trainingdata.selectedProgram.name, "_id": $scope.trainingdata.selectedProgram._id};
                                }
                            }
                            $scope.newSession["store_manager_id"] = {data: $scope.trainingAssignedStoreManagerArray, "override": "true"};
                            if (document.getElementById('uploadfile').files.length === 0) {
                                delete $scope.newSession["image"];
                                query.operations = [$scope.newSession];
                                $scope.uploadMultipleFiles(query);
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
                                            $scope.newSession["image"] = data.response;
                                            query.operations = [$scope.newSession];
                                            $scope.uploadMultipleFiles(query);
                                        }
                                        else {
                                            $("#popupMessage").html("some error while uploading image please try again");
                                            $('.popup').toggle("slide");
                                            $scope.loadingAddTrainingdata = false;

                                        }
                                    }, function (callbackerror) {
                                        $("#popupMessage").html(callbackerror);
                                        $('.popup').toggle("slide");
                                        $scope.loadingAddTrainingdata = false;
                                    });
                                }
                                else {
                                    $("#popupMessage").html("Please Upload Image File only");
                                    $('.popup').toggle("slide");
                                    $scope.loadingAddTrainingdata = false;
                                }
                            }
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    };
                    $scope.uploadMultipleFiles=function(query){
                        if ($scope.trainingdata.uploadedimages && $scope.trainingdata.uploadedimages.length == 0) {
                            query.operations = [$scope.newSession];
                            $scope.saveFunction(query);
                        }
                        else {
                            $scope.newSession["file"] = [];
                            for (j = 0; j < $scope.trainingdata.uploadedimages.length; j++) {
                                $scope.newSession["file"][j] = $scope.trainingdata.uploadedimages[j].image[0];
                            }
                            query.operations = [$scope.newSession];
                            $scope.saveFunction(query);
                        }
                    }
                    $scope.saveFunction = function (query) {

                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.loadingAddTrainingdata = false;
                            if (callBackData.code == 200 && callBackData.status == "ok") {
                                $("#popupMessage").html("Saved successfully");
                                $('.popup').toggle("slide");
                                $scope.setPathforSession("trainings");
                            } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                $('.popup').toggle("slide");
                            }
                            else {
                                $("#popupMessage").html("some error while saving training session");
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
