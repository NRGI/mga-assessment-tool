'use strict';
//var angular;

angular.module('app').controller('nrgiProfileCtrl', function ($scope, $route, nrgiIdentitySrvc, mgaUserMethodSrvc, nrgiNotifier) {
    // set page resources to be those of the current identity
    $scope.fullName = nrgiIdentitySrvc.currentUser.firstName + " " + nrgiIdentitySrvc.currentUser.lastName;
    $scope.first_name = nrgiIdentitySrvc.currentUser.firstName;
    $scope.last_name = nrgiIdentitySrvc.currentUser.lastName;
    $scope.email = nrgiIdentitySrvc.currentUser.email;
    $scope.username = nrgiIdentitySrvc.currentUser.username;
    $scope.role = nrgiIdentitySrvc.currentUser.role;
    $scope.user = nrgiIdentitySrvc.currentUser;
    // update functionality for update button
    $scope.update = function () {
        // pass in update data
        var new_user_data = $scope.user;
        if (!$scope.first_name || !$scope.last_name || !$scope.email) {
            nrgiNotifier.error('You must include a name and email!')
        } else {
            new_user_data.firstName = $scope.first_name;
            new_user_data.lastName = $scope.last_name;
            new_user_data.email = $scope.email;

            if ($scope.password) {
                if (!$scope.password_rep) {
                    nrgiNotifier.error('You must confirm your password!');
                } else if ($scope.password !== $scope.password_rep) {
                    nrgiNotifier.error('Passwords must match!');
                } else {
                    new_user_data.password = $scope.password;
                    mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                        nrgiNotifier.notify('Your user account has been updated');
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
                }
            } else {
                mgaUserMethodSrvc.updateUser(new_user_data).then(function () {
                    nrgiNotifier.notify('Your user account has been updated');
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            }
        }
    };
});
