'use strict';
angular.module('app')
    .controller('nrgiDeleteUserDialogCtrl', function (
        $scope,
        $location,
        ngDialog,
        nrgiUserMethodSrvc,
        nrgiNotifier
    ) {
        'use strict';
        $scope.userDelete = function () {
            var user_deletion = $scope.$parent.user;

            if (user_deletion.assessments.length > 0) {
                nrgiNotifier.error('You cannot delete a user with an assigned assessment!');
            } else if (user_deletion.role === 'supervisor') {
                nrgiNotifier.error('You cannot delete a supervisor!');
            } else {
                nrgiUserMethodSrvc.deleteUser(user_deletion._id).then(function () {
                    $scope.closeDialog();
                    $location.path('/admin/user-admin');
                    nrgiNotifier.notify('User account has been deleted');
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            }
        };
        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });