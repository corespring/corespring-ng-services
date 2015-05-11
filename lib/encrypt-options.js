angular.module('corespring-ng-services').factory('EncryptOptions', [
  'CorespringConfig', '$http', function(config, $http) {
    return {
      encrypt: function(accessToken, options, onSuccess, onError) {
        var params;
        params = {
          method: 'POST',
          url: config.url + "/player/encrypt-options?access_token=" + accessToken,
          data: options
        };
        $http(params).success(onSuccess).error(onError);
      }
    };
  }
]);