import { request } from "../../request/index";
// pages/login/login.js
Page({
    handleGetUserInfo(e){
        const {userInfo} = e.detail;
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack({
          delta: ({
              delta:1
          }),
        })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          },
          complete:(res)=>{
            const {userInfo} = res;
            wx.setStorageSync('userInfo', userInfo)
            // wx.navigateTo({
            //   url: '/pages/profile/profile',
            // })
            wx.navigateBack({
              delta: 3,
            })
          }
        })
    },
    resetBtnClick(){
      this.setData({
        username:'',
        password:''
      })
    },
    async login(e){
      try{
        const loginparams={username:this.data.username,password:this.data.password}
        const res=await request({url:"/user/login",data:loginparams,method:"post"});
        if(res.code==20000){
          wx.setStorageSync('token', res.data.token)
          this.getUserProfile(e)
          this.getUserInfo2(res.data.token.toString())
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon: 'error',
            duration: 1500,
            })
        }
      }catch(error){
        console.log(error)
      }
    },
    async getUserInfo2(token){
      const res=await request({url:"/user/info2",data:token,method:"post"});
      if(res.code==20000){
        wx.setStorageSync('info2', res.data)
      }
    },
    usernameInput:function(e){
      this.setData({
        username:e.detail.value
      })
    },
    passwordInput:function(e){
      this.setData({
        password:e.detail.value
      })
    },
    /**
     * 页面的初始数据
     */
    data: {
      username:'',
      password:''
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