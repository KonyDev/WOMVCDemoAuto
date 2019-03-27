package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmSubscription {


  public frmSubscription() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmSubscription_frmSubscription"));
  }

  public static void chkSubscptnEle() throws Exception{
	  AppElement sub=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmSubscription_flxSubscr"));
	  sub.isElementVisible();
	  AppElement loc=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmSubscription_CopyflxSubscr0i7afeedf9beb43"));
	  loc.isElementVisible();
	  AppElement back=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmSubscription_imgBack"));
	  back.click();
  }



}