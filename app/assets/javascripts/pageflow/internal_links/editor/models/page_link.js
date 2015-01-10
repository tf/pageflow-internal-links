pageflow.internalLinks.PageLink = Backbone.Model.extend({
  targetPage: function() {
    return pageflow.pages.getByPermaId(this.get('targetPageId'));
  },

  label: function() {

  },

  editPath: function() {},

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