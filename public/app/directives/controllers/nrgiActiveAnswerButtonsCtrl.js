'use strict';
angular.module('app')
    .controller('nrgiActiveAnswerButtonsCtrl', function (
        $scope,
        $location,
        $routeParams,
        $route,
        ngDialog,
        nrgiAnswerSrvc,
        nrgiAnswerMethodSrvc,
        nrgiDialogFactory,
        nrgiIdentitySrvc,
        nrgiNotifier,
        nrgiUtilsSrvc
    ) {
        var root_url = '/assessments',
            assessment_ID = $routeParams.answer_ID.substring(0, $routeParams.answer_ID.length - 4);
        $scope.current_user = nrgiIdentitySrvc.currentUser;

        nrgiAnswerSrvc.query({assessment_ID: assessment_ID}, function (answers) {
            $scope.question_length = answers.length;
        });

        $scope.answerSubmit = function () {
            var new_answer_data = $scope.answer;

            if (!new_answer_data[$scope.current_user.role + '_score'] && !new_answer_data.new_answer_selection) {
                nrgiNotifier.error('You must pick a score');
            } else if (!new_answer_data[$scope.current_user.role + '_justification']) {
                nrgiNotifier.error('You must provide a justification');
            } else {
                if (new_answer_data.status !== 'submitted') {
                    new_answer_data.status = 'submitted';
                }
                if (new_answer_data.new_answer_selection) {
                    new_answer_data[$scope.current_user.role + '_score'] = $scope.question.question_criteria[new_answer_data.new_answer_selection];
                }

                nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(function () {
                        if (new_answer_data.question_order !== $scope.question_length) {

                            $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
                        } else {
                            $location.path(root_url + '/' + new_answer_data.assessment_ID);
                        }
                        nrgiNotifier.notify('Answer submitted');
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
            }
        };
        $scope.answerClear = function () {
            $route.reload();
        };
        $scope.answerFlag = function () {
            nrgiDialogFactory.flagCreate($scope);
        };
        $scope.answerReturnMain = function () {
            $location.path(root_url + '/' + $scope.answer.assessment_ID);
        };
        $scope.answerReturnDesk = function () {
            $location.path(root_url + '/desk_research/' + $scope.answer.assessment_ID);
        };
        $scope.answerReturnInterview = function () {
            $location.path(root_url + '/interview/' + $scope.answer.assessment_ID);
        };
        $scope.answerReturnSecondary = function () {
            $location.path(root_url + '/secondary_sources/' + $scope.answer.assessment_ID);
        };
        $scope.answerApprove = function () {
            var new_answer_data = $scope.answer,
                flag_check = nrgiUtilsSrvc.flagCheck(new_answer_data.flags);

            if (new_answer_data.status !== 'approved' && flag_check === true) {
                nrgiNotifier.error('You can only approve an answer when all flags have been dealt with!');
            } else {
                new_answer_data.status = 'approved';
                nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(function () {
                        if (new_answer_data.question_order !== $scope.question_length) {
                            $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
                        } else {
                            $location.path(root_url + '/' + new_answer_data.assessment_ID);
                        }
                        nrgiNotifier.notify('Answer approved');
                    }, function (reason) {
                        nrgiNotifier.notify(reason);
                    });
            }
        };

        //$scope.answerSave = function () {
        //    var new_answer_data = $scope.answer,
        //        flag_check = nrgiUtilsSrvc.flagCheck(new_answer_data.flags);
        //    if (new_answer_data.new_answer_selection) {
        //        new_answer_data[$scope.current_user.role + '_score'] = $scope.question.question_criteria[new_answer_data.new_answer_selection];
        //    }
        //
        //    if (new_answer_data.status!=='flagged' && flag_check) {
        //        new_answer_data.status = 'flagged';
        //    } else if (new_answer_data.status==='flagged' && !flag_check) {
        //        new_answer_data.status = 'saved';
        //    } else if (new_answer_data.status==='assigned') {
        //        new_answer_data.status = 'saved';
        //    }
        //
        //    nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
        //        .then(function () {
        //            nrgiNotifier.notify('Answer saved');
        //        }, function (reason) {
        //            nrgiNotifier.notify(reason);
        //        });
        //};
        //

        //
        //$scope.answerResubmit = function () {
        //    var new_answer_data = $scope.answer;
        //
        //    if (!new_answer_data[$scope.current_user.role + '_score'] && new_answer_data.new_answer_selection) {
        //        nrgiNotifier.error('You must pick a score');
        //    } else if (!new_answer_data[$scope.current_user.role + '_justification']) {
        //        nrgiNotifier.error('You must provide a justification');
        //    } else {
        //        new_answer_data.status = 'resubmitted';
        //        if (new_answer_data.new_answer_selection) {
        //            new_answer_data[$scope.current_user.role + '_score'] = $scope.question.question_criteria[new_answer_data.new_answer_selection];
        //        }
        //        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
        //            .then(function () {
        //                if (new_answer_data.question_order !== $scope.question_length) {
        //                    $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
        //                } else {
        //                    $location.path(root_url + '/' + new_answer_data.assessment_ID);
        //                }
        //                nrgiNotifier.notify('Answer resubmitted');
        //            }, function (reason) {
        //                nrgiNotifier.notify(reason);
        //            });
        //    }
        //};
        //

        //$scope.answerUnresolved = function() {
        //    var new_answer_data = $scope.answer,
        //        flag_check = nrgiUtilsSrvc.flagCheck(new_answer_data.flags);
        //
        //    if (flag_check !== true) {
        //        nrgiNotifier.error('Only mark flagged answers as unresolved!');
        //    } else {
        //        new_answer_data.status = 'unresolved';
        //        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
        //            .then(function () {
        //                if (new_answer_data.question_order !== $scope.question_length) {
        //                    $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
        //                } else {
        //                    $location.path(root_url + '/' + new_answer_data.assessment_ID);
        //                }
        //                nrgiNotifier.notify('Answer tagged as unresolved');
        //            }, function (reason) {
        //                nrgiNotifier.error(reason);
        //            });
        //    }
        //};
        //// make final choice
        //$scope.finalChoiceDialog = function () {
        //    nrgiDialogFactory.answerFinalChoice($scope);
        //};
    });