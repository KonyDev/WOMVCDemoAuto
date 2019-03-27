function locationUpdateSuccessStatus()
{
  FLAG_LOCATION = true;
  geolocupdates="Location updated";
  if(locationUpdateControllerScope !=="")
    locationUpdateManually();
}

function locationUpdateFailureStatus()
{
  FLAG_LOCATION = false;
  geolocupdates="Location update failed";
  if(locationUpdateControllerScope !=="")
    locationUpdateManually();
}

function locationUpdateManually()
{
  if(FLAG_LOCATION)
       locationUpdateControllerScope.view.imgLocUpdate.src = "icon_switch_on.png";
     else
       locationUpdateControllerScope.view.imgLocUpdate.src = "icon_switch_off.png";
     
     locationUpdateControllerScope.view.updateStatus.text=geolocupdates;
  kony.application.dismissLoadingScreen();
}


/*****************************************************************
*   Name    : geoPosition
*   Author  : Kony
*   Purpose : The below function is to invoke 'kony.location.getCurrentPosition' API
******************************************************************/
function geoPosition()
{
    kony.print("\n\n---in geo position---\n\n");
  
  
    function geoSuccessCallBack(position)
    {
        lat =position.coords.latitude;
        lon=position.coords.longitude;
        if(lat==null)
            lat=0;
        if(lon==null)
            lon=0;
        kony.print("latitutde:-"+lat);
        kony.print("longitude:-"+lon);
        kony.application.dismissLoadingScreen();
        geolocUpdatesMobile();
          
    }
    function geoErrorCallBack(positionerror)
    {
        locationUpdateFailureStatus();
        kony.print("Error occured while retrieving the data:-\n" +"Error code:"+positionerror.code+" : "+ positionerror.message);
        kony.application.dismissLoadingScreen();
    }
    //var positionoptions1={};
    var positionoptions=new Object();
    //var positionoptions={};
    positionoptions.enablehighaccuracy=true;
    positionoptions.timeout=10000;
    positionoptions.maximumage=1000;
    watchFlag = false;
    //kony.application.showLoadingScreen("loadingscreen","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false,null);
    try
    {
        kony.location.getCurrentPosition(geoSuccessCallBack, geoErrorCallBack,positionoptions);
    }
    catch(exception)
    {
        alert("Exception is ::"+exception.message);
    }
}

function updateLocations()
{
  geoPosition();

}

function geolocUpdatesMobile()
{
   var client = kony.sdk.getCurrentInstance();
   locIntegObj = client.getIntegrationService(servicesNameGlobal);
   locIntegObj.invokeOperation("locationUpdates",{},{"ksid" : ksID,"latitude" : lat,"locname" : "work order managment","longitude" : lon},locationUpdatesSuccessCallback,locationUpdatesErrorCallback);
}

function locationUpdatesSuccessCallback(res)
{
  	  locationUpdateSuccessStatus();
}

function locationUpdatesErrorCallback(error)
{
      locationUpdateFailureStatus();
}
