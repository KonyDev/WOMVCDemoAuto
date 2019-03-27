define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for back **/
    AS_FlexContainer_jac4c7daeb3b456d8fa8fe0b9f3eca8a: function AS_FlexContainer_jac4c7daeb3b456d8fa8fe0b9f3eca8a(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("WorkOrder/frmHome");
        ntf.navigate();
    },
    /** onClick defined for btnMark **/
    AS_Button_dd40fe1a4bbd4ea2ab3a255f2e8ffad2: function AS_Button_dd40fe1a4bbd4ea2ab3a255f2e8ffad2(eventobject) {
        var self = this;
        //this.onMarkComplete();
        this.onMark();
    },
    /** onClick defined for btnUnMark **/
    AS_Button_c03c33dec1394d4db453f477aae6bb9e: function AS_Button_c03c33dec1394d4db453f477aae6bb9e(eventobject) {
        var self = this;
        this.onUnMark();
    },
    /** onDeviceBack defined for frmWrkOrdDetails **/
    AS_Form_fa377da4105a495a81da60ca01eb28a0: function AS_Form_fa377da4105a495a81da60ca01eb28a0(eventobject) {
        var self = this;
        kony.print("check");
    }
});