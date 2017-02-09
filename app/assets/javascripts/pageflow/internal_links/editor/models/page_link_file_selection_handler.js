pageflow.internalLinks.PageLinkFileSelectionHandler = function(options) {
  var page = pageflow.pages.get(options.id);
  var pageLink = page.pageLinks().get(options.pageLinkId);

  this.call = function(file) {
    pageLink.setReference(options.attributeName, file);
  };

  this.getReferer = function() {
    return '/internal_links_pages/' + options.id + '/page_links/' + options.pageLinkId;
  };
};

pageflow.editor.registerFileSelectionHandler(
  'internalLinks.pageLink',
  pageflow.internalLinks.PageLinkFileSelectionHandler
);
