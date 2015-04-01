pageflow.internalLinks.EditableLinksModeView = Backbone.Marionette.View.extend({
  render: function() {
    this.model.set('internal_links_editable', true);
    return this;
  },

  onClose: function() {
    this.model.unset('internal_links_editable');
  }
});