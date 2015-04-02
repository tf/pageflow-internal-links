require 'pageflow/internal_links/engine'

module Pageflow
  module InternalLinks
    def self.plugin
      InternalLinks::Plugin.new
    end

    def self.grid_page_type
      InternalLinks::GridPageType.new
    end

    def self.list_page_type
      InternalLinks::ListPageType.new
    end
  end
end
