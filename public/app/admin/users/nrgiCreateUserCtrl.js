'use strict';
//var angular;

angular.module('app').controller('nrgiCreateUserCtrl', function ($scope, $location, nrgiNotifier, nrgiUserMethodSrvc) {
    $scope.roleOptions = [
        // {value: 'admin', text: 'Administrator'},
        {value: 'supervisor', text: 'Supervisor'},
        {value: 'researcher', text: 'Researcher'}
        //{value: 'reviewer', text: 'Reviewer'}
    ];

  // fix submit button functionality
    $scope.userCreate = function () {
        if ($scope.password !== $scope.password_repeat) {
            nrgiNotifier.error('Passwords must match!')
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

            nrgiUserMethodSrvc.createUser(new_user_data).then(function () {
                // nrgiMailer.send($scope.email);
                nrgiNotifier.notify('User account created!' + $scope.email);
                $location.path('/admin/user-admin');
            }, function (reason) {
                nrgiNotifier.error(reason);
            });
        }
    };
});
