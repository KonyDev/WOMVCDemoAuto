package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmHome {


  public frmHome() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"));
  }
public static void btnDone() throws Exception{ 
  AppElement btnDone=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_btnDone"));
  btnDone.click();
  }
public void btnSubscription() throws Exception{ 
  AppElement btnSubscription=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_btnSubscription"));
  btnSubscription.click();
  }
public void lblBadgeCount() throws Exception{ 
  AppElement lblBadgeCount=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_lblBadgeCount"));
  lblBadgeCount.click();
  }




public static void segWrkOrd(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),WOMVCDemoWidgetId.getWidgetId("FlexContainer0g2af383563f943_lblTitle"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 
public static int getIndexFrmAddedWoinHome(String label) throws Exception{
	AppElement.scrollUntilVisible(label);
	Segment segFrstWo = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),
			WOMVCDemoWidgetId.getWidgetId("FlexContainer0g2af383563f943_lblTitle"));
	 int addedWoIndex = segFrstWo.getSegRowIndexWithLabel(label);
	 return addedWoIndex;
	
}
public static String getStatusAfterCompleting(String label) throws Exception{
	AppElement.scrollUntilVisible(label);
	Segment segtWo = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),
			WOMVCDemoWidgetId.getWidgetId("FlexContainer0g2af383563f943_lblTitle"));
	 int addedWoIndex = segtWo.getSegRowIndexWithLabel(label);
	Segment segWoStatus = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),
			WOMVCDemoWidgetId.getWidgetId("FlexContainer0g2af383563f943_lblStatus"));
	AppElement addedWoTitle=segWoStatus.getElementWithIndex(addedWoIndex);
	 return addedWoTitle.getText();
	
}
public static String getStatusFrmAddedWoinHome(int index) throws Exception{
	Segment segFrstWo = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),
			WOMVCDemoWidgetId.getWidgetId("FlexContainer0g2af383563f943_lblStatus"));
	 AppElement addedWoStatus=segFrstWo.getElementWithIndex(index);
	 return addedWoStatus.getText();
	
}
public static frmNotifications clickNotification() throws Exception{
	AppElement notification=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_CopyimgNotification0cf1710af262045"));
	notification.click();
	
	return new frmNotifications();
	
}
public static frmWrkOrdDetails  clickAddedWOinHome(int index) throws Exception{
	Segment segFrstWo = new Segment(WOMVCDemoWidgetId.getWidgetId("frmHome_segWrkOrd"),
			WOMVCDemoWidgetId.getWidgetId("frmHome_FlexContainer0g2af383563f943"));
	AppElement segClick=segFrstWo.getElementWithIndex(index+1);
	segClick.click();
	 return new frmWrkOrdDetails();
	
}

public static void clickSyncOption() throws Exception{
	AppElement sync=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_imgSync"));
	sync.click();
	Thread.sleep(20000);
}
public static String getUploadValue() throws Exception{
	AppElement uploadValue=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_lblUploadedValue"));
	return uploadValue.getText();
}
public static String getDownloadValue() throws Exception{
	AppElement downloadValue=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_lblDownloadedValue"));
	return downloadValue.getText();
}

public static frmSubscription clickSubscription() throws Exception{
	AppElement sunscrptn=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_btnSubscription"));
	sunscrptn.click();
	return new frmSubscription();
}
public static frmLogin clickLogout() throws Exception{
	AppElement logout=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_imgLogout"));
	logout.click();
	return new frmLogin();
}

}