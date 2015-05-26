'use strict';
var angular;

angular.module('app').controller('mgaCreateUserCtrl', function ($scope, $location, mgaNotifier, mgaUserMethodSrvc) {
    $scope.roleOptions = [
        // {value: 'admin', text: 'Administrator'},
        {value: 'supervisor', text: 'Supervisor'},
        {value: 'researcher', text: 'Researcher'},
        {value: 'reviewer', text: 'Reviewer'}
    ];

  // fix submit button functionality
    $scope.userCreate = function () {
        var new_user_data = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            // ADD ROLE IN CREATION EVENT
            role: $scope.roleSelect
        };

        mgaUserMethodSrvc.createUser(new_user_data).then(function () {
            // mgaMailer.send($scope.email);
            mgaNotifier.notify('User account created!' + $scope.email);
            $location.path('/admin/user-admin');
        }, function (reason) {
            mgaNotifier.error(reason);
        });
    };
});