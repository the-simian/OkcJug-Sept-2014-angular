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
    function list(searchterm) {

      var url = 'http://www.reddit.com/reddits';

      if (searchterm) {
        url = url + '/search';
      }

      var Subreddits = $resource(url + '.json');
      return Subreddits
        .get({
          q: searchterm
        })
        .$promise
        .then(returnChildren);
    }

    return {
      list: list,
      get: get
    };
  });