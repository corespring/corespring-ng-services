angular.module('corespring-ng-services')
  .factory('ItemSearch', ['CorespringConfig', '$resource', '$http', (config, $resource, $http) ->

    rawUrl = config.url + '/api/v1/items/query'
    completeUrl = rawUrl.replace( /:(\d)/g, "\\:$1")

    mongoQuery = new com.corespring.mongo.MongoQuery()

    searchFields = [
      'title',
      'standards.dotNotation',
      'copyrightOwner',
      'contributor',
      'author'
    ]

    resultFields = [
      'id',
      'title',
      'primarySubject',
      'gradeLevel',
      'itemType',
      'standards',
      'sourceUrl',
      'contributor',
      'author'
    ]

    toJson = (q) -> JSON.stringify(q)

    objectOrArray = (value, arrayKey) -> 
      if (value) 
        if (value.indexOf && value.length > 0) 
          mongoQuery.inArray(value, arrayKey)
        else 
          value[arrayKey]
      else 
        null

    buildQueryObject = (searchParams, searchFields) ->

      query = mongoQuery.fuzzyTextQuery(searchParams.searchText, searchFields)

      gradeLevel = objectOrArray(searchParams.gradeLevel, "key")
      query["gradeLevel"] = gradeLevel if (gradeLevel != null)


      collectionId = mongoQuery.inArray([searchParams.collection], "id")
      query["collectionId"] = collectionId if (collectionId != null)

      query


    run = (accessToken, params, skip, limit, count, success, error) ->
      createUrl = ->
        out = "#{rawUrl}?access_token=#{accessToken}"
        out += "&q=#{toJson(buildQueryObject(params, searchFields))}"
        out += "&f=#{toJson(mongoQuery.buildFilter(resultFields))}"
        out += "&sk=#{skip}"
        out += "&l=#{limit}"
        out += "&c=#{count}"

      $http.get("#{createUrl()}")
        .success(success)
        .error(error)

      null
    
    { 
      count: (accessToken, params, success, error) ->
        run( accessToken, params, skip, limit, "true", success, error)
        null

      query: (accessToken, params, skip, limit, success, error) ->
        run( accessToken, params, skip, limit, "false", success, error)
        null
       
    }
  ])