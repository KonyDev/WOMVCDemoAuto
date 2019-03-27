define({ 

  X_Kony_Authorization:"",
  locationId:"",
  segId:"",
  campaignId:"",
  selWorkOrder:"",

  /****************************************************************
   *	Name	:	navigateToForm
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  navigateToForm: function(frmName) {
    var controllerScope = this;
    try {
      var navigateObject = new kony.mvc.Navigation("WorkOrderDesktop/"+frmName);      
      navigateObject.navigate();
    } catch (exp) {
      kony.print(JSON.stringify(exp));
    }

  },


  /****************************************************************
   *	Name	:	getLatLong
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  getLatLong: function() {
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }
      data= {"placeName": controllerScope.view.txtbxSrch.text,
             "apiKey": "AIzaSyB2d7aqp7iq_SP-arTgqvAdpChgDwqUz-E"};
      headers= {};
      getLatLongIntObjDesk.invokeOperation("getLatlngByCityName", headers, data, operationSuccess, operationFailure);

    });

  },


  /****************************************************************
   *	Name	:	setLatLong
   *	Author	:	Kony
   *	Purpose	:	To navigate to Form profile form.
   *****************************************************************/
  setLatLong: function() {
    var controllerScope = this;
    controllerScope.view.txtbxLongitude.text = "";
    controllerScope.view.txtbxLatitude.text = "";
    this.getLatLong().then(function(res){
      controllerScope.view.txtbxLatitude.text = ""+res.latlongs[0].lat;
      controllerScope.view.txtbxLongitude.text = ""+res.latlongs[0].lng;

      //set map
      var maptab=[];
      tempMap = {
        lat:res.latlongs[0].lat,
        lon:res.latlongs[0].lng,
        desc:res.latlongs[0].address,
        name:res.latlongs[0].address,
        image:"mappin.png",
        showcallout:false,
      };
      maptab.push(tempMap);  
      controllerScope.view.mapWO.locationData = maptab;
    });




  },



  onNavigate : function(data){
    var controllerScope = this;
    controllerScope.selWorkOrder = data;
    this.view.txtbxLatitude.setEnabled(false);
    this.view.txtbxLongitude.setEnabled(false);
    this.view.txtbxMiles.text = "";
    this.view.txtbxLatitude.text = "";
    this.view.txtbxLongitude.text = "";

    this.view.txtbxSrch.text = "";

  },

  onRequest : function(){
    var controllerScope = this;

    controllerScope.getXKonyPromise().then(function(res){
      controllerScope.X_Kony_Authorization =res.X_Kony_Authorization;
      controllerScope.getLocationPromise().then(function(res){
        controllerScope.locationId = res.id;
        controllerScope.getSegPromise().then(function(res){
          controllerScope.segId = res.id;
          controllerScope.getCampaignPromise().then(function(res){
            controllerScope.campaignId = res.id;
            //controllerScope.getStartCampaignPromise().then(function(res){
            kony.print("Campaign Started successfully");
            controllerScope.updateWrkOrdPromise().then(function(res){ 
              kony.print("updated workorder successfully");
              controllerScope.navigateToForm("frmWOList");

            },function(err){
              controllerScope.view.lblErrMsg.text = "Error while updating the workorder status";
              controllerScope.view.lblErrMsg.isVisible = true;
              kony.model.ApplicationContext.dismissLoadingScreen();});
            //});
          },function(err){
            controllerScope.view.lblErrMsg.text = err.message;
            controllerScope.view.lblErrMsg.isVisible = true;
            kony.model.ApplicationContext.dismissLoadingScreen();
          });
        },function(err){
          controllerScope.view.lblErrMsg.text = err.message;
          controllerScope.view.lblErrMsg.isVisible = true;
          kony.model.ApplicationContext.dismissLoadingScreen();
        });
      },function(err){
        controllerScope.view.lblErrMsg.text = err.message;
        controllerScope.view.lblErrMsg.isVisible = true;
        kony.model.ApplicationContext.dismissLoadingScreen();
      });
    },function(err){
      controllerScope.view.lblErrMsg.text = err.message;
      controllerScope.view.lblErrMsg.isVisible = true;  
      kony.model.ApplicationContext.dismissLoadingScreen();
    });

  },

  getStartCampaignPromise:function(){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }
      data= {"id": controllerScope.campaignId};
      headers= {"Content-Type": "application/json","X-Kony-Authorization": controllerScope.X_Kony_Authorization};
      engagementDesk.invokeOperation("startCampaign", headers, data, operationSuccess, operationFailure);
    });
  },



  getLocationPromise : function(){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }
      data= {"name": controllerScope.view.txtbxSrch.text+" Location"+getRandBtw(1,199999),"description": controllerScope.view.txtbxSrch.text+" Location Description"+getRandBtw(1,199999),
             "latitude": controllerScope.view.txtbxLatitude.text,
             "longitude": controllerScope.view.txtbxLongitude.text,
             "miles": controllerScope.view.txtbxMiles.text};
      headers= {"Content-Type": "application/json","X-Kony-Authorization": controllerScope.X_Kony_Authorization};
      engagementDesk.invokeOperation("addLocation", headers, data, operationSuccess, operationFailure);

    });
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
      kony.application.showLoadingScreen("LoadingSkin", "updating WorkOrder..", constants.LOADING_SCREEN_POSITION_ONLY_FULL_SCREEN, true, true, null);
      //  kony.model.ApplicationContext.showLoadingScreen("updating WorkOrder..");
      xKonyIntObjDesk.invokeOperation("getXKonyAuthorization", headers, data, operationSuccess, operationFailure);
    });
  },

  getSegPromise:function(){
    var controllerScope = this;
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }
      data= {"segName": controllerScope.view.txtbxSrch.text+" "+controllerScope.locationId+" Segment"+getRandBtw(1,199999),"locationId": controllerScope.locationId};
      headers= {"X-Kony-Authorization": controllerScope.X_Kony_Authorization,"Content-Type": "application/json"};
      engagementDesk.invokeOperation("createSegment", headers, data, operationSuccess, operationFailure);
    });
  },

  getCampaignPromise:function(){
    var controllerScope = this;
    var startEnd = this.formatTime();
    return new Promise(function(resolve,reject){
      function operationSuccess(res) {          
        resolve(res);                      
      }
      function operationFailure(err) {
        reject(err);            
      }

      data= {"name": controllerScope.view.txtbxSrch.text+" "+controllerScope.segId+" Campaign"+getRandBtw(1,199999),
             "zone": "(GMT) Coordinated Universal Time",
             "startDateStr": startEnd.start,//"06/01/2017 04:38:51 AM",
             "endDateStr": startEnd.end,//"06/30/2017 12:00:00 AM",
             "segId": controllerScope.segId,               
             "pushTitle": "New WorkOrder",
             "pushMessage": "A New workorder has been requested.",
             "appId": applicationID
            };
      headers= {"X-Kony-Authorization": controllerScope.X_Kony_Authorization,"Content-Type": "application/json"};
      engagementDesk.invokeOperation("createCampaign", headers, data, operationSuccess, operationFailure);

    });
  },

  updateWrkOrdPromise: function(){
    var controllerScope=this;
    return new Promise(function(resolve,reject){

      var workOrder = {};
      workOrder['WorkOrderId']= controllerScope.selWorkOrder;
      workOrder['Status'] = WO_REQUESTED;

      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          resolve(response);
        }
        else
        {
          reject(error);
          alert("Error "+ JSON.stringify(error));
        }
      }
      var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("WorkOrder");
      var options = {'offlineObjectsOptions' : {}};
      var workOrderObj= new technicianModel({"primaryKeys": 
                                             {"WorkOrderId":workOrder.WorkOrderId}
                                            });
      workOrderObj.Status=workOrder["Status"];
      workOrderObj.update(successCB.bind(this), {'access' : 'online'}, options);

    });
  },


  formatTime:function(){
    var ct_temp = new Date();
    var localOffset = ct_temp.getTimezoneOffset() * 60000;
    var localTime = ct_temp.getTime();
    var ct_date = localTime + localOffset;
    //----------------------------------------
    var ct = new Date(ct_date);
    var mm = ct.getMonth()+1;
    mm=mm<10 ? ("0"+mm) :mm;
    var dd = ct.getDate();
    dd=dd <10 ? ("0"+dd) : dd;
    var yyyy = ct.getFullYear();
    var hh = ct.getHours()>12 ? ct.getHours()-12:ct.getHours();
    hh=hh<10? ("0"+hh) : hh;
    var min = ct.getMinutes();
    min =min<10 ? ("0"+min) :min;
    var amPm = ct.getHours()>=12 ? "PM":"AM";

    //Calculate Start
    var start = mm+"/"+dd+"/"+yyyy+" "+hh+":"+min+":"+"00"+" "+amPm;

    //Calculate End
    ct = new Date(Math.floor(ct)+(CAMPAIGN_TIME*60*60*1000));
    hh = ct.getHours()>12 ? ct.getHours()-12:ct.getHours();
    hh=hh<10? ("0"+hh) : hh;
    amPm = ct.getHours()>=12 ? "PM":"AM";
    var end = mm+"/"+dd+"/"+yyyy+" "+hh+":"+min+":"+"00"+" "+amPm;
    //Return
    var startEnd = {};
    startEnd.start = start;
    startEnd.end = end;
    return startEnd;
  }

});