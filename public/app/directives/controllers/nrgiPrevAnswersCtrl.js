'use strict';

angular.module('app')
    .controller('nrgiPrevAnswersCtrl', function ($scope, nrgiDialogFactory) {
        $scope.interviewEdit = function (score, index) {
            nrgiDialogFactory.interviewAnswerEdit($scope, score, index);
        };

    });