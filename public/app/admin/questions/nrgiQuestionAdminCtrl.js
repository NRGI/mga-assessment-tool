'use strict';
//var angular;
/*jslint nomen: true unparam: true*/

angular.module('app').controller('nrgiQuestionAdminCtrl', function ($scope, mgaQuestionSrvc, ngDialog) {
    // filtering options
    $scope.sort_options = [
        {value: "question_flow_order", text: "Sort by Question Flow Order"},
        {value: "question_order", text: "Sort by Question Order"},
        {value: "question_mode", text: "Sort by Question Mode"},
        {value: "question_data_type", text: "Sort by Data Type"},
        {value: "question_theme_ID", text: "Sort by Theme"},
        {value: "question_value_chain_ID", text: "Sort by Value Chain"},
        {value: "question_indicator_ID", text: "Sort by Indicator"}
    ];

    $scope.sort_order = $scope.sort_options[0].value;

    mgaQuestionSrvc.query({assessment_ID: 'base'}, function (data) {

        var question;
        $scope.questions = data;
        $scope.getArray = [{
            question_flow_order: 'question_flow_order',
            question_order: 'question_order',
            question_text: 'question_text',
            question_mode: 'question_mode',
            question_data_type: 'question_data_type',
            question_theme_ID: 'question_theme_ID',
            question_value_chain_ID: 'question_value_chain_ID',
            question_indicator_ID: 'question_indicator_ID'
        }];

        data.forEach(function (el) {
            question = {
                question_flow_order: el.question_flow_order,
                question_order: el.question_order,
                question_text: el.question_text,
                question_mode: el.question_mode,
                question_data_type: el.question_data_type,
                question_theme_ID: el.question_theme_ID,
                question_value_chain_ID: el.question_value_chain_ID,
                question_indicator_ID: el.question_indicator_ID
            };
            $scope.getArray.push(question);
        });
    });

    // $scope.questions = mgaQuestionSrvc.query();

    $scope.newQuestionDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/new-question-dialog',
            controller: 'nrgiNewQuestionDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
});
