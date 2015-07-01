'use strict';
/*jslint nomen: true newcap: true */
var describe, beforeEach, it, inject, expect;

describe('mgaUserSrvcSpec', function () {
    beforeEach(module('app'));

    describe('isSupervisor', function () {
        it('should return false if the role is not a supervisor entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'not supervisor';
            expect(user.isSupervisor()).to.be.false;
        }));

        it('should return true if the role is a supervisor entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'supervisor';
            expect(user.isSupervisor()).to.be.true;
        }));
    });

    describe('isResearcher', function () {
        it('should return false if the role is not a researcher entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'not researcher';
            expect(user.isResearcher()).to.be.falsey;
        }));

        it('should return true if the role is a researcher entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'researcher';
            expect(user.isResearcher()).to.be.true;
        }));
    });

    describe('isReviewer', function () {
        it('should return false if the role is not a reviewer entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'not reviewer';
            expect(user.isReviewer()).to.be.falsey;
        }));

        it('should return true if the role is a reviewer entry', inject(function (mgaUserSrvc) {
            var user = new mgaUserSrvc();
            user.role = 'reviewer';
            expect(user.isReviewer()).to.be.true;
        }));
    });
});