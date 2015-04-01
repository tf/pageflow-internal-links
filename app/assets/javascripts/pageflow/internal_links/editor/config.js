pageflow.editor.pageTypes.register('internal_links_grid', {
  configurationEditorView: pageflow.internalLinks.GridConfigurationEditorView,

  embeddedViews: {
    'nav li': {
      view: pageflow.internalLinks.GridItemEmbeddedView,
      options: {propertyName: 'linked_page_ids'}
    },

    '.background_image': {
      view: pageflow.BackgroundImageEmbeddedView,
      options: {propertyName: 'background_image_id'}
    }
  },

  pageLinks: function(configuration) {
    return new pageflow.internalLinks.GridPageLinksCollection(null, {
      configuration: configuration
    });
  },
});

pageflow.editor.pageTypes.register('internal_links_list', {
  configurationEditorView: pageflow.internalLinks.ListConfigurationEditorView,

  embeddedViews: {
    'nav': {
      view: pageflow.internalLinks.ListEmbeddedView
    },

    '.background_image': {
      view: pageflow.BackgroundImageEmbeddedView,
      options: {propertyName: 'background_image_id'}
    }
  },

  pageLinks: function(configuration) {
    return new pageflow.internalLinks.ListPageLinksCollection(null, {
      configuration: configuration
    });
  },
});