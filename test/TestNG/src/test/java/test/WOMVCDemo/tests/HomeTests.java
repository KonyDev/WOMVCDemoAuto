package test.WOMVCDemo.tests;

import java.io.IOException;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.WOMVCDemo.WOMVCDemoBaseTest;
import test.WOMVCDemo.WOMVCDemoWidgetId;
import test.WOMVCDemo.forms.frmHome;
import test.WOMVCDemo.forms.frmLogin;
import test.WOMVCDemo.forms.frmNotifications;
import test.WOMVCDemo.forms.frmSubscription;
import test.WOMVCDemo.forms.frmWorkOrder;
import test.WOMVCDemo.forms.frmWrkOrdDetails;
import test.common.AppElement;

public class HomeTests extends WOMVCDemoBaseTest{
	
	@BeforeMethod
	public void beforeMethod() throws IOException, Exception{
		AppElement ele = null;
	    try {
	    	Thread.sleep(5000);
	        ele = new AppElement(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"));
	    } catch (Exception e) {
	        if (ele == null)
	        {	        	
	        	System.out.println("TestfrmHome.setupBeforeTest(): Not on the frmHome");
	        	if(AppElement.isElementVisible("id",WOMVCDemoWidgetId.getWidgetId("frmLogin_frmLogin")))
	                {
	                	frmLogin frmLogin=new frmLogin();
	                	frmLogin.doLogin("jason.murphy@kony.com", "Kony@123");        			
	        		
	                }
	        }
	        else {
	            System.out.println("TestfrmHome.setupBeforeTest(): Something went wrong in the form");
	            e.printStackTrace();
	        }
	        
	    }
	}
	
	 @Test
		public void addNCompleteWO() throws Exception{
			SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"), 3),
					"form home is not available");
			frmHome.clickNotification();
			frmNotifications.firstNotificationClick();			
			String woTitle=frmWorkOrder.getTitleFrmWorkOrder();
			frmWorkOrder.btnAccept();
			int addedWoIndex=frmHome.getIndexFrmAddedWoinHome(woTitle);
			String statusBefore=frmHome.getStatusFrmAddedWoinHome(addedWoIndex);
			sa.assertEquals(statusBefore, "IN PROGRESS");
			frmHome.clickAddedWOinHome(addedWoIndex);
			String woAddedTitle=frmWrkOrdDetails.getTitleFrmWorkOrder();
			frmWrkOrdDetails.btnMark();
			Thread.sleep(5000);
			frmWrkOrdDetails.navigateBack();
			sa.assertEquals(woTitle, woAddedTitle);
			String statusAfter=frmHome.getStatusAfterCompleting(woTitle);
			sa.assertEquals(statusAfter, "COMPLETED");
			sa.assertAll();
			}	 

	 
	 @Test
	 	public void syncData() throws Exception{
		 SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"), 3),
					"form home is not vailable");	
			frmHome.clickSyncOption();
			String uploadVal=frmHome.getUploadValue();
			String downldVal=frmHome.getDownloadValue();
			frmHome.btnDone();
			sa.assertEquals(uploadVal, "3");
			sa.assertEquals(downldVal, "2");
			sa.assertAll();
	 }
	 
	 @Test
	 public void subscrptnValidate() throws Exception{
		 SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"), 3),
					"form home is not vailable");
			frmHome.clickSubscription();
			frmSubscription.chkSubscptnEle();
			sa.assertAll();
	 }
	 @Test
	 public void logoutValidate() throws Exception{
		 SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(WOMVCDemoWidgetId.getWidgetId("frmHome_frmHome"), 3),
					"form home is not vailable");
			frmHome.clickLogout();
			sa.assertAll();
	 }

}
