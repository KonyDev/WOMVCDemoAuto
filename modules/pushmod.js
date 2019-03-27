//Type your code here

ksID = "";
serverURL = "";


devicePushIdTab = [];
selRowIndex = 1;
flagRegister = false;


function setPushCallbacks(){
  var callbacks = {
    onsuccessfulregistration: regSuccess,
    onfailureregistration: regError,
    onlinenotification: onlinenotification,
    offlinenotification: offlinenotification,
    onsuccessfulderegistration: deregSuccess,
    onfailurederegistration: deregFailure
  };
  kony.push.setCallbacks(callbacks);
}

function registerPush()
{
  kony.application.showLoadingScreen("sknBlockUI","Loading...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
  var config;
  if(kony.os.deviceInfo().name === "iPhone") 
  {
    config = [0, 1, 2];			
  } 
  else 
  {
    senderID="461502205816";
    kony.print("senderid---"+senderID);
    config = {senderid:senderID};
  }
  try {
    kony.push.register(config);
  }
  catch(err){
    kony.print(err);
  }
}

function regSuccess(ident) {

  var ufidvals = userName.toLowerCase();
  var deviceID = kony.os.deviceInfo().deviceid;  
  if(kony.os.deviceInfo().name === "iPhone"){
    kmsObject.register("iphone", deviceID, ident,ufidvals, registerSubscriberPushCallback, failureCallback);
  }
  else {
    kmsObject.register("androidgcm", deviceID, ident,ufidvals, registerSubscriberPushCallback, failureCallback);
  }
}


function registerSubscriberPushCallback(response) 
{
  ksID = response.id;
  kony.application.dismissLoadingScreen();
  updateLocations();
}


function regError(error) 
{
  //alert(JSON.stringify(error));
  kony.application.dismissLoadingScreen();
  kony.ui.Alert({
    message: JSON.stringify(error.errormessage),//"Error in connecting. Please try again later" ,
    alertType: constants.ALERT_TYPE_INFO,
    alertTitle: "Kony",
    yesLabel: "Ok",
    noLabel: "Cancel",
    alertHandler: function(){
    }
  }, {});
}

function onlinenotification(pushMsg) {
  if(kony.os.deviceInfo().name=="android")
  {
    if(pushMsg.hasOwnProperty("gcm.notification.body"))
      promotionPushNameId=pushMsg["gcm.notification.body"];
    else if(pushMsg.hasOwnProperty("content"))
      promotionPushNameId=pushMsg["content"];
    if(promotionPushNameId==="Please submit the timesheet for the week by end of day today.")
    {}
    else
      FLAG_NOTIFICATION_COUNT++;
    ServiceRetailFun(promotionPushNameId);
  }
  else
  {
    if(typeof pushMsg.alert==='object')
      promotionPushNameId=pushMsg.alert.body;
    else
      promotionPushNameId=pushMsg.alert;
    pushtitle = pushMsg.alert.title;
    if(promotionPushNameId==="Please submit the timesheet for the week by end of day today.")
    {}
    else
      FLAG_NOTIFICATION_COUNT++;
    ServiceRetailFun(promotionPushNameId);
  }
}

function ServiceRetailFun(msg)
{
  pushMsg = msg;
  if(msg==="Please submit the timesheet for the week by end of day today.")
  {
    var infoAlert = kony.ui.Alert({
      message: msg,
      alertType: constants.ALERT_TYPE_INFO,
      alertTitle: "Work Order Management",
      yesLabel: "OK",
      noLabel: "Cancel",
      alertHandler: function(){
        performSyncOnNotification();
      }
    }, {});
  }  
  else{
    homeControllerScopes.setBellValue();
    var infoAlert = kony.ui.Alert({
      message: msg,
      alertType: constants.ALERT_TYPE_INFO,
      alertTitle: "Work Order Management",
      yesLabel: "OK",
      noLabel: "Cancel",
      alertHandler: function(){
        performSyncOnNotification();
      }
    }, {});}
}

function offlinenotification(pushMsg) {
  if(kony.os.deviceInfo().name=="android")
  {
    promotionPushNameId=pushMsg["content"];
    if(promotionPushNameId==="Please submit the timesheet for the week by end of day today.")
    {
    }
    else
      FLAG_NOTIFICATION_COUNT++;
    ServiceRetailFun(promotionPushNameId);			
  }
  else
  {
    if(typeof pushMsg.alert==='object')
      promotionPushNameId=pushMsg.alert.body;
    else
      promotionPushNameId=pushMsg.alert;
    pushtitle = pushMsg.alert.title;
    if(promotionPushNameId==="Please submit the timesheet for the week by end of day today.")
    {}
    else
      FLAG_NOTIFICATION_COUNT++;
    ServiceRetailFun(promotionPushNameId);
  }
}

function deregisterPush() {
  kony.push.deRegister({});
}

function deregSuccess() {
  kmsObject.unregister(unregisterSubscriberPushCallback, deregfailureCallback);
}

function unregisterSubscriberPushCallback(response) {
  kony.print(JSON.stringify(response));
}

function deregFailure(error) {
  alert(JSON.stringify(error));
}

function deregfailureCallback(err){
  alert(JSON.stringify(err));
}

function failureCallback(err){
  alert(JSON.stringify(err));
}

function performSyncOnNotification(){
  var options = {
    'downloadBatchSize': 50,
    'uploadBatchSize': 20
  };
  kony.model.ApplicationContext.showLoadingScreen("Syncing Work Orders...");
  ObjServiceObject.startSync(options, onSyncSuccessNotification, onSyncFailureNotification, onSyncProgressNotification);
}

function onSyncSuccessNotification(){
  kony.model.ApplicationContext.dismissLoadingScreen();
  var frmName;
  kony.store.setItem("SyncData", true);
  if(userName == "" || GLB_TECH_ID == "")
    frmName = "frmLogin";
  else{
    frmName = "frmNotifications";
    kony.store.setItem("SyncData", false);
  }


  var navigateObject = new kony.mvc.Navigation("WorkOrder/"+frmName);
  navigateObject.navigate();

}

function onSyncFailureNotification(error){
  kony.model.ApplicationContext.dismissLoadingScreen();
  var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
  var pspConf = {};
  var infoAlert = kony.ui.Alert(basicConf,pspConf);
  kony.store.setItem("SyncData", false);
}

function handleSyncFail(response)
{
}
function onSyncProgressNotification(object){
  kony.print(JSON.stringify(object));
}
