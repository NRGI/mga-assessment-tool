'use strict';
var angular;
/*jslint nomen: true regexp: true*/

angular.module('app').controller('mgaAssessmentAdminDetailCtrl', function ($scope, mgaAssessmentSrvc, mgaUserListSrvc, mgaAnswerSrvc, $routeParams) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by Question Number"},
        {value: "component_id", text: "Sort by Component"},
        {value: "status", text: "Sort by Status"}
    ];
    $scope.sortOrder = $scope.sort_options[0].value;

    // pull assessment data and add
    mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = mgaAnswerSrvc.query();
        //data.edited_by = mgaUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});

        $scope.assessment = data;
        console.log($scope);

    });
});