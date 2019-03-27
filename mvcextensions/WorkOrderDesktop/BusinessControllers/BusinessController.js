define([], function () { 

    function BusinessController() { 

        kony.mvc.Business.Controller.call(this); 

    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Controller); 

    BusinessController.prototype.initializeBusinessController = function() { 

    }; 

	BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};

    return BusinessController;

});