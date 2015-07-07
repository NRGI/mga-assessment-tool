'use strict';
//var angular;

// query answers
angular.module('app').factory('mgaAnswerSrvc', function ($resource) {
    var AnswerResource = $resource('/api/answers/:answer_ID', {answer_ID: '@answer_ID'}, {
        update: {method: 'PUT', isArray: false}
    });

    return AnswerResource;
});