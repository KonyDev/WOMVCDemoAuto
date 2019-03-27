define({ 
  id:"",
  title : "",
  dtAssigned:"",
  dtCompleted:"",
  description:"",
  workOrder:"",
  tchWrkOrd:"",
  status:"",
  images:[],
  imageCount:0,
  imgRecords:[],
  onUnMark:function(){
    var controllerScope = this;
    var workOrder = {};
    workOrder["WorkOrderId"]=this.id;
    workOrder["Status"]= WO_NEW;
    this.updateWorkOrderPromise(workOrder).then(function(res){
      controllerScope.fetchTchWrkOrdPromise().then(function(res){
        var businessObj={};
        businessObj.record=res[0];
        businessObj.name="TechWrkOrder";
        controllerScope.removeAnyObjPromise(businessObj).then(function(res){
          controllerScope.navigateToForm("frmHome");
        });
      });
    });
  },
  /****************************************************************
     *	Name	:	updateUser
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  onMark:function(){
    var controllerScope = this;
    var workOrder = {};
    workOrder["WorkOrderId"]=this.id;
    workOrder["Status"]= this.view.btnMark.text=="MARK COMPLETE" ? WO_COMPLETED:WO_NEW;
    if(this.view.btnMark.text == "MARK COMPLETE")
      this.updateWorkOrder(workOrder);

    if(this.view.btnMark.text == "MARK INCOMPLETE"){      
      this.updateWorkOrderPromise(workOrder).then(function(res){
        controllerScope.fetchTchWrkOrdPromise().then(function(res){
          var businessObj={};
          businessObj.record=res[0];
          businessObj.name="TechWrkOrder";
          controllerScope.removeAnyObjPromise(businessObj).then(function(res){
            controllerScope.navigateToForm("frmHome");
          });

        });
      });
    }
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
        var imagesData=controllerScope.view.ImagePick.getImages();
        if(imagesData.length != 0)
        {
          for(var i=0;i<imagesData.length;i++){
            if(imagesData[i].isNew)
            {
              if(i==imagesData.length-1)
              {
                controllerScope.uploadCompleteImages(imagesData[i].rawBytes,true);
              }
              else
              {
                controllerScope.uploadCompleteImages(imagesData[i].rawBytes,false);
              }
            }
          }
        }
        else {
          controllerScope.fetchTchWrkOrd();
        }
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
    var workOrderObj= new WorkOrderModel({"WorkOrderId":workOrder.WorkOrderId});
    workOrderObj["Status"]=workOrder.Status;
    workOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    var options = {'offlineObjectsOptions' : {}};
    workOrderObj.update(successCB.bind(this), {'access' : 'offline'}, options);
  },

  uploadCompleteImages:function(imageBase64,isLastImage)
  {
    var controllerScope=this;
    var imagesDir = kony.io.FileSystem.getExternalStorageDirectoryPath()+"/SyncImages";
    var mydir= new kony.io.File(imagesDir);
    if(!mydir.exists())
      var createDir = mydir.createDirectory();
    var dateObj = new Date();
    var fileObj = new kony.io.File(imagesDir+'/'+ dateObj.getTime());
    var createFile = fileObj.createFile();
    var res = fileObj.write(imageBase64);
    function successCB(status, response, error)
    {
      kony.print(JSON.stringify(response));
      kony.print(JSON.stringify(error));
      if(error == null || error == "" || error == undefined)
      {

        kony.print("response "+ JSON.stringify(response));   // response.WorkImagesId
        if(isLastImage)
        {
          controllerScope.fetchTchWrkOrd();
        }
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {};//{'offlineObjectsOptions' : {'skipValidation' : true}};
    var mediaObj= new mediaModel();
    //     mediaObj.ImageBlob="offline";
    mediaObj.WorkOrderId= this.id;
    mediaObj.UploadedFrom=fileObj.fullPath;
    mediaObj.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.CreatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.LastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.save(successCB.bind(this), {'access' : 'offline'}, options);

  },

  /****************************************************************
     *	Name	:	updTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  updTchWrkOrd:function(techWorkord){
    var controllerScope=this;
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ TechWrkOrder updation success $$$$$$$"+JSON.stringify(response));
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.navigateToForm("frmHome");
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
    var options = {'offlineObjectsOptions' : {}};
    var techWrkOrderObj= new TechWrkOrderModel({"TechWrkId":techWorkord.TechWrkId});
    techWrkOrderObj.EndTime=techWorkord["EndTime"];
    techWrkOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    techWrkOrderObj.update(successCB.bind(this), {'access' : 'offline'}, options);
  },


  /****************************************************************
   *	Name	:	onNavigate
   *	Author	:	Kony
   *	Purpose	:	Set Workorder details.
   *****************************************************************/
  onNavigate:function(data){
    kony.model.ApplicationContext.dismissLoadingScreen();
    this.view.ImagePick.setData([]);
    if(data ===undefined || data===null)
      return;

    this.workOrder = data;
    this.id = data["WorkOrderId"];
    this.getWorkOrderImagesArray();
    this.title = data["WorkOrderTitle"];
    this.description = data["WorkOrderDesc"];
    this.address = data["WorkOrderAddress"];
    this.dtAssigned = dateUTCToLocalTimeFormatFun(data["StartTime"]); 
    this.status = data["Status"];
    if(data.Status == WO_COMPLETED)
    {
      this.dtCompleted = dateUTCToLocalTimeFormatFun(data.EndTime);
    }
    this.view.lblTitle.text = this.title;
    this.view.lblAssigned.text = this.dtAssigned;
    this.view.lblDesc.text = this.description;
    this.view.lblAdd.text = this.address;
    if(this.workOrder.Status === WO_OVERDUE)
      this.view.btnUnMark.setVisibility(true);
    else
      this.view.btnUnMark.setVisibility(false);
    this.view.btnMark.text = this.workOrder.Status == "Completed" ? "MARK INCOMPLETE" : "MARK COMPLETE";
    this.view.flxCompleted.isVisible=  this.workOrder.Status == WO_COMPLETED ? true : false;
    this.view.lblCompletedOn.text = this.dtCompleted;
  },


  /****************************************************************
   *	Name	:	navigateToForm
   *	Author	:	 Kony
   *	Purpose	:	Navigate to frmHome.
   *****************************************************************/
  navigateToForm:function(frmName){

    try{
      var navObj = new kony.mvc.Navigation("WorkOrder/"+frmName);
      navObj.navigate();
    }catch(err){
      alert(JSON.stringify(err));
    }

  },

  getWorkOrderImagesArray:function(){
    this.images=[];
    this.imageCount=0;
    this.imgRecords=[];
    var queryString= setSoftDelFlag+"WorkOrderId = '"+this.id+"'";
    kony.model.ApplicationContext.showLoadingScreen("Loading Images ...");
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        this.imgRecords=response;
        if(this.imgRecords.length>0)
        {
          this.getImage();
        }
        else
        {
          controllerScope.view.ImagePick.setData({});
          kony.application.dismissLoadingScreen();
        }
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    mediaModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

  },
  getImage:function()
  {

    controllerScope= this;
    var mediaObj = new kony.sdk.KNYObj("media");
    var options = {};
    options.primaryKeys= {"WorkImagesId":""+this.imgRecords[this.imageCount].WorkImagesId};
    options.columnName = 'ImageBlob';
    options.fileId = 'ImageBlob'+this.imgRecords[this.imageCount].WorkImagesId;
    //options.forceDownload = true; //forceDownload will download the image from online always

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
        controllerScope.view.ImagePick.setData(controllerScope.images);
        kony.application.dismissLoadingScreen();
      }
    }
    function onDownloadFailureApp (error){
      //       kony.application.dismissLoadingScreen();
      alert("Object onDownloadFailure:"+JSON.stringify(error));
    }
    if(this.imgRecords[this.imageCount].UploadedFrom != "device" && this.imgRecords[this.imageCount].UploadedFrom != "server")
    {
      var imgfile=new kony.io.File(this.imgRecords[this.imageCount].UploadedFrom);
      controllerScope.images.push({"isNew":false,"rawBytes":imgfile.read()});
      controllerScope.imageCount++;
      if(controllerScope.imageCount<controllerScope.imgRecords.length)
      {
        controllerScope.getImage();
      }
      else
      {
        controllerScope.imageCount=0;
        controllerScope.view.ImagePick.setData(controllerScope.images);
      }
    }
    else
    {
      mediaObj.getBinary(options, onFileDownloadStartedApp, onStreamDownloadCompletedApp,
                         onChunkDownloadCompletedApp, onFileDownloadCompletedApp, onDownloadFailureApp);
    }

  },

  /****************************************************************
     *	Name	:	fetchTchWrkOrd
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchTchWrkOrd:function(){
    var controllerScope = this;
    kony.print("in fetchTchWrkOrd");
    var queryString = setSoftDelFlag+"("+"WorkOrderId = '"+controllerScope.workOrder['WorkOrderId']+"')"+" AND "+"("+"TechId = '"+GLB_TECH_ID+"')";
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));

        controllerScope.tchWrkOrd = response;       
        var techWorkord = {};
        techWorkord["TechWrkId"]=response[0]["TechWrkId"];

        if(controllerScope.view.btnMark.text == "MARK COMPLETE"){
          techWorkord["EndTime"]=getCurrentTimeForCreateUpdate();
          controllerScope.updTchWrkOrd(techWorkord);
        }
        else{
          require(['frmWorkOrderController'],function(frmWorkOrderController){                
            frmWorkOrderController.dltTechWrkOrder(techWorkord).then(function(){
              controllerScope.navigateToForm("frmHome");
            });
          });
        }

      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    TechWrkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

  },


  /****************************************************************
     *	Name	:	fetchTchWrkOrdPromise
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchTchWrkOrdPromise:function(){
    var controllerScope = this;

    return new Promise(function(resolve,reject){
      kony.print("in fetchTchWrkOrd");
      var queryString = setSoftDelFlag+"("+"WorkOrderId = '"+controllerScope.workOrder['WorkOrderId']+"')"+" AND "+"("+"TechId = '"+GLB_TECH_ID+"')";

      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));

          resolve(response);

        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var TechWrkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
      TechWrkOrderModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);



    });
  },

  /****************************************************************
     *	Name	:	updateWorkOrderPromise
     *	Author	:	Kony
     *	Purpose	:	To update the existing user.
     *****************************************************************/
  updateWorkOrderPromise:function(workOrder){
    var controllerScope=this;
    return new Promise(function(resolve,reject){
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          kony.print("$$$$$$$$ workorder updation success $$$$$$$"+JSON.stringify(response));
          resolve(response);
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
      var options = {'offlineObjectsOptions' : {}};
      var workOrderObj= new WorkOrderModel({"WorkOrderId":workOrder.WorkOrderId});
      workOrderObj.Status=workOrder["Status"];
      workOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
      workOrderObj.update(successCB.bind(this), {'access' : 'offline'}, options);
    });


  },
  /****************************************************************
     *	Name	:	removeWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To remove workorder
     *****************************************************************/
  removeAnyObjPromise: function(businessObj) {
    var controllerScope=this;

    return new Promise(function(resolve,reject){
      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          resolve(response);
          kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error);
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var ObjServiceModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(businessObj.name);
      var options = {'offlineObjectsOptions' : {}};
      var ObjServiceModelObject= new ObjServiceModel({"TechWrkId":businessObj.record.TechWrkId});
      ObjServiceModelObject.remove(successCB.bind(this), {'access' : 'offline'}, options);
    });

  }

});