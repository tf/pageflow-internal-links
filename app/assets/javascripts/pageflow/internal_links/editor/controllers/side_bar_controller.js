pageflow.internalLinks.SideBarController = Backbone.Marionette.Controller.extend({
  initialize: function(options) {
    this.region = options.region;
  },

  pageLink: function(pageId, linkId) {
    var page = pageflow.pages.get(pageId);

    this.region.show(new pageflow.internalLinks.EditPageLinkView({
      model: page.pageLinks().get(linkId),
      page: page
    }));
  }
});