'use strict';
/*jslint newcap: true */
var angular;

angular.module('app').factory('mgaAssessmentMethodSrvc', function ($http, $q, mgaIdentitySrvc, mgaAssessmentSrvc) {
    return {
        createAssessment: function (new_assessment_data) {

            var dfd = $q.defer(),
                new_assessment = new mgaAssessmentSrvc(new_assessment_data);

            new_assessment.length = new_assessment_data.length;
            new_assessment.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;

        },
        //deleteAssessment: function (assessment_deletion) {
        //    var dfd = $q.defer();
        //    console.log(assessment_deletion);
        //
        ////     user_deletion.$remove().then(function() {
        ////         dfd.resolve();
        ////     }), function(response) {
        ////         dfd.reject(response.data.reason);
        ////     };
        //    return dfd.promise;
        //},
        updateAssessment: function (new_assessment_data) {
            var dfd = $q.defer();

            new_assessment_data.$update().then(function () {
                dfd.resolve();
            }), function(response) {
                dfd.reject(response.data.reason);
            };
            return dfd.promise;
        }
    }    
});