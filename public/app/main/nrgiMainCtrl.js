'use strict';
//var angular;

angular.module('app').controller('nrgiMainCtrl', function ($scope, nrgiIdentitySrvc) {
    // bring in current user data to customize front page
    if (nrgiIdentitySrvc === '') {
        $scope.fullName = nrgiIdentitySrvc.currentUser.firstName + " " + nrgiIdentitySrvc.currentUser.lastName;
        $scope.role = nrgiIdentitySrvc.currentUser.role;
    }
});