'use strict';
/*jslint unparam: true nomen: true*/
angular.module('app')
    .controller('nrgiAssignAssessmentDialogCtrl', function (
        $scope,
        $route,
        $location,
        ngDialog,
        nrgiAssessmentSrvc,
        nrgiAssessmentMethodSrvc,
        nrgiNotifier,
        nrgiUserSrvc,
        nrgiUserMethodSrvc
    ) {
        nrgiUserSrvc.query({}, function (users) {
            $scope.assessment = nrgiAssessmentSrvc.get({assessment_ID: $scope.$parent.assessment_update_ID});
            $scope.users = [];
            users.forEach(function (user) {
                var assigned = false;
                if (user.role !== 'supervisor') {
                    user.assessments.forEach(function (assessment) {
                        if (assessment.assessment_ID === $scope.$parent.assessment_update_ID) {
                            assigned = true;
                        }
                    });
                    if(!assigned) {$scope.users.push(user)}
                }
            });
        });

        $scope.assessmentAssign = function () {
            var new_assessment_data, new_user_data;

            nrgiUserSrvc.get({_id: $scope.new_assignment}, function (user) {
                new_assessment_data = $scope.assessment;
                new_user_data = user;
                new_assessment_data.users.push($scope.new_assignment);
                new_user_data.assessments.push({
                    assessment_ID: $scope.assessment.assessment_ID,
                    country: $scope.assessment.country,
                    year: $scope.assessment.year
                });
                nrgiUserMethodSrvc.updateUser(new_user_data)
                    .then(nrgiAssessmentMethodSrvc.updateAssessment(new_assessment_data))
                    .then(function () {
                        nrgiNotifier.notify('Assessment assigned!');
                        new_assessment_data = undefined;
                        new_user_data = undefined;
                        $scope.closeThisDialog();
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
            });
        };

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });