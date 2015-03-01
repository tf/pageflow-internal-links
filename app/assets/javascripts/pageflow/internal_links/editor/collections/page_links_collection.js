pageflow.internalLinks.PageLinksCollection = Backbone.Collection.extend({
  model: pageflow.internalLinks.PageLink,

  initialize: function(models, options) {
    this.configuration = options.configuration;
    this.propertyName = options.propertyName;

    this.listenTo(this.configuration, 'change:' + this.propertyName, function() {
      this.load();
    });

    this.load();
  },

  canAddLink: function() {
    return !!this.firstFreeReferenceKey();
  },

  addLink: function(targetPageId) {
    this.save(this.firstFreeReferenceKey(), targetPageId);
  },

  updateLink: function(link, targetPageId) {
    this.save(link.get('referenceKey'), targetPageId);
  },

  removeLink: function(link) {
    this.save(link.get('referenceKey'), null);
  },

  firstFreeReferenceKey: function() {
    var references = this.references();

    return _.chain(25)
      .times(function(index) {
        return (index + 1).toString();
      })
      .find(function(referenceKey) {
        return !references[referenceKey];
      })
      .value();
  },

  load: function() {
    var idPrefix = this.configuration.page.id + ':';

    this.set(_(this.references()).reduce(function(result, pageId, key) {
      var page = pageflow.pages.getByPermaId(pageId);

      if (page) {
        result.push({
          id: idPrefix + key,
          targetPageId: pageId,
          label: key,
          referenceKey: key
        });
      }

      return result;
    }, []));
  },

  save: function(referenceKey, pageId) {
    var references = _(this.references()).clone();
    references[referenceKey.toString()] = pageId;

    this.configuration.set(this.propertyName, references);
  },

  references: function() {
    return this.configuration.get(this.propertyName) || {};
  }
});