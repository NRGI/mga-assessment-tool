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
        if ($scope.$parent.flag) {
            $scope.flag_content = $scope.$parent.flag.content;

            $scope.saveFlag = function () {
                var new_answer_data = $scope.$parent.answer,
                    new_flag_data = $scope.$parent.flag,
                    index = $scope.$parent.index;
                if (new_flag_data.content === $scope.flag_content) {
                    nrgiNotifier.error('Do you have edits to submit?');
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
        } else {
            $scope.saveFlag = function () {
                var new_answer_data = $scope.$parent.answer,
                    current_user = $scope.$parent.identity.currentUser,
                    new_flag_data = {
                        content: $scope.flag_content,
                        author_name: current_user.firstName + ' ' + current_user.lastName,
                        author: current_user._id,
                        role: current_user.role,
                        date: new Date().toISOString(),
                        addressed: false
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
        }

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });