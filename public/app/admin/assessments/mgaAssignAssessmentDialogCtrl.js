'use strict';
/*jslint unparam: true nomen: true*/
var angular;

angular.module('app').controller('mgaAssignAssessmentDialogCtrl', function ($scope, $location, ngDialog, mgaNotifier, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaUserSrvc, mgaUserMethodSrvc) {
    mgaUserSrvc.query({}, function (data) {
        $scope.assessment = mgaAssessmentSrvc.get({assessment_ID: $scope.$parent.assessment_ID});
        $scope.users = [];
        data.forEach(function (el) {
            var seen = false;
            if (el.role !== 'supervisor') {
                el.assessments.forEach(function (element) {
                    if (element.assessment_ID === $scope.$parent.assessment_ID) {
                        seen = true;
                    }
                });
                if(!seen) {$scope.users.push(el)}
            }
        });
    });

    $scope.closeDialog = function () {
        ngDialog.close();
    };

    $scope.assessmentAssign = function () {
        var new_assessment_data, new_user_data;

        mgaUserSrvc.get({_id: $scope.new_assignment}, function (data) {
            new_assessment_data = $scope.assessment;
            new_user_data = data;

            new_assessment_data.users.push($scope.new_assignment);
            new_user_data.assessments.push({
                _id: $scope.assessment._id,
                assessment_ID: $scope.assessment.assessment_ID,
                country: $scope.assessment.country,
                year: $scope.assessment.year
            });

            mgaUserMethodSrvc.updateUser(new_user_data)
                .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
                .then(function () {
                    mgaNotifier.notify('Assessment assigned!');
                    new_assessment_data = undefined;
                    new_user_data = undefined;
                    $scope.closeThisDialog();
                    $location.path('/admin/assessment-admin');
                }, function (reason) {
                    mgaNotifier.error(reason);
                });
        });
    };
});