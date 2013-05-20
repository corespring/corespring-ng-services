describe 'access-token-test', ->

  service = null
  $httpBackend = null

  prepareBackend = ($backend) -> 

    fn = (method, url, data) -> 
      if data.indexOf("client_id=good") != -1 
        [200, url, { token: "token"}]
      else
        [401, url, { error: "bad data"}]

    $backend.when('POST', /.*/).respond(fn);
    null

  beforeEach ->
    module('corespring-ng-services')

    module ($provide) -> 
      config =
        url : "http://server" 
      $provide.value('CorespringConfig', config)
      null

    init = (_$httpBackend_, $rootScope, AccessToken) ->
      $httpBackend = _$httpBackend_
      prepareBackend($httpBackend)
      scope = $rootScope.$new()
      try  
        service = AccessToken
      catch e 
        throw("Error with the service: " + e)
      null
    
    inject(init) 
  
  it 'works', ->
    expect(service).toNotBe(null)

    successCalled = false
    errorCalled = false

    onSuccess = (data) -> successCalled = true
    onError = (data) -> errorCalled = true

    service.generate "good", "secret", onSuccess, onError
    $httpBackend.flush()
    expect(successCalled).toBe(true)

    service.generate "bad", "secret", onSuccess, onError
    $httpBackend.flush()
    expect(errorCalled).toBe(true)

