ComicApp.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    _.extend(this, options);
    this.listenTo(this, "swapModal", this.swapModal);
    this.listenTo(this, "removeModal", this.removeModal);
    this.listenTo(this, "displayInfo", this.displayInfo);
    this.header = new ComicApp.Views.HeaderShow({ model: ComicApp.CU });
    this.$headerEl.html(this.header.render().$el);
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
    this.removeModal();
    this._currentView && this._currentView.remove();
    this._currentView = view;

    this.$contentEl.html(view.render().$el);
  },

  removeModal: function () {
    if (this._currentModal) {
      this._currentModal.remove();
      this.$modalEl.addClass('hidden');
    }
  },

  swapModal: function (view) {
    this.removeModal();
    this._currentModal = view;
    this.$modalEl.html(view.render().$el);
    this.$modalEl.removeClass("hidden");
  },

  displayInfo: function (resp) {
    this.$infoEl.removeClass("hidden");
    var self = this;
    this.$infoEl.children("ul").empty();
    if (resp.notices) {
      resp.notices.forEach(function (str) {
        var $li = $("<li class='notice'>");
        $li.html(str);
        self.$infoEl.children(".notices").append($li);
      });
    }
    if (resp.errors) {
      resp.errors.forEach(function (str) {
        var $li = $("<li class='error'>");
        $li.html(str);
        self.$infoEl.children(".errors").append($li);
      });
    }
    this.$infoEl.animate({ opacity: 0}, 2000, function () {
      self.$infoEl.addClass("hidden")
      self.$infoEl.css("opacity", 1)
    })
  }

})
