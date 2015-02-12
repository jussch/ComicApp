ComicApp.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    _.extend(this, options);
  },

  routes: {
    "": "redirect",
    "/comics": "comicsIndex",
    "/comics/new": "comicsNew",
    "/comics/:id": "comicsShow",
    "/comics/:id/edit": "comicsEdit"
  },

  redirect: function () {
    Backbone.history.navigate("/comics", { trigger: true });
  },

  comicsIndex: function () {
    var view = new ComicApp.Views.ComicsIndex({
      collection: ComicApp.Comics
    });
    ComicApp.Comics.fetch();

    this.$contentEl.html(view.render().$el);
  },

  comicsNew: function () {
    var view = new ComicApp.Views.ComicsForm({
      collection: ComicApp.Comics,
      model: new ComicApp.Models.Comic()
    });

    this.$contentEl.html(view.render().$el);
  },

  comicsShow: function (id) {
    var view = new ComicApp.Views.ComicsShow({
      model: ComicApp.Comics.getOrFetch(id)
    });

    this.$contentEl.html(view.render().$el);
  },

  comicsEdit: function (id) {
    var view = new ComicApp.Views.ComicsForm({
      collection: ComicApp.Comics,
      model: ComicApp.Comics.getOrFetch(id)
    });

    this.$contentEl.html(view.render().$el);
  }


})
