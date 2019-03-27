define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for img1 **/
    AS_Image_idedd71491464177a0248e318b902111: function AS_Image_idedd71491464177a0248e318b902111(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel1 **/
    AS_Image_g390d0d4d2db44fdbedfebb97851f1b6: function AS_Image_g390d0d4d2db44fdbedfebb97851f1b6(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img2 **/
    AS_Image_c43a6ca5292744938d5ce31e098640ab: function AS_Image_c43a6ca5292744938d5ce31e098640ab(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel2 **/
    AS_Image_d04cbbedb0c14235ba89e2223696c6ce: function AS_Image_d04cbbedb0c14235ba89e2223696c6ce(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img3 **/
    AS_Image_c81ecc6734b842b1988af6a374c0b5ae: function AS_Image_c81ecc6734b842b1988af6a374c0b5ae(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel3 **/
    AS_Image_c17762b33112454c95419d8bc116bbb9: function AS_Image_c17762b33112454c95419d8bc116bbb9(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img4 **/
    AS_Image_ided97c26136421a9a816c000148d477: function AS_Image_ided97c26136421a9a816c000148d477(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel4 **/
    AS_Image_c0596773b181498d83478f82d7fab541: function AS_Image_c0596773b181498d83478f82d7fab541(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img5 **/
    AS_Image_b3fe8f6770d44d239a052b3bcc142a21: function AS_Image_b3fe8f6770d44d239a052b3bcc142a21(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel5 **/
    AS_Image_h8e6ee575b9d48e0a26c7ba8ae2dac20: function AS_Image_h8e6ee575b9d48e0a26c7ba8ae2dac20(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img6 **/
    AS_Image_de09fdcc4ba44cd2addf0764cab8c3af: function AS_Image_de09fdcc4ba44cd2addf0764cab8c3af(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel6 **/
    AS_Image_be1d73acde45457d841268ea1c0059d5: function AS_Image_be1d73acde45457d841268ea1c0059d5(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onClick defined for btnDone **/
    AS_Button_ie6b0e0eb0ca44cc8ac3741ab8087292: function AS_Button_ie6b0e0eb0ca44cc8ac3741ab8087292(eventobject) {
        var self = this;
        this.view.imgDelete.setVisibility(true);
        this.view.btnDone.setVisibility(false);
        self.onClickDone.call(this);
    },
    /** onTouchEnd defined for imgDelete **/
    AS_Image_d5503a16fc5e4d549b88d378c68a5f5b: function AS_Image_d5503a16fc5e4d549b88d378c68a5f5b(eventobject, x, y) {
        var self = this;
        this.view.imgDelete.setVisibility(false);
        this.view.btnDone.setVisibility(true);
        self.onClickDelete.call(this);
    }
});