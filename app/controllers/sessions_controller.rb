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

  def destroy
    current_user.reset_token!
    session[:token] = nil
    redirect_to new_sessions_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
