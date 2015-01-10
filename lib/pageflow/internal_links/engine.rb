module Pageflow
  module InternalLinks
    class Engine < Rails::Engine
      isolate_namespace Pageflow::InternalLinks

      config.autoload_paths << File.join(config.root, 'lib')
    end
  end
end
