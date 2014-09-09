'use strict';

/**
 * @ngdoc service
 * @name angledditApp.subreddit
 * @description
 * # subreddit
 * Service in the angledditApp.
 */
angular
  .module('angledditApp')
  .service('subreddit', function subreddit($resource) {
    function toData(child) {
      return child.data;
    }

    function returnChildren(response) {
      var children = response.data.children || [];
      var subreddits = children.map(toData);
      return subreddits;
    }

    function get(subreddit) {
      var Subreddit = $resource('http://www.reddit.com/r/:subreddit.json');
      var params = {
        subreddit: subreddit || 'euphoricgoats' //beause it is best default.
      };
      return Subreddit
        .get(params)
        .$promise
        .then(returnChildren);
    }


    //add search later!
    //fyi #page=5 for pages.
    function list() {
      var Subreddits = $resource('http://www.reddit.com/reddits.json');
      return Subreddits
        .get({})
        .$promise
        .then(returnChildren);
    }

    return {
      list: list,
      get: get
    };
  });