// pages/pay/pay.js
import { request } from "../../request/index";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance:0,
        chose_num:1,
        chose_money:0,
        userid:0,
        showModalStatus: false,
        bz:'sad',
        currentDay:''
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
        const info = wx.getStorageSync('info2')
        this.setData({
            userid:info.userid
        })
        this.getBalance(info.userid)
    },
    refresh(){
      this.getBalance(this.data.userid)
    },
    async getBalance(userid){
        const res=await request({url:"/user/getBalance/"+userid,data:userid,method:"get"});
        this.setData({
            balance:res
        })
    },
    chose:function(e){
        this.setData({
            chose_num:e.currentTarget.dataset.num
        })
    },
    chose_money:function(e){
        this.setData({
            chose_money:e.currentTarget.dataset.money
        })
        this.pay()

    },
    pay(){
        var that = this;
        wx.showModal({
            title: '重要提示',
            content: '您将支付'+this.data.chose_money+'元人名币，您确定要进行购买吗？',
            cancelText:'关闭窗口',
            success (res) {
              if (res.confirm) {
                //调用真实扣费系统api
                const newBalance = parseInt(that.data.chose_money)+parseInt(that.data.balance)
                const updateParams={userid:that.data.userid,balance:newBalance}
                const username= wx.getStorageSync('info2').name
                that.getDate()
                const addPayParams={username:username,time:that.data.currentDay,fare:that.data.chose_money}
                const result0 = request({url:"/pay/addRecord",data:addPayParams,method:"post"});
                const result=request({url:"/user/updateBalance",data:updateParams,method:"post"});
                wx.showToast({
                  title: '支付成功',
                  icon:'success',
                  mask:true,
                  duration: 1500,
                })
                // wx.navigateBack({
                //   delta: 1,
                // })
                that.setData({
                    balance:newBalance
                })
              }else if (res.cancel){
                wx.navigateTo({
                    url: '/pages/pay/pay',
                  })
              }
            }
        })
    },
    getDate() {  
      var date = new Date();
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? ('0' + m) : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = date.getHours();  
      h=h < 10 ? ('0' + h) : h;  
      var minute = date.getMinutes();  
      minute = minute < 10 ? ('0' + minute) : minute;  
      var second=date.getSeconds();  
      second=second < 10 ? ('0' + second) : second;  
      var date1 = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      this.setData({
        currentDay:date1
      })
    },
    chose_money_custom:function(e){
        this.powerDrawer(e);
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

    },
    powerDrawer: function (e) {  
        var currentStatu = e.currentTarget.dataset.statu; 
        this.util(currentStatu)  
    },  
    async util(currentStatu){  
        /* 动画部分 */  
        // 第1步：创建动画实例   
        var animation = wx.createAnimation({  
          duration: 200,  //动画时长  
          timingFunction: "linear", //线性  
          delay: 0  //0则不延迟  
        });  
          
        // 第2步：这个动画实例赋给当前的动画实例  
        this.animation = animation;  
      
        // 第3步：执行第一组动画  
        animation.opacity(0).rotateX(-100).step();  
      
        // 第4步：导出动画对象赋给数据对象储存  
        this.setData({  
          animationData: animation.export()  
        })  
          
        // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function () {  
          // 执行第二组动画  
          animation.opacity(1).rotateX(0).step();  
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
          this.setData({  
            animationData: animation  
          })  
          if (currentStatu == "submit") {
            this.pay()
            this.setData(  
              {  
                showModalStatus: false,
              }  
            );  
          }    
          //关闭  
          if (currentStatu == "close") {  
            this.setData(  
              {  
                showModalStatus: false  
              }  
            );  
          }  
        }.bind(this), 200)  
        
        // 显示  
        if (currentStatu == "open") {  
          this.setData(  
            {  
              showModalStatus: true  
            }  
          );  
        }  
    },
    update_custom:function(e){
        const num = e.detail.value
        this.setData({
            chose_money:num
        })
    },
    payrecord(){
        wx.navigateTo({
          url: '/pages/payrecord/payrecord',
        })
    }
    
})