#access-token

angular.module('corespring-ng-services')
  .factory(  'AccessToken', [ 'CorespringConfig', '$resource', (config, $r) ->
  	console.log "corespring-ng-services: AccessToken url: #{config.url}"
  ])