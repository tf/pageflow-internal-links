pageflow.internalLinks.PageLink = Backbone.Model.extend({
  i18nKey: 'pageflow/internal_links/page_link',

  targetPage: function() {
    return pageflow.pages.getByPermaId(this.get('target_page_id'));
  },

  label: function() {
    return this.get('label');
  },

  editPath: function() {
    return '/internal_links_pages/' + this.getRoutableId() + '/page_links/' + this.id;
  },

  getRoutableId: function() {
    return this.collection.page.id;
  },

  toSerializedJSON: function() {
    return _.omit(this.attributes, 'highlighted');
  },

  highlight: function() {
    this.set('highlighted', true);
  },

  resetHighlight: function() {
    this.unset('highlighted');
  },

  remove: function() {
    this.collection.remove(this);
  }
});