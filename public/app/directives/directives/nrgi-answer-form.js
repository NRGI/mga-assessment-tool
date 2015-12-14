'use strict';

angular.module('app')
    .directive('nrgiAnswerForm', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiAnswerFormCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-answer-form'
        };
    });