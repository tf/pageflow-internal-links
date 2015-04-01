pageflow.internalLinks.PageLinkEmbeddedView = Backbone.Marionette.ItemView.extend({
  modelEvents: {
    'change': 'update'
  },

  ui: {
    title: '.title',
    description: '.description'
  },

  events: {
    'click .reset': function() {
      this.setTargetPage(null);
    },

    'click .set': function() {
      var view = this;

      pageflow.editor.selectPage().then(function(page) {
        view.setTargetPage(page.get('perma_id'));
      });
    },

    'click .thumbnail': function () {
      if (!this.$el.hasClass('editable')) {
        pageflow.slides.goToById(this.targetPage().id);
      }

      return false;
    },

    'mousedown': function() {
      if (this.$el.hasClass('editable') && !this.$el.hasClass('unassigned')) {
        return false;
      }
    }
  },

  onRender: function() {
    var view = this;

    this.listenTo(this.model.page, 'change:' + this.options.propertyName + '_editable', function() {
      view.updateClassName();
      view.updateDraggable();
      view.options.container.refreshScroller();
    });

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

    this.ui.title.html(targetPage ? targetPage.configuration.get('description') : '');
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

        this.listenTo(targetPage, 'change:highlighted', this.updateClassName);
        this.listenTo(targetPage.configuration, 'change:description', this.updateTitle);
      }
    }
  },

  updateClassNames: function() {
    var editable = this.model.page.get(this.options.propertyName + '_editable');
    var targetPage = this.targetPage();

    this.$el.toggleClass('title_hover', !editable);
    this.$el.toggleClass('editable', !!editable);
    this.$el.toggleClass('empty', !targetPage && !editable);
    this.$el.toggleClass('unassigned', !targetPage);
    this.$el.toggleClass('highlighted', !!targetPage && !!targetPage.get('highlighted'));
  }
});