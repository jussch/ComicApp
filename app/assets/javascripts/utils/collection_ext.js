Backbone.CollectionExt = Backbone.Collection.extend({

  getOrFetch: function (id) {
    var model = this.get(id),
        self = this;

    if (!model) {
      model = new this.model ({id: id});

      model.fetch({
        success: function () {
          self.add(model, { merge: true })
        }
      });
    }

    return model;
  }

});
