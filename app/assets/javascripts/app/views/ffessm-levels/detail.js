#= require ../ffessm-levels.js

JustDive.Views.FfessmLevels.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/ffessm-levels/detail',
  classNames:   ['ffessm-level-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.FfessmLevel;
  }
});