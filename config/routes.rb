Rails.application.routes.draw do
    mount ActionCable.server, at: '/cable'

  get 'messages/index'

  get 'messages/create'

  resources :tests
  get 'homepage/index'

  get 'homes/index'

  devise_for :users, controllers: { registrations: 'users/registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "homepage#index"
  resources :posts
  resources :postlikes
  resources :comments
  resources :commentlikes
  resources :users
  resources :relationships
  resources :industries
  resources :messages

end
