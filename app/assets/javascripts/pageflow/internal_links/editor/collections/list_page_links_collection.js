//= require ./page_links_collection

pageflow.internalLinks.ListPageLinksCollection = pageflow.internalLinks.PageLinksCollection.extend({
  defaultPosition: function() {
    return Math.max(0, _.max(this.map(function(pageLink) {
      return pageLink.get('position');
    }))) + 1;
  },

  saveOrder: function() {
  }
});