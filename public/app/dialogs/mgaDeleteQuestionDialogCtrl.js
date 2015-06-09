'use strict';
var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('mgaDeleteQuestionDialogCtrl', function ($scope, $location, ngDialog, mgaQuestionMethodSrvc, mgaNotifier) {
    $scope.questionDelete = function () {
        var question_deletion = $scope.$parent.question._id;

        mgaQuestionMethodSrvc.deleteUser(question_deletion).then(function () {
            $scope.closeThisDialog();
            $location.path('/admin/question-admin');
            mgaNotifier.notify('Question has been deleted');
        }, function (reason) {
            mgaNotifier.error(reason);
        });
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
