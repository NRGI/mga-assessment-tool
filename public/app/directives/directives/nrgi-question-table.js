'use strict';
angular.module('app')
    .directive('nrgiQuestionTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiQuestionTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-question-table'
        };
    });