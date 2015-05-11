angular.module('corespring-ng-services').factory('ItemSearch', [
  'CorespringConfig',
  'FieldValues',
  'ItemFormatter',
  '$resource',
  '$http',
  function(config, FieldValues, ItemFormatter, $resource, $http) {

    var url = config.url + '/api/v2/items';

    function toQueryObject(params, skip, limit) {
      var obj = {
        offset: skip || 0,
        count: limit || 50
      };
      if (params.searchText !== null) {
        obj.text = params.searchText;
      }
      if (params.collection && params.collection.id) {
        obj.collections = [params.collection.id];
      }
      return obj;
    }

    return {
      count: function(accessToken, params, success, error) {
        return null;
      },
      query: function(accessToken, params, skip, limit, success, error) {
        var search = url + "?access_token=" + accessToken + "&query=" + encodeURI(JSON.stringify(toQueryObject(params, skip, limit)));
        $http.get(search).success(function(results) {
          FieldValues.ItemTypes.get(function(types) {
            _.each(results.hits, function(hit) {
              hit.itemTypesLabel = ItemFormatter.buildItemTypesLabel(hit, types);
            });
            success(results);
          });
        }).error(error);
      }
    };
  }
]);