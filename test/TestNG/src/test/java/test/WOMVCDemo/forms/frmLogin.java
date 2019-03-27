package test.WOMVCDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.SgConfiguration;
import test.common.ListBox;
import test.WOMVCDemo.WOMVCDemoWidgetId;

public class frmLogin {


  public frmLogin() throws Exception {
  AppElement lblHeader=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmLogin_frmLogin"));
  }
public frmHome btnLogin() throws Exception{ 
  AppElement btnLogin=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmLogin_btnLogin"));
  btnLogin.click();
  Thread.sleep(5000);
  return new frmHome();
  }

public void textPasscode(String text) throws Exception{
  AppElement textPasscode=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmLogin_textPasscode"));
  textPasscode.type(text);
  }
public void txtUser(String text) throws Exception{
  AppElement txtUser=new AppElement(WOMVCDemoWidgetId.getWidgetId("frmLogin_txtUser"));
  txtUser.type(text);
  }
public void doLogin(String username, String password) throws Exception {
	//Enters username, password and clicks on login
	txtUser(username);
	textPasscode(password);
    //if(SgConfiguration.getInstance().isAndroid())
    	btnLogin();
}




}