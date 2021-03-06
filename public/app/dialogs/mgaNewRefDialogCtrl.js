'use strict';
//var angular;

//angular.module('app').controller('rgiNewRefDialogCtrl', function ($scope, $route, ngDialog, rgiNotifier, rgiDocumentSrvc, rgiDocumentMethodSrvc, rgiAnswerMethodSrvc) {
angular.module('app').controller('mgaNewRefDialogCtrl', function ($scope, $route, $http, ngDialog, mgaNotifier, FileUploader, mgaAnswerMethodSrvc) {
    $scope.answer_update = $scope.$parent.answer;
    ////TODO REPLACE WITH EXISITING REFERENCE SET
    //$scope.existing_ref = [
    //    {text: 'Add Document', value: 'document'},
    //    {text: 'Add Webpage', value: 'webpage'},
    //    {text: 'Add Interview', value: 'interview'}
    //];

    function isURLReal(fullyQualifiedURL) {
        var URL = encodeURIComponent(fullyQualifiedURL),
            dfd = $.Deferred(),
            checkURLPromise = $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22' + URL + '%22&format=json');

        checkURLPromise
            .done(function(res) {
                // results should be null if the page 404s or the domain doesn't work
                if (res.query.results) {
                    dfd.resolve(true);
                } else {
                    dfd.reject(false);
                }
            })
            .fail(function () {
                dfd.reject('failed');
            });
        return dfd.promise();
    }

    //DATEPICKER OPTS
    $scope.date_format = 'MMMM d, yyyy';
    var today = new Date();
    $scope.date_default = today;
    $scope.date_max_limit = today;

    var uploader = $scope.uploader = new FileUploader({
        isHTML5: true,
        withCredentials: true,
        url: 'file-upload'
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 1;
        }
    });
    //TODO handle doc and txt documents
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        if (status === 400) {
            $scope.uploader.queue = [];
            rgiNotifier.error(response.reason);
        } else {// TODO add cancel upload after initial document pass
            $scope.new_document = response;

            $scope.uploader.queue = [];

            $scope.value = true;
            var scope = $scope.$parent;
            scope.new_document = $scope.new_document;
            ngDialog.close('ngdialog1');
            ngDialog.open({
                template: 'partials/dialogs/new-document-dialog',
                controller: 'mgaNewDocumentDialogCtrl',
                className: 'ngdialog-theme-default',
                scope: scope
            });
        }

    };

    $scope.webRefSubmit = function (current_user) {
        var new_answer_data = $scope.answer_update,
            current_user = $scope.$parent.current_user,
            url, access_date;

        if(!new_answer_data.web_ref_url || !new_answer_data.web_ref_title) {
            mgaNotifier.error('You must enter a title and a url!')
        } else {
            if (new_answer_data.web_ref_url.split('://')[0] === 'http' || new_answer_data.web_ref_url.split('://')[0] === 'https') {
                url = new_answer_data.web_ref_url;
            } else {
                url = 'http://' + new_answer_data.web_ref_url;
            }
            if(!new_answer_data.web_ref_access_date) {
                access_date = $scope.date_default.toISOString();
            } else {
                access_date = new Date(new_answer_data.web_ref_access_date).toISOString();
            }
            isURLReal(url)
                .fail(function (res) {
                    rgiNotifier.error('Website does not exists');
                })
                //TODO Take a snapshot of url and add as a document ref
                .done(function (res) {
                    var new_ref_data = {
                        title: new_answer_data.web_ref_title,
                        URL: url,
                        access_date: access_date,
                        comment: {
                            date: new Date().toISOString(),
                            author: current_user._id,
                            author_name: current_user.firstName + ' ' + current_user.lastName,
                            role: current_user.role
                        }
                    };
                    if ($scope.answer_update.web_ref_comment !== undefined) {
                        new_ref_data.comment.content = $scope.answer_update.web_ref_comment;
                    }
                    new_answer_data.references.web.push(new_ref_data);

                    mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
                        $scope.closeThisDialog();
                        mgaNotifier.notify('Reference added!');
                        $route.reload();
                    }, function (reason) {
                        mgaNotifier.error(reason);
                    });
                });
        }
    };

    $scope.humanRefSubmit = function (current_user) {

        var new_answer_data = $scope.answer_update,
            current_user = $scope.$parent.current_user,
            new_ref_data, contact_date;


        if (!new_answer_data.human_ref_first_name || !new_answer_data.human_ref_first_name) {
            mgaNotifier.error('You must enter an interviewee first and last name!')
        } else if (!new_answer_data.human_ref_email) {
            mgaNotifier.error('You must enter a valid email address!')
        } else {
            var email_domain = 'http://' + new_answer_data.human_ref_email.split('@')[1];
            if (email_domain === 'http://undefined') {
                mgaNotifier.error('You must enter a valid email address!');
            } else {
                if(!new_answer_data.human_ref_contact_date) {
                    contact_date = $scope.date_default.toISOString();
                } else {
                    contact_date = new Date(new_answer_data.human_ref_contact_date).toISOString();
                }
                new_ref_data = {
                    first_name: new_answer_data.human_ref_first_name,
                    last_name: new_answer_data.human_ref_last_name,
                    phone: new_answer_data.human_ref_phone,
                    email: new_answer_data.human_ref_email,
                    contact_date: contact_date,
                    comment: {
                        date: new Date().toISOString(),
                        author: current_user._id,
                        author_name: current_user.firstName + ' ' + current_user.lastName,
                        role: current_user.role
                    }
                };

                if (new_answer_data.human_ref_comment !== undefined) {
                    new_ref_data.comment.content = new_answer_data.human_ref_comment;
                }

                new_answer_data.references.human.push(new_ref_data);

                mgaAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
                    $scope.closeThisDialog();
                    mgaNotifier.notify('Reference added!');
                    $route.reload();
                }, function (reason) {
                    mgaNotifier.error(reason);
                });
            }
        }
        //
        ////TODO validate that email domain exists
        //if (email_domain === 'http://undefined') {
        //    rgiNotifier.error('You must enter a valid email address!')
        //} else {
        //    //isURLReal(email_domain)
        //    //    .fail(function (res) {
        //    //        console.log(res);
        //    //        rgiNotifier.error('Email Domain does not appear to be valid');
        //    //    })
        //    //    .done(function (res) {
        //    //        console.log(res);
        //    //    });
        //
        //}
    };

    $scope.closeDialog = function () {
        $scope.$parent.ref_selection = '';
        ngDialog.close();
    };
});



