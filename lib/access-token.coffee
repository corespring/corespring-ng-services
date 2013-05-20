#access-token

angular.module('corespring-ng-services')
  .factory(  'AccessToken', [ 'CorespringConfig', '$http', (config, $http) ->
    out =  
      generate: (id,secret,onSuccess,onError) ->
        console.log "generate! : #{id}, #{secret}"
        params = 
          method: 'POST'
          url: "#{config.url}/api/v1/access-token"
          data: 
            clientId: id
            clientSecret: secret 
        $http(params).success(onSuccess).error(onError)
        null
    out 
  ])