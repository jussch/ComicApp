ComicApp.Views.HeaderShow = Backbone.ViewExt.extend({

  template: JST['header/show'],
  modelName: "user",
  collectionName: "users",

  events: {
    "click .user-log-out": "logOut",
    "click .user-log-in": "logIn",
    "click .user-sign-up": "signUp"
  },

  logOut: function (event) {
    event.preventDefault();
    $.ajax({
      url: "api/sessions/destroy_current",
      type: "DELETE",
      dataType: 'json',
      success: function () {
        ComicApp.CU.fetch();
      }
    });
  },

  logIn: function (event) {
    event.preventDefault();
    var view = new ComicApp.Views.SessionForm({
      model: new ComicApp.Models.User()
    })
    ComicApp.RootRouter.trigger("swapModal", view);
  },

  signUp: function (event) {
    event.preventDefault();
    var view = new ComicApp.Views.UsersForm({
      model: new ComicApp.Models.User()
    })
    ComicApp.RootRouter.trigger("swapModal", view);
  }

})
