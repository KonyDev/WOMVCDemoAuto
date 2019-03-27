//Type your code here
function manaulInit(){
  KNYMobileFabric = new kony.sdk();
                KNYMobileFabric.init("855eb5c10ff9d48abab1a306b309b2c1", 
                                     "b177e1d3fe945f2db70f7e32dc14e35b", 
                                     "https://100000012.auth.konycloud.com/appconfig",sdkSuccessCallback,sdkErrorCallback);
 
}

function sdkSuccessCallback(resultset)

{
 //KNYMobileFabric=kony.sdk.getCurrentInstance();
kony.print(JSON.stringify(resultset));
  //#ifdef android
	setupSync();
  //#endif
}

function sdkErrorCallback(error)

{

kony.print(JSON.stringify(error));

}