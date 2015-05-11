angular.module('corespring-ng-services').factory('AccessToken', [
  'CorespringConfig', '$http', function(config, $http) {
    return {
      generate: function(id, secret, onSuccess, onError) {
        var params;
        params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: config.url + "/auth/access_token",
          data: $.param({
            client_id: id,
            client_secret: secret
          })
        };
        $http(params).success(onSuccess).error(onError);
      },
      isValid: function(token, onSuccess, onError) {
        var params;
        params = {
          params: {
            token: token
          }
        };
        $http.get(config.url + "/auth/isvalid", params).success(onSuccess).error(onError);
      }
    };
  }
]);