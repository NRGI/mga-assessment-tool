'use strict';

angular.module('app')
    .controller('nrgiNewRefDialogCtrl', function (
        $q,
        $scope,
        $route,
        $timeout,
        $http,
        FileUploader,
        ngDialog,
        nrgiAnswerMethodSrvc,
        nrgiAssessmentSrvc,
        nrgiDialogFactory,
        nrgiFileUploaderSrvc,
        nrgiIntervieweeSrvc,
        nrgiIntervieweeMethodSrvc,
        nrgiNotifier,
        nrgiRequestSubmitterSrvc,
        nrgiUtilsSrvc
        //rgiUrlCheckSrvc,
    ) {
        /////////////
        //INTERVIEWEE
        /////////////
        $scope.role_opts = [
            {text: 'Government', value: 'government'},
            {text: 'CSO', value: 'cso'},
            {text: 'Industry', value: 'industry'},
            {text: 'Expert', value: 'expert'},
            {text: 'Other', value: 'other'}];
        $scope.salutation_opts = ['mr.', 'mrs.', 'ms.'];
        //Datepicker opts
        var today = new Date();
        $scope.date_default = today;
        $scope.date_max_limit = today;
        $scope.date_options = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.date_formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.date_format = $scope.date_formats[0];
        $scope.status = {
            opened: false
        };
        $scope.calendarOpen = function ($event) {
            $scope.status.opened = true;
        };

        $scope.answer_update = $scope.$parent.answer;
        $scope.interviewee_list = [];
        //nrgiIntervieweeSrvc.get({assessment_ID: 'DZ-2015-PI'}, function (interviewees) {
        nrgiIntervieweeSrvc.query({}, function (interviewees) {
            interviewees.forEach(function (interviewee) {
                var interviewee_add = {
                    firstName: interviewee.firstName,
                    lastName: interviewee.lastName,
                    id: interviewee._id,
                    assessments: interviewee.assessments,
                    email: interviewee.email,
                    assessment_countries: []
                };
                interviewee.assessments.forEach(function (assessment_ID) {
                    console.log(assessment_ID);
                    nrgiAssessmentSrvc.get({assessment_ID: assessment_ID}, function (assessment) {
                        interviewee_add.assessment_countries.push(assessment.country);
                    });
                });
                $scope.interviewee_list.push(interviewee_add);
            });
        });

        $scope.intervieweeSelect = function (selection) {
            $scope.interviewee_selection = selection;
        };

        $scope.interviewRefSubmit = function (selected_interviewee) {
            var new_answer_data, contact_date, email_domain, new_ref_data, current_user, selected_interviewee_ID;
            new_answer_data = $scope.answer_update;
            current_user = $scope.current_user;
            //error handling
            if (!new_answer_data.human_ref_comment) {
                nrgiNotifier.error('You must enter interview content!');
            } else if (!new_answer_data.human_ref_contact_date) {
                nrgiNotifier.error('You must enter interview date!');
            } else if (!selected_interviewee) {
                nrgiNotifier.error('You must select an existing contact or create a new one!');
            } else {
                contact_date = new Date(new_answer_data.human_ref_contact_date).toISOString();

                if ($scope.interviewee_selection==='new') {
                    if (!selected_interviewee.firstName || !selected_interviewee.lastName) {
                        nrgiNotifier.error('You must enter a first and last name for new interviewees!');
                    } else if (!selected_interviewee.role) {
                        nrgiNotifier.error('You must select a role for new interviewees!');
                    } else {
                        if (!selected_interviewee.email) {
                            nrgiNotifier.error('You must enter a valid email address!');
                        } else {
                            email_domain = 'http://' + selected_interviewee.email.split('@')[1];
                            if (email_domain === 'http://undefined') {
                                nrgiNotifier.error('You must enter a valid email address!');
                            } else {
                                selected_interviewee.answers = [new_answer_data.answer_ID];
                                selected_interviewee.assessments = [new_answer_data.assessment_ID];
                                selected_interviewee.questions = [new_answer_data.question_ID];
                                selected_interviewee.users = [current_user._id];
                                nrgiIntervieweeMethodSrvc.createInterviewee(selected_interviewee)
                                    .then(function (interviewee) {
                                        new_ref_data = {
                                            interviewee_ID: interviewee._id,
                                            contact_date: contact_date,
                                            comment: new_answer_data.human_ref_comment,
                                            author: current_user._id,
                                            author_name: current_user.firstName + ' ' + current_user.lastName,
                                            author_role: current_user.role
                                        };
                                        new_answer_data.references.human.push(new_ref_data);
                                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data);
                                    })
                                    .then(function () {
                                        $scope.closeThisDialog();
                                        nrgiNotifier.notify('Reference added');
                                        $route.reload();
                                    }, function (reason) {
                                        nrgiNotifier.notify(reason);
                                    });
                            }
                        }
                    }
                } else if ($scope.interviewee_selection==='existing') {
                    selected_interviewee_ID = selected_interviewee.originalObject.id;
                    new_ref_data = {
                        interviewee_ID: selected_interviewee_ID,
                        contact_date: contact_date,
                        comment: new_answer_data.human_ref_comment,
                        author: current_user._id,
                        author_name: current_user.firstName + ' ' + current_user.lastName,
                        author_role: current_user.role
                    };
                    new_answer_data.references.human.push(new_ref_data);

                    nrgiIntervieweeSrvc.get({_id: selected_interviewee_ID}, function (interviewee) {
                        ['answer', 'assessment', 'question'].forEach(function (el) {
                            if (interviewee[el+'s'] !== undefined && interviewee[el+'s'].indexOf(new_answer_data[el+'_ID']) < 0) {
                                interviewee[el+'s'].push(new_answer_data[el+'_ID']);
                            } else if (interviewee[el+'s'] === undefined) {
                                interviewee[el+'s'] = [new_answer_data[el+'_ID']];
                            }
                        });
                        if (interviewee.users !== undefined && interviewee.users.indexOf(current_user._id) < 0) {
                            interviewee.users.push(current_user._id);
                        } else if (interviewee.users === undefined) {
                            interviewee.users = [current_user._id];
                        }
                        nrgiAnswerMethodSrvc.updateAnswer(new_answer_data).then(function () {
                            nrgiIntervieweeMethodSrvc.updateInterviewee(interviewee);
                            $scope.closeThisDialog();
                            nrgiNotifier.notify('Reference added!');
                            $route.reload();
                        }, function (reason) {
                            nrgiNotifier.error(reason);
                        });
                    });
                } else {
                    nrgiNotifier.error('Something happened assigning interviewees!');
                }
            }
        };

        $scope.closeDialog = function () {
            $scope.$parent.ref_selection = '';
            ngDialog.close();
        };


        ///////////////
        //FILE UPLOAD
        ///////////////
        //$scope.fileUrl = '';
        $scope.fileUploading = false;
        $scope.answer_update = $scope.$parent.answer;
        var uploader = $scope.uploader = nrgiFileUploaderSrvc.get({
            isHTML5: true,
            withCredentials: true,
            url: 'file-upload'
        });
        uploader.filters.push({
            name: 'customFilter',
            //fn: function () {
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1;
            }
        });
        ////TODO handle doc and txt documents
        uploader.onCompleteItem = function (fileItem, response, status) {
            $scope.uploader.queue = [];
            if (status === 400) {
                nrgiNotifier.error(response.reason);
            } else {// TODO add cancel upload after initial document pass
                $scope.new_document = response;
                $scope.value = true;
                var scope = $scope.$parent;
                scope.new_document = $scope.new_document;
                //nrgiDialogFactory[scope.ref_selection + 'Create']($scope);
                if (scope.ref_selection === 'document') {
                    nrgiDialogFactory.documentCreate(scope);
                } else if (scope.ref_selection === 'webpage') {
                    nrgiDialogFactory.webpageCreate(scope);
                }
            }
        };
        $scope.uploadFileByUrl = function (fileUrl) {
            var handleFileUploadStatus = function (responseStatus) {
                $scope.uploader.queue[$scope.uploader.queue.length - 1].progress = responseStatus.data.completion * 100;

                if (responseStatus.data.completion < 1) {
                    $timeout(function () {
                        nrgiRequestSubmitterSrvc.get('/api/remote-file/upload-progress/' + responseStatus.data._id).then(handleFileUploadStatus);
                    }, 1000);
                } else {
                    nrgiRequestSubmitterSrvc.get('/api/remote-file/document/' + responseStatus.data._id).then(function (responseDocument) {
                        $scope.fileUploading = false;
                        uploader.onCompleteItem({}, responseDocument.data, responseDocument.status);
                    });
                }
            };

            $scope.fileUploading = true;


            nrgiRequestSubmitterSrvc.get('/api/remote-file-upload?url=' + encodeURIComponent(fileUrl)).then(function (response) {
                if (response.data.reason) {
                    $scope.fileUploading = false;
                    nrgiNotifier.error('The file cannot be uploaded');
                } else {
                    $scope.uploader.queue.push({
                        file: {
                            name: fileUrl.split('/')[fileUrl.split('/').length - 1],
                            size: response.data.size
                        },
                        isUploading: true,
                        progress: response.data.completion * 100
                    });
                    handleFileUploadStatus(response);
                }
            });
        };
    });