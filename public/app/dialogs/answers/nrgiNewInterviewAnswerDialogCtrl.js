angular.module('app')
    .controller('nrgiNewInterviewAnswerDialogCtrl', function (
        $scope,
        $route,
        nrgiAssessmentSrvc,
        nrgiAnswerMethodSrvc,
        nrgiIdentitySrvc,
        nrgiIntervieweeSrvc,
        nrgiIntervieweeMethodSrvc,
        nrgiNotifier
        //$location,
        //$timeout,
        //ngDialog,
        //nrgiAnswerMethodSrvc,
        //nrgiNotifier
    ) {
        var timestamp = new Date();

        $scope.role_opts = [
            {text: 'Government', value: 'government'},
            {text: 'CSO', value: 'cso'},
            {text: 'Industry', value: 'industry'},
            {text: 'Expert', value: 'expert'},
            {text: 'Other', value: 'other'}];
        $scope.salutation_opts = ['mr.', 'mrs.', 'ms.'];
        //Datepicker opts
        $scope.date_default = timestamp;
        $scope.date_max_limit = timestamp;
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

        $scope.answer_update = $scope.$parent.$parent.answer;
        $scope.new_interview_answer = {interview_date: timestamp};

        $scope.interviewee_list = [];
        nrgiIntervieweeSrvc.query({assessments: $scope.answer_update.assessment_ID}, function (interviewees) {
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

        $scope.interviewSubmit = function (selected_interviewee) {
            var new_interview_answer = $scope.new_interview_answer,
                new_answer_data = $scope.answer_update,
                current_user = nrgiIdentitySrvc.currentUser;

            if (!new_interview_answer.interview_text) {
                nrgiNotifier.error('You must enter interview content!');
            } else if (!new_interview_answer.interview_date) {
                nrgiNotifier.error('You must enter interview date!');
            } else if (!new_interview_answer.score && answer_update.question_data_type!=='text') {
                nrgiNotifier.error('You must select an a score!');
            } else {
                new_interview_answer.interview_date = new Date(new_interview_answer.interview_date).toISOString();
                switch ($scope.interviewee_selection) {
                    case 'new':
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
                                    selected_interviewee.questions = [new_answer_data.root_question_ID];
                                    selected_interviewee.users = [current_user._id];

                                    nrgiIntervieweeMethodSrvc.createInterviewee(selected_interviewee)
                                        .then(function (interviewee) {
                                            new_interview_answer.interviewee_ID = interviewee._id;
                                            new_interview_answer.option_order = new_interview_answer.score.option_order;
                                            new_interview_answer.option_text = new_interview_answer.score.option_text;
                                            new_interview_answer.value = new_interview_answer.score.value;
                                            new_answer_data.interview_score.push(new_interview_answer);
                                            nrgiAnswerMethodSrvc.updateAnswer(new_answer_data);
                                        })
                                        .then(function () {
                                            $scope.closeThisDialog();
                                            nrgiNotifier.notify('Interview added');
                                            $route.reload();
                                        }, function (reason) {
                                            nrgiNotifier.notify(reason);
                                        });
                                }
                            }
                        }



                        break;
                    case 'existing':
                        if (!selected_interviewee) {
                            nrgiNotifier.error('You must select an interviewee or create a new one!');
                        } else {
                            new_interview_answer.interviewee_ID = selected_interviewee.originalObject.id;
                            new_interview_answer.option_order = new_interview_answer.score.option_order;
                            new_interview_answer.option_text = new_interview_answer.score.option_text;
                            new_interview_answer.value = new_interview_answer.score.value;
                            new_answer_data.interview_score.push(new_interview_answer);

                            nrgiIntervieweeSrvc.get({_id: selected_interviewee.originalObject.id}, function (interviewee) {
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
                        }
                        break;
                }
            }



            //$scope.answer_update.interview_score.push(new_interview_score);
            //interviewScoreSchema = new Schema({
            //    interviewee_ID: ObjectId,
            //});
        };

    });