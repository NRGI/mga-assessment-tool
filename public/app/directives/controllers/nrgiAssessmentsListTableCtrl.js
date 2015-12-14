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
                    $location.path('/assessments/answer/' + assessment_ID + '-001');
                    nrgiNotifier.notify('Assessment review started!');
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            });
        };
        $scope.assessmentAssign = function (assessment) {
            nrgiDialogFactory.assessmentAssign($scope, assessment);
        };
    });