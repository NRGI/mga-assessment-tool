'use strict'
angular.module('app').controller('mgaSecondarySourcesListCtrl', function ($scope, $routeParams, mgaAnswerSrvc, mgaAssessmentSrvc, mgaUserListSrvc, mgaIdentitySrvc) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by Question Number"},
        {value: "status", text: "Sort by Status"}
    ];
    $scope.sortOrder = $scope.sort_options[0].value;

    $scope.identity = mgaIdentitySrvc;

    //$scope.assessment = mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID});
    //
    //$scope.answer_list = mgaAnswerSrvc.query({
    //    assessment_ID: $routeParams.assessment_ID,
    //    question_mode: 'secondary_sources'
    //});

    // pull assessment data and add
    mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = [];
        mgaAnswerSrvc.query({
            assessment_ID: $routeParams.assessment_ID,
            question_mode: 'secondary_sources'
        }, function (answers) {
            $scope.question_set_length = answers.length;

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

});