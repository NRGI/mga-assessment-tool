'use strict';

angular.module('app')
    .controller('nrgiFlagAnswerDialogCtrl', function (
        $scope,
        $route,
        $location,
        $timeout,
        ngDialog,
        nrgiAnswerMethodSrvc,
        nrgiNotifier
    ) {

        $scope.saveFlag = function () {
            var new_answer_data = $scope.$parent.answer,
                current_user = $scope.$parent.identity.currentUser,
                new_flag_data = {
                    content: $scope.flag_content,
                    author_name: current_user.firstName + ' ' + current_user.lastName,
                    author: current_user._id,
                    role: current_user.role,
                    date: new Date().toISOString(),
                    addressed: false,
                    addressed_to: $scope.$parent.assessment.edit_control
                };

            new_answer_data.flags.push(new_flag_data);
            new_answer_data.status = 'flagged';

            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                .then(function () {
                    nrgiNotifier.notify('Answer flagged');
                    $scope.closeThisDialog();
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.notify(reason);
                });
        };

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });