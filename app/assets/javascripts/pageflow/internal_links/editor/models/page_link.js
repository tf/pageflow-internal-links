pageflow.internalLinks.PageLink = Backbone.Model.extend({
  i18nKey: 'pageflow/internal_links/page_link',

  mixins: [pageflow.transientReferences],

  targetPage: function() {
    return pageflow.pages.getByPermaId(this.get('target_page_id'));
  },

  label: function() {
    return this.get('label');
  },

  thumbnailFile: function() {
    var thumbnailFile = this.getReference('thumbnail_image_id',
                                           pageflow.imageFiles);

    if (thumbnailFile) {
      return thumbnailFile;
    }
    else if (this.targetPage()) {
      return this.targetPage().thumbnailFile();
    }
    else {
      return null
    }
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
