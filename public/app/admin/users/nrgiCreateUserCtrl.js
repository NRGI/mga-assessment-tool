'use strict';
//var angular;

angular.module('app').controller('nrgiCreateUserCtrl', function ($scope, $location, mgaNotifier, mgaUserMethodSrvc) {
    $scope.roleOptions = [
        // {value: 'admin', text: 'Administrator'},
        {value: 'supervisor', text: 'Supervisor'},
        {value: 'researcher', text: 'Researcher'}
        //{value: 'reviewer', text: 'Reviewer'}
    ];

  // fix submit button functionality
    $scope.userCreate = function () {
        if ($scope.password !== $scope.password_repeat) {
            mgaNotifier.error('Passwords must match!')
        } else {
            var new_user_data = {
                firstName: $scope.first_name,
                lastName: $scope.last_name,
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
        }
    };
});
