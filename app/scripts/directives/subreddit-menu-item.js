'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditMenuItem
 * @description
 * # subredditMenuItem
 */
angular.module('angledditApp')
  .directive('subredditMenuItem', function () {
    return {
      templateUrl: './partials/subreddit-menu-item.html',
      restrict: 'E',
      scope: {
        subreddit: '@'
      }
    };
  });