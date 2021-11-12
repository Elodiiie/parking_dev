// pages/profile/profile.js
import { request } from "../../request/index";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo:{},
        info:{},
        carNum:0,
        score:0
    },
    onShow(){
        const userinfo=wx.getStorageSync('userInfo')
        const info=wx.getStorageSync('info2')
        this.setData({
            userinfo,
            info
        })
        console.log(this.data.info)
        if(info){
            this.getCar(info.userid)
            this.getScore(info.userid)
        }
    },
    // 获取该用户的数据
    async getCar(userid){
        console.log(userid)
        const res=await request({url:"/car/getNumByUserid/"+userid,data:userid,method:"get"});
        this.setData({
            carNum:res
        })
    },
    async getScore(userid){
        console.log(userid)
        const res=await request({url:"/parkrecord/getNumByUserid/"+userid,data:userid,method:"get"});
        this.setData({
            score:res
        })
    },
    async logout(e){
        console.log("aa");
        wx.showModal({
            title: '提示',
            content: '确定要退出吗？',
            success (res) {
              if (res.confirm) {
                wx.clearStorage({
                  success: (res) => {
                    wx.showToast({
                        title: '成功退出',
                        icon: 'success',
                        duration: 1500,
                    })
                  },
                  complete:(res)=>{
                      wx.navigateTo({
                        url: '/pages/profile/profile',
                      })
                  }
                })
              }
            }
          })
    },
    onShareAppMessage: function(){
        return{
            title:"WS停车系统" ,
            path:"/pages/profile",
            imageUrl:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
        }
    },
    onShareTimeline(){
        return{
            title:"WS停车系统"
        }
    }
})