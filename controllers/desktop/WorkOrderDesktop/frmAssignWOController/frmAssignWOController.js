define({

  selWorkOrder : "",
  selTechnician : "",
  technicians :"",
  roles:"",

  /****************************************************************
     *	Name	:	onNavigate
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/
  onNavigate : function(data){
    var controllerScope = this;
    controllerScope.view.segWOList.removeAll();
    controllerScope.selWorkOrder = data;
    this.fetchTechnicians();

  },

  /****************************************************************
     *	Name	:	fetchTechnicians
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchTechnicians:function(){
    var controllerScope = this;
    kony.print("in fetchTechnicians");
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.technicians=response;
        controllerScope.fetchRoles();
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Technician");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
    technicianModel.getAll(successCB.bind(this), {'access' : 'online'}, options);


  },


  /****************************************************************
     *	Name	:	onAssign
     *	Author	:	Kony
     *	Purpose	:	To assign Technician
     *****************************************************************/
  onAssign : function(data){
    var controllerScope = this;
    var techWorkord = {};
    techWorkord["TechWrkId"]=getRandBtw(TW_MIN,TW_MAX);
    techWorkord["TechId"]=this.technicians[data]['TechId'];
    techWorkord["WorkOrderId"]=this.selWorkOrder;

    this.selTechnician = this.technicians[data];

    this.createTchWrkOrd(techWorkord);
  },

  /****************************************************************
     *	Name	:	updateWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  updateWorkOrder:function(workOrder){
    var controllerScope=this;

    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ workorder updation success $$$$$$$"+JSON.stringify(response));

        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.sendNotification();
        controllerScope.navigateToForm("frmWOList");
      }
      else
      {
        kony.model.ApplicationContext.dismissLoadingScreen();
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
    var options = {'offlineObjectsOptions' : {}};
    var workOrderObj= new WorkOrderModel({"WorkOrderId":workOrder.WorkOrderId});
    workOrderObj.Status=workOrder["Status"];
    workOrderObj.update(successCB.bind(this), {'access' : 'online'}, options);
    kony.application.showLoadingScreen("LoadingSkin", "updating WorkOrder..", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
  },


  /****************************************************************
     *	Name	:	navigateToForm
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/

  navigateToForm:function(frmName){
    var controllerScope = this;
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+frmName);
      navigateObject.navigate();      

    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }
  },


  /****************************************************************
     *	Name	:	fetchRoles
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchRoles:function(){
    var controllerScope = this;
    kony.print("in fetchRoles");
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.roles=response;
        var length=controllerScope.technicians.length;
        var resObj={};
        var resList=[];
        for(var i=0;i<length;i++){
          resObj={
            "lblTcUser":{"text":controllerScope.technicians[i]["TechName"]},
            "lblTcRole":{"text":controllerScope.getRoleName(controllerScope.technicians[i]["RoleId"])},
            "lblTcEmail":{"text":controllerScope.technicians[i]["Email"]},
            "lblTcMobileNo":{"text":controllerScope.technicians[i]["PhoneNumber"]},
            "btnAssign": "Assign"   
          };
          resList.push(resObj);
        }
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.view.segWOList.removeAll();
        controllerScope.view.segWOList.addAll(resList);
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var RoleModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Role");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
    RoleModel.getAll(successCB.bind(this), {'access' : 'online'}, options);


  },



  /****************************************************************
     *	Name	:	createTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To store the backend response data.
     *****************************************************************/

  createTchWrkOrd:function(techWorkord){
    var controllerScope=this;

    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ TechWrkOrder creation success $$$$$$$"+JSON.stringify(response));


        var workOrder = {};
        workOrder["WorkOrderId"]=controllerScope.selWorkOrder;
        workOrder["Status"]=WO_ASSIGNED;

        controllerScope.updateWorkOrder(workOrder);
      }
      else
      {
        kony.model.ApplicationContext.dismissLoadingScreen();
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
    var options = {'offlineObjectsOptions' : {}};
    var techWrkOrderObj= new TechWrkOrderModel( 
      {"TechWrkId":techWorkord.TechWrkId}
    );
    techWrkOrderObj.TechId=techWorkord["TechId"];
    techWrkOrderObj.WorkOrderId=techWorkord["WorkOrderId"];
    techWrkOrderObj.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
    techWrkOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    techWrkOrderObj.save(successCB.bind(this), {'access' : 'online'}, options);      
    kony.application.showLoadingScreen("LoadingSkin", "Creating TechWrkOrder..", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
  },

  getRoleName:function(roleId){
    var controllerScope = this;
    var roleName ="";
    for(var i=0;i<controllerScope.roles.length;i++){
      if(controllerScope.roles[i]["RoleId"]==roleId){
        roleName = controllerScope.roles[i]["RoleName"];
        break;  
      }

    }
    return roleName;
  },

  /****************************************************************
     *	Name	:	sendNotification
     *	Author	:	Kony
     *	Purpose	:	To sendNotification.
     *****************************************************************/
  sendNotification: function(){
    var controllerScope = this;
    function operationSuccess(res){

      operationName =  "sendMsgNotification";
      data= {"data": "Hello, "+this.selTechnician['TechName']+"."+" "+"A new Workorder has been assigned.",
             "ufid": this.selTechnician['Email'],
             "appId":applicationID};
      headers= {"X-Kony-Authorization":res.X_Kony_Authorization};
      engagementDesk.invokeOperation(operationName, headers, data, function(res){}, function(res){});

    }
    function operationFailure(err) {
      kony.print(JSON.stringify(err));      
    }
    data= {"userid": userNameDsk,"password": passwordDsk};
    headers= {"Content-Type": CONTENT_TYPE};
    xKonyIntObjDesk.invokeOperation("getXKonyAuthorization", headers, data, operationSuccess.bind(this), operationFailure);

  }
});