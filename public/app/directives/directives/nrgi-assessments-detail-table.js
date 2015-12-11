'use strict';
angular.module('app')
    .directive('nrgiAssessmentDetailTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiAssessmentsDetailTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-assessments-detail-table'
        };
    });