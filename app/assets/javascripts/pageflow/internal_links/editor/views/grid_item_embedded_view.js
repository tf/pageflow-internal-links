pageflow.internalLinks.GridItemEmbeddedView = Backbone.Marionette.ItemView.extend({
  template: 'pageflow/internal_links/editor/templates/grid_item_embedded',

  modelEvents: {
    'change': 'update'
  },

  ui: {
    title: '.title'
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

  initialize: function() {
    this.pageLinks = this.model.page.pageLinks();
  },

  onRender: function() {
    var view = this;

    this.$el.droppable({
      tolerance: 'pointer',

      accept: function() {
        return view.$el.hasClass('editable') && view.$el.hasClass('unassigned');
      },

      activate: function() {
        view.$el.addClass('droppable');
      },

      deactivate: function() {
        view.$el.removeClass('droppable over');
      },

      over: function() {
        view.$el.addClass('over');
      },

      out: function() {
        view.$el.removeClass('over');
      },

      drop: function(event, ui) {
        view.$el.removeClass('droppable over');
        view.setTargetPage(ui.draggable.data('permaId'));
      }
    });

    this.$el.draggable({
      disabled: true,

      helper: 'clone',

      revert: function(droppable) {
        if (droppable) {
          view.setTargetPage(null);
        }

        return !droppable;
      },

      start: function() {
        view.$el.addClass('dragged');
      },

      stop: function() {
        view.$el.removeClass('dragged');
      },

      revertDuration: 200
    });

    this.listenTo(this.model.page, 'change:' + this.options.propertyName + '_editable', function() {
      view.updateClassNames();
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
    this.updateDraggable();
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

        this.listenTo(targetPage, 'change:highlighted', this.updateClassNames);
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
  },

  updateDraggable: function() {
    this.$el.draggable('option', 'disabled', !this.$el.hasClass('editable') || this.$el.hasClass('unassigned'));
  },

  setTargetPage: function(pagePermaId) {
    this.pageLinks.addWithPosition(this.position(), pagePermaId);
  },

  targetPage: function() {
    var pageLink = this.pageLinks.findByPosition(this.position());
    return pageLink && pageLink.targetPage();
  },

  position: function() {
    return this.$el.data('referenceKey');
  }
});