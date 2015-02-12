class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_creds(user_params)
    if @user
      sign_in!(@user)
      render json: {notices: ["You've been signed in"]}
    else
      render json: {errors: ["Incorrect Username or Password"]}, status: 422
    end
  end

  def destroy_current
    sesh = Session.find_by_token(session[:token])
    sesh.destroy
    session[:token] = nil
    render json: {notices: ["You've been signed out"]}
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
