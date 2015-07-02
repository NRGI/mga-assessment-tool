'use strict';
//var angular;

angular.module('app').controller('mgaProfileCtrl', function ($scope, $route, mgaIdentitySrvc, mgaUserMethodSrvc, mgaNotifier) {
    // set page resources to be those of the current identity
    $scope.fullName = mgaIdentitySrvc.currentUser.firstName + " " + mgaIdentitySrvc.currentUser.lastName;
    $scope.first_name = mgaIdentitySrvc.currentUser.firstName;
    $scope.last_name = mgaIdentitySrvc.currentUser.lastName;
    $scope.email = mgaIdentitySrvc.currentUser.email;
    $scope.username = mgaIdentitySrvc.currentUser.username;
    $scope.role = mgaIdentitySrvc.currentUser.role;
    $scope.user = mgaIdentitySrvc.currentUser;
    // update functionality for update button
    $scope.update = function () {
        // pass in update data
        var new_user_data = $scope.user;
        if (!$scope.first_name || !$scope.last_name || !$scope.email) {
            mgaNotifier.error('You must include a name and email!')
        } else {
            new_user_data.firstName = $scope.first_name;
            new_user_data.lastName = $scope.last_name;
            new_user_data.email = $scope.email;

            if ($scope.password) {
                if (!$scope.password_rep) {
                    mgaNotifier.error('You must confirm your password!');
                } else if ($scope.password !== $scope.password_rep) {
                    mgaNotifier.error('Passwords must match!');
                } else {
                    new_user_data.password = $scope.password;
                    mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                        mgaNotifier.notify('Your user account has been updated');
                        $route.reload();
                    }, function (reason) {
                        mgaNotifier.error(reason);
                    });
                }
            } else {
                mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                    mgaNotifier.notify('Your user account has been updated');
                    $route.reload();
                }, function (reason) {
                    mgaNotifier.error(reason);
                });
            }
        }
    };
});
