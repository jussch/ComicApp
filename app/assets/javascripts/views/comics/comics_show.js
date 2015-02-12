ComicApp.Views.ComicsShow = Backbone.ViewExt.extend({

  template: JST['comics/show'],
  modelName: "comic",
  collectionName: "comics",

  events: {
    "click .delete-comic": "deleteComic"
  },

  deleteComic: function (event) {
    event.preventDefault();
    if (!confirm("Are you sure you want to delete this comic?")) {
      return;
    }
    ComicApp.Comics.remove(this.model);
    this.model.destroy();
    Backbone.history.navigate("comics", { trigger: true });
  }

});
