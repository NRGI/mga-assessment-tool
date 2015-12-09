'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('mgaDeleteProfileDialogCtrl', function ($scope, $location, ngDialog, mgaUserMethodSrvc, nrgiNotifier) {
    $scope.userDelete = function () {
        var user_deletion = $scope.$parent.user._id;

        mgaUserMethodSrvc.deleteUser(user_deletion).then(function () {
            $scope.closeThisDialog();
            $location.path('/admin/user-admin');
            nrgiNotifier.notify('User account has been deleted');
        }, function (reason) {
            nrgiNotifier.error(reason);
        });
    };
    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
