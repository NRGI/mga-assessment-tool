'use strict';
//var angular;
/*jslint newcap: true */

angular.module('app').factory('nrgiDocumentMethodSrvc', function ($q) {
    return {
        updateDocument: function (new_doc_data) {
            var dfd = $q.defer();

            new_doc_data.$update().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }
    };
});