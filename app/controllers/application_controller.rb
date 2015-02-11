class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  wrap_parameters false

  helper_method :current_user, :signed_in?

  def current_user
    return nil if session[:token].nil?
    @cu ||= User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    @cu = user
    session[:token] = user.reset_token!
  end

end
