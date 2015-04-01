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
      model: this.model
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
    configurationEditor.tab('general', function() {
      this.input('target_page_id', pageflow.PageLinkInputView);
      this.input('page_transition', pageflow.SelectInputView, {
        translationKeyPrefix: 'pageflow.page_transitions',
        includeBlank: true,
        blankTranslationKey: 'pageflow.internal_links.editor.views.edit_page_link_view.default_page_transition',
        values: pageflow.pageTransitions.names()
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