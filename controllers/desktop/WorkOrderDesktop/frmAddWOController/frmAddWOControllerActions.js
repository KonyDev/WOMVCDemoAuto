define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for Image0caba31eb782a49 **/
    AS_Image_b8ccca8378a445f7af1ade3fad9b748a: function AS_Image_b8ccca8378a445f7af1ade3fad9b748a(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for FlexContainer0dd22d4c8d55d4d **/
    AS_FlexContainer_ff8546bfdbcf4b209bcd20595624d9c9: function AS_FlexContainer_ff8546bfdbcf4b209bcd20595624d9c9(eventobject) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for RichText09cd7b4fe87d946 **/
    AS_RichText_ad0994cff25642d0b4bb8765d05739d4: function AS_RichText_ad0994cff25642d0b4bb8765d05739d4(eventobject, linktext, attributes) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** onClick defined for btnAddWo **/
    AS_Button_d2d3b3e1ba294bf0b49d7b246dbeefc5: function AS_Button_d2d3b3e1ba294bf0b49d7b246dbeefc5(eventobject) {
        var self = this;
        var workOrder = {};
        workOrder["WorkOrderId"] = getRandBtw(WO_MIN, WO_MAX);
        workOrder["WorkOrderTitle"] = this.view.txtWoTitle.text;
        workOrder["WorkOrderDesc"] = this.view.txtWoDesc.text;
        workOrder["WorkOrderAddress"] = this.view.txtWoAdd.text;
        workOrder["Status"] = WO_NEW;
        this.createWorkOrder(workOrder);
    },
    /** onClick defined for btnAddNew **/
    AS_Button_f34ce8afe9bb457891f8fd4cff5f35f2: function AS_Button_f34ce8afe9bb457891f8fd4cff5f35f2(eventobject) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** preShow defined for frmAddWO **/
    AS_Form_a4e0106456214416be91b3ff0abbdf99: function AS_Form_a4e0106456214416be91b3ff0abbdf99(eventobject) {
        var self = this;
        this.view.txtWoTitle.text = "";
        this.view.txtWoDesc.text = "";
        this.view.txtWoAdd.text = "";
    }
});