'use strict';
var angular;

// Angular replace filter
angular.module('app').filter('addSpaces', function () {
     return function (text) {
            var str = text.replace(/[_]/g, ' ');
            return str;
        };
});