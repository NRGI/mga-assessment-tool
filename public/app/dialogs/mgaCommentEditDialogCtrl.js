'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('mgaCommentEditDialogCtrl', function ($scope, $location, ngDialog, mgaNotifier, mgaAnswerMethodSrvc) {
    console.log($scope.$parent.comment);
    $scope.comment_content = $scope.$parent.comment.content;
    $scope.saveComment = function () {
        var new_answer_data = $scope.$parent.answer,
            new_comment_data = $scope.$parent.comment,
            index = $scope.$parent.index,
            answer_ID = $scope.$parent.answer.answer_ID;
        if (new_comment_data.content === $scope.comment_content) {
            mgaNotifier.error('Do you have edits to submit?')
        } else {
            new_answer_data.comments[index].content = $scope.comment_content;

            mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                .then(function () {
                    mgaNotifier.notify('Comment edited');
                    $scope.closeThisDialog();
                    $location.path('/admin/assessments-admin/answer/' + answer_ID);
                }, function (reason) {
                    mgaNotifier.notify(reason);
                });
        }
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
