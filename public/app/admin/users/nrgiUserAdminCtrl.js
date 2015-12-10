'use strict';
//var angular;

angular.module('app')
    .controller('nrgiUserAdminCtrl', function (
        $scope,
        nrgiAssessmentSrvc,
        nrgiAuthLogsSrvc,
        nrgiUserSrvc
    ) {
        // filtering options
        $scope.sort_options = [
            {value: "firstName", text: "Sort by first name"},
            {value: "lastName", text: "Sort by last name"},
            {value: "username", text: "Sort by username"},
            {value: "role", text: "Sort by role"},
            {value: "started", text: "Sort by date started"},
            {value: "approved", text: "Sort by date approved"}
        ];
        $scope.sort_order = $scope.sort_options[1].value;

        nrgiUserSrvc.query({}, function (users) {
            $scope.users = [];
            users.forEach(function (user) {
                nrgiAuthLogsSrvc.getMostRecent(user._id, 'sign-in')
                    .then(function (log) {
                        user.last_sign_in = log.data.logs[0];
                    });

                //get assessment info
                user.assessments.forEach(function(el, i) {
                    user.assessments[i].details = nrgiAssessmentSrvc.get({assessment_ID: el.assessment_ID});
                });
                $scope.users.push(user);
            });
        });
    });