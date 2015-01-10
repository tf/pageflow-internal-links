pageflow.editor.pageTypes.register('internal_links_grid', {
  configurationEditorView: pageflow.internalLinks.GridConfigurationEditorView,

  embeddedViews: {
    'nav li': {
      view: pageflow.internalLinks.PageLinkEmbeddedView,
      options: {propertyName: 'linked_page_ids'}
    },

    '.background_image': {
      view: pageflow.BackgroundImageEmbeddedView,
      options: {propertyName: 'background_image_id'}
    }
  },

  pageLinks: function(configuration) {
    return new pageflow.internalLinks.PageLinksCollection(null, {
      configuration: configuration,
      propertyName: 'linked_page_ids'
    });
  },
});