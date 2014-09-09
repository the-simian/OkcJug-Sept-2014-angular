'use strict';

/**
 * @ngdoc function
 * @name angledditApp.controller:SubredditPostlistItemCtrl
 * @description
 * # SubredditPostlistItemCtrl
 * Controller of the angledditApp
 */
angular.module('angledditApp')
  .controller('SubredditPostlistItemCtrl', function ($scope) {
    function upvote() {
      $scope.up = !$scope.up;
      $scope.down = false;
      $scope.voteState = $scope.up ? 'list-group-item-success' : '';
    }

    function downvote() {
      $scope.up = false;
      $scope.down = !$scope.down;
      $scope.voteState = $scope.down ? 'list-group-item-danger' : '';
    }

    $scope.upvote = upvote;
    $scope.downvote = downvote;
  });