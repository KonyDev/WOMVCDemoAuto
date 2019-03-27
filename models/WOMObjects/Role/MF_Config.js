define([],function(){
	var mappings = {
		"RoleId" : "RoleId",
		"RoleName" : "RoleName",
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
		"RoleId" : "string",
		"RoleName" : "string",
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
					"RoleId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "WOMObjects",
		tableName : "Role"
	};
	Object.freeze(config);
	
	return config;
})
