Backbone.ViewExt = Backbone.CompositeView.extend({

  modelName: "model",
  collectionName: "collection",
  renderEvent: function (content) {},

  render: function () {
    var options = {};
    options[this.modelName] = this.model;
    options[this.collectionName] = this.collection;

    var content = this.template(options);
    this.renderEvent(content);
    this.$el.html(content);
    return this;
  },

  submitButtonToggle: function (toggle) {
    var submitButton = this.$('.submit');
    submitButton.prop('disabled', toggle);
    if (toggle) {
      submitButton.addClass('submitting');
    } else {
      submitButton.removeClass('submitting');
    }
  },

  submitSuccess: function (model, resp) {
    this.submitButtonToggle(false);
    if (this.collection) {
      this.collection.add(this.model, { merge: true });
    }
    Backbone.history.navigate(
      "/" + this.modelName + "s/" + this.model.id,
      { trigger: true }
    );
  },

  submitError: function (model, resp) {
    ComicApp.RootRouter.trigger('displayInfo', resp.responseJSON);
    this.submitButtonToggle(false);
  },

  sumbitForm: function (event) {
    event.preventDefault();

    var target = $(event.currentTarget);
    var data = target.serializeJSON()[this.modelName];

    this.submitButtonToggle(true);

    this.model.save(data, {
      success: this.submitSuccess,
      error: this.submitError
    })
  }

});
