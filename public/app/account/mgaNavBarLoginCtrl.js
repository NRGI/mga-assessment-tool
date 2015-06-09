'use strict';
//var angular;
/*jslint newcap: true unparam: true*/

angular.module('app').controller('mgaNavBarLoginCtrl', function ($scope, $location, mgaNotifier, mgaIdentitySrvc, mgaAuthSrvc, mgaAssessmentSrvc) {
    var url_array;
    // assign the identity resource with the current identity using identity service
    $scope.identity = mgaIdentitySrvc;
    $scope.assessment_links = [];
    url_array = [];
    if (mgaIdentitySrvc.currentUser !== undefined && mgaIdentitySrvc.currentUser.role === 'supervisor') {
        mgaAssessmentSrvc.query({}, function (data) {
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
    } else if (mgaIdentitySrvc.currentUser !== undefined) {
        mgaIdentitySrvc.currentUser.assessments.forEach(function (el) {
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
        mgaAuthSrvc.authenticateUser(username, password).then(function (success) {
            if (success) {
                $scope.identity = mgaIdentitySrvc;
                $scope.assessment_links = [];
                url_array = [];
                if (mgaIdentitySrvc.currentUser !== undefined && mgaIdentitySrvc.currentUser.role === 'supervisor') {
                    mgaAssessmentSrvc.query({}, function (data) {
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
                } else if (mgaIdentitySrvc.currentUser !== undefined) {
                    mgaIdentitySrvc.currentUser.assessments.forEach(function (el) {
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
                mgaNotifier.notify('You have successfully signed in!');
                $location.path('/');
            } else {
                mgaNotifier.error('Username/Password combination incorrect');
            }
        });
    };
    // signout function for signout button
    $scope.signout = function () {
        mgaAuthSrvc.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            $scope.assessment_links = [];
            mgaNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    };
});