'use strict';

angular.module('app')
    .controller('nrgiAuthLogsCtrl', function (
        $scope,
        nrgiAuthLogsSrvc,
        nrgiNotifier
    ) {
        var userId, totalPages, ITEMS_PER_PAGE = 20, currentPage = 0;
        $scope.logs = [];

        $scope.loadLogs = function() {
            if(currentPage < totalPages) {
                nrgiAuthLogsSrvc.list(userId, ITEMS_PER_PAGE, currentPage++).then(function (logsResponse) {
                    if(logsResponse.data.error) {
                        nrgiNotifier.error(logsResponse.data.error.message);
                    } else {
                        logsResponse.data.logs.forEach(function(log) {
                            $scope.logs.push(log);
                        });
                    }
                }, function() {
                    nrgiNotifier.error('Auth logs loading failure');
                });
            }
        };

        $scope.$watch('user', function(user) {
            if((user === undefined) || (user._id === undefined)) {
                return;
            }

            userId = user._id;

            nrgiAuthLogsSrvc.getTotalNumber(userId).then(function (logsNumberResponse) {
                if(logsNumberResponse.data.error) {
                    nrgiNotifier.error(logsNumberResponse.data.error.message);
                } else {
                    totalPages = Math.ceil(logsNumberResponse.data.number / ITEMS_PER_PAGE);
                    $scope.loadLogs();
                }
            }, function() {
                nrgiNotifier.error('Auth logs loading failure');
            });
        }, true);
    });
