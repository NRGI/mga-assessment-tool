'use strict';
//var angular;

angular.module('app').controller('mgaUserAdminCtrl', function ($scope, mgaUserSrvc) {
// angular.module('app').controller('mgaUserAdminCtrl', function ($scope, mgaUserSrvc, mgaAssessmentSrvc) {
    // filtering options
    $scope.sort_options = [
        {value: "firstName", text: "Sort by first name"},
        {value: "lastName", text: "Sort by last name"},
        {value: "username", text: "Sort by username"},
        {value: "role", text: "Sort by role"},
        {value: "started", text: "Sort by date started"},
        {value: "approved", text: "Sort by date approved"}
    ];
    $scope.sort_order = $scope.sort_options[1].value;


    mgaUserSrvc.query({}, function (data) {
        $scope.users = [];
        var i;
        // var i, j;
        for (i = data.length - 1; i >= 0; i -= 1) {
            // for (j = data[i].assessments.length - 1; j >= 0; j -= 1) {
            //     data[i].assessments[j].details = mgaAssessmentSrvc.get({assessment_ID: data[i].assessments[j].assessment_id});
            // }
            $scope.users.push(data[i]);
        }
    });
});
