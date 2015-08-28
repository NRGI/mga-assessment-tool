'use strict';
//var angular;

angular.module('app').factory('mgaContactMethodSrvc', function ($q, mgaContactTechSrvc) {
    return {
        contact: function (contactInfo) {
            var new_contact = new mgaContactTechSrvc(contactInfo),
                dfd = $q.defer();

            new_contact.$save().then(function () {
                dfd.resolve();
            }, function (res) {
                dfd.reject(res.data.reason);
            });

            return dfd.promise;
        }
    };
});
