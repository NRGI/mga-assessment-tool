'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('nrgiNewDocumentDialogCtrl', function ($scope, $route, ngDialog, nrgiNotifier, nrgiDocumentSrvc, mgaDocumentMethodSrvc, mgaAnswerMethodSrvc) {
    $scope.new_document = $scope.$parent.new_document;

    if ($scope.new_document.status === 'created') {
        $scope.new_document.authors = [{first_name: "", last_name: ""}];
        $scope.new_document.editors = [{first_name: "", last_name: ""}];
    }

    $scope.authorPush = function () {
        $scope.new_document.authors.push({first_name: "", last_name: ""});
    };

    $scope.editorPush = function () {
        $scope.new_document.editors.push({first_name: "", last_name: ""});
    };

    $scope.authorPop = function (index) {
        $scope.new_document.authors.splice(index, 1);
    };

    $scope.editorPop = function (index) {
        $scope.new_document.editors.splice(index, 1);
    };

    $scope.documentRefSubmit = function (new_document) {
        if ($scope.new_document.authors[0].first_name === "" || $scope.new_document.authors[0].last_name === "" || !$scope.new_document.title || !$scope.new_document.type) {
            nrgiNotifier.error('You must provide at least a title, author and publication type!')
        } else {
            var assessment_ID = $scope.$parent.assessment.assessment_ID,
                question_ID = $scope.$parent.question._id,
                answer_ID = $scope.$parent.answer.answer_ID,
                current_user_ID = $scope.$parent.current_user._id,
                current_user_name = $scope.$parent.current_user.firstName + ' ' + $scope.current_user.lastName,
                current_user_role = $scope.$parent.current_user.role,
                new_answer_data = $scope.$parent.answer,
                new_doc_data = new nrgiDocumentSrvc(new_document),
                new_ref_data = {
                    document_ID: new_document._id,
                    // mendeley_ID
                    file_hash: new_document.file_hash,
                    comment: {
                        date: new Date().toISOString(),
                        author: current_user_ID,
                        author_name: current_user_name,
                        role: current_user_role
                    }
                };

            if (new_doc_data.status === 'created') {
                new_doc_data.status = 'submitted';
            }

            if (new_doc_data.assessments !== undefined && new_doc_data.assessments.indexOf(assessment_ID) < 0) {
                new_doc_data.assessments.push(assessment_ID);
            } else if (new_doc_data.assessments === undefined) {
                new_doc_data.assessments = [assessment_ID];
            }

            if (new_doc_data.questions !== undefined && new_doc_data.questions.indexOf(question_ID) < 0) {
                new_doc_data.questions.push(question_ID);
            } else if (new_doc_data.questions === undefined) {
                new_doc_data.questions = [question_ID];
            }

            if (new_doc_data.answers !== undefined && new_doc_data.answers.indexOf(answer_ID) < 0) {
                new_doc_data.answers.push(answer_ID);
            } else if (new_doc_data.answers === undefined) {
                new_doc_data.answers = [answer_ID];
            }

            if (new_doc_data.users !== undefined && new_doc_data.users.indexOf(current_user_ID) < 0) {
                new_doc_data.users.push(current_user_ID);
            } else if (new_doc_data.users === undefined) {
                new_doc_data.users = [current_user_ID];
            }

            if ($scope.answer.new_ref_comment !== undefined) {
                new_ref_data.comment.content = $scope.answer.new_ref_comment;
            }

            new_answer_data.references.citation.push(new_ref_data);

            mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
                .then(mgaDocumentMethodSrvc.updateDocument(new_doc_data))
                .then(function () {
                    $scope.closeThisDialog();
                    nrgiNotifier.notify('reference added');
                    $route.reload();
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
        }
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
