//Desktop init objects
var servicesNameGlobal="WorkOrderEngagementServices";
var xKonyServiceNameDesk = "AuthServiceForEngagement";
var getLatLongServiceDesk = "GetLatLongService";

//objectservice names
var ObjServiceObject=null;
var categoriesObj=null;

//Constants
const WO_INPROGRESS = "In Progress";
const WO_NEW = "New";
const WO_ASSIGNED = "Assigned";
const WO_COMPLETED = "Completed";
const WO_OVERDUE = "Overdue";
const WO_REQUESTED = "Requested";


//Variables for Mobile App
var kmsObject;
var pushIntegObj;
var authClient = null;
var providerName = "userstore";
var userName = "";
var GLB_TECH_ID = "";
var reportsController	="";
var homeControllerScopes	="";
var setBellValueFun;
var locationUpdateControllerScope ="";
var setSoftDelFlagVal='(SoftDeleteFlag <> 1 OR SoftDeleteFlag IS NULL)';

//Variables for Desktop App
var userNameDsk = "";
var passwordDsk = "";
var geolocupdates="Location Update";
var setSoftDelFlag='(SoftDeleteFlag <> 1 OR SoftDeleteFlag IS NULL)'+' AND ';

applicationID = "b41035ed-c6db-4609-a718-f12f1663b2b5";//appid published in engagement server
var ChartServerUrl="https://m100000012001.konycloud.com/apps/WOMVCDemo";

//Content-Type 
CONTENT_TYPE = "application/x-www-form-urlencoded";
// CONTENT_TYPE = "application/json";

//Ranges
const TW_MIN = 5000;
const TW_MAX = 6000;
const WO_MIN = 1000;
const WO_MAX = 1999;
const TC_MIN = 10000;
const TC_MAX = 19999;
const OVERDUE_TIME = 10;//overdue duration time in mins
const CAMPAIGN_TIME = 1;//campaign run time in hrs


//Flags
var FLAG_NOTIFICATION_COUNT = 0;
var FLAG_SUBSCRIBE = true;
var FLAG_LOCATION = false;
