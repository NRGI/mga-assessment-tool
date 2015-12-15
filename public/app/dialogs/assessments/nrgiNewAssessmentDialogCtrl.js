'use strict';
/*jslint unparam: true nomen: true*/
//var angular;

angular.module('app').controller('nrgiNewAssessmentDialogCtrl', function ($scope, $route, $location, nrgiNotifier, ngDialog, nrgiAssessmentMethodSrvc, nrgiQuestionSrvc, nrgiCountrySrvc, nrgiAnswerMethodSrvc) {

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
    $scope.countries = nrgiCountrySrvc.query();

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
            nrgiNotifier.error('Assessment already exists!');
        } else {
            var new_assessment_data = [],
                new_answer_data = [],
                timestamp = new Date().toISOString(),
                desk_research_set_length = 0,
                interview_set_length = 0;

            nrgiQuestionSrvc.query({assessment_ID: 'base'}, function (data) {

                data.forEach(function (el) {
                    new_answer_data.push({
                        answer_ID: $scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year) + '-' + String(zeroFill(el.question_flow_order, 3)),
                        assessment_ID: $scope.new_assessment.assessment_country.iso2 + '-' + String($scope.new_assessment.year),
                        country: $scope.new_assessment.assessment_country.country,
                        year: String($scope.new_assessment.year),
                        question_order: el.question_order,
                        question_flow_order: el.question_flow_order,
                        question_text: el.question_text,
                        question_secondary_source: el.question_secondary_source,
                        question_mode: el.question_mode,
                        question_data_type: el.question_data_type,
                        question_indicator: el.question_indicator,
                        question_indicator_ID: el.question_indicator_ID,
                        question_theme_ID: el.question_theme_ID,
                        question_value_chain_ID: el.question_value_chain_ID,
                        root_question_ID: el._id,
                        status: 'created',
                        answer_text: "",
                        answer_options: [],
                        answer_score: {},
                        last_modified: {
                            modified_by: $scope.$parent.identity.currentUser._id,
                            modified_date: timestamp}

                    });


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
                        case "score":
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
                    last_modified: {
                        modified_by: $scope.$parent.identity.currentUser._id,
                        modified_date: timestamp},
                    create_date: {
                        created_by: $scope.$parent.identity.currentUser._id,
                        date: timestamp
                    },
                    users: [],
                    documents: [],
                    interviewees: []
                });
                //send to mongo
                nrgiAssessmentMethodSrvc.createAssessment(new_assessment_data)
                    .then(nrgiAnswerMethodSrvc.insertAnswerSet(new_answer_data))
                    .then(function () {
                        nrgiNotifier.notify('Assessment deployed!');
                        new_assessment_data = undefined;
                        new_answer_data = undefined;
                        $scope.closeThisDialog();
                        $route.reload();
                    }, function (reason) {
                        nrgiNotifier.error(reason);
                    });
            });
        }
    };
});


//'use strict';
//
//angular
//    .module('app')
//    .controller('rgiNewAssessmentDialogCtrl', function (
//        $scope,
//        $route,
//        $location,
//        rgiNotifier,
//        ngDialog,
//        rgiAssessmentMethodSrvc,
//        rgiQuestionSrvc,
//        rgiQuestionMethodSrvc,
//        rgiCountrySrvc
//    ) {
//        $scope.countries = rgiCountrySrvc.query({country_use: true});
//        //TODO
//        //rgiCountrySrvc.query({}, function (countries) {
//        //    var country_values = {},
//        //        country_selector = [];
//        //
//        //    countries.forEach(function (el) {
//        //        var add_obj = {value: el.iso2, name: el.country};
//        //        country_values[el.iso2] = el;
//        //        country_values[el.iso2].index = country_selector.length;
//        //        country_selector.push(add_obj);
//        //    });
//        //    $scope.country_values = country_values;
//        //    $scope.country_selector = country_selector;
//        //});
//
//        $scope.new_assessment = {
//            year: "",
//            version: "",
//            assessment_countries: [{}]
//        };
//
//        var cur_year = new Date().getFullYear(),
//            years = [],
//            i;
//
//        for (i = 0; i < 6; i += 1) {
//            years.push(cur_year + i);
//        }
//
//        $scope.years = years;
//
//        $scope.closeDialog = function () {
//            ngDialog.close();
//        };
//        // TODO remove country from countries scope when added to new assessments
//        $scope.countryAdd = function (country_pop) {
//            $scope.new_assessment.assessment_countries.push({country: ""});
//            //var country_id = $scope.new_assessment.assessment_countries[$scope.new_assessment.assessment_countries.length - 2].country.iso2,
//            //    country_array = $scope.countries;
//            //
//            //for (var i = 0; i < country_array.length; i++) {
//            //    console.log(country_array[i].iso2);
//            ////    //if(country_array[i].iso2 == country_id) {
//            ////    //    country_array.splice(i, 1);
//            ////    //    break;
//            ////    //}
//            //}
//        };
//
//        $scope.countryDelete = function (index) {
//            $scope.new_assessment.assessment_countries.splice(index, 1);
//        };
//        $scope.assessmentDeploy = function () {
//            var new_assessment_data = [],
//                new_question_data = [];
//            rgiQuestionSrvc.query({assessment_ID: String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase()}, function (d) {
//                if (d.length > 0) {
//                    rgiNotifier.error('Assessment already deployed');
//                } else {
//                    rgiQuestionSrvc.query({assessment_ID: 'base'}, function (base_questions) {
//
//                        $scope.new_assessment.assessment_countries.forEach(function (assessment_country) {
//                            new_assessment_data.push({
//                                assessment_ID: assessment_country.country.iso2 + "-" + String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase(),
//                                ISO3: assessment_country.country.country_ID,
//                                year: $scope.new_assessment.year,
//                                version: $scope.new_assessment.version,
//                                country: assessment_country.country.country
//                            });
//                        });
//
//                        base_questions.forEach(function (question) {
//                            new_question_data.push({
//                                year: String($scope.new_assessment.year),
//                                version: $scope.new_assessment.version,
//                                root_question_ID: question._id,
//                                assessment_ID: String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase(),
//                                question_use: question.question_use,
//                                question_order: question.question_order,
//                                question_label: question.question_label,
//                                qid: question.qid,
//                                precept: question.precept,
//                                component: question.component,
//                                component_text: question.component_text,
//                                indicator: question.indicator,
//                                dejure: question.dejure,
//                                question_text: question.question_text,
//                                question_criteria: question.question_criteria,
//                                question_norm: question.question_norm,
//                                question_dependancies: question.question_dependancies,
//                                question_guidance_text: question.question_guidance_text,
//                                mapping_2013: question.mapping_2013,
//                                mapping_external: question.mapping_external
//                            });
//                        });
//
//                        // send to mongo
//                        rgiAssessmentMethodSrvc.createAssessment(new_assessment_data)
//                            .then(rgiQuestionMethodSrvc.insertQuestionSet(new_question_data))
//                            .then(function () {
//                                rgiNotifier.notify('Assessment deployed!');
//                                $scope.closeThisDialog();
//                                $route.reload();
//                                $location.path('admin/assessment-admin');
//                            }, function (reason) {
//                                rgiNotifier.error(reason);
//                            });
//                    });
//                }
//            });
//        };
//    });