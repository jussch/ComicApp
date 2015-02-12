ComicApp.Views.SessionForm = Backbone.ViewExt.extend({

  template: JST['users/session'],
  modelName: "user",
  collectionName: "users",

  events: {
    "submit #session-form": "signIn"
  },

  signIn: function (event) {
    event.preventDefault();
    var target = $(event.currentTarget);
    var data = target.serializeJSON().user;

    this.submitButtonToggle(true);

    $.ajax({
      url: "api/sessions",
      type: "POST",
      dataType: 'json',
      data: {user: data},
      success: function (anything,string,resp) {
        ComicApp.CU.fetch();
        ComicApp.RootRouter.trigger('displayInfo', resp.responseJSON);
        ComicApp.RootRouter.trigger('removeModal');
      }.bind(this),
      error: function (resp) {
        this.submitButtonToggle(false);
        ComicApp.RootRouter.trigger('displayInfo', resp.responseJSON);
      }.bind(this)
    });
  }

});
