angular.module('corespring-ng-services').factory('FieldValues', [
  '$http',
  'CorespringConfig',
  'Collections',
  function($http, config, Collections) {
    return {
      Collections: Collections,
      ItemTypes: {
        get: function (success, failure) {
          $http.get(config.url + '/api/v2/item-types').success(success).error(error);
        }
      }
    };
  }
]);
