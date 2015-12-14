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
            //assessmentReassign: function ($scope) {
            //    //var scope = $scope;
            //    //if (scope.assessment_counters.length !== (scope.assessment_counters.flagged + scope.assessment_counters.approved)) {
            //    //    rgiNotifier.error('You must approve or flag all questions!');
            //    //} else {
            //    //    scope.value = true;
            //    //    ngDialog.open({
            //    //        template: 'partials/dialogs/move-assessment-dialog',
            //    //        controller: 'rgiMoveAssessmentDialogCtrl',
            //    //        className: 'ngdialog-theme-default',
            //    //        scope: scope
            //    //    });
            //    //}
            //},
            //assessmentMove: function ($scope) {
            //    var scope = $scope;
            //    if (scope.assessment_counters.length!==((scope.assessment_counters.flagged + scope.assessment_counters.approved + scope.assessment_counters.unresolved) || scope.assessment_counters.finalized)) {
            //        rgiNotifier.error('You must approve or flag all questions!');
            //    } else {
            //        scope.value = true;
            //        ngDialog.open({
            //            template: 'partials/dialogs/assessments/move-assessment-dialog',
            //            controller: 'nrgiMoveAssessmentDialogCtrl',
            //            className: 'ngdialog-theme-default',
            //            scope: scope
            //        });
            //    }
            //},
            //assessmentMoveConfirm: function ($scope) {
            //    if (!$scope.action) {
            //        rgiNotifier.error('You must select an action!');
            //    } else {
            //        var scope = $scope.$parent;
            //        scope.action = $scope.action;
            //        ngDialog.close('ngdialog1');
            //        ngDialog.open({
            //            template: 'partials/dialogs/assessments/move-assessment-confirmation-dialog',
            //            controller: 'nrgiMoveAssessmentConfirmationDialogCtrl',
            //            className: 'ngdialog-theme-default',
            //            scope: scope
            //        });
            //    }
            //},
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
            //assessmentSubmit: function ($scope) {
            //    var scope = $scope;
            //    if (scope.assessment_counters.length !== scope.assessment_counters.complete) {
            //        rgiNotifier.error('You must complete all assessment questions');
            //    } else {
            //        scope.value = true;
            //        ngDialog.open({
            //            template: 'partials/dialogs/assessments/submit-confirmation-dialog',
            //            controller: 'nrgiSubmitAssessmentConfirmationDialogCtrl',
            //            className: 'ngdialog-theme-default',
            //            scope: scope
            //        });
            //    }
            //},
            //assessmentResubmit: function ($scope) {
            //    var scope = $scope;
            //    if (scope.assessment_counters.flagged !== 0) {
            //        rgiNotifier.error('You must resubmit all flagged answers!');
            //    } else {
            //        scope.value = true;
            //        ngDialog.open({
            //            template: 'partials/dialogs/assessments/resubmit-confirmation-dialog',
            //            controller: 'nrgiResubmitAssessmentConfirmationDialogCtrl',
            //            className: 'ngdialog-theme-default',
            //            scope: scope
            //        });
            //        //var new_assessment_data = scope.assessment;
            //        //new_assessment_data.status = 'resubmitted';
            //        //
            //        //rgiAssessmentMethodSrvc.updateAssessment(new_assessment_data)
            //        //    .then(function () {
            //        //        $location.path('/assessments');
            //        //        rgiNotifier.notify('Assessment submitted!');
            //        //    }, function (reason) {
            //        //        rgiNotifier.error(reason);
            //        //    });
            //    }
            //},
            //answerFinalChoice: function ($scope) {
            //    var scope = $scope;
            //    $scope.value = true;
            //    ngDialog.open({
            //        template: 'partials/dialogs/answers/final-choice-dialog',
            //        controller: 'nrgiFinalChoiceDialogCtrl',
            //        className: 'ngdialog-theme-default dialogwidth800',
            //        scope: $scope
            //    });
            //
            //},
            //commentEdit: function($scope, comment, index) {
            //    var scope = $scope;
            //    scope.value = true;
            //    scope.index = index;
            //    scope.comment = comment;
            //    ngDialog.open({
            //        template: 'partials/dialogs/comments/comment-edit-dialog',
            //        controller: 'nrgiCommentEditDialogCtrl',
            //        className: 'ngdialog-theme-default dialogwidth800',
            //        scope: scope
            //    });
            //},
            //documentCreate: function($scope) {
            //    var scope = $scope;
            //    scope.value = true;
            //
            //    ngDialog.close('ngdialog1');
            //    ngDialog.open({
            //        template: 'partials/dialogs/references/new-document-dialog',
            //        controller: 'nrgiNewDocumentDialogCtrl',
            //        className: 'ngdialog-theme-default dialogwidth800',
            //        scope: scope
            //    });
            //},
            //webpageCreate: function($scope) {
            //    var scope = $scope;
            //    scope.value = true;
            //
            //    ngDialog.close('ngdialog1');
            //    ngDialog.open({
            //        template: 'partials/dialogs/references/new-webpage-dialog',
            //        controller: 'nrgiNewWebpageDialogCtrl',
            //        className: 'ngdialog-theme-default',
            //        scope: scope
            //    });
            //},
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

            //        if (scope.ref_selection === 'document') {

            //} else if (scope.ref_selection === 'webpage') {
            //    ngDialog.close('ngdialog1');
            //    ngDialog.open({
            //        template: 'partials/dialogs/new-webpage-dialog',
            //        controller: 'rgiNewWebpageDialogCtrl',
            //        className: 'ngdialog-theme-default',
            //        scope: scope
            //    });
            //}
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
                    controller: 'nrgiFlagEditDialogCtrl',
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
            //referenceSelect: function ($scope, value){
            //    var scope = $scope;
            //    scope.value = true;
            //    scope.ref_selection = value;
            //    ngDialog.open({
            //        template: 'partials/dialogs/references/new-ref-dialog',
            //        controller: 'nrgiNewRefDialogCtrl',
            //        className: 'ngdialog-theme-default dialogwidth800',
            //        scope: scope
            //    });
            //},
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