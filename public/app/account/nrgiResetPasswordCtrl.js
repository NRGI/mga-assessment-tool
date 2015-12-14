'use strict';
angular.module('app')
    .controller('nrgiResetPasswordCtrl', function (
        $scope,
        $routeParams,
        $location,
        nrgiNotifier,
        nrgiResetPasswordSrvc
    ) {
        var getErrorMessage = function(errorCode) {
            var errorMessages = {
                TOKEN_NOT_FOUND: 'The token is not found',
                USER_NOT_FOUND: 'The user is not found',
                SET_PASSWORD_ERROR: 'Unable to set password'
            };
            return errorMessages[errorCode] === undefined ? 'An unknown error occurred' : errorMessages[errorCode];
        };

        $scope.resetPassword = function () {
            if ($scope.password.length === 0) {
                return nrgiNotifier.error('The password cannot be empty');
            } else if ($scope.password !== $scope.passwordRepeat) {
                return nrgiNotifier.error('The passwords must match');
            }

            nrgiResetPasswordSrvc.reset($routeParams.token, $scope.password).then(function (response) {
                if(response.data.error) {
                    nrgiNotifier.error(getErrorMessage(response.data.error));
                } else {
                    nrgiNotifier.notify('The password has been successfully reset. You can log in using your new password.');
                    $location.path('/');
                }
            }, function () {
                nrgiNotifier.error(getErrorMessage('UNKNOWN_ERROR'));
            });
        };
    });
