'use strict';
//var angular;
/*jslint true*/

angular.module('app').controller('nrgiUserAdminDetailCtrl', function ($scope, $routeParams, $location, ngDialog, nrgiNotifier, mgaUserSrvc, mgaUserMethodSrvc) {

    $scope.user = mgaUserSrvc.get({_id: $routeParams.id});
    $scope.role_options = [
        // {value: 'admin', text: 'Administrator'},
        {value: 'supervisor', text: 'Supervisor'},
        {value: 'researcher', text: 'Researcher'}
        //{value: 'reviewer', text: 'Reviewer'}
    ];

    $scope.userUpdate = function () {
        var new_user_data = $scope.user;
        if (!new_user_data.email) {
            rgiNotifier.error('You must enter an email address!');
        } else if (!new_user_data.firstName || !new_user_data.lastName) {
            rgiNotifier.error('You must enter an full name!');
        } else if (!new_user_data.role) {
            rgiNotifier.error('You must enter a role!');
        } else {
            if ($scope.password && $scope.password.length > 0) {
                if ($scope.password === $scope.password_rep) {
                    new_user_data.password = $scope.password;
                    mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                        nrgiNotifier.notify('User account has been updated');
                        $location.path('/admin/user-admin');
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
                } else {
                    nrgiNotifier.error('Passwords must match!');
                }
            } else {
                mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                    nrgiNotifier.notify('User account has been updated');
                    $location.path('/admin/user-admin');
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            }
        }
    };
    $scope.deleteConfirmDialog = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/delete-profile-confirmation-dialog',
            controller: 'nrgiDeleteProfileDialogCtrl',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };
});
