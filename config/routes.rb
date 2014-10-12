Rails.application.routes.draw do
  
  root to: "static_pages#root"
  
  #get "api/posts/:id/comments", to: "api/posts#post_comments"
  
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
  
  namespace :api, defaults: {format: :json} do 
    resources :contacts, only: [:index, :create]
    resources :messages, only: [:create]
  end
  
end
