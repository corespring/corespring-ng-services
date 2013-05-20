#access-token

angular.module('corespring-ng-services')
  .factory(  'AccessToken', [ 'CorespringConfig', '$http', (config, $http) ->
    out =  
      generate: (id,secret,onSuccess,onError) ->
        params = 
          method: 'POST'
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          url: "#{config.url}/auth/access_token"
          data: $.param({clientId: id, clientSecret: secret})
        $http(params).success(onSuccess).error(onError)
        null
    out 
  ])