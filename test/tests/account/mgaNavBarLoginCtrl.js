'use strict';
/*jslint nomen: true newcap: true */
var describe, beforeEach, afterEach, it, inject, expect, sinon;

// describe('mgaNavBarLoginCtrl', function () {
//     beforeEach(module('app'));

//     var $scope, $location, mgaAuthSrvc, mgaAssessmentSrvc, mgaNotifier;
//     var mgaNotifierNotifyStub, mgaNotifierNotifySpy;

//     beforeEach(inject(
//         function ($rootScope, $controller, _$location_, _mgaAssessmentSrvc_, _mgaAuthSrvc_, _mgaNotifier_) {
//             $scope = $rootScope.$new();
//             $location = _$location_;
//             mgaAssessmentSrvc = _mgaAssessmentSrvc_;
//             mgaAuthSrvc = _mgaAuthSrvc_;
//             mgaNotifier = _mgaNotifier_;

//             mgaNotifierNotifySpy = sinon.spy();
//             mgaNotifierNotifyStub = sinon.stub(mgaNotifier, 'notify', mgaNotifierNotifySpy);

//             $controller('mgaNavBarLoginCtrl', {$scope: $scope});
//         }
//     ));

//     describe('#signout', function () {
//         var mocks = {};

//         beforeEach(function () {
//             mocks.$location = sinon.mock($location);
//             mocks.$location.expects('path').withArgs('/');

//             mocks.mgaAuthSrvc = sinon.mock(mgaAuthSrvc);
//             mocks.mgaAuthSrvc.expects('logoutUser').
//                 returns({
//                     then: function (callback) {
//                         callback();
//                     }
//                 });

//             $scope.signout();
//         });

//         it('shows a notification message', function () {
//             mgaNotifierNotifySpy.withArgs('You have successfully signed out!').called.should.be.equal(true);
//         });

//         it('resets the username & password', function () {
//             $scope.username.should.be.equal('');
//             $scope.password.should.be.equal('');
//         });

//         afterEach(function () {
//             for (var mockIndex in mocks) {
//                 mocks[mockIndex].verify();
//                 mocks[mockIndex].restore();
//             }
//         });
//     });

//     describe('#signin', function () {
//         var authenticationStub;
//         var CORRECT_CREDENTIALS = {username: 'EXISTING_USER', password: 'CORRECT_PASSWORD'};

//         beforeEach(function () {
//             authenticationStub = sinon.stub(mgaAuthSrvc, 'authenticateUser', function(username, password) {
//                 return {
//                     then: function(callback) {
//                         callback((username === CORRECT_CREDENTIALS.username) && (password === CORRECT_CREDENTIALS.password));
//                     }
//                 };
//             });
//         });

//         describe('Authentication failure', function () {
//             beforeEach(function () {
//                 $scope.signin('NON-EXISTING-USER', 'INCORRECT-PASSWORD');
//             });

//             it('shows a notification message', function () {
//                 mgaNotifierNotifySpy.withArgs('Username/Password combination incorrect').called.should.be.equal(true);
//             });

//             it('clears the version list', function () {
//                 $scope.versions.length.should.be.equal(0);
//             });
//         });

//         describe('Authentication success', function () {
//             var assessmentStub;

//             beforeEach(function () {
//                 assessmentStub = sinon.stub(mgaAssessmentSrvc, 'query', function(useless, callback) {
//                     callback([
//                         {year: 2010, version: 'the social network'},
//                         {year: 2010, version: 'the social network'},
//                         {year: 1995, version: 'the pirates of silicon valley'}
//                     ]);
//                 });

//                 $scope.signin(CORRECT_CREDENTIALS.username, CORRECT_CREDENTIALS.password);
//             });

//             it('shows a notification message', function () {
//                 mgaNotifierNotifySpy.withArgs('You have successfully signed in!').called.should.be.equal(true);
//             });

//             it('fills the version list', function () {
//                 _.isEqual([
//                     {
//                         year: 2010,
//                         version: 'the social network',
//                         name: '2010 The social network',
//                         url: '2010_the social network'
//                     },
//                     {
//                         year: 1995,
//                         version: 'the pirates of silicon valley',
//                         name: '1995 The pirates of silicon valley',
//                         url: '1995_the pirates of silicon valley'
//                     }
//                 ], $scope.versions).should.be.equal(true);
//             });

//             afterEach(function () {
//                 assessmentStub.restore();
//             });
//         });

//         afterEach(function () {
//             authenticationStub.restore();
//         });
//     });

//     afterEach(function () {
//         mgaNotifierNotifyStub.restore();
//     });
// });