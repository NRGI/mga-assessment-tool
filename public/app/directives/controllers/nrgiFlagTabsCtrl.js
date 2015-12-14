'use strict';

angular.module('app')
    .controller('nrgiFlagTabsCtrl', function (
        $scope,
        nrgiDialogFactory
    ) {
        $scope.flagEdit = function (flag, index) {
            nrgiDialogFactory.flagEdit($scope, flag, index);
        };
    });