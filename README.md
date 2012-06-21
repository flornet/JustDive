JustDive
========

Work in progress...

Subjects:
- Rails 3.2.3,
- Ember JS,
- Offline App (HTML 5's localstorage, onOnline/onOffline),
- Google Contacts (read only)

TODO:
- Add 'this.$('input:first').focus();' on create/edit views
- Synchroniser gdata on login,
- Mini-interface d'administration des clubs et administrateurs,
- Synchro des suppressions,
- Delete cascade,
- Optimisation de la queue,
- Indicateur d'activité (synchro ajax),
- Gestion des conflits,
- Gestion des erreurs,
- Synchronisation des 'divers' locaux après sync avec Google : KO,
- Bugs de perte d'ID (après créations)

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