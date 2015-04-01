module Pageflow
  module InternalLinks
    module GridHelper
      def internal_links_grid(entry, configuration)
        Grid.new(self,
                 InternalLinks::PageLinks.deserialize(entry, configuration),
                 configuration['linked_pages_layout']).render
      end

      class Grid < Struct.new(:template, :page_links, :layout)
        def render
          template.render('pageflow/internal_links/grid/grid', grid: self)
        end

        def item(position)
          page_link = page_links_by_position[position.to_i] || PageLink.null

          template.content_tag(:li,
                               page_link.target_page ? thumbnail_link(page_link, hero?(position)) : '',
                               :data => {:reference_key => position},
                               :class => page_link.target_page ? 'title_hover' : 'title_hover empty')
        end

        private

        def page_links_by_position
          @page_links_by_position ||= page_links.index_by(&:position)
        end

        def thumbnail_link(page_link, hero)
          span = template.content_tag(:span, template.raw(page_link.description), :class => 'title')

          template.link_to(span,
                           "##{page_link.target_page_id}",
                           :title => page_link.title,
                           :data => page_link.data_attributes,
                           :class => link_css_class(page_link.target_page, hero))
        end

        def link_css_class(page, hero)
          ['thumbnail', template.page_thumbnail_image_class(page, hero)] * ' '
        end

        def hero?(position)
          position == 0
        end
      end
    end
  end
end
