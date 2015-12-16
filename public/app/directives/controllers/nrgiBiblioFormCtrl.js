'use strict';

angular.module('app')
    .controller('nrgiBiblioFormCtrl', function (
        $scope,
        $routeParams,
        nrgiAnswerSrvc,
        nrgiDialogFactory
    ) {
        $scope.ref_type = [
            {text: 'Add Document', value: 'document'},
            {text: 'Add Webpage', value: 'webpage'}
        ];
        nrgiAnswerSrvc.get({answer_ID: $routeParams.answer_ID}, function (answer) {
            if (answer.question_mode!=='interview') {
                $scope.ref_type.push({text: 'Add Interview', value: 'interview'});
            }
            $scope.question_mode = answer.question_mode;
        });

        //TODO Generate Dialog based on change and handle upload process via dialogs
        $scope.selectRefDialog = function(value) {
            nrgiDialogFactory.referenceSelect($scope, value);
        };
    });