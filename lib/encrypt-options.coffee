angular.module('corespring-ng-services')
  .factory(  'EncryptOptions', [ 'CorespringConfig', '$http', (config, $http) ->
    out =  
      encrypt: (accessToken, options, onSuccess, onError) ->
        params = 
          method: 'POST'
          url: "#{config.url}/player/encrypt-options?access_token=#{accessToken}"
          data: options 
        $http(params).success(onSuccess).error(onError)
        null
    out 
  ])