'use strict';

angular.module('app')
    .directive('nrgiActiveAnswerButtons', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiActiveAnswerButtonsCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-active-answer-buttons'
        };
    });