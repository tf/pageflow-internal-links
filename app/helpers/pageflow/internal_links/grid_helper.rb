module Pageflow
  module InternalLinks
    module GridHelper
      def internal_links_grid(entry, configuration)
        Grid.new(self, entry, configuration).render
      end

      class Grid < Struct.new(:template, :entry, :configuration)
        def render
          template.render('pageflow/internal_links/grid/grid', grid: self)
        end

        def item(index)
          page = page_by_index(index)

          template.content_tag(:li,
                               page ? thumbnail_link(page, hero?(index)) : '',
                               :data => {:reference_key => index},
                               :class => page ? 'title_hover' : 'title_hover empty')
        end

        def layout
          configuration['linked_pages_layout']
        end

        private

        def page_by_index(index)
          entry.pages.find_by_perma_id(page_ids[index.to_s])
        end

        def page_ids
          configuration.fetch('linked_page_ids', {})
        end

        def thumbnail_link(page, hero)
          span = template.content_tag(:span, template.raw(page.configuration['description']), :class => 'title')

          template.link_to(span,
                           "##{page.perma_id}",
                           :title => page.title,
                           :data => {:page => page.id},
                           :class => ['thumbnail', template.page_thumbnail_image_class(page, hero)] * ' ')
        end

        def hero?(index)
          index == 1
        end
      end
    end
  end
end
