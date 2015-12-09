'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('nrgiIntervieweeAdminDetailCtrl', function ($scope, $route, $routeParams, ngDialog, nrgiNotifier, nrgiUserListSrvc, nrgiIntervieweeSrvc, mgaIntervieweeMethodSrvc, nrgiAssessmentSrvc) {
    //nrgiAssessmentSrvc.query({}, function (assessments) {
    //    nrgiIntervieweeSrvc.get({_id: $routeParams.interviewee_ID}, function (interviewee) {
    //        $scope.interviewee = interviewee;
    //        $scope.assessments = [];
    //        assessments.forEach(function (el) {
    //            if (interviewee.assessments.indexOf(el.assessment_ID) < 0) {
    //                $scope.assessments.push({
    //                    assessment_ID: el.assessment_ID,
    //                    text: el.country + ' - ' + el.year
    //                });
    //            }
    //        });
    //
    //    });
    //
    //});
    nrgiAssessmentSrvc.query({}, function (assessments) {
        nrgiIntervieweeSrvc.get({_id: $routeParams.interviewee_ID}, function (interviewee) {
            $scope.interviewee = interviewee;
            $scope.user_list = [];
            $scope.assessments = [];
            assessments.forEach(function (el) {
                if (interviewee.assessments.indexOf(el.assessment_ID) < 0) {
                    $scope.assessments.push({
                        assessment_ID: el.assessment_ID,
                        text: el.country + ' - ' + el.year
                    });
                }
            });
            interviewee.users.forEach(function (el) {
                nrgiUserListSrvc.get({_id: el}, function (user) {
                    $scope.user_list.push(user);
                });
            });
        });

    });

    $scope.editIntervieweeDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/edit-interviewee-dialog',
            controller: 'nrgiEditIntervieweeDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };

    $scope.addAssessment = function () {
        if ($scope.add_assessment === undefined) {
            nrgiNotifier.error('You must select an assessment from the dropdown!');
        } else {
            var new_interviewee_data = $scope.interviewee;
            if (new_interviewee_data.assessments.indexOf($scope.add_assessment) < 0) {
                new_interviewee_data.assessments.push($scope.add_assessment);
                mgaIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data).then(function () {
                    nrgiNotifier.notify('Interviewee updated');
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.notify(reason);
                });
            }
        }
    };
});
