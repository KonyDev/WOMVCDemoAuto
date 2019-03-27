define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for Image0caba31eb782a49 **/
    AS_Image_be67898f4b1e4ea789fb772d0621e53d: function AS_Image_be67898f4b1e4ea789fb772d0621e53d(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for FlexContainer0dd22d4c8d55d4d **/
    AS_FlexContainer_ac0c769fac7f4376a9d2235d5251d30f: function AS_FlexContainer_ac0c769fac7f4376a9d2235d5251d30f(eventobject) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for RichText09cd7b4fe87d946 **/
    AS_RichText_ed8f82c12d0541f79462b4a18d650ff2: function AS_RichText_ed8f82c12d0541f79462b4a18d650ff2(eventobject, linktext, attributes) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** onClick defined for btnAddWo **/
    AS_Button_a2e03c84bdf0426582ec6cce67ec3cda: function AS_Button_a2e03c84bdf0426582ec6cce67ec3cda(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("WorkOrderDesktop/frmWOList");
        ntf.navigate();
    }
});