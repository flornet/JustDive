if (JustDive.Controllers === undefined) JustDive.Controllers = {};

JustDive.Controllers.Divers = JustDive.SyncedResourceController.extend({
  resourceType: JustDive.models.diver
});