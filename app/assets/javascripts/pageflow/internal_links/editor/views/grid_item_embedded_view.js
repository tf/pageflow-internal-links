pageflow.internalLinks.GridItemEmbeddedView = Backbone.Marionette.ItemView.extend({
  template: 'pageflow/internal_links/editor/templates/grid_item_embedded',

  modelEvents: {
    'change': 'update'
  },

  ui: {
    title: '.title'
  },

  events: {
    'click .edit': function() {
      pageflow.editor.navigate(this.pageLink().editPath(), {trigger: true});
      return false;
    },

    'click .set': function() {
      var view = this;

      pageflow.editor.selectPage().then(function(page) {
        view.setTargetPage(page.get('perma_id'));
      });
    },

    'click .thumbnail': function () {
      if (!this.$el.hasClass('editable')) {
        var pageLink = this.pageLink();

        pageflow.slides.goToByPermaId(pageLink.get('target_page_id'), {
          transition: pageLink.get('page_transition')
        });
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
        view.movePageLinkFrom(ui.draggable.data('referenceKey'));
      }
    });

    this.$el.draggable({
      disabled: true,

      helper: 'clone',

      revert: function(droppable) {
        if (droppable) {
          view.resetPageLink();
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

    this.listenTo(this.model.page, 'change:' + 'internal_links_editable', function() {
      view.updateClassNames();
      view.updateDraggable();
      view.options.container.refreshScroller();
    });

    this.update();
  },

  update: function() {
    var targetPage = this.targetPage();
    var pageLink = this.pageLink();

    this.$el.attr('data-page-transition', pageLink ? pageLink.get('page_transition') : null);

    this.updateTexts();
    this.updateCurrentPageLink();
    this.updateThumbnailView();
    this.updateClassNames();
    this.updateDraggable();
  },

  updateCurrentPageLink: function() {
    var pageLink = this.pageLink();

    if (this.currentPageLink !== pageLink) {
      if (this.currentPageLink) {
        this.stopListening(this.currentPageLink, 'change');
      }

      this.currentPageLink = pageLink;

      if (pageLink) {
        this.listenTo(pageLink, 'change', function() {
          this.updateClassNames();
          this.updateThumbnailView();
        });
      }
    }
  },

  updateTexts: function() {
    var targetPage = this.targetPage();
    var pageLink = this.pageLink();

    if (pageLink && pageLink.get('description')) {
      this.ui.title.html(pageLink.get('description'));
    }
    else {
      this.ui.title.html(targetPage ? targetPage.configuration.get('description') : '');
    }
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
    var editable = this.model.page.get('internal_links_editable');
    var targetPage = this.targetPage();

    this.$el.toggleClass('title_hover', !editable);
    this.$el.toggleClass('editable', !!editable);
    this.$el.toggleClass('empty', !targetPage && !editable);
    this.$el.toggleClass('no_page', !targetPage);
    this.$el.toggleClass('unassigned', !this.currentPageLink);
    this.$el.toggleClass('highlighted', !!(this.currentPageLink && this.currentPageLink.get('highlighted')));
  },

  updateDraggable: function() {
    this.$el.draggable('option', 'disabled', !this.$el.hasClass('editable') || this.$el.hasClass('unassigned'));
  },

  setTargetPage: function(pagePermaId) {
    this.pageLinks.addWithPosition(this.position(), pagePermaId);
  },

  movePageLinkFrom: function(position) {
    this.pageLinks.findByPosition(position).set('position', this.position());
  },

  resetPageLink: function() {
    this.pageLinks.removeByPosition(this.position());
  },

  targetPage: function() {
    var pageLink = this.pageLink();
    return pageLink && pageLink.targetPage();
  },

  pageLink: function() {
    return this.pageLinks.findByPosition(this.position());
  },

  position: function() {
    return this.$el.data('referenceKey');
  }
});