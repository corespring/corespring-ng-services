angular.module('corespring-ng-services').factory('FieldValues', [
  '$http',
  'CorespringConfig',
  'Collections',
  function($http, config, Collections) {
    var itemTypes;
    return {
      Collections: Collections,
      ItemTypes: {
        get: function (success, failure) {
          if (itemTypes) {
            success(itemTypes);
          } else {
            $http.get(config.url + '/api/v2/item-types').success(function(result) {
              itemTypes = result;
            }).error(error);
          }
        }
      }
    };
  }
]);
