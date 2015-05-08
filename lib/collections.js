angular.module('corespring-ng-services').factory('Collections', [
  'CorespringConfig', '$resource', function(config, $resource) {
    var rawUrl = config.url + '/api/v1/collections';
    var completeUrl = rawUrl.replace(/:(\d)/g, "\\:$1");
    return $resource(completeUrl, {}, {
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }
]);
