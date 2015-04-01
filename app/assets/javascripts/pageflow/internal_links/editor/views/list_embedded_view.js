pageflow.internalLinks.ListEmbeddedView = Backbone.Marionette.View.extend({
  render: function() {
    this.subview(new pageflow.CollectionView({
      el: this.$el.find('ul'),
      collection: this.model.internalLinksList(),
      itemViewConstructor: pageflow.internalLinks.ListItemEmbeddedView,
      itemViewOptions: {
        page: this.model.page
      }
    }));

    this.listenTo(this.model.page.pageLinks(), 'add remove', function() {
      this.refreshScroller();
    });

    this.refreshScroller();

    return this;
  },

  refreshScroller: function() {
  }
});