package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmWorkOrder {


  public frmWorkOrder() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWorkOrder_frmWorkOrder"));
  }
public static frmHome btnAccept() throws Exception{ 
  AppElement btnAccept=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWorkOrder_btnAccept"));
  Thread.sleep(5000);
  btnAccept.click();
  return new frmHome();
  }
public static frmHome btnReject() throws Exception{ 
  AppElement btnReject=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWorkOrder_btnReject"));
  btnReject.click();
  return new frmHome();
  }
public static String getTitleFrmWorkOrder() throws Exception{
	AppElement woTitle=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWorkOrder_lblTitle"));
	return woTitle.getText();
	
}




}