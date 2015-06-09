'use strict';
//var angular;
/*jslint nomen: true unparam: true*/

angular.module('app').controller('mgaQuestionAdminCtrl', function ($scope, mgaQuestionSrvc, ngDialog) {
    // filtering options
    $scope.sortOptions = [
        {value: "question_order", text: "Sort by Question Order"},
        {value: "question_mode", text: "Sort by Question Mode"},
        {value: "question_data_type", text: "Sort by Data Type"}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;

    mgaQuestionSrvc.query({assessment_ID: 'base'}, function (data) {

        var question;
        $scope.questions = data;
        $scope.getArray = [];

        data.forEach(function (el) {
            question = {
                question_order: el.question_order,
                question_mode: el.question_mode,
                question_mode_text: el.question_mode_text,
                question_text: el.question_text,
                question_data_type: el.question_data_type
            };
            $scope.getArray.push(question);
        });

        $scope.header = ['Question Order', 'Question Mode', 'Question Mode Text', 'Question Text', 'Question Data Type'];
    });

    // $scope.questions = mgaQuestionSrvc.query();

    $scope.newQuestionDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/new-question-dialog',
            controller: 'mgaNewQuestionDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
});