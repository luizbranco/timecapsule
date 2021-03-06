/*
 * Letter Collection
 */
define([
  "app",
  "modules/letters/models/letter",
  "backbone"
], function (
  App,
  Letter,
  Backbone
) {

  return App.Collection.extend({

    model: Letter,

    url: "/letters",

    initialize: function (models, options) {
      this.mediator = options.mediator;
    },

    comparator: function (model) {
      return model.get("date");
    }

  });

});
