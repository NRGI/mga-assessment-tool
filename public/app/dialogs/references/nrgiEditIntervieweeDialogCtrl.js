'use strict';

angular
    .module('app')
    .controller('nrgiEditIntervieweeDialogCtrl', function (
        $scope,
        $route,
        ngDialog,
        nrgiNotifier,
        nrgiIntervieweeMethodSrvc
    ) {
        'use strict';
        $scope.new_interviewee_data = $scope.$parent.interviewee;
        $scope.salutations =['mr', 'mrs', 'ms'];
        $scope.roles = ['government', 'cso', 'industry', 'expert', 'other'];

        $scope.intervieweeSave = function (new_interviewee_data) {
            // TODO fix save notification
            // TODO error check
            nrgiIntervieweeMethodSrvc.updateInterviewee(new_interviewee_data).then(function () {
                nrgiNotifier.notify('Interviewee has been updated');
                ngDialog.close();
            }, function (reason) {
                nrgiNotifier.error(reason);
            });
        };

        $scope.closeDialog = function () {
            ngDialog.close();
        };
    });