'use strict';
//var angular;
/*jslint nomen: true*/

function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array( width + (/\./.test(number) ? 2 : 1) ).join('0') + number;
    }
    return number + ""; // always return a string
}

angular.module('app').controller('mgaAnswerCtrl', function ($scope, $routeParams, $q, $location, FileUploader, ngDialog, mgaNotifier, mgaAnswerSrvc, mgaAnswerMethodSrvc, mgaAssessmentSrvc, mgaAssessmentMethodSrvc, mgaDocumentSrvc, mgaDocumentMethodSrvc, mgaQuestionSrvc, mgaIdentitySrvc) {
    $scope.identity = mgaIdentitySrvc;

    mgaAnswerSrvc.get({
        answer_ID: $routeParams.answer_ID,
        assessment_ID: $routeParams.answer_ID.substring(0, 2)
    }, function (answer) {
        mgaDocumentSrvc.query({}, function (documents) {
            $scope.answer = answer;
            $scope.assessment = mgaAssessmentSrvc.get({assessment_ID: answer.assessment_ID});
            $scope.question = mgaQuestionSrvc.get({_id: answer.root_question_ID});
            $scope.current_user = mgaIdentitySrvc.currentUser;
            $scope.answer_start = angular.copy($scope.answer);

            var document_selectors = [];
            documents.forEach(function (el) {
                document_selectors.push({
                    _id: el._id,
                    title: el.title
                })
            });
            $scope.document_selectors = document_selectors;

            var citations = [];
            answer.references.citation.forEach(function (el) {
                mgaDocumentSrvc.get({_id: el.document_ID}, function (doc) {
                    doc.comment = el.comment;
                    citations.push(doc);
                });
            });
            $scope.citations = citations;
        });
    });

    $scope.ref_type = [
        {text: 'Add Document', value: 'document'},
        {text: 'Add Webpage', value: 'web'},
        {text: 'Add Human Reference', value: 'human'}
    ];

    $scope.new_doc_type = [
        {value: 'journal', text: 'Journal'},
        {value: 'book', text: 'Book'},
        {value: 'generic', text: 'Generic'},
        {value: 'book_section', text: 'Book Section'},
        {value: 'conference_proceedings', text: 'Conference Proceedings'},
        {value: 'working_paper', text: 'Working Paper'},
        {value: 'report', text: 'Report'},
        {value: 'web_page', text: 'Web Page'},
        {value: 'thesis', text: 'Thesis'},
        {value: 'magazine_article', text: 'Magazine Article'},
        {value: 'statute', text: 'Statute'},
        {value: 'patent', text: 'Patent'},
        {value: 'newspaper_article', text: 'Newspaper Article'},
        {value: 'computer_program', text: 'Computer Program'},
        {value: 'hearing', text: 'Hearing'},
        {value: 'television_broadcast', text: 'Television Broadcast'},
        {value: 'encyclopedia_article', text: 'Encyclopedia Article'},
        {value: 'case', text: 'Case'},
        {value: 'film', text: 'Film'},
        {value: 'bill', text: 'Bill'}
    ];

    $scope.flagCheck = function (flags) {
        var disabled = false;
        if (flags.length !== 0) {
            flags.forEach(function (el) {
                if (el.addressed === false) {
                    disabled = true;
                }
            });
        }
        return disabled;
    };

    $scope.answerFlag = function () {
        $scope.value = true;
        ngDialog.open({
            template: 'partials/dialogs/flag-question-dialog',
            controller: 'mgaFlagQuestionDialogCtrl',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };

    $scope.answerClear = function () {
        $scope.answer = angular.copy($scope.answer_start);
    };

    $scope.answerSave = function () {
        var new_answer_data = $scope.answer;

        if (new_answer_data.status === 'created') {
            new_answer_data.status = 'saved';
        }
        mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
            mgaNotifier.notify('Answer saved');
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };

    $scope.answerSubmit = function () {
        var new_answer_data = $scope.answer,
            new_assessment_data = $scope.assessment;

        if (new_answer_data.status === 'flagged') {
            new_answer_data.status = 'submitted';
            new_assessment_data.questions_flagged -= 1;
            new_assessment_data.questions_complete += 1;
        } else if (new_answer_data.status !== 'submitted') {
            new_answer_data.status = 'submitted';
            new_assessment_data.questions_complete += 1;
        }

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
            .then(mgaAssessmentMethodSrvc.updateAssessment(new_assessment_data))
            .then(function () {
                if (new_assessment_data.questions_complete !== new_assessment_data.question_length && new_answer_data.question_order !== new_assessment_data.question_length) {
                    $location.path('/admin/assessments-admin/answer/' + new_answer_data.assessment_ID + "-" + String(zeroFill((new_answer_data.question_order + 1), 3))); //TODO figure out non-sequential question order as well as end question
                } else {
                    $location.path('/assessments/' + new_answer_data.assessment_ID);
                }
                mgaNotifier.notify('Answer submitted');
            }, function (reason) {
                mgaNotifier.notify(reason);
            });
    };

    $scope.commentSubmit = function (current_user) {
        var new_comment_data = {
                content: $scope.answer.new_comment,
                author_name: current_user.firstName + ' ' + current_user.lastName,
                author: current_user._id,
                role: current_user.role,
                date: new Date().toISOString()
            },
            new_answer_data = $scope.answer;

        new_answer_data.comments.push(new_comment_data);

        if (new_answer_data.status === 'assigned') {
            new_answer_data.status = 'saved';
        }

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
            mgaNotifier.notify('Comment added');
            $scope.answer.new_comment = undefined;
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };

    $scope.humanRefSubmit = function (current_user) {
        var new_answer_data = $scope.answer,

            new_ref_data = {
                first_name: $scope.answer.human_ref_first_name,
                last_name: $scope.answer.human_ref_last_name,
                phone: $scope.answer.human_ref_phone,
                email: $scope.answer.human_ref_email,
                contact_date: new Date().toISOString(),
                comment: {
                    date: new Date().toISOString(),
                    author: current_user._id,
                    author_name: current_user.firstName + ' ' + current_user.lastName,
                    role: current_user.role
                }
            };
        if ($scope.answer.human_ref_comment !== undefined) {
            new_ref_data.comment.content = $scope.answer.human_ref_comment;
        }
        new_answer_data.references.human.push(new_ref_data);


        mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
            mgaNotifier.notify('reference added');
            $scope.answer.human_ref_first_name = "";
            $scope.answer.human_ref_last_name = "";
            $scope.answer.human_ref_phone = "";
            $scope.answer.human_ref_email = "";
            $scope.answer.human_ref_contact_date = "";
            $scope.answer.human_ref_comment = "";
            $scope.ref_selection = "";
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };

    $scope.webRefSubmit = function (current_user) {
        var new_answer_data = $scope.answer,
            new_ref_data,
            new_url;
        if ($scope.answer.web_ref_url.indexOf('http://') > -1 || $scope.answer.web_ref_url.indexOf('https://') > -1) {
            new_url = $scope.answer.web_ref_url;
        } else {
            new_url = 'https://' + $scope.answer.web_ref_url;
        }

        new_ref_data = {
            title: $scope.answer.web_ref_title,
            URL: new_url,
            comment: {
                date: new Date().toISOString(),
                author: current_user._id,
                author_name: current_user.firstName + ' ' + current_user.lastName,
                role: current_user.role
            }
        };

        if ($scope.answer.web_ref_comment !== undefined) {
            new_ref_data.comment.content = $scope.answer.web_ref_comment;
        }
        new_answer_data.references.web.push(new_ref_data);

        mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
            mgaNotifier.notify('reference added');
            $scope.ref_selection = "";
            $scope.answer.web_ref_title = "";
            $scope.answer.web_ref_url = "";
            $scope.answer.web_ref_comment = "";
            $scope.answer.web_ref_comment = "";
        }, function (reason) {
            mgaNotifier.notify(reason);
        });
    };

    var uploader = $scope.uploader = new FileUploader({
        isHTML5: true,
        withCredentials: true,
        url: 'file-upload'
    });
    //noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
    uploader.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 1;
        }
    });
    //noinspection JSUnusedLocalSymbols
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        if (status === 400) {
            $scope.uploader.queue = [];
            mgaNotifier.error(response.reason);
        } else {// TODO add cancel upload after initial document pass
            $scope.new_document = response;

            $scope.uploader.queue = [];

            $scope.value = true;
            ngDialog.open({
                template: 'partials/dialogs/new-document-dialog',
                controller: 'mgaNewDocumentDialogCtrl',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        }

    };

    //$scope.documentRefSubmit = function (new_document) {
    //    var assessment_ID = $scope.assessment.assessment_ID,
    //        question_ID = $scope.question._id,
    //        answer_ID = $scope.answer.answer_ID,
    //        current_user_ID = $scope.current_user._id,
    //        current_user_name = $scope.current_user.firstName + ' ' + $scope.current_user.lastName,
    //        current_user_role = $scope.current_user.role,
    //        new_answer_data = $scope.answer,
    //        new_doc_data = new mgaDocumentSrvc(new_document),
    //        new_ref_data = {
    //            document_ID: new_document._id,
    //            // mendeley_ID
    //            file_hash: new_document.file_hash,
    //            comment: {
    //                date: new Date().toISOString(),
    //                author: current_user_ID,
    //                author_name: current_user_name,
    //                role: current_user_role
    //            }
    //        };
    //
    //    if (new_doc_data.status === 'created') {
    //        new_doc_data.status = 'submitted';
    //    }
    //
    //    if (new_doc_data.assessments !== undefined) {
    //        new_doc_data.assessments.push(assessment_ID);
    //    } else {
    //        new_doc_data.assessments = [assessment_ID];
    //    }
    //
    //    if (new_doc_data.questions !== undefined) {
    //        new_doc_data.questions.push(question_ID);
    //    } else {
    //        new_doc_data.questions = [question_ID];
    //    }
    //
    //    if (new_doc_data.answers !== undefined) {
    //        new_doc_data.answers.push(answer_ID);
    //    } else {
    //        new_doc_data.answers = [answer_ID];
    //    }
    //
    //    if (new_doc_data.users !== undefined) {
    //        new_doc_data.users.push(current_user_ID);
    //    } else {
    //        new_doc_data.users = [current_user_ID];
    //    }
    //
    //    if ($scope.answer.new_ref_comment !== undefined) {
    //        new_ref_data.comment.content = $scope.answer.new_ref_comment;
    //    }
    //
    //    new_answer_data.references.citation.push(new_ref_data);
    //
    //    mgaAnswerMethodSrvc.updateAnswer(new_answer_data)
    //        .then(mgaDocumentMethodSrvc.updateDocument(new_doc_data))
    //        .then(function () {
    //            mgaNotifier.notify('reference added');
    //            $scope.ref_selection = "";
    //            $scope.new_document.title = "";
    //            $scope.new_document.type = "";
    //            $scope.new_document.authors = "";
    //            $scope.new_document.editors = "";
    //            $scope.new_document.source = "";
    //            $scope.new_document.year = "";
    //            $scope.new_document.pages = "";
    //            $scope.new_document.volume = "";
    //            $scope.new_document.issue = "";
    //            $scope.new_document.publisher = "";
    //            $scope.new_document.city = "";
    //            $scope.new_document.edition = "";
    //            $scope.new_document.institution = "";
    //            $scope.new_document.series = "";
    //            $scope.new_document.chapter = "";
    //            $scope.new_document.country = "";
    //            $scope.new_document.translators = "";
    //            $scope.new_document.series_editor = "";
    //            $scope.answer.new_ref_comment = "";
    //        }, function (reason) {
    //            mgaNotifier.notify(reason);
    //        });
    //};


});