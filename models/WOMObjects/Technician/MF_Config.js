define([],function(){
	var mappings = {
		"TechId" : "TechId",
		"PhoneNumber" : "PhoneNumber",
		"TechName" : "TechName",
		"RoleId" : "RoleId",
		"Email" : "Email",
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
		"TechId" : "string",
		"PhoneNumber" : "string",
		"TechName" : "string",
		"RoleId" : "string",
		"Email" : "string",
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
					"TechId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "WOMObjects",
		tableName : "Technician"
	};
	Object.freeze(config);
	
	return config;
})
