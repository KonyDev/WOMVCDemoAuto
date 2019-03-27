define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for Image0caba31eb782a49 **/
    AS_Image_h85228a6a6034ccdac22bbebea19056f: function AS_Image_h85228a6a6034ccdac22bbebea19056f(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for FlexContainer0dd22d4c8d55d4d **/
    AS_FlexContainer_f9da20fe06524564b5376221eb75b954: function AS_FlexContainer_f9da20fe06524564b5376221eb75b954(eventobject) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for CopyRichText0872182c2d0114d **/
    AS_RichText_g948087626a94c2588136c2b32b5ee96: function AS_RichText_g948087626a94c2588136c2b32b5ee96(eventobject, linktext, attributes) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** onBeginEditing defined for txtbxMiles **/
    AS_TextField_b41c4c5206f34b19bfd1b09b7c96a629: function AS_TextField_b41c4c5206f34b19bfd1b09b7c96a629(eventobject, changedtext) {
        var self = this;
        controllerScope.view.lblErrMsg.isVisible = false;
    },
    /** onBeginEditing defined for txtbxLatitude **/
    AS_TextField_fa13d1d000e24562b7fa8cae3050d2df: function AS_TextField_fa13d1d000e24562b7fa8cae3050d2df(eventobject, changedtext) {
        var self = this;
        controllerScope.view.lblErrMsg.isVisible = false;
    },
    /** onBeginEditing defined for txtbxLongitude **/
    AS_TextField_f3961dc69f1b489ab4adfe77f60d46d0: function AS_TextField_f3961dc69f1b489ab4adfe77f60d46d0(eventobject, changedtext) {
        var self = this;
        controllerScope.view.lblErrMsg.isVisible = false;
    },
    /** onBeginEditing defined for txtbxSrch **/
    AS_TextField_e2871e52f3b644a292991326f45b8955: function AS_TextField_e2871e52f3b644a292991326f45b8955(eventobject, changedtext) {
        var self = this;
        controllerScope.view.lblErrMsg.isVisible = false;
    },
    /** onEndEditing defined for txtbxSrch **/
    AS_TextField_j09bcb8f8f99487a916ed280a1a0a837: function AS_TextField_j09bcb8f8f99487a916ed280a1a0a837(eventobject, changedtext) {
        var self = this;
        this.setLatLong();
    },
    /** onClick defined for CopybtnAddNew0e0c19319f0ae42 **/
    AS_Button_e871e5bc68c2452a865e5998cb907baf: function AS_Button_e871e5bc68c2452a865e5998cb907baf(eventobject) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** onClick defined for btnAddNew **/
    AS_Button_a01972f4e90e4291bdfe73db6bff1548: function AS_Button_a01972f4e90e4291bdfe73db6bff1548(eventobject) {
        var self = this;
        this.onRequest();
    },
    /** preShow defined for frmRequestWO **/
    AS_Form_c0d3fd3d13bd4a089f642991d19768c8: function AS_Form_c0d3fd3d13bd4a089f642991d19768c8(eventobject) {
        var self = this;
        this.view.txtbxLatitude.setEnabled(false);
        this.view.txtbxLongitude.setEnabled(false);
    }
});