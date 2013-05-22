angular.module('corespring-ng-services')
  .factory(  'Collections', [ 'CorespringConfig', '$resource', (config, $resource) ->
    rawUrl = config.url + '/api/v1/collections'
    completeUrl = rawUrl.replace( /:(\d)/g, "\\:$1")
    $resource( completeUrl, {}, {get: {method:'GET', isArray:true}} ) 
  ])