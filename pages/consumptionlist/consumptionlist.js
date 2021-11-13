// pages/consumptionlist/consumptionlist.js
import { request } from "../../request/index";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:'2021-11',
        userid:0,
        listData:[]
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
        this.getParkRecordDetailByMonth(this.data.userid,this.data.date)

    },
    async getParkRecordDetail(userid){
        const res=await request({url:"/parkrecord/findDetailByUserid/"+userid,data:userid,method:"get"});
        this.setData({
            listData:res
        })
        if(res.length==0){
          wx.showToast({
            title: '暂无消费数据',
            icon:'error',
            mask:true,
            duration: 1000,
          });
        }
    },
    async getParkRecordDetailByMonth(userid,date){
      console.log(userid)
      const res=await request({url:"/parkrecord/findDetailByUseridAndMonth/"+userid+"/"+date,data:userid,date,method:"get"});
      this.setData({
          listData:res
      })
      console.log(res)
      if(res.length==0){   
        wx.showToast({
          title: '该月暂无消费数据',
          icon:'error',
          mask:true,
          duration: 1000,
        });
      }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userid :wx.getStorageSync('info2').userid
        })
        console.log(this.data.userid);
        this.getParkRecordDetail(this.data.userid)
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