describe('ItemFormatter', function() {

  var itemFormatter;

  beforeEach(function() {
    module('corespring-ng-utils');
    return inject(function(ItemFormatter) {
      itemFormatter = ItemFormatter;
    });
  });

  describe('buildStandardLabel', function() {

    describe('standards are undefined', function() {

      it('should return an empty string', function() {
        expect(itemFormatter.buildStandardLabel(undefined)).toEqual("");
      });

    });

    describe('a single standard', function() {
      var dotNotation = "W.3.2a";
      var description = ["Introduce a topic and group related information together;",
        "include illustrations when useful to aiding comprehension."].join(' ');
      var standard = {};
      standard[dotNotation] = description;

      it('should return dotNotation', function() {
        expect(itemFormatter.buildStandardLabel(standard)).toEqual(dotNotation);
      });

    });

    describe('multiple standards', function() {
      var dotNotations = ["W.4.2b", "W.4.2c", "W.4.2e"];
      var standards = {};
      _.each(dotNotations, function(dotNotation) {
        standards[dotNotation] = "This is a description";
      });

      it('should return first dot notation, with count of others', function() {
        expect(itemFormatter.buildStandardLabel(standards))
          .toEqual(dotNotations[0] + " plus " + (dotNotations.length - 1) + " more");
      });

    });

  });

  describe('buildStandardTooltip', function() {

    var dotNotation = "W.3.2a";
    var descriptionWords = ["Introduce", "a", "topic", "and", "group", "related", "information", "together;",
      "include", "illustrations", "when", "useful", "to", "aiding", "comprehension."];
    var anotherDotNotation = "W.4.3a";
    var anotherDescriptionWords = ["Orient", "the", "reader", "by", "establishing", "a", "situation", "and",
      "introducing", "a", "narrator", "and/or", "characters;", "organize", "an", "event", "sequence", "that", "unfolds",
      "naturally."];

    describe('standards are undefined', function() {

      it('should return an empty string', function() {
        expect(itemFormatter.buildStandardTooltip(undefined)).toEqual("");
      });

    });

    describe('a single standard', function() {
      var standard = {};
      standard[dotNotation] = descriptionWords.join(" ");

      it('should return the description', function() {
        expect(itemFormatter.buildStandardTooltip(standard)).toEqual(descriptionWords.join(" "));
      });

    });

    describe('multiple standards', function() {
      var standards = {};
      standards[dotNotation] = descriptionWords.join(" ");
      standards[anotherDotNotation] = anotherDescriptionWords.join(" ");

      it('should return colon separated dotNotation + description with first 6 words of each', function() {
        expect(itemFormatter.buildStandardTooltip(standards)).toEqual(
          dotNotation + ": " + descriptionWords.splice(0, 6).join(" ") + "..., " +
          anotherDotNotation + ": " + anotherDescriptionWords.splice(0, 6).join(" ") + "..."
        );
      });

    });

  });

  describe('buildItemTypesLabel', function() {

    var typeMap = [
      {key: 'corespring-multiple-choice', value: 'Multiple Choice'},
      {key: 'corespring-text-entry', value: 'Text Entry - Short Answer'}
    ];

    var item = {
      itemTypes: ['corespring-multiple-choice', 'corespring-text-entry']
    };

    it('should return comma separated values from typeMap', function() {
      var expectedResult = _.map(item.itemTypes, function(itemType) {
        return _.find(typeMap, function(type) {
          return itemType === type.key;
        }).value;
      }).join(", ");
      expect(itemFormatter.buildItemTypesLabel(item, typeMap)).toEqual(expectedResult);
    });

  });

});