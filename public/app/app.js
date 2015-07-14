'use strict';
//var angular;
angular.module('app', ['ngResource', 'ngRoute', 'ngDialog', 'ng-form-group', 'ngSanitize', 'ngCsv', 'angularFileUpload', 'angular.filter']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
  // role checks
    var routeRoleChecks = {
            supervisor: {auth: function (mgaAuthSrvc) {
                return mgaAuthSrvc.authorizeCurrentUserForRoute('supervisor');
            }},
            researcher: {auth: function (mgaAuthSrvc) {
                return mgaAuthSrvc.authorizeCurrentUserForRoute('researcher');
            }},
            reviewer: {auth: function (mgaAuthSrvc) {
                return mgaAuthSrvc.authorizeCurrentUserForRoute('reviewer');
            }},
            user: {auth: function (mgaAuthSrvc) {
                return mgaAuthSrvc.authorizeAuthenticatedUserForRoute();
            }}
        };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mgaMainCtrl'
        })
        // User Account Routes
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller:  'mgaProfileCtrl',
            resolve: routeRoleChecks.user
        })

        ///// Admin Routes
        // USERS
        .when('/admin/user-create', {
            templateUrl: '/partials/admin/users/user-create',
            controller:  'mgaCreateUserCtrl',
            resolve: routeRoleChecks.supervisor
        })
        .when('/admin/user-admin', {
            templateUrl: '/partials/admin/users/user-admin',
            controller:  'mgaUserAdminCtrl',
            resolve: routeRoleChecks.supervisor
        })
        .when('/admin/user-admin-edit/:id', {
            templateUrl: '/partials/admin/users/user-admin-edit',
            controller:  'mgaUserAdminDetailCtrl',
            resolve: routeRoleChecks.supervisor
        })
        // QUESTIONS
        .when('/admin/question-admin', {
            templateUrl: '/partials/admin/questions/question-admin',
            controller:  'mgaQuestionAdminCtrl',
            resolve: routeRoleChecks.supervisor
        })
        .when('/admin/question-admin-edit/:id', {
            templateUrl: '/partials/admin/questions/question-admin-edit',
            controller:  'mgaQuestionAdminDetailCtrl',
            resolve: routeRoleChecks.supervisor
        })
        // ASSESSMENTS
        .when('/admin/assessment-admin', {
            templateUrl: '/partials/admin/assessments/assessment-admin',
            controller:  'mgaAssessmentAdminCtrl'
        })
        .when('/admin/assessments-admin/:assessment_ID', {
            templateUrl: '/partials/admin/assessments/assessment-admin-detail',
            controller:  'mgaAssessmentAdminDetailCtrl'
        })
        // ANSWERS
        .when('/admin/assessments-admin/interviews/:assessment_ID', {
            templateUrl: '/partials/admin/answers/interviews-list',
            controller: 'mgaInterviewsListCtrl'
        })
        .when('/admin/assessments-admin/desk_research/:assessment_ID', {
            templateUrl: '/partials/admin/answers/assessment-admin-detail',
            controller: 'mgaAssessmentAdminDetailCtrl'
        })
        .when('/admin/assessments-admin/secondary-sources/:assessment_ID', {
            templateUrl: '/partials/admin/answers/secondary-sources-list',
            controller: 'mgaSecondarySourcesListCtrl'
        })
        .when('/admin/assessments-admin/answer/:answer_ID', {
            templateUrl: '/partials/admin/answers/answer-page-edit',
            controller:  'mgaAnswerCtrl'
        })
        // DOCUMENTS
        .when('/admin/documents-admin', {
            templateUrl: '/partials/admin/documents/document-admin',
            controller: 'mgaDocumentAdminCtrl'
        })
        .when('/admin/documents-admin/:document_ID', {
            templateUrl: '/partials/admin/documents/document-admin-detail',
            controller: 'mgaDocumentAdminDetailCtrl'
        })
        // INTERVIEWEES
        .when('/admin/interviewees-admin', {
            templateUrl: '/partials/admin/interviewees/interviewee-admin',
            controller: 'mgaIntervieweeAdminCtrl'
        })
        .when('/admin/interviewees-admin/:interviewee_ID', {
            templateUrl: '/partials/admin/interviewees/interviewee-admin-detail',
            controller: 'mgaIntervieweeAdminDetailCtrl'
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
angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
