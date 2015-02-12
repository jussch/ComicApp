class Comic < ActiveRecord::Base
  validates :title, :author_id, presence: true

  has_attached_file :file, default_url: "missing_game.jpg"
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id
    
end
