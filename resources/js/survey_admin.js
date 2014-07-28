/************************************ Survey *****************************************************/
cstore.controller('surveyCtrl', function ($scope, $appService) {
    $scope.show = {"pre": false, "next": true, "preCursor": 0, "currentCursor": 0};
    $scope.loadingSurveyData = false;
    $scope.venderSearch = [
        {"value": "title", "name": "Title"},
        {"value": "programid.name", "name": "Program"},
        {"value": "description", "name": "Description"}
    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.surveys = [];
    $scope.getAllSurveys = function (direction, limit, column, searchText) {
        if ($scope.loadingSurveyData) {
            return false;
        }
        if (direction == 1) {
            $scope.show.preCursor = $scope.show.currentCursor;
        } else {
            $scope.show.preCursor = $scope.show.preCursor - limit;
            $scope.show.currentCursor = $scope.show.preCursor;
        }

        $scope.loadingSurveyData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["title", "description", "survey_question", "survey_question.question", "survey_question.options", "programid"];
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
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyData) {
            $scope.loadingSurveyData = false;
            $scope.show.currentCursor = surveyData.response.cursor;
            $scope.surveys = surveyData.response.data;
            for (var i = 0; i < $scope.surveys.length; i++) {
                $scope.surveys[i]["deleteStatus"] = false;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
    }
    $scope.getAllSurveys(1, 10);
    $scope.setSurveyOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.show.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getAllSurveys(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getAllSurveys(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getAllSurveys(0, 10, column, searchText);
    }
    $scope.getProgramsForSurvey(null, null);
});
cstore.controller('addSurveyCtrl', function ($scope, $appService) {
    /*$scope.clearSurveyContent = function () {
     $scope.surveydata["title"] = "";
     $scope.surveydata["description"] = "";
     $scope.questions = [{"optionArr":[],"question":"","type":$scope.listType[0],"addOption":true}];
     if (!$scope.$$phase) {
     $scope.$apply();
     }
     $scope.setPath('surveys');
     } */
});
/************************************ Answered Survey Store *****************************************************/
cstore.controller('answeredStoreCtrl', function ($scope, $appService) {
    $scope.preCursor = 0
    $scope.currentCursor = 0;
    $scope.venderSearch = [

        {"value": "store_id.storename", "name": "Site Name"},
        {"value": "store_id.programid.name", "name": "Program"}

    ];
    $scope.searchby = $scope.venderSearch[0];
    $scope.getSurveyStoresName = function (direction, limit, column, searchText) {
        if ($scope.loadingStatus) {
            return false;
        }
        if (direction == 1) {
            $scope.preCursor = $scope.currentCursor;
        } else {
            $scope.preCursor = $scope.preCursor - limit;
            $scope.currentCursor = $scope.preCursor;
        }
        $scope.loadingStatus = true;
        var query = {"table": "answered_survey__cstore"};
        query.columns = [ "_id", "store_id", "survey_id", "answers", "store_id.programid"];
        query.filter = {};
        if (column && searchText && column != "" && searchText != "") {
            query.filter = {"store_id.storename": {"$regex": "(" + searchText + ")", "$options": "-i"}};
        }
        var survey_id = $scope.getURLParam("id");
        if (survey_id) {
            query.filter["survey_id"] = survey_id;
        }
        query.orders = {};
        if ($scope.sortingCol && $scope.sortingType) {
            query.orders[$scope.sortingCol] = $scope.sortingType;
        } else {
            query.orders["store_id"] = {};
            query.orders["store_id"].storename = "asc";
        }
        query.max_rows = limit;
        query.cursor = $scope.currentCursor;
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (storeData) {
            $scope.loadingStatus = false;
            if (storeData.response.data && storeData.response.data.length > 0) {
                $scope.storesName = storeData.response.data;
                $scope.currentCursor = storeData.response.cursor;
            } else {
                $scope.storesName = [];
                $scope.currentCursor = 0;
            }
        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        });
    }
    $scope.getSurveyStoresName(1, 10);
    $scope.setStoreNameOrder = function (sortingCol, sortingType, column, searchText) {
        $scope.currentCursor = 0
        $scope.sortingCol = sortingCol;
        $scope.sortingType = sortingType;
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getMore = function (column, searchText) {
        $scope.getSurveyStoresName(1, 10, column, searchText);
    }
    $scope.getLess = function (column, searchText) {
        $scope.getSurveyStoresName(0, 10, column, searchText);
    }
});

/*************************************** Survey ************************************************/
cstore.directive('surveyList', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left"><button type="button"  ng-click="setPath(\'add-survey\')"><a href>Add</a></button>' +
            '</div><div class="delete_btn pull-left"><button type="button" ng-click="deleteSurvey()"><a href>Delete</a></button></div><div class="search_by pull-left">Search By<search-by></search-by></div><div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="show.currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{show.preCursor}}-{{show.preCursor + surveys.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="show.preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div><div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th></th><th><span>Title</span><span class="sortWrap"><div class="sortUp" ng-click="setSurveyOrder(\'title\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setSurveyOrder(\'title\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setSurveyOrder(\'programid.name\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setSurveyOrder(\'programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '<th>Description<span class="sortWrap"><div class="sortUp" ng-click="setSurveyOrder(\'description\',\'asc\',searchby.value,search.searchContent)"></div><div class="sortDown" ng-click="setSurveyOrder(\'description\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th>Actions</th></tr><tr ng-repeat="survey in surveys"><td>' +
            '<input type="checkbox" ng-model="survey.deleteStatus"></td><td>{{survey.title}}</td><td>{{survey.programid.name}}</td><td>{{survey.description}}</td><td><a class="edit_btn"  ng-click="setSurveyAnsweredPath(survey._id)" href>Answered</a>' +
            '<a class="edit_btn" ng-click="setSurveyState(survey)" href>Edit</a></td></tr></table></div><div class="loadingImage" ng-hide="!loadingSurveyData"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    $scope.setPath = function (path) {
                        window.location.href = "#!/" + path;
                    }
                    $scope.setSurveyAssignedPath = function (sessionid, programid) {
                        window.location.href = "#!/assign-survey-store?id=" + sessionid + "&programid=" + programid;
                    }
                    $scope.setSurveyAnsweredPath = function (sessionid) {
                        window.location.href = "#!/answered-survey-store?id=" + sessionid;
                    }
                    $scope.search = function () {
                        $scope.show.preCursor = 0;
                        $scope.show.currentCursor = 0;
                        $scope.getAllSurveys(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.deleteSurveyArray = [];
                    $scope.deleteSurvey = function () {
                        for (var i = 0; i < $scope.surveys.length; i++) {
                            if ($scope.surveys[i].deleteStatus) {
                                $scope.deleteSurveyArray.push({"_id": $scope.surveys[i]._id, "__type__": "delete"});
                            }
                        }
                        var query = {};
                        query.table = "surveys__cstore";
                        query.operations = angular.copy($scope.deleteSurveyArray);
                        $scope.deleteSurveyArray = [];
                        if (query.operations.length) {
                            $scope.loadingSurveyData = true;
                            var currentSession = $appService.getSession();
                            var usk = currentSession["usk"] ? currentSession["usk"] : null;
                            $appService.save(query, ASK, OSK, usk, function (callBackData) {
                                $scope.loadingSurveyData = false;
                                if (callBackData.response && callBackData.response.delete && callBackData.response.delete.length) {
                                    for (var i = 0; i < $scope.surveys.length; i++) {
                                        if ($scope.surveys[i].deleteStatus) {
                                            $scope.surveys.splice(i, 1);
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
                        else {
                            $("#popupMessage").html("please select at least one survey before delete");
                            $('.popup').toggle("slide");
                        }

                    }
                    $scope.setAssignedSurveyState = function (survey) {
                        //$scope.survey["title"] = survey.title ? survey.title : "";
                        window.location.href = "#!/assigned-survey-store?q=" + survey._id;
                    }
                    $scope.setSurveyState = function (survey) {
                        $scope.surveydata["surveyId"] = survey._id ? survey._id : "";
                        $scope.surveydata["title"] = survey.title ? survey.title : "";
                        $scope.surveydata["description"] = survey.description ? survey.description : "";
                        if (survey.survey_question && survey.survey_question.length > 0) {
                            $scope.questions.length = survey.survey_question.length;
                            for (i = 0; i < survey.survey_question.length; i++) {
                                $scope.questions[i] = {"question": survey.survey_question[i].question};
                                for (var j = 0; j < $scope.listType.length; j++) {
                                    if ($scope.listType[j].value == survey.survey_question[i].survey_type) {
                                        $scope.questions[i].type = $scope.listType[j];
                                        break;
                                    }
                                }
                                $scope.questions[i]["optionArr"] = [];
                                if (survey.survey_question[i].survey_type != "subjective" && (survey.survey_question[i].options && survey.survey_question[i].options.length > 0 )) {
                                    for (k = 0; k < survey.survey_question[i].options.length; k++) {
                                        $scope.questions[i]["optionArr"][k] = {"options": survey.survey_question[i].options[k]};
                                    }
                                    $scope.questions[i].addOption = true;
                                } else {
                                    $scope.questions[i].addOption = false;
                                }
                            }
                        }
                        if (survey.programid) {
                            $scope.getProgramsForSurvey(survey.programid._id, survey._id);
                        }
                        window.location.href = "#!/edit-survey?q=" + survey._id;
                    }
                }
            }
        }
    }
}]);

cstore.directive('selectProgramSurvey', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<select class="brand" ng-model="surveydata.selectedProgram" ng-options="program.name for program in surveydata.programs" ng-change="getProgramSelectedStoreForSurvey(surveydata.selectedProgram._id,null)"></select>'
    }
}]);
cstore.directive('addsurvey', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div><div class="table_1 pull-left"><div>' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr>' +
            '<td class="full"><div class="margin_top">Title*</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="full"><input type="text" placeholder="" ng-model="surveydata.title"></td>' +
            '</tr>' +
            '<tr><td><div class="margin_top">Description*</div></td></tr>' +
            '<tr><td colspan="2"><textarea type="text" placeholder="" ng-model="surveydata.description" class="description_1"></textarea></td></tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><div class="margin_top">Program*</div></td>' +
            '<td class="half_td pull-left"><div class="margin_top">Sites</div></td>' +
            '</tr>' +
            '<tr>' +
            '<td class="half_td pull-left"><select-program-survey ng-if="currentUser.data.roleid==\'531d4a79bd1515ea1a9bbaf5\'"></select-program-survey><span ng-if="currentUser.data.roleid==\'539fddda1e993c6e426860c4\'">{{currentUser.data.programName}}</span></td>' +
            '<td class="half_td pull-left"><div multi-select  input-model="inputData"  button-label="sitename" item-label="sitename" tick-property="ticked" max-labels="3" output-model="resultData"></div></td>' +
            '</tr>' +
            '</tbody></table></div>' +
            '<h2 class="sub-head-border">' +
            '<span class="small-txt">Choose the type and add as many questions as you need.</span>  ' +
            '</h2>  ' +
            "<div class='questionWrap' ng-repeat='ques in questions'>" +
            "<div><div>" +
            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
            '<tr><td class="pull-left"><div class="margin_top">Question Type</div></td>' +
            '<td class="pull-left" colspan="2"><select class="typelist" ng-model="ques.type" ng-change="showOption(ques)" ng-options="list.name for list in listType"></select></td></tr>' +
            "</table>" +
            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
            "<tr>" +
            "<td class='full'>" +
            "<span class='ques_index'>Question* {{$index+1}}.</span> " +
            "</td>" +
            "<td align='right' valign='middle'>&nbsp;<a ng-click='questions.splice($index,1)'>" +
            "<img src='/images/icon_delete.gif' alt='delete this question' class='question_answer'>" +
            "</a></td> " +
            "</tr></table>" +
            "</div> " +
            "<div id='question_desc'><div id='bg'>" +
            "<textarea cols=76 class='description_1' rows=3 ng-model='ques.question' id='question{{$index}}' ></textarea>" +
            "</div>" +
            "</div>" +
            "<table class='full' border=0 ng-show='ques.addOption'>" +
            "<tr><td colspan='2'>" +
            "<div id='mc_answers{{$index}}' name='mc_answers{{$index}}'>" +
            "<table class='full'><tbody><tr><th>" +
            "<th class='th_option' ng-hide='ques.optionArr.length == 0'>Option</th>" +
            "<th class='th_action' ng-hide='ques.optionArr.length == 0'>Action</th>" +
            "</tr></tbody></table>" +
            "<div id='opt{{$index}}_1' name='opt{{$index}}_1' ng-repeat='opt in ques.optionArr'>" +
            "<table class='full'><tr>" +
            "<td><input type='text' ng-model='opt.options' id='answer{{$index}}'></td>" +
            "<td align=center>" +
            "<a title='delete this answer' ng-click='ques.optionArr.splice($index,1)' >" +
            "<img src='/images/comment_delete.gif' alt='delete this answer' class='no' width='8'>" +
            "</a>" +
            "</td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</div></td></tr></table>" +
            "<br/><div id='add_options{{$index}}' ng-show='ques.addOption'>" +
            "<a title='Add alternate correct answers.' ng-click='ques.optionArr.push({options:[]})'>" +
            "<strong>+ Add New Option</strong>" +
            "</a></b><br/><br/></div>" +
            "</div></div>" +
            '<div class="questionToolBox">' +
            '<div style="width: 800px;" class="add-questions-box" id="qButtons"> ' +
            '<span style="position: relative;" ng-click="questions.push({optionArr:[],type:listType[0],addOption:true})" class="btn">  ' +
            '<strong id="checkbox" class="plusSign">&nbsp;</strong>&nbsp;+ Add Question&nbsp;</span> ' +
            '</div>   ' +
            '</div> ' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>' +
            '<tr><td><div class="save_close pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="saveSurvey()"><a href>Save</a></button>' +
            '</div><div class="delete_btn pull-left">' +
            '<button type="button" ng-click="clearSurveyContent()"><a href="">Close</a></button>' +
            '</div></div></td></tr>' +
            '</tbody></table>' +
            '<div class="loadingImage" ng-hide="!loadingAddTrainingdata"><img src="/images/loading.gif"></div>' +
            '</div>' +
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {
                    if (window.location.hash == "#!/add-survey")
                        $scope.questions = [
                            {"optionArr": [], "question": "", "type": $scope.listType[0], "addOption": true}
                        ];
                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    $scope.showOption = function (ques) {
                        if (ques.type.value != "subjective") {
                            ques.addOption = true;
                        } else {
                            ques.addOption = false;
                        }
                    }
                    $scope.saveSurvey = function () {
                        if ($scope.CSession) {
                            if (!$scope.surveydata.title) {
                                $("#popupMessage").html("Please enter survey title");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            if (!$scope.surveydata.description) {
                                $("#popupMessage").html("Please enter description");
                                $('.popup').toggle("slide");
                                return false;
                            }
                            //if (!$scope.resultData || $scope.resultData.length<=0) {
                            //    $("#popupMessage").html("Please select atleast one store");
                            //    $('.popup').toggle("slide");
                            //    return false;
                            //}
                            $scope.loadingAddTrainingdata = true;
                            var query = {};
                            var newSession = {};
                            query.table = "surveys__cstore";
                            if ($scope.surveydata["surveyId"]) {
                                newSession["_id"] = $scope.surveydata["surveyId"];
                            }
                            $scope.surveyStoreManagerArray = [];
                            for (var i = 0; i < $scope.resultData.length; i++) {
                                $scope.surveyStoreManagerArray.push({"_id": $scope.resultData[i].storeid, "email": $scope.resultData[i].emailid, "status": "unanswered"});
                            }
                            newSession["title"] = $scope.surveydata.title;
                            newSession["description"] = $scope.surveydata.description;
                            if ($scope.currentUser["data"]) {
                                if ($scope.currentUser["data"]["roleid"] == PROGRAMADMIN) {
                                    newSession["programid"] = {"_id": $scope.currentUser.data.programid};
                                }
                                else {
                                    newSession["programid"] = {"name": $scope.surveydata.selectedProgram.name, "_id": $scope.surveydata.selectedProgram._id};
                                }
                            }
                            newSession["store_manager_id"] = {data: $scope.surveyStoreManagerArray, "override": "true"};
                            newSession["survey_question"] = [];
                            for (i = 0; i < $scope.questions.length; i++) {
                                if (!$scope.questions[i].question) {
                                    $("#popupMessage").html("Please enter question " + Number(i + 1) + ".");
                                    $('.popup').toggle("slide");
                                    return;
                                }
                                newSession["survey_question"][i] = {"question": $scope.questions[i].question};
                                newSession["survey_question"][i]["survey_type"] = $scope.questions[i].type.value;
                                if ($scope.questions[i].type.value != "subjective") {
                                    newSession["survey_question"][i]["options"] = [];
                                    if ($scope.questions[i].optionArr.length < 2) {
                                        $("#popupMessage").html("Please add at least two options of question " + Number(i + 1) + ".");
                                        $('.popup').toggle("slide");
                                        return;
                                    }
                                    for (j = 0; j < $scope.questions[i].optionArr.length; j++) {
                                        if (!$scope.questions[i].optionArr[j].options || ($scope.questions[i].optionArr[j].options && $scope.questions[i].optionArr[j].options.length == 0)) {
                                            $("#popupMessage").html("Please enter option " + Number(j + 1) + " of question " + Number(i + 1) + ".");
                                            $('.popup').toggle("slide");
                                            return;
                                        }
                                        newSession["survey_question"][i]["options"][j] = $scope.questions[i].optionArr[j].options;
                                    }
                                }
                            }
                            newSession["survey_question"] = {data: newSession["survey_question"], "override": "true"};
                            query.operations = [newSession];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingAddTrainingdata = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Saved successfully");
                                    $('.popup').toggle("slide");
                                    $scope.setPath('surveys');
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while saving survey");
                                    $('.popup').toggle("slide");
                                }
                                $scope.clearSurveyContent();
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                                $scope.loadingAddTrainingdata = false;
                            });
                        } else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }

                }
            }
        }
    }
}]);

cstore.directive('surveyAnsweredStore', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'surveys\')"><a href>Back</a></button>' +
            '</div><div class="search_by pull-left">Search By<search-by></search-by></div>' +
            '<div class="search_2 pull-left"><form ng-submit="search()"><input type="text" placeholder="Search" name="search_theme_form"size="15" ng-model="search.searchContent"  title="Enter the terms you wish to search for." class="search_2">' +
            '<div class="search_sign_2 pull-left"><a ng-click="search()"><img style="cursor: pointer" src="images/Search.png"></a></div><input type="submit" style="display:none;"></form></div><div ng-click="getMore(searchby.value,search.searchContent)" ng-show="currentCursor" class="prv_btn pull-right">' +
            '<a href><img src="images/Aiga_rightarrow_invet.png"></a></div><div class="line_count pull-right">{{preCursor}}-{{preCursor + storesName.length}} from start</div>' +
            '<div class="nxt_btn pull-right" ng-show="preCursor" ng-click="getLess(searchby.value,search.searchContent)"><a href><img src="images/Aiga_rightarrow_inv.png"></a></div></div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Site Name</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'store_id.storename\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'store_id.storename\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th><th><span>Program</span><span class="sortWrap"><div class="sortUp" ng-click="setStoreNameOrder(\'store_id.programid.name\',\'asc\',searchby.value,search.searchContent)"></div>' +
            '<div class="sortDown" ng-click="setStoreNameOrder(\'store_id.programid.name\',\'desc\',searchby.value,search.searchContent)"></div>	</span></th>' +
            '</tr><tr ng-repeat="store in storesName"><td><a ng-click = "setQuesAns(store)">{{store.store_id.storename}}</a></td><td>{{store.store_id.programid.name}}</td>' +
            '</tr></table></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                    $scope.search = function () {
                        $scope.preCursor = 0;
                        $scope.currentCursor = 0;
                        $scope.getSurveyStoresName(1, 10, $scope.searchby.value, $scope.search.searchContent);
                    }
                    $scope.setQuesAns = function (store) {
                        $scope.loadingStatus = true;
                        var query = {};
                        query.table = "surveys__cstore";
                        query.columns = ["store_manager_id", "survey_question"];
                        query.filter = {"_id": store.survey_id};
                        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};
                        var serviceUrl = "/rest/data";
                        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyResp) {
                            $scope.loadingStatus = false;
                            var surveyData = surveyResp.response.data[0].survey_question;
                            for (var i = 0; i < surveyData.length; i++) {
                                $scope.answeredSurveys[i] = {"question": surveyData[i].question};
                                if (store.answers[i] instanceof Object) {
                                    $scope.answeredSurveys[i].answer = store.answers[i];
                                    $scope.answeredSurveys[i].is_array = true;
                                } else {
                                    $scope.answeredSurveys[i].answer = store.answers[i];
                                    $scope.answeredSurveys[i].is_array = false;
                                }
                            }
                            window.location.href = "#!/assigned-survey-response";
                        });
                    }
                }
            }
        }
    }
}]);

cstore.directive('assignedSurveyResponse', ['$appService', function ($appService, $scope) {
    return {
        restrict: 'E',
        template: '<div><div class="add_delete pull-left"><div class="add_btn pull-left">' +
            '<button type="button" ng-click="setPath(\'surveys\')"><a href>Back</a></button>' +
            '</div>' +
            '</div>' +
            '<div class="table pull-left">' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th><span>Answered Surveys</span></th>' +
            '</tr></table><div class="queans" ng-repeat="answeredSurvey in answeredSurveys"><div class="que"><b>Ques {{$index + 1}}. </b>{{answeredSurvey.question}}</div>' +
            '<div class="que" ng-switch="answeredSurvey.is_array"><div ng-switch-when="true"><span class="ans_label"><b>Ans.</b></span><ul class="answers"> <li ng-repeat="answer in answeredSurvey.answer">{{answer}}</li></ul></div></div>' +
            '<div class="que" ng-show="!answeredSurvey.is_array"><b>Ans.</b> {{answeredSurvey.answer}}</div>' +
            '</div></div><div class="loadingImage" ng-show="loadingStatus"><img src="images/loading.gif"></div></div>',
        compile: function () {
            return {
                post: function ($scope) {
                }
            }
        }
    }
}]);
