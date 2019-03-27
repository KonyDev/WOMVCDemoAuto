define({
  techId:"",
  workOrders: "",
  badgeCount:"",
  bcFlag : false,
  subscrFlag : true,
  tchWrkOrds: "",
  ValLength:10,
  syncBatchCount:0,
  imageRecords:[],
  syncSuccessObject:{},
  imagesUploadedFlag:false,
  /****************************************************************
     *	Name	:	fetchNotifications
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders that are Assigned to a Technician
     *****************************************************************/
  fetchNotifications:function(arr){
    var controllerScope = this;
    kony.print("in fetchNotifications");
    kony.model.ApplicationContext.dismissLoadingScreen();
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
      workOrderId = workOrderId+" AND "+ "(Status = 'Assigned')";
    }
    queryString =queryString+ workOrderId;
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.workOrders=response;
        controllerScope.navigateToForm("frmNotifications");
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    WorkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
  },

  /****************************************************************
   *	Name	:	onNavigate
   *	Author	:	Kony
   *	Purpose	:	To set the image url for the master image widget.
   *****************************************************************/
  onNavigate:function(){
    var controllerScope = this;
    homeControllerScopes = this;
    controllerScope.view.segWrkOrd.removeAll();
    kony.model.ApplicationContext.dismissLoadingScreen();
    this.getWrkOrdBsdTchIdPromise(GLB_TECH_ID).then(function(tchWrkOrders){
      controllerScope.tchWrkOrds = tchWrkOrders;
      var wrkOrdId = [];
      for(i=0;i<tchWrkOrders.length;i++)
        wrkOrdId.push(tchWrkOrders[i]["WorkOrderId"]);
      controllerScope.fetchWorkOrdersPromise(wrkOrdId).then(function(wrkOrders){
        controllerScope.workOrders = wrkOrders;
        for(var i=0;i<controllerScope.workOrders.length;i++)
          for(var j=0;j<controllerScope.tchWrkOrds.length;j++)
            if(controllerScope.workOrders[i].WorkOrderId == controllerScope.tchWrkOrds[j].WorkOrderId){
              controllerScope.workOrders[i].StartTime = controllerScope.tchWrkOrds[j].StartTime;
              controllerScope.workOrders[i].EndTime = controllerScope.tchWrkOrds[j].EndTime;             
            }

        var response = controllerScope.workOrders.sort(sortWOByKey('StartTime',"desc"));
        var length=response.length;
        var resObj={};
        var resList=[];
        if(length==0)
        {
          var infoAlert = kony.ui.Alert({
            message: "Please go to Notifications and accept one or more work orders",
            alertType: constants.ALERT_TYPE_INFO,
            alertTitle: "Work Order Management",
            yesLabel: "OK",
            noLabel: "Cancel",
            alertHandler: null
          }, {});
        }
        for(var i=0;i<length;i++){
          if(response[i]["Status"]==WO_INPROGRESS){
            if(getlocalTimeFromUTCDate(getUTCDateToStringFun()) - getlocalTimeFromUTCDate(response[i].StartTime)>OVERDUE_TIME*60*1000)
              response[i]["Status"] = WO_OVERDUE;
          }
          var skinStatus = "";
          if(response[i]["Status"] == WO_COMPLETED){
            skinStatus = "lblSknYellowBg";
          }else if(response[i]["Status"] == WO_OVERDUE){
            skinStatus = "lblSknRedBg";
          }else{
            skinStatus = "lblSknOrangeBg";
          }
          if(response[i]["WorkOrderTitle"]!=null && response[i]["WorkOrderTitle"].length>20){
            resObj={
              "lblTitle":{"text":(response[i]["WorkOrderTitle"]).substring(0, 20)+"..."},
              "lblStatus":{"text":response[i]["Status"].toUpperCase(),"skin":skinStatus},
              "lblTime":{"text":dateTimeFormatter(response[i]["CustomCreatedDateTime"])},
              "imgArrow":"icon_go.png"
            };
          }else{
            resObj={
              "lblTitle":{"text":response[i]["WorkOrderTitle"]},
              "lblStatus":{"text":response[i]["Status"].toUpperCase(),"skin":skinStatus},
              "lblTime":{"text":dateTimeFormatter(response[i]["CustomCreatedDateTime"])},
              "imgArrow":"icon_go.png"
            };
          }  
          resList.push(resObj);
        }
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.view.segWrkOrd.removeAll();
        controllerScope.view.segWrkOrd.addAll(resList);

      });

    });

  },


  /****************************************************************
   *	Name	:	navigateToForm
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  navigateToForm: function(frmName) {
    var controllerScope = this;
    try {
      // alert("navigatetoform");
      var navigateObject = new kony.mvc.Navigation("WorkOrder/"+frmName);      
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }

  },
  /****************************************************************
     *	Name	:	onRowClick
     *	Author	:	Kony
     *	Purpose	:	To Navigate to WorkOrder details form on row click of the segment.
     *****************************************************************/
  onRowClick: function() {
    var status = this.view.segWrkOrd.selectedRowItems[0].lblStatus.text;
    var index = this.view.segWrkOrd.selectedRowIndex[1];
    if (status === WO_INPROGRESS.toUpperCase() || status === WO_OVERDUE.toUpperCase()  
        || status === WO_COMPLETED.toUpperCase()){
      try {

        var navigateTofrmDetails = new kony.mvc.Navigation("WorkOrder/frmWrkOrdDetails");
        navigateTofrmDetails.navigate(this.workOrders[index]);
      } catch (exp) {
        kony.print(JSON.stringify(exp));
      }
    }
  },

  /****************************************************************
   *	Name	:	checkOverDue
   *	Author	:	Kony
   *	Purpose	:	To show the Menu of the form.
   *****************************************************************/
  checkOverDue: function checkOverDue(utcDateTime){
    var dateString = utcDateTime;
    var bound = dateString.indexOf(' ');
    var dateData = dateString.slice(0, bound).split('-');
    var timeData = dateString.slice(bound+1, -1).split(':');

    var woLclCrtDtTmInMs = Math.floor(Date.UTC(dateData[0],dateData[1]-1,
                                               dateData[2],timeData[0],
                                               timeData[1],timeData[2]));

    if((Date.now() - woLclCrtDtTmInMs)>OVERDUE_TIME*60*1000)
      return "yes";
    else
      return "no" ;    
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
      queryString =queryString+ "(TechId = '"+techId+"')";
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
          resolve(response);
        }
        else
        {
          //           alert("Error "+ JSON.stringify(error));
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                           ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error);
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
      TechWrkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
    });

  },



  /****************************************************************
     *	Name	:	fetchWorkOrdersPromise
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchWorkOrdersPromise:function(arr){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      kony.print("in fetchWorkOrders");
      var queryString =setSoftDelFlag;
      var workOrderId ="";
      if(arr.length === 1){
        workOrderId = "(WorkOrderId = '"+arr[0]+"')";
        workOrderId = workOrderId+" AND "+"((Status != 'Assigned')"+" AND "+"(Status != 'New'))";
      }
      else {
        workOrderId = "(WorkOrderId = '"+arr[0]+"')";
        for (i=1; i<arr.length; i++)          
          workOrderId = workOrderId+" OR "+"(WorkOrderId = '"+arr[i]+"')";
        workOrderId = "("+workOrderId+")"+" AND "+ "(Status != 'Assigned')"+" AND "+ "(Status != 'New')";
      }

      queryString =queryString+ workOrderId;
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
          reject(error);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
      WorkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

    });

  },

  setBellValue:function(){
    //alert("setBellValue")
    if(FLAG_NOTIFICATION_COUNT>0)
    {
      this.view.lblBadgeCount.setVisibility(true);
      this.view.lblBadgeCount.text=""+FLAG_NOTIFICATION_COUNT;
    }
    else
    {
      this.view.lblBadgeCount.text="";
      this.view.lblBadgeCount.setVisibility(false);
    }
  },
  //Harsha Changes
  performSyncHome:function(){
    this.view.flxSyncDone.setVisibility(false);
    var options = {
      'downloadBatchSize': 50,
      'uploadBatchSize': 20
    };

    this.view.flxSyncProgress.setVisibility(true);
    ObjServiceObject.startSync(options, this.onSyncSuccess1, this.onSyncFailure1, this.onSyncProgress1);
  },

  onSyncSuccess1:function(){
    kony.print("Sync Succeded");
    kony.store.setItem("SyncData", true);
    if(this.imagesUploadedFlag){
      this.view.imgCancelDone.src="done.png";
      var syncObject=this.syncSuccessObject;
      this.setUploadDownloadCount(syncObject);
    }
    else{
      this.getMediaRecordsOfNonSyncedImages();
    }
  },

  onSyncFailure1:function(error){
    //     alert("Sync failed "+JSON.stringify(error));
    this.view.flxSyncProgress.setVisibility(false);
    var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.
                     ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
    var pspConf = {};
    var infoAlert = kony.ui.Alert(basicConf,pspConf);
    kony.store.setItem("SyncData", false);
  },
  onSyncProgress1:function(object){
    kony.print(JSON.stringify(object));
    if(this.syncBatchCount<=9)
    {
      this.syncBatchCount++;
    }
    if(this.syncBatchCount<=9 && object["phase"] =="Sync" && object["state"] == "Ended")
    {
      this.startAnimation(this.syncBatchCount-1,10);
      this.syncSuccessObject = object;
    }
    else if(this.syncBatchCount <= 9)
    {
      this.startAnimation(this.syncBatchCount-1,this.syncBatchCount);
    }
    else if(this.syncBatchCount == 10 && object["phase"] =="Sync" && object["state"] == "Ended")
    {
      this.startAnimation(this.syncBatchCount-1,10);
      this.syncSuccessObject = object;
    }
  },
  getMediaRecordsOfNonSyncedImages:function()
  {
    var queryString= setSoftDelFlag+"(UploadedFrom <> 'device' AND UploadedFrom <> 'server')";
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        this.imageRecords=response;
        if(this.imageRecords.length != 0)
        {
          this.uploadNonSyncedImages();
        }
        else
        {
          this.imagesUploadedFlag=true;
          this.performSyncHome();
        }
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    mediaModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
  },
  uploadNonSyncedImages:function()
  {
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ workorder updation success $$$$$$$"+JSON.stringify(response));
        var currentImageFile = new kony.io.File(this.imageRecords[0].UploadedFrom);
        currentImageFile.remove(true);
        this.imageRecords.splice(0,1);
        if(this.imageRecords.length !== 0)
        {
          this.uploadNonSyncedImages();
        }
        else 
        {
          this.imagesUploadedFlag=true;
          this.performSyncHome();
        }
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.
                         ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var MediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {};
    var mediaObj= new MediaModel({"WorkImagesId":this.imageRecords[0].WorkImagesId});
    var nonSyncedImageFile = new kony.io.File(this.imageRecords[0].UploadedFrom);
    mediaObj.ImageBlob= kony.convertToBase64(nonSyncedImageFile.read());
    mediaObj.UploadedFrom = "device";
    mediaObj.update(successCB.bind(this), {'access' : 'online'}, options);
  },
  setUploadDownloadCount:function(data)
  {
    this.view.lblUploadedValue.text=data.totalUploadedRecords;
    this.view.lblDownloadedValue.text=data.totalDownloadedRecords;
    for(var i=0;i<10000;i++);
    this.view.flxSyncProgress.setVisibility(false);
    this.view.flxSyncDone.setVisibility(true);
    this.view.flxProgressInner.width="0%";
    this.view.imgCancelDone.src="cancel.png";
  },
  startAnimation:function(startCount,endCount){
    this.view.flxProgressInner.animate(this.getAnimationObj(startCount,endCount), this.getAnimConfig(), {
      animationStart :function(){kony.print("in animation start!!");},
      animationEnd :this.animationEndCallback
    });  
  },
  getAnimationObj:function(startCount,endCount){

    var animDefinition = 
        {
          0 : 
          {
            "width": " "+(startCount * 5) +"%"
          },
          100 : 
          {
            "width":" "+(endCount * 5) +"%"
          }
        } ;
    return kony.ui.createAnimation(animDefinition);
  },
  getAnimConfig:function(){
    var animconfig = {
      "duration":1,
      "iterationCount":1,
      "direction":kony.anim.DIRECTION_ALTERNATE,
      "delay":20,
      "fillMode":kony.anim.FILL_MODE_BOTH
    };
    return animconfig;
  },
  animationEndCallback:function(){
    kony.print("in animation end...");   
  },
});