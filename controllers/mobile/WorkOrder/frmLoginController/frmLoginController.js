define({ 
  userid:"",

  navigateToForm: function(frmName){
    try{
      var navObj = new kony.mvc.Navigation("WorkOrder/"+frmName);
      navObj.navigate();
    }catch(err){
      alert(JSON.stringify(err));
    }
  },

  login: function(){
    controller = this;
    method = "navigateToForm";
    var data={};
    userName = this.userid = data.userid = this.view.txtUser.text;
    data.password = this.view.textPasscode.text;
    authenticate(controller,method,data);
  },

  onNavigate:function(){
    this.view.txtUser.text = "jason.murphy@kony.com";
    this.view.textPasscode.text = "Kony@123";
    locationUpdateControllerScope ="";
    geolocupdates="Location Update";
    FLAG_SUBSCRIBE = true;
    FLAG_LOCATION = false;
  },



});