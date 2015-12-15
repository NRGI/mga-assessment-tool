'use strict';
//var angular;
angular.module('app')
    .controller('nrgiAssessmentDetailCtrl', function (
        $scope,
        $route,
        $routeParams,
        $location,
        nrgiAnswerSrvc,
        nrgiAssessmentSrvc,
        nrgiAssessmentMethodSrvc,
        nrgiIdentitySrvc,
        nrgiIntervieweeSrvc,
        nrgiNotifier,
        nrgiUserListSrvc
    ) {
        // filtering options
        $scope.sort_options = [
            {value: "question_order", text: "Sort by question number"},
            {value: "question_flow_order", text: "Sort by question order"},
            {value: "question_indicator_ID", text: "Sort by indicator"},
            {value: "question_mode", text: "Sorty by question mode"},
            {value: "question_data_type", text: "Sort by data type"},
            //{value: "status", text: "Sort by status"},
            {value: "status", text: "Sort by status"}
        ];
        $scope.sort_order = $scope.sort_options[0].value;
        $scope.current_user = nrgiIdentitySrvc.currentUser;

        //var mode = $route.current.$$route.originalPath;
        //var mode = $route.current.$$route.originalPath.replace("/assessments/", "");
        var mode = $route.current.$$route.originalPath.replace("/assessments/", "").replace(":assessment_ID", "").replace("/","").replace("_"," ");

        if (mode!=='') {
            $scope.mode = mode;
            // pull assessment data and add
            nrgiAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (assessment) {
                $scope.answer_list = [];
                nrgiAnswerSrvc.query({
                    assessment_ID: $routeParams.assessment_ID,
                    question_mode: mode.replace(" ","_")
                }, function (answers) {
                    $scope.edited_by = nrgiUserListSrvc.get({_id: assessment.last_modified.modified_by});
                    $scope.user_list = [];
                    assessment.users.forEach(function (el) {
                        var u = nrgiUserListSrvc.get({_id: el});
                        $scope.user_list.push(u);
                    });
                    $scope.answer_list = answers;
                    $scope.assessment = assessment;
                });
            });
        } else {
            $scope.mode = 'assessment';
            // pull assessment data and add
            nrgiAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (assessment) {
                $scope.answer_list = [];
                nrgiAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID}, function (answers) {
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

                    $scope.getArray = [{
                        question_order: 'question_order',
                        question_text: 'question_text',
                        question_data_type: 'question_data_type',
                        question_mode: 'question_mode',
                        question_indicator_ID: 'question_indicator_ID',
                        question_indicator: 'question_indicator',
                        question_theme_ID: 'question_theme_ID',
                        question_value_chain_ID: 'question_value_chain_ID',
                        status: 'status',
                        score_value: 'score_value',
                        score_text: 'score_text',
                        answer_text: 'answer_text',
                        comments: 'comments',
                        flags: 'flags',
                        interviewee_name: 'interviewee_name',
                        interviewee_email: 'interviewee_email',
                        interviewee_phone: 'interviewee_phone',
                        interviewee_role: 'interviewee_role'
                    }];

                    $scope.edited_by = nrgiUserListSrvc.get({_id: assessment.last_modified.modified_by});
                    $scope.user_list = [];
                    assessment.users.forEach(function (el) {
                        var u = nrgiUserListSrvc.get({_id: el});
                        $scope.user_list.push(u);
                    });
                    answers.forEach(function (answer) {
                        var answer_row;
                        $scope.answer_list.push(answer);
                        if (answer.question_data_type === 'text') {
                            $scope.answer_list[$scope.answer_list.length - 1].summary_score = 'Text';
                        } else if (answer.answer_score === undefined) {
                            $scope.answer_list[$scope.answer_list.length - 1].summary_score = 'None';
                        } else {
                            $scope.answer_list[$scope.answer_list.length - 1].summary_score = answer.answer_score.value;
                        }
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

                        //TODO extract this into a function that is only called on export load or cache
                        switch (answer.question_mode) {
                            case 'interview':
                                $scope.assessment_counters.interview +=1;
                                if (answer.interview_score.length > 0) {
                                    answer.interview_score.forEach(function (interview) {
                                        nrgiIntervieweeSrvc.get({_id: interview.interviewee_ID}, function (interviewee) {

                                            answer_row = {
                                                question_order: answer.question_order,
                                                question_text: answer.question_text,
                                                question_data_type: answer.question_data_type,
                                                question_mode: answer.question_mode,
                                                question_indicator_ID: answer.question_indicator_ID,
                                                question_indicator: answer.question_indicator,
                                                question_theme_ID: answer.question_theme_ID,
                                                question_value_chain_ID: answer.question_value_chain_ID,
                                                status: answer.status,
                                                score_value: '',
                                                score_text: '',
                                                answer_text: '',
                                                comments: '',
                                                flags: '',
                                                interviewee_name: '',
                                                interviewee_email: '',
                                                interviewee_phone: '',
                                                interviewee_role: ''
                                            };
                                            if (interview.answer_score !== undefined) {
                                                answer_row.score_value = interview.value;
                                                answer_row.score_text = interview.option_text;
                                            }
                                            if (interview.interview_text !== undefined) {
                                                answer_row.answer_text = interview.interview_text
                                            }
                                            if (answer.comments.length > 0) {
                                                var c = '';
                                                answer.comments.forEach(function (comment) {
                                                    c = c + comment.content + ' - ' + comment.author_name + ' | '
                                                });
                                                answer_row.comments = c;
                                            }
                                            if (answer.flags.length > 0) {
                                                var f = '';
                                                answer.flags.forEach(function (flag) {
                                                    f = f + flag.content + ' - ' + flag.author_name + ' - addressed: ' + flag.addressed + ' | '
                                                });
                                                answer_row.flags = f;
                                            }

                                            answer_row.interviewee_name = interviewee.firstName + ' ' + interviewee.lastName;
                                            answer_row.interviewee_email = interviewee.email;
                                            answer_row.interviewee_phone = interviewee.phone;
                                            answer_row.interviewee_role = interviewee.role;
                                            $scope.getArray.push(answer_row);
                                        });
                                    });


                                } else {
                                    answer_row = {
                                        question_order: answer.question_order,
                                        question_text: answer.question_text,
                                        question_data_type: answer.question_data_type,
                                        question_mode: answer.question_mode,
                                        question_indicator_ID: answer.question_indicator_ID,
                                        question_indicator: answer.question_indicator,
                                        question_theme_ID: answer.question_theme_ID,
                                        question_value_chain_ID: answer.question_value_chain_ID,
                                        status: answer.status,
                                        score_value: '',
                                        score_text: '',
                                        answer_text: '',
                                        comments: '',
                                        flags: '',
                                        interviewee_name: '',
                                        interviewee_email: '',
                                        interviewee_phone: '',
                                        interviewee_role: ''
                                    };
                                    $scope.getArray.push(answer_row);
                                }

                                break;
                            case 'desk_research':
                                $scope.assessment_counters.desk_research +=1;
                                answer_row = {
                                    question_order: answer.question_order,
                                    question_text: answer.question_text,
                                    question_data_type: answer.question_data_type,
                                    question_mode: answer.question_mode,
                                    question_indicator_ID: answer.question_indicator_ID,
                                    question_indicator: answer.question_indicator,
                                    question_theme_ID: answer.question_theme_ID,
                                    question_value_chain_ID: answer.question_value_chain_ID,
                                    status: answer.status,
                                    score_value: '',
                                    score_text: '',
                                    answer_text: '',
                                    comments: '',
                                    flags: '',
                                    interviewee_name: '',
                                    interviewee_email: '',
                                    interviewee_phone: '',
                                    interviewee_role: ''
                                };
                                if (answer.answer_score !== undefined) {
                                    answer_row.score_value = answer.answer_score.value;
                                    answer_row.score_text = answer.answer_score.option_text;
                                }
                                if (answer.answer_text !== undefined) {
                                    answer_row.answer_text = answer.answer_text
                                }
                                if (answer.comments.length > 0) {
                                    var c = '';
                                    answer.comments.forEach(function (comment) {
                                        c = c + comment.content + ' - ' + comment.author_name + ' | '
                                    });
                                    answer_row.comments = c;
                                }
                                if (answer.flags.length > 0) {
                                    var f = '';
                                    answer.flags.forEach(function (flag) {
                                        f = f + flag.content + ' - ' + flag.author_name + ' - addressed: ' + flag.addressed + ' | '
                                    });
                                    answer_row.flags = f;
                                }
                                $scope.getArray.push(answer_row);
                                break;
                            case 'secondary_source':
                                $scope.assessment_counters.secondary_source +=1;
                                answer_row = {
                                    question_order: answer.question_order,
                                    question_text: answer.question_text,
                                    question_data_type: answer.question_data_type,
                                    question_mode: answer.question_mode,
                                    question_indicator_ID: answer.question_indicator_ID,
                                    question_indicator: answer.question_indicator,
                                    question_theme_ID: answer.question_theme_ID,
                                    question_value_chain_ID: answer.question_value_chain_ID,
                                    status: answer.status,
                                    score_value: '',
                                    score_text: '',
                                    answer_text: '',
                                    comments: '',
                                    flags: '',
                                    interviewee_name: '',
                                    interviewee_email: '',
                                    interviewee_phone: '',
                                    interviewee_role: ''
                                };
                                if (answer.answer_score !== undefined) {
                                    answer_row.score_value = answer.answer_score.value;
                                }
                                $scope.getArray.push(answer_row);
                                break;
                            default:
                                answer_row = {
                                    question_order: answer.question_order,
                                    question_text: answer.question_text,
                                    question_data_type: answer.question_data_type,
                                    question_mode: answer.question_mode,
                                    question_indicator_ID: answer.question_indicator_ID,
                                    question_indicator: answer.question_indicator,
                                    question_theme_ID: answer.question_theme_ID,
                                    question_value_chain_ID: answer.question_value_chain_ID,
                                    status: answer.status,
                                    score_value: '',
                                    score_text: '',
                                    answer_text: '',
                                    comments: '',
                                    flags: '',
                                    interviewee_name: '',
                                    interviewee_email: '',
                                    interviewee_phone: '',
                                    interviewee_role: ''
                                };
                                $scope.getArray.push(answer_row);
                        }

                    });
                    $scope.assessment = assessment;
                });
            });
        }




        //$scope.createArray = function () {
        //    nrgiAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID}, function (answers) {
        //
        //    });
        //};
        //$scope.submitAssessment = function () {
        //    var new_assessment_data = $scope.assessment;
        //
        //    new_assessment_data.status = 'interview';
        //    new_assessment_data.questions_complete = 0;
        //    nrgiAnswerSrvc.query({
        //        assessment_ID: $routeParams.assessment_ID,
        //        question_mode: 'interview'
        //    }, function (answers) {
        //        new_assessment_data.question_set_length = answers.length;
        //        nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data).then(function () {
        //            nrgiNotifier.notify('Assessment submited');
        //            $route.reload();
        //            //$location.path('/admin/assessment-admin');
        //        }, function (reason) {
        //            nrgiNotifier.notify(reason);
        //        });
        //
        //    });
        //
        //
        //}
    });