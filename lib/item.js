angular.module('corespring-ng-services').factory('Item', [
    'CorespringConfig', '$resource', '$http', function(config, $resource, $http) {
  var rawUrl = config.url + '/api/v1/items';
  var completeUrl = rawUrl.replace(/:(\d)/g, "\\:$1");
  return $resource(completeUrl, {}, {
    update: {
      method: 'PUT'
    },
    query: {
      method: 'GET',
      isArray: true
    },
    count: {
      method: 'GET',
      isArray: false
    },
    get: {
      method: 'GET',
      isArray: true
    }
  });
}]);