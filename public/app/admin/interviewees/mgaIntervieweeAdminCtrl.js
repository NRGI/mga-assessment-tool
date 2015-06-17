'use strict';
/*jslint nomen: true unparam: true regexp: true*/
//var angular;

angular.module('app').controller('mgaIntervieweeAdminCtrl', function ($scope, mgaIntervieweeSrvc) {
    $scope.interviewees = mgaIntervieweeSrvc.query({});
    console.log($scope);
});