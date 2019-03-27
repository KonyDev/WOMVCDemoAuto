define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function mediaRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	mediaRepository.prototype = Object.create(BaseRepository.prototype);
	mediaRepository.prototype.constructor = mediaRepository;

	//For Operation 'createBinary' with service id 'createBinaryWorkImages5276'
	mediaRepository.prototype.createBinary = function(params,onCompletion){
		return mediaRepository.prototype.customVerb('createBinary',params, onCompletion);
	};
	//For Operation 'getBinary' with service id 'queryBinaryWorkImages2006'
	mediaRepository.prototype.getBinary = function(params,onCompletion){
		return mediaRepository.prototype.customVerb('getBinary',params, onCompletion);
	};
	//For Operation 'updateBinary' with service id 'updateBinaryWorkImages2511'
	mediaRepository.prototype.updateBinary = function(params,onCompletion){
		return mediaRepository.prototype.customVerb('updateBinary',params, onCompletion);
	};
	//For Operation 'deleteBinary' with service id 'deleteBinaryWorkImages9945'
	mediaRepository.prototype.deleteBinary = function(params,onCompletion){
		return mediaRepository.prototype.customVerb('deleteBinary',params, onCompletion);
	};
	
	
	return mediaRepository;
})