define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for imgBack **/
    AS_Image_e3d52ca66ac9445899947dd5ad647ed1: function AS_Image_e3d52ca66ac9445899947dd5ad647ed1(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmHome");
    },
    /** onRowClick defined for segNtfOrd **/
    AS_Segment_cf089834c5644f1facbcc9c212eaf90e: function AS_Segment_cf089834c5644f1facbcc9c212eaf90e(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** postShow defined for frmNotifications **/
    AS_Form_b95a7fda67e7465e9c4d10855cc6f039: function AS_Form_b95a7fda67e7465e9c4d10855cc6f039(eventobject) {
        var self = this;
        FLAG_NOTIFICATION_COUNT = 0;
    },
    /** onDeviceBack defined for frmNotifications **/
    AS_Form_ed00bcddad4943cf8bb332c2662eefcd: function AS_Form_ed00bcddad4943cf8bb332c2662eefcd(eventobject) {
        var self = this;
        kony.print("check");
    }
});