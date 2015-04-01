module Pageflow
  module InternalLinks
    class ListPageType < Pageflow::PageType
      name 'internal_links_list'

      def translation_key_prefix
        'pageflow.internal_links.list'
      end

      def template_path
        'pageflow/internal_links/list/page'
      end

      def view_helpers
        [InternalLinks::ListHelper]
      end
    end
  end
end
