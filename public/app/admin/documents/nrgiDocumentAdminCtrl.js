'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app')
    .controller('nrgiDocumentAdminCtrl', function (
        $scope,
        nrgiDocumentSrvc,
        nrgiUserListSrvc
    ) {
        // filtering options
        $scope.sort_options = [
            {value: 'title', text: 'Sort by document title'},
            {value: 'type', text: 'Sort by document type'},
            {value: 'assessments', text: 'Sort by attached assessments'}
        ];
        $scope.sort_order = $scope.sort_options[0].value;

        $scope.documents = [];
        nrgiDocumentSrvc.query({}, function (documents) {
            documents.forEach(function (el) {
                el.user_list = [];
                el.users.forEach(function (element) {
                    nrgiUserListSrvc.get({_id: element}, function (user) {
                        el.user_list.push(user);
                    });
                });
                $scope.documents.push(el);
            });
        });
    });