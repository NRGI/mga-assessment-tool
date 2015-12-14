'use strict';

angular.module('app')
    .controller('nrgiAnswerFormCtrl', function ($scope) {
        $scope.redactorOptions = {
            keyupCallback: function (obj, event) {
                $scope.content = (obj.$el.getCode());
            }
        };
    });