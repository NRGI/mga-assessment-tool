'use strict';

angular.module('app')
    .controller('nrgiNewDocumentDialogCtrl', function (
        $scope,
        $route,
        ngDialog,
        nrgiAnswerMethodSrvc,
        nrgiDocumentSrvc,
        nrgiDocumentMethodSrvc,
        nrgiNotifier,
        nrgiUserMethodSrvc,
        nrgiUtilsSrvc
    ) {
        if ($scope.new_document.status === 'created') {
            $scope.new_document.authors = [{first_name: "", last_name: ""}];
            $scope.new_document.editors = [{first_name: "", last_name: ""}];
        }
        $scope.new_document = $scope.$parent.new_document;

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

        //DATEPICKER OPTS
        var today = new Date();
        $scope.date_default = today;
        $scope.date_max_limit = today;
        $scope.date_options = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.date_formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.date_format = $scope.date_formats[0];
        $scope.status = {
            opened: false
        };
        $scope.calendarOpen = function($event) {
            $scope.status.opened = true;
        };

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
            var url, new_user_data = $scope.$parent.current_user;
            //check for minimum data
            if (!$scope.new_document.authors[0].first_name || !$scope.new_document.authors[0].last_name) {
                nrgiNotifier.error('You must provide at least one author!');
            } else if (!$scope.new_document.title) {
                nrgiNotifier.error('You must provide a title!');
            } else if (!$scope.new_document.type) {
                nrgiNotifier.error('You must provide a document type!');
            } else if (!$scope.ref_date_accessed) {
                nrgiNotifier.error('You must provide the date of access!');
            } else {
                //if ($scope.new_document.source.split('://')[0] === 'http' || $scope.new_document.source.split('://')[0] === 'https') {
                //    url = $scope.new_document.source;
                //} else {
                //    url = 'http://' + $scope.new_document.source;
                //}
                ////TODO check for proper url
                //} else if ($scope.new_document.source !== undefined) {
                //    if ($scope.new_document.source.split('://')[0] === 'http' || $scope.answer.web_ref_url.split('://')[0] === 'https') {
                //        url = $scope.new_document.source;
                //    } else {
                //        url = 'http://' + $scope.new_document.source;
                //    }
                //    //    url = $scope.answer.web_ref_url;
                //    //} else {
                //    //    url = 'http://' + $scope.answer.web_ref_url;
                //    //}
                //    //var url = ;
                //    //nrgiUtilsSrvc.isURLReal(url)
                //    //    .fail(function (res) {
                //    //        nrgiNotifier.error('Website does not exists');
                //    //    })
                //    //    .done(function (res) {
                //    //
                //    //    });

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
                        date_accessed: new Date($scope.ref_date_accessed).toISOString(),
                        author: current_user_ID,
                        author_name: current_user_name,
                        role: current_user_role,
                        location: $scope.new_ref_location
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
                    new_ref_data.comment = $scope.answer.new_ref_comment;
                }

                if (new_user_data.documents !== undefined && new_user_data.documents.indexOf(new_document._id) < 0) {
                    new_user_data.documents.push(new_document._id);
                } else if (new_user_data.documents === undefined) {
                    new_user_data.documents = [new_document._id];
                }

                new_answer_data.references.citation.push(new_ref_data);

                nrgiAnswerMethodSrvc.updateAnswer(new_answer_data)
                    .then(nrgiDocumentMethodSrvc.updateDocument(new_doc_data))
                    .then(nrgiUserMethodSrvc.updateUser(new_user_data))
                    .then(function () {
                        $scope.closeThisDialog();
                        nrgiNotifier.notify('Reference added!');
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