package test.WOMVCDemo;

import java.io.IOException;

import test.common.SgConfiguration;
import test.common.WidgetID;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class WOMVCDemoWidgetId {
	static WidgetID widgetIds;
	FileInputStream widconfig;
    private static WOMVCDemoWidgetId widconf;
    
	protected WOMVCDemoWidgetId()
	{
		try {
			widconfig = new FileInputStream("mobileWidgetId.properties");
			Properties props = new Properties();
			props.load(widconfig);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	public static WOMVCDemoWidgetId getInstance(){
		if (widconf != null)
			return widconf;
		widconf = new WOMVCDemoWidgetId();
		return widconf;
	}
	
	public static String getWidgetId(String key) throws Exception,IOException{
		if(widgetIds==null){
			if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("Tablet"))
				widgetIds = new WidgetID("tabletWidgetId.properties");
			else if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("Phone"))
				widgetIds = new WidgetID("mobileWidgetId.properties");
			else if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("Desktop"))
				widgetIds = new WidgetID("desktopWidgetId.properties");
		}
			
		return widgetIds.getWidgetId(key);
	}

}