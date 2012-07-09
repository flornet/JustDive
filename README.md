JustDive
========

Work in progress...

Subjects:
- Rails 3.2.3,
- Ember JS,
- Offline App (HTML 5's localstorage, onOnline/onOffline),
- Local To Remote Sync,
- Google Contacts (read only)

TODO:
- Delete cascade (OFFLINE ?),
- Gérer le diffDelete côté serveur (pas en GET),
- Revoir le initialize d'application côté JS,
- Mini-interface d'administration des clubs et administrateurs,
- Gestion des conflits,
- Gestion des erreurs de login,
- Gestion des erreurs,
- Gérer la synchro Google côté serveur ET par dive_club plutôt que par administrator

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


Unhandled errors:
- 422 	{"end_date":["can't be blank"],"start_date":["can't be blank"]} 	Lundi 9 Juillet 2012 	12h30 (9s)