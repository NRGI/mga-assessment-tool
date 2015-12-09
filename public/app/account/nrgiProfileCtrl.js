'use strict';
//var angular;

angular.module('app')
    .controller('nrgiProfileCtrl', function (
        $scope,
        $route,
        nrgiIdentitySrvc,
        nrgiNotifier,
        nrgiUserMethodSrvc
    ) {
        // set page resources to be those of the current identity
        $scope.fullName = nrgiIdentitySrvc.currentUser.firstName + " " + nrgiIdentitySrvc.currentUser.lastName;

        $scope.current_user = nrgiIdentitySrvc.currentUser;

        // update functinonality for update button
        $scope.update = function () {
            var new_user_data = $scope.current_user;
            if (!new_user_data.firstName || !new_user_data.lastName) {
                nrgiNotifier.error('You must supply a first and last name!');
            } else if (!new_user_data.email) {
                nrgiNotifier.error('You must supply an email!');
            } else {
                // check if password update exists and pass it in
                if ($scope.password && $scope.password.length > 0) {
                    if ($scope.password !== $scope.password_rep) {
                        nrgiNotifier.error('Passwords must match!');
                    } else {
                        new_user_data.password = $scope.password;
                    }
                }
                // use authorization service to update user data
                nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
                    nrgiNotifier.notify('Your user account has been updated');
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            }
        };
    });
