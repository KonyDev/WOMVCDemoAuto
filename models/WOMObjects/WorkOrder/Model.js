define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		WorkOrderId : function(val, state){
			state['WorkOrderId'] = val;
		},
		WorkOrderTitle : function(val, state){
			state['WorkOrderTitle'] = val;
		},
		WorkOrderDesc : function(val, state){
			state['WorkOrderDesc'] = val;
		},
		WorkOrderAddress : function(val, state){
			state['WorkOrderAddress'] = val;
		},
		Status : function(val, state){
			state['Status'] = val;
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
	function WorkOrder(defaultValues){
		var privateState = {};
			privateState.WorkOrderId = defaultValues?(defaultValues["WorkOrderId"]?defaultValues["WorkOrderId"]:null):null;
			privateState.WorkOrderTitle = defaultValues?(defaultValues["WorkOrderTitle"]?defaultValues["WorkOrderTitle"]:null):null;
			privateState.WorkOrderDesc = defaultValues?(defaultValues["WorkOrderDesc"]?defaultValues["WorkOrderDesc"]:null):null;
			privateState.WorkOrderAddress = defaultValues?(defaultValues["WorkOrderAddress"]?defaultValues["WorkOrderAddress"]:null):null;
			privateState.Status = defaultValues?(defaultValues["Status"]?defaultValues["Status"]:null):null;
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
				"WorkOrderTitle" : {
					get : function(){return privateState.WorkOrderTitle},
					set : function(val){
						setterFunctions['WorkOrderTitle'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"WorkOrderDesc" : {
					get : function(){return privateState.WorkOrderDesc},
					set : function(val){
						setterFunctions['WorkOrderDesc'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"WorkOrderAddress" : {
					get : function(){return privateState.WorkOrderAddress},
					set : function(val){
						setterFunctions['WorkOrderAddress'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status" : {
					get : function(){return privateState.Status},
					set : function(val){
						setterFunctions['Status'].call(this,val,privateState);
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
	BaseModel.isParentOf(WorkOrder);
	
	//Create new class level validator object
	BaseModel.Validator.call(WorkOrder);
	
	var registerValidatorBackup = WorkOrder.registerValidator;
	
	WorkOrder.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( WorkOrder.isValid(this, propName, val) ){
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
	
	WorkOrder.relations = relations;
	
	WorkOrder.prototype.isValid = function(){
		return WorkOrder.isValid(this);
	};
	
	WorkOrder.prototype.objModelName = "WorkOrder";
	
	return WorkOrder;
});