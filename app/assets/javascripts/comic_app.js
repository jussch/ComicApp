window.ComicApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    ComicApp.CU = new ComicApp.Models.CurrentUser();
    ComicApp.CU.fetch();
    ComicApp.Comics = new ComicApp.Collections.Comics();
    ComicApp.Users = new ComicApp.Collections.Users();

    ComicApp.RootRouter = new ComicApp.Routers.Root({
      $contentEl: $('#content'),
      $headerEl: $('#header'),
      $modalEl: $('#modal')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  ComicApp.initialize();
});
