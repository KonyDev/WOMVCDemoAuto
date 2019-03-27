define({ 

  onNavigate:function(){
    setSoftDelFlagVal=kony.mvc.Expression.eq('SoftDeleteFlag', false);
    this.view.txtUsername.text = "";
    this.view.txtPassword.text = "";
    this.view.lblErrMsg.text = "";

  },

  getXKonyPromise:function(){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }
      data= {"userid": userNameDsk,"password": passwordDsk};
      headers= {"Content-Type": CONTENT_TYPE};
      xKonyIntObjDesk.invokeOperation("getXKonyAuthorization", headers, data, operationSuccess, operationFailure);

    });
  },


  login:function(){
    kony.application.showLoadingScreen("LoadingSkin", "Logging in..", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
    var data = {};
    var controllerScope = this;
    userNameDsk =  data.userid = this.view.txtUsername.text;
    passwordDsk =  data.password = this.view.txtPassword.text;
    deskTopInit();
    controllerScope.getXKonyPromise().then(
      function(res){
        kony.model.ApplicationContext.dismissLoadingScreen();
        kony.application.showLoadingScreen("LoadingSkin", "Initializing application...", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
        controllerScope.navigateToForm("frmWOList");
      },
      function(err){
        controllerScope.view.lblErrMsg.text = "Invalid Credentials";
        kony.application.dismissLoadingScreen();
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.view.txtUsername.text = "";
        controllerScope.view.txtPassword.text = "";
      });
  },

  navigateToForm:function(frmName){
    var controllerScope = this; 

    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+frmName);
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }

  },

});