'use strict';
angular
    .module('app')
    .directive('nrgiDocumentTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiDocumentTableCtrl',
            scope: true,
            templateUrl: '/partials/directives/templates/nrgi-document-table'
        };
    });