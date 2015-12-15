'use strict';
angular.module('app')
    .directive('nrgiBiblioForm', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiBiblioFormCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-biblio-form'
        };
    });