class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  wrap_parameters false

  helper_method :current_user, :signed_in?

  def current_user
    sesh = Session.find_by_token(session[:token])
    return nil unless sesh
    @cu ||= sesh.user
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    @cu = user
    session[:token] = Session.generate(@cu).token
  end

end
