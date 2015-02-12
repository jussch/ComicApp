ComicApp.Views.ComicsShow = Backbone.ViewExt.extend({

  template: JST['comics/show'],
  modelName: "Comic",
  collectionName: "Comics",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  }

});
