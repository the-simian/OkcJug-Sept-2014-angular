'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditMenu
 * @description
 * # subredditMenu
 */
angular.module('angledditApp')
  .directive('subredditMenu', function () {
    return {
      templateUrl: './partials/subreddit-menu.html',
      restrict: 'E',
      replace: true,
      scope: {
        subreddits: '='
      }
    };
  });


