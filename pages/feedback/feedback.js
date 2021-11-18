// pages/feedback/feedback.js
import { request } from "../../request/index";
Page({
    data: {
      tabs:[
        {
          id:0,
          value:"体验问题",
          isactive:true
        },
        {
          id:1,
          value:"系统投诉",
          isactive:false
        },
      ],
      chooseImages:[],
      textVal:"",
      maxLen: 200,//备注最多字数   		   
      nowLen: 0
    },
    UploadImgs:[],
    onLoad(){
      const token=wx.getStorageSync("info2");
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
    },
    handletabsitemchange(e){
      const {index}=e.detail;
      let {tabs}=this.data;
      tabs.forEach((v,i)=>i===index?v.isactive=true:v.isactive=false);
      this.setData({
        tabs
      })
      
    },
  
    handleChoose(){
      wx.chooseImage({
        count:9,
        sourceType:['album','camera'],
        sizeType:['origin','compressed'],
        success: (res) => {
          
          this.setData({
            chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
          })
        },
      })
    },
  
    handleRemoveImg(e){
      
      const {index}=e.currentTarget.dataset;
      
      let {chooseImages}=this.data;
      
      chooseImages.splice(index,1)
      this.setData({
        chooseImages
      })
    },
  
    handleTextInpute(e){
      var value = e.detail.value;
      var len = parseInt(value.length);
      if (len <= this.data.maxLen) {
        this.setData({     
          textVal:e.detail.value,
          nowLen: len,
        })
      }
      else return;
    },
  
    async handleFormSubmit(){
      const {textVal,chooseImages}=this.data;
      if (!textVal.trim()) {
        wx.showToast({
          title: '输入不合法',
          icon:'error',
          mask:true,
          duration: 1000,
        });
        return;
      }
      wx.showLoading({
        title: '正在上传中',
        mask:true
      })
      if (chooseImages!=0) {
        chooseImages.forEach((v,i)=>{
          console.log(v);
          
          wx.uploadFile({
            filePath: 'v',
            name: 'image',
            url: 'https://images.ac.cn/Home/Index/UploadAction',
            formData:{}, 
            success:(res)=>{
              console.log(res);
              let url=JSON.parse (res.data).url;
              this.UploadImgs.push(url);
    
              if (i===chooseImages.length-1) {
                wx.hideLoading( );
                console.log("111");
                this.setData({
                  textVal:"",
                  chooseImages:[]
                })
                wx.navigateBack({
                  delta:1
                })
              }
            }
          })
      });
      } else {
        wx.hideLoading();
        const userid=wx.getStorageSync('info2').userid
        const addFeedbackParams={userid:userid,content:this.data.textVal,imageUrl:null}
        const res=await request({url:"/feedback/saveAll",data:addFeedbackParams,method:"post"});
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function() {
              wx.navigateBack({
                delta:1
              })
            }, 2000);
          }
      });

      }
    },
  })