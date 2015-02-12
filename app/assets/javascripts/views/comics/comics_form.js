ComicApp.Views.ComicsForm = Backbone.ViewExt.extend({

  template: JST['comics/form'],
  modelName: "Comic",
  collectionName: "Comics",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'submit #comic-form': 'sumbitForm'
  }

});
