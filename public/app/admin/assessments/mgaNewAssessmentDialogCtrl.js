'use strict';
var angular;
/*jslint unparam: true nomen: true*/

angular.module('app').controller('mgaNewAssessmentDialogCtrl', function ($scope, $location, mgaNotifier, ngDialog, mgaAssessmentMethodSrvc, mgaQuestionSrvc, mgaCountrySrvc, mgaQuestionMethodSrvc, mgaUserListSrvc) {

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
        var newAssessmentData = [],
            newQuestionData = [];

        rgiQuestionSrvc.query({assessment_ID: 'base'}, function (data) {

            $scope.new_assessment.assessment_countries.forEach(function (el, i) {
                newAssessmentData.push({
                    assessment_ID: el.country.iso2 + "-" + String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase(),
                    ISO3: el.country.iso3,
                    year: $scope.new_assessment.year,
                    version: $scope.new_assessment.version,
                    country: el.country.country,
                    questions_unfinalized: data.length,
                    question_length: data.length
                });
            });

            data.forEach(function (el, i) {
                newQuestionData.push({
                    root_question_ID: el._id,
                    year: String($scope.new_assessment.year),
                    version: $scope.new_assessment.version,
                    assessment_ID: String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase(),
                    component: el.component,
                    component_text: el.component_text,
                    indicator_name: el.indicator_name,
                    nrc_precept: el.nrc_precept,
                    old_reference: el.old_reference,
                    question_order: el.question_order,
                    question_choices: [],
                    question_text: el.question_text,
                    section_name: el.section_name,
                    sub_indicator_name: el.sub_indicator_name
                });

                el.question_choices.forEach(function (q_el, j) {
                    newQuestionData[newQuestionData.length - 1].question_choices.push({'criteria': q_el.criteria, 'name': q_el.name, 'order': q_el.order});
                });
            });

            // send to mongo
            rgiAssessmentMethodSrvc.createAssessment(newAssessmentData)
                .then(rgiQuestionMethodSrvc.insertQuestionSet(newQuestionData))
                .then(function () {
                    rgiNotifier.notify('Assessment deployed!');
                    $scope.closeThisDialog();
                    $location.path('/admin/assessment-admin');
                }, function (reason) {
                    rgiNotifier.error(reason);
                });
        });
    };
});