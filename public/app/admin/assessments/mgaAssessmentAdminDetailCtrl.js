'use strict';
//var angular;
/*jslint nomen: true regexp: true*/

angular.module('app').controller('mgaAssessmentAdminDetailCtrl', function ($scope, $route, $routeParams, $location, mgaIdentitySrvc, mgaNotifier, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaUserListSrvc, mgaIntervieweeSrvc, mgaAnswerSrvc) {
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


    $scope.current_user = mgaIdentitySrvc.currentUser;

    // pull assessment data and add
    mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (data) {
        $scope.answer_list = [];
        mgaAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID}, function (answers) {

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

            $scope.edited_by = mgaUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});
            $scope.user_list = [];
            data.users.forEach(function (el) {
                var u = mgaUserListSrvc.get({_id: el});
                $scope.user_list.push(u);
            });
            answers.forEach(function (el) {
                var answer_row;
                $scope.answer_list.push(el);
                if (el.question_data_type === 'text') {
                    $scope.answer_list[$scope.answer_list.length - 1].summary_score = 'Text';
                } else if (el.answer_score === undefined) {
                    $scope.answer_list[$scope.answer_list.length - 1].summary_score = 'None';
                } else {
                    $scope.answer_list[$scope.answer_list.length - 1].summary_score = el.answer_score.value;
                }

                //TODO extract this into a function that is only called on export load or cache
                switch (el.question_mode) {
                    case 'interview':
                        if (el.interview_score.length > 0) {
                            el.interview_score.forEach(function (interview) {
                                mgaIntervieweeSrvc.get({_id: interview.interviewee_ID}, function (interviewee) {

                                    answer_row = {
                                        question_order: el.question_order,
                                        question_text: el.question_text,
                                        question_data_type: el.question_data_type,
                                        question_mode: el.question_mode,
                                        question_indicator_ID: el.question_indicator_ID,
                                        question_indicator: el.question_indicator,
                                        question_theme_ID: el.question_theme_ID,
                                        question_value_chain_ID: el.question_value_chain_ID,
                                        status: el.status,
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
                                    if (el.comments.length > 0) {
                                        var c = '';
                                        el.comments.forEach(function (element) {
                                            c = c + element.content + ' - ' + element.author_name + ' | '
                                        });
                                        answer_row.comments = c;
                                    }
                                    if (el.flags.length > 0) {
                                        var f = '';
                                        el.flags.forEach(function (element) {
                                            f = f + element.content + ' - ' + element.author_name + ' - addressed: ' + element.addressed + ' | '
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
                                question_order: el.question_order,
                                question_text: el.question_text,
                                question_data_type: el.question_data_type,
                                question_mode: el.question_mode,
                                question_indicator_ID: el.question_indicator_ID,
                                question_indicator: el.question_indicator,
                                question_theme_ID: el.question_theme_ID,
                                question_value_chain_ID: el.question_value_chain_ID,
                                status: el.status,
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
                        answer_row = {
                            question_order: el.question_order,
                            question_text: el.question_text,
                            question_data_type: el.question_data_type,
                            question_mode: el.question_mode,
                            question_indicator_ID: el.question_indicator_ID,
                            question_indicator: el.question_indicator,
                            question_theme_ID: el.question_theme_ID,
                            question_value_chain_ID: el.question_value_chain_ID,
                            status: el.status,
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
                        if (el.answer_score !== undefined) {
                            answer_row.score_value = el.answer_score.value;
                            answer_row.score_text = el.answer_score.option_text;
                        }
                        if (el.answer_text !== undefined) {
                            answer_row.answer_text = el.answer_text
                        }
                        if (el.comments.length > 0) {
                            var c;
                            el.comments.forEach(function (element) {
                                c = c + element.content + ' - ' + element.author_name + ' | '
                            });
                            answer_row.comments = c;
                        }
                        if (el.flags.length > 0) {
                            var f;
                            el.flags.forEach(function (element) {
                                f = f + element.content + ' - ' + element.author_name + ' - addressed: ' + element.addressed + ' | '
                            });
                            answer_row.flags = f;
                        }
                        $scope.getArray.push(answer_row);
                        break;
                    case 'secondary_source':
                        answer_row = {
                            question_order: el.question_order,
                            question_text: el.question_text,
                            question_data_type: el.question_data_type,
                            question_mode: el.question_mode,
                            question_indicator_ID: el.question_indicator_ID,
                            question_indicator: el.question_indicator,
                            question_theme_ID: el.question_theme_ID,
                            question_value_chain_ID: el.question_value_chain_ID,
                            status: el.status,
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
                        if (el.answer_score !== undefined) {
                            answer_row.score_value = el.answer_score.value;
                        }
                        $scope.getArray.push(answer_row);
                        break;
                    default:
                        answer_row = {
                            question_order: el.question_order,
                            question_text: el.question_text,
                            question_data_type: el.question_data_type,
                            question_mode: el.question_mode,
                            question_indicator_ID: el.question_indicator_ID,
                            question_indicator: el.question_indicator,
                            question_theme_ID: el.question_theme_ID,
                            question_value_chain_ID: el.question_value_chain_ID,
                            status: el.status,
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
            $scope.assessment = data;
        });
    });
    //$scope.createArray = function () {
    //    mgaAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID}, function (answers) {
    //
    //    });
    //};
    $scope.submitAssessment = function () {
        var new_assessment_data = $scope.assessment;

        new_assessment_data.status = 'interview';
        new_assessment_data.questions_complete = 0;
        mgaAnswerSrvc.query({
            assessment_ID: $routeParams.assessment_ID,
            question_mode: 'interview'
        }, function (answers) {
            new_assessment_data.question_set_length = answers.length;
            mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data).then(function () {
                mgaNotifier.notify('Assessment submited');
                $route.reload();
                //$location.path('/admin/assessment-admin');
            }, function (reason) {
                mgaNotifier.notify(reason);
            });

        });


    }
});
