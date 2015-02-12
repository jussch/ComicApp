Rails.application.routes.draw do
  root "root#index"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :create] do
      get :current, on: :collection
    end
    resources :sessions, only: [:create] do
      delete :destroy_current, on: :collection
    end
    resources :comics
  end
  # resources :users, only: [:index, :show, :create, :new]
  # resources :sessions, only: [:new, :create] do
  #   delete :destroy_current, on: :collection
  # end
end
