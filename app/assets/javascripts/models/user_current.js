ComicApp.Models.CurrentUser = ComicApp.Models.User.extend({

  url: "api/users/current",
  urlRoot: undefined,
  signedIn: false,

  parse: function (resp) {
    if (resp.errors) {
      this.signedIn = false;
      delete resp.errors;
      return resp;
    } else {
      this.signedIn = true;
      return ComicApp.Models.User.parse.call(this, resp);
    }
  }

});
