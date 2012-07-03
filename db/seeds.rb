# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

FfessmLevel.create([
                    { :name => 'Inconnu'},
					{ :name => 'Niveau 1'}, 
                    { :name => 'Niveau 2'},
                    { :name => 'Niveau 3'},
                    { :name => 'Niveau 4'},
                    { :name => 'Niveau 5'},
                    ])
diveClub = DiveClub.create({ :name => 'Atlantide plongée'})
Administrator.create([{ :email => 'atlantideplongee@gmail.com', :firstname => 'Arnaud', :lastname => 'Baudouin', :dive_club_id => diveClub.id}])