// pages/updatepassword/updatepassword.js
import { request } from "../../request/index";
Page({
    async update(e){
      try{
        if(this.data.newpassword!=this.data.repassword){
          wx.showToast({
            title: '两次密码输入不一致',
            icon:'none',
            mask:true,
            duration: 1000,
          })
        }else if(this.data.newpassword.length>20 ||this.data.newpassword.length<6){
            wx.showToast({
              title: '必须是6-20个英文字母、数字或符号组成',
              icon:'none',
              mask:true,
              duration: 1000,
            })
        }else{
            const loginparams={username:this.data.username,password:this.data.password}
            const res=await request({url:"/user/verifyPassword",data:loginparams,method:"post"});
            if(res){
                const str1 = this.data.password
                const str2 = this.data.newpassword
              if(str1==str2){
                wx.showToast({
                  title: '新密码不可与原密码相同',
                  icon:'none',
                  duration:1000
                })
              }else{
                this.updatePasswd()
              }
            }else{
              wx.showToast({
                title: '原密码错误',
                icon: 'error',
                duration: 1500,
                })
            }
        }
      }catch(error){
        console.log(error)
      }
    },
    async updatePasswd(){
        const updateparams={userid:this.data.userid,password:this.data.newpassword}
        const res=await request({url:"/user/updateuser_password",data:updateparams,method:"post"});
        if(res==true){
            wx.showToast({
              title: '成功',
              icon:'success',
              duration:1000
            })
            wx.navigateBack({
              delta: 1,
            })
        }else{
          wx.showToast({
            title: '密码修改失败',
            icon: 'error',
            duration: 1500,
          })
        }
    },
    rePasswordInput:function(e){
      this.setData({
          repassword:e.detail.value
      })
    },
    newPasswordInput:function(e){
        this.setData({
            newpassword:e.detail.value
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
      newpassword:'',
      password:'',
      repassword:'',
      userid:'',
      username:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const token=wx.getStorageSync("info2");
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
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
        const info = wx.getStorageSync('info2')
        this.setData({
            userid:info.userid,
            username:info.name
        })
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