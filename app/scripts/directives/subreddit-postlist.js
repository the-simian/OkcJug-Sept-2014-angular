'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditPostlist
 * @description
 * # subredditPostlist
 */
angular.module('angledditApp')
  .directive('subredditPostlist', function () {
    return {
      templateUrl: './partials/subreddit-postlist.html',
      restrict: 'E',
      replace:true,
      scope: {
        posts: '='
      }
    };
  });
