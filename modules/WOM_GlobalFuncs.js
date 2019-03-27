function getUTCDateToStringFun()
{
  var d = new Date();
  return d.toUTCString();
}

function getCurrentTimeForCreateUpdate()
{
  var date= new Date();
  var datestring=  date.getFullYear()+"-"+getMonthTxt(date.getMonth()+1)+"-"+getDateTxt(date.getDate())+"T"+date.toTimeString().substring(0, 8);
  function getDateTxt(i){
    if(i<10)
      return 0+i.toString();
    else 
      return i;
  }
  function getMonthTxt(i){
    if(i<10)
      return 0+i.toString();
    else 
      return i;
  }
  return datestring;
}
function getlocalTimeFromUTCDate(dateObj)
{
  var date=null;
  if(dateObj != null && dateObj != undefined)
  {
    var d = new Date(dateObj.toString());
    date=d.getTime();
  }
  return  date;
}

function dateUTCToLocalTimeFormatFun(date){
  if(date!==null)
    return date.toString().substring(5, 25)+" UTC";
  else
    return "";

}

function getlocalTimeToUTCDate(dateObj)
{
  var ct_temp = new Date(dateObj.toString());
  var localOffset = ct_temp.getTimezoneOffset() * 60000;
  var localTime = ct_temp.getTime();
  return ct_date = localTime + localOffset;

}

function dateTimeFormatter(date){
  date =  date.substring(0,date.length-6);

  var strDate = new Date((date.toString()).substring(0, 19));

  return date.substring(8,10)+" "+getMonthTxt(parseInt(date.substring(5,7)))+" "+date.substring(0,4)+
    ",  "+date.substring(11,16)+" "+"UTC";



  function getDateTxt(i){
    if(i<10)
      return 0+i.toString();
    else 
      return i;

  }

  function getMonthTxt(i){

    var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return monthArr[i];  

  }

  function getTimeTxt(str){
    var time = str.toTimeString();
    return time.substring(0,5);
  }

}


function deskTopInit(){
  var client = kony.sdk.getCurrentInstance();
  // alert(JSON.stringify(kony.os.deviceInfo()));
  engagementDesk = client.getIntegrationService(servicesNameGlobal);
  xKonyIntObjDesk = client.getIntegrationService(xKonyServiceNameDesk);
  getLatLongIntObjDesk = client.getIntegrationService(getLatLongServiceDesk);
}


function authenticate(controller,method,data){
  var client = kony.sdk.getCurrentInstance();
  authClient=client.getIdentityService(providerName);

  authClient.login(data,
                   function(response) {
    kmsObject = client.getMessagingService();
    pushIntegObj = client.getIntegrationService(servicesNameGlobal);
    if(FLAG_SUBSCRIBE){
      setPushCallbacks();
      registerPush();
    }   
    kony.model.ApplicationContext.dismissLoadingScreen();
    kony.model.ApplicationContext.showLoadingScreen("Fetching Details...");
    getTechId(controller,method,data.userid);
  }, function(error) {
    kony.model.ApplicationContext.dismissLoadingScreen();
    var alertBasic = {message:"Invalid credentials",
                      alertTitle:"Kony",
                      alertType:constants.ALERT_TYPE_ERROR};
    var alertPSP = {};
    kony.ui.Alert(alertBasic, alertPSP);
    //return false;
  }
                  );
}

function getTechId(controller,method,userid){
  var techId="";
  kony.print("In getTechId");
  var queryString =setSoftDelFlag;
  queryString = queryString+"Email = '"+userid+"'";

  function successCB(status, response, error)
  {
    if(error == null || error == "" || error == undefined)
    {
      kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
      GLB_TECH_ID = response[0]["TechId"];
      kony.model.ApplicationContext.dismissLoadingScreen();                
      controller[method]("frmHome");
    }
    else
    {
      alert("Error "+ JSON.stringify(error));
      var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
      var pspConf = {};
      var infoAlert = kony.ui.Alert(basicConf,pspConf);
    }
  }
  var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Technician");
  var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
  technicianModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
}

function getWrkOrdBsdOnTechId(controller,method,techId){
  var wrkOrdId=[];
  kony.print("In getWrkOrdBsdOnTechId");
  var queryString =setSoftDelFlag;
  queryString = queryString+'TechId = \''+techId+'\'';
  var params = {};
  function successCB(status, response, error)
  {
    if(error == null || error == "" || error == undefined)
    {
      kony.print("$$$$$$$$ fetch success $$$$$$$" + JSON.stringify(response));
      for(i=0;i<response.length;i++)
        wrkOrdId.push(response[i]["WorkOrderId"]);
      controller[method](wrkOrdId);
    }
    else
    {
      //       alert("Error "+ JSON.stringify(error));
      var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
      var pspConf = {};
      var infoAlert = kony.ui.Alert(basicConf,pspConf);
    }
  }
  var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TechWrkOrder");
  var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
  technicianModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);

}


function getRandBtw(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function calcBrackets(window)
{
  var brackets=[];
  var ll,ul,name,avg;

  if(window==="One Month"){

    var today = Math.floor(getlocalTimeToUTCDate(getUTCDateToStringFun()));
    kony.print("today@@@@"+JSON.stringify(today));

    var nob = 30;

    for(var i=0;i<nob;i++){
      ll=today-(24*60*60*1000*(i+1));
      ul=ll+23*60*60*1000+59*60*1000+59*1000;
      name= i%2==0 ? (new Date(ll)).getDate()+" "+getMonthName((new Date(ll)).getMonth()):" ";
      brackets[i]={name:name,ll:ll,ul:ul};
    }
  }

  else if(window==="Six Months"){

    var today = Math.floor(getlocalTimeToUTCDate(getUTCDateToStringFun()));
    kony.print("today@@@@"+JSON.stringify(today));
    var nob = 6;
    for(var i=0;i<nob;i++){
      ll=today-((24*60*60*1000)*((i+1)*30));
      ul=today-((24*60*60*1000)*(i*30));
      name= getMonthName((new Date(ll)).getMonth())+"'"+(new Date(ll)).getFullYear();
      brackets[i]={name:name,ll:ll,ul:ul};
    }
  }

  else if(window==="One Week"){
    var today = Math.floor(getlocalTimeToUTCDate(getUTCDateToStringFun()));

    kony.print("today@@@@"+JSON.stringify(today));

    var nob = 7;

    for(var i=0;i<nob;i++){
      ll=today-(24*60*60*1000*(i+1));
      ul = ll+23*60*60*1000+59*60*1000+59*1000;
      name = getDayName((new Date(ll)).getDay());
      brackets[i] = {name:name,ll:ll,ul:ul};
    }
  }
  else {

  }

  return brackets;
}


function getMonthName(i){
  var monthArr =     ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
  return monthArr[i];             
}


function getDayName(i){
  var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[i];
}

function clearAuthCreds(){
  GLB_TECH_ID = "";
  userName = "";
}

function setNotificationsView(scopeHome)
{
  homeController=scopeHome;
}


function sortWOByKey(keyNames,typeOfValues) {
  if(typeOfValues=="desc")
  {
    return function(a,b){
      if (a[keyNames] > b[keyNames]) return -1;
      if (a[keyNames] < b[keyNames]) return 1;
      return 0;
    }
  }
  else
  {
    return function(a,b){
      if (a[keyNames] > b[keyNames]) return 1;
      if (a[keyNames] < b[keyNames]) return -1;
      return 0;
    }
  }
}

//----- Making app Offline -----------------------------------------------------------------

function onSetupSuccess() {
  if(!ObjServiceObject){
    ObjServiceObject = new kony.sdk.KNYObjSvc("WOMObjects");
  }
  kony.model.ApplicationContext.dismissLoadingScreen();     
  performSync();
  kony.print("Setup Success");
}

function onSetupFailed() {
  kony.model.ApplicationContext.dismissLoadingScreen();     
  //   alert("Setup Failed");
  var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Try Again", alertHandler: handle2};
  var pspConf = {};
  var infoAlert = kony.ui.Alert(basicConf,pspConf);
}

function setupSync()
{
  kony.model.ApplicationContext.showLoadingScreen("Setting Up Sync...");
  kony.logger.activatePersistors(kony.logger.consolePersistor);
  kony.logger.currentLogLevel = kony.logger.logLevel.TRACE;
  KNYMobileFabric=kony.sdk.getCurrentInstance();
  KNYMobileFabric.OfflineObjects.setup({},onSetupSuccess, onSetupFailed);
} 

function performSync(){
  var options = {
    'downloadBatchSize': 50,
    'uploadBatchSize': 20
  };
  var IsDataSync=kony.store.getItem("SyncData");
  if(IsDataSync == undefined || IsDataSync == null || IsDataSync == false)
  {
    kony.model.ApplicationContext.showLoadingScreen("Syncing WorkOrders...");
    ObjServiceObject.startSync(options, onSyncSuccess.bind(this), onSyncFailure.bind(this), onSyncProgress.bind(this));
  }
}

function onSyncSuccess(){
  kony.print("Sync Succeded");
  kony.store.setItem("SyncData", true);
  this.getMediaRecordsOfNonSyncedImages();
}

function onSyncFailure(error){
  kony.model.ApplicationContext.dismissLoadingScreen();
  //   alert("Sync failed "+JSON.stringify(error));
  var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
  var pspConf = {};
  var infoAlert = kony.ui.Alert(basicConf,pspConf);
  kony.store.setItem("SyncData", false);
}

function onSyncProgress(object){
  kony.print(JSON.stringify(object));
}

function getMediaRecordsOfNonSyncedImages()
{
  var queryString= setSoftDelFlag+"(UploadedFrom <> 'device' AND UploadedFrom <> 'server')";
  function successCB(status, response, error)
  {
    if(error == null || error == "" || error == undefined)
    {
      if(response.length==0)
      {
        kony.model.ApplicationContext.dismissLoadingScreen();
        kony.print("No Images to be uploaded.");
        kony.store.setItem("SyncData", true);
        performSync();
      }
      else
      {
        uploadNonSyncedImages(response);
      }
    }
    else
    {
      kony.model.ApplicationContext.dismissLoadingScreen();
      //       alert("Error "+ JSON.stringify(error));
      var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
      var pspConf = {};
      var infoAlert = kony.ui.Alert(basicConf,pspConf);
      kony.store.setItem("SyncData", false);
    }
  }
  var mediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
  var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : queryString}};
  mediaModel.getAll(successCB.bind(this), {'access' : 'offline'}, options);
}

function uploadNonSyncedImages(imageRecords)
{
  function successCB(status, response, error)
  {
    if(error == null || error == "" || error == undefined)
    {
      kony.print("$$$$$$$$ workorder updation success $$$$$$$"+JSON.stringify(response));
      var currentImageFile = new kony.io.File(imageRecords[0].UploadedFrom);
      currentImageFile.remove(true);
      imageRecords.slice(0,1);
      if(imageRecords.length !== 0)
      {
        uploadNonSyncedImages();
      }
      else 
      {
        kony.print("syncSuccess");
        kony.model.ApplicationContext.dismissLoadingScreen();

      }
    }
    else
    {
      //       alert("Error "+ JSON.stringify(error));
      var basicConf = {message: "Seems your device is offline. Please check your network connection and try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "No Internet",yesLabel:"Ok", alertHandler: handleSyncFail};
      var pspConf = {};
      var infoAlert = kony.ui.Alert(basicConf,pspConf);
      kony.store.setItem("SyncData", false);
    }
  }
  var MediaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
  var options = {'offlineObjectsOptions' : {}};
  var mediaObj= new MediaModel({"WorkImagesId":this.imageRecords[0].WorkImagesId});
  var nonSyncedImageFile = new kony.io.File(this.imageRecords[0].UploadedFrom);
  mediaObj.ImageBlob= kony.convertToBase64(nonSyncedImageFile.read());
  mediaObj.UploadedFrom = "device";
  mediaObj.update(successCB.bind(this), {'access' : 'online'}, options);
}

//-----------------------------------------------------------------------------------------

var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function(e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function(e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t);
    return t
  },
  _utf8_encode: function(e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function(e) {
    var t = "";
    var n = 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3
      }
    }
    return t
  }
}

function decode(stringToConvert) {
  try{
    var Base64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      decode: function(e) {
        var base64String = "";
        var characterCount, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
          s = this._keyStr.indexOf(e.charAt(f++));
          o = this._keyStr.indexOf(e.charAt(f++));
          u = this._keyStr.indexOf(e.charAt(f++));
          a = this._keyStr.indexOf(e.charAt(f++));
          characterCount = s << 2 | o >> 4;
          r = (o & 15) << 4 | u >> 2;
          i = (u & 3) << 6 | a;
          base64String = base64String + String.fromCharCode(characterCount);
          if (u != 64) {
            base64String = base64String + String.fromCharCode(r);
          }
          if (a != 64) {
            base64String = base64String + String.fromCharCode(i);
          }
        }
        base64String = Base64._utf8_decode(base64String);
        return base64String;
      },
      _utf8_decode: function(e) {
        var base64String = "";
        var characterCount = 0;
        var r = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (characterCount < e.length) {
          r = e.charCodeAt(characterCount);
          if (r < 128) {
            base64String += String.fromCharCode(r);
            characterCount++;
          } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(characterCount + 1);
            base64String += String.fromCharCode((r & 31) << 6 | c2 & 63);
            characterCount += 2;
          } else {
            c2 = e.charCodeAt(characterCount + 1);
            c3 = e.charCodeAt(characterCount + 2);
            base64String += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            characterCount += 3;
          }
        }
        return base64String;
      }
    };
    if (stringToConvert !== null && stringToConvert !== undefined) {
      var returnBase64 = Base64.decode(stringToConvert);
      kony.print("blob data " + returnBase64);
      return returnBase64;
    } else {
      return null;
    }
  }
  catch(err)
  {
    kony.application.dismissLoadingScreen();
  }
}


function networkStateChangeCheck()
{
  var config = {};
  config.statusChange = function (isOnLine)
  {
    if(isOnLine)
    {
      var setupStatus= kony.store.getItem("SyncSetUp");
      if(setupStatus)
      {
        var options = {
          'downloadBatchSize': 50,
          'uploadBatchSize': 20
        };
        kony.model.ApplicationContext.showLoadingScreen("Syncing Work Orders...");
        ObjServiceObject.startSync(options, onSyncSuccess.bind(this), onSyncFailure.bind(this), onSyncProgress.bind(this));
      }
    }
    else
    {
      kony.store.setItem("SyncData", false);
    }
  }
  kony.net.setNetworkCallbacks(config);
}
