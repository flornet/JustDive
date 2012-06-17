#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.Boats = JustDive.Resource.Controller.Synced.extend({
  resourceType: JustDive.Models.Boat
});