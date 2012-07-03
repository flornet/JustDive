JustDive::Application.routes.draw do

  namespace :admin do 
	resources :dive_clubs
	resources :administrators
	resources :ffessm_levels
	resources :app_keys
    resources :sync_histories
	resources :divers
	resources :dive_events
	resources :dive_group_participants
  end
  
  resources :sync_histories
  
  resources :identity do
    collection do
      get     'get_token'
	  get	  'show'
      post    'create'
      delete  'destroy'
    end
  end

  resources :dive_group_participants do
	collection do
		get	'diff'
	end
  end 

  resources :dive_groups do
	collection do
		get	'diff'
	end
  end 
  
  resources :boat_departures do
	collection do
		get	'diff'
	end
  end 
  
  resources :dive_events do
	collection do
		get	'diff'
	end
  end 
  
  resources :dive_roles do
	collection do
		get	'diff'
	end
  end
  
  resources :boats do
	collection do
		get	'diff'
	end
  end

  match 'divers/sync' => 'gdata_contacts#sync_divers'
  resources :divers do
	collection do
		get	'diff'
	end
  end
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
