define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onBeginEditing defined for txtUsername **/
    AS_TextField_a5dce5c6b38e4dd28d7f0f396082ac23: function AS_TextField_a5dce5c6b38e4dd28d7f0f396082ac23(eventobject, changedtext) {
        var self = this;
        //if(this.view.lblErrMsg.isVisible == true)
        //this.view.lblErrMsg.isVisible = false;
        this.view.lblErrMsg.text = "";
    },
    /** onBeginEditing defined for txtPassword **/
    AS_TextField_d2ed697e5d014f98a8cacf9075733828: function AS_TextField_d2ed697e5d014f98a8cacf9075733828(eventobject, changedtext) {
        var self = this;
        //if(this.view.lblErrMsg.isVisible == true)
        //this.view.lblErrMsg.isVisible = false;
        this.view.lblErrMsg.text = "";
    },
    /** onClick defined for btnLogin **/
    AS_Button_b32093ff85554476bab65ce0d5462593: function AS_Button_b32093ff85554476bab65ce0d5462593(eventobject) {
        var self = this;
        this.login();
    },
    /** postShow defined for frmLogin **/
    AS_Form_d35b041d49a246e48bcfccb490980f2b: function AS_Form_d35b041d49a246e48bcfccb490980f2b(eventobject) {
        var self = this;
        return getCurrentTimeForCreateUpdate.call(this);
    }
});