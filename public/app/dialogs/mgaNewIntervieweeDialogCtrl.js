'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('mgaNewIntervieweeDialogCtrl', function ($scope, $route, $location, ngDialog, mgaNotifier, mgaIntervieweeMethodSrvc) {
    $scope.roles = ['government', 'cso', 'industry', 'expert', 'other'];
    $scope.titles = ['Mr.', 'Ms.', 'Mrs.']
    $scope.new_interviewee = {};

    $scope.closeDialog = function () {
        ngDialog.close();
    };


    $scope.createInterviewee = function () {
        var new_interviewee_data = $scope.new_interviewee;
        if (!new_interviewee_data.firstName || !new_interviewee_data.lastName) {
            mgaNotifier.error('You must provide a first and last name for interviewee!');
        } else if (!new_interviewee_data.role) {
            mgaNotifier.error('You must proved an interviewee role!');
        } else {
            new_interviewee_data.assessments = [$scope.$parent.assessment.assessment_ID];
            mgaIntervieweeMethodSrvc.createInterviewee(new_interviewee_data).then(function () {
                mgaNotifier.notify('Interviewee created!');
                ngDialog.close();
                $route.reload();
            }, function (reason) {
                mgaNotifier.error(reason);
            });
        }
    };
});
