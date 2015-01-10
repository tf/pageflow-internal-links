class RenameInternalLinksPageType < ActiveRecord::Migration
  def up
    execute(<<-SQL)
      UPDATE pageflow_pages SET template = 'internal_links_grid' WHERE tempalte = 'internal_links'
    SQL
  end

  def down
    execute(<<-SQL)
      UPDATE pageflow_pages SET template = 'internal_links' WHERE tempalte = 'internal_links_grid'
    SQL
  end
end
