'use strict';
var angular;
/*jslint nomen: true*/

angular.module('app').controller('mgaUserAdminDetailCtrl', function ($scope, $routeParams, $location, ngDialog, mgaNotifier, mgaUserSrvc, mgaUserMethodSrvc) {

    $scope.user = mgaUserSrvc.get({_id: $routeParams.id});
    $scope.roleOptions = [
        // {value: 'admin', text: 'Administrator'},
        {value: 'supervisor', text: 'Supervisor'},
        {value: 'researcher', text: 'Researcher'},
        {value: 'reviewer', text: 'Reviewer'}
    ];

    $scope.userUpdate = function () {
        var new_user_data = $scope.user;

        if ($scope.password && $scope.password.length > 0) {
            if ($scope.password === $scope.password_rep) {
                new_user_data.password = $scope.password;
                mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                    mgaNotifier.notify('User account has been updated');
                }, function (reason) {
                    mgaNotifier.error(reason);
                });
            } else {
                mgaNotifier.error('Passwords must match!');
            }
        } else {
            mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                mgaNotifier.notify('User account has been updated');
            }, function (reason) {
                mgaNotifier.error(reason);
            });
        }
    };
    $scope.deleteConfirmDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/delete-profile-confirmation-dialog',
            controller: 'mgaDeleteProfileDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };
});