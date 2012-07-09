#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.DiveEventParticipants = JustDive.Resource.Controller.Synced.extend({
  resourceType: JustDive.Models.DiveEventParticipant
});