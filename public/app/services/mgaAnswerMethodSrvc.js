'use strict';
var angular;
/*jslint newcap: true */

angular.module('app').factory('mgaAnswerMethodSrvc', function ($q, mgaAnswerSrvc) {
    return {
        insertAnswerSet: function (new_answer_set) {
            var dfd = $q.defer(),
                new_answers = new mgaAnswerSrvc(new_answer_set);
            new_answers.length = new_answer_set.length;
            console.log(new_answers);
            newAnswers.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateAnswer: function (new_answer_data) {
            var dfd = $q.defer();
            new_answer_data.$update().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateAnswerSet: function (new_answer_data) {
            var dfd = $q.defer();
            new_answer_data.forEach(function (el, i) {
                el.$update().then(function () {
                    dfd.resolve();
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
            });
            return dfd.promise;
        }
        // updateAnswerSet: function (new_answer_data) {
        //     console.log(new_answer_data);
        //     var dfd = $q.defer(),
        //         newAnswers = new mgaAnswerSrvc(new_answer_data);
        //     newAnswers.length = new_answer_data.length;
        //     console.log(newAnswers);
        //     // newAnswers.$update().then(function () {
        //     //     dfd.resolve();
        //     // }, function (response) {
        //     //     dfd.reject(response.data.reason);
        //     // });
        //     return dfd.promise;
        // }
    };
});