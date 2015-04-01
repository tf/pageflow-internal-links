pageflow.internalLinks.SideBarRouter = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    'internal_links_pages/:pageId/page_links/:id': 'pageLink'
  }
});