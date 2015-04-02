module Pageflow
  module InternalLinks
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register(PageTypeFeature.new(InternalLinks.list_page_type))
      end
    end
  end
end
