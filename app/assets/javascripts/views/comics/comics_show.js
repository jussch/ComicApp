ComicApp.Views.ComicsShow = Backbone.ViewExt.extend({

  template: JST['comics/show'],
  modelName: "comic",
  collectionName: "comics",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .delete-comic": "deleteComic"
  },

  deleteComic: function (event) {
    event.preventDefault();
    ComicApp.Comics.remove(this.model);
    this.model.destroy();
    Backbone.history.navigate("comics", { trigger: true });
  }

});
