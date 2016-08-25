/**
 * Define an angular module
 */
(function (angular) {
    'use strict';
    angular
        .module('youtubeAdapter', ['ui.router', 'ui.bootstrap'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                // HOME STATE
                .state('home', {
                    url: '/home',
                    //templateUrl: 'templates/home.html',
                    //controller: 'HomeCtrl as Home'
                })
        }]);
})(window.angular);