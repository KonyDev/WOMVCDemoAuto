define({ 

  reportData:"",

  /****************************************************************
   *	Name	:	onNavigate
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  onNavigate:function(){
    // alert("onnavigat"+FLAG_SUBSCRIBE);
    if(FLAG_SUBSCRIBE)
      this.view.imgSubscribe.src = "icon_switch_on.png";
    else{

    }

    if(FLAG_LOCATION)
      this.view.imgLocUpdate.src = "icon_switch_on.png";
    else
      this.view.imgLocUpdate.src = "icon_switch_off.png";

    this.view.updateStatus.text=geolocupdates;
  },


  /****************************************************************
   *	Name	:	navigateToForm
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  navigateToForm: function(frmName) {
    var controllerScope = this;
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrder/"+frmName);      
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }

  }



});