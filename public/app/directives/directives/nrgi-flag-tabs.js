'use strict';

angular.module('app')
    .directive('nrgiFlagTabs', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiFlagTabsCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-flag-tabs'
        };
    });