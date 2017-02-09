module Pageflow
  module InternalLinks
    class PageLinks < Struct.new(:entry, :configuration)
      def self.deserialize(entry, configuration)
        new(entry, configuration).deserialize
      end

      def deserialize
        page_links = parse

        pages_by_perma_id = entry.pages
          .where(perma_id: page_links.map(&:target_page_id))
          .index_by(&:perma_id)

        page_links.each do |page_link|
          page_link.target_page = pages_by_perma_id[page_link.target_page_id]
        end
      end

      private

      def parse
        if configuration.key?('internal_links')
          parse_collection(configuration['internal_links'] || [])
        else
          parse_legacy_hash(configuration['linked_page_ids'] || {})
        end
      end

      def parse_collection(collection)
        collection.map do |attributes|
          PageLink.new(attributes['target_page_id'],
                       attributes['position'].to_i,
                       attributes['page_transition'],
                       attributes['description'],
                       attributes['thumbnail_image_id'])
        end.sort_by(&:position)
      end

      def parse_legacy_hash(hash)
        hash.map do |position, target_page_id|
          PageLink.new(target_page_id, (position.to_i - 1), nil, nil, nil)
        end
      end
    end

    class PageLink < Struct.new(:target_page_id,
                                :position,
                                :page_transition,
                                :optional_description,
                                :custom_thumbnail_image_id)

      attr_accessor :target_page

      def title
        target_page ? target_page.configuration['title'] : ''
      end

      def description
        optional_description.presence || target_page_description
      end

      def thumbnail_file
        custom_thumbnail_file ||
          (target_page && target_page.thumbnail_file)
      end

      def css_class
        [
          'page_link',
          custom_thumbnail_file ? 'custom_thumbnail' : 'no_custom_thumbnail'
        ].compact.join(' ')
      end

      def data_attributes
        {}.tap do |result|
          result[:page] = target_page.perma_id if target_page
          result[:page_transition] = page_transition if page_transition.present?
        end
      end

      def self.null
        new(nil, nil, nil, nil)
      end

      private

      def custom_thumbnail_file
        @custom_thumbnail_file = ImageFile.find_by_id(custom_thumbnail_image_id)
      end
      
      def target_page_description
        target_page ? target_page.configuration['description'] : ''
      end
    end
  end
end
