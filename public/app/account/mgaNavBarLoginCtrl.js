'use strict';
var angular;
/*jslint newcap: true unparam: true*/

angular.module('app').controller('mgaNavBarLoginCtrl', function ($scope, $location, mgaNotifier, mgaIdentitySrvc, mgaAuthSrvc) {
    // assign the identity resource with the current identity using identity service
    $scope.identity = mgaIdentitySrvc;

    // signin function for signin button
    $scope.signin = function (username, password) {
        mgaAuthSrvc.authenticateUser(username, password).then(function (success) {
            $scope.versions = [];
            if (success) {
                mgaNotifier.notify('You have successfully signed in!');
            } else {
                mgaNotifier.error('Username/Password combination incorrect');
            }
        });
    };
    // signout function for signout button
    $scope.signout = function () {
        mgaAuthSrvc.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mgaNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    };
});