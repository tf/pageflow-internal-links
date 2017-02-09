module Pageflow
  module InternalLinks
    class Engine < Rails::Engine
      isolate_namespace Pageflow::InternalLinks

      config.autoload_paths << File.join(config.root, 'lib')
      config.i18n.load_path += Dir[config.root.join('config', 'locales', '**', '*.yml').to_s]
    end
  end
end
