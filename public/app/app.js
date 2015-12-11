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
                controller: 'nrgiUserCreateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin', {
                templateUrl: '/partials/admin/users/user-admin',
                controller: 'nrgiUserAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin/:id', {
                templateUrl: '/partials/admin/users/user-admin-detail',
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
            // ANSWERS
            .when('/admin/assessments-admin/interviews/:assessment_ID', {
                templateUrl: '/partials/answers/interviews-list',
                controller: 'nrgiInterviewsListCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/assessments-admin/desk-research/:assessment_ID', {
                templateUrl: '/partials/answers/desk-research-list',
                controller: 'nrgiDeskResearchListCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/assessments-admin/secondary-sources/:assessment_ID', {
                templateUrl: '/partials/answers/secondary-sources-list',
                controller: 'nrgiSecondarySourcesListCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/assessments-admin/answer/:answer_ID', {
                templateUrl: '/partials/answers/answer-page-edit',
                controller: 'nrgiAnswerCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // DOCUMENTS
            .when('/admin/documents-admin', {
                templateUrl: '/partials/admin/documents/document-admin',
                controller: 'nrgiDocumentAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/documents-admin/:document_ID', {
                templateUrl: '/partials/admin/documents/document-admin-detail',
                controller: 'nrgiDocumentAdminDetailCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // INTERVIEWEES
            .when('/admin/interviewees-admin', {
                templateUrl: '/partials/admin/interviewees/interviewee-admin',
                controller: 'nrgiIntervieweeAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/interviewees-admin/:interviewee_ID', {
                templateUrl: '/partials/admin/interviewees/interviewee-admin-detail',
                controller: 'nrgiIntervieweeAdminDetailCtrl',
                resolve: routeRoleChecks.supervisor
            })
            ///// General Routes
            // ASSESSMENTS
            .when('/assessments', {
                templateUrl: '/partials/assessments/assessment-list',
                controller: 'nrgiAssessmentListCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/assessments/:assessment_ID', {
                templateUrl: '/partials/assessments/assessment-detail',
                controller: 'nrgiAssessmentDetailCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/assessments/desk-research/:assessment_ID', {
                templateUrl: '/partials/assessments/desk-research-list',
                controller: 'nrgiAssessmentDetailCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/assessments/interviews/:assessment_ID', {
                templateUrl: '/partials/assessments/interview-list',
                controller: 'nrgiAssessmentDetailCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/assessments/secondary-sources/:assessment_ID', {
                templateUrl: '/partials/assessments/secondary-source-list',
                controller: 'nrgiAssessmentDetailCtrl',
                resolve: routeRoleChecks.user
            });
            //// Assessment overview routes
            //.when('/assessments', {
            //    templateUrl: '/partials/assessments/assessments-list',
            //    controller:  'rgiAssessmentsListCtrl',
            //    resolve: routeRoleChecks.user
            //})
            //.when('/assessments/:assessment_ID', {
            //    templateUrl: '/partials/assessments/assessment-detail',
            //    controller:  'rgiAssessmentDetailCtrl',
            //    resolve: routeRoleChecks.user
            //})
            //.when('/assessments-review/:assessment_ID', {
            //    templateUrl: '/partials/assessments/assessment-review',
            //    controller:  'rgiAssessmentDetailCtrl',
            //    resolve: routeRoleChecks.user
            //});

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