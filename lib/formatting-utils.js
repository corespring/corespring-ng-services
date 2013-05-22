angular.module('corespring-ng-utils')
  .factory('ItemFormatter', function() {
  return {
    /**
     * Build the standards label:
     * @param standards
     * @return label string
     */
    buildStandardLabel: function(standards) {
      if (standards == null || standards.length == 0) {
        return "";
      }
      var out = standards[0].dotNotation;
      if (standards.length == 1) {
        return out;
      }
      return out + " plus " + (standards.length - 1) + " more";
    },
    buildStandardTooltip: function(standards) {
      if (!standards) {
        return "";
      }
      var out = [];

      if (standards.length == 1 && standards[0].standard) {
        return standards[0].standard;
      }

      for (var i = 0; i < standards.length; i++) {

        if (!standards[i] || !standards[i].standard) {
          return "";
        }
        var wordArray = standards[i].standard.split(/\W+/);

        var standardLabel = wordArray.length > 6 ? wordArray.splice(0, 6).join(" ") + "..." : wordArray.join(" ");
        out.push(standards[i].dotNotation + ": " + standardLabel);
      }
      return out.join(", ");
    }
  }
});