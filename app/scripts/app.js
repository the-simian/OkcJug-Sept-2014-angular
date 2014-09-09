'use strict';



var applicationDependencies =  [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource'
  ];


var AngledditApp = angular
  .module('angledditApp', applicationDependencies);

function defaultStateProvider($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .otherwise('/');

    var angledditHomeView = {
        url: '/',
        templateUrl: './views/main.html',
    };

    $stateProvider
        .state('home', angledditHomeView);
}



function run($rootScope) {
  console.log('the app is running', $rootScope);
}

AngledditApp
    .config(['$stateProvider', '$urlRouterProvider', defaultStateProvider])
    .run(['$rootScope', run]);

window.AngledditApp = AngledditApp;
window.angular = window.angular || angular;