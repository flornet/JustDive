JustDive.LocalToRemoteDataSync = JustDive.Object.extend({
	resources: 			['diver'],
	historyResource: 	'syncOperation',
	local: {
		adapter: ''
	},
	remote: {
		adapter: ''
	}
	
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
				On récupére les changements (INSERT/UPDATE) dans chaque Store/Table() grace à "sync_operations"
					UCID : géré par le serveur; stoqué dans localStorage
					Table "sync_operations" sur le serveur:
					[APP_KEY]			[TABLE]		[CREATED_AT] (remote time)
					UCID_0000001		DIVER		2012-05-28 12:21:33
					UCID_0000001		EVENT		2012-05-28 12:27:33
					
				On cherche les suppression (DELETE) en faisant un diff entre les []d'ids Local et Remote
				On inscris une ligne dans "sync_operations" local et remote
		*/
})