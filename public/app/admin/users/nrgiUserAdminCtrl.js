'use strict';
//var angular;

angular.module('app').controller('nrgiUserAdminCtrl', function ($scope, nrgiUserSrvc, nrgiAssessmentSrvc) {
// angular.module('app').controller('mgaUserAdminCtrl', function ($scope, nrgiUserSrvc, nrgiAssessmentSrvc) {
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


    nrgiUserSrvc.query({}, function (users) {
        $scope.users = [];
        var u, a;
        for (u = users.length - 1; u >= 0; u -= 1) {
             for (a = users[u].assessments.length - 1; a >= 0; a -= 1) {
                 users[u].assessments[a].details = nrgiAssessmentSrvc.get({assessment_ID: users[u].assessments[a].assessment_ID});
             }
            $scope.users.push(users[u]);
        }
    });
});
