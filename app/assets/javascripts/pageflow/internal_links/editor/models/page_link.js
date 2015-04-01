pageflow.internalLinks.PageLink = Backbone.Model.extend({
  targetPage: function() {
    return pageflow.pages.getByPermaId(this.get('target_page_id'));
  },

  label: function() {},

  editPath: function() {},

  toSerializedJSON: function() {
    return _.clone(this.attributes);
  },

  highlight: function() {
    var page = this.targetPage();

    if (page) {
      page.set('highlighted', true);
    }
  },

  resetHighlight: function() {
    var page = this.targetPage();

    if (page) {
      page.unset('highlighted');
    }
  }
});