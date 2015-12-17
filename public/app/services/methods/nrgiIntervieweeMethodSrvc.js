'use strict';
/*jslint nomen: true newcap: true */
//var angular;

angular.module('app')
    .factory('nrgiIntervieweeMethodSrvc', function (
        $http,
        $q,
        nrgiIntervieweeSrvc
    ) {
        return {
            createInterviewee: function (new_interviewee_data) {
                var new_interviewee = new nrgiIntervieweeSrvc(new_interviewee_data),
                    dfd = $q.defer();
                new_interviewee.$save().then(function (interviewee) {
                    dfd.resolve(interviewee);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                return dfd.promise;
            },
            deleteInterviewee: function (user_deletion) {
                var dfd = $q.defer(),
                    delete_ID = new nrgiIntervieweeSrvc();

                delete_ID.id = user_deletion;

                //noinspection CommaExpressionJS
                delete_ID.$delete().then(function () {
                    dfd.resolve();
                }), function (response) {
                    dfd.reject(response.data.reason);
                };
                return dfd.promise;
            },
            updateInterviewee: function (new_interviewee_data) {
                var dfd = $q.defer();

                //noinspection CommaExpressionJS
                new_interviewee_data.$update().then(function () {
                    dfd.resolve();
                }), function (response) {
                    dfd.reject(response.data.reason);
                };
                return dfd.promise;
            }
        }
    });