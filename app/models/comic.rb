class Comic < ActiveRecord::Base
  validates :title, :author, presence: true

  has_attached_file :image, default_url: "missing_game.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

end
