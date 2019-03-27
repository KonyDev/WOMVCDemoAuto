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
      else{
      var j=0;
      for(var b in data)
      {
        j++;

        this.view["img"+j].base64=this.images[b];
        this.view["img"+j].setVisibility(true);
        this.view["imgCancel"+j].setVisibility(true);
      }
      if(j<6)
      {
        this.view["img"+(j+1)].src="add.png";
        this.view["img"+(j+1)].setVisibility(true);
      }
      }
    },
    onImgClick:function(obj)
    {
      if(obj.src=="add.png")
      {

        kony.io.fs.browse(
          {
            selectMultipleFiles: true,
            filter: ["image/png", "image/jpeg"]
          },
          function(event, FileList) {
            scope=this;
            isImgUpdated=true;
            uploadFiles = FileList;
            var reader = new FileReader();
            reader.onload = function(evt) { // upon successful file read
              var chars = new Uint8Array(evt.target.result);
              var CHUNK_SIZE = 0x8000,
                  index = 0,
                  result = '',
                  slice;
              while (index < chars.length) {
                slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, chars.length));
                result += String.fromCharCode.apply(null, slice);
                index += CHUNK_SIZE;
               }
              scope.onselectioncallback(result);
              
            };
            reader.onerror = function(evt) { // error handler
              if (evt.target.error instanceof FileError) { 
                switch (evt.target.error.code) {
                  case FileError.NOT_FOUND_ERR:
                    kony.print("openMediaGallery error:: The file resource couldn't be found at the time the read was processed.");
                    break;
                  case FileError.NOT_READABLE_ERR:
                    kony.print("openMediaGallery error:: 2101, The resource couldn't be read. Insufficient Permissions.");
                    break;
                  case FileError.ENCODING_ERR:
                    kony.print("openMediaGallery error:: The resource couldn't be encoded.");
                    break;
                  case FileError.SECURITY_ERR:
                    break;
                  default:
                    kony.print("openMediaGallery error:: The file resource is unsafe/changed/other unspecified security error.");
                }
              } else 
                kony.print("openMediaGallery error:: " + evt.target.error.name + ", " + evt.target.error.message);
            };
            reader.readAsArrayBuffer(FileList[0].file);
          }.bind(this)
        );
      }
    },
    onselectioncallback:function(result) {
      var base64=window.btoa(result);
      if(base64!== null)
      {
        this.images.push(base64);
        for(var i =1;i<=6;i++)
        {
          this.view["img"+i].setVisibility(false);
          this.view["imgCancel"+i].setVisibility(false);
        }
        var j=0;
        for(var b in this.images)
        {
          j++;
          this.view["img"+j].base64=this.images[b];
          this.view["img"+j].setVisibility(true);
          this.view["imgCancel"+j].setVisibility(true);
        }
        if(j<6)
        {
          this.view["img"+(j+1)].src="add.png";
          this.view["img"+(j+1)].setVisibility(true);
        }
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
          this.view["imgCancel"+i].setVisibility(true);
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
        this.view["img"+j].base64=this.images[b];
        this.view["img"+j].setVisibility(true);
        this.view["imgCancel"+j].setVisibility(true);
      }
      if(j<5)
        {
          this.view["img"+(j+1)].src="add.png";
          this.view["img"+(j+1)].setVisibility(true);
        }
    }
  };
});