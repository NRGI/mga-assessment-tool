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

        //$scope.answerSubmit = function () {
        //    var new_answer_data = $scope.answer;
        //
        //    //if (!new_answer_data[$scope.current_user.role + '_score'] && !new_answer_data.new_answer_selection) {
        //    //    nrgiNotifier.error('You must pick a score');
        //    //} else if (!new_answer_data[$scope.current_user.role + '_justification']) {
        //    //    nrgiNotifier.error('You must provide a justification');
        //    //} else {
        //    //    if (new_answer_data.status !== 'submitted') {
        //    //        new_answer_data.status = 'submitted';
        //    //    }
        //    //    if (new_answer_data.new_answer_selection) {
        //    //        new_answer_data[$scope.current_user.role + '_score'] = $scope.question.question_criteria[new_answer_data.new_answer_selection];
        //    //    }
        //    //
        //    //    nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
        //    //        .then(function () {
        //    //            if (new_answer_data.question_order !== $scope.question_length) {
        //    //
        //    //                $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
        //    //            } else {
        //    //                $location.path(root_url + '/' + new_answer_data.assessment_ID);
        //    //            }
        //    //            nrgiNotifier.notify('Answer submitted');
        //    //        }, function (reason) {
        //    //            nrgiNotifier.error(reason);
        //    //        });
        //    //}
        //};
        $scope.answerSubmit = function () {
            var new_answer_data = $scope.answer;

            switch(new_answer_data.question_mode) {
                case 'desk_research':
                    if (!new_answer_data.answer_text) {
                        nrgiNotifier.error('You must provide justification text!');
                    } else if (!new_answer_data.answer_score) {
                        nrgiNotifier.error('You must select a score!');
                    } else {
                        new_answer_data.status = 'submitted';
                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                            .then(function () {
                                nrgiNotifier.notify('Answer submitted');
                            }, function (reason) {
                                nrgiNotifier.notify(reason);
                            });
                    }
                    break;
                //case 'interview':
                //    code block
                //    break;
                //case 'secondary_source':
                //    code block
                //    break;
                //default:
                //default code block
            }


                //if (!$scope.new_interview_answer.interviewee_ID) {
                //    nrgiNotifier.error('You must select and interview subject from the dropdown or add a new subject!');
                //} else if (!$scope.new_interview_answer.interview_text) {
                //    nrgiNotifier.error('You must provide a text transcript of the interview answer! Please save until you are ready.');
                //} else if (!$scope.new_interview_answer.score) {
                //    nrgiNotifier.error('You must provde a score to be able to submit this answer! Please save until you are ready.');
                //
                //} else {
            //        if (new_answer_data.status !== 'flagged' || new_answer_data.status !== 'approved') {
            //            new_answer_data.status = 'saved';
            //        }
            //
            //        nrgiIntervieweeSrvc.get({_id: $scope.new_interview_answer.interviewee_ID}, function (new_interviewee_data) {
            //            new_answer_data.interview_score.push({
            //                interviewee_ID: $scope.new_interview_answer.interviewee_ID,
            //                option_order: $scope.new_interview_answer.score.option_order,
            //                option_text: $scope.new_interview_answer.score.option_text,
            //                value: $scope.new_interview_answer.score.value,
            //                interview_text: $scope.new_interview_answer.interview_text
            //            });
            //            if(new_interviewee_data.answers.indexOf(new_answer_data.answer_ID) < 0) {
            //                new_interviewee_data.answers.push(new_answer_data.answer_ID);
            //            }
            //            if(new_interviewee_data.assessments.indexOf(new_answer_data.assessment_ID) < 0) {
            //                new_interviewee_data.assessments.push(new_answer_data.assessment_ID);
            //            }
            //            if(new_interviewee_data.questions.indexOf(new_answer_data.root_question_ID) < 0) {
            //                new_interviewee_data.questions.push(new_answer_data.root_question_ID);
            //            }
            //            if(new_interviewee_data.users.indexOf($scope.current_user._id) < 0) {
            //                new_interviewee_data.users.push($scope.current_user._id);
            //            }
            //
            //            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
            //                .then(nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            //                .then(nrgiIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data))
            //                .then(function () {
            //                    nrgiNotifier.notify('Interview submitted');
            //                    $route.reload();
            //                }, function (reason) {
            //                    nrgiNotifier.notify(reason);
            //                });
            //
            //        });
            //    }
            };
        $scope.answerApprove = function () {
            var new_answer_data = $scope.answer,
                flag_check = nrgiUtilsSrvc.flagCheck(new_answer_data.flags);

            switch(new_answer_data.question_mode) {
                case 'desk_research':
                    if (!new_answer_data.answer_text) {
                        nrgiNotifier.error('You must provide justification text!');
                    } else if (!new_answer_data.answer_score) {
                        nrgiNotifier.error('You must select a score!');
                    } else if (flag_check === true) {
                        nrgiNotifier.error('You can only submit an answer when all flags have been dealt with!')
                    } else {
                        new_answer_data.status = 'approved';
                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                            .then(function () {
                                nrgiNotifier.notify('Answer approved');
                            }, function (reason) {
                                nrgiNotifier.notify(reason);
                            });
                    }
                    break;
                //case 'interview':
                //    code block
                //    break;
                //case 'secondary_source':
                //    code block
                //    break;
                //default:
                //default code block
            }

            //if (new_answer_data.status !== 'approved' && flag_check === true) {
            //    nrgiNotifier.error('You can only approve an answer when all flags have been dealt with!');
            //} else {
            //    new_answer_data.status = 'approved';
            //    nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
            //        .then(function () {
            //            if (new_answer_data.question_order !== $scope.question_length) {
            //                $location.path(root_url + '/answer/' + new_answer_data.assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill((new_answer_data.question_order + 1), 3)));
            //            } else {
            //                $location.path(root_url + '/' + new_answer_data.assessment_ID);
            //            }
            //            nrgiNotifier.notify('Answer approved');
            //        }, function (reason) {
            //            nrgiNotifier.notify(reason);
            //        });
            //}
        };

        //$scope.answerApprove = function () {
            //    var new_answer_data = $scope.answer,
            //        new_assessment_data = $scope.assessment,
            //        flag_check = flagCheck(new_answer_data.flags);
            //
            //    if (flag_check === true) {
            //        nrgiNotifier.error('You can only approve an answer when all flags have been dealt with!')
            //    } else if (new_answer_data.question_mode === 'desk_research') {
            //        if (new_answer_data.answer_text === '') {
            //            nrgiNotifier.error('You must provde justification text to be able to submit this answer! Please save until you are ready.');
            //        } else if (new_answer_data.question_data_type === 'score' && !new_answer_data.answer_score) {
            //            nrgiNotifier.error('You must provde a score to be able to submit this answer! Please save until you are ready.');
            //        } else {
            //            if (new_answer_data.status === 'saved' || new_answer_data.status === 'created') {
            //                new_answer_data.status = 'approved';
            //                new_assessment_data.questions_complete += 1;
            //            } else if (new_answer_data.status === 'flagged') {
            //                new_answer_data.status = 'approved';
            //                new_assessment_data.questions_flagged -= 1;
            //                new_assessment_data.questions_complete += 1;
            //            } else if (new_answer_data.status === 'approved' && flag_check === true) {
            //                new_answer_data.status = 'flagged';
            //                new_assessment_data.questions_flagged += 1;
            //                new_assessment_data.questions_complete -= 1;
            //            } else if (new_answer_data.status === 'submitted') {
            //                new_answer_data.status === 'approved';
            //            }
            //            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
            //                .then(nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            //                .then(function () {
            //                    if (new_assessment_data.questions_complete === new_assessment_data.question_set_length) {
            //                        $location.path('/admin/assessments-admin/' + new_answer_data.assessment_ID);
            //                    } else {
            //                        $location.path('/admin/assessments-admin/answer/' + new_answer_data.assessment_ID + "-" + String(zeroFill((new_answer_data.question_flow_order + 1), 3)));
            //                    }
            //                    nrgiNotifier.notify('Answer approved');
            //                }, function (reason) {
            //                    nrgiNotifier.notify(reason);
            //                });
            //        }
            //
            //    } else if (new_answer_data.question_mode === 'interview') {
            //        if (new_answer_data.interview_score.length < 1) {
            //            nrgiNotifier.error('You must submite at least one supporting interview to approve!');
            //        } else {
            //            if (new_answer_data.status === 'saved' || new_answer_data.status === 'created') {
            //                new_answer_data.status = 'approved';
            //                new_assessment_data.questions_complete += 1;
            //            } else if (new_answer_data.status === 'flagged') {
            //                new_answer_data.status = 'approved';
            //                new_assessment_data.questions_flagged -= 1;
            //                new_assessment_data.questions_complete += 1;
            //            } else if (new_answer_data.status === 'approved' && flag_check === true) {
            //                new_answer_data.status = 'flagged';
            //                new_assessment_data.questions_flagged += 1;
            //                new_assessment_data.questions_complete -= 1;
            //            }
            //            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
            //                .then(nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            //                .then(function () {
            //                    if (new_assessment_data.questions_complete === new_assessment_data.question_set_length) {
            //                        $location.path('/admin/assessments-admin/' + new_answer_data.assessment_ID);
            //                    } else {
            //                        $location.path('/admin/assessments-admin/answer/' + new_answer_data.assessment_ID + "-" + String(zeroFill((new_answer_data.question_flow_order + 1), 3)));
            //                    }
            //                    nrgiNotifier.notify('Answer approved');
            //                }, function (reason) {
            //                    nrgiNotifier.notify(reason);
            //                });
            //        }
            //    }
            //};
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