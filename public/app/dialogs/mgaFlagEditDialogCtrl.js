'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('mgaFlagEditDialogCtrl', function ($scope, $location, ngDialog, mgaNotifier, mgaAnswerMethodSrvc) {
    $scope.flag_content = $scope.$parent.flag.content;

    $scope.saveFlag = function () {
        var new_answer_data = $scope.$parent.answer,
            new_flag_data = $scope.$parent.flag,
            index = $scope.$parent.index,
            answer_ID = $scope.$parent.answer.answer_ID;
        if (new_flag_data.content === $scope.flag_content) {
            mgaNotifier.error('Do you have edits to submit?')
        } else {
            new_answer_data.flags[index].content = $scope.flag_content;

            mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                .then(function () {
                    mgaNotifier.notify('Flag edited');
                    $scope.closeThisDialog();
                    $location.path('/admin/assessments-admin/answer/' + answer_ID);
                }, function (reason) {
                    mgaNotifier.notify(reason);
                });
        }
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
