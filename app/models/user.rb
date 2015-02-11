class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true

  has_many :sessions

  def User.find_by_creds(params)
    user = User.find_by_username(params[:username])
    if user && user.is_password(params[:password])
      return user
    end
    nil
  end

  attr_reader :password
  after_initialize :ensure_session_token, :ensure_status

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCript::Password.new(self.password_digest).is_password?(password)
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def ensure_status
    self.status ||= "NORMAL"
  end

end
