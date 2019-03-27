package test.WOMVCDemo.tests;

import org.testng.asserts.SoftAssert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.Alerts;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoBaseTest;
import test.WOMVCDemo.WOMVCDemoWidgetId;
import test.WOMVCDemo.forms.frmLogin;

public class LoginTests extends WOMVCDemoBaseTest{
	@BeforeMethod
	public void beforeMethod(){
		AppElement ele = null;
	    try {
	    	Thread.sleep(5000);
	        ele = new AppElement(WOMVCDemoWidgetId.getWidgetId("frmLogin_frmLogin"));
	    } catch (Exception e) {
	        if (ele == null)
	        {	        	
	            System.out.println("TestfrmLogIn.setupBeforeTest(): Not on the  Login Form");
	        }
	        else {
	            System.out.println("TestfrmLogIn.setupBeforeTest(): Something went wrong in the form");
	            e.printStackTrace();
	        }
	        
	    }
	}
	
 
 @Test
	public void Login() throws Exception{
		SoftAssert sa = new SoftAssert();
		sa.assertTrue(AppElement.waitForEnable(WOMVCDemoWidgetId.getWidgetId("frmLogin_txtUser"), 3),
				"Loginscreen not vailable");
		frmLogin frmLogin=new frmLogin();
		frmLogin.doLogin("jason.murphy@kony.com", "Kony@123");
		sa.assertAll();
		}
 
}