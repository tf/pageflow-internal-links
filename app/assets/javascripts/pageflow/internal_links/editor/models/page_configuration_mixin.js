pageflow.internalLinks.pageConfigurationMixin = {
  internalLinksList: function() {
    this._internalLinksList = this._internalLinksList ||
      new pageflow.internalLinks.ListPageLinksCollection(null, {
        configuration: this
      });

    return this._internalLinksList;
  },

  internalLinksGrid: function() {
    this._internalLinksGrid = this._internalLinksGrid ||
      new pageflow.internalLinks.GridPageLinksCollection(null, {
        configuration: this
      });

    return this._internalLinksGrid;
  }
};