'use strict';
//var angular;

angular.module('app').controller('mgaProfileCtrl', function ($scope, mgaIdentitySrvc, mgaUserMethodSrvc, mgaNotifier) {
    // set page resources to be those of the current identity
    $scope.fullName = mgaIdentitySrvc.currentUser.firstName + " " + mgaIdentitySrvc.currentUser.lastName;
    $scope.fname = mgaIdentitySrvc.currentUser.firstName;
    $scope.lname = mgaIdentitySrvc.currentUser.lastName;
    $scope.email = mgaIdentitySrvc.currentUser.email;
    $scope.username = mgaIdentitySrvc.currentUser.username;
    $scope.role = mgaIdentitySrvc.currentUser.role;
    $scope.user = mgaIdentitySrvc.currentUser;
    // update functionality for update button
    $scope.update = function () {
        // pass in update data
        var new_user_data = $scope.user;

        new_user_data.firstName = $scope.fname;
        new_user_data.lastName = $scope.lname;
        new_user_data.email = $scope.email;
        if ($scope.password) {
            if ($scope.password_rep) {
                if ($scope.password === $scope.password_rep) {
                    new_user_data.password = $scope.password;
                    mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                        mgaNotifier.notify('Your user account has been updated');
                    }, function (reason) {
                        mgaNotifier.error(reason);
                    });
                } else {
                    mgaNotifier.error('Passwords must match!');
                }
            } else {
                mgaNotifier.error('You must confirm your password!');
            }
        } else {
            mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                mgaNotifier.notify('Your user account has been updated');
            }, function (reason) {
                mgaNotifier.error(reason);
            });
        }
    };
});