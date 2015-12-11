'use strict';

angular.module('app')
    .directive('nrgiAssessmentsListTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiAssessmentsListTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-assessments-list-table'
        };
    });