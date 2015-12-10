'use strict';
//var angular;

angular.module('app')
    .controller('nrgiUserCreateCtrl', function (
        $scope,
        $location,
        nrgiNotifier,
        nrgiUserMethodSrvc
    ) {
        $scope.roleOptions = [
            // {value: 'admin', text: 'Administrator'},
            {value: 'supervisor', text: 'Supervisor'},
            {value: 'researcher', text: 'Researcher'}
            //{value: 'reviewer', text: 'Reviewer'}
        ];
        $scope.new_user_data = {};

        // fix submit button functionality
        $scope.userCreate = function () {
            var new_user_data = $scope.new_user_data;
            if (!new_user_data.firstName || !new_user_data.lastName) {
                nrgiNotifier.error('You must supply a first and last name!');
            } else if (!new_user_data.email) {
                nrgiNotifier.error('You must supply an email!');
            } else if (!new_user_data.username) {
                nrgiNotifier.error('You must supply an username!');
            } else {
                nrgiUserMethodSrvc.createUser(new_user_data).then(function () {
                    nrgiNotifier.notify('User account created! ' + $scope.email);
                    $location.path('/admin/user-admin');
                }, function (reason) {
                    var err_str = reason.replace('Path ','');
                    nrgiNotifier.error(err_str+'!');
                });
            }
        };
    });