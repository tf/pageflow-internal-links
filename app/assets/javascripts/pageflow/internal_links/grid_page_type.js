pageflow.react.registerPageTypeWithDefaultBackground('internal_links_grid', {
  prepareNextPageTimeout: 0,

  enhance: function(pageElement, configuration) {
    pageElement.on('click', 'nav .thumbnail', function() {
      pageflow.slides.goToByPermaId($(this).data('page'), {
        transition: $(this).data('pageTransition')
      });
      return false;
    });
  },

  update: function(pageElement, configuration) {
    pageElement.find('h2 .tagline').text(configuration.get('tagline') || '');
    pageElement.find('h2 .title').text(configuration.get('title') || '');
    pageElement.find('h2 .subtitle').text(configuration.get('subtitle') || '');
    pageElement.find('p').html(configuration.get('text') || '');

    pageElement.find('.shadow').css({
      opacity: configuration.get('gradient_opacity') / 100
    });

    pageElement.find('nav').attr('data-layout', configuration.get('linked_pages_layout'));
  }
});