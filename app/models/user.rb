class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :password, confirmation: true,
    unless: Proc.new { |user| user.password.blank? }
  validates :username, uniqueness: true

  has_many :sessions
  has_many :authored_comics,
    class_name: "Comic",
    foreign_key: :author_id

  def User.find_by_creds(params)
    user = User.find_by_username(params[:username])
    if user && user.is_password?(params[:password])
      return user
    end
    nil
  end

  attr_reader :password
  after_initialize :ensure_status

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_status
    self.status ||= "NORMAL"
  end

end
