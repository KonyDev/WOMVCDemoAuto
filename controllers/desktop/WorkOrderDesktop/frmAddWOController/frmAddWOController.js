define({
  workOrders: "",

  fetchWorkOrders:function(){
    var controllerScope = this;
    kony.print("in fetchWorkOrders"); 

    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.restaurantList=response;
        var length=response.length;
        var resObj={};
        var resList=[];
        for(var i=0;i<length;i++){
          resObj={
            "lblTitle":{"text":response[i]["WorkOrderTitle"]},
            "lblStatus":{"text":response[i]["Status"]},
            "lblTime":{"text":response[i]["CustomCreatedDateTime"]}      				
          };
          resList.push(resObj);
        }
        controllerScope.view.segWrkOrd.removeAll();
        controllerScope.view.segWrkOrd.addAll(resList);
      }
      else
      {
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("Error "+ JSON.stringify(error));
      }
    }
    var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Technician");
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
    technicianModel.getAll(successCB.bind(this), {'access' : 'online'}, options);

  },


  /****************************************************************
   *	Name	:	navigateToFormProfile
   *	Author	:	Kony
   *	Purpose	:	To navigate to the profile form.
   *****************************************************************/
  navigateToForm: function(frmName) {
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+frmName);      
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }
  },
  onNavigate:function(data)
  {
    this.view.ImagePickDesktop.setData([]);
  },

  /****************************************************************
     *	Name	:	createWorkOrder
     *	Author	:	Kony
     *	Purpose	:	To store the backend response data.
     *****************************************************************/

  createWorkOrder:function(workOrder){
    var controllerScope=this;
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("$$$$$$$$ workorder creation success $$$$$$$"+JSON.stringify(response));
        var imagesList= this.view.ImagePickDesktop.getImages();
        for(var i=0;i<imagesList.length;i++)
        {
          if(i==imagesList.length-1)
          {
            controllerScope.uploadCompleteImages(imagesList[i],workOrder.WorkOrderId,true);
          }
          else
          {
            controllerScope.uploadCompleteImages(imagesList[i],workOrder.WorkOrderId,false);
          }
        }
      }
      else
      {
        kony.model.ApplicationContext.dismissLoadingScreen();
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        kony.print("Error "+ JSON.stringify(error));
      }
    }
    var WorkOrderModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
    var options ={};
    var workOrderObj= new WorkOrderModel({"WorkOrderId":workOrder.WorkOrderId});
    workOrderObj.WorkOrderTitle=workOrder["WorkOrderTitle"];
    workOrderObj.WorkOrderDesc=workOrder["WorkOrderDesc"];
    workOrderObj.WorkOrderAddress=workOrder["WorkOrderAddress"];
    workOrderObj.Status=workOrder["Status"];
    workOrderObj.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
    workOrderObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    workOrderObj.save(successCB.bind(this), {'access' : 'online'}, options);

    kony.application.showLoadingScreen("LoadingSkin", "Creating Workorder..", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
  },
  uploadCompleteImages:function(imageRawBytes,workId,isLastImage)
  {
    controllerScope=this;
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        kony.print("response "+ JSON.stringify(response));
        if(isLastImage)
        {
          kony.application.dismissLoadingScreen();
          controllerScope.navigateToForm("frmWOList");
        }
      }
      else
      {
        kony.print("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var options = {'offlineObjectsOptions' : {}};
    var mediaObj= new mediaModel();//{'WorkImagesId' : 123}
    mediaObj.ImageBlob=kony.convertToBase64(imageRawBytes);
    mediaObj.WorkOrderId= workId;
    mediaObj.UploadedFrom="server";
    mediaObj.CustomCreatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.CustomLastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.CreatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.LastUpdatedDateTime=getCurrentTimeForCreateUpdate();
    mediaObj.save(successCB.bind(this), {'access' : 'online'}, options); 
  }

});