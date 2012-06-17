JustDive
========

Work in progress...

Subjects:
- Rails 3.2.3,
- Ember JS,
- Offline App (HTML 5's localstorage, onOnline/onOffline),
- Google Contacts (read only)

Notes:
- Add 'this.$('input:first').focus();' on create/edit views

Diagrams:
- http://yuml.me/diagram/class/draw

// Cool Class Diagram
[Diver]1-0..*[DiveClub]
[DiveClub]0..*-1[DiveEvent]
[DiveClub]0..*-1[Boat]
[Diver]1-0..*[FfessmLevel]
[Administrator]1-0..*[DiveClub]
[AppKey]1-0..*[Administrator]
[SyncHistory]1-0..*[AppKey]
[DiveEvent]0..*-1[BoatDeparture]
[BoatDeparture]0..*-1[DiveGroup]
[BoatDeparture]1..*-1[Boat]
[DiveGroup]0..*-1[Diver]



Routes:

/home => ?
/evenements/
/evenements/mon-evenement/
/evenements/mon-evenement/mon-depart-bateau/
/evenements/mon-evenement/mon-depart-bateau/ma-palanquée/

/carnet-adresses/
/carnet-adresses/mon-contact

/club-config/
/club-config/roles/
/club-config/roles/mon-role
/club-config/bateaux/
/club-config/bateaux/mon-bateau