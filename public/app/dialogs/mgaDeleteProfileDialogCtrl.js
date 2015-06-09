'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('mgaDeleteProfileDialogCtrl', function ($scope, $location, ngDialog, mgaUserMethodSrvc, mgaNotifier) {
    $scope.userDelete = function () {
        var user_deletion = $scope.$parent.user._id;

        mgaUserMethodSrvc.deleteUser(user_deletion).then(function () {
            $scope.closeThisDialog();
            $location.path('/admin/user-admin');
            mgaNotifier.notify('User account has been deleted');
        }, function (reason) {
            mgaNotifier.error(reason);
        });
    };
    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
