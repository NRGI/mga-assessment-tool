'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('mgaFlagQuestionDialogCtrl', function ($scope, $location, ngDialog, mgaNotifier, mgaAnswerMethodSrvc, mgaAssessmentMethodSrvc) {

    $scope.saveFlag = function () {
        var new_answer_data = $scope.$parent.answer,
            current_user = $scope.$parent.identity.currentUser,
            new_assessment_data = $scope.$parent.assessment,
            new_flag_data = {
                content: $scope.flag_content,
                author_name: current_user.firstName + ' ' + current_user.lastName,
                author: current_user._id,
                role: current_user.role,
                date: new Date().toISOString(),
                addressed: false
            },
            answer_ID = $scope.$parent.answer.answer_ID;

        new_answer_data.flags.push(new_flag_data);

        if (new_answer_data.status==='approved') {
            new_answer_data.status = 'flagged';
            new_assessment_data.questions_complete -= 1;
            new_assessment_data.questions_flagged += 1;
        } else if (new_answer_data.status !== 'flagged') {
            new_answer_data.status = 'flagged';
            new_assessment_data.questions_flagged += 1;
        }

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
            .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            .then(function () {
                mgaNotifier.notify('Answer flagged');
                new_assessment_data = undefined;
                $scope.closeThisDialog();
                $location.path('/admin/assessments-admin/answer/' + answer_ID);
            }, function (reason) {
                mgaNotifier.notify(reason);
            });
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
