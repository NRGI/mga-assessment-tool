'use strict';
//var angular;
/*jslint true*/

angular.module('app')
    .controller('nrgiQuestionAdminDetailCtrl', function (
        $scope,
        $route,
        $routeParams,
        $location,
        ngDialog,
        nrgiDialogFactory,
        nrgiIdentitySrvc,
        nrgiNotifier,
        nrgiQuestionSrvc,
        nrgiQuestionMethodSrvc
    ) {
        $scope.question = nrgiQuestionSrvc.get({_id: $routeParams.id});
        $scope.current_user = nrgiIdentitySrvc.currentUser;
        $scope.page_type = 'question';

        $scope.mode_options = [
            {value: 'interview', text: 'Interview'},
            {value: 'desk_research', text: 'Desk Research'},
            {value: 'secondary_source', text: 'Secondary Source'}
        ];

        $scope.type_options = [
            {value: 'text', text: 'Text'},
            {value: 'multi', text: 'Score'},
            {value: 'bool', text: 'Yes/No/Partial'},
            {value: 'perc', text: 'Percentage'},
            {value: 'int', text: 'Integer'},
            {value: 'float', text: 'Decimal'}
        ];

        $scope.theme_options = [
            {value: 'A', text: 'Policy, Legislation, regulation'},
            {value: 'B', text: 'Accountability and Inclusiveness'},
            {value: 'C', text: 'Institutional Capacity and Effectiveness'},
            {value: 'D', text: 'Economic Environment'},
            {value: 'E', text: 'Political Environment'},
            {value: 'M', text: 'Importance of Mining'},
            {value: 'X', text: 'Descriptive Information'}
        ];

        $scope.value_chain_options = [
            {value: '1', text: 'Licenses and Exploration'},
            {value: '2', text: 'Operations and Mine Closure'},
            {value: '3', text: 'Local Impacts'},
            {value: '4', text: 'Taxation & State Participation'},
            {value: '5', text: 'Spending and Revenue Sharing'},
            {value: '6', text: 'Development Planning'}
        ];

        $scope.indicator_options = [
            {text:"Clear and competitive rules of licence allocation",value:"A-1-1"},
            {text:"Openness and transparency of licensing process",value:"B-1-1"},
            {text:"Collecting geological information",value:"C-1-1"},
            {text:"State of mapping and geological exploration",value:"C-1-2"},
            {text:"Mining cadastre effectiveness",value:"C-1-3"},
            {text:"Security of tenure",value:"C-1-4"},
            {text:"Managing licences effectively",value:"C-1-5"},
            {text:"Clarity and consistency of sector rules",value:"A-2-1"},
            {text:"Access to land, compensation and resettlement",value:"B-2-1"},
            {text:"Sector Management",value:"C-2-1"},
            {text:"Intergovernmental coordination",value:"C-2-2"},
            {text:"Policies to mitigate environmental and soclal impacts",value:"A-3-1"},
            {text:"Community impact and consultations",value:"B-3-1"},
            {text:"Human rights and employment equity",value:"B-3-2"},
            {text:"Implementing social and environmental regulation",value:"C-3-1"},
            {text:"Tax policy and instruments",value:"A-4-1"},
            {text:"Accountability of resource taxation, consultative approach to changes",value:"B-4-1"},
            {text:"Mining tax administration",value:"C-4-1"},
            {text:"State owned enterprise (SOE) governance",value:"C-4-3"},
            {text:"Predictable tax terms",value:"E-4-1"},
            {text:"PFM regulation and revenue sharing",value:"A-5-1"},
            {text:"Budget Implementation",value:"C-5-1"},
            {text:"Development planning and special linkages",value:"A-6-1"},
            {text:"Inclusive strategy",value:"B-6-1"},
            {text:"Public investment integrity",value:"B-6-2"},
            {text:"Local content",value:"B-6-3"},
            {text:"Beneficiation (Domestic value added)",value:"C-6-1"},
            {text:"Investment promotion (Diversification)",value:"C-6-2"},
            {text:"Leveraging infrastructure",value:"C-6-3"},
            {text:"Licence allocation and exploration - descriptive information",value:"X-1-0"},
            {text:"Mining rules and legislation - descriptive information",value:"X-2-0"},
            {text:"Environmental and social legislation - descriptive information",value:"X-3-0"},
            {text:"Tax policy - descriptive information",value:"X-4-0"},
            {text:"Spending - descriptive information",value:"X-5-0"},
            {text:"Country development and resource strategy - descriptive information",value:"X-6-0"},
            {text:"Geological prospectivity",value:"M-1-0"},
            {text:"State of mining operations",value:"M-2-0"},
            {text:"Significance of state participation",value:"M-4-2"},
            {text:"Predictable tax terms:",value:"E-4-1"},
            {text:"State equity participation",value:"E-4-2"},
            {text:"Geological prospectivity",value:"M-1-1"},
            {text:"Business and investment environment",value:"D-1-1"},
            {text:"Expropriation risk",value:"E-1-1"},
            {text:"Mining infrastructure",value:"D-2-1"},
            {text:"Political stability",value:"E-2-1"},
            {text:"Skills and human capital",value:"D-2-1"},
            {text:"Lack of violence and social issues",value:"E-2-1"},
            {text:"Stable revenues",value:"D-4-1"},
            {text:"Diversified revenues",value:"D-4-2"},
            {text:"Budget transparency and accountability",value:"B-5-1"},
            {text:"Macroeconomic stability",value:"D-5-1"},
            {text:"Control of corruption",value:"E-5-1"},
            {text:"Economic growth and savings",value:"D-6-1"},
            {text:"Human development",value:"E-6-1"},
            {text:"Employment impact of mining",value:"M-3-0"},
            {text:"Significance of mining revenues",value:"M-4-1"},
            {text:"Budget and subnational impact of mining revenues",value:"M-4-0"},
            {text:"Economic impact of mining",value:"M-5-0"}
        ];
        //TODO fix question reset
        $scope.questionClear = function () {
            $route.reload();
        };
        //TODO fix reording questions---update happens in question controller
        $scope.questionUpdate = function () {
            var new_question_data = $scope.question;

            if (!new_question_data.question_order) {
                nrgiNotifier.error('you must supply question order!');
            } else if (!new_question_data.question_text) {
                nrgiNotifier.error('You must supply question text!');
            } else {
                nrgiQuestionMethodSrvc.updateQuestion(new_question_data).then(function () {
                    $location.path('/admin/question-admin');
                    nrgiNotifier.notify('Question data has been updated');
                }, function (reason) {
                    nrgiNotifier.error(reason);
                });
            }
        };

        //$scope.deleteConfirmDialog = function () {
        //    $scope.value = true;
        //    ngDialog.open({
        //        template: 'partials/dialogs/delete-question-confirmation-dialog',
        //        controller: 'nrgiDeleteQuestionDialogCtrl',
        //        className: 'ngdialog-theme-plain',
        //        scope: $scope
        //    });
        //};
        $scope.deleteConfirmDialog = function () {
            nrgiDialogFactory.questionDelete($scope);
        };
    });