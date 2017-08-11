# CHANGELOG

### Version 1.0.0

2017-08-11

[Compare changes](https://github.com/codevise/pageflow-internal-links/compare/0-x-stable...v1.0.0)

##### Breaking Changes

[Compare changes](https://github.com/codevise/pageflow-internal-links/compare/0-2-stable...master)

- Grid page type registration is performed by plugin call now.
  ([#11](https://github.com/codevise/pageflow-internal-links/pull/11))

  Ensure you register the plugin in your Pageflow initializer:

        config.plugin(Pageflow::InternalLinks.plugin)

  Remove manual registration of page type:

        # Delete the following line
        config.page_types.register(Pageflow::InternalLinks.grid_page_type)

- Require Pageflow 12
  ([#10](https://github.com/codevise/pageflow-internal-links/pull/10))

##### Minor Changes

- Allow custom images in list page link items
  ([#9](https://github.com/codevise/pageflow-internal-links/pull/9))
- Allow to use background video
  ([#8](https://github.com/codevise/pageflow-internal-links/pull/8))
- Rename .css.scss files to just .scss
  ([#7](https://github.com/codevise/pageflow-internal-links/pull/7))
- Add no repeat to thumbails background
  ([#6](https://github.com/codevise/pageflow-internal-links/pull/6))

See
[0-2-stable branch](https://github.com/codevise/pageflow-internal-links/blob/0-2-stable/CHANGELOG.md)
for previous changes.
