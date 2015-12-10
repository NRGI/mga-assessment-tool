'use strict';

angular.module('app')
    .factory('nrgiAuthLogsSrvc', function (nrgiRequestSubmitterSrvc) {
        return {
            getTotalNumber: function(userId) {
                return nrgiRequestSubmitterSrvc.get('/api/auth-logs/number/' + userId);
            },
            list: function(userId, itemsPerPage, page) {
                return nrgiRequestSubmitterSrvc.get('/api/auth-logs/list/' + userId + '/' + itemsPerPage + '/' + page);
            },
            getMostRecent: function(userId, action) {
                return nrgiRequestSubmitterSrvc.get('/api/auth-logs/recent/' + userId + '/' + action);
            }
        };
    });