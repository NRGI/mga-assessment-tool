'use strict';
var angular;
/*jslint newcap: true */

angular.module('app').factory('mgaIdentitySrvc', function ($window, mgaUserSrvc) {
    var currentUser;
    // bootstrapped object to keep session alive
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mgaUserSrvc();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        // authentication test
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        // role authorization test
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.role === role;
        }
    };
});