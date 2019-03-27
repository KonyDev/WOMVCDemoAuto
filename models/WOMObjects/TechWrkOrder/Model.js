define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		TechWrkId : function(val, state){
			state['TechWrkId'] = val;
		},
		TechId : function(val, state){
			state['TechId'] = val;
		},
		WorkOrderId : function(val, state){
			state['WorkOrderId'] = val;
		},
		StartTime : function(val, state){
			state['StartTime'] = val;
		},
		EndTime : function(val, state){
			state['EndTime'] = val;
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
	function TechWrkOrder(defaultValues){
		var privateState = {};
			privateState.TechWrkId = defaultValues?(defaultValues["TechWrkId"]?defaultValues["TechWrkId"]:null):null;
			privateState.TechId = defaultValues?(defaultValues["TechId"]?defaultValues["TechId"]:null):null;
			privateState.WorkOrderId = defaultValues?(defaultValues["WorkOrderId"]?defaultValues["WorkOrderId"]:null):null;
			privateState.StartTime = defaultValues?(defaultValues["StartTime"]?defaultValues["StartTime"]:null):null;
			privateState.EndTime = defaultValues?(defaultValues["EndTime"]?defaultValues["EndTime"]:null):null;
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
				"TechWrkId" : {
					get : function(){return privateState.TechWrkId},
					set : function(val){
						setterFunctions['TechWrkId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"TechId" : {
					get : function(){return privateState.TechId},
					set : function(val){
						setterFunctions['TechId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"WorkOrderId" : {
					get : function(){return privateState.WorkOrderId},
					set : function(val){
						setterFunctions['WorkOrderId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"StartTime" : {
					get : function(){return privateState.StartTime},
					set : function(val){
						setterFunctions['StartTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"EndTime" : {
					get : function(){return privateState.EndTime},
					set : function(val){
						setterFunctions['EndTime'].call(this,val,privateState);
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
	BaseModel.isParentOf(TechWrkOrder);
	
	//Create new class level validator object
	BaseModel.Validator.call(TechWrkOrder);
	
	var registerValidatorBackup = TechWrkOrder.registerValidator;
	
	TechWrkOrder.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( TechWrkOrder.isValid(this, propName, val) ){
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
	
	TechWrkOrder.relations = relations;
	
	TechWrkOrder.prototype.isValid = function(){
		return TechWrkOrder.isValid(this);
	};
	
	TechWrkOrder.prototype.objModelName = "TechWrkOrder";
	
	return TechWrkOrder;
});