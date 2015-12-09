'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('mgaEditIntervieweeDialogCtrl', function ($scope, $route, ngDialog, nrgiNotifier, mgaIntervieweeMethodSrvc) {
    $scope.new_interviewee_data = $scope.$parent.interviewee;
    $scope.roles = ['government', 'cso', 'industry', 'expert', 'other'];
    $scope.titles = ['Mr.', 'Ms.', 'Mrs.'];

    $scope.intervieweeSave = function (new_interviewee_data) {
        // TODO fix save notification
        // TODO error check
        mgaIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data).then(function () {
            nrgiNotifier.notify('Interviewee has been updated');
            ngDialog.close();
        }, function (reason) {
            nrgiNotifier.error(reason);
        });
        //if (new_doc_data.authors[0].first_name === "" || new_doc_data.authors[0].last_name === "" || !new_doc_data.title || !new_doc_data.type) {
        //    nrgiNotifier.error('You must provide at least a title, author and publication type!')
        //} else {
        //
        //    if (new_doc_data.status === 'created') {
        //        new_doc_data.status = 'submitted';
        //    }
        //    mgaDocumentMethodSrvc.updateDocument(new_doc_data).then(function () {
        //        nrgiNotifier.notify('Document has been updated');
        //        ngDialog.close();
        //    }, function (reason) {
        //        nrgiNotifier.error(reason);
        //    });
        //}

    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
