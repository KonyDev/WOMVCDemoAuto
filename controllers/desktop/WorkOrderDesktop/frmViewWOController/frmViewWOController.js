define({
  workOrders: "",
  images:[],
  imageCount:0,
  imgRecords:[],

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
    this.images=[];
    this.imageCount=0;
    this.imgRecords=[];
    for(var i=1;i<=6;i++)
    {
      this.view["img"+i].setVisibility(false);
    }
    this.view.lblWorkOrderTitle.text=data.lblWOTitle.text;
    this.view.lblDescription.text=data.lblWODesc.text;
    this.view.lblAddress.text = data.lblWOAddress.text;
    this.view.RichText09cd7b4fe87d946.text="<label style='color:#1aa3d7'>Work Order </label><label style='color:#5b5b5b'>/ "+data.lblWOTitle.text+" </label>";
    this.getImageRecords(data.workorderid.text);
  },
  getImageRecords:function(workorderid)
  {
    var queryString= setSoftDelFlag+"WorkOrderId = '"+workorderid+"'";
    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        this.imgRecords=response;
        this.getBinaryImages();
      }
      else
      {
        //         alert("Error "+ JSON.stringify(error));
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
      }
    }
    var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    //     var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
    //     mediaModel.getAll(successCB.bind(this), {'access' : 'online'}, options);
    var criteria=kony.mvc.Expression.eq("$filter","((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null)) and WorkOrderId eq "+workorderid);
    mediaModel.getByCriteria(criteria,successCB.bind(this),{'access' : 'online'});
  },

  getBinaryImages:function()
  {
    var controllerScope=this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("WOMObjects", {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject("media");
    dataObject.addField("WorkImagesId", this.imgRecords[this.imageCount].WorkImagesId);

    objSvc.getBinaryContent(
      {"dataObject":dataObject, "binaryAttrName": "ImageBlob"},
      function(imagebase64){
        if(controllerScope.imgRecords[controllerScope.imageCount].UploadedFrom=="server")
        {
          controllerScope.images.push({"isNew":false,"base64":decode(imagebase64)});
        }
        if(controllerScope.imgRecords[controllerScope.imageCount].UploadedFrom=="device")
        {
          controllerScope.images.push({"isNew":false,"base64":imagebase64});
        }
        controllerScope.imageCount++;
        if(controllerScope.imageCount<controllerScope.imgRecords.length)
        {
          controllerScope.getBinaryImages();
        }
        else
        {
          controllerScope.imageCount=0;
          var j=0;
          for(var img of controllerScope.images)
          {
            j++;
            controllerScope.view["img"+j].base64=img.base64;
            controllerScope.view["img"+j].setVisibility(true);
          }
        }
      },
      function(err){
        var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
        var pspConf = {};
        var infoAlert = kony.ui.Alert(basicConf,pspConf);
        //         alert("failed to get binary data : " + JSON.stringify(err));
      }
    );
  }

});