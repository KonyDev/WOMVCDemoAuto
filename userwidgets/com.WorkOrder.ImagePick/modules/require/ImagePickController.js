define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    images:[],
    workOrderId:null,
    setWorkOrderID:function(id)
    {
      this.workOrderId=id;
    },
    setData:function(data)
    {
      kony.model.ApplicationContext.showLoadingScreen("Loading Images ...");
      this.images=data;
      for(var i =1;i<=6;i++)
      {
        this.view["imgCancel"+i].setVisibility(false);
      }
      for(var i =1;i<=6;i++)
      {
        this.view["img"+i].setVisibility(false);
      }
      if(data.length==0 || data == null)
      {
        this.view.img1.src="add.png";
        this.view.img1.setVisibility(true);
      }
      var j=0;
      for(var b in data)
      {
        j++;

        this.view["img"+j].rawBytes=this.images[b].rawBytes;
        this.view["img"+j].setVisibility(true);
      }
      if(j<6)
      {
        this.view["img"+(j+1)].src="add.png";
        this.view["img"+(j+1)].setVisibility(true);
      }
      kony.application.dismissLoadingScreen();
    },
    onImgClick:function(obj)
    {
      if(obj.src=="add.png")
      {
        kony.phone.openMediaGallery(
          function(rawbytes, permStatus, mimeType)
          {
            if(rawbytes!== null)
            {
              this.images.push({"isNew":true,"rawBytes":rawbytes});
              //               this.uploadCompleteImages(rawbytes);
              for(var i =1;i<=6;i++)
              {
                this.view["img"+i].setVisibility(false);
              }
              var j=0;
              for(var b in this.images)
              {
                j++;

                this.view["img"+j].rawBytes=this.images[b].rawBytes;
                this.view["img"+j].setVisibility(true);
              }
              if(j<6)
              {
                this.view["img"+(j+1)].src="add.png";
                this.view["img"+(j+1)].setVisibility(true);
              }
            }
          }.bind(this), 
          {
            mimeType:"image/*"
          }
        );
      }
    },
    getImages:function()
    {
      return this.images;
    },
    onClickDelete:function()
    {
      if(this.images.length>0 && !this.view.imgCancel1.isVisible)
      {
        for(var i =1;i<=this.images.length;i++)
        {
          if(this.images[i-1].isNew)
          {
            this.view["imgCancel"+i].setVisibility(true);
          }
        }
        if(this.images.length<6)
          this.view["img"+(this.images.length+1)].setVisibility(false);
      }
      else if(this.images.length>0 && this.view.imgCancel1.isVisible)
      {
        for(var i =1;i<=this.images.length;i++)
        {
          this.view["imgCancel"+i].setVisibility(false);
        }
        if(this.images.length<6)
          this.view["img"+(this.images.length+1)].setVisibility(true);
      }
    },
    onClickDone:function()
    {
      for(var i =1;i<=6;i++)
      {
        this.view["imgCancel"+i].setVisibility(false);
      }
      this.view["img"+(this.images.length+1)].src="add.png";
      this.view["img"+(this.images.length+1)].setVisibility(true);

    },
    onImgCancelClick:function(obj)
    {
      var index=obj.id[obj.id.length-1];
      this.images.splice(index-1, 1);
      for(var i =1;i<=6;i++)
      {
        this.view["imgCancel"+i].setVisibility(false);
      }
      for(var i =1;i<=6;i++)
      {
        this.view["img"+i].setVisibility(false);
      }
      var j=0;
      for(var b in this.images)
      {
        j++;
        this.view["img"+j].rawBytes=this.images[b].rawBytes;
        this.view["img"+j].setVisibility(true);
        if(this.images[b].isNew)
        {
          this.view["imgCancel"+j].setVisibility(true);
        }
      }
    }
  };
});