title: "Notes"
date: 2014-03-15 20:17:16
categories: [Notes]
toc: true
---


- need yeoman
- angular generator


- go get ui-router too!

- have to add the angleddit view by hand :(

- declare the view.

- you need to modify th elinks at the top

- now you have the app itself. neat.

- we are going to make some resolved for the main view.
    - make the controller. nothing goes in here jsut yet.
    

```js
AngledditApp
  .config(['$stateProvider', function angleddit($stateProvider) {
    
    
  function angledditCtrl(){
  
    alert('the controller shoudl load, when the view does');
  }  

  var angledditView = {
    url: '/angleddit',
    templateUrl: 'views/angleddit.html',
    controller: angledditCtrl
  };  
    
    
  $stateProvider
    .state('angleddit', angledditView);
}]);
```


- time for resolve number one. we need a list of subreddits   

```js

AngledditApp
  .config(['$stateProvider',
    function angleddit($stateProvider) {
      
      
      
      function subredditsResolve() {

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
```

- does nothing, a job for a service!


```shell
$ yo angular:service subreddit
```
```shell
create app\scripts\services\subreddit.js
create test\spec\services\subreddit.js
```   


boom we have service. does nothing. much sad.

```js
'use strict';
angular
  .module('angledditApp')
  .service('subreddit', function subreddit() {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
```

inject service into resolve.

```js
AngledditApp
  .config(['$stateProvider',
    function angleddit($stateProvider) {
      
      
      
      function subredditsResolve(subreddit) {
          subreddit.list();
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
```

and go ahead and add a list function in the serice too.

```js
angular
  .module('angledditApp')
  .service('subreddit', function subreddit() {
  
    function list(){
      alert('calling a function in a service. That revealing module!');
    
    }
  
    return {
      list: list
    };
  });

```


refresh page. much glory to kazikstan, now make data!

```html
<section>
  <div class="jumbotron">
      <h1>Angleddit home</h1>
  </div>
  

    <div>
      Your Subreddits: {{subreddits}}
    </div>
</section>
```
can do quick test

```js
function subredditsResolve(subreddit) {

  console.log('getting list');
  return [{},{},{}];
}

//and in controller..
function angledditCtrl($scope, subreddits) {
    $scope.subreddits = subreddits;
}
```  

will see `Your Subreddits: [{},{},{}]` at bottom of page. yay no-yay.


need real potato, right? yes.

dont forget make inject resource!

```js
    function list() {
      var Subreddits = $resource('http://www.reddit.com/reddits.json');
      return Subreddits.get({}).$promise;
    }
```    

whoa. list work much trash on screen!!

let us make use of viwer of json.

- http://jsonviewer.stack.hu/ I summon thee!

- paste in the potato.

it is revealed the format! response.data.children!

- children.png
- childrencollapsed.png

- look at that trash. its not as trashy anymore


- now we have potato.

- we have control

```js
    function angledditCtrl($scope, subreddits) {
          $scope.subreddits = subreddits;
      }
  ```
  
  potato very bound to scope.
  
  Village rejoice.
  
  #Di-Rekt-Ive
  
  ng-repat.
  
  
  ```bash
  $ yo angular:directive subreddit-menu
  ```
  
  ```bash
  $ yo angular:directive subreddit-menu-item
  ```
  
  ```
   create app\scripts\directives\subreddit-menu.js
   create test\spec\directives\subreddit-menu.js

   create app\scripts\directives\subreddit-menu-item.js
   create test\spec\directives\subreddit-menu-item.js
 ```  
 
 look in the main page. so sexy.
 
 ```html
   <!-- build:js({.tmp,app}) scripts/scripts.js -->
  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/main.js"></script>
  <script src="scripts/services/subreddit.js"></script>
  <script src="scripts/directives/subreddit-menu.js"></script>
  <script src="scripts/directives/subreddit-menu-item.js"></script>
  <!-- endbuild -->
  ```
  
  - subreddit-menu-directives.png
 
  
  
  - make partials folder. this differnt from views!
  - make the subreddit-menu.html
  
  -modify it to this...
  ```js
angular.module('angledditApp')
  .directive('subredditMenu', function () {
    return {
      templateUrl: './partials/subreddit-menu.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
  ```
  
  points to partial
  
  
  ```html
<div>
  SOMEDAY ILL BE A SUBREDDIT MENU
</div>
```

whatever for now.

refresh. Its on the page. awesome.

NOW THE AMAZING SAUCE MAGICAL PIXIE DANCE PART.

We make potato come to life.

make directive partial like this.
```html
<div>
  <ul>
    <li ng-repeat="subreddit in subreddits">
      {{subreddit.display_name}}
    </li>
  </ul>
</div>
```

and the actual directive like this.

```js
angular.module('angledditApp')
  .directive('subredditMenu', function () {
    return {
      templateUrl: './partials/subreddit-menu.html',
      restrict: 'E',
      replace: true,
      scope: {
        subreddits: '='
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
```


In the controller we assigned the list...

```js
      function angledditCtrl($scope, subreddits) {
          $scope.subreddits = subreddits;
      }
```

pretty awesome!


now lets our bootstrap on it.

```html
<div>
  <div class="row">
    <h3>Subreddits</h3>
  </div>
  <div class="row btn-group-vertical">
    <div 
          ng-repeat="subreddit in subreddits" 
           class=" btn btn-default">
      <a ui-sref="angleddit.r">{{subreddit.display_name}}</a>
    </div>
  </div>
</div>
```

beautiful. bland. eternal. bootstank.


now, we add the next state....

angleddit.r

but first lets refactor subreddit menu, to repeat the menu items.
pedantic, but organized

```js
angular.module('angledditApp')
  .directive('subredditMenuItem', function () {
    return {
      templateUrl: './partials/subreddit-menu-item.html',
      restrict: 'E',
      scope: {
        subreddit: '@'
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
```  

```
AngledditApp
  .config(['$stateProvider',
    function angleddit($stateProvider) {

      var angledditView = {
        url: '/r/:subreddit',
        templateUrl: 'views/angleddit.r.html'
      };


      $stateProvider
        .state('angleddit.r', angledditView);
}]);
``` 

and a state.

  
```and this si simple.
<a ui-sref="angleddit.r({'subreddit':'{{subreddit}}'})">{{subreddit}}</a>
```

look at the param.... it goes in the view
make sure the quotes

```html
<section class="row">
    <div class="col-md-3">
      <subreddit-Menu
                      subreddits="subreddits"
                      ></subreddit-Menu>
    </div>  
    <div class="col-md-8">
       <div ui-view></div>
    </div>
</section>
```

note the ui-view.

```html
  <script src="scripts/views/angleddit.js"></script>
  <script src="scripts/views/angleddit.r.js"></script>
```

both needed now.

watch the url. cool.. but nothign happening yet.

now for our second resolve. to teh service!

```js
    function get(subreddit) {

      var Subreddit = $resource('http://www.reddit.com/r/:subreddit.json');

      var params = {
        subreddit: subreddit || 'euphoricgoats' //are you a true herdsman?.
      };

      return Subreddit
        .get(params)
        .$promise;
    }
  ```
  
  and
  
  ```js
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
```


and in the view..

```html
<div class="row">
  {{subreddit}}
</div>
```

oh boy more json garbage!


lets clean it up. again. like last time. yes.

note the back and forth vuttons. sick as hell.


```js
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
  ```
  
  NICE! we can reuse the same function!!!
  Who wants directives? 
  
```shell

$ yo angular:directive subreddit-postlist
$ yo angular:directive subreddit-postlist-item

```

```js
angular.module('angledditApp')
  .directive('subredditPostlist', function () {
    return {
      templateUrl: './partials/subreddit-postlist.html',
      restrict: 'E',
      scope: {
        posts: '='
      }
    };
  });
```

And


```html

<div class="row list-group-item">
  <div class="col-md-3">
    <div class="btn-group-vertical">
      <button class="btn btn-success btn-lg" ng-click="upvote()">
        <span><span class="glyphicon glyphicon-circle-arrow-up"></span><span>{{post.ups}}</span></span>
      </button>
      <button class="btn btn-danger btn-lg" ng-click="downvote()">
        <span><span class="glyphicon glyphicon-circle-arrow-down"></span><span>{{post.downs}}</span></span>
      </button>
    </div>
  </div>
  <div class="col-md-9">
    <div class="row">
      <h4><a href="{{post.url}}">{{post.title}}</a></h4>
      <span class="text-muted">{{post.author}}</span>
    </div>
  </div>
</div>

```


now lets make a controlelr for a post....

```js
angular.module('angledditApp')
  .controller('SubredditPostlistItemCtrl', function ($scope) {

  });

```

```js
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
```

upvote and downvoate buttons~~~~








    
  














