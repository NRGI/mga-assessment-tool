'use strict';

var describe, beforeEach, afterEach, it, inject, expect, sinon;

describe('mgaProfileCtrl', function () {
    beforeEach(module('app'));

    var $scope, mgaIdentitySrvc, mgaUserMethodSrvc, mgaNotifier;
    var currentUserBackUp;
    //
    var dummyCurrentUser = {
        firstName: 'FIRST NAME',
        lastName: 'LAST NAME',
        email: 'EMAIL',
        username: 'USERNAME',
        role: 'USER'
    };

    beforeEach(inject(
        function ($rootScope, $controller, _mgaIdentitySrvc_, _mgaUserMethodSrvc_, _mgaNotifier_) {
            $scope = $rootScope.$new();
            mgaIdentitySrvc = _mgaIdentitySrvc_;
            mgaUserMethodSrvc = _mgaUserMethodSrvc_;
            mgaNotifier = _mgaNotifier_;

            currentUserBackUp = mgaIdentitySrvc.currentUser;
            mgaIdentitySrvc.currentUser = dummyCurrentUser;

            $controller('mgaProfileCtrl', {$scope: $scope});
        }
    ));

    it('initialize the fields by values got from identity service', function () {
        $scope.fullName.should.be.equal(dummyCurrentUser.firstName + ' ' + dummyCurrentUser.lastName);
        $scope.first_name.should.be.equal(dummyCurrentUser.firstName);
        $scope.last_name.should.be.equal(dummyCurrentUser.lastName);
        $scope.email.should.be.equal(dummyCurrentUser.email);
        $scope.role.should.be.equal(dummyCurrentUser.role);
        $scope.username.should.be.equal(dummyCurrentUser.username);
    });

    describe('#update', function () {
        var userMethodUpdateCurrentUserStub, userMethodUpdateCurrentUserSpy, notifierMock;

        beforeEach(function () {
            $scope.first_name = 'UPDATED FIRST NAME';
            $scope.last_name = 'UPDATED LAST NAME';
            $scope.email = 'UPDATED EMAIL';
            $scope.password = null;
            notifierMock = sinon.mock(mgaNotifier);
        });

        describe('POSITIVE CASE', function () {
            beforeEach(function () {
                userMethodUpdateCurrentUserSpy = sinon.spy(function () {
                    return {
                        then: function (callback) {
                            callback();
                        }
                    };
                });
                userMethodUpdateCurrentUserStub = sinon.stub(mgaUserMethodSrvc, 'updateUser', userMethodUpdateCurrentUserSpy);
                notifierMock.expects('notify').withArgs('Your user account has been updated');
            });
            //TODO fixt this test
            //it('submits updated user data & shows success notification', function() {
            //    $scope.update();
            //    userMethodUpdateCurrentUserSpy.withArgs({
            //        firstName: $scope.first_name,
            //        lastName: $scope.last_name,
            //        email: $scope.email
            //    }).called.should.be.equal(true);
            //});

            //it('submits updated user data (including password, if it is not empty) & shows success notification', function() {
            //    $scope.password = 'PASSWORD';
            //    $scope.password_rep = 'PASSWORD';
            //    $scope.update();
            //    userMethodUpdateCurrentUserSpy.withArgs({
            //        firstName: $scope.first_name,
            //        lastName: $scope.last_name,
            //        email: $scope.email,
            //        password: $scope.password
            //    }).called.should.be.equal(true);
            //});
        });

        //TODO add test for mismatched passwords
        describe('NEGATIVE CASE', function () {
            var FAILURE_REASON = 'FAILURE REASON';

            beforeEach(function () {
                userMethodUpdateCurrentUserSpy = sinon.spy(function () {
                    return {
                        then: function (callbackPositive, callbackNegative) {
                            callbackNegative(FAILURE_REASON);
                        }
                    };
                });
                userMethodUpdateCurrentUserStub = sinon.stub(mgaUserMethodSrvc, 'updateUser', userMethodUpdateCurrentUserSpy);
                notifierMock.expects('notify').withArgs(FAILURE_REASON);
            });
            //
            //it('submits updated user data & shows failure notification', function() {
            //    $scope.update();
            //    userMethodUpdateCurrentUserSpy.withArgs({
            //        firstName: $scope.first_name,
            //        lastName: $scope.last_name,
            //        email: $scope.email
            //    }).called.should.be.equal(true);
            //});

            //it('submits updated user data (including password, if it is not empty) & shows failure notification', function() {
            //    $scope.password = 'PASSWORD';
            //    $scope.password_rep = 'PASSWORD';
            //    $scope.update();
            //    userMethodUpdateCurrentUserSpy.withArgs({
            //        firstName: $scope.first_name,
            //        lastName: $scope.last_name,
            //        email: $scope.email,
            //        password: $scope.password
            //    }).called.should.be.equal(true);
            //});
        });

        afterEach(function () {
            notifierMock.verify();
            notifierMock.restore();
            userMethodUpdateCurrentUserStub.restore();
        });
    });

    afterEach(function () {
        mgaIdentitySrvc.currentUser = currentUserBackUp;
    });
});
