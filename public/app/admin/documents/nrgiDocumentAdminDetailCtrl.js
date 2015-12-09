'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('nrgiDocumentAdminDetailCtrl', function ($scope, $routeParams, ngDialog, nrgiDocumentSrvc, nrgiUserListSrvc) {
    nrgiDocumentSrvc.get({_id: $routeParams.document_ID}, function (document) {

        $scope.user_list = [];
        document.users.forEach(function (el) {
            nrgiUserListSrvc.get({_id: el}, function (user) {
                $scope.user_list.push(user);
            });
        });
        $scope.document = document;
    });

    $scope.editDocumentDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/edit-document-dialog',
            controller: 'nrgiEditDocumentDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    }

});