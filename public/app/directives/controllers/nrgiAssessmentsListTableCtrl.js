'use strict';

angular.module('app')
    .controller('nrgiAssessmentsListTableCtrl', function (
        $scope,
        $location,
        ngDialog,
        nrgiNotifier,
        nrgiIdentitySrvc,
        nrgiAssessmentSrvc,
        nrgiDialogFactory,
        nrgiAssessmentMethodSrvc
    ) {
        $scope.current_user = nrgiIdentitySrvc.currentUser;
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
        $scope.assessmentAssign = function (assessment) {
            nrgiDialogFactory.assessmentAssign($scope, assessment);
        };
        //
        //// Deploy new assessment
        //$scope.newAssessmentDialog = function () {
        //    $scope.value = true;
        //    ngDialog.open({
        //        template: 'partials/dialogs/new-assessment-dialog',
        //        controller: 'nrgiNewAssessmentDialogCtrl',
        //        className: 'ngdialog-theme-default',
        //        scope: $scope
        //    });
        //};

        //// Deploy new assessment
        //$scope.assignAssessmentDialog = function (assessment_ID) {
        //    $scope.value = true;
        //    $scope.assessment_ID = assessment_ID;
        //    ngDialog.open({
        //        template: 'partials/dialogs/assign-assessment-dialog',
        //        controller: 'nrgiAssignAssessmentDialogCtrl',
        //        className: 'ngdialog-theme-default',
        //        scope: $scope
        //    });
        //};

    });