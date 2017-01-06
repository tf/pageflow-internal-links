pageflow.editor.pageTypes.register('internal_links_grid', {
  configurationEditorView: pageflow.internalLinks.GridConfigurationEditorView,

  embeddedViews: {
    'nav li': {
      view: pageflow.internalLinks.GridItemEmbeddedView,
      options: {propertyName: 'linked_page_ids'}
    }
  },

  pageLinks: function(configuration) {
    return configuration.internalLinksGrid();
  }
});

pageflow.editor.pageTypes.register('internal_links_list', {
  configurationEditorView: pageflow.internalLinks.ListConfigurationEditorView,

  embeddedViews: {
    'nav': {
      view: pageflow.internalLinks.ListEmbeddedView
    }
  },

  pageLinks: function(configuration) {
    return configuration.internalLinksList();
  }
});

pageflow.editor.registerPageConfigurationMixin(pageflow.internalLinks.pageConfigurationMixin);

pageflow.editor.registerSideBarRouting({
  router: pageflow.internalLinks.SideBarRouter,
  controller: pageflow.internalLinks.SideBarController
});