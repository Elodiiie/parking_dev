// pages/auth/index.js
Page({
async  bindGetuserInfo(e){
  try{
      wx.navigateTo({
        url: '/pages/login/login',
      })
  }catch(error){
    console.log(error);
  }
  }
})