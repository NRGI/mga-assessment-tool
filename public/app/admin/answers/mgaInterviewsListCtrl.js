'use strict';
//var angular;
/*jslint nomen: true regexp: true*/

angular.module('app').controller('mgaInterviewsListCtrl', function ($scope, $route, $routeParams, $location, mgaIdentitySrvc, mgaNotifier, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaUserListSrvc, mgaAnswerSrvc) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by question number"},
        {value: "question_flow_order", text: "Sort by question order"},
        {value: "question_indicator_ID", text: "Sort by indicator"},
        {value: "question_data_type", text: "Sort by data type"},
        {value: "status", text: "Sort by status"}
    ];
    $scope.sort_order = $scope.sort_options[0].value;

    // pull assessment data and add
    mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = [];
        mgaAnswerSrvc.query({
            assessment_ID: $routeParams.assessment_ID,
            question_mode: 'interview'
        }, function (answers) {

            $scope.edited_by = mgaUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});
            $scope.user_list = [];
            data.users.forEach(function (el) {
                var u = mgaUserListSrvc.get({_id: el});
                $scope.user_list.push(u);
            });
            $scope.answer_list = answers;
            $scope.assessment = data;
        });
    });
    $scope.submitAssessment = function () {
        console.log($scope);
        var new_assessment_data = $scope.assessment;

        new_assessment_data.status = 'interview';
        new_assessment_data.questions_complete = 0;
        mgaAnswerSrvc.query({
            assessment_ID: $routeParams.assessment_ID,
            question_mode: 'interview'
        }, function (answers) {
            new_assessment_data.question_set_length = answers.length;
            mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data).then(function () {
                mgaNotifier.notify('Assessment submited');
                $route.reload();
                //$location.path('/admin/assessment-admin');
            }, function (reason) {
                mgaNotifier.notify(reason);
            });

        });


    }
});
