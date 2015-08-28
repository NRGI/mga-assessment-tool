'use strict';
var angular;
// contact tech support
angular.module('app').factory('mgaContactTechSrvc', function ($resource) {
    var ContactResource = $resource('/contact_tech', {}, {});

    return ContactResource;
});
