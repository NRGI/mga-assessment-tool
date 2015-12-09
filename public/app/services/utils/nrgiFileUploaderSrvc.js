'use strict';
angular.module('app')
    .factory('nrgiFileUploaderSrvc', function (FileUploader) {
        return {
            get: function(options) {
                return new FileUploader(options);
            }
        };
    });