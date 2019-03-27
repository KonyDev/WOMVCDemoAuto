define([],function(){
	var mappings = {
		"WorkOrderId" : "WorkOrderId",
		"WorkImagesId" : "WorkImagesId",
		"ImageBlob" : "ImageBlob",
		"UploadedFrom" : "UploadedFrom",
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
		"WorkImagesId" : "number",
		"ImageBlob" : "binary",
		"UploadedFrom" : "string",
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
					"WorkImagesId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "WOMObjects",
		tableName : "media"
	};
	Object.freeze(config);
	
	return config;
})
