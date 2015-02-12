ComicApp.Views.HeaderShow = Backbone.ViewExt.extend({

  template: JST['header/show'],
  modelName: "user",
  collectionName: "users",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

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
      success: function () {
        ComicApp.CU.signedIn = false;
      }
    });
  },

  logIn: function (event) {
    event.preventDefault();
  },

  signUp: function (event) {
    event.preventDefault();
  }

})
