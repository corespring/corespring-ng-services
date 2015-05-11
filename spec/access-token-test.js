describe('access-token-test', function() {

  var $httpBackend, service;

  var prepareBackend = function($backend) {
    $backend.when('POST', /.access_token/).respond(function(method, url, data) {
      if (data.indexOf("client_id=good") !== -1) {
        return [
          200, url, {
            token: "token"
          }
        ];
      } else {
        return [
          401, url, {
            error: "bad data"
          }
        ];
      }
    });

    $backend.when('GET', /.isvalid/).respond(function(method, url, data) {
      if (url.indexOf("token=good") !== -1) {
        return [
          200, url, {
            valid: "true"
          }
        ];
      } else {
        return [
          401, url, {
            error: "bad data"
          }
        ];
      }
    });
    return null;
  };

  beforeEach(function() {
    var init;
    module('corespring-ng-services');
    module(function($provide) {
      var config;
      config = {
        url: "http://server"
      };
      $provide.value('CorespringConfig', config);
      return null;
    });
    init = function(_$httpBackend_, $rootScope, AccessToken) {
      var e, scope;
      $httpBackend = _$httpBackend_;
      prepareBackend($httpBackend);
      scope = $rootScope.$new();
      try {
        service = AccessToken;
      } catch (_error) {
        e = _error;
        throw "Error with the service: " + e;
      }
      return null;
    };
    return inject(init);
  });

  describe('generate', function() {

    describe('called with valid secret', function() {

      it('calls success', function() {
        var successCalled = false;
        var onSuccess = function(data) {
          return successCalled = true;
        };

        expect(service).toNotBe(null);
        service.generate("good", "secret", onSuccess, onError);
        $httpBackend.flush();
        expect(successCalled).toBe(true);
      });

    });

    describe('called with invalid secret', function() {

      it('calls error', function() {
        var errorCalled = false;
        var onError = function(data) {
          return errorCalled = true;
        };

        expect(service).toNotBe(null);
        service.generate("bad", "secret", onSuccess, onError);
        $httpBackend.flush();
        return expect(errorCalled).toBe(true);
      });

    });


  });

  describe('isValid', function() {

    describe('called with valid token', function() {

      it('calls success', function() {
        var successCalled = false;
        var onSuccess = function(data) {
          return successCalled = true;
        };

        expect(service).toNotBe(null);
        service.isValid("good", onSuccess, onError);
        $httpBackend.flush();
        expect(successCalled).toBe(true);
      });

    });

    describe('called with invalid token', function() {

      it('calls error', function() {
        var errorCalled = false;
        var onError = function(data) {
          return errorCalled = true;
        };

        expect(service).toNotBe(null);
        service.isValid("bad", onSuccess, onError);
        $httpBackend.flush();
        return expect(errorCalled).toBe(true);
      });

    });

  });


});
