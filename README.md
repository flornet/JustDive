JustDive
========

Work in progress...

Subjects:
- Rails 3.2.3,
- Ember JS,
- Offline Web App (HTML 5's localstorage, onOnline/onOffline),
- Local To Remote Sync,
- Google Contacts (read only).

BugFixes:
- Delete cascade ( + OFFLINE ?),
- UI (date picker, active menus).

FeaturesRequest:
- Revoir le initialize d'application côté JS,
- Améliorer la fonctionnalité de ré-initialisation de l'app en local,
- Mini-interface d'administration des clubs et administrateurs,
- Gestion des conflits,
- Gestion des erreurs de login,
- Gestion des erreurs,
- Gérer la synchro Google côté serveur ET par dive_club plutôt que par administrator,
- Dans la liste des palanquées : afficher le détail pour avoir une vision globale,
- Dans le typeahead de palanquée : prioriser les plongeurs inscrits à la sortie mais non présents dans des palanquées (couleur, badge, ...), 
- Gerer les certificats,
- Fusionner les requetes de SYNC (diff) pour limiter le nombre.

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
