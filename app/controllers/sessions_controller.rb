class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_creds(user_params)
    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      render :new
    end
  end

  def destroy_current
    sesh = Session.find_by_token(session[:token])
    sesh.destroy
    session[:token] = nil
    redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
