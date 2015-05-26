'use strict';
var angular;
/*jslint nomen: true newcap: true */

angular.module('app').factory('mgaUserMethodSrvc', function ($http, $q, mgaUserSrvc) {
    return {
        createUser: function (new_user_data) {
            var new_user = new mgaUserSrvc(new_user_data),
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
                delete_ID = new mgaUserSrvc();

            delete_ID.id = user_deletion;

            delete_ID.$delete().then(function () {
                dfd.resolve();
            }), function (response) {
                dfd.reject(response.data.reason);
            };
            return dfd.promise;
        },
        updateUser: function (new_user_data) {
            var dfd = $q.defer();
            
            new_user_data.$update().then(function () {
                dfd.resolve();
            }), function (response) {
                dfd.reject(response.data.reason);
            };
            return dfd.promise;
        }
    }
});