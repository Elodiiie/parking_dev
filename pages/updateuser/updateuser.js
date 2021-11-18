// pages/updateuser/updateuser.js
import { request } from "../../request/index";
Page({
    async update(e){
        this.updateParams();
      try{
        const res=await request({url:"/user/updateuser",data:this.data.origin,method:"put"});
        console.log(res);
        if(res){
            const info =wx.getStorageSync('info2');
            info.name = this.data.username;
            info.introduction=this.data.introduction;
            wx.setStorageSync('info2', info)
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function() {
                    wx.navigateBack({
                      delta:1
                    })
                  }, 1500);
                }
              });
        }else{
          this.resetBtnClick();
          wx.showToast({
            title: '修改失败',
            icon: 'error',
            duration: 1500,
          })
        }
      }catch(error){
        console.log(error)
      }
    },
    updateParams(){
        this.data.origin.username = this.data.username;
        this.data.origin.sex = this.data.sex;
        this.data.origin.phone = this.data.phone;
        this.data.origin.email = this.data.email;
        this.data.origin.introduction = this.data.introduction;
    },
    bandleSexChange(e){
        let sex = e.detail.value;
        this.setData({
          sex:sex
        })
    },
    usernameInput:function(e){
      this.setData({
        username:e.detail.value
      })
    },
    phoneInput:function(e){
      this.setData({
        phone:e.detail.value
      })
    },
    emailInput:function(e){
        this.setData({
          email:e.detail.value
        })
    },
    introductionInput:function(e){
        this.setData({
          introduction:e.detail.value
        })
      },
    resetBtnClick(){
        this.setData({
            username:'',
            sex:0,
            phone:'',
            email:'',
            introduction:''
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
      username:'',
      sex:0,
      check1:false,
      check2:true,
      phone:'',
      email:'',
      introduction:'',
      origin:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const token=wx.getStorageSync("info2");
        if(!token){
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return;
        }

        const userid = wx.getStorageSync("info2").userid
        this.getOrigin(userid);
        
    },
    async getOrigin(userid){
        const result= await request({url:"/user/findById/"+userid,data:userid,method:"get"});
        this.setData({
            username:result.username,
            sex:result.sex,
            phone:result.phone,
            email:result.email,
            introduction:result.introduction,
            origin:result
        })
        if(result.sex ==0){
            this.setData({
                check1:true,
                check2:false
            })
        }
        console.log(this.data.origin)
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})