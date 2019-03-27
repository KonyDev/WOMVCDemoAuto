define({
  workOrders:[],


  /****************************************************************
     *	Name	:	fetchNotifications
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders that are Assigned to a Technician
     *****************************************************************/

  fetchNotifications:function(arr){
    var controllerScope = this;
    kony.print("in fetchNotifications");
    var queryString =setSoftDelFlag;
    var workOrderId ="";
    if(arr.length === 1){
      workOrderId = "(WorkOrderId = '"+arr[0]+"')";
      workOrderId = workOrderId+" AND "+"(Status = 'Assigned')";
    }
    else {
      workOrderId = "(WorkOrderId = '"+arr[0]+"')";
      for (i=1; i<arr.length; i++)          
        workOrderId = workOrderId+" OR "+"(WorkOrderId = '"+arr[i]+"')";
      workOrderId = "("+workOrderId+")"+" AND "+ "(Status = 'Assigned')";
    }

    queryString =queryString+ workOrderId;
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.workOrders.push.apply(controllerScope.workOrders,response);
        //controllerScope.navigateToForm("frmNotifications");
        controllerScope.setData();
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                         ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    WorkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

  },


  /****************************************************************
     *	Name	:	fetchNotifPromise
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders that are Assigned to a Technician
     *****************************************************************/

  fetchNotifPromise:function(arr){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      kony.print("in fetchNotifPromise");
      var queryString =setSoftDelFlag;
      var workOrderId ="";
      if(arr.length === 1){
        workOrderId = "(WorkOrderId = '"+arr[0]+"')";
        workOrderId = workOrderId+" AND "+"(Status = 'Assigned')";
      }
      else {
        workOrderId = "(WorkOrderId = '"+arr[0]+"')";
        for (i=1; i<arr.length; i++)          
          workOrderId = workOrderId+" OR "+"(WorkOrderId = '"+arr[i]+"')";
        workOrderId = "("+workOrderId+")"+" AND "+ "(Status = 'Assigned')";
      }

      queryString = queryString+workOrderId;

      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
          controllerScope.workOrders=response;
          resolve(response);
        }
        else
        {
          //           alert("Error "+ JSON.stringify(error));
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                           ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
        }
      }
      var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
      WorkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

    });

  },

  /****************************************************************
     *	Name	:	onNavigate
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders that are Assigned to a Technician
     *****************************************************************/

  onNavigate: function(){
    kony.model.ApplicationContext.dismissLoadingScreen();
    kony.model.ApplicationContext.showLoadingScreen("Fetching Notifications...");
    var controllerScope = this;
    controllerScope.workOrders = [];
    controllerScope.view.segNtfOrd.removeAll();



    this.fetchAllAnyObj("WorkOrder").then(function(workOrders){

      for(var i=0;i<workOrders.length;i++){
        if(workOrders[i].Status == WO_REQUESTED)
          controllerScope.workOrders.push(workOrders[i]);
      }   
      getWrkOrdBsdOnTechId(controllerScope,"fetchNotifications",GLB_TECH_ID);
    });         


  },



  /****************************************************************
     *	Name	:	fetchAllAnyObj
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/  
  fetchAllAnyObj:function(objName){
    var controllerScope = this;

    return new Promise(function(resolve,reject){
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          resolve(response);
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                           ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error)
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var ObjServiceModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(objName);
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
      ObjServiceModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
    });

  },


  /****************************************************************
     *	Name	:	setData
     *	Author	:	Kony
     *	Purpose	:	To Navigate to WorkOrder details form on row click of the segment.
     *****************************************************************/
  setData:function(){
    kony.model.ApplicationContext.dismissLoadingScreen();
    var controllerScope = this;
    data = this.workOrders.sort(sortWOByKey('CustomLastUpdatedDateTime',"desc"));
    var length=data.length;

    var resObj={};
    var resList=[];

    if(length==0)
    {
      var infoAlert = kony.ui.Alert({
        message: "No work orders are assigned/requested to you",
        alertType: constants.ALERT_TYPE_INFO,
        alertTitle: "Work Order Management",
        yesLabel: "OK",
        noLabel: "Cancel",
        alertHandler: null
      }, {});
    }

    for(var i=0;i<length;i++){
      if(data[i]["WorkOrderTitle"].length>30){
        resObj={
          "lblTitle":{"text":(data[i]["WorkOrderTitle"]).substring(0, 30)+"..."},      				
          "lblTime":{"text":dateTimeFormatter(data[i]["CustomLastUpdatedDateTime"])},
          "imgArrow":"icon_go.png"
        };
      }else{
        resObj={
          "lblTitle":{"text":data[i]["WorkOrderTitle"]},      				
          "lblTime":{"text":dateTimeFormatter(data[i]["CustomLastUpdatedDateTime"])},
          "imgArrow":"icon_go.png"
        };
      }
      resList.push(resObj);
    }
    controllerScope.view.segNtfOrd.removeAll();
    controllerScope.view.segNtfOrd.addAll(resList);
  },


  /****************************************************************
     *	Name	:	onRowClick
     *	Author	:	Kony
     *	Purpose	:	To Navigate to WorkOrder details form on row click of the segment.
     *****************************************************************/
  onRowClick: function() {
    kony.model.ApplicationContext.dismissLoadingScreen();
    kony.model.ApplicationContext.showLoadingScreen("Fetching WorkOrder Details...");
    var index = this.view.segNtfOrd.selectedRowIndex[1];

    try {
      var navigateTofrmDetails = new kony.mvc.Navigation("WorkOrder/frmWorkOrder");
      navigateTofrmDetails.navigate(this.workOrders[index]);
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }

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

  },


  /****************************************************************
     *	Name	:	getWrkOrdBsdTchIdPromise
     *	Author	:	 Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  getWrkOrdBsdTchIdPromise : function (techId){

    return new Promise(function(resolve,reject){
      var wrkOrdId=[];
      kony.print("In getWrkOrdBsdOnTechId");
      var queryString =setSoftDelFlag;
      queryString = queryString+"(TechId = '"+techId+"')";
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
          for(i=0;i<response.length;i++)
            wrkOrdId.push(response[i]["WorkOrderId"]);

          resolve(wrkOrdId);
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                           ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(errorResponsse);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
      TechWrkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
    });

  },
  performSyncOnNotification:function(){
    var options = {
      'downloadBatchSize': 50,
      'uploadBatchSize': 20
    };
    var IsDataSync=kony.store.getItem("SyncData");
    if(IsDataSync == undefined || IsDataSync == null || IsDataSync == false)
    {
      kony.model.ApplicationContext.showLoadingScreen("Syncing Work Orders...");
      ObjServiceObject.startSync(options, this.onSyncSuccess.bind(this), this.onSyncFailure.bind(this), this.onSyncProgress.bind(this));
    }
  },

  onSyncSuccess:function(){
    kony.model.ApplicationContext.dismissLoadingScreen();
    kony.print("Sync Succeded");
    kony.store.setItem("SyncData", true);
    this.onNavigate();
  },
  onSyncFailure:function(error){
    kony.model.ApplicationContext.dismissLoadingScreen();
    //   alert("Sync failed "+JSON.stringify(error));
    var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.
                     ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
    var pspConf = {};
    var infoAlert = kony.ui.Alert(basicConf,pspConf);
    kony.store.setItem("SyncData", false);
  },

  onSyncProgress:function(object){
    kony.print(JSON.stringify(object));
  }

});