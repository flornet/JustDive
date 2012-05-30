Ember.ResourceAdapter = Ember.Mixin.create({
	mode: 'local',
	
    _resourceRequest: function(params, addToSyncCue) {
      params.dataType = 'json';
	  
	  if (params.url === undefined) {
		params.url = this._resourceUrl();
	  }

	  if (addToSyncCue === undefined) {
		addToSyncCue = true;
	  }
	  
      if (this._prepareResourceRequest !== undefined) {
        this._prepareResourceRequest(params);
      }
	  
	  switch(this.get('mode')) {
		case 'remote':
			return this._remoteRequest(params);
		case 'local':
		default:
			return this._localRequest(params, addToSyncCue);
	  }
    },
	
	setAdapter: function(mode) {
		if (mode == 'local') {
			this.set('mode', 'local');
		}
		if (mode == 'remote') {
			this.set('mode', 'remote');
		}
	},
	
	_localRequest: function(params, addToSyncCue) {
		if (addToSyncCue === undefined) {
			addToSyncCue = true;
		}
		return JustDive.resourceAdapters.local.request(params)
			   	.done(function(json, old_data) {
					if (addToSyncCue) {
						JustDive.syncCue.pushRequest(params, json, old_data);
					}
		});
	},
	
	_remoteRequest: function(params) {
		return JustDive.resourceAdapters.remote.request(params);
	},
	
	truc: function() {
		/*
		1. OnLocalRequestDone() : cue->pushRequest()

		2. While (!cue.empty) : cue->execRequest()->popRequest()
			
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