'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('nrgiAssessmentAdminCtrl', function ($location, $routeParams, $scope, nrgiNotifier, ngDialog, nrgiIdentitySrvc, nrgiAssessmentSrvc, nrgiAnswerSrvc, nrgiAssessmentMethodSrvc, nrgiUserListSrvc) {
    var assessment;
    // filtering options
    $scope.sortOptions = [
        {value: 'country', text: 'Sort by Country'},
        {value: 'start_date', text: 'Date started'},
        {value: 'status', text: 'Status'},
        {value: 'year', text: 'Year of assessment'}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;

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

    $scope.assessmentStart = function (assessment_ID) {
        var timestamp = new Date().toISOString();
        nrgiAssessmentSrvc.get({assessment_ID: assessment_ID}, function (new_assessment_data) {
            new_assessment_data.start_date = {started_by: $scope.identity.currentUser._id, date: timestamp};
            new_assessment_data.status = 'started';
            nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data).then(function () {
                $location.path('/admin/assessments-admin/answer/' + assessment_ID + '-001');
                nrgiNotifier.notify('Assessment review started!');
            }, function (reason) {
                nrgiNotifier.error(reason);
            });
        });
    };
    // Deploy new assessment
    $scope.newAssessmentDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/new-assessment-dialog',
            controller: 'nrgiNewAssessmentDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
    // Deploy new assessment
    $scope.assignAssessmentDialog = function (assessment_ID) {
        $scope.value = true;
        $scope.assessment_ID = assessment_ID;
        ngDialog.open({
            template: 'partials/dialogs/assign-assessment-dialog',
            controller: 'nrgiAssignAssessmentDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
});