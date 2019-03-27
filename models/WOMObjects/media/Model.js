define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		WorkOrderId : function(val, state){
			state['WorkOrderId'] = val;
		},
		WorkImagesId : function(val, state){
			state['WorkImagesId'] = val;
		},
		ImageBlob : function(val, state){
			state['ImageBlob'] = val;
		},
		UploadedFrom : function(val, state){
			state['UploadedFrom'] = val;
		},
		CustomCreatedDateTime : function(val, state){
			state['CustomCreatedDateTime'] = val;
		},
		CustomLastUpdatedDateTime : function(val, state){
			state['CustomLastUpdatedDateTime'] = val;
		},
		CreatedBy : function(val, state){
			state['CreatedBy'] = val;
		},
		LastUpdatedBy : function(val, state){
			state['LastUpdatedBy'] = val;
		},
		CreatedDateTime : function(val, state){
			state['CreatedDateTime'] = val;
		},
		LastUpdatedDateTime : function(val, state){
			state['LastUpdatedDateTime'] = val;
		},
		SoftDeleteFlag : function(val, state){
			state['SoftDeleteFlag'] = val;
		},
	};
	
	
	//Create the Model Class
	function media(defaultValues){
		var privateState = {};
			privateState.WorkOrderId = defaultValues?(defaultValues["WorkOrderId"]?defaultValues["WorkOrderId"]:null):null;
			privateState.WorkImagesId = defaultValues?(defaultValues["WorkImagesId"]?defaultValues["WorkImagesId"]:null):null;
			privateState.ImageBlob = defaultValues?(defaultValues["ImageBlob"]?defaultValues["ImageBlob"]:null):null;
			privateState.UploadedFrom = defaultValues?(defaultValues["UploadedFrom"]?defaultValues["UploadedFrom"]:null):null;
			privateState.CustomCreatedDateTime = defaultValues?(defaultValues["CustomCreatedDateTime"]?defaultValues["CustomCreatedDateTime"]:null):null;
			privateState.CustomLastUpdatedDateTime = defaultValues?(defaultValues["CustomLastUpdatedDateTime"]?defaultValues["CustomLastUpdatedDateTime"]:null):null;
			privateState.CreatedBy = defaultValues?(defaultValues["CreatedBy"]?defaultValues["CreatedBy"]:null):null;
			privateState.LastUpdatedBy = defaultValues?(defaultValues["LastUpdatedBy"]?defaultValues["LastUpdatedBy"]:null):null;
			privateState.CreatedDateTime = defaultValues?(defaultValues["CreatedDateTime"]?defaultValues["CreatedDateTime"]:null):null;
			privateState.LastUpdatedDateTime = defaultValues?(defaultValues["LastUpdatedDateTime"]?defaultValues["LastUpdatedDateTime"]:null):null;
			privateState.SoftDeleteFlag = defaultValues?(defaultValues["SoftDeleteFlag"]?defaultValues["SoftDeleteFlag"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"WorkOrderId" : {
					get : function(){return privateState.WorkOrderId},
					set : function(val){
						setterFunctions['WorkOrderId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"WorkImagesId" : {
					get : function(){return privateState.WorkImagesId},
					set : function(val){
						setterFunctions['WorkImagesId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ImageBlob" : {
					get : function(){return privateState.ImageBlob},
					set : function(val){
						setterFunctions['ImageBlob'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UploadedFrom" : {
					get : function(){return privateState.UploadedFrom},
					set : function(val){
						setterFunctions['UploadedFrom'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CustomCreatedDateTime" : {
					get : function(){return privateState.CustomCreatedDateTime},
					set : function(val){
						setterFunctions['CustomCreatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CustomLastUpdatedDateTime" : {
					get : function(){return privateState.CustomLastUpdatedDateTime},
					set : function(val){
						setterFunctions['CustomLastUpdatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CreatedBy" : {
					get : function(){return privateState.CreatedBy},
					set : function(val){
						setterFunctions['CreatedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedBy" : {
					get : function(){return privateState.LastUpdatedBy},
					set : function(val){
						setterFunctions['LastUpdatedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CreatedDateTime" : {
					get : function(){return privateState.CreatedDateTime},
					set : function(val){
						setterFunctions['CreatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedDateTime" : {
					get : function(){return privateState.LastUpdatedDateTime},
					set : function(val){
						setterFunctions['LastUpdatedDateTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"SoftDeleteFlag" : {
					get : function(){return privateState.SoftDeleteFlag},
					set : function(val){
						setterFunctions['SoftDeleteFlag'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(media);
	
	//Create new class level validator object
	BaseModel.Validator.call(media);
	
	var registerValidatorBackup = media.registerValidator;
	
	media.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( media.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	//For Operation 'createBinary' with service id 'createBinaryWorkImages5276'
	media.createBinary = function(params, onCompletion){
		return media.customVerb('createBinary', params, onCompletion);
	};
	//For Operation 'getBinary' with service id 'queryBinaryWorkImages2006'
	media.getBinary = function(params, onCompletion){
		return media.customVerb('getBinary', params, onCompletion);
	};
	//For Operation 'updateBinary' with service id 'updateBinaryWorkImages2511'
	media.updateBinary = function(params, onCompletion){
		return media.customVerb('updateBinary', params, onCompletion);
	};
	//For Operation 'deleteBinary' with service id 'deleteBinaryWorkImages9945'
	media.deleteBinary = function(params, onCompletion){
		return media.customVerb('deleteBinary', params, onCompletion);
	};
	
	var relations = [
	];
	
	media.relations = relations;
	
	media.prototype.isValid = function(){
		return media.isValid(this);
	};
	
	media.prototype.objModelName = "media";
	
	return media;
});