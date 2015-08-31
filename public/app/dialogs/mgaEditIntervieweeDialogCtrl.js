'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('mgaEditIntervieweeDialogCtrl', function ($scope, $route, ngDialog, mgaNotifier, mgaIntervieweeMethodSrvc) {
    $scope.new_interviewee_data = $scope.$parent.interviewee;
    $scope.roles = ['government', 'cso', 'industry', 'expert', 'other'];

    $scope.authorPush = function () {
        $scope.new_doc_data.authors.push({first_name: "", last_name: ""});
    };

    $scope.editorPush = function () {
        $scope.new_doc_data.editors.push({first_name: "", last_name: ""});
    };

    $scope.authorPop = function (index) {
        $scope.new_doc_data.authors.splice(index, 1);
    };

    $scope.editorPop = function (index) {
        $scope.new_doc_data.editors.splice(index, 1);
    };

    $scope.intervieweeSave = function (new_interviewee_data) {
        // TODO fix save notification
        // TODO error check
        mgaIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data).then(function () {
            mgaNotifier.notify('Interviewee has been updated');
            ngDialog.close();
        }, function (reason) {
            mgaNotifier.error(reason);
        });
        //if (new_doc_data.authors[0].first_name === "" || new_doc_data.authors[0].last_name === "" || !new_doc_data.title || !new_doc_data.type) {
        //    mgaNotifier.error('You must provide at least a title, author and publication type!')
        //} else {
        //
        //    if (new_doc_data.status === 'created') {
        //        new_doc_data.status = 'submitted';
        //    }
        //    mgaDocumentMethodSrvc.updateDocument(new_doc_data).then(function () {
        //        mgaNotifier.notify('Document has been updated');
        //        ngDialog.close();
        //    }, function (reason) {
        //        mgaNotifier.error(reason);
        //    });
        //}

    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
