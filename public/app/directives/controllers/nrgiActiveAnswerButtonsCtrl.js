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
        nrgiAssessmentSrvc,
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
            $scope.assessment_counters = {
                length: answers.length,
                approved: 0,
                flagged: 0,
                submitted: 0,
                created: 0,
                desk_research: 0,
                interview: 0,
                secondary_source: 0
            };
            answers.forEach(function (answer) {
                switch (answer.status) {
                    case 'flagged':
                        $scope.assessment_counters.flagged +=1;
                        $scope.assessment_counters.complete +=1;
                        break;
                    case 'submitted':
                        $scope.assessment_counters.submitted +=1;
                        $scope.assessment_counters.complete +=1;
                        break;
                    case 'approved':
                        $scope.assessment_counters.approved +=1;
                        $scope.assessment_counters.complete +=1;
                        break;
                    case 'created':
                        $scope.assessment_counters.created +=1;
                        break;
                }
            });
        });

        $scope.answerSubmit = function (status) {
            var new_answer_data = $scope.answer,
                flag_check = nrgiUtilsSrvc.flagCheck(new_answer_data.flags);

            switch(new_answer_data.question_mode) {
                case 'desk_research':
                    if (!new_answer_data.answer_text) {
                        nrgiNotifier.error('You must provide justification text!');
                    } else if (!new_answer_data.answer_score && new_answer_data.question_data_type!=='text') {
                        nrgiNotifier.error('You must select a score!');
                    } else if (flag_check===true && status==='approved') {
                        nrgiNotifier.error('You can only submit an answer when all flags have been dealt with!')
                    } else {
                        new_answer_data.status = status;
                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                            .then(function () {
                                if (new_answer_data.question_order !== $scope.assessment_counters.length) {
                                    $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
                                } else {
                                    $location.path(root_url + '/' + new_answer_data.assessment_ID);
                                }
                                nrgiNotifier.notify('Answer submitted');
                            }, function (reason) {
                                nrgiNotifier.notify(reason);
                            });
                    }
                    break;
                case 'interview':
                    if (new_answer_data.interview_score.length < 1) {
                        nrgiNotifier.error('You must provide at least one interview!');
                    } else if (flag_check===true && status==='approved') {
                        nrgiNotifier.error('You can only submit an answer when all flags have been dealt with!')
                    } else {
                        new_answer_data.status = status;
                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                            .then(function () {
                                if (new_answer_data.question_order !== $scope.assessment_counters.length) {
                                    $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
                                } else {
                                    $location.path(root_url + '/' + new_answer_data.assessment_ID);
                                }
                                nrgiNotifier.notify('Answer submitted');
                            }, function (reason) {
                                nrgiNotifier.notify(reason);
                            });
                    }
                    break;
            }
        };
        $scope.answerClear = function () {
            $route.reload();
        };
        $scope.newInterview = function () {
            nrgiDialogFactory.interviewAnswerNew($scope);
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
    });