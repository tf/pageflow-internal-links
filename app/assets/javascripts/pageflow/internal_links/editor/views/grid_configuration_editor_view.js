pageflow.internalLinks.GridConfigurationEditorView = pageflow.ConfigurationEditorView.extend({
  configure: function() {
    this.tab('general', function() {
      this.group('general');
    });

    this.tab('files', function() {
      this.group('background');
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        positioning: false
      });
    });

    this.tab('links', function() {
      this.view(pageflow.internalLinks.EditableLinksModeView, {
        model: this.model.page
      });

      this.input('linked_pages_layout', pageflow.SelectInputView, {values: pageflow.Page.linkedPagesLayouts});
      this.view(pageflow.PageLinksView, {
        model: this.model.page
      });
    });

    this.tab('options', function() {
      this.group('options');
    });
  }
});