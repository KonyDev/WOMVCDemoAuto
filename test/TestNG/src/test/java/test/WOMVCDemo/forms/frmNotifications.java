package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmNotifications {


  public frmNotifications() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmNotifications_frmNotifications"));
  }




public void segNtfOrd(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(WOMVCDemoWidgetId.getWidgetId("frmNotifications_segNtfOrd"),WOMVCDemoWidgetId.getWidgetId("frmNotifications_FlexContainer0j69cdc79059140"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

public static void firstNotificationClick() throws Exception{
	Segment segNotifcatn = new Segment(WOMVCDemoWidgetId.getWidgetId("frmNotifications_segNtfOrd"),
			WOMVCDemoWidgetId.getWidgetId("frmNotifications_FlexContainer0j69cdc79059140"));
	 AppElement firstNotification = segNotifcatn.getElementWithIndex(0);
	 firstNotification.click();
}

}