#= require ../ffessm-levels.js

JustDive.Views.FfessmLevels.List = JustDive.View.extend({
  templateName:    		'app/templates/ffessm-levels/list',
  classNames:   		['ffessm-levels-list'],
  ffessmLevelsBinding: 	'JustDive.restControllers.ffessm_levels'
});