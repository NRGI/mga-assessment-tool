'use strict';

angular.module('app')
    .controller('nrgiAnswerNavCtrl', function (
        $scope,
        $location,
        $routeParams,
        nrgiUtilsSrvc,
        nrgiIdentitySrvc,
        nrgiAnswerSrvc
    ) {
        var root_url = '/assessments/answer/',
            answer_split = $routeParams.answer_ID.split('-'),
            assessment_ID = answer_split.slice(0, answer_split.length - 1).join('-');

        $scope.current_user = nrgiIdentitySrvc.currentUser;
        $scope.answer_number = Number(answer_split[2]);

        nrgiAnswerSrvc.query({assessment_ID: assessment_ID}, function (answers) {
            $scope.answers_length = answers.length;
        });

        $scope.moveForward = function () {
            $location.path(root_url + assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill($scope.answer_number + 1, 3)));
        };
        $scope.fastForward = function () {
            $location.path(root_url + assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill($scope.answers_length, 3)));
        };
        $scope.moveBackward = function () {
            $location.path(root_url + assessment_ID + "-" + String(nrgiUtilsSrvc.zeroFill($scope.answer_number - 1, 3)));
        };
        $scope.fastBackward = function () {
            $location.path(root_url + assessment_ID + "-001");
        };
    });