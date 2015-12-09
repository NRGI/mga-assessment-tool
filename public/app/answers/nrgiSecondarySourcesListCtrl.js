'use strict';
angular.module('app').controller('nrgiSecondarySourcesListCtrl', function ($scope, $route, $routeParams, nrgiNotifier, nrgiAnswerSrvc, nrgiAssessmentSrvc, nrgiAnswerMethodSrvc, nrgiUserListSrvc, nrgiIdentitySrvc) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by question number"},
        {value: "question_flow_order", text: "Sort by question order"},
        {value: "question_indicator_ID", text: "Sort by indicator"},
        {value: "question_secondary_source", text: "Sort by source"},
        {value: "question_data_type", text: "Sort by data type"},
        {value: "status", text: "Sort by status"}
    ];
    $scope.sort_order = $scope.sort_options[0].value;

    $scope.identity = nrgiIdentitySrvc;
    $scope.new_score = {};

    //$scope.assessment = nrgiAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID});
    //
    //$scope.answer_list = nrgiAnswerSrvc.query({
    //    assessment_ID: $routeParams.assessment_ID,
    //    question_mode: 'secondary_source'
    //});

    // pull assessment data and add
    nrgiAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = [];
        nrgiAnswerSrvc.query({
            assessment_ID: $routeParams.assessment_ID,
            question_mode: 'secondary_source'
        }, function (answers) {
            $scope.question_set_length = answers.length;

            $scope.edited_by = nrgiUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});
            $scope.user_list = [];
            data.users.forEach(function (el) {
                var u = nrgiUserListSrvc.get({_id: el});
                $scope.user_list.push(u);
            });
            $scope.answer_list = answers;
            $scope.assessment = data;
        });
    });

    $scope.answerSave = function (answer) {
        console.log(answer.value);

        if (typeof answer.value !== 'number') {
            nrgiNotifier.error('You must enter a number!');
        } else {
            if (answer.status === 'created') {
                answer.status = 'submitted';
            }
            answer.answer_score = {
                value: answer.value
            };
            delete answer.value;
            nrgiAnswerMethodSrvc.updateAnswer(answer).then(function () {
                nrgiNotifier.notify('Answer saved');
                //$route.reload();
            }, function (reason) {
                nrgiNotifier.notify(reason);
            });
        }
    };

    $scope.answerSubmit = function (answer) {
        console.log(answer);
    };

});
