pageflow.internalLinks.PageLinksCollection = Backbone.Collection.extend({
  model: pageflow.internalLinks.PageLink,

  comparator: 'position',

  initialize: function(models, options) {
    this.configuration = options.configuration;

    this.load();

    this.listenTo(this, 'add remove change', this.save);
    this.listenTo(this.configuration, 'change:internal_links', this.load);
  },

  addLink: function(targetPageId) {
    this.addWithPosition(this.defaultPosition(), targetPageId);
  },

  canAddLink: function(targetPageId) {
    return true;
  },

  updateLink: function(link, targetPageId) {
    link.set('target_page_id', targetPageId);
  },

  removeLink: function(link) {
    this.remove(link);
  },

  addWithPosition: function(position, targetPageId) {
    this.add(this.pageLinkAttributes(position, targetPageId));
  },

  findByPosition: function(position) {
    return this.findWhere({position: position});
  },

  load: function() {
    this.set(this.pageLinksAttributes() ||
             this.legacyPageLinksAttributes());
  },

  save: function(referenceKey, pageId) {
    this.configuration.set('internal_links', this.map(function(pageLink) {
      return pageLink.toSerializedJSON();
    }));
  },

  pageLinksAttributes: function() {
    return this.configuration.get('internal_links');
  },

  legacyPageLinksAttributes: function() {
    return _(this.configuration.get('linked_page_ids') || {}).reduce(function(result, pageId, position) {
      var page = pageflow.pages.getByPermaId(pageId);

      if (page) {
        result.push(this.pageLinkAttributes(position, pageId));
      }

      return result;
    }, [], this);
  },

  pageLinkAttributes: function(position, targetPageId) {
    return {
      id: this.getUniqueId(),
      target_page_id: targetPageId,
      label: position,
      position: position
    };
  },

  getUniqueId: function() {
    var maxId = Math.max(0, _.max(this.map(function(pageLink) {
      return pageLink.id.split(':').pop();
    })));

    return this.configuration.page.id + ':' + (maxId + 1);
  }
});