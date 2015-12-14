'use strict';

angular.module('app')
    .directive('nrgiAnswerNav', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiAnswerNavCtrl',
            scope: {
                assessment: '='
            },
            templateUrl: '/partials/directives/templates/nrgi-answer-nav'
        };
    });