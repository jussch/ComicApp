ComicApp.Models.CurrentUser = ComicApp.Models.User.extend({

  url: "api/users/current",
  urlRoot: undefined,
  signedIn: false,

  signIn: function () {
    this.signedIn = true;
  },

  signOut: function () {
    this.clear();
    this.signedIn = false;
  },

  parse: function (resp) {
    if (resp.errors) {
      this.signOut();
      delete resp.errors;
      return resp;
    } else {
      this.signIn();
      return ComicApp.Models.User.prototype.parse.call(this, resp);
    }
  }

});
