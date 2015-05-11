angular.module('corespring-ng-utils')
  .factory('ItemFormatter', function() {
    return {
      /**
       * Build the standards label:
       * @param standards
       * @return label string
       */
      buildStandardLabel: function(standards) {
        if (standards == null || _.keys(standards).length == 0) {
          return "";
        }
        var out = _.keys(standards)[0];
        if (_.keys(standards).length == 1) {
          return out;
        }
        return out + " plus " + (_.keys(standards).length - 1) + " more";
      },
      buildStandardTooltip: function(standards) {
        if (!standards) {
          return "";
        }
        var out = [];

        if (_.keys(standards).length == 1 && standards[_.keys(standards)[0]]) {
          return standards[_.keys(standards)[0]];
        }

        for (var dotNotation in standards) {

          if (!standards[dotNotation]) {
            return "";
          }
          var wordArray = standards[dotNotation].split(/\W+/);

          var standardLabel = wordArray.length > 6 ? wordArray.splice(0, 6).join(" ") + "..." : wordArray.join(" ");
          out.push(dotNotation + ": " + standardLabel);
        }
        return out.join(", ");
      },
      buildItemTypesLabel: function(item, types) {
        return _.chain(item.itemTypes)
          .map(function(typeKey) {
            var typePair = _.find(types, function(itemType) {
              return itemType.key === typeKey
            });
            return typePair ? typePair.value : undefined;
          })
          .filter(function(v) {
            return v !== undefined;
          })
          .value()
          .join(', ');
      }
    }
  });