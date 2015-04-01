//= require ./page_links_collection

pageflow.internalLinks.GridPageLinksCollection = pageflow.internalLinks.PageLinksCollection.extend({
  canAddLink: function() {
    return this.defaultPosition() !== undefined;
  },

  defaultPosition: function() {
    var collection = this;

    return _.chain(25)
      .times(function(index) {
        return index;
      })
      .find(function(position) {
        return !collection.findWhere({position: position});
      })
      .value();
  }
});