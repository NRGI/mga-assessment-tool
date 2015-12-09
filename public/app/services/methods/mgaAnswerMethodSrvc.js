'use strict';
//var angular;
/*jslint newcap: true */

angular.module('app').factory('mgaAnswerMethodSrvc', function ($q, nrgiAnswerSrvc) {
    return {
        insertAnswerSet: function (new_answer_set) {
            var dfd = $q.defer(),
                new_answers = new nrgiAnswerSrvc(new_answer_set);

            new_answers.length = new_answer_set.length;

            new_answers.$save().then(function () {
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
        }
        //updateAnswerSet: function (new_answer_data) {
        //    var dfd = $q.defer();
        //    new_answer_data.forEach(function (el, i) {
        //        el.$update().then(function () {
        //            dfd.resolve();
        //        }, function (response) {
        //            dfd.reject(response.data.reason);
        //        });
        //    });
        //    return dfd.promise;
        //}
        // updateAnswerSet: function (new_answer_data) {
        //     console.log(new_answer_data);
        //     var dfd = $q.defer(),
        //         newAnswers = new nrgiAnswerSrvc(new_answer_data);
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