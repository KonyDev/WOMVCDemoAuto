define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for imgSubscribe **/
    AS_Image_bd11b0ba03f34987a369c26dbe1a6627: function AS_Image_bd11b0ba03f34987a369c26dbe1a6627(eventobject, x, y) {
        var self = this;
        if ((this.view.imgSubscribe.src).toString().search("icon_switch_on") >= 0) {
            this.view.imgSubscribe.src = "icon_switch_off.png";
        } else {
            this.view.imgSubscribe.src = "icon_switch_on.png";
        }
    },
    /** onClick defined for btnLogin **/
    AS_Button_g9b1ec7904184ae480afdda126ee41f6: function AS_Button_g9b1ec7904184ae480afdda126ee41f6(eventobject) {
        var self = this;
        if (this.view.txtUser.text == "" || this.view.textPasscode.text == "") {
            var alertBasic = {
                message: "Username/Password cannot be empty",
                alertTitle: "Kony",
                alertType: constants.ALERT_TYPE_ERROR
            };
            var alertPSP = {};
            kony.ui.Alert(alertBasic, alertPSP);
        } else {
            kony.model.ApplicationContext.showLoadingScreen("Logging in...");
            this.login();
        }
    },
    /** preShow defined for frmLogin **/
    AS_Form_gcea719cd7ed42ca95823c7c648d504d: function AS_Form_gcea719cd7ed42ca95823c7c648d504d(eventobject) {
        var self = this;
    },
    /** onDeviceBack defined for frmLogin **/
    AS_Form_jc128233bc7449dfb8dbf5ffedd3c96f: function AS_Form_jc128233bc7449dfb8dbf5ffedd3c96f(eventobject) {
        var self = this;
        kony.print("check");
    }
});