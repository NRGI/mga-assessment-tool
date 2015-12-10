'use strict';

angular.module('app')
    .controller('nrgiDeleteQuestionDialogCtrl', function (
        $scope,
        $location,
        ngDialog,
        nrgiQuestionMethodSrvc,
        nrgiNotifier
    ) {
        $scope.questionDelete = function () {
            var question_deletion = $scope.$parent.question._id;

            nrgiQuestionMethodSrvc.deleteQuestion(question_deletion).then(function () {
                $scope.closeThisDialog();
                $location.path('/admin/question-admin');
                nrgiNotifier.notify('Question has been deleted');
            }, function (reason) {
                nrgiNotifier.error(reason);
            });
        };

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });