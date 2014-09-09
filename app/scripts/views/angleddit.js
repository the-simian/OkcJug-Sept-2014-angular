'use strict';

AngledditApp
  .config(['$stateProvider',
    function angleddit($stateProvider) {
      
      
      
      function subredditsResolve(subreddit) {
        
          var listofStuff = subreddit.list('programming');  

          return listofStuff;
      }
      
      
      var angledditResolve = {
        subreddits: subredditsResolve

      };

      function angledditCtrl($scope, subreddits) {
          $scope.subreddits = subreddits;
      }

      var angledditView = {
        url: '/angleddit',
        templateUrl: 'views/angleddit.html',
        controller: angledditCtrl,
        resolve: angledditResolve
      };


      $stateProvider
        .state('angleddit', angledditView);
}]);