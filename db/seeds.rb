# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

diveClub = DiveClub.create({ :name => 'Atlantide plongée'})
Administrator.create([{ :email => 'atlantideplongee@gmail.com', :firstname => 'Arnaud', :lastname => 'Baudouin', :dive_club_id => diveClub.id}])
FfessmLevel.create([
                    { :name => 'Inconnu', :dive_club_id => diveClub.id},
					{ :name => 'P1', :dive_club_id => diveClub.id}, 
                    { :name => 'P2', :dive_club_id => diveClub.id},
                    { :name => 'P3', :dive_club_id => diveClub.id},
                    { :name => 'P4', :dive_club_id => diveClub.id},
                    { :name => 'P5', :dive_club_id => diveClub.id},
					{ :name => 'E1', :dive_club_id => diveClub.id},
                    { :name => 'E2', :dive_club_id => diveClub.id},
                    { :name => 'E3', :dive_club_id => diveClub.id}
                    ])