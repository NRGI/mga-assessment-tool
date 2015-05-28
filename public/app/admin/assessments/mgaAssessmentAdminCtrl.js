'use strict';
/*jslint nomen: true unparam: true regexp: true*/
var angular;

angular.module('app').controller('mgaAssessmentAdminCtrl', function ($location, $routeParams, $scope, mgaNotifier, ngDialog, mgaIdentitySrvc, mgaAssessmentSrvc) {
    var assessment;
    // filtering options
    $scope.sortOptions = [
        {value: 'country', text: 'Sort by Country'},
        {value: 'start_date', text: 'Date started'},
        {value: 'status', text: 'Status'},
        {value: 'year', text: 'Year of assessment'}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.identity = mgaIdentitySrvc;
    $scope.assessments = [];
    if ($scope.identity.currentUser.role === 'supervisor') {
        $scope.assessments = mgaAssessmentSrvc.query();
    } else {
        $scope.identity.currentUser.assessments.forEach(function (el) {
            assessment = mgaAssessmentSrvc.get({assessment_ID: el.assessment_ID});
            $scope.assessments.push(assessment);
        });
    }
    // Deploy new assessment
    $scope.newAssessmentDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/admin/assessments/new-assessment-dialog',
            controller: 'mgaNewAssessmentDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
    // Deploy new assessment
    $scope.assignAssessmentDialog = function (assessment_ID) {
        $scope.value = true;
        $scope.assessment_ID = assessment_ID;
        ngDialog.open({
            template: 'partials/admin/assessments/assign-assessment-dialog',
            controller: 'mgaAssignAssessmentDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
    //$scope.assessmentStartReview = function (assessment_ID) {
    //
    //    mgaAssessmentSrvc.get({assessment_ID: assessment_ID}, function (new_assessment_data) {
    //        new_assessment_data.status = 'under_review';
    //        mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data).then(function () {
    //            $location.path('/admin/assessment-review/answer-review-edit/' + assessment_ID + '-001');
    //            mgaNotifier.notify('Assessment review started!');
    //        }, function (reason) {
    //            mgaNotifier.error(reason);
    //        });
    //    });
    //};
});

// // Angular capitilaize filter
// angular.module('app').filter('capitalize', function () {
//     return function (input) {
//         return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) :  '';
//     };
// });