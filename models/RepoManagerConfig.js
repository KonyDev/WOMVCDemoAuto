define([],function(){
	var repoMapping = {
		WorkOrder  : {
			model : "WOMObjects/WorkOrder/Model",
			config : "WOMObjects/WorkOrder/MF_Config",
			repository : "",
		},
		Technician  : {
			model : "WOMObjects/Technician/Model",
			config : "WOMObjects/Technician/MF_Config",
			repository : "",
		},
		Role  : {
			model : "WOMObjects/Role/Model",
			config : "WOMObjects/Role/MF_Config",
			repository : "",
		},
		TechWrkOrder  : {
			model : "WOMObjects/TechWrkOrder/Model",
			config : "WOMObjects/TechWrkOrder/MF_Config",
			repository : "",
		},
		media  : {
			model : "WOMObjects/media/Model",
			config : "WOMObjects/media/MF_Config",
			repository : "WOMObjects/media/Repository",
		},
	};
	
	return repoMapping;
})