'use strict';
/*jslint nomen: true newcap: true */
var describe, beforeEach, afterEach, it, inject, expect, sinon, readJSON;

describe('mgaAssessmentAdminDetailCtrl', function () {
    beforeEach(module('app'));

    var $rootScope, mgaAnswerSrvc, mgaAssessmentSrvc, $httpBackend, createCtrl, ctrl, answersWithAssessment, mgaIntervieweeSrvc;

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            ctrl = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            mgaAssessmentSrvc = $injector.get('mgaAssessmentSrvc');
            mgaAnswerSrvc = $injector.get('mgaAnswerSrvc');
            mgaIntervieweeSrvc = $injector.get('mgaIntervieweeSrvc');
            answersWithAssessment = readJSON('test/mock/answers_assessment_ID_AF_2017.json');

            $httpBackend.whenGET(/interviewees/).respond(readJSON('test/mock/interview.json'));
            $httpBackend.whenGET(/answers/).respond(answersWithAssessment);
            $httpBackend.whenGET(/assessments/).respond(readJSON('test/mock/assessments_AF_2017.json'));
            $httpBackend.whenGET(/user/).respond(readJSON('test/mock/user_55f977b9ebe2f23f8bed79ee.json'));

            createCtrl = function () {
                var scope = $rootScope.$new();
                ctrl('mgaAssessmentAdminDetailCtrl', {$scope: scope});
                return scope;
            }
        })
    });


    it('should call answers and assessments services', function (done) {
        sinon.spy(mgaAnswerSrvc, 'query');
        sinon.spy(mgaAssessmentSrvc, 'get');
        var scope = createCtrl();
        $httpBackend.flush();

        expect(mgaAnswerSrvc.query.calledOnce, 'mgaAnswerSrvc called once').to.be.true();
        expect(mgaAssessmentSrvc.get.calledOnce, 'mgaAssessmentSrvc called once').to.be.true();

        expect(scope.csvHeaders, 'headers should be object').to.be.instanceof(Object);
        expect(scope.answer_list, 'answers should be array').to.be.instanceof(Array);
        expect(scope.answer_list).to.have.length(answersWithAssessment.length);

        var btnState = {pending: false};
        scope.downloadCSV(btnState).then(function (array) {
            expect(array).to.be.instanceof(Array);
            expect(array).to.have.length(answersWithAssessment.length);
        }).finally(function () {
            expect(btnState.pending).to.be.false();
            mgaAnswerSrvc.query.restore();
            mgaAssessmentSrvc.get.restore();
            done();
        });
        expect(btnState.pending).to.be.true();
        $rootScope.$apply()
    });

    it('should addCommentsIntoAnswerRow', function () {
        var scope = createCtrl();
        var answer = {comments: [{content: 'content1', author_name: 'author_name1'}, {content: 'content2', author_name: 'author_name2'}]};
        var row = {comments: ''};
        scope.addCommentsIntoAnswerRow(answer, row);
        expect(row.comments, 'comment is not empty string').to.have.length.above(10);

        answer = {comments: []};
        row = {comments: ''};
        scope.addCommentsIntoAnswerRow(answer, row);
        expect(row.comments, 'comment is empty string').to.have.length(0);

    });

    it('should addFlagsIntoAnswerRow', function () {
        var scope = createCtrl();
        var answer = {flags: [{content: 'c1', author_name: 'a1', addressed: 'ad1'}, {content: 'c2', author_name: 'a2', addressed: 'ad2'}]};
        var row = {flags: ''};
        scope.addFlagsIntoAnswerRow(answer, row);
        expect(row.flags, 'flag is not empty string').to.have.length.above(10);
        answer = {flags: []};
        row = {flags: ''};
        scope.addFlagsIntoAnswerRow(answer, row);
        expect(row.flags, 'flag is empty string').to.have.length(0);
    });

    it('should generateAnswerRowForDiskResearch', function (done) {
        var scope = createCtrl();
        var answer = {
            answer_score: {value: 11, option_text: 'text'},
            answer_text: 'answ text',
            comments: [],
            flags: []
        };
        scope.generateAnswerRowForDiskResearch(angular.copy(answer)).then(function (arr) {
            try {
                expect(arr, 'result should be array').to.have.length(1);
                var item = arr[0];
                expect(item.score_value, 'score_value is string').to.be.equal(answer.answer_score.value);
                expect(item.score_text, 'score_value is string').to.be.equal(answer.answer_score.option_text);
                expect(item.answer_text, 'score_value is string').to.be.equal(answer.answer_text);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        $rootScope.$apply();
    });

    it('should generateAnswerRowForSecondarySource', function (done) {
        var scope = createCtrl();
        var answer = {
            answer_score: {value: 11, option_text: 'text'},
            comments: [],
            flags: []
        };
        scope.generateAnswerRowForSecondarySource(angular.copy(answer)).then(function (arr) {
            try {
                expect(arr, 'result should be array').to.have.length(1);
                var item = arr[0];
                expect(item.score_value, 'score_value is string').to.be.equal(answer.answer_score.value);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        $rootScope.$apply();
    });

    it('should generateAnswerRowForInterview', function (done) {
        var scope = createCtrl();
        var answer = {
            answer_score: {value: 11, option_text: 'text'},
            comments: [],



            flags: [],
            interview_score: [{
                interviewee_ID: 1,
                "interview_text": "interview_text",
                "value": 123123,
                "option_text": "opt text",
                answer_score:  {value: 11, option_text: 'text'}
            }]
        };
        sinon.spy(mgaIntervieweeSrvc, 'get');

        scope.generateAnswerRowForInterview(angular.copy(answer)).then(function (arr) {
            try {
                expect(arr, 'result should be array').to.have.length(1);
                var item = arr[0];
                expect(item.score_value, 'score_value is string').to.be.equal(answer.interview_score[0].value);
                expect(item.score_text, 'score_value is string').to.be.equal(answer.interview_score[0].option_text);
                expect(item.answer_text, 'score_value is string').to.be.equal(answer.interview_score[0].interview_text);
                done();
            }
            catch (e) {
                done(e);
            }
            finally {
                mgaIntervieweeSrvc.get.restore();
            }
        });
        $httpBackend.flush();
        $rootScope.$apply();
    });


    afterEach(function () {
        $rootScope.$apply();
    });

});
