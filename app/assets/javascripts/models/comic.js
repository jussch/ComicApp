ComicApp.Models.Comic = Backbone.Model.extend({

  urlRoot: "api/comics",

  toJSON: function () {
    var json = { comic: _.clone( this.attributes ) };

    if (this._temp) {
      json.comic.image = this._temp.image;
    }

    return json;
  }

});
