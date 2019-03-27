define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for Image0caba31eb782a49 **/
    AS_Image_aa7d8858949f4df98637b993a235e8cf: function AS_Image_aa7d8858949f4df98637b993a235e8cf(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for FlexContainer0dd22d4c8d55d4d **/
    AS_FlexContainer_c3467a2044d244adb28151d08728fbed: function AS_FlexContainer_c3467a2044d244adb28151d08728fbed(eventobject) {
        var self = this;
        this.navigateToForm1("frmLogin");
    },
    /** onClick defined for CopyFlexContainer0fee50a20238c45 **/
    AS_FlexContainer_e125fb4ecd3045b29c931528c277623b: function AS_FlexContainer_e125fb4ecd3045b29c931528c277623b(eventobject) {
        var self = this;
        this.onNavigate();
    },
    /** onClick defined for btnAddNew **/
    AS_Button_jff123fdd7f04c079d2dde7685140b53: function AS_Button_jff123fdd7f04c079d2dde7685140b53(eventobject) {
        var self = this;
        this.navigateToForm("frmAddWO");
    },
    /** onClick defined for btnSendReminder **/
    AS_Button_gc755cef02144afd8247244dfe44b490: function AS_Button_gc755cef02144afd8247244dfe44b490(eventobject) {
        var self = this;
        //https://testgo.messaging.konycloud.com/api/v1/subscribers
        //The above service is not listing the details of all the subscribers
        //alert("Are you sure you want to send Timesheet reminder?");
        /*kony.ui.Alert({
            message: "Are you sure you want to send Timesheet reminder?",
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            alertTitle: "Timesheet Reminder",
            yesLabel: "Ok",
            noLabel: "Cancel",
            alertHandler: null
        }, {});*/
        this.view.flxSendReminder.isVisible = true;
    },
    /** onClick defined for btnReports **/
    AS_Button_iaeebb1f0e154ea0931386ad6df0c542: function AS_Button_iaeebb1f0e154ea0931386ad6df0c542(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("WorkOrderDesktop/frmReportsWO");
        ntf.navigate();
    },
    /** onRowClick defined for segWOList **/
    AS_Segment_fbec677ddc034d938a669ad4aa4e7e27: function AS_Segment_fbec677ddc034d938a669ad4aa4e7e27(eventobject, sectionNumber, rowNumber) {
        var self = this;
        var data = this.view.segWOList.selectedRowItems[0];
        var ntf = new kony.mvc.Navigation("WorkOrderDesktop/frmViewWO");
        ntf.navigate(data);
    },
    /** onClick defined for btnSend **/
    AS_Button_i9476f4fd1ef47f294b91bf8aa694c9e: function AS_Button_i9476f4fd1ef47f294b91bf8aa694c9e(eventobject) {
        var self = this;
        this.bulkPush();
        this.view.flxSendReminder.isVisible = false;
    },
    /** onClick defined for btnCancel **/
    AS_Button_b8265d99747640868a0646c9303d9126: function AS_Button_b8265d99747640868a0646c9303d9126(eventobject) {
        var self = this;
        this.view.flxSendReminder.isVisible = false;
    }
});