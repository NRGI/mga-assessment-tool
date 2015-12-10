'use strict';
angular
    .module('app')
    .directive('nrgiIntervieweeTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiIntervieweeTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-interviewee-table'
        };
    });