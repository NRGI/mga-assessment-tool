'use strict';
//var angular;
angular.module('app', [
    '720kb.datepicker',
    //'angucomplete',
    'angular.filter',
    'angularFileUpload',
    'angular-redactor',
    //'angular-sanitize',
    'infinite-scroll',
    'ngCsv',
    'ngDialog',
    //'ngPopup',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ng-form-group',
    //'textAngular',
    'ui.bootstrap'
    //require('angular-sanitize'),
    //require('textAngular')
]);

angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        // role checks
        var routeRoleChecks = {
            supervisor: {auth: function (nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeCurrentUserForRoute('supervisor');
            }},
            researcher: {auth: function (nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeCurrentUserForRoute('researcher');
            }},
            reviewer: {auth: function (nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeCurrentUserForRoute('reviewer');
            }},
            user: {auth: function (nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeAuthenticatedUserForRoute();
            }}
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'nrgiMainCtrl'
            })
            .when('/contact', {
                templateUrl: '/partials/main/contact',
                controller: 'nrgiContactTechCtrl'
            })
            // User Account Routes
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'nrgiProfileCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/recover-password', {
                templateUrl: '/partials/account/recover-password',
                controller:  'nrgiRecoverPasswordCtrl'
            })
            .when('/reset-password/:token', {
                templateUrl: '/partials/account/reset-password',
                controller:  'nrgiResetPasswordCtrl'
            })

            ///// Admin Routes
            // USERS
            .when('/admin/user-create', {
                templateUrl: '/partials/admin/users/user-create',
                controller: 'nrgiCreateUserCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin', {
                templateUrl: '/partials/admin/users/user-admin',
                controller: 'nrgiUserAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin-edit/:id', {
                templateUrl: '/partials/admin/users/user-admin-edit',
                controller: 'nrgiUserAdminDetailCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // QUESTIONS
            .when('/admin/question-admin', {
                templateUrl: '/partials/admin/questions/question-admin',
                controller: 'nrgiQuestionAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/question-admin-edit/:id', {
                templateUrl: '/partials/admin/questions/question-admin-edit',
                controller: 'nrgiQuestionAdminDetailCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // ASSESSMENTS
            .when('/admin/assessment-admin', {
                templateUrl: '/partials/admin/assessments/assessment-admin',
                controller: 'nrgiAssessmentAdminCtrl'
            })
            .when('/admin/assessments-admin/:assessment_ID', {
                templateUrl: '/partials/admin/assessments/assessment-admin-detail',
                controller: 'nrgiAssessmentAdminDetailCtrl'
            })
            // ANSWERS
            .when('/admin/assessments-admin/interviews/:assessment_ID', {
                templateUrl: '/partials/admin/answers/interviews-list',
                controller: 'nrgiInterviewsListCtrl'
            })
            .when('/admin/assessments-admin/desk-research/:assessment_ID', {
                templateUrl: '/partials/admin/answers/desk-research-list',
                controller: 'nrgiDeskResearchListCtrl'
            })
            .when('/admin/assessments-admin/secondary-sources/:assessment_ID', {
                templateUrl: '/partials/admin/answers/secondary-sources-list',
                controller: 'nrgiSecondarySourcesListCtrl'
            })
            .when('/admin/assessments-admin/answer/:answer_ID', {
                templateUrl: '/partials/admin/answers/answer-page-edit',
                controller: 'nrgiAnswerCtrl'
            })
            // DOCUMENTS
            .when('/admin/documents-admin', {
                templateUrl: '/partials/admin/documents/document-admin',
                controller: 'nrgiDocumentAdminCtrl'
            })
            .when('/admin/documents-admin/:document_ID', {
                templateUrl: '/partials/admin/documents/document-admin-detail',
                controller: 'nrgiDocumentAdminDetailCtrl'
            })
            // INTERVIEWEES
            .when('/admin/interviewees-admin', {
                templateUrl: '/partials/admin/interviewees/interviewee-admin',
                controller: 'nrgiIntervieweeAdminCtrl'
            })
            .when('/admin/interviewees-admin/:interviewee_ID', {
                templateUrl: '/partials/admin/interviewees/interviewee-admin-detail',
                controller: 'nrgiIntervieweeAdminDetailCtrl'
            });

        // .when('/admin/assessment-admin/subs/:version', {
        //     templateUrl: '/partials/admin/assessments/assessment-admin',
        //     controller:  'rgiAssessmentAdminSubsCtrl',
        //     resolve: routeRoleChecks.supervisor
        // })
        // .when('/admin/assessment-assign/:assessment_ID', {
        //     templateUrl: '/partials/admin/assessments/assessment-admin-assign',
        //     controller:  'rgiAssessmentAdminAssignCtrl',
        //     resolve: routeRoleChecks.supervisor
        // })
        // .when('/admin/assessment-review/:assessment_ID', {
        //     templateUrl: '/partials/admin/assessments/assessment-admin-review',
        //     controller:  'rgiAssessmentAdminReviewCtrl',
        //     resolve: routeRoleChecks.supervisor
        // })
        // // .when('/admin/assessment-review/answer-review-view/:answer_ID', {
        // //     templateUrl: '/partials/admin/assessments/answer-page-view',
        // //     controller:  'rgiAnswerCtrl'
        // // })
        // .when('/admin/assessment-review/answer-review-edit/:answer_ID', {
        //     templateUrl: '/partials/admin/assessments/answer-page-edit',
        //     controller:  'rgiAnswerCtrl'
        // })

        // // Assessment overview routes
        // .when('/assessments', {
        //     templateUrl: '/partials/assessments/assessments-list',
        //     controller:  'rgiAssessmentsListCtrl',
        //     resolve: routeRoleChecks.user
        // })
        // .when('/assessments/:assessment_ID', {
        //     templateUrl: '/partials/assessments/assessment-detail',
        //     controller:  'rgiAssessmentDetailCtrl',
        //     resolve: routeRoleChecks.user
        // })
        // .when('/assessments-review/:assessment_ID', {
        //     templateUrl: '/partials/assessments/assessment-review',
        //     controller:  'rgiAssessmentDetailCtrl',
        //     resolve: routeRoleChecks.user
        // })
        // .when('/assessments/assessment-view/:answer_ID', {
        //     templateUrl: '/partials/assessments/answer-page-view',
        //     controller:  'rgiAnswerCtrl'
        // })
        // .when('/assessments/assessment-edit/:answer_ID', {
        //     templateUrl: '/partials/assessments/answer-page-edit',
        //     controller:  'rgiAnswerCtrl'
        // })
        // .when('/assessment-review/answer-page-review-edit/:answer_ID', {
        //     templateUrl: '/partials/assessments/answer-page-review-edit',
        //     controller:  'rgiAnswerCtrl'
        // });

    });

angular.module('app')
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });