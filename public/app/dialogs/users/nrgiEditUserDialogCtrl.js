angular.module('app')
    .controller('nrgiEditUserDialogCtrl', function (
        $scope,
        $route,
        ngDialog,
        nrgiNotifier,
        nrgiUserMethodSrvc
    ) {
        'use strict';
        $scope.new_user_data = $scope.$parent.user;
        $scope.roles = ['supervisor', 'researcher'];

        //$scope.intervieweeSave = function (new_interviewee_data) {
        //    // TODO fix save notification
        //    // TODO error check
        //    rgiIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data).then(function () {
        //        rgiNotifier.notify('Interviewee has been updated');
        //        ngDialog.close();
        //    }, function (reason) {
        //        rgiNotifier.error(reason);
        //    });
        //};

        $scope.userUpdate = function () {
            var new_user_data = $scope.user;
            if (!new_user_data.email) {
                nrgiNotifier.error('You must enter an email address!');
            } else if (!new_user_data.firstName || !new_user_data.lastName) {
                nrgiNotifier.error('You must enter an first and last name!');
            } else if (!new_user_data.role) {
                nrgiNotifier.error('You must enter a role!');
            } else {
                if ($scope.password && $scope.password.length > 0) {
                    if ($scope.password === $scope.password_rep) {
                        new_user_data.password = $scope.password;
                        nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
                            nrgiNotifier.notify('User account has been updated');
                            ngDialog.close();
                            $route.reload();
                        }, function (reason) {
                            nrgiNotifier.error(reason);
                        });
                    } else {
                        nrgiNotifier.error('Passwords must match!');
                    }
                } else {
                    nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
                        nrgiNotifier.notify('User account has been updated');
                        ngDialog.close();
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
                }
            }
        };

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });