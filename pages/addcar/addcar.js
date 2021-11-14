// pages/addcar/addcar.js
import { request } from "../../request/index";
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      // 省份简写
      provinces: [
        ['京', '沪', '粤', '津', '冀', '晋', '辽', '吉', '黑'],
        ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
        ['桂', '琼', '渝', '川', '贵', '云', '藏', '蒙'],
        ['陕', '甘', '青', '宁', '新'],
      ],
      // 车牌输入
      numbers: [
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
        ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
        ["W", "X", "Y", "Z", "港", "澳", "学"]
      ],
      carnum: [],
      showNewPower: false,
      KeyboardState: true,
      userid:0
    },
    // 选中点击设置
    bindChoose(e) {
      if (!this.data.carnum[6] || this.data.showNewPower) {
        var arr = [];
        arr[0] = e.target.dataset.val;
        this.data.carnum = this.data.carnum.concat(arr)
        this.setData({
          carnum: this.data.carnum
        })
      }
    },
    bindDelChoose() {
      if (this.data.carnum.length != 0) {
        this.data.carnum.splice(this.data.carnum.length - 1, 1);
        this.setData({
          carnum: this.data.carnum
        })
      }
    },
    showPowerBtn() {
      this.setData({
        showNewPower: true,
        KeyboardState: true
      })
    },
    closeKeyboard() {
      this.setData({
        KeyboardState: false
      })
    },
    openKeyboard() {
      this.setData({
        KeyboardState: true
      })
    },
    // 提交车牌号码
    submitNumber() {
      if (this.data.carnum[6]) {
        // 跳转到tabbar页面
        var carlicense = this.data.carnum.join("");
        const addCarParams={userid:this.data.userid,carlicense:carlicense}
        const result=request({url:"/car/saveAll",data:addCarParams,method:"post"});
        wx.navigateTo({
          url: '/pages/profile/profile',
        })
      }else{
        wx.showToast({
          title: '车牌未完整输入',
          icon:'error',
          mask:true,
          duration: 1000,
        })
      }
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
      const info = wx.getStorageSync('info2')
      this.setData({
        userid:info.userid
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