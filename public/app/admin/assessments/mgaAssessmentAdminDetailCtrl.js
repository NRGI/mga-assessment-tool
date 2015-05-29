'use strict';
var angular;
/*jslint nomen: true regexp: true*/

angular.module('app').controller('mgaAssessmentAdminDetailCtrl', function ($scope, mgaAssessmentSrvc, mgaUserListSrvc, mgaAnswerSrvc, $routeParams) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by Question Number"},
        {value: "status", text: "Sort by Status"}
    ];
    $scope.sortOrder = $scope.sort_options[0].value;

    // pull assessment data and add
    mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = mgaAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID, question_mode: data.status});

        $scope.assessment = data;

    });
});