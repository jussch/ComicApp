Backbone.ViewExt = Backbone.CompositeView.extend({

  modelName: "model",
  collectionName: "collection",
  renderEvent: function (content) {},
  requireSignIn: false,
  requreEditor: false,

  initialize: function (options) {
    _.extend(this, options);
    if (this.model) {
      this.listenTo(this.model, "sync change", this.render);
    }
    if (this.collection) {
      this.listenTo(this.collection, "sync change", this.render);
    }
    this.listenTo(ComicApp.CU, "sync change", this.render);
  },

  render: function () {
    var options = {};
    options[this.modelName] = this.model;
    options[this.collectionName] = this.collection;

    var content = this.template(options);
    this.$el.html(content);
    this.renderEvent();
    return this;
  },

  closeModal: function (event) {
    event.preventDefault();
    ComicApp.RootRouter.trigger('removeModal');
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
    if (this.model._temp) {
      delete this.model._temp;
      this.model.fetch();
    }
    if (this.collection) {
      this.collection.add(this.model, { merge: true });
    }
    if (resp.responseJSON && resp.responseJSON.notices) {
      ComicApp.RootRouter.trigger('displayInfo', resp.responseJSON);
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

  submitForm: function (event) {
    event.preventDefault();
    var errors = [];

    if (this.requireSignIn && !ComicApp.CU.signedIn) {
      errors.push("You must be signed in");
    }
    if (this.requireEditor && !ComicApp.CU.isEditor()) {
      errors.push("You must have an editor account");
    }
    if (errors.length > 0) {
      ComicApp.RootRouter.trigger('displayInfo', { errors: errors });
      return;
    }

    var target = $(event.currentTarget);
    var data = target.serializeJSON()[this.modelName];

    this.submitButtonToggle(true);

    this.model.save(data, {
      success: this.submitSuccess.bind(this),
      error: this.submitError.bind(this)
    })
  }

});
