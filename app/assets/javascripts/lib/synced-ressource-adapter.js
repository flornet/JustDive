Ember.ResourceAdapter = Ember.Mixin.create({
	mode: 'local',
	
    _resourceRequest: function(params) {
      params.url = this._resourceUrl();
      params.dataType = 'json';

      if (this._prepareResourceRequest !== undefined) {
        this._prepareResourceRequest(params);
      }
	  
	  switch(this.get('mode')) {
		case 'remote':
			return this._remoteRequest(params);
		case 'local':
		default:
			return this._localRequest(params);
	  }
	  //console.log(this._remoteRequest(params));
	  //return this._localRequest(params);
      //return this._remoteRequest(params);
    },
	
	setAdapter: function(mode) {
		if (mode == 'local') {
			this.set('mode', 'local');
		}
		if (mode == 'remote') {
			this.set('mode', 'remote');
		}
	},
	
	_localRequest: function(params) {
		return JustDive.resourceAdapters.local.request(params)
			   	.done(function(json, old_data) {
					JustDive.syncCue.pushRequest(params, json, old_data);
		});
	},
	
	_remoteRequest: function(params) {
		return JustDive.resourceAdapters.remote.request(params);
	},
	
	truc: function() {
		/*
		1. OnLocalRequestDone() : cue->pushRequest()

		2. While (!cue.empty) : cue->execRequest()->popRequest()
			On dépile dans l'ordre :
			Si POST : 
				On analyse la suite de la pile pour voir si la donnée a été modifiée par la suite;
				On propage l'objet le plus à jour;
				On met à jour la donnée avec les infos reçues (id / updated_at / created_at);
			Si PUT :
				On vérifie que OLD_DATA correspond à l'objet sur le serveur
				On propoge l'objet;
				On met à jour la donnée avec les infos reçues
			Si DELETE :
			
			If Store/Table.lastSync < Now() + Store/Table.atFrequency() :
				->Sync()
				Table locale "sync_operations"
				[TABLE]		[CREATED_AT] (local time)
				DIVER		2012-05-28 12:21:33
				EVENT		2012-05-28 12:27:33
		
		3. AtFrequency(5min) && if cue->empty? : 
				On bloque l'utilisateur (pour éviter des changements sur les données qu'on est en train de mettre à jour)
				On récupère les changements (INSERT/UPDATE) dans chaque Store/Table() grace à "sync_operations"
					UCID : généré par le serveur; stoqué dans localStorage
					Table "sync_operations" sur le serveur:
					[UCID]			[TABLE]		[CREATED_AT] (remote time)
					UCID_0000001	DIVER		2012-05-28 12:21:33
					UCID_0000001	EVENT		2012-05-28 12:27:33
					
				On cherche les suppression (DELETE) en faisant un diff entre les []d'ids Local et Remote
				On inscris une ligne dans "sync_operations" local et remote
			*/
	}
});