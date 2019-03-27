define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		RoleId : function(val, state){
			state['RoleId'] = val;
		},
		RoleName : function(val, state){
			state['RoleName'] = val;
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
	function Role(defaultValues){
		var privateState = {};
			privateState.RoleId = defaultValues?(defaultValues["RoleId"]?defaultValues["RoleId"]:null):null;
			privateState.RoleName = defaultValues?(defaultValues["RoleName"]?defaultValues["RoleName"]:null):null;
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
				"RoleId" : {
					get : function(){return privateState.RoleId},
					set : function(val){
						setterFunctions['RoleId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"RoleName" : {
					get : function(){return privateState.RoleName},
					set : function(val){
						setterFunctions['RoleName'].call(this,val,privateState);
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
	BaseModel.isParentOf(Role);
	
	//Create new class level validator object
	BaseModel.Validator.call(Role);
	
	var registerValidatorBackup = Role.registerValidator;
	
	Role.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Role.isValid(this, propName, val) ){
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
	
	Role.relations = relations;
	
	Role.prototype.isValid = function(){
		return Role.isValid(this);
	};
	
	Role.prototype.objModelName = "Role";
	
	return Role;
});