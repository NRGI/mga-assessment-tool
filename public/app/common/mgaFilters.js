'use strict';
//var angular;

// Angular replace filter
angular.module('app').filter('addSpaces', function () {
     return function (text) {
            if (text !== undefined) {
                return text.replace(/[_]/g, ' ');
            }
        };
});