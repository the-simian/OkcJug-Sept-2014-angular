'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditPostlistItem
 * @description
 * # subredditPostlistItem
 */
angular.module('angledditApp')
  .directive('subredditPostlistItem', function () {
    return {
      templateUrl: './partials/subreddit.postlist-item.html',
      restrict: 'E',
      replace: true,
      scope: {
        post: '='
      },
      controller: 'SubredditPostlistItemCtrl'
    };
  });