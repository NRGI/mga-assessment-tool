'use strict';
angular.module('app')
    .factory('nrgiResetPasswordSrvc', function (nrgiRequestSubmitterSrvc) {
        return {
            recover: function (email) {
                return nrgiRequestSubmitterSrvc.submit('/api/reset-password-token/add', {email: email});
            },
            reset: function (token, password) {
                return nrgiRequestSubmitterSrvc.submit('/api/reset-password-token/reset', {token: token, password: password});
            }
        };
    });