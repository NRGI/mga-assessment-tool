'use strict';

angular.module('app')
    .controller('nrgiBiblioFormCtrl', function (
        $scope,
        nrgiDialogFactory
    ) {
        $scope.ref_type = [
            {text: 'Add Document', value: 'document'},
            {text: 'Add Webpage', value: 'webpage'},
            {text: 'Add Interview', value: 'interview'}
        ];

        //TODO Generate Dialog based on change and handle upload process via dialogs
        $scope.selectRefDialog = function(value) {
            nrgiDialogFactory.referenceSelect($scope, value);
        };
    });