'use strict';
//var angular;
/*jslint nomen: true regexp: true*/

angular.module('app').controller('mgaAssessmentAdminDetailCtrl', function ($scope, $route, $routeParams, $location, mgaIdentitySrvc, mgaNotifier, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaUserListSrvc, mgaIntervieweeSrvc, mgaAnswerSrvc, $q) {
    // filtering options
    $scope.sort_options = [
        {value: "question_order", text: "Sort by question number"},
        {value: "question_flow_order", text: "Sort by question order"},
        {value: "question_indicator_ID", text: "Sort by indicator"},
        {value: "question_mode", text: "Sort by question mode"},
        {value: "question_data_type", text: "Sort by data type"},
        //{value: "status", text: "Sort by status"},
        {value: "status", text: "Sort by status"}
    ];

    $scope.csvHeaders = {
        question_order: 'Question order',
        question_text: 'Question text',
        question_data_type: 'Question data type',
        question_mode: 'Question mode',
        question_indicator_ID: 'Question indicator ID',
        question_indicator: 'Question indicator',
        question_theme_ID: 'Question theme ID',
        question_value_chain_ID: 'Question value chain ID',
        status: 'Status',
        score_value: 'Score value',
        score_text: 'Score text',
        answer_text: 'Answer text',
        comments: 'Comments',
        flags: 'Flags',
        interviewee_name: 'Interviewee name',
        interviewee_email: 'Interviewee email',
        interviewee_phone: 'Interviewee phone',
        interviewee_role: 'Interviewee role'
    };

    $scope.sort_order = $scope.sort_options[0].value;

    $scope.getDefaultCSVAnswerRow = function (answer) {
        return {
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
        }
    };

    $scope.addCommentsIntoAnswerRow = function (answer, row) {
        row.comments = answer.comments.reduce(function (comments, element) {
            return comments + element.content + ' - ' + element.author_name + ' | '
        }, '');
    };

    $scope.addFlagsIntoAnswerRow = function (answer, row) {
        row.flags = answer.flags.reduce(function (flags, element) {
            return flags + element.content + ' - ' + element.author_name + ' - addressed: ' + element.addressed + ' | '
        }, '');
    };

    $scope.generateAnswerRowForInterview = function (answer) {
        var defer = $q.defer();
        var answerRow = $scope.getDefaultCSVAnswerRow(answer);
        var result = [];
        if (answer.interview_score.length > 0) {
            $q.all(answer.interview_score.map(function (interview) {
                return mgaIntervieweeSrvc.get({_id: interview.interviewee_ID}, function (interviewee) {
                    var row = angular.copy(answerRow);
                    if (interview.answer_score !== undefined) {
                        row.score_value = interview.value;
                        row.score_text = interview.option_text;
                    }
                    if (interview.interview_text !== undefined) {
                        row.answer_text = interview.interview_text
                    }
                    $scope.addCommentsIntoAnswerRow(answer, row);
                    $scope.addFlagsIntoAnswerRow(answer, row);
                    row.interviewee_name = interviewee.firstName + ' ' + interviewee.lastName;
                    row.interviewee_email = interviewee.email;
                    row.interviewee_phone = interviewee.phone;
                    row.interviewee_role = interviewee.role;
                    result.push(row);
                }).$promise;
            })).then(function () {
                defer.resolve(result);
            });
        }
        else {
            result.push(answerRow);
            defer.resolve(result);
        }
        return defer.promise;
    };

    $scope.generateAnswerRowForDiskResearch = function (answer) {
        var defer = $q.defer();
        var answerRow = $scope.getDefaultCSVAnswerRow(answer);
        if (answer.answer_score !== undefined) {
            answerRow.score_value = answer.answer_score.value;
            answerRow.score_text = answer.answer_score.option_text;
        }
        if (answer.answer_text !== undefined) {
            answerRow.answer_text = answer.answer_text
        }
        $scope.addCommentsIntoAnswerRow(answer, answerRow);
        $scope.addFlagsIntoAnswerRow(answer, answerRow);
        defer.resolve([answerRow]);
        return defer.promise;
    };

    $scope.generateAnswerRowForSecondarySource = function (answer) {
        var defer = $q.defer();
        var answerRow = $scope.getDefaultCSVAnswerRow(answer);
        if (answer.answer_score !== undefined) {
            answerRow.score_value = answer.answer_score.value;
        }
        defer.resolve([answerRow]);
        return defer.promise;
    };


    $scope.downloadCSV = function (btnState) {
        var defer = $q.defer();
        btnState.pending = true;
        $q.all($scope.answer_list.map(function (el) {
            switch (el.question_mode) {
                case 'interview':
                    return $scope.generateAnswerRowForInterview(el);
                    break;
                case 'desk_research':
                    return $scope.generateAnswerRowForDiskResearch(el);
                    break;
                case 'secondary_source':
                    return $scope.generateAnswerRowForSecondarySource(el);
                    break;
                default:
                    return $q.when([$scope.getDefaultCSVAnswerRow(el)]);
            }
        })).then(function (data) {
            var result = data.reduce(function (prev, next) {
                return prev.concat(next);
            });
            defer.resolve(result);
        }).finally(function () {
            btnState.pending = false;
        });
        return defer.promise;
    };

    $scope.current_user = mgaIdentitySrvc.currentUser;

    $q.all([
        mgaAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}).$promise,
        mgaAnswerSrvc.query({assessment_ID: $routeParams.assessment_ID}).$promise
    ]).then(function (allData) {
        var data = allData[0];
        var answers = allData[1];
        $scope.answer_list = [];

        $scope.edited_by = mgaUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});
        $scope.user_list = [];
        data.users.forEach(function (el) {
            var u = mgaUserListSrvc.get({_id: el});
            $scope.user_list.push(u);
        });
        $scope.assessment = data;
        answers.forEach(function (el) {
            if (el.question_data_type === 'text') {
                el.summary_score = 'Text';
            } else if (el.answer_score === undefined) {
                el.summary_score = 'None';
            } else {
                el.summary_score = el.answer_score.value;
            }
            $scope.answer_list.push(el);
        });
    });


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
                mgaNotifier.notify('Assessment submitted');
                $route.reload();
                //$location.path('/admin/assessment-admin');
            }, function (reason) {
                mgaNotifier.notify(reason);
            });
        });
    }
});
