'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('nrgiFlagEditDialogCtrl', function ($scope, $location, ngDialog, nrgiNotifier, nrgiAnswerMethodSrvc) {
    $scope.flag_content = $scope.$parent.flag.content;

    $scope.saveFlag = function () {
        var new_answer_data = $scope.$parent.answer,
            new_flag_data = $scope.$parent.flag,
            index = $scope.$parent.index;
        if (new_flag_data.content === $scope.flag_content) {
            nrgiNotifier.error('Do you have edits to submit?')
        } else {
            new_answer_data.flags[index].content = $scope.flag_content;

            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                .then(function () {
                    nrgiNotifier.notify('Flag edited');
                    $scope.closeThisDialog();
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.notify(reason);
                });
        }
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
