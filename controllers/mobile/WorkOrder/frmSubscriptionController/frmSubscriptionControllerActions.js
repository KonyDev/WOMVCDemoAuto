define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for imgBack **/
    AS_Image_i83130a09eed41c2b31a6ca4ce4c1a07: function AS_Image_i83130a09eed41c2b31a6ca4ce4c1a07(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("WorkOrder/frmHome");
        ntf.navigate();
    },
    /** onTouchStart defined for imgSubscribe **/
    AS_Image_a298115fdea54b76bbc834f63ee01990: function AS_Image_a298115fdea54b76bbc834f63ee01990(eventobject, x, y) {
        var self = this;
        //deregisterPush();
        //alert(JSON.stringify(this.view.imgSubscribe.src));
        FLAG_SUBSCRIBE = false;
        if ((this.view.imgSubscribe.src).toString().search("icon_switch_on") >= 0) {
            this.view.imgSubscribe.src = "icon_switch_off.png";
            deregisterPush();
        } else {
            this.view.imgSubscribe.src = "icon_switch_on.png";
            setPushCallbacks();
            registerPush();
        }
    },
    /** onTouchStart defined for imgLocUpdate **/
    AS_Image_feb97a5a24b24ac187086a697ade731d: function AS_Image_feb97a5a24b24ac187086a697ade731d(eventobject, x, y) {
        var self = this;
        kony.model.ApplicationContext.showLoadingScreen("Updating Location ...");
        locationUpdateControllerScope = this;
        updateLocations();
    },
    /** onDeviceBack defined for frmSubscription **/
    AS_Form_def4ada5aad64f51a8405fbadcf232eb: function AS_Form_def4ada5aad64f51a8405fbadcf232eb(eventobject) {
        var self = this;
        kony.print("check");
    }
});