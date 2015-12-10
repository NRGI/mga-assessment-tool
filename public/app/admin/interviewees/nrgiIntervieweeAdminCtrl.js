'use strict';
/*jslint nomen: true unparam: true regexp: true*/
angular.module('app')
    .controller('nrgiIntervieweeAdminCtrl', function ($scope, nrgiIntervieweeSrvc) {
        // filtering options
        $scope.sort_options = [
            {value: 'lastName', text: 'Sort by last name'},
            {value: 'firstName', text: 'Sort by first name'},
            {value: 'role', text: 'Sort by interviewee role'},
            {value: 'title', text: 'Sort by interviewee title'},
            {value: 'organization', text: 'Sort by interviewee organization'},
            {value: 'assessments', text: 'Sort by attached assessments'}
        ];
        $scope.sort_order = $scope.sort_options[0].value;

        $scope.interviewees = nrgiIntervieweeSrvc.query({});
    });