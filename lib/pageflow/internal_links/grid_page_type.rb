module Pageflow
  module InternalLinks
    class GridPageType < Pageflow::PageType
      name 'internal_links_grid'

      def translation_key_prefix
        'pageflow.internal_links.grid'
      end

      def template_path
        'pageflow/internal_links/grid/page'
      end

      def view_helpers
        [GridHelper]
      end
    end
  end
end
