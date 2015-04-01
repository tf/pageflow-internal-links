module Pageflow
  module InternalLinks
    module ListHelper
      def internal_links_list(entry, configuration)
        List.new(self, entry, configuration).render
      end

      class List < Struct.new(:template, :entry, :configuration)
        def render
          template.render('pageflow/internal_links/list/list', list: self)
        end

        def pages
          entry.pages.where(perma_id: page_perma_ids)
        end

        private

        def page_perma_ids
          configuration['linked_page_id_list'] || []
        end
      end
    end
  end
end
