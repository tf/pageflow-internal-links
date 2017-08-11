module Pageflow
  module InternalLinks
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.page_types.register(InternalLinks.grid_page_type)
        config.features.register(PageTypeFeature.new(InternalLinks.list_page_type))
      end
    end
  end
end
