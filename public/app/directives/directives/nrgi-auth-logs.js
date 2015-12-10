'use strict';
angular.module('app')
    .directive('nrgiAuthLogs', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiAuthLogsCtrl',
            scope: {
                user: '='
            },
            templateUrl: '/partials/directives/templates/nrgi-auth-logs'
        };
    })
;