'use strict';

angular.module('app')
    .directive('nrgiPrevAnswers', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiPrevAnswersCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-prev-answers'
        };
    });