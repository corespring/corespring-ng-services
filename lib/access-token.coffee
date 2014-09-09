angular.module('corespring-ng-services')
  .factory(  'AccessToken', [ 'CorespringConfig', '$http', (config, $http) ->
    out =  
      generate: (id,secret,onSuccess,onError) ->
        params = 
          method: 'POST'
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          url: "#{config.url}/auth/access_token"
          data: $.param({client_id: id, client_secret: secret})
        $http(params).success(onSuccess).error(onError)

      isValid: (token,onSuccess,onError) ->
        params = 
          params : { token: token }

        $http.get("#{config.url}/auth/isvalid",params).success(onSuccess).error(onError)
        null
    out 
  ])