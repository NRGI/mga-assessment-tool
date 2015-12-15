'use strict';
angular.module('app')
    .controller('nrgiSecondarySourceListCtrl', function (
        $scope,
        $route,
        $routeParams,
        nrgiAnswerSrvc,
        nrgiAnswerMethodSrvc,
        nrgiAssessmentSrvc,
        nrgiIdentitySrvc,
        nrgiNotifier,
        nrgiUserListSrvc
    ) {
        // filtering options
        $scope.sort_options = [
            {value: "question_order", text: "Sort by question number"},
            {value: "question_flow_order", text: "Sort by question order"},
            {value: "question_indicator_ID", text: "Sort by indicator"},
            {value: "question_secondary_source", text: "Sort by source"},
            {value: "question_data_type", text: "Sort by data type"},
            {value: "status", text: "Sort by status"}
        ];
        $scope.sort_order = $scope.sort_options[0].value;

        $scope.identity = nrgiIdentitySrvc;
        $scope.new_score = {};

        // pull assessment data and add
        nrgiAssessmentSrvc.get({assessment_ID: $routeParams.assessment_ID}, function (assessment) {
            $scope.answer_list = [];
            nrgiAnswerSrvc.query({
                assessment_ID: $routeParams.assessment_ID,
                question_mode: 'secondary_source'
            }, function (answers) {
                $scope.question_set_length = answers.length;
                $scope.edited_by = nrgiUserListSrvc.get({_id: assessment.last_modified.modified_by});
                $scope.user_list = [];
                assessment.users.forEach(function (user) {
                    var u = nrgiUserListSrvc.get({_id: user});
                    $scope.user_list.push(u);
                });
                $scope.answer_list = answers;
                $scope.assessment = assessment;
            });
        });

        $scope.answerSave = function (answer) {
            if (typeof answer.value !== 'number') {
                nrgiNotifier.error('You must enter a number!');
            } else {
                answer.status = 'submitted';
                answer.answer_score = {
                    value: answer.value
                };
                delete answer.value;
                nrgiAnswerMethodSrvc.updateAnswer(answer).then(function () {
                    nrgiNotifier.notify('Answer saved');
                    //$route.reload();
                }, function (reason) {
                    nrgiNotifier.notify(reason);
                });
            }
        };
        $scope.answerApprove = function (answer) {
            if (answer.value) {
                if (typeof answer.value !== 'number') {
                    nrgiNotifier.error('You must enter a number!');
                } else {
                    answer.answer_score = {
                        value: answer.value
                    };
                }
            }

            delete answer.value;
            if (!answer.answer_score) {
                nrgiNotifier.error('You must enter a value!');
            } else {
                answer.status = 'approved';
                nrgiAnswerMethodSrvc.updateAnswer(answer).then(function () {
                    nrgiNotifier.notify('Answer approved');
                    //$route.reload();
                }, function (reason) {
                    nrgiNotifier.notify(reason);
                });
            }
        };
        $scope.answerUnapprove = function (answer) {
            answer.status = 'submitted';
            nrgiAnswerMethodSrvc.updateAnswer(answer).then(function () {
                nrgiNotifier.notify('Answer unapproved');
                //$route.reload();
            }, function (reason) {
                nrgiNotifier.notify(reason);
            });
        };
    });
