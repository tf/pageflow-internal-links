# Pageflow Internal Links

Page types for linking to pages inside a Pageflow.

## Installation

Add this line to your application's Gemfile:

    # Gemfile
    gem 'pagflow-internal-links'

Register the page types:

    # config/initializers/pageflow.rb
    Pageflow.configure do |config|
      config.register_page_type(Pageflow::InternalLinks.grid_page_type)
    end

Include javascripts and stylesheets:

    # app/assets/javascripts/pageflow/application.js
    //= require "pageflow/internal_links"

    # app/assets/javascripts/pageflow/editor.js
    //= require pageflow/internal_links/editor

    # app/assets/stylesheets/pageflow/application.css.scss
    @import "pageflow/internal_links";

    # app/assets/stylesheets/pageflow/editor.css.scss
    @import "pageflow/internal_links/editor";

Install dependencies:

    bundle install

Copy migrations of pageflow-internal-links into your project:

    bundle exec rake pageflow_internal_links:install:migrations

Migrate the database:

    bundle exec rake db:migrate

Restart the application server.

## Troubleshooting

If you run into problems while installing the page type, please also
refer to the
[Troubleshooting](https://github.com/codevise/pageflow/wiki/Troubleshooting)
wiki page in the
[Pageflow repository](https://github.com/codevise/pageflow). If that
doesn't help, consider
[filing an issue](https://github.com/codevise/pageflow-internal-links/issues).
