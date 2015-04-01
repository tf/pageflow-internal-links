pageflow.internalLinks.ListItemEmbeddedView = Backbone.Marionette.ItemView.extend({
  template: 'pageflow/internal_links/editor/templates/list_item_embedded',

  tagName: 'li',

  modelEvents: {
    'change': 'update'
  },

  ui: {
    title: '.title',
    description: '.description'
  },

  events: {
    'mousedown': function() {
      if (this.$el.hasClass('editable')) {
        return false;
      }
    }
  },

  onRender: function() {
    this.update();
  },

  update: function() {
    var targetPage = this.targetPage();

    this.$el.data('permaId', targetPage ? targetPage.get('perma_id') : null);

    this.updateTexts();
    this.updateThumbnailView();
    this.updateClassNames();
  },

  updateTexts: function() {
    var targetPage = this.targetPage();

    this.ui.title.html(targetPage ? targetPage.configuration.get('title') : '');
    this.ui.description.html(targetPage ? targetPage.configuration.get('description') : '');
  },

  updateThumbnailView: function() {
    var targetPage = this.targetPage();

    if (this.currentLinkedPage !== targetPage) {
      if (this.currentLinkedPage) {
        this.stopListening(this.currentLinkedPage, 'change:highlighted');
        this.stopListening(this.currentLinkedPage.configuration, 'change:description');
      }

      this.currentLinkedPage = targetPage;

      if (this.thumbnailView) {
        this.thumbnailView.close();
      }

      if (targetPage) {
        this.thumbnailView = this.subview(new pageflow.PageThumbnailView({
          model: targetPage,
          imageUrlPropertyName: 'link_thumbnail_url'
        }));

        this.$el.append(this.thumbnailView.el);

        this.listenTo(targetPage, 'change:highlighted', this.updateClassNames);
        this.listenTo(targetPage.configuration, 'change:description', this.updateTitle);
      }
    }
  },

  updateClassNames: function() {
    var editable = this.options.page.get(this.options.propertyName + '_editable');
    var targetPage = this.targetPage();

    this.$el.toggleClass('title_hover', !editable);
    this.$el.toggleClass('editable', !!editable);
    this.$el.toggleClass('empty', !targetPage && !editable);
    this.$el.toggleClass('unassigned', !targetPage);
    this.$el.toggleClass('highlighted', !!targetPage && !!targetPage.get('highlighted'));
  },

  targetPage: function() {
    return this.model.targetPage();
  }
});