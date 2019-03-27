define([],function(){
	var mappings = {
		"WorkOrderId" : "WorkOrderId",
		"WorkOrderTitle" : "WorkOrderTitle",
		"WorkOrderDesc" : "WorkOrderDesc",
		"WorkOrderAddress" : "WorkOrderAddress",
		"Status" : "Status",
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
		"WorkOrderId" : "string",
		"WorkOrderTitle" : "string",
		"WorkOrderDesc" : "string",
		"WorkOrderAddress" : "string",
		"Status" : "string",
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
					"WorkOrderId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "WOMObjects",
		tableName : "WorkOrder"
	};
	Object.freeze(config);
	
	return config;
})
