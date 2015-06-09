'use strict';
//var angular;

angular.module('app').controller('mgaUserAdminCtrl', function ($scope, mgaUserSrvc) {
// angular.module('app').controller('mgaUserAdminCtrl', function ($scope, mgaUserSrvc, mgaAssessmentSrvc) {
    // filtering options
    $scope.sortOptions = [
        {value: "firstName", text: "Sort by First Name"},
        {value: "lastName", text: "Sort by Last Name"},
        {value: "username", text: "Sort by Username"},
        {value: "role", text: "Sort by Role"},
        {value: "approved", text: "Sort by Approved"},
        {value: "submitted", text: "Sort by Submitted"}
    ];
    $scope.sortOrder = $scope.sortOptions[1].value;


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