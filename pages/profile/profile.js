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
        if(info){
            this.getCar(info.userid)
            this.getScore(info.userid)
        }
    },
    // 获取该用户的数据
    async getCar(userid){
        const res=await request({url:"/car/getNumByUserid/"+userid,data:userid,method:"get"});
        this.setData({
            carNum:res
        })
    },
    async getScore(userid){
        const res=await request({url:"/parkrecord/getNumByUserid/"+userid,data:userid,method:"get"});
        this.setData({
            score:res
        })
    },
    tip(){
        wx.showToast({
          title: '积分兑换尚未实现,敬请期待',
          icon:'none',
          duration:1500
        })
    },
    async logout(e){
        var that = this;
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
                    // wx.navigateTo({
                    //   url: '/pages/profile/profile',
                    // })
                    that.onShow()
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
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        const info=wx.getStorageSync('info2')
        this.getCar(info.userid)
        this.getScore(info.userid)
        setTimeout(function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
      }
})