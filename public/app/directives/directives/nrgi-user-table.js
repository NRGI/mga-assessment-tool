'use strict';
angular.module('app')
    .directive('nrgiUserTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiUserTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-user-table'
        };
    });