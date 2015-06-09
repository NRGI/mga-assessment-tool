'use strict';
//var angular;
/*jslint nomen: true*/

angular.module('app').controller('mgaQuestionAdminDetailCtrl', function ($scope, $routeParams, $location, ngDialog, mgaNotifier, mgaQuestionMethodSrvc, mgaQuestionSrvc, mgaIdentitySrvc) {

    $scope.question = mgaQuestionSrvc.get({_id: $routeParams.id});
    $scope.current_user = mgaIdentitySrvc.currentUser;

    $scope.modeOptions = [
        {value: 'interview', text: 'Interview'},
        {value: 'desk_research', text: 'Desk Research'},
        {value: 'secondary_sources', text: 'Secondary Sources'}
    ];

    $scope.typeOptions = [
        {value: 'text', text: 'Text'},
        {value: 'score', text: 'Score'}
    ];

    $scope.questionClear = function () {
        $scope.question = angular.copy($scope.question_start);
    };

    $scope.questionUpdate = function () {
        var new_question_data = $scope.question;

        mgaQuestionMethodSrvc.updateQuestion(new_question_data).then(function () {
            $location.path('/admin/question-admin');
            mgaNotifier.notify('Question data has been updated');
        }, function (reason) {
            mgaNotifier.error(reason);
        });
    };
    $scope.deleteConfirmDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/delete-question-delete-confirmation-dialog',
            controller: 'mgaDeleteQuestionDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
    $scope.commentSubmit = function (current_user) {
        var new_comment_data, new_question_data;

        new_comment_data = {
            content: $scope.question.new_comment,
            author_name: current_user.firstName + ' ' + current_user.lastName,
            author: current_user._id,
            role: current_user.role,
            date: new Date().toISOString()
        };
        new_question_data = $scope.question;
        delete new_question_data.new_comment;

        new_question_data.comments.push(new_comment_data);

        mgaQuestionMethodSrvc.updateQuestion(new_question_data).then(function () {
            mgaNotifier.notify('Comment added');
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };
});