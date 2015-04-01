//= require ./page_links_collection

pageflow.internalLinks.GridPageLinksCollection = pageflow.internalLinks.PageLinksCollection.extend({
  canAddLink: function() {
    return !!this.defaultPosition();
  },

  defaultPosition: function() {
    var collection = this;

    return _.chain(25)
      .times(function(index) {
        return (index + 1).toString();
      })
      .find(function(position) {
        return !collection.findWhere({position: position});
      })
      .value();
  }
});