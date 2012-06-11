class DiveRolesController < SyncedController
  def resource
	return current_dive_club.dive_roles
  end
  
  def resourceName
	return 'dive_role'
  end
end
