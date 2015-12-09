angular
    .module('app')
    .controller('nrgiRecoverPasswordCtrl', function (
        $scope,
        $location,
        nrgiNotifier,
        nrgiResetPasswordSrvc
    ) {
        'use strict';
        var getErrorMessage = function(errorCode) {
            return errorCode === 'USER_NOT_FOUND' ? 'The user is not found' : 'An unknown error occurred';
        };

        $scope.recoverPassword = function () {
            if ($scope.recoverPasswordForm.email.$pristine || $scope.recoverPasswordForm.email.$invalid) {
                return nrgiNotifier.error('The email is incorrect');
            }

            nrgiResetPasswordSrvc.recover($scope.email).then(function (response) {
                if(response.data.error) {
                    nrgiNotifier.error(getErrorMessage(response.data.error));
                } else {
                    nrgiNotifier.notify('An email with instructions to recover your password has been sent to your email address.');
                    $location.path('/');
                }
            }, function () {
                nrgiNotifier.error(getErrorMessage('UNKNOWN_ERROR'));
            });
        };
    });