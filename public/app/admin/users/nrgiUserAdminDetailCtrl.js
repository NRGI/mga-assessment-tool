'use strict';
/*jslint true*/
angular
    .module('app')
    .controller('nrgiUserAdminDetailCtrl', function (
        $scope,
        $routeParams,
        $location,
        ngDialog,
        nrgiNotifier,
        nrgiUserSrvc,
        nrgiDocumentSrvc,
        nrgiDialogFactory
    ) {
        $scope.role_options = [
            // {value: 'admin', text: 'Administrator'},
            {value: 'supervisor', text: 'Supervisor'},
            {value: 'researcher', text: 'Researcher'}
            //{value: 'reviewer', text: 'Reviewer'}
        ];

        nrgiUserSrvc.get({_id: $routeParams.id}, function (user) {
            $scope.user = user;
            $scope.user.document_details = [];
            if(user.documents) {
                user.documents.forEach(function (doc_id) {
                    nrgiDocumentSrvc.get({_id: doc_id}, function (doc) {
                        $scope.user.document_details.push(doc);
                    });
                });
            }
        });

        $scope.editUserDialog = function () {
            nrgiDialogFactory.userEdit($scope);
        };

        $scope.deleteConfirmDialog = function () {
            nrgiDialogFactory.userDelete($scope);
        };
    });
