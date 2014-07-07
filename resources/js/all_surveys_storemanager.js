cstore.controller('surveyDetailCtrl', function ($scope, $appService, $routeParams) {
    $appService.auth();
    $scope.getSurveyDetail = function (searchText) {

        $scope.surveyQuestions = [
            {"options": [
                {"optionVal": "", "optionStatus": false}
            ], "optionType": "" }
        ];
        $scope.loadingSurveyDetailData = true;
        var query = {"table": "surveys__cstore"};
        query.columns = ["description", "title", "survey_question", "store_manager_id"];
        query.filter = {};
        query.filter["store_manager_id._id"] = $scope.currentUser.data.storeid;
        query.filter["store_manager_id.status"] = "unanswered";
        query.unwindcolumns={"store_manager_id":1};
        //query.filter = {"store_manager_id._id": $scope.currentUser.data.storeid, "_id": $routeParams.surveyid};
        //if (searchText && searchText != "") {
        //    query.filter["training_session_id.file.name"] = {"$regex": "(" + searchText + ")", "$options": "-i"};
        //}
        var queryParams = {query: JSON.stringify(query), "ask": ASK, "osk": OSK};

        var serviceUrl = "/rest/data";
        $appService.getDataFromJQuery(serviceUrl, queryParams, "GET", "JSON", function (surveyDetailData) {
            $scope.loadingSurveyDetailData = false;
            $scope.surveys = surveyDetailData.response.data;
            for(var i=0; i < $scope.surveys.length; i++){
                $scope.surveys[i].surveyAssignedStores=surveyDetailData.response.data[i].store_manager_id;
                $scope.surveys[i].surveyQuestions=surveyDetailData.response.data[i].survey_question;
                if ($scope.surveys[i].surveyQuestions.length > 0) {
                    for (var k = 0; k < $scope.surveys[i].surveyQuestions.length; k++) {
                        if ($scope.surveys[i].surveyQuestions[k].options) {
                            //$scope.surveyQuestions[i].optionArray = $scope.surveyQuestions[i].options;
                            for (var j = 0; j < $scope.surveys[i].surveyQuestions[k].options.length; j++) {

                                if ($scope.surveys[i].surveyQuestions[k].options.length) {
                                    $scope.surveys[i].surveyQuestions[k].options[j] = {"optionVal": $scope.surveys[i].surveyQuestions[k].options[j], "optionStatus": false};
                                }

                            }

                        }

                    }
                }
            }
            //if (surveyDetailData.response.data[0].survey_question) {
            //    $scope.surveyQuestions = surveyDetailData.response.data[0].survey_question;
            //}

        }, function (jqxhr, error) {
            $("#popupMessage").html(error);
            $('.popup').toggle("slide");
        })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.getSurveyDetail();

});
/************************* Survey Detail****************************/
cstore.directive('surveyDetail', ['$appService', function ($appService, $scope) {
    return{
        restrict: 'E',
        template: '<div>'+
            '<div ng-hide="surveys.length > 0">No Survey has been assigned.</div>'+
            '<div class="survey_all" ng-show="surveys.length > 0" ng-repeat="survey in surveys">' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Title</div>' +
            '<div class="survey_right pull-right">{{survey.title}}</div></div>' +
            '<div class="survey_dic pull-left">' +
            '<div class="survey_left pull-left">Description</div>' +
            '<div class="survey_right pull-right">{{survey.description}}</div></div>' +
            '<div class="clear"></div>' +
            '<div class="survey_form pull-left">' +
            '<div class="survey_title">Please complete the following Questions regarding your experiences with us.</div>' +
            '<div class="survey_dic pull-left" ng-repeat="surveyQuestion in survey.surveyQuestions">' +
            '<div class="survey_que pull-left">{{surveyQuestion.question}}</div>' +
            '<div class="survey_ans pull-right">' +
            '<form action ng-if="surveyQuestion.survey_type==\'radio\'">' +
            '<div ng-repeat="option in surveyQuestion.options">' +
            '<input type="radio" name="option" value="{{option.optionVal}}" ng-model="surveyQuestion.radioAns"/> {{option.optionVal}}</div></form>' +
            '<form action ng-if="surveyQuestion.survey_type==\'checkbox\'">' +
            '<div ng-repeat="option in surveyQuestion.options">' +
            '<input type="checkbox" value="{{option.optionVal}}" ng-model="option.optionStatus"/> {{option.optionVal}}</div></form>' +
            '<textarea ng-if="surveyQuestion.survey_type==\'subjective\'" ng-model="surveyQuestion.answer" ></textarea></div>' +
            '</div>' +
            '<div class="add_delete pull-right"><div class="add_btn pull-right"><button type="button" ng-click="clearSubmittedSurvey(survey._id)"><a href="">Cancel</a></button></div><div class="delete_btn pull-right">' +
            '<button type="button" ng-click="submitSurvey(survey)"><a href="">Submit</a></button></div></div>' +
            '</div>' +
            '</div>'+
            '<div class="loadingImage" ng-hide="!loadingSurveyDetailData"><img src="images/loading.gif"></div>'+
            '</div>',
        compile: function () {
            return {
                pre: function ($scope) {

                },
                post: function ($scope) {
                    $scope.CSession = $appService.getSession();
                    $scope.submitSurvey = function (survey) {
                        if ($scope.CSession) {
                            $scope.loadingSurveyDetailData = true;
                            var query = {};
                            $scope.newSurveyAnswer = {};
                            $scope.newSurveyAnswer["answers"] = {};
                            query.table = "answered_survey__cstore";
                            $scope.newSurveyAnswer["survey_id"] = {"_id": survey._id};
                            $scope.newSurveyAnswer["store_id"] = {"_id": $scope.currentUser.data.storeid};
                            for(var tempid=0; tempid <$scope.surveys.length;tempid++){
                                if($scope.surveys[tempid]._id==survey._id){
                                    for (var i = 0; i < $scope.surveys[tempid].surveyQuestions.length; i++) {
                                        if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "radio") {
                                            //for (j = 0; j < $scope.surveyQuestions[i].options.length; j++){

                                            $scope.newSurveyAnswer["answers"][i] = $scope.surveys[tempid].surveyQuestions[i].radioAns;
                                            //}
                                        }
                                        else if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "checkbox") {
                                            var temp = [];
                                            for (var j = 0; j < $scope.surveys[tempid].surveyQuestions[i].options.length; j++) {
                                                if ($scope.surveys[tempid].surveyQuestions[i].options[j].optionStatus) {
                                                    temp.push($scope.surveys[tempid].surveyQuestions[i].options[j].optionVal);

                                                }
                                            }
                                            $scope.newSurveyAnswer["answers"][i] = temp;
                                        }
                                        else {
                                            $scope.newSurveyAnswer["answers"][i] = $scope.surveys[tempid].surveyQuestions[i].answer;
                                        }
                                    }
                                    break;
                                }
                            }
                            query.operations = [$scope.newSurveyAnswer];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $scope.changeStatusOfSurvey(survey);
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                    $scope.loadingSurveyDetailData = false;
                                }
                                else {
                                    $("#popupMessage").html("some error while submitting survey");
                                    $('.popup').toggle("slide");
                                    $scope.loadingSurveyDetailData = false;
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                                $scope.loadingSurveyDetailData = false;
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                            $scope.loadingSurveyDetailData = false;
                        }
                    }
                    $scope.changeStatusOfSurvey = function (survey) {
                        if ($scope.CSession) {
                            var query = {};
                            $scope.newSurveyStatus = {};
                            $scope.newSurveyStatus["store_manager_id"] = {};
                            query.table = "surveys__cstore";
                            $scope.newSurveyStatus["_id"] = survey._id;
                            var storeArray = [];
                                    var statusObj = {"_id": "", "status":"","__type__":""};
                                    statusObj._id=$scope.currentUser.data.storeid;
                                    statusObj.status="answered";
                                    statusObj.__type__="update";
                                    storeArray.push(statusObj);
                            $scope.newSurveyStatus.store_manager_id=storeArray;
                            query.operations = [$scope.newSurveyStatus];
                            $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                                $scope.loadingSurveyDetailData = false;
                                if (callBackData.code == 200 && callBackData.status == "ok") {
                                    $("#popupMessage").html("Submitted");
                                    $('.popup').toggle("slide");
                                    for (var i = 0; i < $scope.surveys.length; i++) {
                                        if ($scope.surveys[i]._id == survey._id) {
                                            $scope.surveys.splice(i, 1);
                                            i--;
                                        }
                                    }
                                } else if (callBackData.responseText && JSON.parse(callBackData.responseText).response) {
                                    $("#popupMessage").html(JSON.parse(callBackData.responseText).response);
                                    $('.popup').toggle("slide");
                                }
                                else {
                                    $("#popupMessage").html("some error while submitting survey");
                                    $('.popup').toggle("slide");
                                }
                            }, function (err) {
                                $("#popupMessage").html(err.stack);
                                $('.popup').toggle("slide");
                            });
                        }
                        else {
                            $("#popupMessage").html("Please login first");
                            $('.popup').toggle("slide");
                        }
                    }
                    $scope.clearSubmittedSurvey = function (surveyid) {
                        for (var tempid = 0; tempid < $scope.surveys.length; tempid++) {
                            if ($scope.surveys[tempid]._id == surveyid) {
                                for (i = 0; i < $scope.surveys[tempid].surveyQuestions.length; i++) {
                                    if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "radio") {

                                        $scope.surveys[tempid].surveyQuestions[i].radioAns = false;

                                    }
                                    else if ($scope.surveys[tempid].surveyQuestions[i].options && $scope.surveys[tempid].surveyQuestions[i].survey_type == "checkbox") {
                                        for (j = 0; j < $scope.surveys[tempid].surveyQuestions[i].options.length; j++) {
                                            $scope.surveys[tempid].surveyQuestions[i].options[j].optionStatus = false;
                                        }
                                    }
                                    else {
                                        $scope.surveys[tempid].surveyQuestions[i].answer = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}]);
