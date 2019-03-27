package test.WOMVCDemo;

import java.io.IOException;

import test.common.SgConfiguration;
import test.common.AppResouceBundle;

public class WOMVCDemoWidgetNames {

	static AppResouceBundle widgetNames;
	
	public static String getWidgetName(String key) throws Exception{
		if(widgetNames==null)
			if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("tablet"))
			widgetNames = new AppResouceBundle("src/test/resources/tabletWidgetName.properties");
			else if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("mobile"))
			widgetNames = new AppResouceBundle("src/test/resources/mobileWidgetName.properties");
			else if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("desktop"))
			widgetNames = new AppResouceBundle("src/test/resources/desktopWidgetName.properties");
		return widgetNames.getProperty(key);
	}

}