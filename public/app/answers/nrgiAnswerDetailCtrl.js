'use strict';
/*jslint nomen: true*/
angular.module('app')
    .controller('nrgiAnswerDetailCtrl', function (
        $scope,
        $route,
        $routeParams,
        $q,
        $location,
        FileUploader,
        ngDialog,
        nrgiAnswerSrvc,
        nrgiAnswerMethodSrvc,
        nrgiAssessmentSrvc,
        nrgiAssessmentMethodSrvc,
        nrgiDocumentSrvc,
        nrgiDocumentMethodSrvc,
        nrgiIdentitySrvc,
        nrgiIntervieweeSrvc,
        nrgiIntervieweeMethodSrvc,
        nrgiNotifier,
        nrgiQuestionSrvc
    ) {
        $scope.identity = nrgiIdentitySrvc;
        $scope.page_type = 'answer';
        $scope.ref_type = [
            {text: 'Add Document', value: 'document'},
            {text: 'Add Webpage', value: 'webpage'},
            {text: 'Add Interview', value: 'interview'}
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
        $scope.new_interview_answer = {};
        $scope.moveForward = function () {
            $location.path('/admin/assessments-admin/answer/' + $scope.assessment.assessment_ID + "-" + String(zeroFill($scope.answer.question_order + 1, 3)));
        };
        $scope.moveBackward = function () {
            $location.path('/admin/assessments-admin/answer/' + $scope.assessment.assessment_ID + "-" + String(zeroFill($scope.answer.question_order - 1, 3)));
        };

        nrgiAnswerSrvc.get({
            answer_ID: $routeParams.answer_ID,
            assessment_ID: $routeParams.answer_ID.substring(0, 2)
        }, function (answer) {
            nrgiDocumentSrvc.query({}, function (documents) {
                nrgiIntervieweeSrvc.query({assessments: answer.assessment_ID}, function (interviewees) {
                    $scope.interviewees = interviewees;
                    $scope.answer = answer;
                    $scope.assessment = nrgiAssessmentSrvc.get({assessment_ID: answer.assessment_ID});
                    $scope.question = nrgiQuestionSrvc.get({_id: answer.root_question_ID});
                    $scope.current_user = nrgiIdentitySrvc.currentUser;
                    $scope.answer_start = angular.copy($scope.answer);

                    var document_selectors = [];
                    documents.forEach(function (el) {
                        document_selectors.push({
                            _id: el._id,
                            title: el.title
                        })
                    });
                    $scope.document_selectors = document_selectors;

                    var interview_scores = [];
                    answer.interview_score.forEach(function (el) {
                        nrgiIntervieweeSrvc.get({_id: el.interviewee_ID}, function (interviewee) {
                            interview_scores.push({
                                interview_text: el.interview_text,
                                interview_date: el.interview_date,
                                option_text: el.option_text,
                                value: el.value,
                                interviewee: interviewee
                            });
                        });
                    });
                    $scope.interview_scores = interview_scores;

                    var citations = [],
                        interviews = [],
                        flags = [];
                    answer.flags.forEach(function (el) {
                        var flag = el;
                        nrgiUserListSrvc.get({_id: el.addressed_to}, function(user) {
                            flag.addressee = user;
                        });
                        flags.push(flag);
                    });

                    answer.references.citation.forEach(function (el) {
                        nrgiDocumentSrvc.get({_id: el.document_ID}, function (doc) {
                            doc.comment = el;
                            citations.push(doc);
                        });
                    });

                    answer.references.human.forEach(function (el) {
                        nrgiIntervieweeSrvc.get({_id: el.interviewee_ID}, function (interviewee) {
                            interviewee.comment = el;
                            interviews.push(interviewee);
                        });
                    });


                    $scope.flags = flags;
                    $scope.citations = citations;
                    $scope.interviews = interviews;
                });

            });
        });
    });
