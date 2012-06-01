#= require ../controllers.js

JustDive.Controllers.Welcome = JustDive.ArrayController.create({
  content: [],

  index: function() {
	alert('Welcome !');
  },
  
  clearLocalStorage: function() {
	localStorage.clear();
  }
});