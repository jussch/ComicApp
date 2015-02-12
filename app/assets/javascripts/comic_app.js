window.ComicApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    ComicApp.RootRouter = new ComicApp.Routers.Root({
      contentEl: $('#content'),
      headerEl: $('#header'),
      modalEl: $('#modal')
    });
    ComicApp.CU = new ComicApp.Models.CurrentUser();
    ComicApp.CU.fetch();
    ComicApp.Comics = new ComicApp.Collections.Comics();
    ComicApp.Users = new ComicApp.Collections.Users();
  }
};

$(document).ready(function(){
  ComicApp.initialize();
});
