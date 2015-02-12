ComicApp.Views.ComicsShow = Backbone.ViewExt.extend({

  template: JST['comics/show'],
  modelName: "comic",
  collectionName: "comics",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  }

});
