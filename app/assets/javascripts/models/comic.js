ComicApp.Models.Comic = Backbone.Model.extend({

  urlRoot: "api/comics",

  toJSON: function () {
    var json = { comic: _.clone( this.attributes ) };

    return json;
  }

});
