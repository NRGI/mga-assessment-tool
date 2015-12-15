'use strict';

angular
    .module('app')
    .controller('nrgiCommentsCtrl', function (
        $scope,
        $route,
        ngDialog,
        nrgiDialogFactory,
        nrgiIdentitySrvc,
        nrgiAnswerMethodSrvc,
        nrgiQuestionMethodSrvc,
        nrgiNotifier
    ) {
        $scope.current_user = nrgiIdentitySrvc.currentUser;

        $scope.commentSubmit = function () {
            var current_user = nrgiIdentitySrvc.currentUser,
                new_comment_data = {
                    content: $scope.update.new_comment,
                    author_name: current_user.firstName + ' ' + current_user.lastName,
                    author: current_user._id,
                    role: current_user.role,
                    date: new Date().toISOString()
                },
                new_update_data = $scope.update;

            new_update_data.comments.push(new_comment_data);

            if (new_update_data.status === 'assigned' && !current_user.isSupervisor()) {
                new_update_data.status = 'saved';
            }

            switch($scope.$parent.page_type) {
                case 'answer':
                    nrgiAnswerMethodSrvc.updateAnswer(new_update_data).then(function () {
                        nrgiNotifier.notify('Comment added');
                        $scope.update.new_comment = undefined;
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.notify(reason);
                    });
                    break;
                case 'question':
                    nrgiQuestionMethodSrvc.updateQuestion(new_update_data).then(function () {
                        nrgiNotifier.notify('Comment added');
                        $scope.update.new_comment = undefined;
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.notify(reason);
                    });
                    break;
                default:
                    nrgiNotifier.error('Unrecognized page format!');

            }

            //nrgiAnswerMethodSrvc.updateAnswer(new_update_data).then(function () {
            //    nrgiNotifier.notify('Comment added');
            //    $scope.update.new_comment = undefined;
            //    $route.reload();
            //}, function (reason) {
            //    nrgiNotifier.notify(reason);
            //});
        };
        $scope.commentEdit = function (comment, index) {
            nrgiDialogFactory.commentEdit($scope, comment, index);
        };
    });