ComicApp.Views.ComicsForm = Backbone.ViewExt.extend({

  template: JST['comics/form'],
  modelName: "comic",
  collectionName: "comics",
  requireSignIn: true,
  requireEditor: true,

  events: {
    'submit #comic-form': 'submitForm',
    'change #image-upload': 'changeImage'
  },

  changeImage: function (event) {
    var self = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      self._updatePreview(reader.result);
      self.model._temp = {image: reader.result};
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._file;
    }
  },

  _updatePreview: function(src) {
    this.$el.find(".image-preview img").attr("src", src);
  }

});
