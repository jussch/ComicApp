class Api::ComicsController < ApplicationController

  def show
    @comic = Comic.find(params[:id])
  end

  def index
    @comics = Comic.all
  end

  def create
    @comic = current_user.authored_comics.new(comic_params)
    if @comic.save
      render json: @comic
    else
      render json: {errors: @comic.errors.full_messages}, status: 422
    end
  end

  def destroy
    @comic = Comic.find(params[:id])
    @comic.destroy
    render json: {notices: ["Comic has been deleted"]}
  end

  def update
    @comic = Comic.find(params[:id])
    if @comic.update(comic_params)
      render json: @comic
    else
      render json: {errors: @comic.errors.full_messages}, status: 422
    end
  end

  private
  def comic_params
    params.require(:comic).permit(:title, :body, :image)
  end

end
