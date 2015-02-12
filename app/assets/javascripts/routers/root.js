ComicApp.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    _.extend(this, options);

  },

  routes: {
    "": "redirect",
    "comics": "comicsIndex",
    "comics/new": "comicsNew",
    "comics/:id": "comicsShow",
    "comics/:id/edit": "comicsEdit"
  },

  redirect: function () {
    Backbone.history.navigate("/comics", { trigger: true });
  },

  comicsIndex: function () {
    var view = new ComicApp.Views.ComicsIndex({
      collection: ComicApp.Comics
    });
    ComicApp.Comics.fetch();

    this.swapView(view);
  },

  comicsNew: function () {
    var view = new ComicApp.Views.ComicsForm({
      collection: ComicApp.Comics,
      model: new ComicApp.Models.Comic()
    });

    this.swapView(view);
  },

  comicsShow: function (id) {
    var view = new ComicApp.Views.ComicsShow({
      model: ComicApp.Comics.getOrFetch(id)
    });

    this.swapView(view);
  },

  comicsEdit: function (id) {
    var view = new ComicApp.Views.ComicsForm({
      collection: ComicApp.Comics,
      model: ComicApp.Comics.getOrFetch(id)
    });

    this.swapView(view);
  },

  swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;

    this.$contentEl.html(view.render().$el);
  }


})
