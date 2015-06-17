'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('mgaDocumentAdminCtrl', function ($scope, mgaDocumentSrvc, mgaUserListSrvc) {
    // filtering options
    $scope.sortOptions = [
        {value: 'title', text: 'Sort by document title'},
        {value: 'type', text: 'Sort by document type'},
        {value: 'assessments', text: 'Sort by attached assessments'}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.documents = [];
    mgaDocumentSrvc.query({}, function (documents) {
        documents.forEach(function (el) {
            el.user_list = [];
            el.users.forEach(function (element) {
                mgaUserListSrvc.get({_id: element}, function (user) {
                    el.user_list.push(user);
                });
            });
            $scope.documents.push(el);
        });
    });
});
