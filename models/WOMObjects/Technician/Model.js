define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		TechId : function(val, state){
			state['TechId'] = val;
		},
		PhoneNumber : function(val, state){
			state['PhoneNumber'] = val;
		},
		TechName : function(val, state){
			state['TechName'] = val;
		},
		RoleId : function(val, state){
			state['RoleId'] = val;
		},
		Email : function(val, state){
			state['Email'] = val;
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
	function Technician(defaultValues){
		var privateState = {};
			privateState.TechId = defaultValues?(defaultValues["TechId"]?defaultValues["TechId"]:null):null;
			privateState.PhoneNumber = defaultValues?(defaultValues["PhoneNumber"]?defaultValues["PhoneNumber"]:null):null;
			privateState.TechName = defaultValues?(defaultValues["TechName"]?defaultValues["TechName"]:null):null;
			privateState.RoleId = defaultValues?(defaultValues["RoleId"]?defaultValues["RoleId"]:null):null;
			privateState.Email = defaultValues?(defaultValues["Email"]?defaultValues["Email"]:null):null;
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
				"TechId" : {
					get : function(){return privateState.TechId},
					set : function(val){
						setterFunctions['TechId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PhoneNumber" : {
					get : function(){return privateState.PhoneNumber},
					set : function(val){
						setterFunctions['PhoneNumber'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"TechName" : {
					get : function(){return privateState.TechName},
					set : function(val){
						setterFunctions['TechName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"RoleId" : {
					get : function(){return privateState.RoleId},
					set : function(val){
						setterFunctions['RoleId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Email" : {
					get : function(){return privateState.Email},
					set : function(val){
						setterFunctions['Email'].call(this,val,privateState);
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
	BaseModel.isParentOf(Technician);
	
	//Create new class level validator object
	BaseModel.Validator.call(Technician);
	
	var registerValidatorBackup = Technician.registerValidator;
	
	Technician.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Technician.isValid(this, propName, val) ){
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
	
	var relations = [
	];
	
	Technician.relations = relations;
	
	Technician.prototype.isValid = function(){
		return Technician.isValid(this);
	};
	
	Technician.prototype.objModelName = "Technician";
	
	return Technician;
});