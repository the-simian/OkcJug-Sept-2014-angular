'use strict';

describe('Service: subreddit', function () {

  // load the service's module
  beforeEach(module('angledditApp'));

  // instantiate service
  var subreddit;
  beforeEach(inject(function (_subreddit_) {
    subreddit = _subreddit_;
  }));

  it('should do something', function () {
    expect(!!subreddit).toBe(true);
  });

});
