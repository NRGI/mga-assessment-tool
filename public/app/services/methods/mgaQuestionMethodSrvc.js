'use strict';
var angular;
/*jslint newcap: true */

angular.module('app').factory('mgaQuestionMethodSrvc', function ($q, nrgiQuestionSrvc) {
    return {
        //insertQuestionSet: function (new_question_set) {
        //    var dfd = $q.defer(),
        //        newQuestions = new nrgiQuestionSrvc(new_question_set);
        //    newQuestions.length = new_question_set.length;
        //    newQuestions.$save().then(function () {
        //        dfd.resolve();
        //    }, function (response) {
        //        dfd.reject(response.data.reason);
        //    });
        //    return dfd.promise;
        //},
        // insertQuestionSet: function (new_question_set) {
        //     var dfd = $q.defer(),
        //         // new_question;
        //         newQuestions = new nrgiQuestionSrvc(new_question_set);

        //     new_question_set.forEach(function (el, i) {
        //         new_question = new nrgiQuestionSrvc(el);
        //         new_question.$save().then(function () {
        //             dfd.resolve();
        //         }, function (response) {
        //             dfd.reject(response.data.reason);
        //         });
        //     });
        //     return dfd.promise;
        // },
        updateQuestion: function (new_question_data) {
            var dfd = $q.defer();

            new_question_data.$update().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        deleteQuestion: function (questionDeletion) {
            var dfd, deleteID;

            dfd = $q.defer();
            deleteID = new nrgiQuestionSrvc();
            deleteID.id = questionDeletion;

            deleteID.$delete().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }
    };
});