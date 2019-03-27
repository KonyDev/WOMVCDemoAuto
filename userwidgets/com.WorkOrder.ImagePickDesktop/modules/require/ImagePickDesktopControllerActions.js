define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnDone **/
    AS_Button_g0aefae0f30b4f34b77f239db2c80f00: function AS_Button_g0aefae0f30b4f34b77f239db2c80f00(eventobject) {
        var self = this;
        this.view.imgDelete.setVisibility(true);
        this.view.btnDone.setVisibility(false);
        self.onClickDone.call(this);
    },
    /** onTouchEnd defined for imgDelete **/
    AS_Image_c6ebee0f469645f7b05296b216bc2b9d: function AS_Image_c6ebee0f469645f7b05296b216bc2b9d(eventobject, x, y) {
        var self = this;
        this.view.imgDelete.setVisibility(false);
        this.view.btnDone.setVisibility(true);
        self.onClickDelete.call(this);
    },
    /** onTouchEnd defined for img1 **/
    AS_Image_a113b86eaccf4c9f8a943f9a97399d75: function AS_Image_a113b86eaccf4c9f8a943f9a97399d75(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel1 **/
    AS_Image_gcea2cb3c00b4eb3b04eab68c1aed493: function AS_Image_gcea2cb3c00b4eb3b04eab68c1aed493(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img2 **/
    AS_Image_d9f2d507b2f746feae0f0b3467d6c804: function AS_Image_d9f2d507b2f746feae0f0b3467d6c804(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel2 **/
    AS_Image_iffb6585ff1f44cb9f2cd2da7c1755c5: function AS_Image_iffb6585ff1f44cb9f2cd2da7c1755c5(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img3 **/
    AS_Image_ca3cefdac41b4fe2b9e731ecd2ae1f3b: function AS_Image_ca3cefdac41b4fe2b9e731ecd2ae1f3b(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel3 **/
    AS_Image_b1b01afa7613491185a74ca44269db55: function AS_Image_b1b01afa7613491185a74ca44269db55(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img4 **/
    AS_Image_b5854dcdaa554d94973b2ac1f8c7a1a5: function AS_Image_b5854dcdaa554d94973b2ac1f8c7a1a5(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel4 **/
    AS_Image_d105e609918c45ee81bb2355919fff57: function AS_Image_d105e609918c45ee81bb2355919fff57(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img5 **/
    AS_Image_f6b170e0d1114ddca4756fd3341c1339: function AS_Image_f6b170e0d1114ddca4756fd3341c1339(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel5 **/
    AS_Image_f4f9b986abb24b76b02da51cae8a0a0f: function AS_Image_f4f9b986abb24b76b02da51cae8a0a0f(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** onTouchEnd defined for img6 **/
    AS_Image_h78293310bc349df9ad3a1dc69a8aa5f: function AS_Image_h78293310bc349df9ad3a1dc69a8aa5f(eventobject, x, y) {
        var self = this;
        return self.onImgClick.call(this, eventobject);
    },
    /** onTouchEnd defined for imgCancel6 **/
    AS_Image_h5995c211fa746c49d5e90ba144f2663: function AS_Image_h5995c211fa746c49d5e90ba144f2663(eventobject, x, y) {
        var self = this;
        return self.onImgCancelClick.call(this, eventobject);
    },
    /** postShow defined for ImagePickDesktop **/
    AS_FlexContainer_i9b8c22acbdb403eb9928c6f66a34c47: function AS_FlexContainer_i9b8c22acbdb403eb9928c6f66a34c47(eventobject) {
        var self = this;
        for (var i = 2; i <= 6; i++) {
            this.view["img" + i].setVisibility(false);
        }
    }
});