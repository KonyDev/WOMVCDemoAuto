define({ 

  workOrders:"",
  technicians:"",
  techWrkOrders:"",

  navigateToForm1: function(frmName) {
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+frmName);      
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }
  },
  /****************************************************************
   *	Name	:	navigateToFormProfile
   *	Author	:	Kony
   *	Purpose	:	To navigate to the profile form.
   *****************************************************************/
  navigateToForm: function(data) {
    var controllerScope = this;

    if(data=="frmAddWO"){
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+data);
      navigateObject.navigate();
    }
    else{
      try {
        var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+data.frmName);
        if(controllerScope.workOrders[data.rowIndex]['WorkOrderId'] !== null || 
           controllerScope.workOrders[data.rowIndex]['WorkOrderId'] !== undefined)
          navigateObject.navigate(controllerScope.workOrders[data.rowIndex]['WorkOrderId']);      
        else
          navigateObject.navigate();

      } catch (exp) {
        kony.print(JSON.stringify(exp));
      }
    }
  },



  /****************************************************************
   *	Name	:	onNavigate
   *	Author	:	Kony
   *	Purpose	:	To navigate to the profile form.
   *****************************************************************/
  onNavigate: function() {
    kony.model.ApplicationContext.dismissLoadingScreen();
    kony.application.showLoadingScreen("LoadingSkin", "Fetching WorkOrders...", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
    var controllerScope = this;
    controllerScope.view.segWOList.removeAll();

    require(['WorkOrderDesktop/frmReportsWOController'],function(reportsWOController){

      Promise.all([reportsWOController.fetchAllAnyObj("Technician").then(function(technicians){
        controllerScope.technicians = technicians;
      }),
                   reportsWOController.fetchAllAnyObj("TechWrkOrder").then(function(techWrkOrders){
                     controllerScope.techWrkOrders = techWrkOrders;
                   })
                  ]).then(function(){
        controllerScope.fetchWorkOrders();

        //create a single ds containing techwrk, tech
        for(var i=0;i<controllerScope.techWrkOrders.length;i++){
          for(var j=0;j<controllerScope.technicians.length;j++){
            if(controllerScope.techWrkOrders[i]['TechId']==controllerScope.technicians[j]['TechId']){
              controllerScope.techWrkOrders[i].TechName = controllerScope.technicians[j]['TechName'];
              break;
            }
          }
        }
      });

    });


  },


  /****************************************************************
     *	Name	:	fetchWorkOrders
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/

  fetchWorkOrders:function(){
    var controllerScope = this;
    kony.print("in fetchWorkOrders");

    function successCB(status, response, error)
    {
      if(error == null || error == "" || error == undefined)
      {
        var response = response.sort(sortWOByKey('CustomCreatedDateTime',"desc"));
        kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
        controllerScope.workOrders=response;
        var length=response.length;
        var resObj={};
        var resList=[];
        var lblWOTech = "";
        var lblWOStatus="";

        var skinStatusforAwaiting = "lblSknnrmalNewWO";
        for(var i=0;i<length;i++){
          if(response[i]["Status"]==WO_ASSIGNED || response[i]["Status"]==WO_REQUESTED){
            lblWOTech = "Awaiting Acceptance...";
            skinStatusforAwaiting = "lblSknnrmalNewWOItalic";
          }
          if(response[i]["Status"]==WO_INPROGRESS || response[i].Status ==WO_COMPLETED){
            lblWOTech = controllerScope.getTechName(response[i]["WorkOrderId"]);
            skinStatusforAwaiting = "lblSknnrmalNewWO";
          }

          if(response[i]["Status"]==WO_INPROGRESS){
            if(((controllerScope.formatTime())-(controllerScope.serverUTCTime(response[i]["CustomLastUpdatedDateTime"])))/60000>OVERDUE_TIME)
            {
              lblWOStatus=WO_OVERDUE;
            }
            else
              lblWOStatus=response[i]["Status"];
          }
          else
          {
            lblWOStatus=response[i]["Status"];
          }

          var skinStatus = "";

          if(response[i]["Status"] == WO_COMPLETED){
            skinStatus = "lblSknYellowBg";
          }
          else{
            skinStatus = "lblSknOrangeBg";
          }

          if(lblWOStatus == WO_OVERDUE){
            skinStatus = "lblSknRedBg";
          }

          resObj={
            "lblWOTitle":{"text":response[i]["WorkOrderTitle"]},
            "workorderid":{"text":response[i]["WorkOrderId"]},
            "lblWOStatus":{"text":lblWOStatus,"skin":skinStatus},
            "lblWODesc":{"text":response[i]["WorkOrderDesc"]},
            "lblWOAddress":{"text":response[i]["WorkOrderAddress"]},
            "lblWODate":{"text":dateTimeFormatter(response[i]["CustomCreatedDateTime"])},
            "btnAssign":{"text":"Assign"},
            "btnRequest":{"text":"Request"},
            "lblWOTech":{"text":lblWOTech,"skin":skinStatusforAwaiting},
            "template": ((response[i]["Status"] === "New") ? "flxNewWO":"flxAssignedWO")
          };
          resList.push(resObj);
        }
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.view.segWOList.widgetDataMap={"lblWOTitle":"lblWOTitle",
                                                      "lblWOStatus":"lblWOStatus",
                                                      "lblWODesc":"lblWODesc",
                                                      "lblWODate":"lblWODate",
                                                      "btnAssign":"btnAssign",
                                                      "btnRequest":"btnRequest" ,
                                                      "lblWOTech":"lblWOTech",
                                                     };
        controllerScope.view.segWOList.removeAll();
        kony.model.ApplicationContext.dismissLoadingScreen();
        controllerScope.view.segWOList.addAll(resList);
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
    var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
    WorkOrderModel.getAll(successCB.bind(this),{"access":"online"},options);

  },

  /****************************************************************
     *	Name	:	getTechName
     *	Author	:	Kony
     *	Purpose	:	To fetch Technician Name
     *****************************************************************/

  getTechName:function(workOrderId){
    for(var i=0;i<this.techWrkOrders.length;i++){
      if(this.techWrkOrders[i].WorkOrderId==workOrderId){
        return this.techWrkOrders[i].TechName;
      }
    }
    return "none";
  },


  /****************************************************************
     *	Name	:	bulkPush
     *	Author	:	Kony
     *	Purpose	:	To sendNotification.
     *****************************************************************/
  bulkPush: function(){
    var controllerScope = this;

    function operationSuccess(res) {          
      operationName =  "bulkPush";
      data= {"data": "Please submit the timesheet for the week by end of day today.","appId":applicationID};
      headers= {"X-Kony-Authorization":res.X_Kony_Authorization};
      engagementDesk.invokeOperation(operationName, headers, data, function(res){}, function(err){});

    }
    function operationFailure(err) {

    }
    data= {"userid": userNameDsk,"password": passwordDsk};
    headers= {"Content-Type": CONTENT_TYPE};
    xKonyIntObjDesk.invokeOperation("getXKonyAuthorization", headers, data, operationSuccess, operationFailure);
  },

  formatTime:function(){
    var ct_temp = new Date();
    var localOffset = ct_temp.getTimezoneOffset() * 60000;
    var localTime = ct_temp.getTime();
    var ct_date = localTime + localOffset;
    //----------------------------------------
    var ct = new Date(ct_date);
    var utclocaltime=ct.getTime();
    return ct.getTime();
  },

  serverUTCTime:function(serverTime){
    serverTime=serverTime.substring(0,serverTime.length-6);
    serverTimeSplit=serverTime.split("T");
    serverTimeDate=serverTimeSplit[0].split("-");
    serverTimeTime=serverTimeSplit[1].split(":");
    var ct_temp_server = new Date(serverTimeDate[0],serverTimeDate[1]-1,serverTimeDate[2],serverTimeTime[0],serverTimeTime[1],serverTimeTime[2]);
    return ct_temp_server.getTime();
  }


});