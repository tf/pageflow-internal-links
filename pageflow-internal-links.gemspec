# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/internal_links/version'

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-internal-links'
  spec.version       = Pageflow::InternalLinks::VERSION
  spec.authors       = ['Codevise Solutions']
  spec.email         = ['info@codevise.de']
  spec.summary       = 'Pageflow page types for linking to other pages.'
  spec.homepage      = 'https://github.com/codevise/pageflow-internal-links'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_runtime_dependency('pageflow', '~> 0.10')

  # Semantic versioning rake tasks
  spec.add_development_dependency 'semmy', '~> 0.2'
end
