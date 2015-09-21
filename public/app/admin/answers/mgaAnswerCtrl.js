'use strict';
//var angular;
/*jslint nomen: true*/

function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array( width + (/\./.test(number) ? 2 : 1) ).join('0') + number;
    }
    return number + ""; // always return a string
}
// Review functions
function flagCheck(flags) {
    var disabled = false;
    if (flags.length !== 0) {
        flags.forEach(function (el) {
            if (el.addressed === false) {
                disabled = true;
            }
        });
    }
    return disabled;
};

angular.module('app').controller('mgaAnswerCtrl', function ($scope, $route, $routeParams, $q, $location, FileUploader, ngDialog, mgaNotifier, mgaIntervieweeSrvc, mgaIntervieweeMethodSrvc, mgaAnswerSrvc, mgaAnswerMethodSrvc, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaDocumentSrvc, mgaDocumentMethodSrvc, mgaQuestionSrvc, mgaIdentitySrvc) {
    $scope.identity = mgaIdentitySrvc;
    $scope.ref_type = [
        {text: 'Add Document', value: 'document'},
        {text: 'Add Webpage', value: 'webpage'},
        {text: 'Add Interview', value: 'interview'}
    ];

    $scope.new_doc_type = [
        {value: 'journal', text: 'Journal'},
        {value: 'book', text: 'Book'},
        {value: 'generic', text: 'Generic'},
        {value: 'book_section', text: 'Book Section'},
        {value: 'conference_proceedings', text: 'Conference Proceedings'},
        {value: 'working_paper', text: 'Working Paper'},
        {value: 'report', text: 'Report'},
        {value: 'web_page', text: 'Web Page'},
        {value: 'thesis', text: 'Thesis'},
        {value: 'magazine_article', text: 'Magazine Article'},
        {value: 'statute', text: 'Statute'},
        {value: 'patent', text: 'Patent'},
        {value: 'newspaper_article', text: 'Newspaper Article'},
        {value: 'computer_program', text: 'Computer Program'},
        {value: 'hearing', text: 'Hearing'},
        {value: 'television_broadcast', text: 'Television Broadcast'},
        {value: 'encyclopedia_article', text: 'Encyclopedia Article'},
        {value: 'case', text: 'Case'},
        {value: 'film', text: 'Film'},
        {value: 'bill', text: 'Bill'}
    ];
    $scope.new_interview_answer = {};
    $scope.moveForward = function () {
        $location.path('/admin/assessments-admin/answer/' + $scope.assessment.assessment_ID + "-" + String(zeroFill($scope.answer.question_order + 1, 3)));
    };
    $scope.moveBackward = function () {
        $location.path('/admin/assessments-admin/answer/' + $scope.assessment.assessment_ID + "-" + String(zeroFill($scope.answer.question_order - 1, 3)));
    };

    mgaAnswerSrvc.get({
        answer_ID: $routeParams.answer_ID,
        assessment_ID: $routeParams.answer_ID.substring(0, 2)
    }, function (answer) {
        mgaDocumentSrvc.query({}, function (documents) {
            mgaIntervieweeSrvc.query({assessments: answer.assessment_ID}, function (interviewees) {
                $scope.interviewees = interviewees;
                $scope.answer = answer;
                $scope.assessment = mgaAssessmentSrvc.get({assessment_ID: answer.assessment_ID});
                $scope.question = mgaQuestionSrvc.get({_id: answer.root_question_ID});
                $scope.current_user = mgaIdentitySrvc.currentUser;
                $scope.answer_start = angular.copy($scope.answer);

                var document_selectors = [];
                documents.forEach(function (el) {
                    document_selectors.push({
                        _id: el._id,
                        title: el.title
                    })
                });
                $scope.document_selectors = document_selectors;

                var interview_scores = [];
                answer.interview_score.forEach(function (el) {
                    mgaIntervieweeSrvc.get({_id: el.interviewee_ID}, function (interviewee) {
                        interview_scores.push({
                            interview_text: el.interview_text,
                            interview_date: el.interview_date,
                            option_text: el.option_text,
                            value: el.value,
                            interviewee: interviewee
                        });
                    });
                });
                $scope.interview_scores = interview_scores;

                var citations = [];
                answer.references.citation.forEach(function (el) {
                    mgaDocumentSrvc.get({_id: el.document_ID}, function (doc) {
                        doc.comment = el.comment;
                        citations.push(doc);
                    });
                });
                $scope.citations = citations;
            });

        });
    });

    //$scope.flagCheck = function (flags) {
    //    var disabled = false;
    //    if (flags.length !== 0) {
    //        flags.forEach(function (el) {
    //            if (el.addressed === false) {
    //                disabled = true;
    //            }
    //        });
    //    }
    //    return disabled;
    //};

    $scope.answerFlag = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/flag-question-dialog',
            controller: 'mgaFlagQuestionDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
    $scope.flagEdit = function (flag, index) {
        $scope.value = true;
        var scope = $scope;
        scope.index = index;
        scope.flag = flag;
        ngDialog.open({
            template: 'partials/dialogs/flag-question-dialog',
            controller: 'mgaFlagEditDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: scope
        });
    };

    $scope.answerClear = function () {
        $scope.answer = angular.copy($scope.answer_start);g
    };

    $scope.answerSave = function () {
        var new_answer_data = $scope.answer,
            new_assessment_data = $scope.assessment,
            flag_check = flagCheck(new_answer_data.flags);

        if (new_answer_data.status === 'created') {
            new_answer_data.status = 'saved';
        }

        if (flag_check == true) {
            if (new_answer_data.status !== 'flagged') {
                if(new_answer_data.status === 'approved') {
                    new_assessment_data.questions_complete -= 1;
                }
                new_answer_data.status = 'flagged';
                new_assessment_data.questions_flagged += 1;
            }
        }

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
            .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            .then(function () {
                mgaNotifier.notify('Answer saved');
            }, function (reason) {
                mgaNotifier.notify(reason);
            });
    };

    $scope.answerApprove = function () {
        var new_answer_data = $scope.answer,
            new_assessment_data = $scope.assessment,
            flag_check = flagCheck(new_answer_data.flags);

        if (flag_check === true) {
            mgaNotifier.error('You can only approve an answer when all flags have been dealt with!')
        } else if (new_answer_data.question_mode === 'desk_research') {
            if (new_answer_data.answer_text === '') {
                mgaNotifier.error('You must provde justification text to be able to submit this answer! Please save until you are ready.');
            } else if (new_answer_data.question_data_type === 'score' && !new_answer_data.answer_score) {
                mgaNotifier.error('You must provde a score to be able to submit this answer! Please save until you are ready.');
            } else {
                if (new_answer_data.status === 'saved' || new_answer_data.status === 'created') {
                    new_answer_data.status = 'approved';
                    new_assessment_data.questions_complete += 1;
                } else if (new_answer_data.status === 'flagged') {
                    new_answer_data.status = 'approved';
                    new_assessment_data.questions_flagged -= 1;
                    new_assessment_data.questions_complete += 1;
                } else if (new_answer_data.status === 'approved' && flag_check === true) {
                    new_answer_data.status = 'flagged';
                    new_assessment_data.questions_flagged += 1;
                    new_assessment_data.questions_complete -= 1;
                } else if (new_answer_data.status === 'submitted') {
                    new_answer_data.status === 'approved';
                }
                mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
                    .then(function () {
                        if (new_assessment_data.questions_complete === new_assessment_data.question_set_length) {
                            $location.path('/admin/assessments-admin/' + new_answer_data.assessment_ID);
                        } else {
                            $location.path('/admin/assessments-admin/answer/' + new_answer_data.assessment_ID + "-" + String(zeroFill((new_answer_data.question_flow_order + 1), 3)));
                        }
                        mgaNotifier.notify('Answer approved');
                    }, function (reason) {
                        mgaNotifier.notify(reason);
                    });
            }

        } else if (new_answer_data.question_mode === 'interview') {
            if (new_answer_data.interview_score.length < 1) {
                mgaNotifier.error('You must submite at least one supporting interview to approve!');
            } else {
                if (new_answer_data.status === 'saved' || new_answer_data.status === 'created') {
                    new_answer_data.status = 'approved';
                    new_assessment_data.questions_complete += 1;
                } else if (new_answer_data.status === 'flagged') {
                    new_answer_data.status = 'approved';
                    new_assessment_data.questions_flagged -= 1;
                    new_assessment_data.questions_complete += 1;
                } else if (new_answer_data.status === 'approved' && flag_check === true) {
                    new_answer_data.status = 'flagged';
                    new_assessment_data.questions_flagged += 1;
                    new_assessment_data.questions_complete -= 1;
                }
                mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
                    .then(function () {
                        if (new_assessment_data.questions_complete === new_assessment_data.question_set_length) {
                            $location.path('/admin/assessments-admin/' + new_answer_data.assessment_ID);
                        } else {
                            $location.path('/admin/assessments-admin/answer/' + new_answer_data.assessment_ID + "-" + String(zeroFill((new_answer_data.question_flow_order + 1), 3)));
                        }
                        mgaNotifier.notify('Answer approved');
                    }, function (reason) {
                        mgaNotifier.notify(reason);
                    });
            }
        }
    };


    $scope.answerSubmit = function () {
        var new_answer_data = $scope.answer,
            new_assessment_data = $scope.assessment;

        if (!$scope.new_interview_answer.interviewee_ID) {
            mgaNotifier.error('You must select and interview subject from the dropdown or add a new subject!');
        } else if (!$scope.new_interview_answer.interview_text) {
            mgaNotifier.error('You must provide a text transcript of the interview answer! Please save until you are ready.');
        } else if (!$scope.new_interview_answer.score) {
            mgaNotifier.error('You must provde a score to be able to submit this answer! Please save until you are ready.');

        } else {
            if (new_answer_data.status !== 'flagged' || new_answer_data.status !== 'approved') {
                new_answer_data.status = 'saved';
            }

            mgaIntervieweeSrvc.get({_id: $scope.new_interview_answer.interviewee_ID}, function (new_interviewee_data) {
                new_answer_data.interview_score.push({
                    interviewee_ID: $scope.new_interview_answer.interviewee_ID,
                    option_order: $scope.new_interview_answer.score.option_order,
                    option_text: $scope.new_interview_answer.score.option_text,
                    value: $scope.new_interview_answer.score.value,
                    interview_text: $scope.new_interview_answer.interview_text
                });
                if(new_interviewee_data.answers.indexOf(new_answer_data.answer_ID) < 0) {
                    new_interviewee_data.answers.push(new_answer_data.answer_ID);
                }
                if(new_interviewee_data.assessments.indexOf(new_answer_data.assessment_ID) < 0) {
                    new_interviewee_data.assessments.push(new_answer_data.assessment_ID);
                }
                if(new_interviewee_data.questions.indexOf(new_answer_data.root_question_ID) < 0) {
                    new_interviewee_data.questions.push(new_answer_data.root_question_ID);
                }
                if(new_interviewee_data.users.indexOf($scope.current_user._id) < 0) {
                    new_interviewee_data.users.push($scope.current_user._id);
                }

                mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
                    .then(mgaIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data))
                    .then(function () {
                        mgaNotifier.notify('Interview submitted');
                        $route.reload();
                    }, function (reason) {
                        mgaNotifier.notify(reason);
                    });

            });
        }
    };

    $scope.intervieweeAdd = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/new-interviewee-dialog',
            controller: 'mgaNewIntervieweeDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };

    $scope.commentSubmit = function (current_user) {
        var new_comment_data = {
                content: $scope.answer.new_comment,
                author_name: current_user.firstName + ' ' + current_user.lastName,
                author: current_user._id,
                role: current_user.role,
                date: new Date().toISOString()
            },
            new_answer_data = $scope.answer;

        new_answer_data.comments.push(new_comment_data);

        if (new_answer_data.status === 'assigned') {
            new_answer_data.status = 'saved';
        }

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
            mgaNotifier.notify('Comment added');
            $scope.answer.new_comment = undefined;
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };

    $scope.commentEdit = function (comment, index) {
        $scope.value = true;
        var scope = $scope;
        scope.index = index;
        scope.comment = comment;

        ngDialog.open({
            template: 'partials/dialogs/comment-edit-dialog',
            controller: 'mgaCommentEditDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: scope
        });


    };

    //TODO Generate Dialog based on change and handle upload process via dialogs
    $scope.select_ref_dialog = function(value) {
        var template = 'partials/dialogs/new-ref-' + $scope.ref_selection + '-dialog',
            className;
        if ($scope.ref_selection === 'document') {
            className = 'ngdialog-theme-default dialogwidth800';
        } else {
            className = 'ngdialog-theme-default';
        }
        //console.log(template);
        ngDialog.open({
            template: template,
            controller: 'mgaNewRefDialogCtrl',
            className: className,
            scope: $scope
        });
    };



});
