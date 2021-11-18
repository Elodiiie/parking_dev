// pages/payrecord/payrecord.js
import { request } from "../../request/index";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        week:'',
        date:'',
        listData:[],
        userid:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const info = wx.getStorageSync('info2')
        let that = this
        that.setData({
            userid:info.userid
        })
        if(this.data.carNum==0){//修改
            wx.showModal({
                title: '未查询到您的车辆',
                content: '要添加车辆吗？',
                success (res) {
                  if (res.confirm) {
                    //跳转到添加车辆页面
                  }else if (res.cancel){
                    wx.navigateBack({
                        delta:1
                    })
                  }
                }
              })
        }else{
            this.getPayDetail(this.data.userid)
        }
    },
    async getPayDetail(userid){
        const res=await request({url:"/pay/getPayDetialBywx_overall/"+userid,data:userid,method:"get"});
        this.setData({
            listData:res
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
        const userinfo=wx.getStorageSync('userInfo')
        const info=wx.getStorageSync('info2')
        this.setData({
            userinfo,
            info
        })
        var d = new Date();
        var char = "-";
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var week = "星期" + "日一二三四五六".charAt(d.getDay());
        const date = year+char+month+char+day;
        this.setData({
            date,
            week
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