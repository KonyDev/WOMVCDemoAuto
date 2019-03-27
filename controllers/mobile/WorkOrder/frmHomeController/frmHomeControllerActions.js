define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for CopyimgNotification0cf1710af262045 **/
    AS_Image_dd3764993ee240e0a00c21312a866f6a: function AS_Image_dd3764993ee240e0a00c21312a866f6a(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmNotifications");
    },
    /** onTouchEnd defined for imgSync **/
    AS_Image_f247f513e6d1405daab51e3d2e2da6e4: function AS_Image_f247f513e6d1405daab51e3d2e2da6e4(eventobject, x, y) {
        var self = this;
        this.performSyncHome();
    },
    /** onTouchStart defined for imgSignal **/
    AS_Image_a2074371be474b088bf68db494c87373: function AS_Image_a2074371be474b088bf68db494c87373(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmSubscription");
    },
    /** onTouchEnd defined for imgLogout **/
    AS_Image_if077627b9344e3b97c35ef71e5b57ce: function AS_Image_if077627b9344e3b97c35ef71e5b57ce(eventobject, x, y) {
        var self = this;
        clearAuthCreds();
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for btnSubscription **/
    AS_Button_e569c2498cd34253958508981d377204: function AS_Button_e569c2498cd34253958508981d377204(eventobject) {
        var self = this;
        this.navigateToForm("frmSubscription");
    },
    /** onClick defined for btnDone **/
    AS_Button_c9994cba71e7412eb70d0a4c6ad4a307: function AS_Button_c9994cba71e7412eb70d0a4c6ad4a307(eventobject) {
        var self = this;
        this.view.flxSyncDone.setVisibility(false);
    },
    /** onRowClick defined for segWrkOrd **/
    AS_Segment_db8bfdc5d4204e4683fb82099f66a2b9: function AS_Segment_db8bfdc5d4204e4683fb82099f66a2b9(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmHome **/
    AS_Form_d8e9695dbf6f40188d9290732774395c: function AS_Form_d8e9695dbf6f40188d9290732774395c(eventobject) {
        var self = this;
        if (FLAG_NOTIFICATION_COUNT > 0) {
            this.view.lblBadgeCount.setVisibility(true);
            this.view.lblBadgeCount.text = "" + FLAG_NOTIFICATION_COUNT;
        } else {
            this.view.lblBadgeCount.setVisibility(false);
            this.view.lblBadgeCount.text = "";
        }
    },
    /** onDeviceBack defined for frmHome **/
    AS_Form_dc19e84766784e6cbd22c45b5cfe7719: function AS_Form_dc19e84766784e6cbd22c45b5cfe7719(eventobject) {
        var self = this;
        kony.print("check");
    }
});