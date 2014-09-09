'use strict';

AngledditApp
  .config(['$stateProvider',
    function angleddit($stateProvider) {


      function subredditpostsResolve(subreddit, $stateParams) {
        return subreddit.get($stateParams.subreddit);
      }


      var angledditRResolve = {
        subredditposts: subredditpostsResolve

      };

      function angledditRCtrl($scope, subredditposts) {
        
        
        
        $scope.subredditposts = subredditposts;
      }

      var angledditView = {
        url: '/r/:subreddit',
        templateUrl: 'views/angleddit.r.html',
        controller: angledditRCtrl,
        resolve: angledditRResolve
      };


      $stateProvider
        .state('angleddit.r', angledditView);
}]);