'use strict';
/*jslint nomen: true unparam: true regexp: true*/
angular
    .module('app')
    .controller('nrgiDocumentAdminDetailCtrl', function (
        $scope,
        $routeParams,
        ngDialog,
        nrgiDialogFactory,
        nrgiDocumentSrvc,
        nrgiUserListSrvc

    ) {
        'use strict';
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
            nrgiDialogFactory.documentEdit($scope);
        };
    });
