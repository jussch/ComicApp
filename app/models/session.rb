class Session < ActiveRecord::Base
  validates :user, :token, presence: true

  belongs_to :user

  def Session.generate(user)
    token = SecureRandom.urlsafe_base64(24)
    session = user.sessions.new(token: token)
    session.save!
    session
  end

end
