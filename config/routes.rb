Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :new]
  resources :sessions, only: [:new, :create] do
    delete :destroy_current, on: :collection
  end
end
