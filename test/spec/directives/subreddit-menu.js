'use strict';

describe('Directive: subredditMenu', function () {

  // load the directive's module
  beforeEach(module('angledditApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<subreddit-menu></subreddit-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the subredditMenu directive');
  }));
});
