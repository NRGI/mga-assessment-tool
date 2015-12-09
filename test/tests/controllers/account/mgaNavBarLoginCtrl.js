'use strict';
/*jslint nomen: true newcap: true */
var describe, beforeEach, afterEach, it, inject, expect, sinon;

describe('mgaNavBarLoginCtrl', function () {
    beforeEach(module('app'));

    var $scope, $location, mgaAuthSrvc, mgaAssessmentSrvc, nrgiNotifier;
    var nrgiNotifierNotifyStub, nrgiNotifierErrorStub, nrgiNotifierNotifySpy, nrgiNotifierErrorSpy;

    beforeEach(inject(
        function ($rootScope, $controller, _$location_, _mgaAssessmentSrvc_, _mgaAuthSrvc_, _nrgiNotifier_) {
            $scope = $rootScope.$new();
            $location = _$location_;
            mgaAssessmentSrvc = _mgaAssessmentSrvc_;
            mgaAuthSrvc = _mgaAuthSrvc_;
            nrgiNotifier = _nrgiNotifier_;

            nrgiNotifierNotifySpy = sinon.spy();
            nrgiNotifierErrorSpy = sinon.spy();
            nrgiNotifierNotifyStub = sinon.stub(nrgiNotifier, 'notify', nrgiNotifierNotifySpy);
            nrgiNotifierErrorStub = sinon.stub(nrgiNotifier, 'error', nrgiNotifierErrorSpy);

            $controller('mgaNavBarLoginCtrl', {$scope: $scope});
        }
    ));

    describe('#signout', function () {
        var mocks = {};

        beforeEach(function () {
            mocks.$location = sinon.mock($location);
            mocks.$location.expects('path').withArgs('/');

            mocks.mgaAuthSrvc = sinon.mock(mgaAuthSrvc);
            mocks.mgaAuthSrvc.expects('logoutUser').
                returns({
                    then: function (callback) {
                        callback();
                    }
                });

            $scope.signout();
        });

        it('shows a notification message', function () {
            nrgiNotifierNotifySpy.withArgs('You have successfully signed out!').called.should.be.equal(true);
        });
        //TODO Fix test
        it('resets the username & password', function () {
            $scope.username.should.be.equal('');
            $scope.password.should.be.equal('');
            //$scope.assessment_links.should.be.equal([]);
        });

        afterEach(function () {
            for (var mockIndex in mocks) {
                mocks[mockIndex].verify();
                mocks[mockIndex].restore();
            }
        });
    });

    describe('#signin', function () {
        var authenticationStub;
        var CORRECT_CREDENTIALS = {username: 'EXISTING_USER', password: 'CORRECT_PASSWORD'};

        beforeEach(function () {
            authenticationStub = sinon.stub(mgaAuthSrvc, 'authenticateUser', function(username, password) {
                return {
                    then: function(callback) {
                        callback((username === CORRECT_CREDENTIALS.username) && (password === CORRECT_CREDENTIALS.password));
                    }
                };
            });
        });

        describe('Authentication failure', function () {
            beforeEach(function () {
                $scope.signin('NON-EXISTING-USER', 'INCORRECT-PASSWORD');
            });

            it('shows a notification message', function () {
                nrgiNotifierErrorSpy.withArgs('Username/Password combination incorrect').called.should.be.equal(true);
            });
            //TODO Fix test
            //it('clears the version list', function () {
            //    $scope.versions.length.should.be.equal(0);
            //});
        });

         //describe('Authentication success', function () {
         //    var assessmentStub;
         //    beforeEach(function () {
         //        assessmentStub = sinon.stub(mgaAssessmentSrvc, 'query', function(useless, callback) {
         //            callback([
         //                {year: 2010, country: 'bolivia', url: 'bo-2010'},
         //                {year: 2010, country: 'patronia', url: 'pa-2010'},
         //                {year: 1995, country: 'iceland', url: 'ic-1995'}
         //            ]);
         //        });
         //
         //        $scope.signin(CORRECT_CREDENTIALS.username, CORRECT_CREDENTIALS.password);
         //    });
         //
         //    it('shows a notification message', function () {
         //        nrgiNotifierNotifySpy.withArgs('You have successfully signed in!').called.should.be.equal(true);
         //    });
         //
         //    it('fills the version list', function () {
         //        _.isEqual([
         //            {
         //                year: 2010,
         //                version: 'the social network',
         //                name: '2010 The social network',
         //                url: '2010_the social network'
         //            },
         //            {
         //                year: 1995,
         //                version: 'the pirates of silicon valley',
         //                name: '1995 The pirates of silicon valley',
         //                url: '1995_the pirates of silicon valley'
         //            }
         //        ], $scope.versions).should.be.equal(true);
         //    });
         //
         //    afterEach(function () {
         //        assessmentStub.restore();
         //    });
         //});

        afterEach(function () {
            authenticationStub.restore();
        });
    });

    afterEach(function () {
        nrgiNotifierNotifyStub.restore();
    });
});
