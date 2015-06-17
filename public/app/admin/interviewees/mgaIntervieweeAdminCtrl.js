'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('mgaIntervieweeAdminCtrl', function ($scope, mgaIntervieweeSrvc) {
    // filtering options
    $scope.sortOptions = [
        {value: 'lastName', text: 'Sort by last name'},
        {value: 'firstName', text: 'Sort by first name'}
        //{value: 'assessments', text: 'Sort by attached assessments'}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.interviewees = mgaIntervieweeSrvc.query({});
});