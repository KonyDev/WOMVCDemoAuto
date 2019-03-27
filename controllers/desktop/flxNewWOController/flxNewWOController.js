define({ 
 
  /***************************************************************************************
   *	Name	:	assignWO
   *	Author	:	Kony
   *	Purpose	:	To assignWO.
   ***************************************************************************************/
	assignWO:function(widget, context){
		//kony.print("widget :"+JSON.stringify(widget));
  		//kony.print("context :"+JSON.stringify(context));
         context.frmName = "frmAssignWO";
      	this.executeOnParent("navigateToForm",context);
	},
  
    requestWO:function(widget, context){
      context.frmName="frmRequestWO";
      this.executeOnParent("navigateToForm",context);
    }
 
 });