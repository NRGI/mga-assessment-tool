'use strict';
angular.module('app')
    .directive('nrgiComments', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiCommentsCtrl',
            scope: {
                update: '='
            },
            templateUrl: '/partials/directives/templates/nrgi-comments'
        };
    });