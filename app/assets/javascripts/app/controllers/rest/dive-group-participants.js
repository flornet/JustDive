#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.DiveGroupParticipants = JustDive.Resource.Controller.Synced.extend({
  resourceType: JustDive.Models.DiveGroupParticipant
});