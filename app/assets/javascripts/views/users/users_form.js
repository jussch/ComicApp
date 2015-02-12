ComicApp.Views.UsersForm = Backbone.ViewExt.extend({

  template: JST['users/form'],
  modelName: "user",
  collectionName: "users",

  events: {
    "submit #user-form": "submitForm"
  }

});
