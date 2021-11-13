// pages/parkrecord/parkrecord.js
import { request } from "../../request/index";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:'2021-11',
        carid:0,
        listData:[]
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
        this.getParkRecordDetailByMonth(this.data.carid,this.data.date)

    },
    async getParkRecordDetail(carid){
        console.log(carid)
        const res=await request({url:"/parkrecord/findDetailByCarid/"+carid,data:carid,method:"get"});
        this.setData({
            listData:res
        })
        if(res.length==0){
          wx.showToast({
            title: '该车辆无数据',
            icon:'error',
            mask:true,
            duration: 1000,
          });
        }
    },
    async getParkRecordDetailByMonth(carid,date){
      console.log(carid)
      const res=await request({url:"/parkrecord/findDetailByCaridAndMonth/"+carid+"/"+date,data:carid,date,method:"get"});
      this.setData({
          listData:res
      })
      console.log(res)
      if(res.length==0){
   
        wx.showToast({
          title: '该月无数据',
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
        console.log(options)
        this.getParkRecordDetail(options.carid)
        this.setData({
          carid:options.carid
        })
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