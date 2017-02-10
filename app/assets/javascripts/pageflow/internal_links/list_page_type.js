pageflow.react.registerPageTypeWithDefaultBackground('internal_links_list', {
  prepareNextPageTimeout: 0,

  enhance: function(pageElement, configuration) {
    pageElement.on('click', 'nav a[data-page]', function() {
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
    pageElement.find('.contentText p').html(configuration.get('text') || '');

    pageElement.find('.shadow').css({
      opacity: configuration.get('gradient_opacity') / 100
    });
  }
});