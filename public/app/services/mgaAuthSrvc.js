'use strict';
var angular;
/*jslint newcap: true */

angular.module('app').factory('mgaAuthSrvc', function ($http, $q, mgaIdentitySrvc, mgaUserSrvc) {
    return {
        // AUTHENTICATION AND AUTHORIZATION
        //authentication
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new mgaUserSrvc();
                    angular.extend(user, response.data.user);
                    mgaIdentitySrvc.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        //logout
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mgaIdentitySrvc.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        //authorize for specific route based on role
        authorizeCurrentUserForRoute: function (role) {
            if (mgaIdentitySrvc.isAuthorized(role)) {
                return true;
            }
            if (!mgaIdentitySrvc.isAuthorized(role)) {
                return $q.reject('not authorized');
            }
        },
        //limit route to authenticated users
        authorizeAuthenticatedUserForRoute: function () {
            if (mgaIdentitySrvc.isAuthenticated()) {
                return true;
            }
            if (!mgaIdentitySrvc.isAuthenticated()) {
                return $q.reject('not authorized');
            }
        }
    };
});