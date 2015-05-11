angular.module('corespring-ng-services').factory('FieldValues', [
  '$http',
  'CorespringConfig',
  'Collections',
  function($http, config, Collections) {
    var itemTypes = undefined;
    return {
      Collections: Collections,
      ItemTypes: {
        get: function(success, error) {
          if (itemTypes) {
            success(itemTypes);
          } else {
            $http.get(config.url + '/api/v2/item-types').success(function(result) {
              itemTypes = result;
              success(itemTypes);
            }).error(error);
          }
        }
      }
    };
  }
]);
