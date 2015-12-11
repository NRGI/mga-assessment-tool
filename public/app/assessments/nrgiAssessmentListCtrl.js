'use strict';
/*jslint nomen: true unparam: true regexp: true*/
angular.module('app')
    .controller('nrgiAssessmentListCtrl', function (
        $location,
        $routeParams,
        $scope,
        ngDialog,
        nrgiAnswerSrvc,
        nrgiAssessmentSrvc,
        nrgiAssessmentMethodSrvc,
        nrgiDialogFactory,
        nrgiIdentitySrvc,
        nrgiNotifier,
        nrgiUserListSrvc
    ) {
        var assessment;
        // filtering options
        $scope.sort_options = [
            {value: 'country', text: 'Sort by Country'},
            {value: 'start_date', text: 'Date started'},
            {value: 'status', text: 'Status'},
            {value: 'year', text: 'Year of assessment'}
        ];
        $scope.sort_order = $scope.sort_options[0].value;

        $scope.identity = nrgiIdentitySrvc;
        $scope.assessments = [];
        if ($scope.identity.currentUser.role === 'supervisor') {
            nrgiAssessmentSrvc.query(function (data) {
                data.forEach(function (el) {
                    assessment = {
                        assessment_ID: el.assessment_ID,
                        country: el.country,
                        start_date: el.start_date,
                        year: el.year,
                        status: el.status,
                        ISO3: el.ISO3,
                        question_length: el.question_length,
                        questions_flagged: el.questions_flagged,
                        questions_unfinalized: el.questions_unfinalized,
                        users: []
                    };
                    if (el.modified[0] !== undefined) {
                        assessment.modified = el.modified;
                        assessment.edited_by = nrgiUserListSrvc.get({_id: el.modified[el.modified.length - 1].modified_by});
                    }

                    if (el.users[0] !== undefined) {
                        el.users.forEach(function (element) {
                            var insert_user = nrgiUserListSrvc.get({_id: element});
                            assessment.users.push(insert_user);
                        });
                    }

                    $scope.assessments.push(assessment);
                });
            });
        } else {
            $scope.identity.currentUser.assessments.forEach(function (el) {
                nrgiAssessmentSrvc.get({
                    assessment_ID: el.assessment_ID}, function (data) {
                    assessment = {
                        assessment_ID: data.assessment_ID,
                        country: data.country,
                        start_date: data.start_date,
                        year: data.year,
                        status: data.status,
                        ISO3: data.ISO3,
                        question_length: data.question_length,
                        questions_flagged: data.questions_flagged,
                        questions_unfinalized: data.questions_unfinalized,
                        users: []
                    };
                    if (data.modified[0] !== undefined) {
                        assessment.modified = data.modified;
                        assessment.edited_by = nrgiUserListSrvc.get({_id: data.modified[data.modified.length - 1].modified_by});
                    }

                    if (data.users[0] !== undefined) {
                        data.users.forEach(function (element) {
                            var insert_user = nrgiUserListSrvc.get({_id: element});
                            assessment.users.push(insert_user);
                        });
                    }
                    $scope.assessments.push(assessment);
                });
            });
        }

        $scope.assessmentCreate = function (assessment) {
            nrgiDialogFactory.assessmentCreate($scope, assessment);
        };
    });
