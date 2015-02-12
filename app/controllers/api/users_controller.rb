class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render json: {notices: ["You have been signed in"]}
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def current
    @user = current_user
    if @user
      render :show
    else
      render json: {errors: ["There is no current user"]}
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

end
