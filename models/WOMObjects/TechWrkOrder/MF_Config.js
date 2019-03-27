define([],function(){
	var mappings = {
		"TechWrkId" : "TechWrkId",
		"TechId" : "TechId",
		"WorkOrderId" : "WorkOrderId",
		"StartTime" : "StartTime",
		"EndTime" : "EndTime",
		"CustomCreatedDateTime" : "CustomCreatedDateTime",
		"CustomLastUpdatedDateTime" : "CustomLastUpdatedDateTime",
		"CreatedBy" : "CreatedBy",
		"LastUpdatedBy" : "LastUpdatedBy",
		"CreatedDateTime" : "CreatedDateTime",
		"LastUpdatedDateTime" : "LastUpdatedDateTime",
		"SoftDeleteFlag" : "SoftDeleteFlag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"TechWrkId" : "string",
		"TechId" : "string",
		"WorkOrderId" : "string",
		"StartTime" : "string",
		"EndTime" : "string",
		"CustomCreatedDateTime" : "date",
		"CustomLastUpdatedDateTime" : "date",
		"CreatedBy" : "string",
		"LastUpdatedBy" : "string",
		"CreatedDateTime" : "date",
		"LastUpdatedDateTime" : "date",
		"SoftDeleteFlag" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"TechWrkId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "WOMObjects",
		tableName : "TechWrkOrder"
	};
	Object.freeze(config);
	
	return config;
})
