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
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.required_ruby_version = '~> 2.1'

  spec.add_runtime_dependency('pageflow', '~> 12.x')

  spec.add_development_dependency 'bundler', '~> 1.0'
  spec.add_development_dependency 'rake', '~> 12.0'

  # Semantic versioning rake tasks
  spec.add_development_dependency 'semmy', '~> 0.2'
end
