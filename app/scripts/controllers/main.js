'use strict';

/**
 * @ngdoc function
 * @name angledditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angledditApp
 */



angular
  .module('angledditApp')
  .controller('MainCtrl', function ($scope, $state) {
  
    $scope.$state = $state;
  
  });
