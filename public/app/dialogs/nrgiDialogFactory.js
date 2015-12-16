'use strict';

angular
    .module('app')
    .factory('nrgiDialogFactory', function (
        ngDialog
        //nrgiNotifier,
        //nrgiUtilsSrvc
    ) {
        return {
            assessmentAssign: function ($scope, assessment) {
                var scope = $scope;
                scope.value = true;
                scope.assessment_update_ID = assessment;
                ngDialog.open({
                    template: 'partials/dialogs/assessments/assign-assessment-dialog',
                    controller: 'nrgiAssignAssessmentDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            assessmentCreate: function ($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/assessments/new-assessment-dialog',
                    controller: 'nrgiNewAssessmentDialogCtrl',
                    className: 'ngdialog-theme-default',
                    scope: scope
                });
            },
            interviewAnswerNew: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/answers/new-interview-answer-dialog',
                    controller: 'nrgiNewInterviewAnswerDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            interviewAnswerEdit: function($scope) {

            },
            commentEdit: function($scope, comment, index) {
                var scope = $scope;
                scope.value = true;
                scope.index = index;
                scope.comment = comment;
                ngDialog.open({
                    template: 'partials/dialogs/comments/comment-edit-dialog',
                    controller: 'nrgiCommentEditDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            documentCreate: function($scope) {
                var scope = $scope;
                scope.value = true;

                ngDialog.close('ngdialog1');
                ngDialog.open({
                    template: 'partials/dialogs/references/new-document-dialog',
                    controller: 'nrgiNewDocumentDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            webpageCreate: function($scope) {
                var scope = $scope;
                scope.value = true;

                ngDialog.close('ngdialog1');
                ngDialog.open({
                    template: 'partials/dialogs/references/new-webpage-dialog',
                    controller: 'nrgiNewWebpageDialogCtrl',
                    className: 'ngdialog-theme-default',
                    scope: scope
                });
            },
            documentEdit: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/references/edit-document-dialog',
                    controller: 'nrgiEditDocumentDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            flagCreate: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/flags/flag-answer-dialog',
                    controller: 'nrgiFlagAnswerDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: $scope
                });
            },
            flagEdit: function($scope, flag, index) {
                var scope = $scope;
                scope.value = true;
                scope.index = index;
                scope.flag = flag;
                ngDialog.open({
                    template: 'partials/dialogs/flags/flag-answer-dialog',
                    controller: 'nrgiFlagAnswerDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            intervieweeEdit: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/references/edit-interviewee-dialog',
                    controller: 'nrgiEditIntervieweeDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            //questionNew: function($scope) {
            //    var scope = $scope;
            //    scope.value = true;
            //    ngDialog.open({
            //        template: 'partials/dialogs/questions/new-question-dialog',
            //        controller: 'nrgiNewQuestionDialogCtrl',
            //        className: 'ngdialog-theme-default dialogwidth800',
            //        scope: scope
            //    });
            //},
            questionDelete: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/questions/delete-question-confirmation-dialog',
                    controller: 'nrgiDeleteQuestionDialogCtrl',
                    className: 'ngdialog-theme-default',
                    scope: scope
                });
            },
            referenceSelect: function ($scope, value){
                var scope = $scope;
                scope.value = true;
                scope.ref_selection = value;
                ngDialog.open({
                    template: 'partials/dialogs/references/new-ref-dialog',
                    controller: 'nrgiNewRefDialogCtrl',
                    className: 'ngdialog-theme-default dialogwidth800',
                    scope: scope
                });
            },
            userEdit: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/users/edit-user-dialog',
                    controller: 'nrgiEditUserDialogCtrl',
                    className: 'ngdialog-theme-default',
                    scope: scope
                });
            },
            userDelete: function($scope) {
                var scope = $scope;
                scope.value = true;
                ngDialog.open({
                    template: 'partials/dialogs/users/delete-user-confirmation-dialog',
                    controller: 'nrgiDeleteUserDialogCtrl',
                    className: 'ngdialog-theme-default',
                    scope: scope
                });
            }
        };
    });