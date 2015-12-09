'use strict';
//var angular;
/*jslint newcap: true unparam: true*/

angular.module('app').controller('nrgiNavBarLoginCtrl', function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiAuthSrvc, nrgiAssessmentSrvc) {
    var url_array;
    // assign the identity resource with the current identity using identity service
    $scope.identity = nrgiIdentitySrvc;
    $scope.assessment_links = [];
    url_array = [];
    if (nrgiIdentitySrvc.currentUser !== undefined && nrgiIdentitySrvc.currentUser.role === 'supervisor') {
        nrgiAssessmentSrvc.query({}, function (data) {
            data.forEach(function (el) {
                if (url_array.indexOf(el.assessment_ID) < 0) {
                    url_array.push(el.assessment_ID);
                    $scope.assessment_links.push({
                        url: el.assessment_ID,
                        country: el.country,
                        year: el.year
                    });
                }
            });
        });
    } else if (nrgiIdentitySrvc.currentUser !== undefined) {
        nrgiIdentitySrvc.currentUser.assessments.forEach(function (el) {
            if (url_array.indexOf(el.assessment_ID) < 0) {
                url_array.push(el.assessment_ID);
                $scope.assessment_links.push({
                    url: el.assessment_ID,
                    country: el.country,
                    year: el.year
                });
            }
        });
    }

    // signin function for signin button
    $scope.signin = function (username, password) {
        nrgiAuthSrvc.authenticateUser(username, password).then(function (success) {
            if (success) {
                $scope.identity = nrgiIdentitySrvc;
                $scope.assessment_links = [];
                url_array = [];
                if (nrgiIdentitySrvc.currentUser !== undefined && nrgiIdentitySrvc.currentUser.role === 'supervisor') {
                    nrgiAssessmentSrvc.query({}, function (data) {
                        data.forEach(function (el) {
                            if (url_array.indexOf(el.assessment_ID) < 0) {
                                url_array.push(el.assessment_ID);
                                $scope.assessment_links.push({
                                    url: el.assessment_ID,
                                    country: el.country,
                                    year: el.year
                                });
                            }
                        });
                    });
                } else if (nrgiIdentitySrvc.currentUser !== undefined) {
                    nrgiIdentitySrvc.currentUser.assessments.forEach(function (el) {
                        if (url_array.indexOf(el.assessment_ID) < 0) {
                            url_array.push(el.assessment_ID);
                            $scope.assessment_links.push({
                                url: el.assessment_ID,
                                country: el.country,
                                year: el.year
                            });
                        }
                    });
                }
                nrgiNotifier.notify('You have successfully signed in!');
                $location.path('/');
            } else {
                nrgiNotifier.error('Username/Password combination incorrect');
            }
        });
    };
    // signout function for signout button
    $scope.signout = function () {
        nrgiAuthSrvc.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            $scope.assessment_links = [];
            nrgiNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    };
});