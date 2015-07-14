'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('mgaNewAssessmentDialogCtrl', function ($scope, $route, $location, mgaNotifier, ngDialog, mgaAssessmentMethodSrvc, mgaQuestionSrvc, mgaCountrySrvc, mgaAnswerMethodSrvc) {

    function zeroFill(number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array( width + (/\./.test(number) ? 2 : 1) ).join('0') + number;
        }
        return number + ""; // always return a string
    }

    $scope.assessments = [];
    $scope.$parent.assessments.forEach(function (el) {
        $scope.assessments.push(el.assessment_ID);

    });


    $scope.new_assessment = {
        year: "",
        assessment_country: {}
    };
    $scope.countries = mgaCountrySrvc.query();

    var cur_year = new Date().getFullYear(),
        years = [],
        i;

    for (i = 0; i < 6; i += 1) {
        years.push(cur_year + i);
    }

    $scope.years = years;

    $scope.closeDialog = function () {
        ngDialog.close();
    };
    $scope.assessmentDeploy = function () {
        if ($scope.assessments.indexOf($scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year)) > -1) {
            mgaNotifier.error('Assessment already exists!');
        } else {
            var new_assessment_data = [],
                new_answer_data = [],
                timestamp = new Date().toISOString(),
                desk_research_set_length = 0,
                interview_set_length = 0;

            mgaQuestionSrvc.query({assessment_ID: 'base'}, function (data) {

                data.forEach(function (el) {
                    new_answer_data.push({
                        root_question_ID: el._id,
                        answer_ID: $scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year) + '-' + String(zeroFill(el.question_flow_order, 3)),
                        year: String($scope.new_assessment.year),
                        assessment_ID: $scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year),
                        country: $scope.new_assessment.assessment_country.country,
                        status: 'created',
                        question_text: el.question_text,
                        question_secondary_source: el.question_secondary_source,
                        question_mode: el.question_mode,
                        question_data_type: el.question_data_type,
                        question_order: el.question_order,
                        question_flow_order: el.question_flow_order,
                        question_indicator: el.question_indicator,
                        question_indicator_ID: el.question_indicator_ID,
                        question_theme_ID: el.question_theme_ID,
                        question_value_chain_ID: el.question_value_chain_ID,
                        answer_text: "",
                        answer_options: [],
                        modified: [{
                            modifiedBy: $scope.$parent.identity.currentUser._id,
                            modifiedDate: timestamp
                        }]
                    });

                    if (el.question_mode === 'desk_research') {
                        desk_research_set_length += 1;
                    }
                    if (el.question_mode === 'interview') {
                        interview_set_length += 1;
                    }
                    switch (el.question_data_type) {
                        case "bool":
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 1,
                                option_text: 'Yes',
                                value: 4
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 2,
                                option_text: 'Partial',
                                value: 2.5
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 3,
                                option_text: 'No',
                                value: 1
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 4,
                                option_text: 'N/A',
                                value: 0
                            });
                            break;
                        case "multi":
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 1,
                                option_text: 'high',
                                value: 4
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 2,
                                option_text: 'above average',
                                value: 3
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 3,
                                option_text: 'below average',
                                value: 2
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 4,
                                option_text: 'low',
                                value: 1
                            });
                            new_answer_data[new_answer_data.length - 1]['answer_options'].push({
                                option_order: 5,
                                option_text: 'N/A',
                                value: 0
                            });
                            break;
                    }
                });
                new_assessment_data.push({
                    assessment_ID: $scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year),
                    ISO3: $scope.new_assessment.assessment_country.country_ID,
                    country: $scope.new_assessment.assessment_country.country,
                    year: $scope.new_assessment.year,
                    status: 'created',
                    questions_flagged: 0,
                    questions_unfinalized: data.length,
                    question_length: data.length,
                    desk_research_set_length: desk_research_set_length,
                    interview_set_length: interview_set_length,
                    modified: [{
                        modified_by: $scope.$parent.identity.currentUser._id,
                        modified_date: timestamp
                    }],
                    create_date: {
                        created_by: $scope.$parent.identity.currentUser._id,
                        date: timestamp
                    }
                });
                //send to mongo
                mgaAssessmentMethodSrvc.createAssessment(new_assessment_data)
                    .then(mgaAnswerMethodSrvc.insertAnswerSet(new_answer_data))
                    .then(function () {
                        mgaNotifier.notify('Assessment deployed!');
                        new_assessment_data = undefined;
                        new_answer_data = undefined;
                        $scope.closeThisDialog();
                        $route.reload();
                    }, function (reason) {
                        mgaNotifier.error(reason);
                    });

            });
        }
    };
});
