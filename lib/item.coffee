angular.module('corespring-ng-services')
  .factory(  'Item', [ 'CorespringConfig', '$resource', '$http', (config, $resource, $http) ->

    rawUrl = config.url + '/api/v1/items?access_token=demo_token'
    completeUrl = rawUrl.replace( /:(\d)/g, "\\:$1")

    out = $resource(completeUrl, {}, {
      update:{ method:'PUT'},
      query:{ method:'GET', isArray:true},
      count:{ method:'GET', isArray:false},
      get: { method: 'GET', isArray: true}
    })
    out.prototype.getHttp = -> $http.get(rawUrl)
    out 
  ])