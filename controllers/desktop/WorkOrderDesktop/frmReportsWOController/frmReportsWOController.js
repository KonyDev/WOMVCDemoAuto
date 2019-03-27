define({ 

  reportData:{}, 
  bracketsData:{},

  /****************************************************************
     *	Name	:	fetchAllAnyObj
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/  
  fetchAllAnyObj:function(objName){
    var controllerScope = this;

    return new Promise(function(resolve,reject){

      function successCB(status, response, error)
      {
        if(error == null || error == "" || error == undefined)
        {
          resolve(response);
        }
        else
        {
          var basicConf = {message: "Something went wrong. Please try again.",alertType: constants.ALERT_TYPE_INFO,alertTitle: "Error",yesLabel:"Ok", alertHandler: function(response){}};
          var pspConf = {};
          var infoAlert = kony.ui.Alert(basicConf,pspConf);
          reject(error)
          //           alert("Error "+ JSON.stringify(error));
        }
      }
      var technicianModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(objName);
      var options = {'offlineObjectsOptions' : {'whereConditionAsAString' : setSoftDelFlagVal}};
      technicianModel.getAll(successCB.bind(this),{"access":"online"},options);
    });

  },

  /****************************************************************
     *	Name	:	getReportData
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/
  showReport:function(techId, window){
    if(window=="none")
      window="Six Months";
    var controllerScope = this;    
    var brackets = calcBrackets(window);
    var twArr = this.reportData.twArr;

    for(var i=0;i<brackets.length;i++){
      var woCount=0;
      var totalTime = 0;
      var avg= 0;
      for(var j=0;j<twArr.length;j++){
        if(twArr[j]['Status'] == WO_COMPLETED &&  twArr[j]['TechId']==techId)
          if(twArr[j].hasOwnProperty("EndTime") && twArr[j].hasOwnProperty("StartTime"))
            if(getlocalTimeToUTCDate(twArr[j]['EndTime'])>=brackets[i]['ll'] && getlocalTimeToUTCDate(twArr[j]['EndTime']) <=brackets[i]['ul'])
            {
              woCount = woCount+1;
              totalTime = totalTime+(getlocalTimeToUTCDate(twArr[j]['EndTime'])-getlocalTimeToUTCDate(twArr[j]['StartTime']));
            }
      }
      brackets[i].woCount = woCount;
      brackets[i].totalTime = totalTime;         
      if(brackets[i]['woCount']>0)
        brackets[i].avg = brackets[i]['totalTime']/brackets[i]['woCount'];
      else
        brackets[i].avg = avg;

    }
    controllerScope.bracketsData = brackets;
    //kony.print("@brackets data@@"+JSON.stringify(controllerScope.bracketsData));

    var woCheckCount=0;
    for(var i=0;i<brackets.length;i++){
      woCheckCount=woCheckCount+brackets[i]['woCount'];
    }
    //alert("@@length@@"+controllerScope.bracketsData.length+"@@@woCheckCount@@@"+woCheckCount)
    if(woCheckCount===0){
      this.view.brwReports.htmlString="No data to display";
    }else{
      showChart();
    }
  },


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
     *	Name	:	onNavigate
     *	Author	:	Kony
     *	Purpose	:	To fetch workorders
     *****************************************************************/
  onNavigate:function(){
    var controllerScope = this;
    reportsController = this;

    Promise.all([controllerScope.fetchAllAnyObj("WorkOrder").then(function(data){
      controllerScope.reportData.workOrder = data;
    }),
                 controllerScope.fetchAllAnyObj("Role").then(function(data){
                   controllerScope.reportData.role = data;
                 }),
                 controllerScope.fetchAllAnyObj("Technician").then(function(data){
                   controllerScope.reportData.technician = data;
                 }),
                 controllerScope.fetchAllAnyObj("TechWrkOrder").then(function(data){
                   controllerScope.reportData.techWrkOrder = data;
                 })]).then(function(){

      var twArr = controllerScope.reportData.techWrkOrder;
      var woArr = controllerScope.reportData.workOrder;
      var techArr = controllerScope.reportData.technician;


      //Initialize TechniciansListBox
      /*  var lstBoxTechData =[[
            "lb1",
            "Filter by Technician"
        ]];	 */

      var lstBoxTechData =[];
      for(var i=0;i<techArr.length;i++){
        lstBoxTechData.push([techArr[i].TechId,techArr[i].TechName]);
      }





      //create a single ds containing techwrk, tech and wrkord 
      for(var i=0;i<twArr.length;i++){
        for(var j=0;j<woArr.length;j++){
          if(twArr[i]['WorkOrderId']==woArr[j]['WorkOrderId']){
            twArr[i].Status = woArr[j]['Status'];
          }
        }
      }

      //updating with tech 
      for(var i=0;i<twArr.length;i++){
        for(var j=0;j<techArr.length;j++){
          if(twArr[i]['TechId']==techArr[j]['TechId']){
            twArr[i].TechName = techArr[j]['TechName'];
          }
        }
      }


      controllerScope.reportData.twArr = twArr;
      controllerScope.view.lstboxTech.masterData = lstBoxTechData;
      controllerScope.view.lstboxTech.selectedKey = lstBoxTechData[0][0];
      controllerScope.view.lstboxPeriod.selectedKey = "Six Months";
      kony.print("@techid@@"+lstBoxTechData[0][0]);
      controllerScope.showReport(lstBoxTechData[0][0], "Six Months");

    });
  }



});