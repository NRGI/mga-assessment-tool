'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('mgaDocumentAdminCtrl', function ($scope, mgaDocumentSrvc) {
    $scope.documents = mgaDocumentSrvc.query({});
    console.log($scope);
});