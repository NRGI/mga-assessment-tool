'use strict';
var angular, toastr;
// var angular;

angular.module('app').value('mgaToastr', toastr);

angular.module('app').factory('mgaNotifier', function (mgaToastr) {
    return {
        notify: function (msg) {
            mgaToastr.success(msg);
            console.log(msg);
        },
        error: function (msg) {
            mgaToastr.error(msg);
            console.log(msg);
        }
    };
});