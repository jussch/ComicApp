ComicApp.Models.User = Backbone.Model.extend({

  urlRoot: "api/users",

  toJSON: function () {
    var json = { user: _.clone( this.attributes ) };

    return json;
  },

  isEditor: function () {
    return this.get('status') === "EDITOR" || this.isAdmin();
  },

  isAdmin: function () {
    return this.get('status') === "ADMIN";
  }

});
