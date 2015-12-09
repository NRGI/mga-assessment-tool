'use strict';
var angular;
// contact tech support
angular.module('app').factory('nrgiContactTechSrvc', function ($resource) {
    var ContactResource = $resource('/contact_tech', {}, {});

    return ContactResource;
});
