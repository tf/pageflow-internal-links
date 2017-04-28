pageflow.internalLinks.ListItemEmbeddedView = Backbone.Marionette.ItemView.extend({
  template: 'pageflow/internal_links/editor/templates/list_item_embedded',

  tagName: 'li',

  modelEvents: {
    'change': 'update'
  },

  ui: {
    description: '.page_description',
    link: '.page_link'
  },

  events: {
    'click .edit': function() {
      pageflow.editor.navigate(this.model.editPath(), {trigger: true});
      return false;
    },

    'click': function() {
      if (this.$el.hasClass('editable')) {
        return false;
      }
    }
  },

  onRender: function() {
    this.listenTo(this.options.page, 'change:internal_links_editable', function() {
      this.updateClassNames();
    });

    this.update();
  },

  update: function() {
    var targetPage = this.targetPage();

    if (!('currentTargetPage' in this) ||
        this.currentTargetPage !== targetPage ||
        !('currentThumbnailImageId' in this) ||
        this.currentThumbnailImageId != this.model.get('thumbnail_image_id')) {

      if (this.currentTargetPage) {
        this.stopListening(this.currentTargetPage.configuration, 'change:description');
      }

      this.currentTargetPage = targetPage;
      this.currentThumbnailImageId = this.model.get('thumbnail_image_id');

      this.ui.link.attr('data-page', targetPage ? targetPage.get('perma_id') : null);

      this.updateThumbnail();

      if (targetPage) {
        this.listenTo(targetPage.configuration, 'change:description', this.updateTexts);
      }
    }

    this.updatePageTransition();
    this.updateClassNames();
    this.updateTexts();
  },

  updatePageTransition: function() {
    this.ui.link.attr('data-page-transition', this.model.get('page_transition'));
  },

  updateTexts: function() {
    var targetPage = this.targetPage();

    if (this.model.get('description')) {
      this.ui.description.html(this.model.get('description'));
    }
    else {
      this.ui.description.html(targetPage ? (targetPage.configuration.get('description') || '') : '');
    }
  },

  updateThumbnail: function() {
    var targetPage = this.targetPage();

    if (this.thumbnailView) {
      this.thumbnailView.close();
    }

    this.thumbnailView = this.subview(new pageflow.PageThumbnailView({
      model: this.model,
      imageUrlPropertyName: 'link_thumbnail_url'
    }));

    this.ui.link.prepend(this.thumbnailView.el);
  },

  updateClassNames: function() {
    var editable = this.options.page.get('internal_links_editable');
    var targetPage = this.targetPage();

    this.$el.toggleClass('editable', !!editable);
    this.$el.toggleClass('empty', !targetPage && !editable);
    this.$el.toggleClass('unassigned', !targetPage);
    this.$el.toggleClass('highlighted', !!this.model.get('highlighted'));
    this.ui.link.toggleClass('custom_thumbnail', !!this.model.getReference('thumbnail_image_id', pageflow.imageFiles));
    this.ui.link.toggleClass('no_custom_thumbnail', !this.model.getReference('thumbnail_image_id', pageflow.imageFiles));
    this.ui.link.toggleClass('own_description', !!this.model.get('description'));
    this.ui.link.toggleClass('no_own_description', !this.model.get('description'));
  },

  targetPage: function() {
    return this.model.targetPage();
  }
});
