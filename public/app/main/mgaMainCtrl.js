'use strict';
var angular;

angular.module('app').controller('mgaMainCtrl', function ($scope, mgaIdentitySrvc) {
    // bring in current user data to customize front page
    if (mgaIdentitySrvc === '') {
        $scope.fullName = mgaIdentitySrvc.currentUser.firstName + " " + mgaIdentitySrvc.currentUser.lastName;
        $scope.role = mgaIdentitySrvc.currentUser.role;
    }
});