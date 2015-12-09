'use strict';
//var angular;
/*jslint nomen: true newcap: true unparam: true*/

angular.module('app').controller('nrgiNewQuestionDialogCtrl', function ($scope, $location, ngDialog, mgaQuestionMethodSrvc, nrgiNotifier) {
    //$scope.questionDelete = function () {
    //    var question_deletion = $scope.$parent.question._id;
    //
    //    mgaQuestionMethodSrvc.deleteUser(question_deletion).then(function () {
    //        $scope.closeThisDialog();
    //        $location.path('/admin/question-admin');
    //        nrgiNotifier.notify('Question has been deleted');
    //    }, function (reason) {
    //        nrgiNotifier.error(reason);
    //    });
    //};
    //
    $scope.closeDialog = function () {
        ngDialog.close();
    };
    //TODO ADD new question functionality
});

// angular.module('app').controller('questionDialogCtrl', function ($scope, ngDialog) {

//     $scope.new_question = {
//         question_order: $scope.questions.length + 1,
//         question_text: "Enter text",
//         question_choices: [{order: 1, criteria: "Enter text"}]
//     };
//     $scope.new_question.question_choices = [{order: 1, criteria: "Enter text"}];
//     $scope.dialogModel = {
//         message : 'message from passed scope'
//     };
//     $scope.closeDialog = function () {
//         ngDialog.close();
//     };

//     $scope.questionOptionAdd = function () {
//         $scope.new_question.question_choices.push({order: $scope.new_question.question_choices.length + 1, criteria: "Enter text"});
//     };

//     $scope.questionOptionDelete = function (index) {
//         $scope.new_question.question_choices.splice(index, 1);
//         // var i;
//         $scope.new_question.question_choices.forEach(function (el, i) {
//             el.order = i + 1;
//         });
//     };
//     $scope.questionCreate = function () {
//         console.log('yes');
//         // data.forEach(function (el, i) {
//         //     newQuestionData.push({
//         //         root_QID: el._id,
//         //         assessment_ID: String($scope.new_assessment.year) + "-" + $scope.new_assessment.version.slice(0, 2).toUpperCase(),
//         //         component: el.component,
//         //         component_text: el.component_text,
//         //         indicator_name: el.indicator_name,
//         //         nrc_precept: el.nrc_precept,
//         //         old_reference: el.old_reference,
//         //         question_order: el.question_order,
//         //         question_choices: [],
//         //         question_text: el.question_text,
//         //         section_name: el.section_name,
//         //         sub_indicator_name: el.sub_indicator_name
//         //     });

//         //     el.question_choices.forEach(function (q_el, j) {
//         //         newQuestionData[newQuestionData.length - 1].question_choices.push({'criteria': q_el.criteria, 'name': q_el.name, 'order': q_el.order});
//         //     });
//         // });

//         // // send to mongo
//         // rgiAssessmentMethodSrvc.createAssessment(newAssessmentData)
//         //     .then(rgiQuestionMethodSrvc.insertQuestionSet(newQuestionData))
//         //     .then(function () {
//         //         rgiNotifier.notify('Assessment deployed!');
//         //         $location.path('/admin/assessment-admin');
//         //     }, function (reason) {
//         //         rgiNotifier.error(reason);
//         //     });
//     };
// });
