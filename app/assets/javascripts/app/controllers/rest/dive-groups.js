#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.DiveGroups = JustDive.Resource.Controller.Synced.extend({
  resourceType: JustDive.Models.DiveGroup
});