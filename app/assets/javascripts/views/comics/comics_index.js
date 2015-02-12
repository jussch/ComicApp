ComicApp.Views.ComicsIndex = Backbone.ViewExt.extend({

  template: JST['comics/index'],
  modelName: "comic",
  collectionName: "comics",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  }

});
