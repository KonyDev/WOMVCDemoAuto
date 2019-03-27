define({ 

  id:"",
  title:"",
  description:"",
  dtAssigned:"",
  status:"",  
  workOrders:"",
  selWorkOrder:"",
  images:[],
  imageCount:0,
  imgRecords:[],

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
      workOrderId = "("+workOrderId+")"+" AND "+ "(Status = 'Assigned')";
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
    kony.model.ApplicationContext.showLoadingScreen("Loading Workorders ...");

  },


  /****************************************************************
   *	Name	:	onNavigate
   *	Author	:	Kony
   *	Purpose	:	Set Workorder details.
   *****************************************************************/
  onNavigate:function(data){
    this.images=[];
    this.imageCount=0;
    this.imgRecords=[];
    kony.model.ApplicationContext.dismissLoadingScreen();
    if(data ===undefined || data===null)
      return;
    for(var i=1;i<=6;i++)
    {
      this.view["img"+i].setVisibility(false);
    }
    this.id = data["WorkOrderId"];
    this.title = data["WorkOrderTitle"];
    this.description = data["WorkOrderDesc"];
    this.address = data["WorkOrderAddress"];
    this.dtAssigned = dateTimeFormatter(data["CustomLastUpdatedDateTime"]);
    this.status = data["Status"];
    this.view.lblTitle.text = this.title;
    this.view.lblAssigned.text = this.dtAssigned;
    this.view.lblDesc.text = this.description;
    this.view.lblAdd.text = this.address;
    this.view.btnReject.text = this.status == WO_REQUESTED ? "IGNORE" : "REJECT";
    this.getWorkOrderImagesArray();
  },

  getWorkOrderImagesArray:function(){
    var queryString= setSoftDelFlag+"WorkOrderId = '"+this.id+"'";
    kony.model.ApplicationContext.showLoadingScreen("Loading Images ...");
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        this.imgRecords=response;
        this.getImage();

      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    technicianModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

  },
  getImage:function()
  {

    controllerScope= this;
    var mediaObj = new kony.sdk.KNYObj("media");
    var options = {};
    options.primaryKeys= {"WorkImagesId":""+this.imgRecords[this.imageCount].WorkImagesId};
    options.columnName = 'ImageBlob';
    options.fileId = 'ImageBlob'+this.imgRecords[this.imageCount].WorkImagesId;
    //options.forceDownload = true;

    function onFileDownloadStartedApp(blobID ){
      kony.print("Object onFileDownloadStarted"+JSON.stringify(blobID));
    }
    function onStreamDownloadCompletedApp(blobID){
      kony.print("Object onStreamDownloadCompleted" + JSON.stringify(blobID));
    }
    function onChunkDownloadCompletedApp ( blobID){
      kony.print("Object onChunkDownloadCompleted"+JSON.stringify(blobID));
    }
    function onFileDownloadCompletedApp( blobID){
      kony.application.dismissLoadingScreen();
      kony.print("Object onFileDownloadCompleted" + JSON.stringify(blobID)+", file path = "+blobID.filePath);
      var imgfile=new kony.io.File(blobID.filePath);
      if(controllerScope.imgRecords[controllerScope.imageCount].UploadedFrom=="server")
      {
        controllerScope.images.push({"isNew":false,"rawBytes":kony.convertToRawBytes(decode(kony.convertToBase64(imgfile.read())))});
      }
      if(controllerScope.imgRecords[controllerScope.imageCount].UploadedFrom=="device")
      {
        controllerScope.images.push({"isNew":false,"rawBytes":imgfile.read()});
      }
      controllerScope.imageCount++;
      if(controllerScope.imageCount<controllerScope.imgRecords.length)
      {
        controllerScope.getImage();
      }
      else
      {
        controllerScope.imageCount=0;
        var j=0;
        for(var img of controllerScope.images)
        {
          j++;
          controllerScope.view["img"+j].rawBytes=img.rawBytes;
          controllerScope.view["img"+j].setVisibility(true);
        }
        kony.application.dismissLoadingScreen();
      }
    }
    function onDownloadFailureApp (error){
      kony.application.dismissLoadingScreen();
      alert("Object onDownloadFailure");
    }
    mediaObj.getBinary(options, onFileDownloadStartedApp, onStreamDownloadCompletedApp,
                       onChunkDownloadCompletedApp, onFileDownloadCompletedApp, onDownloadFailureApp);
  },

  /****************************************************************
     *	Name	:	updateWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/

  onReject:function(){
    var controllerScope =this;
    var prevWOStatus = "";
    var workOrder = {};
    workOrder["WorkOrderId"]=this.id;
    prevWOStatus = this.status;
    workOrder["Status"]=WO_NEW;
    this.selWorkOrder = workOrder;
    if(prevWOStatus == WO_ASSIGNED){
      Promise.all([controllerScope.updateWorkOrder(controllerScope.selWorkOrder),
                   controllerScope.fetchTchWrkOrd(data).then(function(tchWrkOrd){
                     return controllerScope.dltTechWrkOrder(tchWrkOrd[0]);
                   }) ]).then(function(){
        controllerScope.navigateToForm("frmHome");
      }).catch();
    }

    if(prevWOStatus == WO_REQUESTED){
      controllerScope.navigateToForm("frmNotifications");    
    }
  },


  /****************************************************************
     *	Name	:	onAccept
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/

  onAccept:function(){
    var controllerScope = this;
    var prevWOStatus = "";
    var workOrder = {};
    prevWOStatus = this.status;
    workOrder["WorkOrderId"]=this.id;
    workOrder["Status"]=WO_INPROGRESS;
    this.selWorkOrder = workOrder;
    var techWorkord = {};
    techWorkord["TechWrkId"]=getRandBtw(TW_MIN,TW_MAX);
    techWorkord["TechId"]=GLB_TECH_ID;
    techWorkord["WorkOrderId"]=this.id;
    if(prevWOStatus == WO_ASSIGNED){
      Promise.all([controllerScope.updateWorkOrder(controllerScope.selWorkOrder),
                   controllerScope.fetchTchWrkOrd(controllerScope.selWorkOrder).then(function(tchWrkOrd){
                     tchWrkOrd[0]['StartTime']=getUTCDateToStringFun();
                     return controllerScope.updateTchWrkOrd(tchWrkOrd[0]);
                   })]).then(function(){
        controllerScope.navigateToForm("frmHome");
      }).catch();  
    }
    if(prevWOStatus == WO_REQUESTED){
      Promise.all([controllerScope.updateWorkOrder(controllerScope.selWorkOrder),
                   controllerScope.createTchWrkOrd(techWorkord)]).then(function(){
        controllerScope.navigateToForm("frmHome");
      });  
    }

  },


  /****************************************************************
     *	Name	:	updateWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/

  navigateToForm:function(frmName){
    var controllerScope = this;    
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrder/"+frmName);
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }
  },

  /****************************************************************
     *	Name	:	updateWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  updateWorkOrder: function(workOrder){
    var controllerScope=this;
    return new Promise(function(resolve,reject){
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          resolve("success");
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject("failed");
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
      var workOrderObj= new WorkOrderModel({"WorkOrderId":workOrder.WorkOrderId});
      workOrderObj.Status=workOrder.Status;
      workOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
      var options = {'offlineObjectsOptions' : {}};
      workOrderObj.update(successCB.bind(this), {'access' : 'offline'}, options);
    });
  },


  /****************************************************************
     *	Name	:	updateTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  updateTchWrkOrd: function(techWorkord){
    var controllerScope=this;
    return new Promise(function(resolve,reject){       
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          resolve("success");
        }
        else
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject("failed");
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var techWrkOrderObj= new TechWrkOrderModel({"TechWrkId":techWorkord.TechWrkId});
      techWrkOrderObj.StartTime=new Date().toUTCString();
      techWrkOrderObj.WorkOrderId=techWorkord["WorkOrderId"];
      techWrkOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
      var options = {'offlineObjectsOptions' : {}};
      techWrkOrderObj.update(successCB.bind(this), {'access' : 'offline'}, options);
    });
  },

  /****************************************************************
     *	Name	:	fetchTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders that are Assigned to a Technician
     *****************************************************************/

  fetchTchWrkOrd:function(data){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      kony.print("in fetchTchWrkOrd");
      var queryString =setSoftDelFlag;
      var workOrderId ="";
      queryString=queryString+"("+"WorkOrderId = '"+controllerScope.selWorkOrder['WorkOrderId']+"')";
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
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
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

  /****************************************************************
     *	Name	:	removeWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To remove workorder
     *****************************************************************/
  dltTechWrkOrder: function(techWrkOrder) {
    var controllerScope=this;
    return new Promise(function(resolve,reject){ 
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          resolve("Success");
        }
        else
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.
                           ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject("failed");
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var techWrkOrderObj= new TechWrkOrderModel({"TechWrkId":techWrkOrder.TechWrkId});
      var options = {'offlineObjectsOptions' : {}};
      techWrkOrderObj.remove(successCB.bind(this), {'access' : 'offline'}, options);
    });
  },

  /****************************************************************
     *	Name	:	createTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To store the backend response data.
     *****************************************************************/

  createTchWrkOrd:function(techWorkord){
    var controllerScope=this;
    techWorkord.StartTime=getUTCDateToStringFun();
    techWorkord.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
    techWorkord.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    return new Promise(function(resolve,reject){

      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          resolve(response);
        }
        else
        {
          kony.model.ApplicationContext.dismissLoadingScreen();
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var techWrkOrderObj= new TechWrkOrderModel({"TechWrkId":techWrkOrder.TechWrkId});
      techWrkOrderObj.TechId=techWrkOrder.TechId;
      techWrkOrderObj.WorkOrderId=techWrkOrder.WorkOrderId;
      techWrkOrderObj.StartTime=getUTCDateToStringFun();
      techWrkOrderObj.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
      techWrkOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
      var options = {'offlineObjectsOptions' : {}};
      techWrkOrderObj.save(successCB.bind(this), {'access' : 'offline'}, options);
    });
  }
});