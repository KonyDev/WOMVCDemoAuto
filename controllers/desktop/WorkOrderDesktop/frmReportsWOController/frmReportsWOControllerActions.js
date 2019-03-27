define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for Image0caba31eb782a49 **/
    AS_Image_ffb6bc023ae24e09b2ec20a2de953430: function AS_Image_ffb6bc023ae24e09b2ec20a2de953430(eventobject, x, y) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for FlexContainer0dd22d4c8d55d4d **/
    AS_FlexContainer_h9e49096aedf4eec91106f5ddbd365f2: function AS_FlexContainer_h9e49096aedf4eec91106f5ddbd365f2(eventobject) {
        var self = this;
        this.navigateToForm("frmLogin");
    },
    /** onClick defined for RichText09cd7b4fe87d946 **/
    AS_RichText_e30cb5941f114b30bb27a89068b69c4a: function AS_RichText_e30cb5941f114b30bb27a89068b69c4a(eventobject, linktext, attributes) {
        var self = this;
        this.navigateToForm("frmWOList");
    },
    /** onSelection defined for lstboxTech **/
    AS_ListBox_a7d26d2012c344b088c1351394317183: function AS_ListBox_a7d26d2012c344b088c1351394317183(eventobject) {
        var self = this;
        var techId = this.view.lstboxTech.selectedKeyValue;
        var window = this.view.lstboxPeriod.selectedKeyValue;
        this.showReport(techId[0], window[0]);
    },
    /** onSelection defined for lstboxPeriod **/
    AS_ListBox_h91657d4e8a04b1cac5d579911a6821e: function AS_ListBox_h91657d4e8a04b1cac5d579911a6821e(eventobject) {
        var self = this;
        var techId = this.view.lstboxTech.selectedKeyValue;
        var window = this.view.lstboxPeriod.selectedKeyValue;
        this.showReport(techId[0], window[0]);
    }
});