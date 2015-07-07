'use strict';
//var angular;

// query assessments or get assessments by id
angular.module('app').factory('mgaCountrySrvc', function ($resource) {
    var CountryResource = $resource('/api/countries/:country_ID', {country_ID: '@country_ID'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CountryResource;
});