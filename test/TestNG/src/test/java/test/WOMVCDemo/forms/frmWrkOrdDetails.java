package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmWrkOrdDetails {


  public frmWrkOrdDetails() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_frmWrkOrdDetails"));
  }
public static void btnMark() throws Exception{ 
	AppElement.scrollScreenUntilVisibleByID(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_btnMark"));
  AppElement btnMark=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_btnMark"));
  btnMark.click();
  }
public void btnUnMark() throws Exception{ 
  AppElement btnUnMark=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_btnUnMark"));
  btnUnMark.click();
  }
public static frmHome navigateBack() throws Exception{
	AppElement form=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_frmWrkOrdDetails"));
	form.swipeDown(30);
	AppElement back=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_back"));
	back.click();
	return new frmHome();
}
public static String getTitleFrmWorkOrder() throws Exception{
	AppElement woTitle=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmWrkOrdDetails_lblTitle"));
	return woTitle.getText();
	
}





}