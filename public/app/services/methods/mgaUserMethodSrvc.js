'use strict';
/*jslint nomen: true newcap: true */
//var angular;

angular.module('app').factory('mgaUserMethodSrvc', function ($http, $q, nrgiUserSrvc) {
    return {
        createUser: function (new_user_data) {
            var new_user = new nrgiUserSrvc(new_user_data),
                dfd = $q.defer();

            new_user.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        deleteUser: function (user_deletion) {
            var dfd = $q.defer(),
                delete_ID = new nrgiUserSrvc();

            delete_ID.id = user_deletion;

            //noinspection CommaExpressionJS
            delete_ID.$delete().then(function () {
                dfd.resolve();
            }), function (response) {
                dfd.reject(response.data.reason);
            };
            return dfd.promise;
        },
        updateUser: function (new_user_data) {
            var dfd = $q.defer();
            
            //noinspection CommaExpressionJS
            new_user_data.$update().then(function () {
                dfd.resolve();
            }), function (response) {
                dfd.reject(response.data.reason);
            };
            return dfd.promise;
        }
    }
});
