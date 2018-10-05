pageflow.internalLinks.EditPageLinkView = Backbone.Marionette.Layout.extend({
  template: 'pageflow/internal_links/editor/templates/edit_page_link',

  regions: {
    formContainer: '.form_container'
  },

  ui: {
    backButton: 'a.back'
  },

  events: {
    'click a.back': 'goBack',

    'click a.destroy': 'destroy'
  },

  onRender: function() {
    var configurationEditor = new pageflow.ConfigurationEditorView({
      model: this.model,
      attributeTranslationKeyPrefixes: [
        'pageflow.internal_links.page_link_attributes',
        'pageflow.common_page_link_attributes'
      ]
    });

    this.configure(configurationEditor);
    this.formContainer.show(configurationEditor);

    this.highlight();
  },

  highlight: function() {
    var page = this.model.collection.page;

    this.model.highlight();
    page.set('internal_links_editable', true);

    this.listenTo(this, 'close', function() {
      this.model.resetHighlight();
      page.unset('internal_links_editable');
    });
  },

  configure: function(configurationEditor) {
    var pageLink = this.model;
    var page = pageLink.collection.page;

    configurationEditor.tab('general', function() {
      this.group('page_link');
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        positioning: false,

        fileSelectionHandler: 'internalLinks.pageLink',
        fileSelectionHandlerOptions: {
          pageLinkId: pageLink.id,
        },

        visibleBinding: 'id',
        visible: function() {
          return page.get('template') === 'internal_links_list';
        }
      });
      this.input('description', pageflow.TextAreaInputView, {
        size: 'short'
      });
    });
  },

  destroy: function() {
    if (confirm(I18n.t('pageflow.internal_links.editor.views.edit_page_link_view.confirm_destroy'))) {
      this.model.remove();
      this.goBack();
    }
  },

  goBack: function() {
    pageflow.editor.navigate('/pages/' + this.options.page.id + '/links', {trigger: true});
  }
});
