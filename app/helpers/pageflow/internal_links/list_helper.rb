module Pageflow
  module InternalLinks
    module ListHelper
      def internal_links_list(entry, configuration)
        render('pageflow/internal_links/list/list',
               page_links: InternalLinks::PageLinks.deserialize(entry, configuration))
      end
    end
  end
end
