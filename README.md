JustDive
========

Work in progress...

Subjects:
- Rails 3.2.8,
- Ember JS,
- Mobile UI (drag and drop, split layout, responsive CSS),
- Offline Web App (HTML 5's localstorage, onOnline/onOffline),
- Local To Remote Sync,
- Google Contacts (read only, custom fields).

BugFixes:
- Handle cascade delete (what happens offline?),
- UI (date picker, active menus),
- 1st load of contacts is so slow! (progress bar?).
- http://stackoverflow.com/questions/6598111/ios-web-app-disable-offset-scrolling


FeaturesRequest:
- Desktop Drag => Mobile Touch:
	- http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
	- http://www.stevefenton.co.uk/Content/Jquery-Mobile-Drag-And-Drop/
- http://colorschemedesigner.com/#5131IsYGr----
- Custom Scrollbar when browser isn't mobile: http://manos.malihu.gr/tuts/jquery_custom_scrollbar.html
- QuickCreate diveGroup on diveEventParticipant "drop",
- Revoir le initialize d'application côté JS,
- Améliorer la fonctionnalité de ré-initialisation de l'app en local,
- Mini-interface d'administration des clubs et administrateurs,
- Gestion des conflits de vesion,
- Gestion des erreurs de login,
- Gestion des erreurs,
- Gérer la synchro Google côté serveur ET par dive_club plutôt que par administrator,
- Gerer les certificats médicaux,
- Fusionner les requetes de SYNC (diff) pour limiter le nombre,
- Rendre impossible l'ajout de doublons (DiveEventParticipant),
- Update Ember.Route + Ember.Layout to match 1.0-pre.

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
