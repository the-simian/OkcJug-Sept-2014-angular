'use strict';

describe('Service: subredditList', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var subredditList;
  beforeEach(inject(function (_subredditList_) {
    subredditList = _subredditList_;
  }));

  it('should do something', function () {
    expect(!!subredditList).toBe(true);
  });

});
