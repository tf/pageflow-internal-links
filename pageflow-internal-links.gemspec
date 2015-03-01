# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-internal-links'
  spec.version       = '0.1.0'
  spec.authors       = ['Codevise Solutions']
  spec.email         = ['info@codevise.de']
  spec.summary       = 'Pageflow page types for linking to other pages.'
  spec.homepage      = ''
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_runtime_dependency('pageflow', '>= 0.8.pre')
end
