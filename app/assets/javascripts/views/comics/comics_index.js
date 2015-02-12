ComicApp.Views.ComicsIndex = Backbone.ViewExt.extend({

  template: JST['comics/index'],
  modelName: "Comic",
  collectionName: "Comics",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  }

});
