angular.module('corespring-ng-services').factory('ItemSearch', [
  'CorespringConfig', '$resource', '$http', function(config, $resource, $http) {

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
        console.log(success);
        var search = url + "?access_token=" + accessToken + "&query=" + encodeURI(JSON.stringify(toQueryObject(params, skip, limit)));
        $http.get(search).success(success).error(error);
      }
    };
  }
]);