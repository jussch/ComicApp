ComicApp.Views.UsersIndex = Backbone.ViewExt.extend({

  template: JST['users/index'],
  modelName: "user",
  collectionName: "users"

});
